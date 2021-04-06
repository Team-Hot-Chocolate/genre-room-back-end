'use strict';
const { default: axios } = require('axios');
const userModel = require('../models/User');

const Data={};


Data.getUserInfo = async(request, response) => {
  console.log("getuserInfo function");
  const userEmail = request.body.email;
  // response.status(200).send('response');
  const user = await userModel.find({ email: userEmail });
  // response.status(200).json(user[user.length - 1]);
  response.status(200).json(user[0]);
};

Data.updateGenre = async(request, response) => {
  const userEmail = request.body.email;
  const genre = request.params.genre;
  userModel.findOne({ email: userEmail },(err, entry) => {
    if(err) return console.log(err.message);
    entry.genre = genre;
    entry.save();
    response.status(200).send(genre);
  });
}

Data.deleteGenre = async(request, response) => {
  const userEmail = request.body.email;
  userModel.findOne({ email: userEmail },(err, entry) => {
    if(err) return console.log(err.message);
    entry.genre = '';
    entry.save();
    response.status(200).send(`genre selection reset`);
  });
}

Data.createUser = async(request,response) => {
  const 
}


module.exports = Data;
