// Show home screen
exports.show = function(req, res) {
	// Render home screen
	res.render('index', {
		title: 'ITP211 Multimedia Application',
		user : req.user,
		callToAction: 'ITP211'
	});
};
