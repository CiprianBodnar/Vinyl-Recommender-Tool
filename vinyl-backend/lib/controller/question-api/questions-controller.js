const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../../service/auth');
const Users = mongoose.model('Users');
const Question = mongoose.model('Questions')
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
 *                  type: object
 *                  properties:
 *                      question:
 *                          type: string
 *                      answer:
 *                          type: string
 *                      user_id:
 *                          type: string
 *          401:
 *              description: Unauthorize to this endpoint, please regiset
 *          204:
 *              description: User is not on the first login so no question are displayed.
 */
listOfQuestions = ["What kind of music to you listen?", "Tell me a list of vinyl artists that you love to play."]
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
                .then(() => res.json(listOfQuestions));
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
 *        description: Succes subitted
 *      422:
 *        description: Missing information
 *      401:
 *        description: No auth token
 *    parameters: [
 *      {
 *        name: question,
 *        in: body,
 *        description: Question that need a response,
 *        required: true
 *      },
 *      {
 *        name: answer,
 *        in: body,
 *        description: Answer to the question,
 *        required: true
 *      }
 *    ]  
 */
router.post('/submit', auth.required, (req, res, next) =>{
    const { body: { question } } = req;
    const { payload: { id } } = req;
    const finalQuestion = new Question(question);
    finalQuestion.setUserId(id);
    return finalQuestion.save()
        .then(() => res.json({ question: finalQuestion.toAuthJSON() }));
})

module.exports = router;