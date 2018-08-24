import {allCorrectAnswers, allCorrectAnswersInMultipleChoice, someCorrectAnswers} from "../testUtils/testCases";
import {waitForPendingPromises} from "../testUtils/testUtils";
import UIMultipleChoiceQuizTest from './UIMultipleChoiceQuizTest'
import {UIInputQuizTest} from "./UIInputQuizTest";

it('UI Quiz: Play with a set of words in input mode and see results', async () => {
  await allCorrectAnswers(new UIInputQuizTest())
  await someCorrectAnswers(new UIInputQuizTest())
})

it('UI Quiz: Plays words in multiple choice mode and sees results', async () => {
  const user = new UIMultipleChoiceQuizTest()

  let questions = [
    {content: "to hurt", answer: "verletzen"},
    {content: "to testify", answer: "aussagen"},
    {content: "to move", answer: "ausziehen"},
  ]
  user.initialize(questions)
  await waitForPendingPromises()
  questions.forEach((q, i) => {
    user.seesRemainingQuestions(questions.length - i)
    user.seesRightAnswerAsChoice(q.answer)
    user.seesAndResponds(q.content, q.answer)
  })
  user.seesResults(100)
})

it('UI Quiz: Sees several choices per question', async () => {
  const user = new UIMultipleChoiceQuizTest()
  const questions = [{content: "to steal", answer: "klauen"},{content: "to sue", answer: "klagen"}]
  user.initialize(questions)

  await waitForPendingPromises()

  user.seesMultipleAnswerChoices()
})

it('UI Quiz: Shows relevant message if no questions are available', async () => {
  const user = new UIInputQuizTest();
  let questions = []
  user.initialize(questions)
  await waitForPendingPromises()
  user.seesNoQuestionsMessage()
})
