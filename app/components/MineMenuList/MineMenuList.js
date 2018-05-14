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
import Icon from 'react-native-vector-icons/EvilIcons';


export default class MineMenuList extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.clickMenuItem = this.clickMenuItem.bind(this);
    }

    clickMenuItem(rowData){
        if(this.props.clickMenuItem){
            this.props.clickMenuItem(rowData);
        }
    }

  render() {
    const rowData = this.props.menuItem;
    return (
        <TouchableOpacity
        key={rowData.menuIndex}
        onPress={(item) => this.clickMenuItem(rowData)} style={{width: '100%',height: 60,justifyContent: 'space-between',flexDirection: 'row',alignItems: 'center',borderBottomWidth: 1,borderBottomColor: '#ccc'}}>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <Image
            style={{width: 25,height: 25,}}
            source={rowData.menuImage ? {uri: rowData.menuImage} : require('../../common/images/2.jpg')}/>
            <Text style={{marginLeft: 10,fontFamily: '微软雅黑',fontSize: 14,color: '#222'}}>{rowData.menuTitle}</Text>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <Text style={{fontSize: 12,color: '#aaa'}}>{rowData.menuSubtitle}</Text>
            <Icon name={'chevron-right'} size={30}/>
          </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

});
