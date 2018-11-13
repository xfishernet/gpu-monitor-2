
process.env.NODE_ENV = 'test';

let chai 			= require('chai');
let chaiHttp 		= require('chai-http');
let should 			= chai.should();

let server 			= require('../mine-stats-service');

chai.use(chaiHttp);

describe('poolAccount REST API', function() {
 
    var account_id, token;
    
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

	it('GET /poolAccount', function(done) {
    	
		 chai.request(server)
         .get('/poolAccount')
         .set('Authorization', token)
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
        .set('Authorization', token)
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
        .set('Authorization', token)
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
        .set('Authorization', token)
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
        .set('Authorization', token)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;              
              done();                      
        });
   });
	
	
});
