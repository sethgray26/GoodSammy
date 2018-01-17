const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , massive = require('massive')
    , socketManager = require('./socketManager.js')
    , socket = require('socket.io');
    

require('dotenv').config()

const app = module.exports = express()
const PORT = process.env.SERVER_PORT

const io = socket(app.listen(PORT, ()=> console.log(`listening on port: ${PORT}`)))
app.use(bodyParser.json() )
app.use(cors())

massive(process.env.DB_CONNECTION).then( db => {
    app.set( 'db', db)
})

// app.use( session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true,
//     resave: false
// }))

// app.use( express.static( __dirname + '/../build' ))


const chat = io.on('connection', (socket) => {
    socketManager.respond(chat, socket, app);
})

