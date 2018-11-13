const passport 			= require('koa-passport');
const Router 			= require('koa-router');
const mongoose 			= require('mongoose');

const router  = new Router();

router.use(passport.authenticate('jwt', {session:false}));

var Coin = mongoose.model('Coin');

router.get('/coin', async (ctx, next) => {

  ctx.body = await Coin.find({});
  
});


router.get('/coin/:id', async (ctx, next) => {

	try {
	  		 
		ctx.body  = await Coin.findOne({_id: ctx.params.id});		  
	  
	  } catch(err) {			
		  ctx.throw(500, err);
	  }
});

router.post('/coin', async (ctx, next) => {

	try {
					
		ctx.body 	= await Coin.create(ctx.request.body);		
		
	} catch(err) {
		ctx.throw(500, err);
    }
		
		    

});

router.put('/coin/:id', async (ctx, next) => {

  try {
		  	  		 
	  ctx.body	 = await Coin.findOneAndUpdate({_id: ctx.params.id}, ctx.request.body,  {new: true});	  
  
  } catch(err) {		
	  ctx.throw(500, err);
  }

});


router.delete('/coin/:id', async (ctx, next) => {
	
  
  try {
	  
	  await Coin.deleteOne({_id: ctx.params.id});
	  
  } catch(err) {
		ctx.throw(500, err);
  }
		
  
  ctx.body = { id: ctx.params.id } ;
    

});


module.exports = router;
