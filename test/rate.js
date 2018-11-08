
process.env.NODE_ENV = 'test';

let chai 			= require('chai');
let chaiHttp 		= require('chai-http');
let should 			= chai.should();

let server 			= require('../mine-stats-service');

chai.use(chaiHttp);

describe('Rate REST API', function() {
 
	var rate_id;

	it('GET /rate', function(done) {
    	
		 chai.request(server)
         .get('/rate')
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
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;              
              done();                      
        });
   });
	
	
});
