var databaseActions = require('./dbActions');

var createHubStatusTable = "CREATE TABLE IF NOT EXISTS HubStatus (Status TEXT, Timestamp INTEGER);";

var createNodesTable = "CREATE TABLE IF NOT EXISTS Nodes (Address INTEGER UNIQUE NOT NULL, NodeName TEXT, Location TEXT, TypeId INTEGER, IntervalSeconds INTEGER, TxPower INTEGER,PendingRequests TEXT, MeasurementsCount INTEGER);";

var createNodeTypesTable = "CREATE TABLE IF NOT EXISTS NodeTypes (NodeTypeId INTEGER PRIMARY KEY ASC, NodeTypeName TEXT);";

var createSensorsTable = "CREATE TABLE IF NOT EXISTS Sensors (SensorId INTEGER PRIMARY KEY ASC, SensorName TEXT, SensorTypeId INTEGER, Address INTEGER, IsPublic INTEGER, MeasurementsOrder INTEGER, MeasurementUnit TEXT, ScaleFactor REAL);";

var createSensorTypesTable = "CREATE TABLE IF NOT EXISTS SensorTypes (SensorTypeId INTEGER PRIMARY KEY ASC, SensorTypeName TEXT);";

var createMeasurementsTable = "CREATE TABLE IF NOT EXISTS Measurements (MeasurementId INTEGER PRIMARY KEY ASC, Address INTEGER, BatteryPercentage INTEGER, Timestamp INTEGER);";

var createSensorMeasurementsTable = "CREATE TABLE IF NOT EXISTS SensorMeasurements (SensorId INTEGER, MeasurementId INTEGER NOT NULL, Value REAL, Timestamp INTEGER);";

exports.createDatabase = function () {
    console.log('Building database ...');
    databaseActions.executeSQL(createHubStatusTable);
    databaseActions.executeSQL(createNodesTable);
    databaseActions.executeSQL(createNodeTypesTable);
    databaseActions.executeSQL(createSensorsTable);
    databaseActions.executeSQL(createSensorTypesTable);
    databaseActions.executeSQL(createMeasurementsTable);
    databaseActions.executeSQL(createSensorMeasurementsTable);
    console.log('Database is up and running...');
};

exports.dropDatabase = function() {
    databaseActions.executeSQL("DROP TABLE HubStatus");
    databaseActions.executeSQL("DROP TABLE Nodes");
    databaseActions.executeSQL("DROP TABLE NodeTypes");
    databaseActions.executeSQL("DROP TABLE Sensors");
    databaseActions.executeSQL("DROP TABLE SensorTypes");
    databaseActions.executeSQL("DROP TABLE Measurements");
    databaseActions.executeSQL("DROP TABLE SensorMeasurements");
};