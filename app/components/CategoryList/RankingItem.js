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
  TouchableOpacity,
  Image
} from 'react-native';
import { BASE_WIN_HEIGHT, BASE_WIN_WIDTH, CURRENT_WIN_WIDTH, CURRENT_WIN_HEIGHT, IMG_BASE_URL } from '../../config/global.js'
import Icon from 'react-native-vector-icons/Ionicons';

export default class RankingItem extends Component {
  constructor(props){
    super(props);
    this.clickList = this.clickList.bind(this);
  }

  clickList(itemData){
    if(this.props.clickItem){
      this.props.clickItem(itemData);
    }
  }

  render() {
    const itemData = this.props.itemData;
    return (
      <TouchableOpacity
      onPress={() => this.clickList(itemData)}
      key={itemData._id}
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
        <View style={{width: 30,height: 30,marginRight: 20}}>
            <Image 
            source={{uri: IMG_BASE_URL + itemData.cover}}
            style={{width: '100%',height: '100%'}}
            />
        </View>
        <Text style={{flex: 1,fontSize: 16,color: '#333',marginTop: 3}}>{itemData.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  
});
