
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Redis = require('connect-redis')(session);
const bcrypt = require('bcrypt');

const User = require('./db/models/User.js');

const saltedRounds = 12;


const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
      store: new Redis(),
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true
    })
  );
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    console.log('serializing');
    return done(null, {
      id: user.id,
      email: user.email
    });
  });

  passport.deserializeUser((user, done) => {
    console.log('deserializing');
    new User({ id: user.id })
      .fetch()
      .then(user => {
        if (user === null) {
          return done(null, false, { message: 'no user' });
        }
        user = user.toJSON();
        return done(null, {
          id: user.id,
          email: user.email
        });
      })
      .catch(err => {
        // console.log(err);
        return done(err);
      });
  });

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, function (
      email,
      password,
      done
    ) {
      return new User({ email })
        .fetch()
        .then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad email or password' });
          }
          user = user.toJSON();
          bcrypt.compare(password, user.password).then(res => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'bad username or password' });
            }
          });
        })
        .catch(err => {
          // console.log('error: ', err);
          return done(err);
        });
    })
  );

  app.route('/register')
  .post((req, res) => {
    bcrypt.genSalt(saltedRounds, function (err, salt) {
      if (err) console.log(err);
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        if (err) console.log(err);
        const { email, username, first_name, last_name, location, age } = req.body;

        new User({ email, username, password: hash, first_name, last_name, location, age })
          .save()
          .then(user => {
            // console.log(user);
            return res.json(user);
          })
          .catch(err => {
            // console.log(err);
            return res.send('Wrong username');
          });
      });
    });
  });

app.route('/login')
  .post(
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );

app.route('/logout')
.get((req, res) => {
  return req.logout();
});


app.use('/api', routes);

app.route('*').get((req, res) => {
    return res.redirect('/api');
  });

module.exports = app;
