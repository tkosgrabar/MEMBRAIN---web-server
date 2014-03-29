exports.parseMeasurement = function(rawData, onSuccess, onError) {

    rawData = cleanData(rawData);

    var address = getAddress(rawData, onError);
    var type = getType(rawData, onError);
    var batteryPercentage = getBatteryPercentage(rawData, onError);
    var measurementValues = getMeasurementValues(rawData, onError);

       var measurement = {
        Address : address,
        TypeId  : type,
        BatteryPercentage : batteryPercentage,
        Values  : measurementValues
    };

    onSuccess(measurement);

};

var cleanData = function(rawData, onError) {
    return rawData;
};

var getAddress = function(rawData, onError) {
    return 1;
};

var getType = function(rawData, onError) {
    return 1;
};

var getBatteryPercentage = function(rawData, onError) {
    return 75;
};

var getMeasurementValues = function(rawData, onError) {
    return [1,2,3,4,5,6];
};