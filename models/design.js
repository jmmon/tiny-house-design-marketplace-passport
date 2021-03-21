const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const designSchema = new Schema({
    name: {
        type: String,
        // unique: true,
        // validate: {
        //     validator: function(v) {
        //         return /^[\w\d][\w\d\s]*[\w\d]$/.test(v);       //starts with any number or english letter; includes only numbers, letters, and spaces; and ends with any number or english letter
        //     },
        //     message: `must be only letters/numbers/spaces and not start or end with a space!`
        // },
        // minlength: [3, 'must be at least 3 characters!'],
        // required: [true, 'must have a value!']
    },
    imageUrl: {
        type: String,
        // validate: {
        //     validator: function(v) {
        //         return /^https?:\/\/\X*/.test(v);       //starts with https://
        //     },
        //     message: `must start with "http(s)://"!`
        // },
        // required: [true, 'must be an image path!']
    },
    description: {
        type: String,
        // minlength: [20, 'must be at least 20 characters!'],
        // required: [true, 'must have a value!']
    },
    length: {
        type: Number,
        // required: [true, 'must have a value!']
    },
    width: {
        type: Number,
        // required: [true, 'must have a value!']
    },
    height: {
        type: Number,
        // required: [true, 'must have a value!']
    },
    // lofts: {
    //     type: Number,
    //     required: [true, 'Enter 0 if no lofts.']
    // },
    // //stairs true/false
    // //bed upstairs true/false
    // bathrooms: {
    //     type: Number,
    //     required: [true, 'Please enter number of bathrooms.']
    // },
    
    // creator: { type: Schema.Types.ObjectId, ref: 'User'}
});

const Design = mongoose.model("Design", designSchema);

module.exports = Design;