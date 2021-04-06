'use strict';
const { default: axios } = require('axios');
const userModel = require('../models/User');

const Data={};


Data.getUserInfo = async(request, response) => {
  const userEmail = request.body.email;
  const user = await userModel.find({ email: userEmail });
  console.log('get query', user);
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
//need to respond with a movie rec here


Data.deleteGenre = async(request, response) => {
  const userEmail = request.body.email;
  userModel.findOne({ email: userEmail },(err, entry) => {
    if(err) return console.log(err.message);
    entry.genre = '';
    entry.save();
    response.status(200).send(`genre selection reset`);
  });
}

Data.createUser = async(request, response) => {
  //email and name must be passed into request.body
  const userEmail = request.body.email;
  const exists = await userModel.exists({ email: userEmail });
  if (exists) {
    response.status(200).send('user in DB');
  } else {
    const user = {
      email: request.body.email,
      name: request.body.name,
      genre: ''
    };
    const newUser = new userModel(user);
    await newUser.save();
    response.status(200).send(`${newUser.name} has been added to DB`);
  };
}


module.exports = Data;
