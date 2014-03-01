
var db = require('../middleware/database.js');

// Ovo su samo testne rute koje se neće koristiti

exports.getLastEvents = function(req,res){
	db.GetLastEvent(function(eventData){
		console.log("API:Saljem podatke (LastEvents)...");
		res.send(eventData);
	});
};

exports.getAllEvents = function(req,res){
	db.GetAllEvents(function(eventData){
		console.log("API:Saljem podatke (AllEvents)...");
		res.send(eventData);
	});
};

exports.getAllCommands = function(req,res){
	db.GetAllCommands(function(commandData){
		console.log("API:Saljem podatke (Commands)...");
		res.send(commandData);
	});
};


// Metode za dohvaćanje podataka sa senzorske mreže


exports.getAllSensors = function(req,res){
	db.GetSensorTable(function(commandData){
		console.log("API:Saljem podatke (Sensors)...");
		res.send(commandData);
	});

}

exports.getLastSensorData = function(req,res){
	db.GetLastSensorData(function(data){
		res.send(data);
	});
}

exports.getSensorDataByAdress = function(req,res){
	var adress = req.params.adress;
	db.GetSensorDataByAdress(adress,function(data){
		res.send(data);
	});
}

exports.getAllSensorsStatuses = function(req,res){
	db.GetAllSensorsStatuses(function(commandData){
		console.log("API:Saljem podatke (Sensors)...");
		res.send(commandData);
	});

}

