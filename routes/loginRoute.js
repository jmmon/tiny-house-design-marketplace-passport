var express = require('express');
var router = express.Router();
const passport = require('passport');


router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { 
            console.log('username or password error');
            return res.status(400).json({ errors: ["Username or password incorrect."]});
            // return res.render('login', 
            // { 
            //     title: 'Login Page', 
            //     user: req.user, 
            //     errors: ['Username or password incorrect.'] 
            // }); 
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

  
module.exports = router;
