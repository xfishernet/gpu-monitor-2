
const passport 			= require('koa-passport');
const LocalStrategy 	= require('passport-local');
const Router 			= require('koa-router');
const jwt 				= require('jsonwebtoken');
const mongoose 			= require('mongoose');

const JwtStrategy 		= require('passport-jwt').Strategy;
const ExtractJwt 		= require('passport-jwt').ExtractJwt; 

const config 			= require('config');

var User 				= mongoose.model('User');

const router  = new Router();




router.post('/user/login', async(ctx, next) => {
	  await passport.authenticate('local', function (err, user) {
	    if (user == false) {				
				ctx.throw(401, "{status: 'error'}");
	    } else {
	      //--payload - информация которую мы храним в токене и можем из него получать
	      const payload = {
	        id: user.id,
	        displayName: user.displayName,
	        email: user.email
	      };
	      const token = jwt.sign(payload, config.get('security').jwtsecret.secret); //здесь создается JWT
	      
	      ctx.body = {user: user.displayName, token: 'JWT ' + token};
	    }
	  })(ctx, next);  
	});



router.post('/user/register', async(ctx, next) => {

	  try {
	    ctx.body = await User.create(ctx.request.body);
	  }
	  catch (err) {
	    ctx.status = 400;
	    ctx.body = err;
	  }
	});




router.get('/user/custom', passport.authenticate('jwt', {session:false}), async(ctx, next) => {
	  
	  await passport.authenticate('jwt', function (err, user) {
	    if (user) {
			
		  user.passwordHash = undefined;
		  user.salt = undefined;
			
		  ctx.body = user;
				
	    } else {
				
		  ctx.throw(401, "No such user");
	      console.log("err", err)
	    }
	  } )(ctx, next)  
	});



router.get('/user', passport.authenticate('jwt', {session:false}), async (ctx, next) => {

  ctx.body = await User.find({});
  
});


router.get('/user/:id', passport.authenticate('jwt', {session:false}), async (ctx, next) => {

	try {
	  		 
		ctx.body  = await User.findOne({_id: ctx.params.id});		  
	  
	  } catch(err) {			
		  ctx.throw(500, err);
	  }
});

router.post('/user', passport.authenticate('jwt', {session:false}), async (ctx, next) => {

	try {
					
		ctx.body 	= await User.create(ctx.request.body);		
		
	} catch(err) {
		ctx.throw(500, err);
    }
		
		    

});

router.put('/user/:id', passport.authenticate('jwt', {session:false}), async (ctx, next) => {

  try {
		  	  		 
	  ctx.body	 = await User.findOneAndUpdate({_id: ctx.params.id}, ctx.request.body,  {new: true});	  
  
  } catch(err) {		
	  ctx.throw(500, err);
  }

});


router.delete('/user/:id', passport.authenticate('jwt', {session:false}), async (ctx, next) => {
	
  
  try {
	  
	  await User.deleteOne({_id: ctx.params.id});
	  
  } catch(err) {
		ctx.throw(500, err);
  }
		
  
  ctx.body = { id: ctx.params.id } ;
    

});


module.exports = router;
