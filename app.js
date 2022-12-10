let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methods = require('./methods');
const hbs = require('hbs');

//declaracion de rutas
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let asignaturasRouter = require('./routes/asig'); //declaracion de ruta asignatura
let agendaRouter = require('./routes/agenda')//declaracion de la ruta agenda
let apuntesRouter = require('./routes/apunte'); //declaracion de la ruta apuntes
let calendarioRouter = require('./routes/calendario');//declaracion de la ruta calendario
let alumnoRouter = require('./routes/alumno');//declaracion de la ruta agenda
let asighomeRouter = require('./routes/asighome');//declaracion de la ruta de inicio de asignatura
let estudiantesRouter = require('./routes/estudiante'); //declaracion de la ruta estudiantes
let estudiantes2Router = require('./routes/estudiante2');
let estudiantes3Router = require('./routes/estudiante3');
let estudiantes4Router = require('./routes/estudiante4');
let estudiantes5Router = require('./routes/estudiante5');
let estudiantes6Router = require('./routes/estudiante6');
let estudiantes7Router = require('./routes/estudiante7');
let estudiantes8Router = require('./routes/estudiante8');
let estudiantes9Router = require('./routes/estudiante9');
let verestuRouter = require('./routes/verestu'); //declaracion de la ruta de veresttu
let notaRouter = require('./routes/nota');//declaracion de la ruta nota
let vernotaRouter = require('./routes/vernota');//declaracion de la ruta vernota
let horarioRouter = require('./routes/horarios');
let nota1Router = require('./routes/nota1')//declaracion de la ruta nota1
let nota2Router = require('./routes/nota2')//declaracion de la ruta nota2
let nota3Router = require('./routes/nota3')//declaracion de la ruta nota3
let nota4Router = require('./routes/nota4')//declaracion de la ruta nota4
let nota5Router = require('./routes/nota5')//declaracion de la ruta nota5
let nota6Router = require('./routes/nota6')//declaracion de la ruta nota6
let nota7Router = require('./routes/nota7')//declaracion de la ruta nota7
let nota8Router = require('./routes/nota8')//declaracion de la ruta nota8
let nota9Router = require('./routes/nota9')//declaracion de la ruta nota9
let app = express();
app.disable("x-powered-by");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials', function(err){});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//colocar antes de las rutas
//inyectar solicitud leyendo authtoken
app.use((req, res, next) => {
  const authToken = req.cookies['AuthToken'];
  req.user = methods.authTokens[authToken];
  next();
})

//registro de rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/asignaturas', asignaturasRouter); //ruta de asignatura
app.use('/agenda', agendaRouter); //ruta de agenda
app.use('/apuntes', apuntesRouter); //ruta de apuntes
app.use('/calendario',calendarioRouter)//ruta de calendario
app.use('/alumno', alumnoRouter); //ruta de Alumno
app.use('/asighome', asighomeRouter); //ruta de Asignatura
app.use('/estudiantes', estudiantesRouter); //ruta de Estudiantes
app.use('/estudiantes2', estudiantes2Router);
app.use('/estudiantes3', estudiantes3Router);
app.use('/estudiantes4', estudiantes4Router);
app.use('/estudiantes5', estudiantes5Router);
app.use('/estudiantes6', estudiantes6Router);
app.use('/estudiantes7', estudiantes7Router);
app.use('/estudiantes8', estudiantes8Router);
app.use('/estudiantes9', estudiantes9Router);
app.use('/verestu', verestuRouter);//ruta de estudiante
app.use('/nota', notaRouter); //ruta de nota
app.use('/vernota', vernotaRouter); //ruta de nota
app.use('/horario', horarioRouter);
app.use('/notas1', nota1Router); //ruta de nota de primer grado
app.use('/notas2', nota2Router); //ruta de nota de segundo grado
app.use('/notas3', nota3Router); //ruta de nota de tercer grado
app.use('/notas4', nota4Router); //ruta de nota de cuarto grado
app.use('/notas5', nota5Router); //ruta de nota de quinto grado
app.use('/notas6', nota6Router); //ruta de nota de sexto grado
app.use('/notas7', nota7Router); //ruta de nota de septimo grado
app.use('/notas8', nota8Router); //ruta de nota de octavo grado
app.use('/notas9', nota9Router); //ruta de nota de noveno grado


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Students02', {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("Se establecio conexion a mongodb"))
.catch((e) => console.log("Error", e));
require("./models/notas1");
require("./models/notas2");
require("./models/notas3");
require("./models/notas4");
require("./models/notas5");
require("./models/notas6");
require("./models/notas7");
require("./models/notas8");
require("./models/notas9");

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
