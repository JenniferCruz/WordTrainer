import React, {Component} from 'react';
import {connect} from "react-redux";
import Question from './Question'
import {noQuestionsInQuiz} from "../testUtils/strings";

class Quiz extends Component{
  componentDidMount() {
    this.props.dispatch({type:"startQuiz"});
  }
  handleSubmit(userResponse) {
    this.props.dispatch({type:"respond", userResponse});
    this.props.dispatch({type:"nextQuestion"});
  }

  render() {
    const {remainingQuestions, totalQuestions} = this.props;

    if (totalQuestions === 0)
      return <div>
        <h2 className="empty-test-message">{noQuestionsInQuiz}</h2>
      </div>

    return <div>
      { remainingQuestions > 0
          ? <Question {...this.props} onUserResponse={this.handleSubmit.bind(this)} />
          : <h2 className="test-results-content">Finished! {this.props.result}%</h2>
      }
    </div>
  }
}

function mapStateToProps (state) {
  return state.quiz || {};
}

export default connect(mapStateToProps)(Quiz);