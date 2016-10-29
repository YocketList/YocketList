var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyparser = require('body-parser');

/* Database */
const qArray = ['https://www.youtube.com/watch?v=H8H5tNVE_sY', 'https://www.youtube.com/watch?v=CrF3J6ukER8', 'https://www.youtube.com/watch?v=_9vK_F0XnfA'];

/* Express Middleware */
app.use(bodyparser.json());
app.all((req,res,next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.status(200).send("Yocket List! Where Yockets meets Lists. Yocket List!");
});

// Post body do /queue should be formatted like so:
// req.body { link: '<new Youtube link>'}
app.get('/queue', (req, res) => {
  console.log(`/queue :: [GET] sending data ${qArray}`);
  // io.emit();
  res.status(200).send(qArray);
});

app.post('/queue', (req, res) => {
  console.log(`/queue :: [POST] got data ${req.body.link}`);
  if(!req.body.link){
    res.status(404).send("no data supplied");
    return;
  }
  qArray.push(req.body.link);
  io.emit('newdata', qArray.length);
  res.status(200).send("");
  res.end();
});

app.delete('/queue', (req, res) => {
  console.log(`/queue :: [DELETE] removing first item from ${qArray}`);
  qArray.shift();
  console.log(`/queue :: [DELETE] result of delete ${qArray}`);
  io.emit('newdata', qArray.length);
  res.status(200).send("");
});

/* Socket and Server Setup */
io.on('connect', (socket) => {
  console.log(`User connected ${socket.id}`)
})

http.listen(3000, () => {
  console.log("Server started on port 3000");
});
