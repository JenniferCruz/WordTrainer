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
    if (this.currentQuestion < this.questions.length - 1)
      this.currentQuestion++;
  }

  correctAnswer(userResponse) {
    const question = this.questions[this.currentQuestion];
    const responseHandler = new TextResponseHandler(question);
    if (responseHandler.respond(userResponse))
      this.correctCount++
  }

  getResult() {
    return Math.ceil(100 * (this.correctCount / this.questions.length));
  }
}