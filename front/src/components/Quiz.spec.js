import {allCorrectAnswers, allCorrectAnswersInMultipleChoice, someCorrectAnswers} from "../testUtils/testCases";
import {waitForPendingPromises} from "../testUtils/testUtils";
import UIMultipleChoiceQuizTest from './UIMultipleChoiceQuizTest'
import {UIInputQuizTest} from "./UIInputQuizTest";

it('UI Quiz: Play with a set of words in input mode and see results', async () => {
  await allCorrectAnswers(new UIInputQuizTest())
  await someCorrectAnswers(new UIInputQuizTest())
})

it('UI Quiz: Plays words in multiple choice mode and sees results', async () => {
  await allCorrectAnswersInMultipleChoice(new UIMultipleChoiceQuizTest())
})

it('UI Quiz: Shows relevant message if no questions are available', async () => {
  const user = new UIInputQuizTest();
  let questions = []
  user.initialize(questions)
  await waitForPendingPromises()
  user.seesNoQuestionsMessage()
})
