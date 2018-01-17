module.exports = {

    createRequest: (req, res, next ) => {
        console.log('hit controller')
        console.log('req body', req.body)
        const {user_id, category_id, description, lng,lat} = req.body

        const db = req.app.get('db')
        db.createRequest(user_id,Number(category_id),description, lng, lat).then( newReq => 
            
            res.status(200).send(newReq))
    }
}