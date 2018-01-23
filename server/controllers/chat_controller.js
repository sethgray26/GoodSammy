module.exports = {
    updateSocketID: async (req, res)=>{
        const { socketID, userID, requestID, creatorID, helperID } = req.body        
        const db = req.app.get('db')
        let conversationID = null;
        // update socket id for this user
        db.update_socket_id_by_user_id(socketID, userID)
        
        // get the conversation that matches provided parameters
        let convo = await db.get_conversation_id(requestID, helperID, creatorID);
            //check if conversation exists
            if (convo[0]) {
                conversationID = convo[0].id
                let request = await db.get_request_by_id(requestID);
                let sendMe = {}
                sendMe.description = request[0].description.slice(0,28)+'...'
                sendMe.id = conversationID
                res.status(200).json(sendMe)
            }
            else {
                // create new conversation with these parameters
                db.create_conversation(creatorID, requestID, helperID).then( async convo=>{
                    conversationID = convo[0].id
                    let request = await db.get_request_by_id(requestID);
                    let sendMe = {}
                    sendMe.description = request[0].description.slice(0,28)+'...'
                    sendMe.id = conversationID
                    res.status(200).json(sendMe)
                })}
            },
    getUsernames: async (req, res)=>{
        const {creatorID, helperID} = req.body;
        const db = req.app.get('db')
        // get usernames ffrom usertable
        const creator = await db.get_username_by_id(creatorID)
        const helper = await db.get_username_by_id(helperID)
        const sendMe = {creator: creator[0].username, helper: helper[0].username}
        res.status(200).json({sendMe})
    }
}
        
        