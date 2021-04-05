'use strict';
const { default: axios } = require('axios');
const { modelName } = require("../models/User");

const Data={};

Data.getAllMovies = async(request, response) => {
    console.log('hello it work');

    User.findOne({ email: userEmail }, (err, entry) => {
      if(err) return console.error(err);
      console.log(entry);
    });
}

module.exports = Data;