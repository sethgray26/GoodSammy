const express = require('express')
      bodyParser = require('body-parser')
      cors = require('cors')
      session = require('express-session')
      massive = require('massive'),
      controllers = require('./controllers')

      require('dotenv').config()

const app = express()
app.use(bodyParser.json() )
app.use(cors())

massive(process.env.DB_CONNECTION).then( db => {
    console.log('andrew', db)
    app.set( 'db', db)
})

// app.use( session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true,
//     resave: false
// }))

// app.use( express.static( __dirname + '/../build' ))

app.listen( process.env.SERVER_PORT, () => {console.log(`listening on port ${3005}`)})




// ========== MIDDLEWARE ========== //

// ===== TOP LEVEL MIDDLEWARE ===== //



// ===== CUSTOM MIDDLEWARE ===== //



// ========== ENDPOINTS ========== //

// === GET REQUESTS === //
// tests #3
app.get('/request', controllers.get_Request )



// === PUT REQUESTS === //



// === POST REQUESTS === //
// test #4 
app.post('/request', )


// === DELETE REQUESTS === //

