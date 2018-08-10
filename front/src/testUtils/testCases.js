//A user responds 3 questions and gets them all right
import {waitForPendingPromises} from "./testUtils";

export async function allCorrectAnswers(user) {
  let questions = [
    {content: "Car", answer: "Das Auto"},
    {content: "Cat", answer: "Die Katze"},
    {content: "House", answer: "Das Haus"},
  ];

  user.initialize(questions)


  await waitForPendingPromises()

  questions.forEach((q, i) => {
    user.seesRemainingQuestions(questions.length - i)
    user.seesAndResponds(q.content, q.answer)
  })
  user.seesResults(100)
}

export async function someCorrectAnswers(user) {
  let questions = [
    {content: "A Question", answer: "A Translation"},
    {content: "Another Question", answer: "Another Translation"}
  ]
  user.initialize(questions)
  await waitForPendingPromises()
  user.seesAndResponds(questions[0].content, questions[0].answer)
  user.seesAndResponds(questions[1].content, "Wrong answer")
  user.seesResults(50)
}


export async function allCorrectAnswersInMultipleChoice(user) {
  let questions = [
    {content: "Car", answer: "Das Auto"},
    {content: "Cat", answer: "Die Katze"},
    {content: "House", answer: "Das Haus"},
  ];

  user.initialize(questions)
  await waitForPendingPromises()

  questions.forEach((q, i) => {
    user.seesRemainingQuestions(questions.length - i)
    user.seesMultipleAnswerChoices()
    user.seesAndResponds(q[0].content, q[0].answer)
  })

  user.seesResults(100)
}