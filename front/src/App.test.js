import React from 'react';
import ReactDOM from 'react-dom';
import App, {store} from './App';
import Quiz from './components/Quiz'
import {mount} from "enzyme";
import './testUtils/SimulateApp'
import {CSSClass, URLs} from "./testUtils/strings";
import {waitForPendingPromises} from "./testUtils/testUtils";
import { push } from 'connected-react-router'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('displays a splash screen with Quiz options', () => {
  const app = mount(<App/>)
  expect(app.find(`a.${CSSClass.multipleChoiceQuiz}`).length).toBe(1)
  expect(app.find(`a.${CSSClass.inputTextQuiz}`).length).toBe(1)
})

describe("Spash Screen", () => {

  it('loads Multiple Choice Quiz', async () => {
    const app = mount(<App/>)

    expect(app.find(`a.${CSSClass.multipleChoiceQuiz}`).props().href).toBe(URLs.multipleChoiceQuiz)
    store.dispatch(push(URLs.multipleChoiceQuiz))
    app.update()
    const quiz = app.find('.quiz-multiple')
    expect(quiz.length).toBe(1)
  })


})

// TODO: Test input test is loaded

