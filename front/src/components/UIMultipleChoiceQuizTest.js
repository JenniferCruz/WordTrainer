import React from "react";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import { mount } from 'enzyme';
import type {UserJourney} from "../testUtils/UserJourney.type";
import Quiz from "./Quiz";
import {noQuestionsInQuiz} from "../testUtils/strings";
import {takeQuizMiddleware, takeQuizUseCase} from "../middleware/TakeQuizMiddleware";
import {takeTestReducer} from "../reducer";

export default class UIMultipleChoiceQuizTest implements UserJourney {
  initialize(questions) {
    this.store = createStore(takeTestReducer, applyMiddleware(takeQuizMiddleware))
    this.questions = questions

    takeQuizUseCase.loadQuestions = () => new Promise(resolve => setTimeout(() => resolve(questions), 0));
    this.component = mount(
      <Provider store={this.store}>
         <Quiz />
       </Provider>
     )
  }

  seesQuestion(questionContent){
    this.component.update()
    expect(this.component.find(".question-content").text())
      .toContain(questionContent)
  }

  respondsWith(responseInput) {
    this.component.update()
    this.component.find(".user-response-input")
      .simulate('change', {target: {value: responseInput}})
    this.component.find(".check-button").simulate('click')
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

  seesMultipleAnswerChoices() {
    this.component.update()
    const currentQuestion = this.component.find(".answer-option");
    expect(currentQuestion.children().length).toBeGreaterThanOrEqual(3);
    expect(currentQuestion.first().text()).toContain(currentQuestion.answer)
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
}
