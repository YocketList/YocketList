var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.status(200).send("Yocket List!");
});

http.listen(3000, () => {
  console.log("Server started on port 3000");
});