
const Router = require('koa-router');

const mongoose = require('mongoose');

const router  = new Router();

var Rate = mongoose.model('Rate');

router.get('/rate', async (ctx, next) => {

  ctx.body = await Rate.find({});
  
});


router.get('/rate/:id', async (ctx, next) => {

	try {
	  		 
		ctx.body  = await Rate.findOne({_id: ctx.params.id});		  
	  
	  } catch(err) {			
		  ctx.throw(500, err);
	  }
});

router.post('/rate', async (ctx, next) => {

	try {
					
		ctx.body 	= await Rate.create(ctx.request.body);		
		
	} catch(err) {
		ctx.throw(500, err);
    }
		
		    

});

router.put('/rate/:id', async (ctx, next) => {

  try {
		  	  		 
	  ctx.body	 = await Rate.findOneAndUpdate({_id: ctx.params.id}, ctx.request.body,  {new: true});	  
  
  } catch(err) {		
	  ctx.throw(500, err);
  }

});


router.delete('/rate/:id', async (ctx, next) => {
	
  
  try {
	  
	  await Rate.deleteOne({_id: ctx.params.id});
	  
  } catch(err) {
		ctx.throw(500, err);
  }
		
  
  ctx.body = { id: ctx.params.id } ;
    

});


module.exports = router;
