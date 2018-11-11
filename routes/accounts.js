
const Router = require('koa-router');

const mongoose = require('mongoose');

const router  = new Router();

var PoolAccount = mongoose.model('PoolAccount');
var Coin 		= mongoose.model('Coin');

router.get('/poolAccount', async (ctx, next) => {

  let accounts = await PoolAccount.find({});
  ctx.body = accounts;

});


router.get('/poolAccount/:id', async (ctx, next) => {

	try {
 		 
		ctx.body  = await PoolAccount.findOne({_id: ctx.params.id});		  
	  
	} catch(err) {			
		ctx.throw(500, err);
	}
	  
});


router.post('/poolAccount', async (ctx, next) => {

	try {
		
		ctx.request.body.coin	 = await Coin.findOne({_id: ctx.request.body.coin});
		ctx.body 	= await PoolAccount.create(ctx.request.body);		
		
	} catch(err) {
		ctx.throw(500, err);
    }

});

router.put('/poolAccount/:id', async (ctx, next) => {

	  try {
	  		 
		  ctx.request.body.coin	 = await Coin.findOne({_id: ctx.request.body.coin});		  		  		 
		  ctx.body	 = await PoolAccount.findOneAndUpdate({_id: ctx.params.id}, ctx.request.body,  {new: true});	  
	  
	  } catch(err) {		
		  ctx.throw(500, err);
	  }


});


router.delete('/poolAccount/:id', async (ctx, next) => {
	  
	  try {
		  
		  await PoolAccount.deleteOne({_id: ctx.params.id});
		  
	  } catch(err) {
			ctx.throw(500, err);
	  }
			
	  
	  ctx.body = { id: ctx.params.id } ;

});


module.exports = router;
