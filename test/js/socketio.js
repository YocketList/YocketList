const request = require('supertest');

const app = require('../../server/server.js');
const PORT = 3000;
const HOST = `http://localhost:${PORT}`;
const io = require('socket.io');
const ioClient = require('socket.io-client');

const {
  expect
} = require('chai');

describe('SocketIO Integration', () => {
  describe('Client sockets connect to Server sockets', () =>{
    it('should successfully establish a connection with a socket id', done => {
      let socket = ioClient.connect(HOST);
      socket.on('connectestablished', data => {
        expect(data.length > 0).to.equal(true);
        done();
      });
    });
  });
  describe('Client on newdata event', () => {
    it('Client sockets should recieve newdata event with post requests', done => {
      let socket = ioClient.connect(HOST);
      socket.on('newdata', (data) => {
        expect(data).to.be.a('number');
        socket.disconnect();
        done();
      });
      request(HOST)
        .post('/queue')
        .send({link: 'https://www.youtube.com/watch?v=_9vK_F0XnfA'})
        .expect(200, () => {}); // this empty callback is necesary for request to complete call
    });
    it('Client sockets should recieve newdata event with post requests', done => {
      let socket = ioClient.connect(HOST);
      socket.on('newdata', (data) => {
        expect(data).to.be.a('number');
        socket.disconnect();
        done();
      });
      request(HOST)
        .post('/queue')
        .send({method: 'delete'})
        .expect(200, () => {}); // this empty callback is necesary for request to complete call
    });
  });
});
