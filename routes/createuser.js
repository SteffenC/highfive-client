var express = require('express');
var router = express.Router();
var requestify = require('requestify');
var http = require('http');
http.post = require('http-post');
var request = require('request');


exports.processdata = function(req, res, callback) {
	var userInfo ={};
	userInfo.grant_type = "password";
	userInfo.email =req.body.email;
	userInfo.password = req.body.password;
	userInfo.firstname = req.body.firstname;
	userInfo.lastname = req.body.lastname;

	//POST to Highfive Backend
	request({
	    url: "https://139.59.128.218:2000/users/",
	    method: "POST",
	    json: true,
	    headers: {
	        'authorization': 'key'
	    },
	    body: userInfo
	}, function (error, response, body){
	    callback(body);
	});
	//Post to highfive Auth server


}
