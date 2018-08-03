import {Question, Translation, Text} from "./Question";
import {TextResponseHandler} from "./ResponseHandler";

export default function takeQuiz({questions}) {
 return {
    currentQuestion: 0,
    correctCount: 0,
    questions: questions || [],
    startTest () {
      this.currentQuestion = 0;
      this.correctCount = 0;
    },
    getCurrentQuestion (){
      return this.questions[this.currentQuestion];
    },
    nextQuestion () {
      this.currentQuestion++;
    },
    respond ({userResponse}) {
      const q = this.questions[this.currentQuestion];
      const question = Question(new Translation(new Text(q.content, 'en'), new Text(q.answer, 'de')));
      const responseHandler = new TextResponseHandler(question);
      if (responseHandler.respond(userResponse))
        this.correctCount++
    },
    getRemainingQuestions (){
      return this.questions.length - this.currentQuestion;
    },
    getResult ()  {
      return Math.ceil(100 * (this.correctCount / this.questions.length));
    }
  }
}