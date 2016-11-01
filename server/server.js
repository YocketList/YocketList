const app = require('express')();
const fs = require('fs');
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyparser = require('body-parser');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');
// const oauth = require('./google-passport');
const AuthenticationController = require('./AuthenticationController');
const GuestController = require('./GuestController');
const creds = require('../app.config');

app.use( passport.initialize());
app.use( passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  done(null, user.id);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', (
    	passport.authenticate( 'google', { 
    		successRedirect: '/account',
    		failureRedirect: '/'
})));

passport.use(new GoogleStrategy({
    clientID:     creds.GOOGLE_CLIENT_ID,
    clientSecret: creds.GOOGLE_CLIENT_SECRET,
    callbackURL: creds.CALLBACK_URL,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {

// Currently throwing error on User.findOrCreates
// Integrate with User model below
// Add cookie upon login

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  })
  }
));

// Future Login and Logout Logic


app.get('/account', AuthenticationController.isAuthenticated, GuestController.addToList, (req, res) => {
  res.setCookie({googleId: 'test cookie'})
})

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function isAuthenticated(req, res, next) {

  if (req.user.authenticated()) {
      return next();
  }

  res.redirect('/');
}

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

// Easter egg for API server <3 YOCKET LIST
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/login.html'));
});

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