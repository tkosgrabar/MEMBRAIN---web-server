var db = require('../db/db.js').database;

module.exports.findUserByCredentials = function (credentials, onSuccess, onError) {

    console.log(credentials);

    db.serialize(function () {
            var sql = "select * from users where username like '" + credentials.username +
                "' and password like '" + credentials.password + "'";

        var data = [];

        db.get(sql, function (err, row) {
            console.log(err);
            console.log(row);
            if (err)
                onError();
            else {
                data.push({id: row.id, username: row.username, password: row.password, isAdmin: row.isAdmin});
            }

        }, function () {
            onSuccess(data);
        });
    });

};