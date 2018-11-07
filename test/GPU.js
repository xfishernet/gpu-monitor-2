
process.env.NODE_ENV = 'test';

let chai 			= require('chai');
let chaiHttp 		= require('chai-http');
let should 			= chai.should();

let server 			= require('../mine-stats-service');

chai.use(chaiHttp);

describe('GPU REST API', function() {
 
	var gpu_id;

	it('GET /GPU', function(done) {
    	
		 chai.request(server)
         .get('/GPU')
         .end((err, res) => {
               res.should.have.status(200);
               res.should.be.json;
               res.body.should.be.a('array');
           done();
         });
    });

		
	
	it('POST /GPU', function(done) {
    	
		
		let gpu = {
	              name: "test gpu",
	              pool: "test pool name",
	              worker: 'test worker name'
	          }
		
		chai.request(server)
        .post('/GPU')
        .send(gpu)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              gpu_id = res.body._id;
          done();
        });
   });
	
	
   it('GET /GPU/:id', function(done) {
    	
				
		chai.request(server)
        .get('/GPU/' + gpu_id)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('_id');              
              res.body.should.have.property('name').eql('test gpu');
              done();
        });
   });
	

   it('PUT /GPU', function(done) {
    			
		let gpu = {
	              name: "put test gpu",
	          }
		
		chai.request(server)
        .put('/GPU/' + gpu_id)
        .send(gpu)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('_id');
              res.body.should.have.property('name').eql(gpu.name);
              res.body.should.have.property('pool').eql('test pool name');
              
              
              
          done();
        });
   });
	
			
   it('DELETE /GPU', function(done) {
    				
		chai.request(server)
        .delete('/GPU/' + gpu_id)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;              
              done();                      
        });
   });
	
	
});
