var dbActions = require('../../db/dbActions');

var insertSensorMeasurementSql = "INSERT INTO SensorMeasurements (SensorId, MeasurementId, Value, Timestamp) VALUES (?, ?, ?, ?)";

exports.bulkInsert = function (data, onSuccess, onError) {
    dbActions.executeBulk(insertSensorMeasurementSql, data, onSuccess, onError);
};