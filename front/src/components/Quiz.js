import React, {Component} from 'react';
import {connect} from "react-redux";
import Question from './Question'

class Quiz extends Component{
  componentDidMount() {
    this.props.dispatch({type:"startQuiz"});
  }
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
  return state.quiz;
}

export default connect(mapStateToProps)(Quiz);