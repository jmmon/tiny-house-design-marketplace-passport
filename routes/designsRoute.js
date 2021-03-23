const express = require('express');
const router = express.Router();
const Design = require('../models/design');
const User = require('../models/user');

router.route('/browse').get((req, res) => {
    console.log('GET browse router working');

    Design.find()
    .then(designs => {
        res.status(200).json(designs);
        console.log('~all designs', designs);
    })
    .catch(err => {
        res.status(500);
        console.log(err);
    });

});

router.route('/mydesigns/:uid').get((req, res) => {
    let userId = req.params.uid;
    console.log('GET mydesigns router working');
    //console.log('~req', req);

    Design.find({'creator.id': userId})
    .then(designs => {
        res.status(200).json(designs);
        console.log('~user\'s designs', designs);
    })
    .catch(err => {
        res.status(500);
        console.log(err);
    });

});

router.route("/create").post((req, res) => {
    console.log('create router working');
    console.log('~req.body', req.body)

    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const length = req.body.specs.length;
    const width = req.body.specs.width;
    const height = req.body.specs.height;
    const cost = req.body.cost;
    console.log('~req.user', req.user);

    // const creator = req.body.creator;

    const newDesign = new Design({
        name: name,
        imageUrl: imageUrl,
        description: description,
        specs: {
            length: length,
            width: width,
            height: height,

        },

        listingInfo: {
            cost: cost
        },

        creator: {
            name: req.user.username,
            id: req.user._id
        }
    });

    newDesign.save()
    .then((design) => {
        console.log('new saved design', design);
        User.findOneAndUpdate(
            { _id: req.user._id }, 
            { $push: {'designs': design._id} }
        ).then(user => {
            res.status(200).json(design);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.route('/details/:id').get((req, res) => {
    console.log('GET design router working');

    Design.findOne({_id: req.params.id})
    .then(design => {
        res.json(design);
        console.log('~design found', design);
    })
    .catch(err => {
        res.send(500);
        console.log(err);
    });

});

router.route('/details/:id').delete((req, res) => {
    console.log('DELETE design router working');

    Design.findOneAndDelete({_id: req.params.id})
    .then(design => {
        res.status(200).json(design);
        console.log('~design deleted', design);
    })
    .catch(err => {
        res.status(500).json({});
        console.log(err);
    });

});

module.exports = router;