const router = require('express').Router();
var request = require('request')
const SPARQL = require('../../service/sparql_service')
const my_sparql = new SPARQL();
const fetch = require("node-fetch");
const sparql_url = 'http://localhost:8000/api/sparql/aux'
var querystring = require('querystring');
var myResultList = []
var userId;
var client_id = '158f2d04baf54331b490d40a5b0c2741'; // Your client id
var client_secret = '94d84b237bdd47dd83ef1114d4aaf439'; // Your secret
var redirect_uri = 'http://localhost:8000/api/sparql/callback'; // Your redirect uri
var pCode
var rCode
const mongoose = require('mongoose');
const Question = mongoose.model('Questions')
var resultOfRandom 

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

router.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state playlist-read-collaborative user-top-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

router.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;
        
        pCode = access_token
        rCode = refresh_token    

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000/profile/user');
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

router.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});


 router.get('/aux', (req, res, next) => {

    Question.find({}, function( err , question){
        if(err){
            console.log("nothing found")
        }
        else{
            resultOfRandom = my_sparql.getRandomGenre(question, userId) 
            if(resultOfRandom == "Punk"){
                resultOfRandom = "Punk_rock"
            }
            var linkResultOfSparql = my_sparql.myQuery(resultOfRandom)
            fetch(linkResultOfSparql)
            .then(resp => resp.json())
            .then(data => {
                var getObj = data['results']['bindings']
                return res.json(getObj)
            })
            .catch((error) =>  {
                return res.json(error)
            });
        }
    });
    
});

router.get('/spotify',  (req, res, next) => {
    userId = req.query.id
    
    fetch(sparql_url)
        .then(resp => resp.json())
        .then(data =>{
            mapOfBands = my_sparql.storeInMap(data)
            myList = my_sparql.removeDuplicates(mapOfBands)
            
            var index = my_sparql.getRandomInt(myList.length)
            var mySearch = myList[index]['bandName']['value']
            var replaced = mySearch.split(' ').join('%20');
            var o = {
                url : 'https://api.spotify.com/v1/search?q='+replaced+'&type=artist',
                headers: { 'Authorization': 'Bearer ' + pCode },
                json: true
              };
            request.get(o, function(error, response, body) {
               return res.json(body['artists']['items'])
            });

        });

});


module.exports = router;