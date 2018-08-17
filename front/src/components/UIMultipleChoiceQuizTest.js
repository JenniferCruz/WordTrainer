import {UIQuiz} from "./UIQuiz";

export default class UIMultipleChoiceQuizTest extends UIQuiz {

  initialize(questions) {
    super.initialize(questions, "multiple")
  }

  respondsWith(responseInput) {
    this.component.update()

    const currentOptions = this.component.find(".user-response-option");
    let selectThis = currentOptions.getElements().findIndex(opt => (opt.props.value === responseInput))

    currentOptions.at(selectThis).simulate('change')
    this.component.find(".check-button").simulate('click')
    super.next()
  }

  seesMultipleAnswerChoices(question) {
    this.component.update()
    const currentOptions = this.component.find(".user-response-option").getElements();
    expect(currentOptions.length).toBeGreaterThanOrEqual(2);

    const containsRightAnswer = currentOptions.findIndex(opt => (opt.props.value === question.answer)) >= 0
    expect(containsRightAnswer).toBe(true)
  }
}
