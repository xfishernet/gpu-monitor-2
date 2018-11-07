
process.env.NODE_ENV = 'test';

let chai 			= require('chai');
let chaiHttp 		= require('chai-http');
let should 			= chai.should();

let server 			= require('../mine-stats-service');

chai.use(chaiHttp);

describe('poolAccount REST API', function() {
 
	var account_id;

	it('GET /poolAccount', function(done) {
    	
		 chai.request(server)
         .get('/poolAccount')
         .end((err, res) => {
               res.should.have.status(200);
               res.should.be.json;
               res.body.should.be.a('array');
           done();
         });
    });

		
	
	it('POST /poolAccount', function(done) {
    	
		
		let account = {
				  accountAddress: "test account",
	              type: "real",
	              comment: 'test comment'
	          }
		
		chai.request(server)
        .post('/poolAccount')
        .send(account)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              account_id = res.body._id;
          done();
        });
   });
	
	
   it('GET /poolAccount/:id', function(done) {
    	
				
		chai.request(server)
        .get('/poolAccount/' + account_id)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('_id');              
              res.body.should.have.property('comment').eql('test comment');
              done();
        });
   });
	

   it('PUT /poolAccount', function(done) {
    			
		let account = {
	              comment: "put test comment",
	          }
		
		chai.request(server)
        .put('/poolAccount/' + account_id)
        .send(account)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('_id');
              res.body.should.have.property('comment').eql(account.comment);
              res.body.should.have.property('accountAddress').eql('test account');
                                         
              done();
        });
   });
	
			
   it('DELETE /poolAccount', function(done) {
    				
		chai.request(server)
        .delete('/poolAccount/' + account_id)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;              
              done();                      
        });
   });
	
	
});
