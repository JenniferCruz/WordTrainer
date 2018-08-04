import {createStore, applyMiddleware} from "redux";
import {useCaseMiddlewareBuilder} from './UseCaseMiddlewareBuilder'

it('integrates use case with redux action and updates state',()=> {

  let wasCalled = false;

  const useCase = {
    counter: 0,
    increment: function () {
      this.counter++;
      wasCalled = true;
    },
    getView: function () {
      return this.counter;
    }
  }

  const reducer = function(state = {counter: 0}, action) {
    if(action.type === 'updateCounter')
      return {...state, counter: action.counter};
    return state;
  }

  const store = createStore(reducer, applyMiddleware(() => useCaseMiddlewareBuilder(useCase, 'Counter')));
  expect(store.getState().counter).toBe(0);
  store.dispatch({type: "increment"});
  expect(wasCalled).toBe(true);
  expect(store.getState().counter).toBe(1);
});
