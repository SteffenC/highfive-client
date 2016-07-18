var request = require('request');
var index = require('./index.js');

exports.getPicture = function (req, res, callback){

	request({
	url: "http://139.59.128.218:2000/facebook/pictures/" + '1',
	method: "POST",
	json: true,
	headers: {'authorization' : index.userToken.access_token, 'token_type' : index.userToken.token_type}//headers: {'authorization' : index.userToken.access_token, 'token_type' : index.userToken.token_type }
}, function (error, res, body){
		callback(res.body);
	});

}
