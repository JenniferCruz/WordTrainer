import Quiz from "./Quiz";

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
  {content: "Car", answer: "Das Auto"},
  {content: "Cat", answer: "Die Katze"},
  {content: "House", answer: "Das Haus"},
  {content: "Apartment", answer: "Die Wohnung"},
  {content: "Glass", answer: "Der Glass"},
  {content: "Car", answer: "Das Auto"},
  {content: "Cat", answer: "Die Katze"},
  {content: "House", answer: "Das Haus"},
  {content: "Apartment", answer: "Die Wohnung"},
]

function assertQuizResults(expected, questions) {
  // 0 <= expected <= 100
  const expectedRightAnswers = Math.ceil((expected / 100) * questions.length)
  const quiz = new Quiz(questions)

  questions.forEach((q, i) => {
    quiz.correctAnswer(i+1 <= expectedRightAnswers ?
      q.answer : "wrong answer")
    quiz.nextQuestion()
  })

  expect(quiz.getResult()).toBeGreaterThanOrEqual(expected)
  expect(quiz.correctCount).toBeLessThanOrEqual(expectedRightAnswers)
}

