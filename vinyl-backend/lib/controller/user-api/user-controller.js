const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../../service/auth');
const Users = mongoose.model('Users');
var client_id = '158f2d04baf54331b490d40a5b0c2741'; // Your client id
var client_secret = '94d84b237bdd47dd83ef1114d4aaf439'; // Your secret
var redirect_uri = 'http://localhost:8000/api/spotify/callback/'; // Your redirect uri

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
 *      204:
 *        description: Missing information
 *    
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
 *      204:
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
 *        description: Succes get the current user
 *        schema:
 *          $ref: '#/definitions/User'
 *      401:
 *         description: No valid auth token
 *      404:
 *         description: No user data found
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
 *        description: Succes logged in. A code token is generated. And a redirect link is accesed.
 *      401:
 *         description: No valid auth token 
 *        
 *
 */
router.get('/login', function(req, res) {
  var scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
  });
  
module.exports = router;