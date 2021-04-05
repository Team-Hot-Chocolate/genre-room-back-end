'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  genre: {type: String}
});

const User = mongoose.model('BookParent', userSchema);


const jakob = new User({
  email: 'lumpkinjakobr@gmail.com',
  genre: 'comedy'
});
jakob.save();


const jessi = new User({
  email: 'jessivelazq1@gmail.com',
  genre: 'comedy'
});
jessi.save();

module.exports = User;