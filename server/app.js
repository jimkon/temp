const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app  =  express();
const router = require('./routes/api');
const passport = require('passport');
const flash = require("connect-flash");
const session = require('express-session');

/*mongoose.connect('mongodb://localhost:27017/db_name', function (err) {
    if (err) {
        console.error(err, 'Error while connecting mongoose');
    } else {
        console.log('Successful mongoose connection');
    }
});*/
mongoose.connect('mongodb://dimitris:dimitris@ds031948.mlab.com:31948/testdb_ctek', function (err) {
    if (err) {
        console.error(err, 'Error while connecting mongoose');
    } else {
        console.log('Successful mongoose connection');
    }
});



//Load Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/api', router);

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(express.static(__dirname + '/../lang'));

console.log(__dirname);

app.get('/auth', (req, res) => {
    res.sendFile('index.html', {root: __dirname + '/../client/auth'});
});
app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: __dirname + '/../client/pre_auth'});
});


//Start the app
mongoose.connection.once('open', () => {
	const port = process.env.PORT || 3000;
    app.listen(port);
    console.log('Listening at '+port);
});
