module.exports = {

    createRequest: (req, res, next ) => {
        const db = req.app.get('db')
        db.createRequest(req.body.user_id,req.body.category_id,req.body.desc, req.body.lat, req.body.lng).then( newReq => 
            res.status(200).send(newReq))
    }
}