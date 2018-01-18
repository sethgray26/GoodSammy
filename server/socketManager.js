
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../src/events')
const { createUser, createMessage, createChat } = require('../src/factories')
const socket = require('socket.io')
let connectedUsers = ['asdfasdf']

// request id's based on conversation id



module.exports.respond =  (io, socket, app)=> {  
    console.log('connected.\nsocket id: '+ socket.id)
    socket.emit('socket id', socket.id)
    socket.on('emit message', data => { // TODO refactor this to be async ? ? 
        db = app.get('db')

        db.create_message_and_get_all(data.conversationID, data.messageInput).then(response=>{
            socket.emit('convo messages', response)
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

