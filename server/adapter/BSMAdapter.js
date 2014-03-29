var bsmParser = require('../parsers/MeasurementParser');

var sensorsDataService = require('../services/data/SensorDataService');
var measurementsDataService = require('../services/data/MeasurementDataService');
var sensorMeasurementsDataService = require('../services/data/SensorMeasurementDataService');

exports.onNewMeasurement = function (rawData) {

    console.log('NewMeasurement : ' + rawData);
    var measurement = bsmParser.parseMeasurement(rawData, function (measurement) {
        console.log('ParsedMeasurement : ' + JSON.stringify(measurement));
        persistMeasurement(measurement);
    });
};

var persistMeasurement = function (measurement) {

    var timestamp = new Date().getTime();
    measurementsDataService.insertMeasurement([measurement.Address, measurement.BatteryPercentage, timestamp],
        function (insertedId) {
            sensorsDataService.getByAddress(measurement.Address,
                function (sensors) {
                    var sensorMeasurements = [];
                    sensors.forEach(function (s) {
                        if (undefined != s.MeasurementsOrder && s.MeasurementsOrder < measurement.Values.length) {
                            var smValue = measurement.Values[s.MeasurementsOrder]
                            if (s.ScaleFactor && (s.ScaleFactor > 0 || s.ScaleFactor < 0)) {
                                smValue *= s.ScaleFactor;
                            }
                            var sm = [s.SensorId, insertedId, smValue, timestamp];
                            sensorMeasurements.push(sm);
                        } else {
                            console.log('Sensor with id : ' + s.SensorId + "has invalid MeasurementOrder");
                        }
                    });
                    sensorMeasurementsDataService.bulkInsert(sensorMeasurements, function () {
                        console.log("END: " + new Date().getTime());
                    });
                }, function () {

                });
        }, function (error) {
        });
}