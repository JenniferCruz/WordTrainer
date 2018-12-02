
//TODO: Need unit test for the reducers, and then we need to refactor it
import {combineReducers} from "redux";

function quizReducer(quiz = {}, action) {

  switch(action.type) {
    case 'startQuiz': return {
          correctCount: 0,
          totalQuestions: action.questions.length,
          currentQuestionIndex: 0,
          currentQuestion: action.questions.length > 0 ? {content: action.questions[0].concept} : {},
          remainingQuestions: action.questions.length,
          questions: action.questions,
          isFinished: false,
          questionOptions: action.questions.length > 0 ? action.questions[0].options : []
      };

    case 'respond':
      let {currentQuestionIndex, questions, correctCount, totalQuestions, remainingQuestions} = quiz;
      let nextCorrectCount = correctCount + (questions[currentQuestionIndex].answer === action.userResponse ? 1 : 0);
      let isFinished =  currentQuestionIndex === totalQuestions - 1;
      let nextRemainingQuestions = remainingQuestions - 1;
      let nextCurrentQuestionIndex = quiz.currentQuestionIndex + 1;
      let nextCurrentQuestion = isFinished ? {} : {content: questions[nextCurrentQuestionIndex].concept};

      return {
          ...quiz,
          correctCount: nextCorrectCount,
          currentQuestionIndex: nextCurrentQuestionIndex,
          currentQuestion: nextCurrentQuestion,
          remainingQuestions: nextRemainingQuestions,
          isFinished,
          result: Math.ceil(100 * (nextCorrectCount / totalQuestions))
      }


  }
  return quiz;
}

export default combineReducers({quiz: quizReducer})