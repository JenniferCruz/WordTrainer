import React from "react";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import Enzyme, { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {takeTestReducer} from "../reducer";
import type {UserJourney} from "../testUtils/UserJourney.type";
import {noQuestionsInQuiz} from "../testUtils/strings";
import {takeQuizMiddleware, takeQuizUseCase} from "../middleware/TakeQuizMiddleware";
import Quiz from './Quiz'

export class UIQuiz implements UserJourney {

  initialize(questions) {
    this.store = createStore(takeTestReducer, applyMiddleware(takeQuizMiddleware))
    this.questions = questions

    takeQuizUseCase.loadQuestions = () => new Promise(resolve => setTimeout(() => resolve(questions), 0));
    Enzyme.configure({ adapter: new Adapter() });
    this.component = mount(
      <Provider store={this.store}>
        <Quiz/>
      </Provider>
    )
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
}