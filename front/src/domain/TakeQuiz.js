import {Question, Translation, Text} from "./Question";
import {TextResponseHandler} from "./ResponseHandler";
import fetch from 'node-fetch';

export default function TakeQuiz({questions}) {
 return {
    currentQuestion: 0,
    correctCount: 0,
    questions: questions || [],
    startQuiz () {
      this.currentQuestion = 0;
      this.correctCount = 0;
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
      const question = Question(new Translation(new Text(q.content, 'en'), new Text(q.answer, 'de')));
      const responseHandler = new TextResponseHandler(question);
      if (responseHandler.respond(userResponse))
        this.correctCount++
    },
    getResult ()  {
      return Math.ceil(100 * (this.correctCount / this.questions.length));
    },
    async loadQuestions() {
      const response = await fetch('http://localhost:8080/translations');
      const data = await response.json();
      this.questions = data.map(t => ({content: t.words.de, answer: t.words.en}));
    }
  }
}