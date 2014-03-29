var dbActions = require('../../db/dbActions');

var insertOrReplaceNodeSql = "INSERT OR REPLACE INTO Nodes (Address, NodeName, Location, TypeId, IntervalSeconds, TxPower, PendingRequests, MeasurementsCount) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
var deleteNodeByAddressSql = "DELETE FROM Nodes WHERE Address = ? ";
var getAllNodes = "SELECT * FROM Nodes";

exports.bulkInsertOrReplace = function (data, onSuccess, onError) {
    dbActions.executeBulk(insertOrReplaceNodeSql, data, onSuccess, onError);
};

exports.deleteByAddresses = function (addresses, onSuccess, onError) {
    dbActions.executeBulk(deleteNodeByAddressSql, addresses, onSuccess, onError);
};

exports.getAll = function (onSuccess, onError) {
    dbActions.each(getAllNodes, onSuccess, onError);
};

exports.getByAddresses = function (addresses, onSuccess, onError) {
    dbActions.getByIntegerPropertyValues('Nodes', 'Address', addresses, onSuccess, onError);
};