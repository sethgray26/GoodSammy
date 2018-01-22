module.exports = {
    createChatSession: (req, res)=>{
        const {requestId, requesterId, helperId} = req.body
        // put socket id on this user's db file

    },
    updateSocketID: async (req, res)=>{
        let conversationID = null;
        const { socketID, userID, requestID, creatorID, helperID } = req.body
        
        db = req.app.get('db')
        db.update_socket_id_by_user_id(socketID, userID)
        // check if conversation exists. get conversation id. 
        // get creatorID from request
        
            //check if conversation exists
        let convo = await db.get_conversation_id(requestID, helperID, creatorID);
            console.log('convo: ', convo)
            if (convo[0]) {
                conversationID = convo[0].id
                res.status(200).json(conversationID)
            }
            else {
                //create new conversation with these parameters
                console.log('helperID: ',helperID)
                db.create_conversation(creatorID, requestID, helperID).then(convo=>{
                    conversationID = convo[0].id
                    res.status(200).json(conversationID)
                })}
                
                // } res.status(200).send(conversationID)
            }
        }
            
        
        