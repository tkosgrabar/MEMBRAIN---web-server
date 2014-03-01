
var db = require('../middleware/database.js');



exports.getMainPage = function(req,res){

	
	res.render('controlMain', { "title" : "Kontrolni panel" });

};

exports.getSensorsPage = function(req,res){
	res.render('controlSensors',{ "title" : "Senzori" });
};

