const mongoose = require('mongoose');
const Question = mongoose.model('Questions')

class Qustion_service {

    constructor() {
         this.listOfQuestions = ["What kind of music to you listen?", "Tell me a list of vinyl artists that you love to play."]
      }
    
        
    save(questions, id) {
        for (var q in questions){
            
            var final_question = new Question(questions[q].question)
            final_question.setQuestionText(questions[q].question.text_question)
            final_question.setUserId(id)
            final_question.save()
            }
        }

    get_question(){
        return this.listOfQuestions
     }    
}

module.exports = Qustion_service