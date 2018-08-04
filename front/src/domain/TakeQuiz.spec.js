import type {UserJourney} from "../testUtils/UserJourney.type";
import TakeQuizUseCase from "./TakeQuizUseCase";
import {allCorrectAnswers, someCorrectAnswers} from "../testUtils/testCases";

class TakeQuizTest implements UserJourney {

    initialize(questions) {
      this.useCase = TakeQuizUseCase();
      this.useCase.questions = questions;
    }

    getView() {
      return this.useCase.getView();
    }

    seesAndResponds(questionContent, responseInput) {
      this.seesQuestion(questionContent)
      this.respondsWith(responseInput)
    }

    seesQuestion(questionContent) {
      expect(this.useCase.getView().currentQuestion.content).toBe(questionContent);
    }

    respondsWith(responseInput) {
      this.useCase.respond({userResponse: responseInput})
      this.useCase.nextQuestion()
    }

    seesRemainingQuestions(remaining) {
      expect(this.useCase.getView().remainingQuestions).toBe(remaining);
    }

    seesResults(result) {
      expect(this.getView().result).toBe(result)
    }
}

it('Play with a set of words in input mode and see results', () => {
  allCorrectAnswers(new TakeQuizTest())
  someCorrectAnswers(new TakeQuizTest())
})

it('loads questions', async () => {
  const takeQuiz = TakeQuizUseCase({questions: []});
  expect(takeQuiz.getView().remainingQuestions).toBe(0);

  await takeQuiz.startQuiz();

  expect(takeQuiz.getView().remainingQuestions).toBeGreaterThan(0);
})



