interface UserJourney {
  initialize(questions: Array): void
  seesQuestion(questionContent: String): void
  respondsWith(responseInput: String): void
  seesAndResponds(questionContent: String, responseInput: String): void
  seesRemainingQuestions(remaining: Number): void
  seesResults(result: String): void
}