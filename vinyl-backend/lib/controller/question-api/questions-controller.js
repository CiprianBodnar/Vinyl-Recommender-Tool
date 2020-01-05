const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../../service/auth');
const Users = mongoose.model('Users');
const Question = mongoose.model('Questions')
const get_question = require('../../service/quesion_retriever')
/**
 * @swagger
 * definitions:
 *  Question:
 *    type: Object
 *    properties:
 *      question: string
 *      answer: string
 *      user_id: string
 *    required:
 *      -question
 *      -answer
 *      -user_id
 * /display:
 *  get:
 *      tags:
 *          - Question
 *      description: Display question to know better the new user
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Displyed question
 *              schema:
 *                  $ref: '#/definitions/Question'
 *          401:
 *              description: Unauthorize to this endpoint, please register
 *          204:
 *              description: User is not on the first login so no question are displayed.
 *          404:
 *              description: No question found
 */
router.get('/display', auth.required, (req, res, next)=>{
    const { payload: { id } } = req;

    return Users.findById(id)
        .then((user) => {
        if(!user) {
            return res.sendStatus(400);
        }
        if(user.firstRegistration==true){
            user.setFirstRegistration(false)
            return user.save()
                .then(() => res.json(get_question()));
        }else{
            return res.sendStatus(204)
        }
        
    });

})
/**
 * @swagger
 * /submit:
 *  post:
 *    tags:
 *        - Question
 *    description: Submit answer to a specific question
 *    security:
 *      - beareAuth: []
 *    responses:
 *      200:
 *        description: Succes submitted
 *      204:
 *        description: Missing information
 *      401:
 *        description: No auth token
 *    parameters: [
 *      {
*          in: body,
 *         name: question,
 *         description: Question that need a response,
 *         required: true
 *      },
 *      {
 *          in: body,
 *          name: answer,
 *          description: Answer to the question,
 *          required: true
 *      }
 *    ]  
 */
router.post('/submit', auth.required, (req, res, next) =>{
    const { body: { questions } } = req;
    const { payload: { id } } = req;
    for (question in questions){
        var final_question = new Question(questions[question].question)
        final_question.setUserId(id)
        final_question.save()
    }
    res.end()
})

module.exports = router;