import TakeQuizUseCase from "../domain/TakeQuizUseCase";
import {useCaseMiddlewareBuilder} from "./UseCaseMiddlewareBuilder";

export let takeQuizUseCase = TakeQuizUseCase();

export function takeQuizMiddleware() {
  return useCaseMiddlewareBuilder( takeQuizUseCase, 'Quiz' )
}
