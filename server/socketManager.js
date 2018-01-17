
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../src/events')
const { createUser, createMessage, createChat } = require('../src/factories')
let connectedUsers = ['asdfasdf']
let massive = require('massive')
const app = require('./index')

massive(process.env.DB_CONNECTION).then( db => {
    app.set( 'db', db)
})

module.exports = (socket)=> {
    console.log('socket id: '+ socket.id)
    socket.on('emit message', input => {
        console.log('---> ',socket)
        db = app.get('db')

        db.create_message(1, input, 'time stamp here')
        db.get_messages_by_conv_id(1).then(response=>{
            socket.emit('generate response', response)
        })
        console.log('input: ', input)
        connectedUsers.push(input)

    })    
}
