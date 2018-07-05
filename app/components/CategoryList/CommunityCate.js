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
  Image,
  TouchableOpacity
} from 'react-native';
import { BASE_WIN_HEIGHT, BASE_WIN_WIDTH, CURRENT_WIN_WIDTH, CURRENT_WIN_HEIGHT } from '../../config/global.js'
import Icon from 'react-native-vector-icons/Ionicons';

export default class CommunityCate extends Component {
  constructor(props){
    super(props);
    this.clickList = this.clickList.bind(this);
  }

  clickList(id){
    if(this.props.clickItem){
      this.props.clickItem(id);
    }
  }

  render() {
    const itemData = this.props.itemData;
    return (
      <TouchableOpacity
      key={itemData.id}
      onPress={() => this.clickList(itemData.id)}
      style={{
        marginTop: itemData.marginTop ? itemData.marginTop : 0,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f6f6f6',
        backgroundColor: '#fff'
      }}>
        <Image style={{width: 20,height: 20}} source={itemData.catePic ? {uri: itemData.catePic} : require('../../common/images/2.jpg')} />
        <Text style={{flex: 1,lineHeight: 20,marginLeft: 12,fontSize: 17,color: '#666'}}>{itemData.cateName}</Text>
        <Icon 
          name={'ios-arrow-forward-outline'}
          style={{color: '#666', marginRight: 12}}
          size={20} 
          />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  
});
