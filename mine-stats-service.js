
const mongoose = require('mongoose');

require('./models/accounts');
require('./schedulers/accounts');
const accountsRoutes = require('./routes/accounts');

const fetch = require("node-fetch");

const Koa         = require('koa'); // ядро
const Router      = require('koa-router'); // маршрутизация
const bodyParser  = require('koa-bodyparser'); // парсер для POST запросов
const serve       = require('koa-static'); // модуль, который отдает статические файлы типа index.html из заданной директории
const logger      = require('koa-logger'); // опциональный модуль для логов сетевых запросов. Полезен при разработке.
const cors        = require('@koa/cors');

const app         = new Koa();
const router      = new Router();


app.use(serve('public'));
app.use(logger());
app.use(bodyParser());
app.use(cors());

app.use(router.routes()); // потом маршруты
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
