module.exports ={
    read:(req,res,next)=>{
        const db = req.app.get('db');
        const { params } = req;
        
        db.get_photo_by_trip([params.id])
        .then( photos => res.status(200).send(photos))
        .catch(() => res.status(500).send("Could not fetch photos"))
    },
    create:(req,res,next)=>{
        const db = req.app.get('db');
        const{ params } = req;
        const{img_url} = req.body;
        
        db.upload_photos_by_trip([params.id, img_url])
        .then(()=> res.status(200).send("photo uploaded"))
        .catch(()=>res.status(500).send("It didn't work"))
    },
    delete:(req, res, next) =>{
        const db = req.app.get('db');
        const { params } =req;
        db.delete_photos_by_tripid([params.id])
        .then( () => res.status(200).send("Photos deleted"))
        .catch(() => res.status(500).send("Photos not deleted"))
    }

}