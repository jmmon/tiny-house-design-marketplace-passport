const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) return next();
    else res.redirect('/login');
};

app.use(cors());
app.use(express.json());

//connect to mongoose
require('dotenv').config();
mongoose.connect(process.env.DB_URI,
    {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,

        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
)
.then(res => {
    console.log('db connected!');
})
.catch(err => {
    console.log('Error:', err);
});

//initialize passport, session
app.use(require('express-session')({
    secret: process.env.EXP_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/designs', require('./routes/designsRoute'));

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let port = process.env.PORT;
if (port == null || port == "") {
    port=8000;
}
app.listen(port, function() {
    console.log('express running on', port);
});