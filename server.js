var express = require('express');
var server = express();

var httpApi = require('restify');
var sensorRoute = require('./server/routes/sensors');
var hubRoute = require('./server/routes/hub');
var authenticationRoute = require('./server/routes/authentication');
var authenticator = require('./server/services/AuthenticationService');

var dbBuilder = require('./server/db/dbBuilder');
dbBuilder.createDatabase();

server.use(express.json());
server.use(express.urlencoded());

server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept");
    next();
});

server.all('/api/*', function (req, res, next) {
    if (req.method == 'OPTIONS') {
        next();
    } else {
        authenticator.authenticate(req, res, next);
    }
});

/**
 * ROUTES
 */
server.get('/api/sensors', sensorRoute.listAll);
server.get('/api/sensors/:id', sensorRoute.findById);

server.get('/api/hub/status', hubRoute.getStatus);

server.post('/authenticate', authenticationRoute.authenticate);

server.listen(8080);

