const express = require('express')
const app = express();
// const jsonParser = bodyParser.json();
const path = require('path');
//keep next 4 lines --soo
const mongoose = require('mongoose');
const User = require('./model/usermodel');
const Event = require('./model/eventmodel');
const Testdata = require('./model/database');
const http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');
const bodyparser = require('body-parser');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');
const UserController = require('./controllers/UserController');
const AuthenticationController = require('./controllers/AuthenticationController');
const GuestController = require('./controllers/GuestController');
const EventController = require('./controllers/EventController');
const creds = require('../app.config');
mongoose.connect('mongodb://localhost/yockette', () => {
	console.log("mongoose connected");
});
// const oauth = require('./google-passport');

app.use( express.static(path.join(__dirname, 'dist')));

passport.use(new GoogleStrategy({
    clientID:     creds.GOOGLE_CLIENT_ID,
    clientSecret: creds.GOOGLE_CLIENT_SECRET,
    callbackURL: creds.CALLBACK_URL,
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {

      User.findOneAndUpdate({ google_id: profile.id, username: profile.name.givenName }, { expire: new Date() }, { upsert: true }, function (err, user) {
        if (err) {
          console.log(err);
          done();
        }
        if (!user) {
          user = new User({
            google_id: profile.id,
            username: profile.name.givenName,
            favlist: []
          })
          user.save();
        }
        if (user) {
          return done(null, user);
        }
      });
    })
  }
));

app.use( passport.initialize());
app.use( passport.session());

passport.serializeUser(function(user, done) {
  // console.log(user);
  done(null, {
    google_id: user.google_id,
    username: user.username
  });
});

passport.deserializeUser(function(user, done) {
  // console.log(user);
  User.findOne({google_id: user.google_id}, function(err, user) {
    done(err, user);
  });
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', (
    	passport.authenticate( 'google', {
    		successRedirect: '/account',
    		failureRedirect: '/'
})));

// Future Login and Logout Logic

app.get('/account', AuthenticationController.isAuthenticated, GuestController.addToList, (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
})

app.get('/bundle.js', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../dist/bundle.js'));  
})

app.get('/create-event', EventController.addToList, (req, res, next) => {
  // Redirect to new room
  next();
})

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* Database */
const qArray = [];

/* Express Middleware */
app.use(bodyparser.json());
// CORS headers
app.use((req,res,next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});


//keep this method --soo


// Easter egg for API server <3 YOCKET LIST
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../dist/login.html'));
});


//keep next two methods --soo
app.post('/adduser', (req, res) => {
  //User.create(req.body)
  for (let i = 0; i < Testdata.users.length; i++) {
    User.create(Testdata.users[i])
    .then(data => {res.json(data)})
    .catch((err) => {res.end(err)})
  }
})

app.post('/addevent', (req, res) => {
  //Event.create(req.body)
	Event.create(Testdata.event)
	.then(data => {res.json(data)})
	.catch((err) => {res.end(err)})
})


// Post body do /queue should be formatted like so:
// req.body { link: '<new Youtube link>'}
app.get('/queue', (req, res) => {
  console.log(`/queue :: [GET] sending data ${qArray}`);
  res.status(200).send(qArray);
});

// There are two body properties that should exist non exclusively.
// If there is a method property set to 'delete' do DELETE behavior
// If there is a link property set to a youtube url, save to the db
app.post('/queue', (req, res) => {
  console.log(`/queue :: [POST] got data ${req.body.link}`);
  console.log(req.body);
  if(req.body.method){
    if(req.body.method === 'delete'){
      // doing app.delete resulted in interesting CORS issues
      // with preflight requirements. Even with the cors Headers
      // above. We are hackily using req.body.method to simulate RESTful
      // behavior.
      console.log(`/queue :: [DELETE] removing first item from ${qArray}`);
      qArray.shift();
      console.log(`/queue :: [DELETE] result of delete ${qArray}`);
      io.emit('newdata', qArray.length);
      res.status(200).send("");
      return;
    }
  }
  if(!req.body.link){
    res.status(400).send("no data supplied");
    return;
  }
  qArray.push(req.body.link);
  console.log(`/queue :: [POST] results in ${qArray}`);
  io.emit('newdata', qArray.length);
  res.status(200).send("git it");
  res.end();
});

/* Socket and Server Setup */
io.on('connect', (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.emit('connectestablished', socket.id);
})

http.listen(3000, () => {
  console.log("Server started on port 3000");
});

/** Socket Event Spec
 * This is a list of socket events and their triggers
 * Emit ['newdata']: notifies subscribers to query for new data
 *  - when any user saves an item to the database
 *  - when a player window deletes an item from the database
 */

module.export = app;
