const express = require('express');
const router = express.Router();
const Design = require('../models/design');

router.route('/:id').get((req, res) => {
    console.log('GET design router working');

    Design.find({_id: req.params.id})
    .then(design => {
        res.json(design);
        console.log('~design found', design);
    })
    .catch(err => {
        res.send(500);
        console.log(err);
    });

});

module.exports = router;