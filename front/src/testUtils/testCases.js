//A user responds 3 questions and gets them all right
export function allCorrectAnswers(user) {
  let questions = [
    {content: "Car", answer: "Das Auto"},
    {content: "Cat", answer: "Die Katze"},
    {content: "House", answer: "Das Haus"},
  ];

  user.initialize(questions)

  questions.forEach((q, i) => {
    user.seesRemainingQuestions(questions.length - i)
    user.seesAndResponds(q.content, q.answer)
  })
  user.seesResults(100)
}

export function someCorrectAnswers(user) {
  let questions = [
    {content: "A Question", answer: "A Translation"},
    {content: "Another Question", answer: "Another Translation"}
  ]

  user.initialize(questions)
  user.seesAndResponds(questions[0].content, questions[0].answer)
  user.seesAndResponds(questions[1].content, "Wrong answer")
  user.seesResults(50)
}