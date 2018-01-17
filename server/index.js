const express = require('express')
      bodyParser = require('body-parser')
      cors = require('cors')
      session = require('express-session')
      controllers = require('./controllers')
      massive = require('massive')
      socketManager = require('./socketManager')
      const socket=require('socket.io')

      require('dotenv').config()

const users_controller = require('./controllers/users_controller.jsx')
const maps_controller = require('./controllers/maps_controller.jsx')
const request_controller = require('./controllers/request_controller.jsx')

const app = express()
app.use(bodyParser.json() )
app.use(cors())

massive(process.env.DB_CONNECTION).then( db => {
    console.log('andrew', db)
    app.set( 'db', db)
})

const io = socket(app.listen( process.env.SERVER_PORT, () => {console.log('listening on port 3005')}));

// app.use( session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true, 
//     resave: false
// }))

// app.use( express.static( __dirname + '/../build' ))

//***END POINTS***
//User
app.post('/createUser',users_controller.createUsers)
app.put('/setLocation/:id',maps_controller.setLocation)

//Requests
app.post('/createRequest',request_controller.createRequest)

app.post('/createUser',users_controller.createUsers )

// ========== ENDPOINTS ========== //

// === GET REQUESTS === //
// tests #3
app.get('/request', controllers.get_Request )



// === PUT REQUESTS === //



// === POST REQUESTS === //
// test #4 
app.post('/request', )


// === DELETE REQUESTS === //
const chat= io.on('connection', (socket)=>{
    socketManager.respond(chat, socket, app);
})

