var hubDataService = require('../services/data/HubDataService');

exports.getStatus = function (req, res) {

    hubDataService.getStatus(
        function (data) {
            res.status(200);
            res.send(data);
        }, function () {
            res.status(400);
            res.send();
        });
};
