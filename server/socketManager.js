
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../src/events')
const { createUser, createMessage, createChat } = require('../src/factories')
const socket = require('socket.io')
let connectedUsers = ['asdfasdf']

// request id's based on conversation id



module.exports.respond =  (io, socket, app)=> {  
    console.log('connected.\nsocket id: '+ socket.id)
    socket.on('chat mounted', ()=>{
        socket.emit('socket id', socket.id)
    })
    // socket.emit('socket id', socket.id)
    socket.on('emit message', async data => { // TODO refactor this to be async ? ? 
        db = app.get('db')
        console.log('data ====> ', data)
        // get userid and helper id
        let helper_socket_id = await db.get_helper_socket_id(data.conversationID)
        let requester_socket_id = await db.get_requester_socketid(data.conversationID)
        console.log('helpersockit, requester socketid==============>', helper_socket_id, ' ', requester_socket_id)
        db.create_message_and_get_all(data.conversationID, data.messageInput, data.userID, data.timestamp).then(response=>{
            // console.log('response =====> ', response)
            socket.emit('convo messages', response)
            console.log('sending to======>',helper_socket_id[0].socket_id)
            socket.to(helper_socket_id[0].socket_id).emit('convo messages', response)
            socket.to(requester_socket_id[0].socket_id).emit('convo messages', response)
        })
    })  

    socket.on('get messages', (conversationID)=>{
        db = app.get('db')
        // return socket id

        db.get_messages_by_conv_id(conversationID).then(response=>{
            socket.emit('convo messages', response)
        })
    })
    
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
}
        
 /// socket.broadcast.to(<socketid>).emit('hey')
 /// io.to(<socketid>).emit('ey');
// get conversation, then get socket ID's from user ID's. 

