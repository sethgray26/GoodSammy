
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
        const{description, request_id} = req.body
        
        dbInstance.update_req_info(request_id, description)
        .then((request) => res.status(200).send(request))
    },
    update_Helper: (req,res) => {
        const dbInstance = req.app.get('db')
        const{help_id, request_id} = req.body 

        dbInstance.update_Helper(help_id, request_id)
        .then((request) => res.status(200).send(request))
    },
    remove_Help: (req,res) => {
        const dbInstance = req.app.get('db')
        const {request_id} = req.body 

        dbInstance.remove_Help(request_id)
        .then((request) => res.status(200).send(request))
    },
    delete_Request: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.deleteRequest(req.params.id)
        .then(() => res.status(200).send('Deleted!'))
    }
}