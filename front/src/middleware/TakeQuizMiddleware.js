import TakeQuiz from "../domain/TakeQuiz";
import {useCaseMiddlewareBuilder} from "./UseCaseMiddlewareBuilder";

export let takeQuizUseCase = TakeQuiz( {questions: [
    {content: "Dog", answer: "Der Hund"},
    {content: "Cat", answer: "Die Katze"},
    {content: "House", answer: "Das Haus"},
  ]});

export function takeQuizMiddleware() {
  return useCaseMiddlewareBuilder( takeQuizUseCase, 'Quiz' )
}
