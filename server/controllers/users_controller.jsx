module.exports = {
    createUsers: (req, res, next ) => {
        const dbInstance = req.app.get('db')
        let { username, password, phone } = req.body

        dbInstance.create_users([username, password, phone])
            .then(( response ) => res.status(200).send( response ))
    }
}