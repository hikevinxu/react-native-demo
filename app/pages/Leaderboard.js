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
import { RankingItem } from '../components/index.js'
import { APP_THIEF_COLOR } from '../config/global.js'


export default class LeaderboardScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '排行榜',
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
            headerTitle: <Text style={{flex: 1,fontWeight: '400',color: '#fff',fontSize: 16,alignSelf: 'center',textAlign: 'center'}}>排行榜</Text>,
            headerRight: <View />
        }
    };

    constructor(props){
        super(props);
        this.state = {
            female: null,
            male: null,
        }
        this.renderRankingList = this.renderRankingList.bind(this);
        this.bookList = this.bookList.bind(this);
    }

    componentDidMount(){
        api.getLeaderboardType().then( res => {  
            console.log(res);
            this.setState({
                female: res.female,
                male: res.male,
            },function(){
                console.log(this.state.female);
            })
        })
    }

    bookList(itemData){
        this.props.navigation.navigate('BookList',{
            _id: itemData._id,
            monthRank: itemData.monthRank,
            totalRank: itemData.totalRank,
            title: itemData.title
        });
    }

    _extraUniqueKey1(item,index){
        return 'male' + index
    }

    _extraUniqueKey2(item,index){
        return 'female' + index
    }

    renderRankingList(item){
        return (
           <RankingItem itemData={item} clickItem={(itemData) => this.bookList(itemData)} />
        )
    }

    render() {
        console.log(this.state.female);
        return (
            <ScrollView style={{backgroundColor: '#fff'}}>
                <Text style={styles.title}>男生榜</Text>
                <FlatList
                data={this.state.male}
                keyExtractor = {this._extraUniqueKey1}
                renderItem={({item}) => this.renderRankingList(item)} />
                <Text style={styles.title}>女生榜</Text>
                <FlatList
                data={this.state.female}
                keyExtractor = {this._extraUniqueKey2}
                renderItem={({item}) => this.renderRankingList(item)} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  title: {
    padding: 15,
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: '700',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: "#333"
  }
});
