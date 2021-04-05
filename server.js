'use strict';

require('dotenv').config();
const express=require('express');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT || 3002;
const Data=require('./modules/data.js');


//get request returns all moviees for a genre
app.get('/movies/:genre', Data.getAllMovies);

//get request that gets us the user information
//pass in email in body
app.get('/user', Data.getUserInfo);

//post request that creates a new user
app.post('/user', Data.createUser);

//put request the update genre perference
app.put('/user/:genre', Data.updateGenre);

//delete request that deletes genre perference
app.delete('/user', Data.deleteGenre);



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to the database');
});

app.get('/', function (request, response) {
  response.send('Hello World');
});

app.listen(PORT, () => console.log('Listening on port', PORT));