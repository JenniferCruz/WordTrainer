import React, {Component} from 'react';
import {connect} from "react-redux";
import Question from './Question'
import {CSSClass, noQuestionsInQuiz} from "../testUtils/strings";

class Quiz extends Component{
  componentDidMount() {
    this.props.dispatch({type:"startQuiz", quizType: this.props.type});
  }
  handleSubmit(userResponse) {
    this.props.dispatch({type:"respond", userResponse});
    this.props.dispatch({type:"nextQuestion"});
  }

  render() {
    const { totalQuestions, isFinished } = this.props;

    if (!totalQuestions)
      return <div className='quiz-multiple'>
        <h2 className="empty-test-message">{noQuestionsInQuiz}</h2>
      </div>

    return <div  className='quiz-multiple'>
      { isFinished
          ? <h2 className="test-results-content">Finished! {this.props.result}%</h2>
          : <Question {...this.props} onUserResponse={this.handleSubmit.bind(this)} />
      }
    </div>
  }
}


function mapStateToProps (state) {
  return state.quiz || {};
}

export default connect(mapStateToProps)(Quiz);