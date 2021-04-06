'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  name: {type: String, required: false},
  genre: {type: String}
});

const User = mongoose.model('BookParent', userSchema);


const jakob = new User({
  email: 'lumpkinjakobr@gmail.com',
  name: 'jakob lumpkin',
  genre: 'comedy'
});
// jakob.save();


const jessi = new User({
  email: 'jessivelazq1@gmail.com',
  name: 'jessi velazquez',
  genre: 'comedy'
});
// jessi.save();

const chris = new User({
  email: 'gantt.art@gmail.com',
  name: 'chris gantt',
  genre: 'comedy'
});
// chris.save();

module.exports = User;

