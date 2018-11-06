
const fetch     = require("node-fetch");
const mongoose  = require('mongoose');

var Rate        = mongoose.model('Rate');
var User        = mongoose.model('User');
var PoolAccount = mongoose.model('PoolAccount');

setInterval(async () => {

  try {

    const response = await fetch(`https://api.coinmarketcap.com/v1/ticker/Ethereum/`);
    let json = await response.json();
    let rate = await Rate.findOne({pair: 'ETH/USD'});
    rate.price = json[0].price_usd;
    rate.save();

  } catch (error) {
    console.log(error);
  }

}, 1000 * 60);

setInterval(async () => {

  try {

    const response = await fetch(`http://x-fisher.org.ua/usd/currency.php`);
    let json = await response.json();
    let rate = await Rate.findOne({pair: 'USD/UAH'});
    rate.price = json.USD.BUY;
    rate.save();

  } catch (error) {
    console.log(error);
  }

}, 1000 * 60);


setInterval(async () => {

    let accounts = await PoolAccount.find({});

    accounts.forEach(async account => {

        if (account.coin.tickerSymbol === 'ETH') {

        try {

          if (account.type === 'real') {

            const response = await fetch(`http://api.etherscan.io/api?module=account&action=balance&address=${account.accountAddress}&tag=latest&apikey=8F9BREHGM9G9AB19D8HBP9S2NIYKKVFWN3`);

            let json = await response.json();

            account.balance = (json.result / 1000000000000000000).toFixed(2);

          } else if (account.type === 'pool') {

            const response = await fetch(account.jsonUrl);

            let json = await response.json();

            console.log(json.data.balance);

            account.balance = Number(json.data.balance).toFixed(2);

          }

          let ETH_USD_Rate = await Rate.findOne({pair: 'ETH/USD'});
          let USD_UAH_Rate = await Rate.findOne({pair: 'USD/UAH'});

          account.usd = (account.balance * ETH_USD_Rate.price).toFixed(2);
          account.uah = (account.usd * USD_UAH_Rate.price).toFixed(2);

          account.user = await User.findOne({login: 'xfisherbox'});

          account.save();

        } catch (error) {
          console.log(error);
        }

          /*.then((response) => {
            if (response.status === 200) {
              response.json().then((response) => {
                account.balance = response.result / 1000000000000000000;
                account.save();
              })
            }
          });
          */
        }
    })


}, 1000 * 60);
