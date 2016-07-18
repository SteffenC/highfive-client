var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var https = require('https');
var fs = require('fs');
var express = require('express');

var options = {
    key:  fs.readFileSync('/etc/hf-certificates/highfive-cl.key'),
    cert: fs.readFileSync('/etc/hf-certificates/highfive-cl.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

var app = express();
var server = https.createServer(options, app).listen(8080, function(){
    console.log("server started at port 8080");
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'html')));

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: "cookie_secret",
    name: "cookie_name",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

/* GET home page. */
app.get('/', function(req, res) {
    res.render('pages/index');
});



module.exports = app;