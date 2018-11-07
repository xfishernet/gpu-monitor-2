
const Router = require('koa-router');

const mongoose = require('mongoose');

const router  = new Router();

var GPU = mongoose.model('GPU');

router.get('/gpu', async (ctx, next) => {

  let gpu = await GPU.find({});
  ctx.body = gpu;

});


router.get('/gpu/:id', async (ctx, next) => {

	try {
	  		 
		  let gpu  = await GPU.findOne({_id: ctx.params.id});		  
		  ctx.body = gpu ;
	  
	  } catch(err) {			
		  ctx.throw(500, err);
	  }
});

router.post('/gpu', async (ctx, next) => {

	try {
					
		let gpu 	= await GPU.create(ctx.request.body);		
		ctx.body 	= gpu;
		
	} catch(err) {
		ctx.throw(500, err);
    }
		
		    

});

router.put('/gpu/:id', async (ctx, next) => {

  try {
		  	  		 
	  let gpu	 = await GPU.findOneAndUpdate({_id: ctx.params.id}, ctx.request.body,  {new: true});	  
	  ctx.body 	 = gpu;
  
  } catch(err) {		
	  ctx.throw(500, err);
  }

});


router.delete('/gpu/:id', async (ctx, next) => {
	
  
  try {
	  
	  await GPU.deleteOne({_id: ctx.params.id});
	  
  } catch(err) {
		ctx.throw(500, err);
  }
		
  
  ctx.body = { id: ctx.params.id } ;
    

});


module.exports = router;
