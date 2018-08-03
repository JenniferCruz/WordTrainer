import type {UserJourney} from "../testUtils/UserJourney.type";
import takeQuiz from "./TakeQuiz";
import {allCorrectAnswers, someCorrectAnswers} from "../testUtils/testCases";

class TakeQuizTest implements UserJourney {

    initialize(questions) {
      this.useCase = takeQuiz({questions});
      this.useCase.startTest();
    }

    seesAndResponds(questionContent, responseInput) {
      this.seesQuestion(questionContent)
      this.respondsWith(responseInput)
    }

    seesQuestion(questionContent) {
      expect(this.useCase.getCurrentQuestion().content).toBe(questionContent);
    }

    respondsWith(responseInput) {
      this.useCase.respond({userResponse: responseInput})
      this.useCase.nextQuestion()
    }

    seesRemainingQuestions(remaining) {
      expect(this.useCase.getRemainingQuestions()).toBe(remaining);
    }

    seesResults(result) {
      expect(this.useCase.getResult()).toBe(result)
    }
}

it('Play with a set of words in input mode and see results', () => {
  allCorrectAnswers(new TakeQuizTest())
  someCorrectAnswers(new TakeQuizTest())
})



