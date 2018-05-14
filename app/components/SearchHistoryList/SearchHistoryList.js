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
import Icon from 'react-native-vector-icons/Ionicons';



export default class SearchHistoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.clickSearchList = this.clickSearchList.bind(this);
    }

    clickSearchList(rowData){
        if(this.props.clickThisList){
            this.props.clickThisList(rowData);
        }
    }

  render() {
      const rowData = this.props.searchName;
    return (
      <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => this.clickSearchList(rowData)}
      style={{
        marginLeft: 20,
        marginRight: 14,
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
      }}>
        <Icon 
        name='ios-clock-outline'
        color={'#333'}
        size={17}
        style={{marginTop: 1}} />
        <Text
        style={{
        marginLeft: 7,
        fontSize: 13
        }}>{rowData}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  
});
