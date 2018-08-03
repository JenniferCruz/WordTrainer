import React, {Component} from "react";

export default class Question extends Component {
  state = {
    userResponse: ""
  }

  handleChange(e) {
    this.setState({"userResponse": e.target.value})
  }

  handleSubmit(e) {
    this.setState({"userResponse": ""});
    this.props.onUserResponse(this.state.userResponse)
  }

  render() {
    const {remainingQuestions, totalQuestions, question} = this.props

    return <form>
      <h3 className="questions-count">Remaining questions: {`${remainingQuestions}/${totalQuestions}`}</h3>
      <strong className="question-content">
        {question.content}
      </strong>
      <input className="user-response-input" value={this.state.userResponse} onChange={this.handleChange.bind(this)}
             type="text"/>
      <input type="button"
             className="check-button"
             value="Check" onClick={this.handleSubmit.bind(this)}/>
    </form>
  }
}