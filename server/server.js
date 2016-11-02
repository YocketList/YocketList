const express = require('express')
const app = express();
// const jsonParser = bodyParser.json();
const path = require('path');
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
const HistoryController = require('./controllers/HistoryController');
const creds = require('../app.config');
const session = require('express-session');
const cookieParser = require('cookie-parser')
mongoose.connect('mongodb://localhost/yockette', () => {
	console.log("mongoose connected");
});
// const oauth = require('./google-passport');

app.use( express.static(path.join(__dirname, 'dist')));
app.use( session({ path: '*', secret: 'YukeBox', httpOnly: true, secure: false, maxAge: null }));
app.use( cookieParser() );

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
  console.log('Serializing');
  done(null, {
    google_id: user.google_id,
    username: user.username
  });
});

passport.deserializeUser(function(user, done) {
  console.log('Deserializing');
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

app.post('/create-event', EventController.addToList)

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

// getting queue to render on event(room) page
app.get('/queue', (req, res) => {
  res.status(200).send(Testdata.queue)
})

//getting guestlist to render on event(room) page
app.get('/guestlist', (req, res) => {
  res.status(200).send(Testdata.guestlist)
})

//adding new data to queue, adds to the end of the list
app.post('/queue', (req, res) => {
  // Testdata.queue.push(req.body);
  io.emit('newdata', {songs: req.body, history: HistoryController.list, guests: GuestController.list});
app.post('/addqueue', (req, res) => {
  Testdata.queue.push(req.body);
  io.emit('newQueue', Testdata.queue);
  res.status(200).send("");
  res.end();
})


//1.
app.post('/joinevent', (req, res) => {
  Event.findOne({eventName: req.body.eventName})
  .where('eventPassword').equals(req.body.eventPassword)
  .then(event => res.json(event))
  .catch(err => res.send(err))
})


//2.
app.get('/history', (req, res) => {
  //find the event table with the event_id
  //send the event_id.history
  Event.findOne({_id: req.body._id})
})

//3.
//when url(music) finishes add thtat to that event's histiry



// app.post('/queue', (req, res) => {
//   if(req.body.method){
//     if(req.body.method === 'delete'){
//       console.log(`/queue :: [DELETE] removing first item from ${qArray}`);
//       qArray.shift();
//       console.log(`/queue :: [DELETE] result of delete ${qArray}`);
//       io.emit('newdata', qArray.length);
//       res.status(200).send("");
//       return;
//     }
//   }
//   if(!req.body.link){
//     res.status(400).send("no data supplied");
//     return;
//   }
//   qArray.push(req.body.link);
//   console.log(`/queue :: [POST] results in ${qArray}`);
//   io.emit('newdata', qArray.length);
//   res.status(200).send("git it");
//   res.end();
// });

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

module.exports = app;
