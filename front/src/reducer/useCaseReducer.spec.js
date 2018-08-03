import {createStore} from "redux";
import buildUseCaseReducer from "./useCaseReducer";

it('The UseCaseReducer calls the methods of the use case passing the action as parameter', () => {
  function buildCounterUseCase() {
    return {
      counter: 0,
      increment: function() {
        this.counter++;
      }
    }
  }

  const store = createStore(buildUseCaseReducer(buildCounterUseCase));
  expect(store.getState().counter).toBe(0);
  store.dispatch({type: "increment"});
  expect(store.getState().counter).toBe(1);
  store.dispatch({type: "increment"});
  expect(store.getState().counter).toBe(2);

});
