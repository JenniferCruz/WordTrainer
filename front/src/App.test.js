import React from 'react';
import ReactDOM from 'react-dom';
import App, {store} from './App';
import {mount} from "enzyme";
import './testUtils/SimulateApp'
import {CSSClass, URLs} from "./testUtils/strings";
import { push } from 'connected-react-router'
import {waitForPendingPromises} from "./testUtils/testUtils";


it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('displays a splash screen with Quiz options', async () => {
  const app = mount(<App/>)
  expect(app.find(`a.${CSSClass.multipleChoiceQuiz}`).length).toBe(1)
  expect(app.find(`a.${CSSClass.inputTextQuiz}`).length).toBe(1)
  app.unmount()
})
//

it('loads Multiple Choice Quiz', async () => {
  const app = mount(<App/>)

  expect(app.find(`a.${CSSClass.multipleChoiceQuiz}`).props().href).toBe(URLs.multipleChoiceQuiz)
  store.dispatch(push(URLs.multipleChoiceQuiz))
  app.update()
  const quiz = app.find('.quiz-multiple')
  expect(quiz.length).toBe(1)
  await waitForPendingPromises()
  app.unmount()
})

// TODO: Test input test is loaded

