export let takeTestReducer = (state = {}, action) => {

  if(action.type === 'updateQuiz')
    return {quiz: action.quiz}

  return state;
}