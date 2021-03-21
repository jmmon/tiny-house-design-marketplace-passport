const express = require('express');
const router = express.Router();
const Design = require('../models/design');
const User = require('../models/user');

router.route("/").post((req, res) => {
    console.log('create router working');

    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const length = req.body.length;
    const width = req.body.width;
    const height = req.body.height;

    // const creator = req.body.creator;

    const newDesign = new Design({
        name: name,
        imageUrl: imageUrl,
        description: description,
        length: length,
        width: width,
        height: height,
        // creator,
    });

    newDesign.save()
    .then((design) => {
        console.log('new saved design', design);
        res.json(design);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;