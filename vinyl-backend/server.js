const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

var songs = require('./lib/controller/SongController')
var users = require('./lib/controller/UserController')

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(songs)
app.use(users)

if(!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect('mongodb://localhost:27017/passport');
mongoose.set('debug', true);


app.listen(8000, () => console.log('Server running on http://localhost:8000/'));