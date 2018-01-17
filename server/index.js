const express = require('express')
      bodyParser = require('body-parser')
      cors = require('cors')
      session = require('express-session')
      massive = require('massive')
      socketManager = require('./socketManager')
      const socket=require('socket.io')

      require('dotenv').config()

const users_controller = require('./controllers/users_controller.jsx')

const app = express()
app.use(bodyParser.json() )
app.use(cors())

massive(process.env.DB_CONNECTION).then( db => {
    app.set( 'db', db)
})

const io = socket(app.listen( process.env.SERVER_PORT, () => {console.log('listening on port 3005')}));

// app.use( session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true, 
//     resave: false
// }))

// app.use( express.static( __dirname + '/../build' ))


app.post('/createUser',users_controller.createUsers )

const chat= io.on('connection', (socket)=>{
    socketManager.respond(chat, socket, app);
})

