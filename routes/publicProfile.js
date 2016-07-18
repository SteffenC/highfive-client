var request = require('request');
var index = require('./index.js');
var debug = require('./debug.js');


exports.getprofile = function (req, res, resource, callback){
	if(req.body.userId) {
		req.session.userId = req.body.userId;
	}

	request({
		url: "https://139.59.128.218:2000/" + req.params.userId + resource,
		method: "POST",
		json: true,
		headers: {'authorization' : req.session.userToken, 'token_type' : "bearer"}//headers: {'authorization' : index.userToken.access_token, 'token_type' : index.userToken.token_type }
	},
	function (error, res, body){
		if(res.body.ticket) {
      debug.ticket( { "header": {'authorization' : req.session.userToken, 'token_type' : "bearer"} }, res.body.ticket );
			exports.exchangeTicket(req, req.session.userId, res.body.ticket, resource, callback);
		}
	});
}

exports.exchangeTicket = function(req, userId, ticket, resource, callback) {
	request({
		url: "https://139.59.128.218:3000/rpt",
		method: "POST",
		json: true,
		headers: {'authorization' : req.session.userToken, 'token_type' : "bearer"},
		body: {
				"ticket": ticket
		}
	},
	function (error, res, body){
		if(res.body.rpt) {
      debug.rpt({headers: {'authorization' : req.session.userToken, 'token_type' : "bearer"}, body: { "ticket": ticket }}, res.body);
			exports.exchangeRpt(req, userId, res.body.rpt, resource, callback)
		}else {
			callback(false);
		}
	});
}


exports.exchangeRpt = function(req, userId, rpt, resource, callback) {
	request({
		url: "https://139.59.128.218:2000/" + req.params.userId + resource,
		method: "POST",
		json: true,
		headers: {'authorization' : req.session.userToken, 'token_type' : "bearer"},
		body: {
			"token": rpt
		}
	},
	function (error, res, body){
    debug.resource({"headers": {'authorization' : req.session.userToken, 'token_type' : "bearer"}, "body": { "token": rpt }}, res.body);
		callback(res.body);
	});
}
