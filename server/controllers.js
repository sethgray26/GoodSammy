
module.exports = {
   
    get_Request: (req, res) => {
        const dbInstance = req.app.get('db')
        // console.log(dbInstance)
        dbInstance.getRequest()
        .then((request) => res.status(200).send(request))
    },
    get_one_request: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.get_one_Request(req.params.id)
        .then((request) => res.status(200).send(request))

    },
    update_req_info: (req,res) =>{
        const dbInstance = req.app.get('db')
        const{description, category, request_id} = req.body
        
        dbInstance.update_req_info(request_id, description, category)
        .then((request) => res.status(200).send(request))
    }
}