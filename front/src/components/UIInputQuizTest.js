import {UIQuiz} from "./UIQuiz";

export class UIInputQuizTest extends UIQuiz {
  respondsWith(responseInput) {
    this.component.update()
    this.component.find(".user-response-input")
      .simulate('change', {target: {value: responseInput}})
    super.next()
  }
}