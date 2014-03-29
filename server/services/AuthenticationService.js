var userService = require('./data/UserDataService');

module.exports.encryptToken = function(credentials) {
    return encrypt(credentials.username, credentials.password);
};

module.exports.decryptToken = function(token) {
    return decrypt(token);
};

var encrypt = function(username, password) {
    return new Buffer(username + ":" + password).toString('base64');
};

var decrypt = function(token) {
    var decrypted = new Buffer(token, 'base64').toString('ascii');
    var splitted = decrypted.split(':');

    var credentials = {
        username : splitted[0],
        password : splitted[1]
    };

    return credentials;
};

module.exports.authenticate = function(req, res, next) {
    var authHeader = req.header('authorization');

    if(authHeader) {
        var substrings = authHeader.split(' ');

        var method = substrings[0];

        if(method === 'MEMBRAIN') {
            var credentials = decrypt(substrings[1]);

            userService.findUserByCredentials (
                credentials,
                    function(user) {
                        if(user) {
                            return next();
                        } else {
                            responseUnauthorized(res);
                            return;
                        }
                },  function() {
                        responseUnauthorized(res);
                    return;
                }
            );
        } else {
            responseUnauthorized(res);
            return;
        }
    } else {
        responseUnauthorized(res);
        return;
    }
};

var responseUnauthorized = function(res) {
    res.status(401);
    res.send('Unauthorized');
};