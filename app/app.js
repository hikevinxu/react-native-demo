import React, { Component } from 'react';
import { createStore, applyMiddleware, compose  } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

// import {allReducers} from './data/reducers/allReducers';

import {
  View,
  StatusBar,
  SafeAreaView 
} from 'react-native'

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// const store = createStoreWithMiddleware(allReducers);

import {
  Text,
  StyleSheet,
} from 'react-native'

import Root from './root.js'
// import Root from './Root2.js'

export default class Home extends Component {
  render() {
    return (
      <Provider store>
        <View style={{flex:1}}>
            <StatusBar
                backgroundColor="#DD2219"
                barStyle="light-content"
            />
            <Root/>
        </View>
      </Provider>
    )
  }
}

const style = StyleSheet.create({

})