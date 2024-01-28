import express from 'express';
const app = express();

const port = 3000;
const productsRouter = require('./routes/products');
const adminsRouter = require('./routes/admins');


// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://fatimazohralakhal32:Fati%40Rim@cluster0.qpcnaoc.mongodb.net/mydatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
  connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


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
app.use('/admins', adminsRouter);

app.use(cors());
app.use(bodyParser.json());

app.use('/products', productsRouter);
app.use('/admins', adminsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
