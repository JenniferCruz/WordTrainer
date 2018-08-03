import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {compose, createStore} from "redux";
import {takeTestReducer} from "./reducer";
import {Provider} from "react-redux";
import Quiz from "./components/Quiz";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(takeTestReducer, composeEnhancers());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div className="App-intro">
            <Quiz />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
