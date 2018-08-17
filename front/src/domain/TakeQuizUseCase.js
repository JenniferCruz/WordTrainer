import fetch from 'node-fetch';
import Quiz from "./Quiz"
import {Question, Translation} from "./Question";

export default function TakeQuizUseCase() {
 return {
    async startQuiz (type) {
      this.quiz = new Quiz(await this.loadQuestions(type))
    },
    getView() {
      return {
        currentQuestion: this.quiz.questions[this.quiz.currentQuestion],
        remainingQuestions: this.quiz.questions.length - this.quiz.currentQuestion,
        totalQuestions: this.quiz.questions.length,
        result: this.getResult()
      }
    },
    nextQuestion () {
      this.quiz.nextQuestion()
    },
    respond ({userResponse}) {
      this.quiz.correctAnswer(userResponse)
    },
    getResult ()  {
      return this.quiz.getResult()
    },
    buildQuestion(q) {
      // TODO: IMPLEMENT
      // return Question(new Translation(q.content, q.answer))
    },
    async loadQuestions(type) {
      const response = await fetch('http://localhost:8080/translations')
      const data = await response.json()
      let questions = data.map(t => ({content: t.words.de, answer: t.words.en}));
      if (type === "multiple") {
        // TODO: add options
        questions = data.map(t => ({content: t.words.de, answer: t.words.en, options: ['TEST-OPTION', t.words.en]}));
      }
      return questions;
    }
  }
}