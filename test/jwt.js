
process.env.NODE_ENV = 'test';

let chai 			= require('chai');
let chaiHttp 		= require('chai-http');
let should 			= chai.should();

let server 			= require('../mine-stats-service');

chai.use(chaiHttp);

describe('JWT authorization', function() {
 
    var user_id, token;
    
    let register_data = {	             
        login: "test_login",
        displayName: "display-name",
        email: "sad8272essdf@yahoo.com",
        password: "dsfsdf882"
    }
				
	it('POST /user/register', function(done) {
    			
		let register_data = {	             
	            login: "test_login",
	            displayName: "display-name",
	            email: "sad8272essdf@yahoo.com",
	            password: "dsfsdf882"
	          }
		
		chai.request(server)
        .post('/user/register')
        .send(register_data)
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              user_id = res.body._id;
          done();
        });
   });

       it('POST /user/login', function(done) {                    
            
            delete register_data.login;
            delete register_data.displayName;

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


    it('GET /user/custom', function(done) {
                                    
            chai.request(server)
            .get('/user/custom')     
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                 res.body.should.have.property('email').eql(register_data.email);
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
