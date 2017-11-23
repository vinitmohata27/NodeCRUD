// call the packages we need
let express = require('express'),       // call express
        app = express(),                 // define our app using express
        bodyParser = require('body-parser'),
        path = require("path"),
        //Add logger In Application
        log4js = require('log4js'),
        log = log4js.getLogger("app");
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
//End Add logger In Application

//database connection
let db = require('./models/db');
db.connectToMongo();

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 3000;        // set our port
// ROUTES FOR OUR API

let router = express.Router();

// Routers controllers
let usersRouter = require('./routes/companyRoute');

app.use(function (req, res, next) {
        next();
});

// all of our routes will be prefixed with /api
app.use('/api', usersRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
log.trace('Server listening on port ' + port);

module.exports=app;