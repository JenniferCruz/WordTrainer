import {applyMiddleware, createStore} from "redux";
import {useCaseMiddlewareBuilder} from './UseCaseMiddlewareBuilder'
import {waitForPendingPromises} from "../testUtils/testUtils";


const reducer = function(state = {counter: 0}, action) {
  if(action.type === 'updateCounter')
    return {...state, counter: action.counter};
  return state;
}

it('integrates use case with redux action and updates state', ()=> {

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

  const store = createStore(reducer, applyMiddleware(() => useCaseMiddlewareBuilder(useCase, 'Counter')));
  expect(store.getState().counter).toBe(0);
  store.dispatch({type: "increment"});
  expect(wasCalled).toBe(true);
  expect(store.getState().counter).toBe(1);
});

it('tests useCaseMiddleware with an async useCase', async ()=> {
  const useCase = {
    asyncCounter: 0,
    asyncIncrement: function () {
      return Promise.resolve().then(()=>{
        this.asyncCounter++;
      })
    },
    getView: function () {
      return this.asyncCounter;
    }
  }

  const store = createStore(reducer, applyMiddleware(() => useCaseMiddlewareBuilder(useCase, 'Counter')));
  store.dispatch({type: "asyncIncrement"});
  await waitForPendingPromises();
  expect(store.getState().counter).toBe(1);
});

