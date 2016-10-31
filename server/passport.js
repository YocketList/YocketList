const GoogleOAuth = require( 'passport-google-oauth2' ).Strategy;
const creds = require('../app.config');
// Require user model here

// OAUTH AND USER LOGIN LOGIC

module.exports = (passport) => {

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleOAuth({
    clientID:     creds.GOOGLE_CLIENT_ID,
    clientSecret: creds.GOOGLE_CLIENT_SECRET,
    callbackURL: creds.CALLBACK_LOGIN,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {

// Integrate with User model below

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  })
  }
));

}