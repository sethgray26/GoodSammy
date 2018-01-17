const express = require('express')
      bodyParser = require('body-parser')
      cors = require('cors')
      session = require('express-session')
      massive = require('massive')

      require('dotenv').config()

const users_controller = require('./controllers/users_controller.jsx')
const maps_controller = require('./controllers/maps_controller.jsx')
const request_controller = require('./controllers/request_controller.jsx')

const app = express()
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

//***END POINTS***
//User
app.post('/createUser',users_controller.createUsers)
app.put('/setLocation/:id',maps_controller.setLocation)

//Requests
app.post('/createRequest',request_controller.createRequest)

app.listen( process.env.SERVER_PORT, () => {console.log('listening on port 3005')})
