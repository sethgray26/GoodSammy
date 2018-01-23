const socket = require('socket.io')

module.exports.respond = (io, socket, app)=> {  
    console.log('connected.\nsocket id: '+ socket.id)
    socket.on('chat mounted', ()=>{
        socket.emit('socket id', socket.id)
    })

    socket.on('emit message', async data => { // TODO: refactor this to be fully async
        const db = app.get('db')
        const { conversationID, messageInput, userID, timestamp } = data;
        // get user socket id and helper socket id
        let helper_socket_id = await db.get_helper_socket_id(data.conversationID)
        let requester_socket_id = await db.get_requester_socketid(data.conversationID)
        db.create_message_and_get_all(conversationID, messageInput, userID, timestamp).then(response=>{
            socket.emit('convo messages', response)
            socket.to(helper_socket_id[0].socket_id).emit('convo messages', response)
            socket.to(requester_socket_id[0].socket_id).emit('convo messages', response)
        })
    })  
            
    socket.on('get messages', (conversationID)=>{
        const db = app.get('db')

        db.get_messages_by_conv_id(conversationID).then(response=>{
            socket.emit('convo messages', response)
        })
    })
    
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
}

