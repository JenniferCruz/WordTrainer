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
    this.questions = questions.map(q => ({...q, options: [q.answer, "wrong option"]}))
    takeQuizUseCase.loadQuestions = () => new Promise(resolve => setTimeout(() => resolve(this.questions), 0));
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

    const currentOptions = this.component.find(".user-response-option");
    let selectThis = currentOptions.getElements().findIndex(opt => (opt.props.value === responseInput))

    currentOptions.at(selectThis).simulate('change')
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

  seesMultipleAnswerChoices(question) {
    this.component.update()
    const currentOptions = this.component.find(".user-response-option").getElements();
    expect(currentOptions.length).toBeGreaterThanOrEqual(2);

    const containsRightAnswer = currentOptions.findIndex(opt => (opt.props.value === question.answer)) >= 0
    expect(containsRightAnswer).toBe(true)
  }

  seesResults(result) {
    this.component.update()
    expect(this.component.find(".test-results-content").text())
      .toContain(result + "%")
  }
}
