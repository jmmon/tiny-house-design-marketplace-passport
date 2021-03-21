var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Register User Roue
router.post('/register', function(req, res) {
    console.log('register post');
    console.log('~req.body', req.body);

    let newUser = new User(
    { 
        username : req.body.username, 
        password: req.body.password,
    });

    let validationErrors = newUser.validateSync();

    if (validationErrors === undefined && req.body.password === req.body.repeatPassword) {
        console.log('validation passed');
        //register user
        User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
            if (err) {
                console.log('getting user register error');
                console.log(err);
                res.send('Error:\n', err);

            } else {
                //authenticate the session with the user
                console.log('no registration error, registering and authenticating');
                passport.authenticate('local')(req, res, function () {
                    req.session.save(function(err) {
                        console.log('~req.session.passport.user', req.session.passport.user);
                        if (err) {
                            return next(err);
                        }
                        res.status(200).json({user: req.session.passport.user});
                    });
                });
            }
        });

    } else {
        console.log('~Have errors');
        //check for validation errors
        //check for password match error
        //then display all of them

        let displayErrors = [];

        if (validationErrors != undefined) {
            let values = Object.values(validationErrors.errors);
            console.log('~Validation Errors:');
            values.forEach(err => {
                console.log(err.properties.path);
                console.log(err.properties.message);
                console.log('');
            });

            //add in validation errors
            displayErrors = values.map((err) => err.properties.path.charAt(0).toUpperCase() + err.properties.path.slice(1) + " " + err.properties.message);
        }

        if (req.body.password === req.body.repeatPassword) {
            console.log('passwords match');
        } else {
            displayErrors.push('Passwords do not match');
        }

        //render all the errors
        res.send(JSON.stringify(displayErrors));
        //res.render('register', {errors: displayErrors});
    }
});

// Login Route
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { 
            console.log('username or password error');
            return res.status(400).json({ errors: ["Username or password incorrect."]});
        }     //failure
        
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            console.log('successfully logged in as', user);
            return res.status(200).json({
                success: true,
                user: user,
            });   //success
        });
    })(req, res, next);
});

// Logout route
router.get('/logout', function(req, res) {
    console.log('get logout route');
    //console.log('~req pre', req)
    req.logout();
    res.status(200).json({})
    //console.log('~req post', req)
});

module.exports = router;
