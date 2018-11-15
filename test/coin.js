
process.env.NODE_ENV = 'test';

let chai 			= require('chai');
let chaiHttp 		= require('chai-http');
let should 			= chai.should();

let server 			= require('../mine-stats-service');

chai.use(chaiHttp);

describe('Coin REST API', function() {
 
    var coin_id, token;
    
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



	it('GET /coin', function(done) {
    	
		 chai.request(server)
         .get('/coin')
         .set('Authorization', token)
         .end((err, res) => {
               res.should.have.status(200);
               res.should.be.json;
               res.body.should.be.a('array');
           done();
         });
    });

		
	
	it('POST /coin', function(done) {
    	
		
		let account = {
				  name: "Test Coin",
				  tickerSymbol: "TSCN"	              
	          }
		
		chai.request(server)
        .post('/coin')
        .set('Authorization', token)
        .send(account)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              coin_id = res.body._id;
          done();
        });
   });
	
	
   it('GET /coin/:id', function(done) {
    	
				
		chai.request(server)
        .get('/coin/' + coin_id)
        .set('Authorization', token)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('_id');              
              res.body.should.have.property('name').eql('Test Coin');
              done();
        });
   });
	

   it('PUT /coin', function(done) {
    			
		let coin = {
	              name: "New Coin",
	          }
		
		chai.request(server)
        .put('/coin/' + coin_id)
        .set('Authorization', token)
        .send(coin)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('_id');
              res.body.should.have.property('name').eql(coin.name);
              res.body.should.have.property('tickerSymbol').eql('TSCN');
                                         
              done();
        });
   });
	
			
   it('DELETE /coin', function(done) {
    				
		chai.request(server)
        .delete('/coin/' + coin_id)
        .set('Authorization', token)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;              
              done();                      
        });
   });
	
	
});
