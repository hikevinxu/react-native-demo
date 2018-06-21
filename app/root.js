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

import { BookShelfScreen, LoginScreen, DiscoveryScreen, CommunityScreen, MineScreen, SearchScreen, LeaderboardScreen, BookListScreen, BookDetailScreen, BookContentScreen } from './pages/index.js'
import TabNavPageScreen from './tabNavigator.js'


const RootStack = StackNavigator(
    {
      TabNavPage: {
        screen: TabNavPageScreen,
      },
      Login: {
        screen: LoginScreen,
      },
      Search: {
        screen: SearchScreen,
      },
      Leaderboard: {
        screen: LeaderboardScreen,
      },
      BookList: {
        screen: BookListScreen,
      },
      BookDetail: {
        screen: BookDetailScreen,
      },
      BookContent: {
        screen: BookContentScreen,
      },
    },
    {
      initialRouteName: 'TabNavPage',
      navigationOptions: ({navigation}) => ({
        title: '追书神器',
        headerStyle: {
          height: 40,
          backgroundColor: '#DD2219',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '400',
          color: '#fff',
          fontSize: 16
        },
        headerRight: (
          <Icon
            name={'ios-search-outline'}
            style={{color: '#fff', marginRight: 20}}
            size={25}
            onPress={() => { navigation.navigate('Search') }} />
        ),
      })
      // navigationOptions: {
      //   title: '追书神器',
      //   headerStyle: {
      //     height: 40,
      //     backgroundColor: '#DD2219',
      //   },
      //   headerTintColor: '#fff',
      //   headerTitleStyle: {
      //     fontWeight: '400',
      //     color: '#fff',
      //     fontSize: 16
      //   },
      //   headerRight: <CommonHeaderRight />,
      //},
    }
  );

export default class Root extends Component {
  render() {
    return <RootStack />
  }
}


const styles = StyleSheet.create({

});
