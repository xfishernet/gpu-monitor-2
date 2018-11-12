
const mongoose = require('mongoose');

require('./models/models');
require('./schedulers/accounts');
const accountsRoutes = require('./routes/accounts');
const gpuRoutes 	 = require('./routes/gpu');
const coinRoutes 	 = require('./routes/coin');
const userRoutes 	 = require('./routes/user');
const rateRoutes 	 = require('./routes/rate');

const sleep = require('koa-sleep')

const fetch = require("node-fetch");

const Koa         = require('koa'); 
const Router      = require('koa-router'); 
const bodyParser  = require('koa-bodyparser');
const serve       = require('koa-static'); 
const logger      = require('koa-logger'); 
const cors        = require('@koa/cors');
const json 		  = require('koa-json')

const passport 		= require('koa-passport');
const LocalStrategy = require('passport-local');
const JwtStrategy 	= require('passport-jwt').Strategy;
const ExtractJwt 	= require('passport-jwt').ExtractJwt; 

const app         = new Koa();
const router      = new Router();

app.use(passport.initialize());
app.use(passport.session());

app.use(json());
app.use(serve('public'));
app.use(logger());
app.use(bodyParser());
app.use(cors());

app.use(router.routes());
app.use(accountsRoutes.routes());
app.use(gpuRoutes.routes());
app.use(rateRoutes.routes());
app.use(coinRoutes.routes());
app.use(userRoutes.routes());




mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/mine-stats', { useNewUrlParser: true });


var Rate        = mongoose.model('Rate');
var PoolAccount = mongoose.model('PoolAccount');
var Coin        = mongoose.model('Coin');
var GPU	        = mongoose.model('GPU');
var User	    = mongoose.model('User');



const server = app.listen(3000);

module.exports = server;
