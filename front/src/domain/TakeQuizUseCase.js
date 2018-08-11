import {Question, Translation} from "./Question";
import {TextResponseHandler} from "./ResponseHandler";
import fetch from 'node-fetch';

export default function TakeQuizUseCase() {
 return {
    currentQuestion: 0,
    correctCount: 0,
    questions: [],
    async startQuiz (type) {
      this.currentQuestion = 0;
      this.correctCount = 0;
      return this.questions = (await this.loadQuestions(type));
    },
    getView() {
      return {
        currentQuestion: this.questions[this.currentQuestion],
        remainingQuestions: this.questions.length - this.currentQuestion,
        totalQuestions: this.questions.length,
        result: this.getResult()
      }
    },
    nextQuestion () {
      this.currentQuestion++;
    },
    respond ({userResponse}) {
      const q = this.questions[this.currentQuestion];
      const question = Question(new Translation(q.content, q.answer));
      const responseHandler = new TextResponseHandler(question);
      if (responseHandler.respond(userResponse))
        this.correctCount++
    },
    getResult ()  {
      return Math.ceil(100 * (this.correctCount / this.questions.length));
    },
    async loadQuestions(type) {

      // let questions = [
      //   {content: "Car", answer: "Das Auto"},
      //   {content: "Cat", answer: "Die Katze"},
      //   {content: "House", answer: "Das Haus"},
      // ];
      //
      // return new Promise(resolve => {
      //   setTimeout(() => {
      //     resolve(questions)
      //   }, 0)
      // });

      const response = await fetch('http://localhost:8080/translations');
      const data = await response.json();
      // if (type === "multiple") {
      if (true) {
        // TODO: add options
        this.questions = data.map(t => ({content: t.words.de, answer: t.words.en, options: ['TEST-OPTION', t.words.en]}));
      } else
        this.questions = data.map(t => ({content: t.words.de, answer: t.words.en}));
      return this.questions;
    }
  }
}