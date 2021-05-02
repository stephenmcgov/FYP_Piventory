var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var logger = require('morgan');
var helmet = require('helmet');
var mongoSanitize = require('express-mongo-sanitize');

//route vars
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const addStoreRoute = require("./routes/addStore");
const addProductRoute = require("./routes/addProduct");
const delProductRoute = require("./routes/deleteProduct");
const updateProductRoute = require("./routes/updateProduct");
const addReportRoute = require("./routes/addReport");

app = express(),

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set security options
// Sets "X-Content-Type-Options: nosniff"
app.use(helmet.noSniff());
// Sets "Content-Security-Policy"
/*app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);*/
/* SSL Settings 
// Sets "Expect-CT: maxAge=86400, enforce"
app.use(
  helmet.expectCT({
	maxAge:86400,
	enforce:true,
  })
);
// Sets "Strict-Transport-Security: max-age=x", set to default
app.use(
  helmet.hsts({
	maxAge:15552000,
  })
);
// End of SSL Settings */
// Sets "X-DNS-Prefetch-Control: off"
app.use(
  helmet.dnsPrefetchControl({
    allow: false,
  })
);
// Sets "X-Download-Options: noopen"
app.use(helmet.ieNoOpen());
// Sets "X-Frame-Options: SAMEORIGIN"
app.use(
  helmet.frameguard({
    action: "sameorigin",
  })
);
// Sets "X-Permitted-Cross-Domain-Policies: none"
app.use(
  helmet.permittedCrossDomainPolicies({
	permittedPolicies: "none",
  })
);
// Removes the X-Powered-By header if it was set.
app.use(helmet.hidePoweredBy());
// Sets "X-XSS-Protection: 0"
app.use(helmet.xssFilter());

//To remove data, use:
app.use(mongoSanitize());

//Or to replace prohibited characters with _, use:
/*
app.use(mongoSanitize({
  replaceWith: '_'
}));
*/

//setup background env
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(expressValidator());
app.use(session({secret: "YouCan(Not)Connect"}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup routing
app.use('/uploads', express.static('uploads'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addStore', addStoreRoute);
app.use('/addProduct', addProductRoute);
app.use('/deleteProduct', delProductRoute);
app.use('/updateProduct', updateProductRoute);
app.use('/addReport', addReportRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
