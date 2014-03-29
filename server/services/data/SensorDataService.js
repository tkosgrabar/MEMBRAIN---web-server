var dbActions = require('../../db/dbActions');

var insertSensorSql = "INSERT INTO Sensors (SensorName, SensorTypeId, Address, IsPublic, MeasurementsOrder, MeasurementUnit, ScaleFactor) VALUES (?, ?, ?, ?, ?, ?, ?)";

exports.insertSensor = function (sensor, onSuccess, onError) {
    dbActions.executeSQLStatement(insertSensorSql, [sensor.SensorName, sensor.SensorTypeId, sensor.Address, sensor.IsPublic, sensor.MeasurementsOrder, sensor.MeasurementUnit, sensor.ScaleFactor], onSuccess, onError);
};

exports.getByAddresses = function (addresses, onSuccess, onError) {
    dbActions.getByIntegerPropertyValues('Sensors', 'Address', addresses, onSuccess, onError);
};

exports.getByAddress = function (address, onSuccess, onError) {
    var sql = "SELECT * FROM Sensors WHERE Address = " + address;
    dbActions.each(sql, onSuccess, onError);
};