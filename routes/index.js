
/*
 * GET home page.
 */





exports.index = function(req, res){
		
	var naslov = 'Diplomski projekt - Node.js server na BeagleBone Black platformi';

	
	res.render('index', { "title": naslov, "loggedIn" : req.session.user_id});
	
};

