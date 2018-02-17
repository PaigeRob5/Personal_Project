module.exports={
    read:(req,res,next)=>{
        const db = req.app.get('db');
        const{ user_id } = req.user;

        db.trips_by_user([user_id])
        .then( trip => res.status(200).send(trip))
        .catch( () => res.status(500).send());
    },

    delete:(req,res,next)=>{
        const db = req.app.get('db');
        const{ params } = req;

        db.delete_trip([params.id])
        .then( trip => res.status(200).send('trip deleted') )
        .catch( () => res.status(500).send('Error: Trip not deleted'))
    },

    create:(req,res,next)=>{
        const db = req.app.get('db');
        const {user_id} = req.user;
        const{trip_name, starting_loc, destination, start_date, end_date, travel_time, total_miles } = req.body;
        
        db.create_trip([ user_id,trip_name, starting_loc, destination, start_date, end_date, travel_time, total_miles])
        .then( () => res.status(200).send('Trip Created'))
        .catch( () => res.status(500).send('Error: Trip not created'));
    },

    update:(req,res,next) =>{
        const db = req.app.get('db');
        const{ params } = req;
        const{ trip_name, start_date, end_date } = req.body;

        db.update_trip([params.id, trip_name, start_date, end_date])
        .then( (trip) => res.status(200).send(trip))
        .catch( () =>res.status(500).send('Error: Trip not updated'));
    },
    readTrip:(req,res,next)=>{
        const db = req.app.get('db');
        const{ params } = req;

        db.read_trip([params.id])
        .then( (trip) => res.status(200).send(trip))
        .catch( () => res.status(500).send('Error: could not fetch trip'))

    }
}