/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Dimensions,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export default class SearchInput extends Component {
    constructor(props) {
      super(props);
      this.state = { text: null };
      this.searchAutoComplete = this.searchAutoComplete.bind(this);
      this.submit = this.submit.bind(this);
    }

    searchAutoComplete(text) {
      console.log(text);
    }

    submit(event){
      console.log(event.nativeEvent.text);
      if(this.props.submit){
        this.props.submit(event.nativeEvent.text);
      }
    }
  
    render() {
      return (
        <View style={styles.container}>
            <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            underlineColorAndroid='transparent'
            placeholder='请输入您要搜索的内容' 
            onChangeText={(text) => this.searchAutoComplete(text)}
            onSubmitEditing={(event) => this.submit(event)}
            />
            <Icon 
            name={'ios-search-outline'}
            style={styles.inputIcon}
            size={25} 
            />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginRight: 20,
    // backgroundColor: 'green',
  },
  textInput: {
    width: '100%',
    height: 30,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    color: '#000',
    borderRadius: 5,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 28,
    paddingRight: 5,
    position: 'relative'
  },
  inputIcon: {
    color: '#000',
    position: 'absolute',
    top: 3,
    left: 5
  }
});
