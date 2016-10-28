var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyparser = require('body-parser');
app.use(bodyparser.json());
const qArray = [];

app.get('/', (req, res) => {
  res.status(200).send("Yocket List!");
});

app.post('/qeue', (req, res) => {
  
  console.log(req.body);
  io.emit('newqeue', req.body);
  res.end();
})
app.get('/qeue', (req, res) => {
  // fetch data from db
  io.emit('newqeue', {message: 'made a get request to /qeue'});
  res.end();
})

io.on('connect', (socket) => {
  console.log('user connected')
  io.emit('hello', {suu: 'dude'});
})

http.listen(3000, () => {
  console.log("Server started on port 3000");
});
