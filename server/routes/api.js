const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require("connect-flash");
const session = require('express-session');
const User = new require('../models/users');
// const cnt = require('../controllers/controller');

//Custom route for creation
// router.get('/create', (req,res) => {
//     console.log("try to register");
//
//     //res.sendFile(path.resolve(__dirname + '/../index.html'));
// });
//
// // router.get('/login', (req, res) => {
// //     res.sendFile(path.resolve(__dirname + '/../login.html'));
// // });

router.post('/login', passport.authenticate('local-login'), (req, res) => {
    console.log('Logged in '+req.user);
    res.json(req.user);
});

router.get('/logout', requestAuthenticated, (req, res) => {
    req.logout();
    res.status(200).send('ok');
});

router.get('/profile', requestAuthenticated, (req, res) => {
    // console.log("Profile");
    const user = req.user;
    res.json(user);
});

router.put('/profile', requestAuthenticated, (req, res)=>{

    User.findById(req.user.id, function(err, user) {
        if (err) throw err;

        // change the users location
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        // save the user
        user.save(function(err) {
            if (err) throw err; 
            console.log('User successfully updated!');
        });

    });
});

// router.delete('/profile', (req, res)=>{
//
// });

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
        if(err){
            return done(err);
        }
        return done(null, user);
    });
});

passport.use('local-login', new LocalStrategy( (username, password, done) => {
    User.findOne({username}, function(err, user) {
        if (err) {
            // console.log('Error:' + err);
            return done(err);
        }
        if (!user) {
            console.log('User  not found');
            return done(null, false, {message: 'Unknown User ' + username});
        }
        else if (user.password != password){
            console.log('Wrong password');
            return done(null, false, { message: 'Wrong password'});
        }
        else{
            console.log('successful: ' + username);
            return done(null, user);
        }
    });
}));

function requestAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
         // console.log("Request is authenticated ");
        return next();
    } else {
        const err = new Error('Request is not authenticated');
        err.status = err.statusCode = 401;
        return next(err);
    }
};

router.use((err, req, res, next)=>{
    console.log('api.js error\n'+err)
    res.status(err.status || 500).send(err);
});


User.methods(['post', 'delete', 'get', 'put']);

User.register(router, '/users');

module.exports = router;