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
  ScrollView
} from 'react-native';

export default class CommunityScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.viewStyle}>
        <Text>community</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff"
  }
});
