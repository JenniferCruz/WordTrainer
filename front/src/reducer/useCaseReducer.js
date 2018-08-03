export default function buildUseCaseReducer(aUseCase, initialState = {}) {
  return (state = initialState, action) => {

    //TODO: Object creation is ugly
    let useCase = Object.assign(aUseCase(state), state);

    if (useCase[action.type])
      useCase[action.type](action);

    //TODO: Returning an object with methods
    return useCase;
  }
}