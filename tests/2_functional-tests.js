/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);
let id1;
let id2;
suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
            .post('/api/books')
            .send({title: 'the humans'})
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.property(res.body,'title');
              assert.equal(res.body.title,'Evangelion');
              assert.property(res.body,'_id');
              id1=res.body._id; 
              done();
            });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
            .post('/api/books')
            .send({title: ''})
            .end((err, res) => {
              assert.equal(res.status,200);
              assert.equal(res.text,'Please insert a Title');
              done();
            });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
            .get('/api/books')
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isArray(res.body,'response should be an array');
              assert.property(res.body[0],'title','the books in the arrays should contain the property: title');
              assert.property(res.body[0],'_id','the books in the arrays should contain the property: _id');
              assert.property(res.body[0],'commentcount','the books in the arrays should contain the property: commentcount');
              assert.property(res.body[0],'comments','the books in the arrays should contain the property: comments');
              assert.isArray(res.body[0].comments,'the comments property should be an array');
              done();
            });
      });      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
            .get('/api/books/invalidId')
            .end((err, res) => {
              assert.equal(res.status,200);
              assert.equal(res.text, 'no book exists');
              done();
            });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
            .get('/api/books/'+id1)
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.property(res.body, 'title', 'the response object must have the property: title');
              assert.property(res.body, '_id', 'the response object must have the property: _id');
              assert.property(res.body, 'title', 'the response object must have the property: title');
              assert.property(res.body,'commentcount','the response object must have the property: commentcount');
              assert.property(res.body,'comments','the response object must have the property: comments');
              assert.isString(res.body.title,'the title property must be of type String');
              assert.isString(res.body._id,'the _id property must be of type String');
              assert.isNumber(res.body.commentcount,'the commentcount property must be of type Number');
              assert.isArray(res.body.comments,'the comments property must be of type Array');
              id2=res.body._id
              done();
            });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
            .post('/api/books'+id1)
            .send({comment: 'amazing book'})
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.property(res.body,'_id','must conatin the property id');
              assert.property(res.body,'comments','must contain the property comments');
              assert.property(res.body,'commentcount','must contain the property commentcount');
              assert.isArray(res.body.comments,'the comments property must be of Array type');
              assert.include(res.body.comments,"amazing book",'the comments array must include the -Great Book- comment');
              done();
            });
      });
      
    });

  });

});
