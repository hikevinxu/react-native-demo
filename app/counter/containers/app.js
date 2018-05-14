import React, { Component } from 'react';

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as reduces from '../reducers'
import Counter from './counterApp'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reduces)
const store = createStoreWithMiddleware(reducer)

class App extends Component {
  render() {
    return (
        <Provider store = { store }>
          <Counter />
        </Provider>
    );
  }
}

export default App;
