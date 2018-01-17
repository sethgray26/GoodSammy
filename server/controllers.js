
module.exports = {
    create_request: (req, res) => {
        const dbInstance = req.app.get('db')
        const {user_id, category_id, description, help_id } = req.body 
        dbInstance.create_request(user_id, category_id, description, help_id)
        .then((post) => res.status(200).send())
    },
    get_Request: (req, res) => {
        const dbInstance = req.app.get('db')
        console.log(dbInstance)
        dbInstance.getRequest()
        .then((request) => res.status(200).send(request))
    }
}