var request = require('request')

exports.productsList = function(req, res, callback){
	var id = "";
	if(req.params.id) {
		id = req.params.id;
	}
  request({
    url : 'https://139.59.128.218:2000/products/'+id,
    method : 'GET',
    headers : {'authorization' : 'key'}
  },
  function(error, response, body){
    if(body)
      callback(response.body);
  });
}

exports.new = function(req, res, callback) {
  console.log("Creating new product 2");  
  request({
		url: 'https://139.59.128.218:2000/products/',
		method: 'POST',
		json: true,
		rejectUnhauthorized : false,
		headers: {'authorization' : req.session.userToken, 'token_type' : "bearer"},
		body: req.body
	}, function (error, response, body){
		if(body)
		  callback(response.body);
	});
}