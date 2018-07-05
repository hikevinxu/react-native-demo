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
  DeviceEventEmitter,
  TouchableOpacity
} from 'react-native';
import {
  StackNavigator,
  withNavigation
} from 'react-navigation';
import { SwipeListView } from 'react-native-swipe-list-view';
import { BookShelfList } from '../components/index.js';
import Icon from 'react-native-vector-icons/FontAwesome';

class BookShelfScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookShelfs: []
    }
    this.getBookShelfList = this.getBookShelfList.bind(this);
    this.closeRow = this.closeRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
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

    closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
    }
    
    deleteRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		const newData = [...this.state.bookShelfs];
		const prevIndex = this.state.bookShelfs.findIndex(item => item._id === rowKey);
		newData.splice(prevIndex, 1);
		this.setState({bookShelfs: newData});
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
        <SwipeListView
            useFlatList
            data={this.state.bookShelfs}
            keyExtractor = {this._extraUniqueKey}
            renderItem={(data, rowMap) => (
                <BookShelfList key={data.item._id} bookItem={data.item} clickBookItem={(itemData) => this.clickBookItem(itemData)} />
			)}
            renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                    <TouchableOpacity style={styles.rowLeft} onPress={ _ => this.closeRow(rowMap, data.item._id)}>
                        <Text style={{lineHeight: 100,textAlign: "center",color: "#fff"}}>详情</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowRight} onPress={ _ => this.deleteRow(rowMap, data.item._id)}>
                        <Text style={{lineHeight: 100,textAlign: "center",color: "#fff"}}>删除</Text>
                    </TouchableOpacity>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
            disableLeftSwiper={false}
            disableRightSwiper={false} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    viewStyle: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff"
    },
    rowBack: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: '#DD2219',
        height: "100%"
    },
    rowLeft: {
        width: 75,
        height: '100%',
        backgroundColor: 'green'
    },
    rowRight: {
        width: 75,
        height: '100%',
        backgroundColor: '#FF5722'
    }
});

export default withNavigation(BookShelfScreen)