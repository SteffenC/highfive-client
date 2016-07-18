var request = require('request');
var index = require('./index.js');

exports.getprofile = function (req, res, resource, callback){
	if(req.body.userId) {
		req.session.userId = req.body.userId;
	}

	request({
		url: "https://139.59.128.218:2000/" + req.session.userId + resource,
		method: "POST",
		json: true,
		rejectUnhauthorized : false,
		headers: {'authorization' : req.session.userToken, 'token_type' : "bearer"}
	},
	function (error, res, body){
		if(body && res.body.ticket) {
			exports.exchangeTicket(req, req.session.userId, res.body.ticket, resource, callback);
		}
	});
}

exports.tickets = function(req, res, callback){
	request({
		url: "https://139.59.128.218:3000/ticket/requests",
		method: "GET",
		json: true,
		rejectUnhauthorized : false,
		headers: {'authorization' : req.session.userToken, 'token_type' : "bearer"}//headers: {'authorization' : index.userToken.access_token, 'token_type' : index.userToken.token_type }
	},
	function (error, res, body){
		if(body)
		  callback(body);
	});
}

exports.policies = function(req, res, callback){
	request({
		url: "https://139.59.128.218:3000/policies",
		method: "GET",
		json: true,
		rejectUnhauthorized : false,
		headers: {'authorization' : req.session.userToken, 'token_type' : "bearer"}//headers: {'authorization' : index.userToken.access_token, 'token_type' : index.userToken.token_type }
	},
	function (error, res, body){
		if(body)
		  callback(body);
	});
}


exports.exchangeTicket = function(req, userId, ticket, resource, callback) {
	request({
		url: "https://139.59.128.218:3000/rpt",
		method: "POST",
		json: true,
		rejectUnhauthorized : false,
		headers: {'authorization' : req.session.userToken, 'token_type' : "bearer"},
		body: {
				"ticket": ticket
		}
	},
	function (error, res, body){
		if(res.body && res.body.rpt) {
			exports.exchangeRpt(req, userId, res.body.rpt, resource, callback)
		}
	});
}

exports.exchangeRpt = function(req, userId, rpt, resource, callback) {
	request({
		url: "https://139.59.128.218:2000/" + req.session.userId + resource,
		method: "POST",
		json: true,
		rejectUnhauthorized : false,
		headers: {'authorization' : req.session.userToken, 'token_type' : "bearer"},
		body: {
			"token": rpt
		}
	},
	function (error, res, body){
		if(res.body) {
			callback(res.body);
		}
	});
}

exports.sendPolicy = function(req, userId, callback) {
	request({
		url: "https://139.59.128.218:3000/register/policy",
		method: "POST",
		json: true,
		rejectUnhauthorized : false,
		headers: {'authorization' : req.session.userToken, 'token_type' : "bearer"},
		body: {
			"grant": req.body.grant,
			"resource_id": req.body.resource_id,
			"owner_id": req.session.userId,
			"update": req.body.update
		}
	},
	function (error, res, body){
		if(body)
			callback(body);
	});
}
