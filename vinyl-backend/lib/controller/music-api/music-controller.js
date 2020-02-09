const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../../service/auth');
var playlist_service = require('../../service/playlist_service')
/**
 * @swagger
 * definitions:
 *  Vinyl:
 *    type: Object
 *    properties:
 *      title: string
 *      author: string
 *      id_dbpedia: string
 *      id_spotify: string
 * /vinyl/{id}:
 *  get:
 *      tags:
 *          - Music
 *      description: Get a specific vinyl
 *      security:
 *          - bearerAuth: []
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Vinyl id 
 *            minimum: 1
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Vinyl displayed.
 *              schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      author:
 *                          type: string
 *                      id_dbpedia:
 *                          type: string
 *                      id_spotify:
 *                          type: string
 *          401:
 *              description: Unauthorize to this endpoint, please register
 *          404:
 *              description: No vinyl found for given id
 */
router.get('/vinyl', auth.required, (req, res, next)=>{
    const { payload: { id } } = req;
    return res
})

/**
 * @swagger
 * /vinyl:
 *   post:
 *     tags:
 *       - Music
 *     description: Add a vinyl
 *     security:
 *          - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Vinyl
 *         description: Vinyl(song) object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Vinyl'
 *     responses:
 *       200:
 *         description: Successfully created
 *       401:
 *              description: Unauthorize to this endpoint, please register
 */
router.post('/vinyl', auth.required, (req, res, next)=>{
    const { payload: { id } } = req;
    return res
})

/**
 * @swagger
 * /vinyl/{id}:
 *  delete:
 *      tags:
 *          - Music
 *      description: Delete a vinyl from a playlist
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Vinyl id
 *            required: true
 *            type: string
 *              
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Vinyl deleted
 *          401:
 *              description: Unauthorize to this endpoint, please register
 *          404:
 *              description: Vinyl not found for given id
 */
router.delete('/vinyl', auth.required, (req, res, next)=>{
    const { payload: { id } } = req;
    return res
})


/**
 * @swagger
 * /recommander:
 *  get:
 *      tags:
 *          - Music
 *      description: Get list of recommandations
 *      security:
 *          - bearerAuth: []
 *      
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: List of recommandation 
 *              schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      author:
 *                          type: string
 *          401:
 *              description: Unauthorize to this endpoint, please register
 *          404:
 *              description: Not getting any recommandation
 */
router.get('/recommand', auth.required, (req, res, next)=>{
    const { payload: { id } } = req;
    return res.json("test")
})






/**
 * @swagger
 * /playlist/{id}:
 *  get:
 *      tags:
 *          - Music
 *      description: Get a playlist
 *      security:
 *          - bearerAuth: []
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: playlist id
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Playlist retrtieved
 *              schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      creator:
 *                          type: string
 *                      id:
 *                          type: string
 *                      
 *          401:
 *              description: Unauthorize to this endpoint, please register
 */
router.get('/playlist/{id}', auth.required, (req, res, next)=>{
    const { payload: { id } } = req;
    return res
})

/**
 * @swagger
 * /playlist/{id}:
 *  delete:
 *      tags:
 *          - Music
 *      description: Delete a playlist
 *      security:
 *          - bearerAuth: []
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: playlist id
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Playlist deleted
 *              
 *          401:
 *              description: Unauthorize to this endpoint, please register
 */
router.delete('/playlist/{id}', auth.required, (req, res, next)=>{
    const { payload: { id } } = req;
    return res
})

/**
 * @swagger
 * definitions:
 *  Playlist:
 *    type: Object
 *    properties:
 *      title: string
 *      creator: string
 *      songs: array
 *      date_created: date
 * /playlist:
 *  post:
 *      tags:
 *          - Music
 *      description: Get a playlist
 *      security:
 *          - bearerAuth: []
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: playlist id
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Playlist created
 *              schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      creator:
 *                          type: string
 *                      id:
 *                          type: string
 *                     
 *          401:
 *              description: Unauthorize to this endpoint, please register
 */
router.post('/playlist', (req, res, next)=>{
    const { body: { playlist } } = req;

    playlist_service.save(playlist)


    return res.json('Succesfull created')
})
module.exports = router;
