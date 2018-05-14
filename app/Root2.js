/**
 * Sample React Native App
 * 入口文件
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { BookShelfScreen, LoginScreen, DiscoveryScreen, CommunityScreen, MineScreen, SearchScreen } from './pages/index.js'
import TabNavPageScreen from './Tab2.js'


const RootStack = StackNavigator(
    {
      TabNavPage: {
        screen: TabNavPageScreen,
      },
      Login: {
        screen: LoginScreen,
      },
    },
    {
      initialRouteName: 'TabNavPage',
      navigationOptions: ({navigation}) => ({
        title: '追书神器',
        headerStyle: {
          height: 0,
        },
      })
    }
  );

export default class Root extends Component {
  render() {
    return <RootStack />
  }
}


const styles = StyleSheet.create({
 
});
