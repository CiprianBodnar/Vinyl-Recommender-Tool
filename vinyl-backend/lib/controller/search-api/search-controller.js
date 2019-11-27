var mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../../service/auth');
const Users = mongoose.model('Users');


/**
 * @swagger
 * /vinyl:
 *  post:
 *    tags:
 *        - Search
 *    description: Search a song by their title or by the author
 *    security:
 *      - beareAuth: []
 *    responses:
 *      200:
 *        description: Succes search a song by title
 *        schema:
 *          $ref: '#/definitions/Vinyl'  
 *      401:
 *        description: No auth token
 *    parameters: [
 *      {
 *        title: song title,
 *        in: body,
 *        description: The title that is search for,
 *        required: false
 *      },
 *      {
 *        author: song author,
 *        in: body,
 *        description: The author of the song,
 *        required: false
 *      }
 *    ]  
 */
router.post('/vinyl', auth.required, (req, res, next) => {
    return res.json("todo");
});