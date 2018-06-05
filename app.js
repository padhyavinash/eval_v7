//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var path = require('path');
var passport = require('passport');

var app = express();

//db connection
require('./api/models/db');

//User Login Route
//const routeuser = require('./routes/routeuser');
var routesApi = require('./api/routes/index');



require('./api/config/passport');

//port no
const port = 3000;

//adding middleware - cors
app.use(cors());

//body-parser
app.use(bodyparser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', routesApi);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//testing server
app.get('/',(req,res)=>{
    res.send('Hello');
});

app.listen(port,()=>{
    console.log('Server started at port '+port);
});

