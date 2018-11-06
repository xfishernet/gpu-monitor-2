
const Router = require('koa-router');

const mongoose = require('mongoose');

const router  = new Router();

var PoolAccount = mongoose.model('PoolAccount');

router.get('/poolAccount', async (ctx, next) => {

  let accounts = await PoolAccount.find({});
  ctx.body = accounts;

});

router.post('/poolAccount', async (ctx, next) => {

    ctx.body = ctx.request.body;

});

router.put('/poolAccount', async (ctx, next) => {

  let accounts = await PoolAccount.find({});
  ctx.body = accounts;

});


router.delete('/poolAccount', async (ctx, next) => {

  let accounts = await PoolAccount.find({});
  ctx.body = accounts;

});


module.exports = router;
