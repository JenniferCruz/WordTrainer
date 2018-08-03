import buildUseCaseReducer from "./useCaseReducer";
import takeQuiz from "../domain/TakeQuiz";

export let takeTestReducer = buildUseCaseReducer(takeQuiz,
  {questions: [
    {content: "Dog", answer: "Der Hund"},
    {content: "Cat", answer: "Die Katze"},
    {content: "House", answer: "Das Haus"},
  ]});