var authenticationService = require('../services/AuthenticationService');
var userService = require('../services/data/UserDataService');

module.exports.authenticate = function (req, res) {
    if(!req.body.username || !req.body.password) {
        res.status(400);
        res.send('Bad request');
        return;
    }

    var credentials = {
        username  :   req.body.username,
        password  :   req.body.password
    };

    userService.findUserByCredentials (
        credentials,
        function(user) {
            if(user) {
                var token = authenticationService.encryptToken(credentials);
                res.send(token);
            } else {
                responseUnauthorized(res);
                return;
            }
        },  function() {
            responseUnauthorized(res);
            return;
        }
    );
};

var responseUnauthorized = function(res) {
    res.status(401);
    res.send('Unauthorized');
    return;
};
