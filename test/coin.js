
process.env.NODE_ENV = 'test';

let chai 			= require('chai');
let chaiHttp 		= require('chai-http');
let should 			= chai.should();

let server 			= require('../mine-stats-service');

chai.use(chaiHttp);

describe('Coin REST API', function() {
 
	var coin_id;

	it('GET /coin', function(done) {
    	
		 chai.request(server)
         .get('/coin')
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
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;              
              done();                      
        });
   });
	
	
});
