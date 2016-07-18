const fs = require('fs');

exports.login = function(req, data) {
  var obj = {};
  var loginInfo = {};
  loginInfo.email = req.body.email;
	loginInfo.password = req.body.password;
	loginInfo.grant_type = 'password';

  obj.client  = {"path": "POST /login", "data": loginInfo};
  obj.server  = data;
  //obj.backendEndpoint = { "path": "/oauth/token", "authorization": "key"};

  fs.appendFile('/home/dev/out.json', "## Login :\n", function (err) {});
  fs.appendFile('/home/dev/out.json', JSON.stringify(obj, null, 2) + "\n", function (err) {});
}

exports.createUser = function(req, data) {
  var userInfo ={};
  var obj = {};

  userInfo.grant_type = "password";
  userInfo.email =req.body.email;
  userInfo.password = req.body.password;
  userInfo.firstname = req.body.firstname;
  userInfo.lastname = req.body.lastname;

  obj.clientEndpoint  = {"path": "POST /createuser", "data": userInfo};
  obj.serverResponse  = data;

  fs.appendFile('/home/dev/out.json', "\n ## Create user :\n", function (err) {});
  fs.appendFile('/home/dev/out.json', JSON.stringify(obj, null, 2) + "\n", function (err) {});

}

exports.facebookReq1 = function(data){
  fs.appendFile('/home/dev/out.json', "\n ## Facebook Initial request :\n", function (err) {});
  fs.appendFile('/home/dev/out.json', JSON.stringify(data, null, 2) + "\n", function (err) {});
}

exports.facebookReq2 = function(auth, data){
  fs.appendFile('/home/dev/out.json', "\n ## Facebook code exchange :\n", function (err) {});
  fs.appendFile('/home/dev/out.json', JSON.stringify(auth, null, 2) + "\n", function (err) {});
  fs.appendFile('/home/dev/out.json', "\n ## FACEBOOK RESPONSE :\n", function (err) {});
  fs.appendFile('/home/dev/out.json', JSON.stringify(data, null, 2) + "\n", function (err) {});
}

exports.facebookRes = function(data, res){
  var obj = {};
  obj.client = data;
  obj.server = {};
  obj.server.endpoint = "POST service/facebook"
  obj.server.response = res.body;
  fs.appendFile('/home/dev/out.json', "\n ## Persist Facebook access token :\n", function (err) {});
  fs.appendFile('/home/dev/out.json', JSON.stringify(obj, null, 2) + "\n", function (err) {});
}

exports.products = function(req, products){
  fs.appendFile('/home/dev/out.json', "\n ## Products :\n", function (err) {});
  var obj = {};
  obj.clientRequest = {};
  obj.clientRequest.path = "GET /products";
  obj.clientRequest.headers = {headers: {'authorization' : req, 'token_type' : "bearer"}};
  obj.serverResponse = products.slice(0,2);

  fs.appendFile('/home/dev/out.json', JSON.stringify(obj, null, 2) + "\n", function (err) {});
}

exports.createProduct = function(req){
  fs.appendFile('/home/dev/out.json', "\n ## Create Product:\n", function (err) {});
  var obj = {};
  obj.clientRequest = {};
  obj.clientRequest.path = "POST /products";
  obj.clientRequest.headers = {'authorization' : req.session.userToken, 'token_type' : "bearer"};
  obj.clientRequest.body = req.body;
  fs.appendFile('/home/dev/out.json', JSON.stringify(obj, null, 2) + "\n", function (err) {});
}

exports.profile = function(req, account, fbAccount, tickets, policies ){
  fs.appendFile('/home/dev/out.json', "\n ## Profile :\n", function (err) {});
  var obj = {};
  obj.clientRequest = {};
  obj.clientRequest.path = "GET https://139.59.128.218:2000/" + req.session.userId + "/resource/basic";
  obj.clientRequest.headers = {'authorization' : req.session.userToken, 'token_type' : "bearer"};
  obj.serverResponse = {};
  obj.serverResponse.resource = [{"/resource/basic": account}, {"/resource/picture": fbAccount}];
  obj.serverResponse.tickets = tickets;
  obj.serverResponse.policies = policies;
  fs.appendFile('/home/dev/out.json', JSON.stringify(obj, null, 2) + "\n", function (err) {});
}

exports.policy = function(req){
  fs.appendFile('/home/dev/out.json', "\n ## Update policy request to authorization server :\n", function (err) {});
  var obj = {};
  obj.clientRequest = {};
  obj.clientRequest.path = "POST https://139.59.128.218:3000/register/policy";
  obj.clientRequest.header = {'authorization' : req.session.userToken, 'token_type' : "bearer"};
  obj.clientRequest.body = { "grant": req.body.grant, "resource_id": req.body.resource_id, "owner_id": req.session.userId, "update": req.body.update };
  fs.appendFile('/home/dev/out.json', JSON.stringify(obj, null, 2) + "\n", function (err) {});
}

exports.ticket = function(req, res){
  fs.appendFile('/home/dev/out.json', "\n ## Request permission ticket :\n", function (err) {});
  var obj = {};
  obj.clientRequest = req;
  obj.serverResponse = res;
  fs.appendFile('/home/dev/out.json', JSON.stringify(obj, null, 2) + "\n", function (err) {});
}

exports.rpt = function(req, res){
  fs.appendFile('/home/dev/out.json', "\n ## Exhange ticket for RPT :\n", function (err) {});
  var obj = {};
  obj.clientRequest = req;
  obj.serverResponse = res;
  fs.appendFile('/home/dev/out.json', JSON.stringify(obj, null, 2) + "\n", function (err) {});
}

exports.resource = function(req, res){
  fs.appendFile('/home/dev/out.json', "\n ##  Access resource with RPT:\n", function (err) {});
  var obj = {};
  obj.clientRequest = req;
  obj.serverResponse = res;
  fs.appendFile('/home/dev/out.json', JSON.stringify(obj, null, 2) + "\n", function (err) {});
}
