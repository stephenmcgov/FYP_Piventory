var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
//routes
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

//setup background env
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "CSIsTheWorst"}));
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
