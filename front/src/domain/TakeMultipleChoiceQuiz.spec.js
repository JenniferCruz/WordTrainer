import type {UserJourney} from "../testUtils/UserJourney.type";
import { allCorrectAnswersInMultipleChoice } from "../testUtils/testCases";
import TakeQuizUseCase from "./TakeQuizUseCase";

class TakeMultipleChoiceQuizUseCase implements UserJourney {
  initialize(questions) {
    this.useCase = TakeQuizUseCase("multiple");
    this.useCase.questions = questions.map((t, i) => {
      const options = [t.answer]
      const len = questions.length
      options.push(questions[(i+1)%len].answer)
      options.push(questions[(i+2)%len].answer)
      return {content: t.content, answer: t.answer, options: options}
    });
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
    expect(this.useCase.getView().result).toBe(result)
  }
}

it('tests with multiple choice questions', async () => {
  await allCorrectAnswersInMultipleChoice(new TakeMultipleChoiceQuizUseCase())
})
