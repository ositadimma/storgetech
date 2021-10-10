require('dotenv').config({
    path:'./.env'
  });
  const bodyParser = require('body-parser');
  const express = require('express');
  const path = require('path');
  const cookieParser = require('cookie-parser');
  
  
  
  // const busboy = require('connect-busboy');
  require('multer')
  // const UAParser = require('ua-parser-js');
  
  // var dbHelper= require('./models');
  // global.ormDb = dbHelper.sequelize;
  //DB connection
  require('./database/connection');
  console.log('connected to database')
  
  // const index = require('./app_server/routes/index');
  // const apiRoutes = require('./app_api/routes/index');
  
  const app = express();
  const cors = require('cors');
  app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.text());
  
  
  
  const itemService= require('./router/item');
  const userService= require('./router/user');
  // app.use(busboy());
  // require('./router/item')
  // require('./router/user')
  app.use('/item', itemService);
  app.use('/user', userService);
  app.get('/', (req,res,next)=>{
    res.send('working')
  })
  
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  // app.use(logger('dev'));
  
  
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  
  // app.use('/', apiRoutes);
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    //res.render('error');
  });
  
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
     res.status(err.status || 500);
     res.render('error', {
      message: err.message,
      error: err,
     });
    });
  }
  
  
   
  app.use(function (err, req, res, next) {
  res.status(err.status || 500).jsonp(responseUtils.buildResponseErrorDto(err.status || 500, 'Error', 'Something is wrong'));
  });
  
  module.exports = app;
  