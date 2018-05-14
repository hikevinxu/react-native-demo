import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { TabBarBottom, TabNavigator } from 'react-navigation';
import { BookShelfScreen, DiscoveryScreen, CommunityScreen, MineScreen, SearchScreen } from './pages/index.js'
import Icon from 'react-native-vector-icons/Ionicons';


const TabRouteConfigs = {
    BookShelf: {
        screen: BookShelfScreen,
        navigationOptions: ({navigation}) => ({
            title: "书架",
            drawerLabel: 'BookShelf',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon name={'ios-book-outline'} size={25} color={focused ? '#DD2219' : '#333'}/>
            )
        })
    },
    Discovery: {
        screen: DiscoveryScreen,
        navigationOptions: ({navigation}) => ({
            title: '发现',
            drawerLabel: 'Discovery',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon name={'ios-compass-outline'} size={25} color={focused ? '#DD2219' : '#333'}/>
            )
        })
    },
    Community: {
        screen: CommunityScreen,
        navigationOptions: ({navigation}) => ({
            title: '社区',
            drawerLabel: 'Community',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon name={'ios-chatboxes-outline'} size={25} color={focused ? '#DD2219' : '#333'}/> 
            )
        })
    },
    Mine: {
        screen: MineScreen,
        navigationOptions: ({navigation}) => ({
            title: '我的',
            drawerLabel: 'Mine',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon name={'ios-contact-outline'} size={25} color={focused ? '#DD2219' : '#333'}/>
            )
        })
    }
}

const TabNavigatorConfigs = {
    initialRouteName: 'BookShelf',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: '#DD2219',
        activeBackgroundColor: '#fff',
        inactiveTintColor: '#333',
        inactiveBackgroundColor: '#fff',
        showIcon: true,
        showLabel: true
    }
}

const Tab = TabNavigator(TabRouteConfigs,TabNavigatorConfigs);


export default Tab;