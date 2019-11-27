const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../../service/auth');



/**
 * @swagger
 * /share:
 *  post:
 *    tags:
 *        - Social
 *    description: Share a vinyl to a platform
 *    security:
 *      - beareAuth: []
 *    responses:
 *      200:
 *        description: Succes shared vinyl.
 *      401:
 *        description: No auth token
 *    parameters: [
 *      {
 *        name: vinyl,
 *        in: body,
 *        description: Vinyl that is shared,
 *        required: true
 *      }
 *    ]  
 */
router.post('/share', auth.required, (req, res, next)=>{
    const { payload: { id } } = req;
    return res
})