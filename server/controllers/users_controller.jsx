var bcrypt = require('bcryptjs');
const saltRounds = 10;
const session = require('express-session')
const express = require('express')
// const app = express();

module.exports = {

    createUsers: (req, res, next) => {
        const db = req.app.get('db')
        bcrypt.genSalt(saltRounds, function (err, salt) {
            
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                // Store hash in your password DB.
                // console.log('hashed pw', hash)
                db.create_users(req.body.username, hash, req.body.phone ).then(user => {
                    // console.log('user', user)
                    res.status(200).send(user);
                })
            });
        });

    },

    checkLogin: (req, resp) => { // need this to return userID to go in redux store. 

        const db = req.app.get('db')
        console.log('check login', req.session)
        //Get hashed password for this username
        db.find_user(req.params.username).then( user => {
            console.log('user===>',user)
            if(!user[0]){
                // no user by this name
                resp.status(200).send(false)
            }
            // console.log('userdata', user[0].password)
            // console.log('txtPassword', req.body.txtPassword, 'pw', user[0].password)
            bcrypt.compare(req.body.txtPassword, user[0].password, function (err, res) {
                if (res === true) {
                    //password match!
                    req.session.user = user[0].id
                    // send user id
                    resp.status(200).json({ id:req.session.user });
                }
                else {
                    //password incorrect!
                    console.log('password incorrect, res= ',res)
                    resp.status(200).send(res)
                }
            });
        }).catch(error => {
            console.log(error)
            res.send('error');
        });
    },

    logOut: (req, res) => {
        //Logout
        // console.log('loggint out')
        req.session.destroy()
        // console.log(res)
        res.redirect(process.env.AUTH_LANDING_REDIRECT)
        // console.log('did not redirect')
    },

    getUserId: (req, res ) => {
        res.status(200).send(req.session)
    },
    getNamesAndIDs: (req, res) => {
        const db = req.app.get('db')
        db.get_usernames_and_ids().then(list=>{
            res.status(200).send(list)
        })
    }
}