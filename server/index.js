const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , massive = require('massive')
    , socketManager = require('./socketManager.js')
    , socket = require('socket.io');
    

require('dotenv').config()

const app = module.exports = express()

const io = socket(app.listen(3005, ()=> console.log('listening on port 3005')))
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

io.on('connection', socketManager);

