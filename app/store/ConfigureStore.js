/*
 * description: store
 * author: xuzhenhua
 * time: 2017年03月18日14:31:13
 */

 import { createStore, applyMiddleware } from 'redux';
 import thunkMiddleware from 'redux-thunk';
 import rootReducer from '../reducers/indexReducers';

 const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

 export default function configureStore(initialState) {
   const store = createStoreWithMiddleware(rootReducer, initialState)
   return store;
 }
