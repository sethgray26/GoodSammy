
module.exports = {

    setLocation: (req, res, next ) => {
        const db = req.app.get('db')
        db.setLocation(req.params.id,req.body.lng,req.body.lat).then( d => 
            res.status(200).send(d))
    }
}