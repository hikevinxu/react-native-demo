import React, { Component } from 'react';

import {bindActionCreators} from 'redux';
import Counter from '../components/counter.js';
import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux';

class CounterApp extends Component {

  constructor(props) {
    super(props);
  }
  

  render() {
    const { state, actions } = this.props;
    return (
      <Counter 
      counter = {state.count}
      {...actions} />
    );
  }
}

/* export default connect (state => ({
  state: state.counter
}),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(CounterApp) */
export default connect ((state, myProps) => {
  return {
    state: state.counter,
  }
},
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(CounterApp)
