module.exports = {
    createChatSession: (req, res)=>{
        const {requestId, requesterId, helperId} = req.body
        // put socket id on this user's db file

    },
    updateSocketID: (req, res)=>{
        let conversationID = null;
        const { socketID, userID, requestID } = req.body
        
        db = req.app.get('db')
        db.update_socket_id_by_user_id(socketID, userID)
        // check if conversation exists. get conversation id. 
        // get creatorID from request
        db.get_creator_id_by_request_id(requestID).then(ID=>{
            const creatorID = ID[0].user_id;
            //check if conversation exists
            db.get_conversations().then(conversations=>{
                let convo = conversations
                .find(convo=>{
                //     console.log('\n:: 1 :: convo.requester_id, creatorID: ', convo.requester_id, ' ', creatorID)
                //     console.log('\n:: 2 :: convo.helper_id, userID', convo.helper_id, ' ', userID)
                //     console.log('\n:: 3 ::convo.request_id, requestID', convo.request_id,  ' ', requestID)
                    return convo.requester_id==creatorID && convo.helper_id==userID && convo.request_id==requestID})
                if (convo) {
                    conversationID = convo.id
                    res.status(200).json(conversationID)
                }
                else {
                    //create new conversation with these parameters
                    db.create_conversation(creatorID, requestID, userID).then(convo=>{
                        conversationID = convo[0].id
                        res.status(200).json(conversationID)
                    })}
                    
                // } res.status(200).send(conversationID)
            })
        })
        
    }
}