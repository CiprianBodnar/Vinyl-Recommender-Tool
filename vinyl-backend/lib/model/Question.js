const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * definitions:
 *  Question:
 *    type: Object
 *     properties:
 *      question: string
 *      answer: string
 *      user_id: string
 *     required:
 *      -question
 *      -answer
 *      -user_id
 */
const QuestionSchema = new Schema({
    question: String,
    answer: [String],
    user_id: String
  });

QuestionSchema.methods.setUserId = function(user_id){
    this.user_id = user_id;
};

QuestionSchema.methods.setQuestionText = function(question){
  this.question = question;
}

QuestionSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      question: this.question,
      answer: this.answer
    };
  };
  
mongoose.model('Questions', QuestionSchema);  