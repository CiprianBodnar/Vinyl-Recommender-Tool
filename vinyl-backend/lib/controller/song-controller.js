var express = require('express')
var router  = express.Router()
var mongoose = require('mongoose')
require('../model/song')

router.get('/songs', function(req, res){
    mongoose.model('Song').find(function(err, songs){
      res.send(songs);
    });
  });


module.exports = router