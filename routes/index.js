var express         = require('express');
var router          = express.Router();
var status          = require('./errorHandling.js');
var html_dir        = '../html/';
var userInfo        = require ('./createuser.js');
var loginInfo       = require ('./login.js');
var fbToken         = require ('./sendFbToken.js');
var FB              = require('fb');
var graph           = require('fbgraph');
var app             = require('../app.js');
var helpers         = require('express-helpers');
var productsListing = require('./productsListing.js');
var getPicture      = require('./getPicture.js');
var publicProfile   = require('./publicProfile.js');
var profile         = require('./getProfile.js');
var ejs             = require('ejs');
var session         = require('express-session');
var currentUser     = {};
var debug           = require('./debug.js');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index.ejs');
});

/**
* Login, and user management.
**/

//Login from login.js and redirects to user's profile page
router.post('/login', function(req, res) {
  loginInfo.logindata(req, res, function(data){
    req.session.userToken = data.access_token;
    req.session.userId = data.userId;
    debug.login(req, data);
    res.redirect('/profile');
  });

});

//Calls create user form and page
router.get('/createuser', function(req, res) {
  res.render('pages/createuser.ejs');
});

//Create new user through createuser.js
router.post('/createuser', function(req, res) {
  userInfo.processdata(req, res, function(response){
    debug.createUser(req, response);
    //Checks for success or failure in createuser
    currentUser.userId = response.resource.user_id;
    loginInfo.logindata(req, res, function(data){
      debug.login(req, data);
      req.session.userToken = data.access_token;
      req.session.userId = data.userId;
        res.render('pages/connect.ejs');
    });
  });
});

/**
* PRODUCT MANAGEMENT
**/

//GET products from products.js
router.get('/products', function(req, res, next) {
  productsListing.productsList(req, res, function(products) {
    products = JSON.parse(products);
    debug.products(req.session.userToken, products);
    res.render("pages/products.ejs", {products: products, user: currentUser });
  });
});

//GET single product from products.js
router.get('/products/:id', function(req, res, next) {
  productsListing.productsList(req, res, function(product){
    product = JSON.parse(product);
    res.render("pages/productDetails.ejs", {product: product });
  });
});

// Get view for new product.
router.get('/new', function(req, res, next) {
  res.render("pages/newProduct.ejs");
});

//POST new product to products.js
router.get('/products', function(req, res, next) {
  productsListing.productsList(req, res, function(products) {
    products = JSON.parse(products);
    res.render("pages/products.ejs", {products: products, user: currentUser });
  });
});

router.post('/product', function(req, res) {
  console.log("Creasting new product 1");
  productsListing.new(req, res, function(){
    debug.createProduct(req);
    res.redirect("/products");
  });
});

//GET profile
router.get('/profile', function(req, res, next) {
  profile.getprofile(req, res, "/resource/basic", function(account) {
    profile.getprofile(req, res, "/resource/picture", function(fbAccount) {
      profile.tickets(req, res, function(tickets){
        profile.policies(req, res, function(policies) {
          debug.profile(req, account, fbAccount, tickets, policies );
          res.render("pages/profile.ejs", {user: account, facebook: fbAccount, tickets: tickets, "policies": policies});
        })
      })
    })
  });
});

router.get("/users/:userId", function(req, res) {
  publicProfile.getprofile(req, res, "/resource/basic", function(account){
    publicProfile.getprofile(req, res, "/resource/picture", function(fbAccount) {
      if(fbAccount != false) {
        res.render("pages/publicProfile.ejs", {account: account, facebook: fbAccount});
      }else {
        res.render("pages/publicProfile.ejs", {account: account, facebook: ""});
      }
    })
  })
})

//POST policy to authorization server
router.post('/policy', function(req, res, next) {
  debug.policy(req, "");
  profile.sendPolicy(req, res, function(body) {
    res.render("pages/profile.ejs");
  });
});

router.get('/fbtoken', function(req, res, next) {
  debug.facebookReq1({
      "client_id": '1724357184474755'
    , "redirect_uri": 'https://139.59.128.218:8080/fbtoken'
    , "scope": 'email, user_location'
  });

 if (!req.query.code) {
    var authUrl = graph.getOauthUrl({
        "client_id": '1724357184474755'
      , "redirect_uri": 'https://139.59.128.218:8080/fbtoken'
      , "scope": 'email, user_location'
    });

    if (!req.query.error) { //checks whether a user denied the app facebook login/permissions
      res.redirect(authUrl);
    } else {  //req.query.error == 'access_denied'
      res.send('access denied');
    }
    return;
  }

  // code is set
  // we'll send that and get the access token
  graph.authorize({
      "client_id": '1724357184474755'
    , "redirect_uri": 'http://139.59.128.218:12576/fbtoken'
    , "client_secret": '4e235742e3cd01a6804360dd8094fd1b'
    , "code": req.query.code
  }, function (err, facebookRes) {
    req.session.fbToken = facebookRes;
    debug.facebookReq2({ "client_id": '1724357184474755' , "redirect_uri": 'http://139.59.128.218:12576/fbtoken' , "client_secret": '4e235742e3cd01a6804360dd8094fd1b' , "code": req.query.code }, facebookRes)
    res.redirect('/sendFbToken');
  });
});

router.get('/sendFbToken', function(req, res) {
  fbToken.sendToken(req, res, function(response) {
    debug.facebookRes({"headers": {'authorization' : req.session.userToken, 'token_type' : "bearer" }, "body": {'fb_access_token' : req.session.fbToken.access_token}}, response);
    res.redirect('/products');
  });
});

router.get('/productsListing', function(req, res) {
  //exports.userID = res.body.owner_id;
  productsListing.productsList(req, res, function(products) {
    products = JSON.parse(products);
    req.session.userID = products[0].owner_id;
    res.render('/pages/products.ejs', {"products": products});

  });
});

router.get('/getPicture', function(req, res) {
  getPicture.getPicture(req, res, function() {});
  //console.log('Går der noget galt her?')
});

module.exports = router;
