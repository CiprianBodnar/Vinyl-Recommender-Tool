const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../../service/auth');
const Users = mongoose.model('Users');


//POST new user route (optional, everyone has access)
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

    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
/**
 * @swagger
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
 *          $ref: '#/definition/User'
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

module.exports = router;