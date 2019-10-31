'use strict';

module.exports = [
  // We're going to define our routes here
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      return 'All the notes will appear here'
    },
    config: {
      description: 'Gets all the notes available'
    }
  }
];
