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

export default class BookCoverList extends Component {
  constructor(props) {
      super(props);
      this.state = {

      }
  }

  render() {
    const bookItem = this.props.bookItem;
    console.log(bookItem);
    return (
      <TouchableOpacity
      key={bookItem.bookId ? bookItem.bookId : null}
      style={styles.bookCoverStyle}
      >
        <View style={styles.coverView}>
            <Image 
                style={{width: '100%',height: '100%'}}
                source={bookItem.bookCover ? {uri: bookItem.bookCover} : require('../../common/images/2.jpg')}/>
        </View>
        <View style={styles.bookNameView}>
            <Text style={{textAlign: 'center'}}>{bookItem.bookName ? bookItem.bookName : '校花的贴身高手'}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    bookCoverStyle: {
      width: '26%'
    },
    coverView: {
        width: '100%',
        height: 140,
    },
    bookNameView: {
        marginTop: 10
    }
});
