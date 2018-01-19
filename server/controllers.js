
module.exports = {
   
    get_Request: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.getRequest()
        .then((request) => res.status(200).send(request))
    },
    get_one_request: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.get_one_request([req.params.id])
        .then((request) => res.status(200).send(request))

    }
}