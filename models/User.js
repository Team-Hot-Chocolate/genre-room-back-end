'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  name: {type: String, required: false},
  genre: {type: String}
});

const User = mongoose.model('BookParent', userSchema);
// 'BookParent' leftover from last lab.
// It's already set in our MongoDB Atlas to this but in the future this name will be more fitting for the project we're on.

module.exports = User;
