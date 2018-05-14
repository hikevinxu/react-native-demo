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
  FlatList
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { CategoryList } from '../components/index.js'


export default class DiscoveryScreen extends Component {
  constructor(props){
    super(props);
    this.state ={
      category: [
        {
          id: 1,
          name: 'a',
          listName: '排行榜',
          iconName: 'md-list-box'
        },
        {
          id: 2,
          name: 'b',
          listName: '主题书单',
          iconName: 'md-clipboard'
        },
        {
          id: 3,
          name: 'c',
          listName: '分类',
          iconName: 'md-filing'
        }
      ]
    }
    this.jumpList = this.jumpList.bind(this);
  }

  _extraUniqueKey(item,index){
    return "bookList" + index;
  }

  renderCategoryList(item){
    return (
      <CategoryList itemData={item} clickItem={(name) => this.jumpList(name)} />
    )
  }

  jumpList(key){
    if(key){
      if(key == 'a'){
        this.props.navigation.navigate('Leaderboard');
      }else if(key == 'b'){
        alert(2)
      }else if(key == 'c'){
        alert(3);
      }
    }
  }

  render() {
    return (
      <View>
        <FlatList
        data={this.state.category}
        keyExtractor = {this._extraUniqueKey}
        renderItem={({item}) => this.renderCategoryList(item)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
