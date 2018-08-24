import React from "react";
import {createStore, applyMiddleware} from "redux";
import {takeTestReducer} from "../reducer";
import type {UserJourney} from "../testUtils/UserJourney.type";
import {noQuestionsInQuiz} from "../testUtils/strings";
import {takeQuizMiddleware} from "../middleware/TakeQuizMiddleware";
import Quiz from './Quiz'
import simulateApp from '../testUtils/SimulateApp'
import {createQuestion, worldDatabase} from "../domain/Question";

export class UIQuiz implements UserJourney {

  initialize(questions, type = "input") {
    this.store = createStore(takeTestReducer, applyMiddleware(takeQuizMiddleware))
    this.questions = questions

    questions = this.questions.map(({content, answer}) => createQuestion(content, answer, type))

    worldDatabase.findQuestions = () => new Promise(resolve => setTimeout(() => resolve(questions), 0));

    this.component = simulateApp(<Quiz type={type}/>, this.store);
  }

  seesQuestion(questionContent) {
    //Looks like Enzyme has problems with rendering when there are async updates
    this.component.update()
    expect(this.component.find(".question-content").text())
      .toContain(questionContent)
  }

  seesAndResponds(questionContent, responseInput) {
    this.seesQuestion(questionContent)
    this.respondsWith(responseInput)
  }

  seesRemainingQuestions(remaining) {
    this.component.update()
    expect(this.component.find(".questions-count").text())
      .toContain(`${remaining}/${this.questions.length}`)
  }

  seesResults(result) {
    this.component.update()
    expect(this.component.find(".test-results-content").text())
      .toContain(result + "%")
  }

  seesNoQuestionsMessage() {
    this.component.update()
    const message = this.component.find(".empty-test-message").text()
    expect(message).toContain(noQuestionsInQuiz)
    expect(message.length).toBeGreaterThan(0)
  }

  next() {
    this.component.find("form").simulate('submit')
  }
}