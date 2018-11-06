

const mongoose = require('mongoose');




const GPUSchema = new mongoose.Schema({

	name: { type: String},    
	worker: { type: String},
	pool: { type: String},
	temperature: Number,
	speed: Number,
	fan: Number
	
}, {
  timestamps: true
});

	
const coinSchema = new mongoose.Schema({

    name: { type: String, unique: 'Такое имя уже существует'},
    tickerSymbol: { type: String, unique: 'Такое имя уже существует'},
    exchangeRate: Number

});

const userSchema = new mongoose.Schema({

    login: { type: String, unique: 'Такой логин уже существует'}

});

const rateSchema = new mongoose.Schema({

    pair: { type: String, unique: 'Такая пара уже существует'},
    price: Number

}, {
    timestamps: true
});

const poolAccountSchema = new mongoose.Schema({
  jsonUrl: String,
  accountAddress: {
    type: String,
    required: 'Укажите адрес'
  },
  balance: Number,
  usd: Number,
  uah: Number,
  unconfirmedBalance: Number,
  comment: String,
  user: userSchema,
  coin: coinSchema,
  speed: Number,
  type: {
    type: String,
    enum: ['real', 'virtual', 'pool']
  },
}, {
  timestamps: true
});

mongoose.model('User', userSchema);
mongoose.model('Coin', coinSchema);
mongoose.model('PoolAccount', poolAccountSchema);
mongoose.model('Rate', rateSchema);
mongoose.model('GPU', GPUSchema);

