const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const controllers = require('./controllers')
const massive = require('massive')
const socketManager = require('./socketManager')
const socket=require('socket.io')
const chat_controller = require('./controllers/chat_controller')
const fs = require('fs');

require('dotenv').config()

const users_controller = require('./controllers/users_controller.jsx')
const maps_controller = require('./controllers/maps_controller.jsx')
const request_controller = require('./controllers/request_controller.jsx')

const app = express()
var options = {
	key: fs.readFileSync('../../../etc/letsencrypt/archive/hifiveapp.com/privkey1.pem'),
	cert: fs.readFileSync('../../../etc/letsencrypt/archive/hifiveapp.com/cert1.pem'),
	ca: fs.readFileSync('../../../etc/letsencrypt/archive/hifiveapp.com/chain1.pem')
}
app.use(bodyParser.json())
app.use(cors())
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', "Content-Type");
    next();
})

massive(process.env.DB_CONNECTION).then( db => {
    app.set( 'db', db)
})

app.use( session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true, 
    resave: false
}))
app.use( express.static( __dirname + '/../build' ))

var server = https.createServer(options, app)
var io = socket(app.listen(process.env.SERVER_PORT, ()=>{console.log('server running port: '+process.env.SERVER_PORT)}))

// keys for secure connection //
var privateKey= fs.readFileSync('../../../etc/letsencrypt/archive/hifiveapp.com/privkey1.pem').toString();
var certificate= fs.readFileSync('../../../etc/letsencrypt/archive/hifiveapp.com/cert1.pem').toString();
var ca = fs.readFileSync('../../../etc/letsencrypt/archive/hifiveapp.com/chain1.pem').toString();
////////////////////////////////////////////////////////////////////////





//***END POINTS***
//maps
app.put('/getDistance', maps_controller.getDistance)
//User
// app.post('/createUser',users_controller.createUsers)
app.put('/setLocation/:id',maps_controller.setLocation)

//Requests
app.post('/createRequest',request_controller.createRequest)

// .=============. CHAT ENDPOINTS .=====================. //
app.post('/chat/socketID', chat_controller.updateSocketID)
app.post('/chat/usernames', chat_controller.getUsernames)
// .===================================================. //

app.get('/auth/me', users_controller.getUserId )
app.post('/createUser',users_controller.createUsers )
app.put('/checkLogin/:username',users_controller.checkLogin)
app.get('/logout',users_controller.logOut)

// ========== ENDPOINTS ========== //

// === GET REQUESTS === //
// tests #3
app.get('/request', controllers.get_Request )
app.get('/request/:id', controllers.get_one_request)

// === PUT REQUESTS === //
app.put('/update', controllers.update_req_info)
app.put('/commit', controllers.update_Helper )
app.put('/removeHelp', controllers.remove_Help)

// === POST REQUESTS === //
// app.post('/createUser', users_controller.createUsers )
// test #4 


// === DELETE REQUESTS === //
app.delete('/delete/:id', controllers.delete_Request)


const chat= io.on('connection', (socket)=>{
    socketManager.respond(chat, socket, app);
})


