var dbActions = require('../../db/dbActions');

var insertStatusSql = "INSERT INTO HubStatus (Status, Timestamp) VALUES (?,?)";
var getStatusSql = "SELECT Status, MAX(Timestamp) AS Timestamp FROM HubStatus";

exports.insertHubStatus = function(status, onSuccess, onError) {

    var timestamp = new Date().getTime();

    var data = [status, timestamp];

    dbActions.executeSQLStatement(insertStatusSql, data, onSuccess, onError);
};

exports.getHubStatus = function (onSuccess, onError) {
    dbActions.get(getStatusSql, onSuccess, onError);
};