import Quiz from "./Quiz";
import React from "react";
import {takeTestReducer} from "../reducer";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import type {UserJourney} from "../testUtils/UserJourney.type";
import {allCorrectAnswers, someCorrectAnswers} from "../testUtils/testCases";
import {takeQuizMiddleware, takeQuizUseCase} from "../middleware/TakeQuizMiddleware";

Enzyme.configure({ adapter: new Adapter() });

class UIQuizTest implements UserJourney {
  initialize(questions) {
    this.store = createStore(takeTestReducer, applyMiddleware(takeQuizMiddleware))
    this.questions = questions

    takeQuizUseCase.loadQuestions = () => new Promise(resolve => setTimeout(() => resolve(questions), 0));
    this.takeQuizUseCase = takeQuizUseCase;
    this.component = mount(
      <Provider store={this.store}>
        <Quiz />
      </Provider>
    )
  }

  seesQuestion(questionContent){
    //Looks like Enzyme has problems with rendering when there are async updates
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

  seesResults(result) {
    this.component.update()
    expect(this.component.find(".test-results-content").text())
      .toContain(result + "%")
  }
}

it('UI Quiz: Play with a set of words in input mode and see results', async () => {
  await allCorrectAnswers(new UIQuizTest())
  await someCorrectAnswers(new UIQuizTest())
})



