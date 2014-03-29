var sensorDataService = require('../services/data/SensorDataService');

module.exports.listAll = function (req, res) {

    sensorDataService.findAll(
        function (data) {
            res.status(200);
            res.send(data);
        }, function (error) {
            console.log(error);
            res.status(400);
            res.send();
        });
};

module.exports.findById = function (req, res) {

    var sensorId = req.param.id;

    sensorDataService.findById(sensorId,
        function (data) {
            res.status(200);
            res.send(data);
        }, function (error) {
            console.log(error);
            res.status(400);
            res.send();
        });
};

var bsmAdapter = require('../adapter/BSMAdapter');
var CronJob = require('cron').CronJob;
exports.onMeasurement = function(req, res) {
    new CronJob('*/5 * * * * *', function(){
        bsmAdapter.onNewMeasurement();
    }, null, true, "America/Los_Angeles");
};