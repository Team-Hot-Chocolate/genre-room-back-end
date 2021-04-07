'use strict';

require('dotenv').config();
const express=require('express');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
const Data=require('./modules/data.js');

const PORT=process.env.PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI;


//routes
app.get('/movies/:genre', Data.getAllMovies);
app.get('/movies', Data.getMovieNoGenre);
app.get('/user', Data.getUserInfo);
app.post('/user', Data.createUser);
app.put('/user/:genre', Data.updateGenre);
app.delete('/user', Data.deleteGenre);



const mongoose = require('mongoose');


mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to the database');
});


app.get('/', function (request, response) {
  response.send('Hello World');
});

app.listen(PORT, () => console.log('Listening on port', PORT));
