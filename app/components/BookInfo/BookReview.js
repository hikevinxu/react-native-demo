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
  FlatList,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import BookReviewList from './BookReviewList.js'

export default class BookReview extends Component {
    constructor(props){
        super(props);
        this.state ={
        }
        this.renderReviewList = this.renderReviewList.bind(this);
        this.lookMore = this.lookMore.bind(this);
        this.clickReviewItem = this.clickReviewItem.bind(this);
    }

    _extraUniqueKey(item,index){
        return 'Review' + index
    }

    _separator = () => {
        return <View style={{height:1,backgroundColor:'#ccc'}}/>;
    }

    clickReviewItem(rowData){
        Alert.alert('msg',rowData._id);
    }

    renderReviewList(item){
        return <BookReviewList ReviewItemData={item} clickReviewItem={(rowData) => this.clickReviewItem(rowData)} />
    }

    lookMore(){
        Alert.alert('msg',"123");
    }

  render() {
    const bookHotReviewData = this.props.bookHotReviewData;
    console.log(bookHotReviewData);
    return (
      <View>
          {
            bookHotReviewData ? 
            <View style={{backgroundColor: '#fff',padding: 10}}>
                <View style={styles.hotReview}>
                    <Text style={{marginLeft: 10}}>热门书评</Text>
                    <Text style={{marginRight: 10}} onPress={this.lookMore}>更多</Text>
                </View>
                <View style={styles.hotReviewList}>
                    <FlatList
                    data={bookHotReviewData}
                    keyExtractor = {this._extraUniqueKey}
                    ItemSeparatorComponent={this._separator}
                    renderItem={({item}) => this.renderReviewList(item)} />
                </View>
            </View>
            :
            null
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    hotReview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    hotReviewList: {
        width: '100%',
        padding: 5
    }
});
