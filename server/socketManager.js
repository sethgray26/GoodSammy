
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../src/events')
const { createUser, createMessage, createChat } = require('../src/factories')
const socket = require('socket.io')
let connectedUsers = ['asdfasdf']
let massive = require('massive')


module.exports.respond =  (io, socket, app)=> {
    console.log('socket id: '+ socket.id)
    socket.on('emit message', input => {
        db = app.get('db')

        db.create_message_and_get_all(1, input).then(response=>{
            console.log('---> ', response)
            socket.emit('generate response', response)
        })
        console.log('input: ', input)
        connectedUsers.push(input)
    })    
}
        

