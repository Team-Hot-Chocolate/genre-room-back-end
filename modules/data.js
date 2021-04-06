'use strict';
const { default: axios } = require('axios');
const userModel = require('../models/User');
const superagent = require('superagent');

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
  });
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIES_API_KEY}&with_genres=${genre}`;
  superagent
    .get(url)
    .then(results => {
      const movies = results.body.results;
      console.log(results);
      const randIdx = Math.floor(Math.random() * (movies.length - 1));
      response.status(200).send(movies[randIdx]);
    })
    .catch((err) => {
      console.error('superagent error', err.url);
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

Data.getAllMovies = async(request, response) => {
  const genre = request.params.genre;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIES_API_KEY}&with_genres=${genre}`;
  superagent
    .get(url)
    .then(results => {
      const movies = results.body.results;
      const randIdx = Math.floor(Math.random() * (movies.length - 1));
      response.status(200).send(movies[randIdx]);
    })
    .catch((err) => {
      console.error('superagent error', err.url);
    });
}


module.exports = Data;


