
module.exports = {
   
    get_Request: (req, res) => {
        const dbInstance = req.app.get('db')
        // console.log(dbInstance)
        dbInstance.getRequest()
        .then((request) => res.status(200).send(request))
    }
}