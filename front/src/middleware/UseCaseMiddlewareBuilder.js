export function useCaseMiddlewareBuilder(useCase, useCaseName) {
  return next => async action => {
    if (useCase[action.type]) {
      useCase[action.type](action);
      return next({type: `update${useCaseName}`, [useCaseName.toLowerCase()]: useCase.getView()});
    }
    return next(action)
  }
}