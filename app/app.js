import React, { Component } from 'react';
import { createStore, applyMiddleware, compose  } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import Storage from 'react-native-storage';

// import {allReducers} from './data/reducers/allReducers';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  AsyncStorage 
} from 'react-native'

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// const store = createStoreWithMiddleware(allReducers);

import Root from './root.js'
// import Root from './Root2.js'

var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,
    
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24,
    
  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
    
  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是在任何时候，直接对storage.sync进行赋值修改
  // 或是写到另一个文件里，这里require引入
  // sync: require('你可以另外写一个文件专门处理sync')  
  	
})  
  
// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用
// 对于react native
global.storage = storage;

storage.save({
  key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
  data: { 
    from: 'some other site',
    userid: 'some userid',
    token: 'some token'
  },
  
  // 如果不指定过期时间，则会使用defaultExpires参数
  // 如果设为null，则永不过期
  expires: 1000 * 60
});

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