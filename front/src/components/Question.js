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
    const {remainingQuestions, totalQuestions, currentQuestion} = this.props
    return <form>
        <h3 className="questions-count">Remaining questions: {`${remainingQuestions}/${totalQuestions}`}</h3>
        <strong className="question-content">
          {currentQuestion.content}
        </strong>
        <br/>
        {
          currentQuestion.options
          ? <div>
              {currentQuestion.options.map(option =>
                (<label key={option}><input type="radio" value={option} name="response-option"
                               className="user-response-option" checked={this.state.userResponse === option}
                               onChange={this.handleChange.bind(this)}/>{option}<br/></label>))}
            </div>
          : <input className="user-response-input" value={this.state.userResponse}
                   onChange={this.handleChange.bind(this)} type="text"/>
        }
        <input type="button"
             className="check-button"
             value="Check" onClick={this.handleSubmit.bind(this)}/>
      </form>
  }
}