import type {UserJourney} from "../testUtils/UserJourney.type";
import { allCorrectAnswersInMultipleChoice } from "../testUtils/testCases";
import TakeQuizUseCase from "./TakeQuizUseCase";

class TakeMultipleChoiceQuizUseCase implements UserJourney {
  initialize(questions) {
    this.useCase = TakeQuizUseCase();
    this.useCase.questions = questions;
  }

  seesRemainingQuestions(remaining) {
    expect(this.useCase.getView().remainingQuestions).toBe(remaining);
  }

  seesAndResponds(questionContent, responseInput) {
    this.seesQuestion(questionContent)
    this.respondsWith(responseInput)
  }

  seesQuestion(questionContent) {
    expect(this.useCase.getView().currentQuestion.content).toBe(questionContent);
  }

  seesMultipleAnswerChoices() {
    const currentQuestion = this.useCase.getView().currentQuestion;
    expect(currentQuestion.options.length).toBeGreaterThanOrEqual(3);
    expect(currentQuestion.options).toContain(currentQuestion.answer)
  }

  respondsWith(responseIndex) {
    this.useCase.respond({userResponse: responseIndex})
    this.useCase.nextQuestion()
  }

  seesResults(result) {
    expect(this.getView().result).toBe(result)
  }
}

it('displays questions with multiple choices', async () => {
  await allCorrectAnswersInMultipleChoice(new TakeMultipleChoiceQuizUseCase())
})