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
  ListView,
  FlatList,
  Animated
} from 'react-native';
import { SearchInput, TagsGroup, SearchHistoryList, BookList } from '../components/index.js'
import api from '../config/api.js'
import common from '../config/common.js'
import Icon from 'react-native-vector-icons/Ionicons';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VIEWABILITY_CONFIG = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
  };

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class SearchScreen extends Component {
    static navigationOptions = ({ navigation }) => {

        return {
            title: null,
            headerStyle: {
              height: 40,
              backgroundColor: '#DD2219',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '400',
              color: '#fff',
              fontSize: 16
            },
            headerTitle: <SearchInput submit={(text)=>navigation.state.params.navigatePress(text)} style={{flex: 1}} />,
            headerRight: null
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            allTags: [],
            tags: [],
            name: null,
            dataSource: ['校花的贴身高手','row 1', 'row 2','很纯很暧昧','斗破苍穹'],
            searchData: null,
            loading: false,
            refreshing: false
        }
        this.clickOneTagName = this.clickOneTagName.bind(this);
        this.clickSearchHistoryList = this.clickSearchHistoryList.bind(this);
        this.renderSearchHistory = this.renderSearchHistory.bind(this);
        this.clickBookItem = this.clickBookItem.bind(this);
        this.searchBookListByBookName = this.searchBookListByBookName.bind(this);
        this.getRandomArrayElements = this.getRandomArrayElements.bind(this);
        this.changeTags = this.changeTags.bind(this);
        this.refreshing = this.refreshing.bind(this);
        this._onload = this._onload.bind(this);
        this.bookListByName = this.bookListByName.bind(this);
    }

    async componentDidMount(){
        this.props.navigation.setParams({ navigatePress: this.searchBookListByBookName })
        await api.getHotWords().then( res => {
            // 请求成功
            console.log(res.searchHotWords);
            const tagsArr = [];
            for(let i=0;i<res.searchHotWords.length;i++){
                tagsArr.push(res.searchHotWords[i].word)
            }
            this.setState({
                allTags: tagsArr
            },function(){
                console.log(this.state.allTags);
                this.setState({
                    tags: this.getRandomArrayElements(this.state.allTags,20)
                })
            })
        }).catch( err => {
            // 请求失败
        })
    }

    // 根据名字查询小说
    bookListByName(name){
        api.getBookListBySearchName({
            query: name,
            limit: 10
        }).then( res => {
            // 请求成功
            console.log(res, this.state);
            this.setState({
                searchData: res.books,
                loading: false,
                refreshing: false
            },function(){
                console.log(this.state.searchData);
            })
        }).catch( err => {
            // 请求失败
            this.setState({
                loading: false,
                refreshing: false
            })
        })
    }

    // 搜索按钮回车搜索书本
    searchBookListByBookName(name){
        this.setState({
            name: name
        },function(){
            this.bookListByName(name);
        })
    }

    // 从获取到的全部tag中 随机选出20个
    getRandomArrayElements(arr, count) {
        const array=[];
        console.log(arr,count);
        for(let i=0; i < count; i++){
            const index = common.FUNCTION.getRandom(0,arr.length - 1);
            console.log(index);
            array.push(arr[index]);
        }
        console.log(array);
        return array
    }

    // 点击一个tag转到相应的书本列表
    clickOneTagName(tag){
        this.searchBookListByBookName(tag);
    }

    // 点击一个搜索历史列表转到相应的书本列表
    clickSearchHistoryList(name) {
        this.searchBookListByBookName(name);
    }

    // 点击书本列表的其中一本书转到相应的书本信息页面
    clickBookItem(item){
        console.log(item._id);
        this.props.navigation.navigate('BookDetail',{
            book_id: item._id
        });
    }

    // 渲染书本搜索历史记录列表
    renderSearchHistory(rowData){
        return (
            <SearchHistoryList searchName={rowData} clickThisList={(name) => this.clickSearchHistoryList(name)} />
        )
    }

    _extraUniqueKey(item,index){
        return 'book' + index
    }

    // 渲染书本列表页面
    renderBookList(rowData){
        return (
            <BookList key={rowData._id} bookItem={rowData} clickBookItem={(item) => this.clickBookItem(item)} />
        )
    }

    // 换一批推荐tags
    changeTags(){
        console.log(this.state.allTags);
        this.setState({
            tags: this.getRandomArrayElements(this.state.allTags,20)
        })
    }

    refreshing(){
        this.setState({
              refreshing: true
            },() => {
                this.bookListByName(this.state.name);
        });
    }

    _onload(){
        alert(123);
        let nowData = [];
        api.getBookListBySearchName({
            query: this.state.name,
            limit: 10
        }).then( res => {
            // 请求成功
            console.log(res, this.state);
            nowData = res.books;
            this.setState({
                searchData: this.state.searchData.concat(nowData),
                loading: false,
                refreshing: false
            },function(){
                console.log(this.state.searchData);
            })
        }).catch( err => {
            // 请求失败
            this.setState({
                loading: false,
                refreshing: false
            })
        })

    }

    _header = () => {
        return (
            <Text style={[styles.txt,{backgroundColor:'#fff'}]}>下拉刷新...</Text>
        )
    }

    _footer = () => {
        if (!this.state.loading) return null;
        return <Text style={[styles.txt,{backgroundColor:'#fff'}]}>上拉加载更多...</Text>;
    }

    _separator = () => {
        return <View style={{height:1,backgroundColor:'#ccc'}}/>;
    }

    render() {
        return (
        <View>
            {this.state.searchData ?
                <AnimatedFlatList
                data={this.state.searchData}
                keyExtractor = {this._extraUniqueKey}
                renderItem={({item}) => this.renderBookList(item)}
                ListHeaderComponent={this._header}
                ListFooterComponent={this._footer}
                ItemSeparatorComponent={this._separator}
                onRefresh={this.refreshing}
                refreshing={this.state.refreshing}
                onEndReached={
                    this._onload
                }
                onEndReachedThreshold={0.1}
                viewabilityConfig={VIEWABILITY_CONFIG}
                />
            :
                <ScrollView>
                    <View
                    style={styles.tagsTop}>
                        <Text style={styles.tagsTopLeft}> 大家都在搜 </Text>
                        <Icon style={{marginTop: 11}} name={'ios-refresh'} size={20} color={'#333'} onPress={this.changeTags} />
                        <Text style={styles.tagsTopRight} onPress={this.changeTags}> 换一批 </Text>
                    </View>
                    <TagsGroup tags={this.state.tags} checkTag={(tag) => this.clickOneTagName(tag)} />
                    <View
                    style={styles.tagsTop}>
                        <Text style={styles.tagsTopLeft}> 搜索历史 </Text>
                        <Icon style={{marginTop: 11}} name={'ios-trash'} size={20} color={'#333'} />
                        <Text style={styles.tagsTopRight}> 清空 </Text>
                    </View>
                    <ListView
                    dataSource={ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderSearchHistory}
                    />
                </ScrollView>
            }
        </View>
        );
    }
}

const styles = StyleSheet.create({
  tagsTop: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tagsTopLeft: {
    flex: 1,
    width: 'auto',
    marginTop: 8
  },
  tagsTopRight: {
    width: 'auto',
    marginTop: 8
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    }
});
