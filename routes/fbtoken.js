var request = require('request')

exports.token = function(req, res, callback){
	request({
		url: 'https://www.facebook.com/dialog/oauth?clientid=1724357184474755&redirect_uri=https://139.59.128.218:1443',
		method: 'GET',
		headers:
			[
				"User-Agent", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
			]
	},
	function (error, response, body){
		var fbAccessToken = response.body;
		callback(response.body);
	});
}
