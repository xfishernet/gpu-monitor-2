
const Router = require('koa-router');

const mongoose = require('mongoose');

const router  = new Router();

var User = mongoose.model('User');

router.get('/user', async (ctx, next) => {

  ctx.body = await User.find({});
  
});


router.get('/user/:id', async (ctx, next) => {

	try {
	  		 
		ctx.body  = await User.findOne({_id: ctx.params.id});		  
	  
	  } catch(err) {			
		  ctx.throw(500, err);
	  }
});

router.post('/user', async (ctx, next) => {

	try {
					
		ctx.body 	= await User.create(ctx.request.body);		
		
	} catch(err) {
		ctx.throw(500, err);
    }
		
		    

});

router.put('/user/:id', async (ctx, next) => {

  try {
		  	  		 
	  ctx.body	 = await User.findOneAndUpdate({_id: ctx.params.id}, ctx.request.body,  {new: true});	  
  
  } catch(err) {		
	  ctx.throw(500, err);
  }

});


router.delete('/user/:id', async (ctx, next) => {
	
  
  try {
	  
	  await User.deleteOne({_id: ctx.params.id});
	  
  } catch(err) {
		ctx.throw(500, err);
  }
		
  
  ctx.body = { id: ctx.params.id } ;
    

});


module.exports = router;
