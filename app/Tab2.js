import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator, DrawerNavigator } from 'react-navigation';
import { BookShelfScreen, DiscoveryScreen, CommunityScreen, MineScreen, SearchScreen, LoginScreen } from './pages/index.js'
import Icon from 'react-native-vector-icons/Ionicons';

const BookShelfNav = StackNavigator({
    BookShelf: { screen: BookShelfScreen },
    Search: { screen: SearchScreen }
},{
    navigationOptions: ({navigation}) => ({
        title: "书架",
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
            onPress={() => { navigation.navigate('Search') }}/>
        ),
        drawerLabel: 'BookShelf',
        tabBarIcon: ({focused,tintColor}) => (
            <Icon name={'ios-book-outline'} size={25} color={focused ? '#DD2219' : '#333'}/>
        )
    })
})

const DiscoveryNav = StackNavigator({
    Discovery: {screen: DiscoveryScreen}
},{
    navigationOptions: ({navigation}) => ({
        title: "发现",
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
        //   headerRight: (
        //     <Icon
        //       name={'ios-search-outline'}
        //       style={{color: '#fff', marginRight: 20}}
        //       size={25}
        //       onPress={() => { navigation.navigate('Search') }}
        //       />
        //   ),
        drawerLabel: 'Discovery',
        tabBarIcon: ({focused,tintColor}) => (
            <Icon name={'ios-compass-outline'} size={25} color={focused ? '#DD2219' : '#333'}/>
        )
    })
})

const CommunityNav = StackNavigator({
    Community: {screen: CommunityScreen}
},{
    navigationOptions: ({navigation}) => ({
        title: "社区",
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
        //   headerRight: (
        //     <Icon
        //       name={'ios-search-outline'}
        //       style={{color: '#fff', marginRight: 20}}
        //       size={25}
        //       onPress={() => { navigation.navigate('Search') }}
        //       />
        //   ),
        drawerLabel: 'Community',
        tabBarIcon: ({focused,tintColor}) => (
            <Icon name={'ios-chatboxes-outline'} size={25} color={focused ? '#DD2219' : '#333'}/>
        )
    })
})

const MineNav = StackNavigator({
    Mine: {screen: MineScreen}
},{
    navigationOptions: ({navigation}) => ({
        title: "我的",
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
        // headerRight: (
        //   <Icon
        //     name={'ios-search-outline'}
        //     style={{color: '#fff', marginRight: 20}}
        //     size={25}
        //     onPress={() => { navigation.navigate('Search') }}
        //     />
        // ),
        drawerLabel: 'Mine',
        tabBarIcon: ({focused,tintColor}) => (
            <Icon name={'ios-contact-outline'} size={25} color={focused ? '#DD2219' : '#333'}/>
        )
    })
})

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

const Tab =  TabNavigator({
    BookShelf: {screen: BookShelfNav},
    Discovery: {screen: DiscoveryNav},
    Community: {screen: CommunityNav},
    Mine: {screen: MineNav}
},TabNavigatorConfigs)


export default Tab;