
/*
 * GET users listing.
 */


exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.getLogin = function(req, res){
	res.render('login');
};

exports.postLogin = function(req, res){
	var user = req.body;
	if(user.username == 'admin' && user.password == '1234'){
		req.session.user_id = 'admin';
		res.redirect('');
		res.location('');
	} else{
		res.send('Nepostojeći korisnik/lozinka');
	}
};


exports.logout = function(req,res){
	delete req.session.user_id;
	
	res.redirect('');
	res.location('');

};