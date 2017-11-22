//Config
let config = require('../config/config'),
    log4js = require('log4js'),
    cluster = require('cluster'),
    logger = log4js.getLogger();
//End Config

//Database Connection
let mongoose = require('mongoose');

let connectToMongo = function () {
    // Connect to DB
    // let mongoURL = process.env.MONGO_OVERRIDE || environmentConfig.dbConnectionString;
    mongoose.connect(config.database);
    db = mongoose.connection;
    db.on('error', function onError(err) {
        logger.warn('Connection to Mongo Unsuccessful: ' + err);
    });

    // When the connection is disconnected
    db.on('disconnected', function () {
        logger.info('Mongoose default connection disconnected');
    });

    // When successfully connected
    db.on('connected', function () {
        logger.info('Mongoose default connection open');
    });

    db.once('open', function callback() {
        logger.info('Connection to Mongo Successful');
        if (cluster.isMaster) {
            console.log('Master')
        }
    });
};

module.exports.connectToMongo = connectToMongo;