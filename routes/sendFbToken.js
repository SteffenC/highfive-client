var express = require('express');
var router = express.Router();
var requestify = require('requestify');
var http = require('http');
http.post = require('http-post');
var request = require('request')
var index = require('./index.js');


exports.sendToken = function (req, res, callback) {
	request({
		url: "https://139.59.128.218:2000/service/facebook",
		method: "POST",
		json: true,
		headers: {'authorization' : req.session.userToken, 'token_type' : "bearer" },
		body: {'fb_access_token' : req.session.fbToken.access_token}
	}, function (error, response, body){
		callback(response);
	});


}
