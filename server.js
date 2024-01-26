const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://fatimazohralakhal32:Fati%40Rim@cluster0.qpcnaoc.mongodb.net/mydatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User schema
const User = mongoose.model('User', {
  username: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});

// Passport setup
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password)
        .then(res => {
          if (res) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        })
        .catch(err => done(err));
    })
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'Fati@Rim', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files (HTML, CSS, JS, images) from the "public" directory
app.use(express.static('public'));

// Admin panel route
app.get('/admin', (req, res) => {
  // Render your admin panel page here
  res.sendFile(__dirname + '/public/admin.html');
});

// AJAX endpoint for managing users
app.get('/admin/manageUsers', (req, res) => {
  // Check if the user making the request is an admin
  if (req.isAuthenticated() && req.user.isAdmin) {
    // Fetch users from the database
    User.find({})
      .then(users => {
        // Send the list of users as a response
        res.json({ users: users });
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } else {
    // If the user is not authenticated or is not an admin, send an error response
    res.status(403).json({ error: 'Permission Denied' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
