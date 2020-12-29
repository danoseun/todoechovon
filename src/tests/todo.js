import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

import {realTodoTwo, fakeTodo, noNameTodo, realTodoOne} from './testdata'

describe('Testing the booking endpoints:', () => {
  it('It should create a todo', (done) => {
    chai.request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send(realTodo)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  
  // Second create
  it('It should create another todo', (done) => {
    
    chai.request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send(realTodoTwo)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        console.log('rES2', res.body.data);
        done();
      });
  });

  it('It should not create a todo with incomplete request bodies', (done) => {
    chai.request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send(fakeTodo)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all todos', (done) => {
    chai.request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        done();
      });
  });

  it('It should get a particular todo', (done) => {
    const todoId = '1';
    chai.request(app)
      .get(`/api/v1/todos/${todoId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        done();
      });
  });

  it('It should not get a particular todo with invalid id', (done) => {
    const todoId = 8888;
    chai.request(app)
      .get(`/api/v1/todos/${todoId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });


  it('It should update a todo', (done) => {
    const todoId = '1';
    
    chai.request(app)
      .put(`/api/v1/todos/${todoId}`)
      .set('Accept', 'application/json')
      .send(realTodoOne)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(realTodoOne.id);
        done();
      });
  });

  it('It should not update a todo with invalid id', (done) => {
    const todoId = '9999';
    
    chai.request(app)
      .put(`/api/v1/todo/${todoId}`)
      .set('Accept', 'application/json')
      .send(realTodoOne)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message');
        done();
      });
  });



  it('It should delete a todo', (done) => {
    const todoId = 1;
    chai.request(app)
      .delete(`/api/v1/todos/${todoId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });
});