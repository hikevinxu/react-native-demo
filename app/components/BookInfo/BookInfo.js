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
  Button,
  TouchableOpacity,
  Alert,
  DeviceEventEmitter
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import Toast, {DURATION} from 'react-native-easy-toast'
import { IMG_BASE_URL } from '../../config/global.js'


export default class BookInfo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bookIntro1: {
            fontSize: 12,
            paddingLeft: 5,
            paddingRight: 5,
            color: '#333',
        },
        bookIntro: true,
        hasSaveBook: false
      };
      this.followUp = this.followUp.bind(this);
      this.startReading = this.startReading.bind(this);
      this.viewAll = this.viewAll.bind(this);
    }

    componentDidMount(){
        const bookInfo = this.props.bookData;
        storage.load({
            key: 'bookShelf',
            id: bookInfo._id
          }).then(ret => {
            this.setState({
                hasSaveBook: true
            })
          }).catch(err => {
            this.setState({
                hasSaveBook: false
            })
        })                
    }

    followUp(bookInfo){
        this.setState({
            hasSaveBook: !this.state.hasSaveBook
        },function(){
            if(this.state.hasSaveBook){
                storage.save({
                    key: 'bookShelf',  // 注意:请不要在key中使用_下划线符号!
                    id: bookInfo._id,
                    data: bookInfo,
                    // 如果不指定过期时间，则会使用defaultExpires参数
                    // 如果设为null，则永不过期
                    expires: null
                }).then(res => {
                    this.refs.toast.show('已收藏');
                    DeviceEventEmitter.emit('addBookShelf', '添加收藏');
                });
            }else{
                // 删除单个数据
                storage.remove({
                    key: 'bookShelf',
                    id: bookInfo._id
                });
                this.refs.toast.show('已取消收藏');
            }
        })
    }

    startReading(bookInfo){
        console.log(this.props.navigation);
        this.props.navigation.navigate('BookContent',{
            book_id: bookInfo._id,
            book_title: bookInfo.title
        });
    }

    viewAll(){
        this.setState({
            bookIntro: !this.state.bookIntro
        })
    }

  render() {
    const bookInfo = this.props.bookData;
    return (
        <View>
        {bookInfo ?
            <View style={{paddingLeft: 10,paddingRight: 10,backgroundColor: '#fff'}}>
                <View  style={styles.bookDetail}>
                    <View
                        style={styles.bookPic}>
                        <Image
                        style={{width: '100%',height: '100%'}}
                        source={bookInfo.cover ? {uri: IMG_BASE_URL + bookInfo.cover} : require('../../common/images/2.jpg')}
                        />
                    </View>
                    <View
                        style={styles.bookInfo}>
                        <Text style={{fontSize: 16,marginTop: 15,color: '#000'}}>{bookInfo.title}</Text>
                        <Text style={{fontSize: 12,marginTop: 15}}><Text style={{color: '#DD2219',marginLeft: 5,marginRight: 5}}>{bookInfo.author}</Text> | {bookInfo.cat} | {parseInt(bookInfo.wordCount / 10000)} 万字</Text>
                        <Text style={{fontSize: 12,marginTop: 15}}>更新时间:{bookInfo.updated}</Text>
                    </View>
                </View>
                <View  style={styles.bookDetail}>
                    <View style={styles.bookButton}>
                        <Button title={this.state.hasSaveBook ? '-不追了':'+追更新'} color={this.state.hasSaveBook ? "#666":"#2196F3"} onPress={(book) => this.followUp(bookInfo)}/>
                    </View>
                    <View style={styles.bookButton}>
                        <Button title="开始阅读" color="#2196F3" onPress={(id) => this.startReading(bookInfo)}/>
                    </View>
                </View>
                <View style={styles.bookNumberData}>
                    <View style={styles.bookNumberDetail}>
                        <Text style={{textAlign: 'center',color: '#333'}}>追书人数</Text>
                        <Text style={{textAlign: 'center',color: '#333'}}>{bookInfo.latelyFollower}</Text>
                    </View>
                    <View style={styles.bookNumberDetail}>
                        <Text style={{textAlign: 'center',color: '#333'}}>读者留存率</Text>
                        <Text style={{textAlign: 'center',color: '#333'}}>{bookInfo.retentionRatio}%</Text>
                    </View>
                    <View style={styles.bookNumberDetail}>
                        <Text style={{textAlign: 'center',color: '#333'}}>日更新字数</Text>
                        <Text style={{textAlign: 'center',color: '#333'}}>{bookInfo.serializeWordCount}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.longIntro}>
                    <Text numberOfLines={this.state.bookIntro ? 2 : 10} style={this.state.bookIntro1} onPress={() => this.viewAll()}>{bookInfo.longIntro}</Text> 
                </TouchableOpacity>
            </View>
            :
            null
        }
            <Toast
                ref="toast"
                style={{backgroundColor:'#000'}}
                position='bottom'
                positionValue={150}
                fadeInDuration={500}
                fadeOutDuration={500}
                opacity={0.8}
                textStyle={{color:'#fff'}}
              />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    bookDetail: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    bookPic: {
        width: 80,
        height: 115,
        padding: 5,
        marginTop: 10,
        marginBottom: 10
    },
    bookInfo: {
        flex: 1,
        marginTop: 10,
        marginLeft: 5
    },
    bookButton: {
        flex: 1,
        padding: 5,
        paddingTop: 0,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    bookNumberData: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    bookNumberDetail: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    longIntro: {
        paddingTop: 10,
        paddingBottom: 20
    },
    bookIntro: {
        fontSize: 12,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#333'
    }
});
