const router = require('express').Router();
const auth = require('../../service/auth');
const Users = mongoose.model('Users');


/**
 * @swagger
 * /song:
 *  post:
 *    tags:
 *        - Search
 *    description: Search a song by their title or by the author
 *    security:
 *      - beareAuth: []
 *    responses:
 *      200:
 *        description: Succes search a song by title
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
router.post('/song', auth.required, (req, res, next) => {
    return res.json("todo");
});