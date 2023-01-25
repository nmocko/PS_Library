const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'YOUR_SECRET_KEY',
    resave: false,
    saveUninitialized: true,
}));

const cors = require('cors');
app.use(cors());


passport.use(new GoogleStrategy({
    clientID: "509014859330-a286q15v99dvbuntrt5cpdmlqd1dl1fv.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    // user details are stored in the profile object
    console.log(profile.displayName)
    console.log(profile.id)
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
    res.send(`
      <html>
        <body>
          <a href="/auth/google">Sign in with Google</a>
        </body>
      </html>
    `);
  });

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(3000, function () {
  console.log('Server listening on http://localhost:3000');
});