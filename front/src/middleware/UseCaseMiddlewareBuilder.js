function updateUseCaseAction(useCaseName, useCase) {
  return {type: `update${useCaseName}`, [useCaseName.toLowerCase()]: useCase.getView()};
}

export function useCaseMiddlewareBuilder(useCase, useCaseName) {
  return next => action => {
    if (useCase[action.type]) {
      const result = useCase[action.type](action);
      if(result) result.then(() => next(updateUseCaseAction(useCaseName, useCase)))
      else next(updateUseCaseAction(useCaseName, useCase))
    }
    return next(action)
  }
}