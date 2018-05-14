/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import common from '../../config/common.js'

export default class TagsGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
    this.renderTagsGroup = this.renderTagsGroup.bind(this);
    this.clickTag = this.clickTag.bind(this);
  }

  clickTag(tag){
    if(this.props.checkTag){
      this.props.checkTag(tag);
    }
  }

  renderTagsGroup(array) {
    var texts = [];
    if(array) {
      for(let i=0;i<array.length;i++){
        const boxColorIndex = i % 7;
        var element = array[i];
        texts.push(
          <TouchableOpacity
          activeOpacity={0.5}
          key={i} 
          style={{
            width: 'auto',
            alignSelf: 'center',
            margin: 5,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 2,
            paddingBottom: 2,
            backgroundColor: common.css.boxColor[boxColorIndex]}}
            onPress={this.clickTag.bind(this,element)}>
            <Text style={{color: '#fff',}}>{element}</Text>
          </TouchableOpacity>
        )
      }
    }
    return texts
  }

  render() {
    return (
      <View
      style={{
          marginLeft: 14,
          marginRight: 14,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start'
        }}>
        {this.renderTagsGroup(this.props.tags).map((item,i) => {
          return item
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagsBox: {
  
  }
});
