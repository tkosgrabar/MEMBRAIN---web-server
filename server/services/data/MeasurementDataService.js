var dbActions = require('../../db/dbActions');
var db = dbActions.database;

var insertMeasurementSql = "INSERT INTO Measurements (Address, BatteryPercentage, Timestamp) VALUES (?, ?, ?)";

exports.insertMeasurement = function (measurement, onSuccess, onError) {
    dbActions.executeSQL(insertMeasurementSql, measurement, onSuccess, onError);
};

exports.getByAddressAndTimestamp = function (address, timestamp, onSuccess, onError) {
    var sql = "SELECT * FROM Measurements WHERE Address = " + address + " AND Timestamp = " + timestamp;
    dbActions.get(sql, onSuccess, onError);
};