import {UIQuiz} from "./UIQuiz";

export class UIInputQuizTest extends UIQuiz {
  respondsWith(responseInput) {
    this.component.update()
    this.component.find(".user-response-input")
      .simulate('change', {target: {value: responseInput}})
    this.component.find(".check-button").simulate('click')
  }
}