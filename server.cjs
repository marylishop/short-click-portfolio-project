const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('frontend'));

// Import models
const User = require('./models/userModel'); // Changed from userModels to userModel

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://fatimazohralakhal32:Fati%40Rim@cluster0.qpcnaoc.mongodb.net/mydatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
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
app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());

// Import routers
const productsRouter = require('./routes/Product');
const adminRouter = require('./routes/admin');

// Use routers
app.use('/products', productsRouter);
app.use('/admin', adminRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
