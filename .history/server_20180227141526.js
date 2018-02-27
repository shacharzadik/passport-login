


// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const LocalStrategy = require('passport-local').Strategy;

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Authentication middleware
app.use(passport.initialize());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// serve login page 
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/Login.html'));
});

// post route for /login

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?err',
  session: false
}));

passport.use(new LocalStrategy(function(username, password, done) {
  if ((username === "john") && (password === "password")) {
    return done(null, { username: username, id: 1 });
  } else {
    return done(null, false);
  }
}));
 
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
 
const port = process.env.PORT || '3000';
app.set('port', port);
 
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));