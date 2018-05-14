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
  TouchableOpacity
} from 'react-native';
import { BASE_WIN_HEIGHT, BASE_WIN_WIDTH, CURRENT_WIN_WIDTH, CURRENT_WIN_HEIGHT } from '../../config/global.js'
import Icon from 'react-native-vector-icons/Ionicons';

export default class CategoryList extends Component {
  constructor(props){
    super(props);
    this.clickList = this.clickList.bind(this);
  }

  clickList(name){
    if(this.props.clickItem){
      this.props.clickItem(name);
    }
  }

  render() {
    const itemData = this.props.itemData;
    return (
      <TouchableOpacity
      key={itemData.id}
      onPress={() => this.clickList(itemData.name)}
      style={{
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
      }}>
        <Icon 
          name={itemData.iconName}
          style={{color: '#DD2219', marginRight: 20}}
          size={25}
          />
        <Text style={{flex: 1,fontSize: 16,color: '#333'}}>{itemData.listName}</Text>
        <Icon 
          name={'ios-arrow-forward-outline'}
          style={{color: '#666', marginRight: 20}}
          size={25} 
          />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  
});
