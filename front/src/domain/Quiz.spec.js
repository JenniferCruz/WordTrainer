import Quiz from "./Quiz";
import { createQuestion } from "./Question";

it('keeps currentQuestion as a valid number', () => {
  const quiz = new Quiz([createQuestion("Car", "Das Auto"), createQuestion("he", "er")])
  quiz.nextQuestion()
  quiz.nextQuestion()
  expect(quiz.currentQuestion).toBe(1)
})

it('completes with all correct answers', () =>
  assertQuizResults(100, questions))

it('completes with no correct answer', () => {
  assertQuizResults(0, questions)
})

it('completes with 50% correct answers', () => {
  assertQuizResults(50, questions)
})

it('completes with 30% correct answers', () => {
  assertQuizResults(30, questions)
})


const questions = [
  createQuestion("Car", "Das Auto"),
  createQuestion("Cat", "Die Katze"),
  createQuestion("House", "Das Haus"),
  createQuestion("Apartment", "Die Wohnung"),
  createQuestion("Glass", "Der Glass"),
  createQuestion("Car", "Das Auto"),
  createQuestion("Cat", "Die Katze"),
  createQuestion("House", "Das Haus"),
  createQuestion("Apartment", "Die Wohnung")
]

function assertQuizResults(expected, questions) {
  // 0 <= expected <= 100
  const expectedRightAnswers = Math.ceil((expected / 100) * questions.length)
  const quiz = new Quiz(questions)

  questions.forEach((q, i) => {
    quiz.correctAnswer(i+1 <= expectedRightAnswers ?
      q.getAnswer() : "wrong answer")
    quiz.nextQuestion()
  })

  expect(quiz.getResult()).toBeGreaterThanOrEqual(expected)
  expect(quiz.correctCount).toBeLessThanOrEqual(expectedRightAnswers)
}

