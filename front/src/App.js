import React, {Component} from 'react';
import logo from './logo.svg';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter } from 'connected-react-router'
import './App.css';
import {compose, createStore, applyMiddleware} from "redux";
import  takeTestReducer from "./reducer";
import {Provider} from "react-redux";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz";
import {URLs} from "./testUtils/strings";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory()

export const store = createStore(connectRouter(history)(takeTestReducer), composeEnhancers(),
  compose(applyMiddleware(routerMiddleware(history))))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <Switch>
              <Route exact path="/" render={() => (<Intro/>)} />
              <Route exact path={URLs.multipleChoiceQuiz} render={() => (<Quiz type="multiple"/>)} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
