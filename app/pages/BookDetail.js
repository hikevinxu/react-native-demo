/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';
import api from '../config/api.js'
import { BookInfo, BookReview, BookRecommendation } from '../components/index.js'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BookDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params ? params.title : '书籍详情',
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
            headerTitle: <Text style={{flex: 1,fontWeight: '400',color: '#fff',fontSize: 16,alignSelf: 'center',textAlign: 'center'}}>书籍详情</Text>,
            headerRight: <View />
        }
    };

    constructor(props){
        super(props);
        this.state = {
            bookInfo: null,
            bookHotReview: null,
            booklists: null
        }
        navigation = this.props.navigation;
        this.toCommunity = this.toCommunity.bind(this);
    }

    componentDidMount(){
        const { params } = this.props.navigation.state;
        api.getBookDetail(params.book_id).then(res => {
            console.log(res);
            this.setState({
                bookInfo: res
            })
        })
        api.getBookHotReview({book: params.book_id}).then(res => {
            console.log(2,res);
            this.setState({
                bookHotReview: res.reviews
            })
        })
        api.getBookRecommendation(params.book_id,{limit: 3}).then(res => {
            console.log(3,res);
            this.setState({
                booklists: res.booklists
            })
        })
    }

    toCommunity(){
        Alert.alert('msg',"456");
    }

    render() {
        return (
            <ScrollView>
                {this.state.bookInfo?
                    <BookInfo bookData={this.state.bookInfo} navigation={navigation} />
                    :
                    null
                }
                {this.state.bookHotReview ?
                    <View style={{marginTop: 10}}>
                        <BookReview bookHotReviewData={this.state.bookHotReview} />
                    </View>
                    :
                    null
                }
                {this.state.bookInfo ? 
                    <TouchableOpacity style={styles.lookPost} onPress={() => this.toCommunity()}>
                        <View style={{flex: 1,marginLeft: 10}}>
                            <Text style={{fontSize: 18, color: "#333",marginBottom: 10,}}>{this.state.bookInfo ? this.state.bookInfo.title: null}的社区</Text>
                            <Text>共有{this.state.bookInfo ? this.state.bookInfo.postCount : null}个帖子</Text>
                        </View>
                        <View>
                            <Icon 
                            name={'angle-right'}
                            style={{color: '#aaa'}}
                            size={25} />
                        </View>
                    </TouchableOpacity>
                    :
                    null
                }
                {this.state.booklists ?
                    <View style={{marginTop: 10}}>
                        <BookRecommendation recommenData={this.state.booklists} />
                    </View>
                    :
                    null
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    lookPost: {
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
