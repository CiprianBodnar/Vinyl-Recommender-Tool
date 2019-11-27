const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../../service/auth');
/**
 * @swagger
 * definitions:
 *  Music:
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
 *          - name: id
 *          - description: Vinyl id
 *          - in: path
 *          - required: true
 *          - type: string
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
 *       - name: Vinyl
 *         description: Vinyl(song) object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Music'
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
 *          - name: id
 *          - description: Vinyl id
 *          - in: path
 *          - required: true
 *          - type: string
 *              
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Vinyl deleted
 *          401:
 *              description: Unauthorize to this endpoint, please register
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
 */
router.get('/recomand', auth.required, (req, res, next)=>{
    const { payload: { id } } = req;
    return res
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
 *          - name: id
 *          - description: playlist id
 *          - in: path
 *          - required: true
 *          - type: string
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
 *          - name: id
 *          - description: playlist id
 *          - in: path
 *          - required: true
 *          - type: string
 *      responses:
 *          200:
 *              description: Playlist deleted
 *              schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      creator:
 *                          type: string
 *                      id:
 *                          type: string
 *                      songs:
 *                          type: array
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
 *          - name: id
 *          - description: playlist id
 *          - in: path
 *          - required: true
 *          - type: string
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
router.post('/playlist', auth.required, (req, res, next)=>{
    const { payload: { id } } = req;
    return res
})
