const mongoose = require('mongoose');


const crypto = require('crypto');

const userSchema = new mongoose.Schema({

	displayName: String,
    login: { type: String, unique: 'Login is exists!'},
    email: { type: String, unique: 'Email is exists!'},
    passwordHash: String,
    salt: String,

}, {
  timestamps: true
});

userSchema.virtual('password')
.set(function (password) {
  this._plainPassword = password;
  if (password) {
    this.salt = crypto.randomBytes(128).toString('base64');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
  } else {
    this.salt = undefined;
    this.passwordHash = undefined;
  }
})

.get(function () {
  return this._plainPassword;
});

userSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};


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


mongoose.model('Coin', coinSchema);
mongoose.model('PoolAccount', poolAccountSchema);
mongoose.model('Rate', rateSchema);
mongoose.model('GPU', GPUSchema);
mongoose.model('User', userSchema);
