var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var express = require('express');
var app = express();
var router = express.Router();
//var path = __dirname + 'OOAProject/views/';
app.use('/',router);



router.get('/index',function(req, res){
  res.sendFile(path + 'index.html');
});

app.get('/home',function(req,res){
  
  res.send("home");
});

app.get('/store',function(req,res){
  
  res.send("store page");
});

app.get('/Manage',function(req,res){
  
  res.send("Manage Page");
});

app.listen(3000);

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'kiahzuo', 'kiahzuo123', {
  host: 'localhost',
  dialect: 'mssql',
  operatorsAliases: false,
  dialectOptions:{
    instanceName : 'sqlexpress'
  },
  

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

  const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  });
  
  // force: true will drop the table if it already exists
  User.sync({force: true}).then(() => {
    // Table created
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });
  

  
  // force: true will drop the table if it already exists
  User.sync({force: true}).then(() => {
    // Table created
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  }); 



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
