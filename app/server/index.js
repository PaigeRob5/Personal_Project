require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    ,tripsCtrl = require('./trips_controller')
    , photosCtrl = require('./photos_controller')

    const app = express();
    app.use( express.static( `${__dirname}/../build` ) );
    const {
        SERVER_PORT,
        SESSION_SECRET,
        DOMAIN,
        CLIENT_ID,
        CLIENT_SECRET,
        CALLBACK_URL,
        CONNECTION_STRING
    } = process.env;
    app.use(express.json());
    app.use(session({
        secret: SESSION_SECRET,
        resave:false,
        saveUninitialized: true
    }))
    massive(CONNECTION_STRING).then( db => {
        app.set('db', db)
    })

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new Auth0Strategy({
        domain: DOMAIN,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
        scope: 'openid profile'
    }, function(accessToken, refreshToken, extraParams, profile, done){

        const db = app.get('db');

        const {sub, name} = profile._json;
        db.find_user([sub]).then(response => {
            if(response[0]){
                done(null, response[0].user_id)
            }else{
                db.create_user([name, sub])
            }
        })
    }));

    passport.serializeUser( (user_id, done) =>{
        done(null,user_id)
    });

    passport.deserializeUser( (user_id, done)=>{
        const db = app.get('db');
        db.find_logged_in_user( [user_id] ).then( response =>{
            done(null,response[0])
        })
    });

    app.get('/auth', passport.authenticate('auth0'));
    app.get('/auth/callback', passport.authenticate('auth0', {
        successRedirect: process.env.SUCCESS_REDIRECT
    }))

    app.get('/auth/me', (req,res)=>{
        if(!req.user){
            res.status(404).send('Not logged in.')
        }else{
            
            res.status(200).send(req.user);
        }
    });

    app.get('/logout', (req,res)=>{
        req.logOut();
        res.redirect(process.env.REDIRECT)
    })

    //Endpoints Trips
    app.use((req,res,next)=> {console.log(req.method, req.url); next()})
    app.get(`/api/trips`, tripsCtrl.read);
    app.delete('/api/trips/:id', tripsCtrl.delete);
    app.post('/api/trips', tripsCtrl.create);
    app.put('/api/trips/:id',tripsCtrl.update);
    app.get('/api/trips/:id', tripsCtrl.readTrip);

    //Endpoints Photos
    app.get('/api/photos/:id', photosCtrl.read);
    app.post('/api/photos/:id', photosCtrl.create);
    app.delete('/api/photos/:id', photosCtrl.delete);

    app.listen(SERVER_PORT, () => {
        console.log(`Server listening on port: ${SERVER_PORT}`)
    })