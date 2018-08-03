import Quiz from "./Quiz";
import React from "react";
import {takeTestReducer} from "../reducer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import type {UserJourney} from "../testUtils/UserJourney.type";
import {allCorrectAnswers, someCorrectAnswers} from "../testUtils/testCases";

Enzyme.configure({ adapter: new Adapter() });

class UIQuizTest implements UserJourney {
  initialize(questions) {
    this.store = createStore(takeTestReducer, {questions})
    this.questions = questions
    this.component = mount(
      <Provider store={this.store}>
        <Quiz />
      </Provider>
    )
  }

  seesQuestion(questionContent){

    expect(this.component.find(".question-content").text())
      .toContain(questionContent)
  }

  respondsWith(responseInput) {
    this.component.find(".user-response-input")
      .simulate('change', {target: {value: responseInput}})
    this.component.find(".check-button").simulate('click')
  }

  seesAndResponds(questionContent, responseInput) {
    this.seesQuestion(questionContent)
    this.respondsWith(responseInput)
  }

  seesRemainingQuestions(remaining) {
    expect(this.component.find(".questions-count").text())
      .toContain(`${remaining}/${this.questions.length}`)
  }

  seesResults(result) {
    console.error("Failing here!")
    expect(this.component.find(".test-results-content").text())
      .toContain(result + "%")
  }
}

it('UI Quiz: Play with a set of words in input mode and see results', () => {
  allCorrectAnswers(new UIQuizTest())
  someCorrectAnswers(new UIQuizTest())
})



