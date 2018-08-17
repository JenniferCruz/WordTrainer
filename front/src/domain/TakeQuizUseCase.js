import fetch from 'node-fetch';
import Quiz from "./Quiz"
import {createQuestion} from "./Question";

export default function TakeQuizUseCase() {
 return {
    async startQuiz ({ quizType }) {
      this.isFinished = false
      this.quiz = new Quiz(await this.loadQuestions(quizType))
    },
    getView() {
      const q = this.quiz;
      if (q.getTotalQuestions() === 0)
        return {}

      return {
        currentQuestion: {content: q.getCurrentQuestion().getConcept()},
        remainingQuestions: q.getRemainingQuestions(),
        totalQuestions: q.getTotalQuestions(),
        questionOptions: q.getCurrentQuestion().getOptions(),
        result: q.getResult(),
        isFinished: this.isFinished
      }
    },
    nextQuestion () {
      if (this.quiz.isLastQuestion())
        this.isFinished = true
      else
        this.quiz.nextQuestion()
    },
    respond ({userResponse}) {
      this.quiz.correctAnswer(userResponse)
    },
    getResult ()  {
      return this.quiz.getResult()
    },
    async loadQuestions(questionType) {
      const response = await fetch('http://localhost:8080/translations')
      const data = await response.json()
      return data.map(t => (createQuestion(t.words.de, t.words.en, questionType)));
    }
  }
}