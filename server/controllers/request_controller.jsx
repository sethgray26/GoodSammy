module.exports = {

    createRequest: (req, res, next ) => {
        console.log('hit controller')
        console.log('req body', req.body)
        let {user_id, category_id, description, long, lat} = req.body

        const db = req.app.get('db')
        db.createRequest(user_id, category_id, description, long, lat).then( newReq => 
            
            res.status(200).send(newReq))
    }
}