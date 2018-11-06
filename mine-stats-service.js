
const mongoose = require('mongoose');

require('./models/accounts');
require('./schedulers/accounts');
const accountsRoutes = require('./routes/accounts');

const fetch = require("node-fetch");

const Koa         = require('koa'); 
const Router      = require('koa-router'); 
const bodyParser  = require('koa-bodyparser');
const serve       = require('koa-static'); 
const logger      = require('koa-logger'); 
const cors        = require('@koa/cors');

const app         = new Koa();
const router      = new Router();


app.use(serve('public'));
app.use(logger());
app.use(bodyParser());
app.use(cors());

app.use(router.routes());
app.use(accountsRoutes.routes());



mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/mine-stats', { useNewUrlParser: true });


var Rate        = mongoose.model('Rate');
var PoolAccount = mongoose.model('PoolAccount');
var Coin        = mongoose.model('Coin');

/*
 Rate.create({
  pair: 'USD/UAH',
  price: 0
})
*/

/*
Coin.findOne({tickerSymbol: 'ETH'}, (err, coin) => {

  console.log(coin.name);

  PoolAccount.create({

    accountAddress: 'nanopool ETH Alexander',
    coin: coin,
    balance: 0,
    type: 'pool'

  });

})
*/


const server = app.listen(3000);
