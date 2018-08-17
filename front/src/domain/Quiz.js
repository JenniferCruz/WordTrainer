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
    if (this.getCurrentQuestion().isCorrect(userResponse))
      this.correctCount++
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestion]
  }

  getTotalQuestions() {
    return this.questions.length
  }

  getRemainingQuestions() {
    return this.getTotalQuestions() - this.currentQuestion
  }

  getResult() {
    return Math.ceil(100 * (this.correctCount / this.questions.length));
  }

  isLastQuestion() {
    return this.currentQuestion === this.questions.length - 1
  }
}