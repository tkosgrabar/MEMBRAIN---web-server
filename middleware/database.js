var fs = require('fs');
var file = 'database.db';
var exists = fs.existsSync(file);

var counter = 0;

if(!exists){
	console.log("Creating database file...");
	fs.openSync(file,"w");
	exists = true;
}

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);




function CreateEventTable(){
	db.serialize(function(){
		db.run("CREATE TABLE IF NOT EXISTS Events (name TEXT, status TEXT, time INTEGER)");
	});

};

function CreateCommandTable(){
	db.serialize(function(){
		db.run("CREATE TABLE IF NOT EXISTS Commands (sender TEXT, name TEXT, params TEXT, time INTEGER)");
	});

};

function CreateSensorTable(){
	db.serialize(function(){
		db.run("CREATE TABLE IF NOT EXISTS SensorTable (number INTEGER UNIQUE, adress TEXT , type INTEGER, identifier TEXT, locationX INTEGER, locationY INTEGER, locationZ INTEGER, interval INTEGER, lastResponse INTEGER ,txPower INTEGER, pendingRequests TEXT, timestamp INTEGER )");
	});
};

function CreatenRFHubStatusTable(){
	db.serialize(function(){
		db.run("CREATE TABLE IF NOT EXISTS nRFHubStatus (status TEXT, timestamp INTEGER )");
	});
};

function ___CreateSensorDataTable(){
	db.serialize(function(){
		db.run("CREATE TABLE IF NOT EXISTS SensorDataTable (adress TEXT, battery TEXT, data1 TEXT,data2 TEXT,data3 TEXT,data4 TEXT,data5 TEXT, free TEXT, timestamp INTEGER)");
	});
};

function CreateSensorDataTable(){
	db.serialize(function(){
		db.run("CREATE TABLE IF NOT EXISTS SensorDataTable (adress TEXT, battery TEXT, data TEXT, timestamp INTEGER)");
	});
};

exports.init = function(){
	console.log('DB init...');
	CreateEventTable();
	CreateCommandTable();
	CreateSensorTable();
	CreatenRFHubStatusTable();
	CreateSensorDataTable();
};

// Events table

exports.AddButtonPressEvent = function(buttonName, status){
	var time = counter++;
	console.log("pisem u tablicu Events: " + buttonName + " " + status + " " + time);

	db.serialize(function(){
		
		var stmt = db.prepare("INSERT INTO Events(name, status, time) VALUES(?, ?, ?)");
		stmt.run(buttonName, status, time);

		stmt.finalize();

	});

};

exports.GetAllEvents = function(callback){
	var data = [];
	db.serialize(function(){
		console.log("Dohvacam podatke...");
		var sql = "SELECT * FROM Events";

		db.each(sql, function(err,row){
			if(err)
				console.log("Error...");
			console.log("name: " + row.name);
			console.log("status: " + row.status);
			console.log("time: " + row.time);

			data.push({name : row.name, status : row.status, time : row.time});


		},function(){
			callback(data);
		
		});
	});
	
};

exports.GetLastEvent = function(callback){
	var data = [];

	db.serialize(function(){
		console.log("Dohvacam podatke...");
		var sql = "SELECT name, status, MAX(time) AS time FROM Events GROUP BY name";

		db.each(sql, function(err,row){
			if(err)
				console.log("Error...");
			console.log("name: " + row.name);
			console.log("status: " + row.status);
			console.log("time: " + row.time);

			data.push({name : row.name, status : row.status, time : row.time});


		},function(){
			callback(data);
		
		});
	});

};


// Commands table

exports.AddCommand = function(sender,name, params){
	var time = counter++;

	console.log("pisem u tablicu Commands: " + sender + " " + name + " " + params + " " + " " + time);

	db.serialize(function(){
		
		var stmt = db.prepare("INSERT INTO Commands(sender, name, params, time) VALUES(?, ?, ?, ?)");
		stmt.run(sender,name, params, time);

		stmt.finalize();

	});

};

exports.GetAllCommands = function(callback){
	var data = [];
	db.serialize(function(){
		console.log("Dohvacam podatke iz tablice Commands...");
		var sql = "SELECT * FROM Commands";

		db.each(sql, function(err,row){
			if(err)
				console.log("Error...");
			console.log("sender" + row.sender);
			console.log("name: " + row.name);
			console.log("params: " + row.params);
			console.log("time: " + row.time);

			data.push({sender : row.sender, name : row.name, params : row.params, time : row.time});


		},function(){
			callback(data);
		
		});

	});
};

// Sensors table

exports.AddSensor = function(data,callback){
	var time = counter++;

	console.log("pisem u tablicu SensorTable... " );
	
	var timestamp = new Date().getTime();
	
	db.serialize(function(){
		
		var stmt = db.prepare("INSERT OR REPLACE INTO SensorTable(number, adress, type, identifier, locationX, locationY, locationZ, interval, lastResponse,txPower, pendingRequests, timestamp) VALUES(?,?,?,?,?, ?,?,?,?,?, ?,?)");
		stmt.run(data.Number, data.Adress, data.Type,data.Identifier, data.LocationX,data.LocationY,data.LocationZ, data.Interval, data.LastResponse, data.TxPower, data.PendingRequests, timestamp); 

		stmt.finalize();

	});

	if(callback)
		callback();

};

exports.GetSensorTable = function(callback){
	var data = [];
	db.serialize(function(){
		console.log("Dohvacam podatke iz tablice SensorTable...");
		var sql = "SELECT * FROM SensorTable";

		db.each(sql, function(err,row){
			if(err)
				console.log("Error..."); 

			data.push({ Number : row.number,
						Adress : row.adress,
						Type : row.type,
						Identifier : row.identifier,
						LocationX : row.locationX,
						LocationY : row.locationY,
						LocationZ : row.locationZ,
						Interval : row.interval,
						LastResponse : row.lastResponse,
						TxPower : row.txPower,
						PendingRequests : row.pendingRequests,
						TimeStamp : row.timestamp});

		},function(){
			callback(data);
		
		});

	});
};



exports.ClearSensorTable = function(callback){
	console.log("Brisem podatke iz tablice SensorTable...");

	db.serialize(function(){
		var sql = "DROP TABLE SensorTable";
		db.run(sql);
		sql = "CREATE TABLE IF NOT EXISTS SensorTable (number INTEGER UNIQUE, adress TEXT UNIQUE, type INTEGER, identifier TEXT, locationX INTEGER, locationY INTEGER, locationZ INTEGER, interval INTEGER, lastResponse INTEGER ,txPower INTEGER, pendingRequests TEXT, timestamp INTEGER )"
		db.run(sql);
	});

	if(callback)
		callback();
};
// nRF Hub status

exports.AddnRFHubStatus = function(data,callback){
	
	console.log("pisem u tablicu nRFHubStatus... " );
	
	var timestamp = new Date().getTime();
	
	db.serialize(function(){
		
		var stmt = db.prepare("INSERT INTO nRFHubStatus (status, timestamp) VALUES(?,?)");
		stmt.run(JSON.stringify(data), timestamp); 

		stmt.finalize();

	});

	if(callback)
		callback();
};

exports.GetnRFHubStatus = function(callback){
	var data = [];
	db.serialize(function(){
		console.log("Dohvacam podatke iz tablice nRFHubStatus...");
		var sql = "SELECT status, MAX(timestamp) AS timestamp FROM nRFHubStatus";

		db.each(sql, function(err,row){
			if(err)
				console.log("Error...");

			data.push({ Status : row.status,
						TimeStamp : row.timestamp});

		},function(){
			callback(data);
		
		});

	});
};

// Sensor data

exports.AddSensorData = function(data,callback){
	console.log("pisem u tablicu SensorDataTable... " );
	var timestamp = new Date().getTime();

	db.serialize(function(){
		
		var stmt = db.prepare("INSERT INTO SensorDataTable (adress, battery, data, timestamp) VALUES(?,?,?,?)");
		stmt.run(data.Adress,data.Battery,JSON.stringify(data.Data), timestamp); 

		stmt.finalize();

	});

	if(callback)
		callback();
};

exports.GetSensorData = function(callback){
	var data = [];
	db.serialize(function(){
		console.log("Dohvacam podatke iz tablice SensorDataTable...");
		var sql = "SELECT * FROM SensorDataTable" ;

		db.each(sql, function(err,row){
			if(err)
				console.log("Error...");

			data.push({ Adress : row.adress,
						Battery: row.battery,
						Data : row.data,
						TimeStamp : row.timestamp});

		},function(){
			callback(data);
		});
	});
};

exports.GetLastSensorData = function(callback){
	var data = [];
	console.log("dohvacam podatke od senzora");
	db.serialize(function(){
		var sql = "SELECT SensorDataTable.adress AS Adress, type, data, MAX(SensorDataTable.timestamp) AS Time " + 
						"FROM SensorDataTable LEFT OUTER JOIN SensorTable " + 
       						"ON SensorDataTable.adress = SensorTable.adress " +
       					"GROUP BY SensorDataTable.adress";
       

		db.each(sql, function(err,row){
			if(err)
				console.log("Error...");
			else {
			console.log("adress: " + row.Adress);
			console.log("type: " + row.type);
			console.log("data: " + row.data);
			console.log("time: " + row.Tata);
			

			data.push({Adress : row.Adress, Type : row.type, Data : JSON.parse(row.data), TimeStamp : row.Time});
			}

		},function(){
			console.log("Zovem callback");
			callback(data);
		
		});
	});

};

exports.GetSensorDataByAdress = function(adress, callback){
	var data = [];
	console.log("dohvacam podatke od senzora");
	db.serialize(function(){
		var sql = "SELECT SensorDataTable.adress AS Adress, type, data, SensorDataTable.timestamp AS Time " + 
						"FROM SensorDataTable LEFT OUTER JOIN SensorTable " + 
       						"ON SensorDataTable.adress = SensorTable.adress " +
       					"WHERE SensorDataTable.adress = '" + adress +"'";
       
       	console.log(sql);

		db.each(sql, function(err,row){
			if(err)
				console.log("Error...");
			else {
			console.log("adress: " + row.Adress);
			console.log("type: " + row.type);
			console.log("data: " + row.data);
			console.log("time: " + row.Tata);
			

			data.push({Adress : row.Adress, Type : row.type, Data : JSON.parse(row.data), TimeStamp : row.Time});
			}

		},function(){
			console.log("Zovem callback");
			callback(data);
		
		});
	});

};


