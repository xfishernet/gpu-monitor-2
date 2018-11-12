
const passport 			= require('koa-passport');
const LocalStrategy 	= require('passport-local');
const Router 			= require('koa-router');
const jwt 				= require('jsonwebtoken');
const mongoose 			= require('mongoose');

const JwtStrategy 		= require('passport-jwt').Strategy;
const ExtractJwt 		= require('passport-jwt').ExtractJwt; 


const jwtsecret 		= "mysecretkey";


const router  = new Router();

var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function (email, password, done) {	  	  		
		

    User.findOne({email}, (err, user) => {
      if (err) {
        return done(err);
      }
      
      if (!user || !user.checkPassword(password)) {
        return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
      }
      return done(null, user);
    });
  }
  )
);


const jwtOptions = {
		  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
		  secretOrKey: jwtsecret
		};

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
		
	
		User.findById(payload.id, (err, user) => {
			if (err) {
				return done(err)
			}
			if (user) {
				done(null, user)
			} else {
				done(null, false)
			}
		})
	})
);



router.post('/user/login', async(ctx, next) => {
	  await passport.authenticate('local', function (err, user) {
	    if (user == false) {
	      ctx.body = "Login failed!";
	    } else {
	      //--payload - информация которую мы храним в токене и можем из него получать
	      const payload = {
	        id: user.id,
	        displayName: user.displayName,
	        email: user.email
	      };
	      const token = jwt.sign(payload, jwtsecret); //здесь создается JWT
	      
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



router.get('/user/custom2', passport.authenticate('jwt', {session:false}), async(ctx, next) => {

	ctx.body = "hello";
});

router.get('/user/custom', async(ctx, next) => {
	  
	  await passport.authenticate('jwt', function (err, user) {
	    if (user) {
	      ctx.body = user;
	    } else {
	      ctx.body = "No such user";
	      console.log("err", err)
	    }
	  } )(ctx, next)  
	});



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
