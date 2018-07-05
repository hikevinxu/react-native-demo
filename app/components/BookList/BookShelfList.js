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
  TouchableHighlight,
  Image
} from 'react-native';
import { IMG_BASE_URL } from '../../config/global.js'



export default class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.clickItem = this.clickItem.bind(this);
    }

    clickItem(rowData){
        // alert(rowData);
        if(this.props.clickBookItem){
          this.props.clickBookItem(rowData);
        }
    }

  render() {
    const rowData = this.props.bookItem;
    return (
      <TouchableHighlight
      key={rowData._id}
      onPress={() => this.clickItem(rowData)}>
        <View style={styles.bookListItem}>
            <View
                style={styles.bookPic}>
                <Image
                style={{width: '100%',height: '100%'}}
                source={rowData.cover ? {uri: IMG_BASE_URL + rowData.cover} : require('../../common/images/2.jpg')}
                />
            </View>
            <View style={{flex:1,marginLeft: 10}}>
                <Text style={styles.bookTitle}>{rowData.title}</Text>
                <Text style={styles.bookAuthor}>{rowData.author} | 更新中</Text>
                <Text numberOfLines={2} style={styles.bookDesc}>{rowData.shortIntro}</Text>
                <Text style={styles.bookDesc}>{rowData.latelyFollower}人在追 | {rowData.retentionRatio ? rowData.retentionRatio : 0}%读者留存</Text>
            </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  bookListItem: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: "#fff"
  },
  bookDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  bookAuthor: {
    fontSize: 12,
    color: '#666',
    marginTop: 3
  },
  bookTitle: {
    fontSize: 16,
    color: '#333'
  },
  bookPic: {
    width: 60,
    height: 80,
    padding: 5,
    marginTop: 5
  }
});
