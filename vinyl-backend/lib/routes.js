'use strict';
var User = require('./model/User');

var user = new User("John Doe","john.doe.@mail.com", "User")
module.exports = [
  // We're going to define our routes here
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      return "Home page"
    },
    config: {
      description: 'Gets all the notes available'
    }
  },
  {
    method: 'GET',
    path: '/user',
    handler: (request, reply) => {
      return user.getAll()
    },
    config: {
      description: 'Gets all the notes available'
    }
  },
  {
    method: 'GET',
    path: '/album',
    handler: (request, reply) => {
      return "album request"
    },
    config: {
      description: 'Gets all the notes available'
    }
  }
];
