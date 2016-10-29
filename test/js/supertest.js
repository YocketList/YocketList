const request = require('supertest');

const app = require('../../server/server.js');
const PORT = 3000;
const HOST = `http://localhost:${PORT}`;
const io = require('socket.io');

const {
  expect
} = require('chai');

describe('Route integration', () => {
  describe('Server has / route', () =>{
    describe('GET', ()=>{
      it('should respond with a 200 status code', done => {
        request(HOST)
          .get('/')
          .expect(200, done);
      });
    });
  });

  describe('Server has /queue route', () => {
    describe('GET', () => {
      it('should repond with a 200 status code', done => {
        request(HOST)
          .get('/queue')
          .expect(200, done);
      });
      it('should repond with an array of youtube urls', done =>{
        request(HOST)
          .get('/queue')
          .expect((res) => {
            expect(res.body).to.be.an('array');
            res.body.forEach((element) => {
              expect(element.indexOf('youtube.com') >= 0).to.equal(true);
            });
          })
          .expect(200, done);
      });
    });
    describe('POST', () => {
      it('should return 200 when supplied with a link', done => {
        request(HOST)
          .post('/queue')
          .send({link:'https://www.youtube.com/watch?v=_9vK_F0XnfA'})
          .expect(200, done);
      });
      it('should return 400 when not supplied with a link', done =>{
        request(HOST)
          .post('/queue')
          .send({})
          .expect(400, done);
      });
      it('should return status 200 with method delete', done => {
        request(HOST)
          .post('/queue')
          .send({method: 'delete'})
          .expect(200, done);
      });
    });
  });
});