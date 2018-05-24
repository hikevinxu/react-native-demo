/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import {
  StackNavigator,
  withNavigation
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

class BookShelfScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveBookIds: []
    }

  }

  componentDidMount(){
    // 获取某个key下的所有id(仅key-id数据)
    storage.getIdsForKey('aaaa').then(ids => {
      this.setState({
        saveBookIds: ids
      },function(){
        
      })
    });
  }

  render() {
    return (
      <View>
        <Text>{this.state.saveBookIds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default withNavigation(BookShelfScreen)

