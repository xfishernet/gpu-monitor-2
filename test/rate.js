
process.env.NODE_ENV = 'test';

let chai 			= require('chai');
let chaiHttp 		= require('chai-http');
let should 			= chai.should();

let server 			= require('../mine-stats-service');

chai.use(chaiHttp);

describe('Rate REST API', function() {
 
    var rate_id, token;
            
    before(function(done) {

         let register_data = {	             
	            email: "test@gmail.com",
	            password: "123"
	          }
                        
            chai.request(server)
            .post('/user/login')
            .send(register_data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                token = res.body.token;
                
                done();
                
            });

    });

	it('GET /rate', function(done) {
    	
		 chai.request(server)
         .get('/rate')
         .set('Authorization', token)
         .end((err, res) => {
               res.should.have.status(200);
               res.should.be.json;
               res.body.should.be.a('array');
           done();
         });
    });

		
	
	it('POST /rate', function(done) {
    	
		
		let rate = {
				  pair: "TST/USD",	              
	          }
		
		chai.request(server)
        .post('/rate')
        .send(rate)
        .set('Authorization', token)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              rate_id = res.body._id;
          done();
        });
   });
	
	
   it('GET /rate/:id', function(done) {
    	
				
		chai.request(server)
        .get('/rate/' + rate_id)
        .set('Authorization', token)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('_id');              
              res.body.should.have.property('pair').eql('TST/USD');
              done();
        });
   });
	

   it('PUT /rate', function(done) {
    			
		let rate = {
				 pair: "TST/NEW",
	          }
		
		chai.request(server)
        .put('/rate/' + rate_id)
        .set('Authorization', token)
        .send(rate)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('_id');
              res.body.should.have.property('pair').eql(rate.pair);
                                         
              done();
        });
   });
	
			
   it('DELETE /rate', function(done) {
    				
		chai.request(server)
        .delete('/rate/' + rate_id)
        .set('Authorization', token)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;              
              done();                      
        });
   });
	
	
});
