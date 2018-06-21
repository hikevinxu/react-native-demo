/*
 * description: all of reducer to combine
 * author: xuzhenhau
 * time: 2017年03月18日14:28:04
 */

'use strict'

import {combineReducers} from 'redux'
import search from './searchReducers.js'

const rootReducer = combineReducers({
  search
})

export default rootReducer
