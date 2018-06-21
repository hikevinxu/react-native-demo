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
  Button,
  ScrollView,
  FlatList,
  DeviceEventEmitter
} from 'react-native';
import {
  StackNavigator,
  withNavigation
} from 'react-navigation';
import { BookList } from '../components/index.js'
import Icon from 'react-native-vector-icons/FontAwesome';

class BookShelfScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookShelfs: []
    }
    this.getBookShelfList = this.getBookShelfList.bind(this);
  }

  componentDidMount(){
    this.getBookShelfList();
    this.deEmitter = DeviceEventEmitter.addListener('addBookShelf', (a) => {
        this.getBookShelfList();
    });
  }

  getBookShelfList(){
    // 获取某个key下的所有数据(仅key-id数据)
    storage.getAllDataForKey('bookShelf').then(users => {
        this.setState({
            bookShelfs: users
        })
    });
  }

    _extraUniqueKey(item,index){
        return 'book' + index
    }

    renderBookList(item){
        return (
            <BookList key={item._id} bookItem={item} clickBookItem={(itemData) => this.clickBookItem(itemData)} />
        )
    }

    clickBookItem(itemData){
        // alert(itemData);
        this.props.navigation.navigate('BookDetail',{
            book_id: itemData._id
        });
    }

    componentWillUnmount() {
        this.deEmitter.remove();
    }

  render() {
    return (
      <ScrollView style={styles.viewStyle}>
        <FlatList
            data={this.state.bookShelfs}
            keyExtractor = {this._extraUniqueKey}
            renderItem={({item}) => this.renderBookList(item)} />
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

export default withNavigation(BookShelfScreen)