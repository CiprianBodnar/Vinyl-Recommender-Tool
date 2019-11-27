const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../../service/auth');
const Users = mongoose.model('Users');
const Spotify_service = require('../../service/spotify_auth');
var querystring = require('querystring');
var client_id = '158f2d04baf54331b490d40a5b0c2741'; // Your client id
var client_secret = '94d84b237bdd47dd83ef1114d4aaf439'; // Your secret
var redirect_uri = 'http://localhost:8000/api/users/callback/'; // Your redirect uri
var stateKey = 'spotify_auth_state';
var request = require('request')
/**
 * @swagger
 * /register:
 *  post:
 *    tags:
 *        - Users
 *    description: Register a user in application
 *    responses:
 *      200: 
 *        description: Registration succes
 *      422:
 *        description: Missing information
 *      401:
 *        description: No auth token valid
 *    parameters: [
        {
          name: email,
          in: body,
          description: email of the user,
          required: true
        },
        {
          name: password,
          in: body,
          description: password for the given email,
          required: true
        }
      ]
 */
router.post('/register', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);
  finalUser.setFirstRegistration(true);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
/**
 * @swagger
 * /login:
 *  post:
 *    tags:
 *        - Users
 *    description: Login with arleady registered user
 *    security:
 *      - beareAuth: []
 *    responses:
 *      200:
 *        description: Succes log in
 *      422:
 *        description: Missing information
 *      401:
 *        description: No auth token
 *    parameters: [
 *      {
 *        name: email,
 *        in: body,
 *        description: Email already registered in app,
 *        required: true
 *      },
 *      {
 *        name: password,
 *        in: body,
 *        description: Password for the given email,
 *        required: true
 *      }
 *    ]  
 */
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }


  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
     
      return res.json({ user: user.toAuthJSON() });
    }

    return res.sendStatus(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
/**
 * @swagger
 * definitions:
 *  User:
 *    type: Object
 *    properties:
 *      email: string
 *      hash: string
 *      salt: string
 *    required:
 *      -email
 *      -hash
 *      -salt
 * /current:
 *  get:
 *    tags:
 *      - Users
 *    description: Get current user that is logged in
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        descriptions: Succes get the current user
 *        schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              hash:
 *                type: string
 *              salt:
 *                type: string
 *      401:
 *         desciptions: No valid auth token 
 *        
 *
 */
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

/**
 * @swagger
 * definitions:
 *  User:
 *    type: Object
 * /login/spotify:
 *  get:
 *    tags:
 *      - Users
 *    description: Login in app using Spotify
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        descriptions: Succes logged in. A code token is generated. And a redirect link is accesed.
 *      401:
 *         desciptions: No valid auth token 
 *        
 *
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
  var scope = 'user-read-private user-read-email';
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

        console.log(access_token)
        console.log(refresh_token)
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
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

module.exports = router;