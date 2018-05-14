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
  Button
} from 'react-native';
import {
  StackNavigator,
  withNavigation
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

class BookShelfScreen extends Component {
  constructor(props) {
    super(props)
  }
  
  // t = () => {
  //   console.log(this.props)
  //   this.props.navigation.navigate("Search")
  // }

  render() {
    return (
      <View>
        <Text>home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default withNavigation(BookShelfScreen)

