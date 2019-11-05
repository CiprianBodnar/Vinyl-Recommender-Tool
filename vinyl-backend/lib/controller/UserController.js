var express = require('express')
var router  = express.Router()
var mongoose = require('mongoose')
require('../model/User')

router.get('/users', function(req, res){
    mongoose.model('User').find(function(err, users){
      res.send(users);
    });
  });


module.exports = router