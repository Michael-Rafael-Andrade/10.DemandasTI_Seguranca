// importação do dotenv para carregar variáveis de ambiente do arquivo .env 
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs'); // importação do hbs
var session = require('express-session'); // importar o session do express
var passport = require('./config/passport');
var helmetMiddleware = require('./config/helmet'); // importar o arquivo de configuração do helmet

var indexRouter = require('./routes/rotasIndex');
var demandasRouter = require('./routes/rotasDemandas');
var usuariosRouter = require('./routes/rotasUsuarios');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// REGISTRA PARTIAL DO HANDLEBARS (VIEW/PARTIALS)
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(logger('dev'));

// definição do ambiente de execução, posição é importante
var emProd = process.env.ENV === 'prod';


// Helmet = Cabeçalho de Segurança HTTP
// Deve ser registrado antes de qualquer rota ou middleware que envia respostas
app.use(helmetMiddleware(emProd));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do middleware de sessão, utilizando express-session
app.use(session({
  // (.env) Chave usada para assinar o cookie de sessão e evitar adulteração.
  secret: process.env.SESSION_SECRET,
  // Evita salvar a sessão novamente se nada foi alterado durante a requisição.
  resave: false,
  // Não cria sessão para visitantes que ainda não autenticaram/ interagiram com sessão.
  saveUninitialized: false,
  cookie: {
    // Impede acesso ao cookie via JavaScript do navegador (mitiga XSS).
    httpOnly: true,
    // (.env) Em produção com HTTPS deve se true; em ambiente local HTTP fica false.
    secure: process.env.COOKIE_SECURE === 'true',
    // (.env) Duração da sessão no navegador: 24 horas em milissegundos.
    maxAge: parseInt(process.env.COOKIE_MAX_AGE, 10),
  },
}));

app.use('/', indexRouter);
app.use('/demandas', demandasRouter);

// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
