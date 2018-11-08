
process.env.NODE_ENV = 'test';

let chai 			= require('chai');
let chaiHttp 		= require('chai-http');
let should 			= chai.should();

let server 			= require('../mine-stats-service');

chai.use(chaiHttp);

describe('User REST API', function() {
 
	var user_id;

	it('GET /user', function(done) {
    	
		 chai.request(server)
         .get('/user')
         .end((err, res) => {
               res.should.have.status(200);
               res.should.be.json;
               res.body.should.be.a('array');
           done();
         });
    });

		
	
	it('POST /user', function(done) {
    	
		
		let user = {
				  login: "Test Login",	              
	          }
		
		chai.request(server)
        .post('/user')
        .send(user)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              user_id = res.body._id;
          done();
        });
   });
	
	
   it('GET /user/:id', function(done) {
    	
				
		chai.request(server)
        .get('/user/' + user_id)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('_id');              
              res.body.should.have.property('login').eql('Test Login');
              done();
        });
   });
	

   it('PUT /user', function(done) {
    			
		let user = {
	              login: "New Login Name",
	          }
		
		chai.request(server)
        .put('/user/' + user_id)
        .send(user)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('_id');
              res.body.should.have.property('login').eql(user.login);
                                         
              done();
        });
   });
	
			
   it('DELETE /user', function(done) {
    				
		chai.request(server)
        .delete('/user/' + user_id)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;              
              done();                      
        });
   });
	
	
});
