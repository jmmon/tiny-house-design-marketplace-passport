const express = require('express');
const router = express.Router();
const Design = require('../models/design');

router.route('/').get((req, res) => {
    console.log('GET browse router working')

    Design.find()
    .then(designs => {
        res.json(designs);
        console.log('~all designs', designs);
    })
    .catch(err => {
        res.send(500);
        console.log(err);
    });

});

module.exports = router;