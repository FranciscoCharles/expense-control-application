const createError = require('http-errors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const indexRouter = require('./routes/index');
const expenseRouter = require('./routes/expense')
const authRouter = require('./routes/auth')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(cors({
  origin: "*",
  methods:['GET','PUT','POST','DELETE']
}));
/*app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  
  next();
});*/
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/expense', expenseRouter);
app.use('/auth', authRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
/*app.use(function (err, req, res, next) {
  /* // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'); */
/*console.log('\n\n\n',"ocorreu um error","\n\n\n\n")
switch (true) {
  case typeof err === 'string':
    // custom application error
    const is404 = err.toLowerCase().endsWith('not found');
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  case err.name === 'ValidationError':
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  case err.name === 'UnauthorizedError':
    // jwt authentication error
    return res.status(401).json({ message: 'Unauthorized' });
  default:
    return res.status(500).json({ message: err.message });
}*-/
next();
});*/

module.exports = app;
