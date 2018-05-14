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
  ScrollView,
  FlatList
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import api from '../config/api.js'
import { BookList } from '../components/index.js'



export default class BookListScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params ? params.title : '排行榜',
            headerStyle: {
              height: 40,
              backgroundColor: '#DD2219',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '400',
              color: '#fff',
              fontSize: 16,
              alignSelf: 'center',
              textAlign: 'center'
            },
            headerTitle: <Text style={{flex: 1,fontWeight: '400',color: '#fff',fontSize: 16,alignSelf: 'center',textAlign: 'center'}}>{params ? params.title : '排行榜'}</Text>,
            headerRight: <View />
        }
    };

    constructor(props){
        super(props);
        this.state = {
            books: null
        }
        // this.renderBookList = this.renderBookList.bind(this);
        this.clickBookItem = this.clickBookItem.bind(this)
    }

    componentDidMount(){
        const { params } = this.props.navigation.state;
        api.getBookListByLeaderboardType(params._id).then(res => {
            console.log(res);
            this.setState({
                books: res.ranking.books
            },function(){
                console.log(this.state.books)
            })
        })
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

    render() {
        return (
            <View>
                <ScrollView>
                    <FlatList
                    data={this.state.books}
                    keyExtractor = {this._extraUniqueKey}
                    renderItem={({item}) => this.renderBookList(item)} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
