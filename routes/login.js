var express = require('express');
var router = express.Router();
var requestify = require('requestify');
var http = require('http');
var request = require('request')

exports.logindata = function(req, res, callback) {
	var loginInfo = {};
	loginInfo.email = req.body.email;
	loginInfo.password = req.body.password;
	loginInfo.grant_type = 'password';

	request({
		url: 'https://139.59.128.218:2000/oauth/token',
		method: 'POST',
		json: true,
		rejectUnhauthorized : false,
		headers: {'authorization': 'key'},
		body: loginInfo
	}, function (error, response, body){
		if(body)
		  callback(response.body);
	});
}
