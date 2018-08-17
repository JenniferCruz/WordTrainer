import {Question, Translation} from "./Question";
import {TextResponseHandler} from "./ResponseHandler";

export default class Quiz {
  currentQuestion = 0
  correctCount = 0
  questions = []

  constructor(questions) {
    this.questions = questions
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  correctAnswer(userResponse) {
    const q = this.questions[this.currentQuestion];
    const question = Question(new Translation(q.content, q.answer));
    const responseHandler = new TextResponseHandler(question);
    if (responseHandler.respond(userResponse))
      this.correctCount++
  }

  getResult() {
    return Math.ceil(100 * (this.correctCount / this.questions.length));
  }
}