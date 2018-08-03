import React, {Component} from 'react';
import {connect} from "react-redux";
import Question from './Question'
import TakeQuiz from "../domain/TakeQuiz";

class Quiz extends Component{
  handleSubmit(userResponse) {
    this.props.dispatch({type:"respond", userResponse});
    this.props.dispatch({type:"nextQuestion"});
  }

  render() {
    const {remainingQuestions} = this.props;

    return <div>
      {remainingQuestions > 0 ?
        <Question {...this.props} onUserResponse={this.handleSubmit.bind(this)} />
        : <h2 className="test-results-content">Finished! {this.props.result}%</h2>}
    </div>
  }
}

function mapStateToProps (state) {
  //TODO: Object creation is ugly
  let quiz = Object.assign(TakeQuiz(state), state)
  return {
    question: quiz.getCurrentQuestion(),
    remainingQuestions: quiz.getRemainingQuestions(),
    totalQuestions: state.questions.length,
    result: quiz.getResult()
  }
}

export default connect(mapStateToProps)(Quiz);