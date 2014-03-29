var fs = require('fs');
var file = 'membrainDB.db';
var exists = fs.existsSync(file);

if (!exists) {
    console.log("Creating database file...");
    fs.openSync(file, "w");
    exists = true;
}

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

exports.executeSQL = function (command, onError, onSuccess) {
    db.serialize(function () {
        db.run(command, function (err) {
            if (err) {
                console.log(err);
                if (onError) {
                    onError();
                }
            } else {
                if (onSuccess) {
                    onSuccess(this.lastID);
                }
            }
        });
    });
};

exports.executeSQLStatement = function (sqlStatement, data, onSuccess, onError) {
    console.log("dbAction.executeSQLStatement: " + sqlStatement);
    console.log(data);
    db.serialize(function () {
            var stmt = db.prepare(sqlStatement, function (err) {
                if (err) {
                    console.log(err);
                    if (onError) {
                        onError();
                    }
                }
            });

            stmt.run(data, function (err) {
                if (err) {
                    console.log(err);
                    if (onError) {
                        onError();
                    }
                }
            }, function (data) {
                console.log(data);
            });

            stmt.finalize(function () {
                if (onSuccess) {
                    onSuccess();
                }
            });
        }
    );

};

exports.get = function (sql, onSuccess, onError) {
    console.log("dbAction.get: " + sql);
    db.serialize(function () {
        db.get(sql, function (err, row) {
            if (err) {
                console.log(err);
                onError();
            }
            else {
                onSuccess(row);
            }
        });
    });

};

exports.each = function (sql, onSuccess, onError) {
    console.log("dbAction.each: " + sql);
    if (onSuccess) {
        var data = [];
        db.serialize(function () {
            db.each(sql, function (err, row) {
                if (err) {
                    console.log(err);
                    onError();
                }
                else {
                    data.push(row);
                }
            }, function () {
                onSuccess(data);
            });
        });
    }
};

exports.executeBulk = function (sqlStatement, data, onSuccess, onError) {
    db.serialize(function () {
        db.run("BEGIN");

        var stmt = db.prepare(sqlStatement, function (err) {
            if (err) {
                console.log(err);
                if (onError) {
                    onError();
                }
            }
        });

        for (var i = 0; i < data.length; i++) {
            stmt.run(data[i], function (err) {
                if (err) {
                    console.log(err);
                    if (onError) {
                        onError();
                    }
                }
            });
        }

        db.run("COMMIT;", function () {
            if (onSuccess) {
                onSuccess();
            }
        });

    });
};

exports.getByIntegerPropertyValues = function (tableName, propertyName, values, onSuccess, onError) {

    if (!tableName || !propertyName || !values || values.length == 0) {
        return onSuccess([]);
    }

    var sql = "SELECT * FROM " + tableName + " WHERE " + propertyName + " IN (";

    for (var i = 0; i < values.length; i++) {
        sql += values[i];
        if (i < values.length - 1) {
            sql += ",";
        }
    }

    sql += ");";

    this.each(sql, onSuccess, onError);
};

exports.getByTextPropertyValues = function (tableName, propertyName, values, onSuccess, onError) {

    if (!tableName || !propertyName || !values || values.length == 0) {
        return onSuccess([]);
    }

    var sql = "SELECT * FROM " + tableName + " WHERE " + propertyName + " IN (";

    for (var i = 0; i < values.length; i++) {
        sql += values[i];
        if (i < values.length - 1) {
            sql += ",";
        }
    }

    sql += ");";

    this.each(sql, onSuccess, onError);
};

exports.database = db;