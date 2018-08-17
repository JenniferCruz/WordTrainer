import fetch from 'node-fetch';
import Quiz from "./Quiz"
import {createQuestion} from "./Question";

export default function TakeQuizUseCase() {
 return {
    async startQuiz ({ quizType }) {
      this.isFinished = false
      this.quiz = new Quiz(await this.loadQuestions())
      this.questionOptions = []
      if (quizType === "multiple") {
        // TODO: add options
        this.quiz.questions.forEach((q) => {
          this.questionOptions.push(['TEST-OPTION', q.getAnswer()])
        })
      }
    },
    getView() {
      const { questions = [], currentQuestion} = this.quiz;

      if (questions.length === 0)
        return {};

      const q = questions[currentQuestion];

      return {
        currentQuestion: {content: q.getConcept()},
        remainingQuestions: questions.length - currentQuestion,
        totalQuestions: questions.length,
        questionOptions: this.questionOptions[currentQuestion],
        result: this.getResult(),
        isFinished: this.isFinished
      }
    },
    nextQuestion () {
      if (this.quiz.currentQuestion === this.quiz.questions.length - 1)
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
    buildQuestion(q) {
      // TODO: IMPLEMENT
      // return Question(new Translation(q.content, q.answer))
    },
    async loadQuestions() {
      const response = await fetch('http://localhost:8080/translations')
      const data = await response.json()
      return data.map(t => (createQuestion(t.words.de, t.words.en)));
    }
  }
}