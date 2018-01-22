module.exports = {
    createChatSession: (req, res)=>{
        const {requestId, requesterId, helperId} = req.body
        // put socket id on this user's db file

    },
    updateSocketID: async (req, res)=>{
        console.log('_______________________________')
        let conversationID = null;
        const { socketID, userID, requestID, creatorID, helperID } = req.body
        
        let db = req.app.get('db')
        db.update_socket_id_by_user_id(socketID, userID)
        // check if conversation exists. get conversation id. 
        // get creatorID from request
        
            //check if conversation exists
        let convo = await db.get_conversation_id(requestID, helperID, creatorID);
            console.log('convo: ', convo)
            if (convo[0]) {
                conversationID = convo[0].id
                let request = await db.get_request_by_id(requestID);
                let sendMe = {}
                console.log('request: . . . . . . ', request[0].description)
                sendMe.description = request[0].description.slice(0,28)+'...'
                sendMe.id = conversationID
                console.log('sendMe obj====> ', sendMe)
                res.status(200).json(sendMe)
            }
            else {
                //create new conversation with these parameters
                console.log('helperID: ',helperID)
                db.create_conversation(creatorID, requestID, helperID).then( async convo=>{
                    conversationID = convo[0].id
                    let request = await db.get_request_by_id(requestID);
                    let sendMe = {}
                    sendMe.description = request[0].description.slice(0,28)+'...'
                    sendMe.id = conversationID
                    res.status(200).json(sendMe)
                })}
                
                // } res.status(200).send(conversationID)
            },
            getUsernames: async (req, res)=>{
                const {creatorID, helperID} = req.body;
                let db = req.app.get('db')
                // get usernames ffrom usertable
                const creator = await db.get_username_by_id(creatorID)
                const helper = await db.get_username_by_id(helperID)
                const sendMe = {creator: creator[0].username, helper: helper[0].username}
                console.log('usernames  ==================> ', sendMe)
                res.status(200).json({sendMe})
            }
        }
        
        