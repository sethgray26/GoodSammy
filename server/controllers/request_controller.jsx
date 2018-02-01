module.exports = {

    createRequest: (req, res, next ) => {
        let {user_id, category_id, description, long, lat} = req.body

        const db = req.app.get('db')
        db.createRequest(user_id, category_id, description, long, lat).then( newReq => 
            
            res.status(200).send(newReq))
    }
}