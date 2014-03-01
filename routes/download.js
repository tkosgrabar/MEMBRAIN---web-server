 


exports.getPage = function(req,res){
	res.render('download');
};

exports.getFile = function(dir){
	return function(req,res){
		var file = req.params.file;
		var path = dir + '/' + file;
		console.log(path);
		res.download(path); 
	};
};