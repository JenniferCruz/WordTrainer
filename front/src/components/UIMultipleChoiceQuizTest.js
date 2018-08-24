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

  seesMultipleAnswerChoices() {
    this.component.update()
    const options = this.component.find(".user-response-option").getElements().map(opt => opt.props.value);
    expect(options.length).toBeGreaterThanOrEqual( 2 );
  }

  seesRightAnswerAsChoice( rightAnswer ) {
    this.component.update()
    const options = this.component.find(".user-response-option").getElements();
    const containsRightAnswer = options.findIndex(opt => (opt.props.value === rightAnswer)) >= 0
    expect(containsRightAnswer).toBe(true)
  }
}
