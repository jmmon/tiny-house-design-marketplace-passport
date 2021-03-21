const express = require('express');
const router = express.Router();

// Logout route
router.get('/', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;