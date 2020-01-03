const router = require('express').Router();
var querystring = require('querystring');
var client_id = '158f2d04baf54331b490d40a5b0c2741'; // Your client id
var client_secret = '94d84b237bdd47dd83ef1114d4aaf439'; // Your secret
var redirect_uri = 'http://localhost:8000/api/spotify/callback/'; // Your redirect uri
var request = require('request')
var my_code = null
const authOptionsFunction = require('../../service/spotify_auth');
const refreshFunction = require('../../service/spotift_refresh')

router.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter
  
    var code = req.query.code || null;
    var authOptions = authOptionsFunction(code, client_id, client_secret, redirect_uri)
    my_code = authOptions['form']['code']
    return res.json(authOptions['form']['code']); 
  });
  /**
   * @swagger
   * definitions:
   *  User:
   *    type: Object
   * /login/refresh_token:
   *  get:
   *    tags:
   *      - Users
   *    description: Refres token for Spotify auth
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Succes generated a refresh token.
   *      401:
   *         description: No valid auth token 
   *      404:
  *          description: No refresh token found  
   *
   */
  router.get('/refresh_token', function(req, res) {
  
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = refreshFunction(refresh_token, client_id, client_secret)
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });

 /**
   
   */
  router.get('/search', function(req, res){

    var code = my_code;
    
    var authOptions = authOptionsFunction(code, client_id, client_secret, redirect_uri)

    request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
  
        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/search?q=tania%20bowra&type=artist',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body['artists']['items'][0]);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
});
  

  module.exports = router;