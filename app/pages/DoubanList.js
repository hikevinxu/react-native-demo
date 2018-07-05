/**
 * 上拉加载  下拉刷新demo
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
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

let count = 20;
const base_url = 'https://api.douban.com/v2/book/search?tag=小说&count=20&start='

export default class DoubanListScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: '豆瓣小说',
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
            headerTitle: <Text style={{flex: 1,fontWeight: '400',color: '#fff',fontSize: 16,alignSelf: 'center',textAlign: 'center'}}>豆瓣小说</Text>,
            headerRight: <View />
        }
    };

    constructor(props){
        super(props);
        this.state = {
            start: 0,
            total: 0,
            dataArray: [],
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing:false,//下拉控制
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount(){
        // alert(456);
        this.fetchData();
    }

    fetchData(){
        fetch(base_url +  this.state.start,{
            method: "GET"
        }).then((response) => response.json()).then((res) => {
            console.log(res);
            if(res.code === 112){
                this.setState({
                    error: true,
                    errorInfo: res.msg
                });
                return;
            }
            // alert(res.books.length);
            let data = res.books;//获取json 数据并存在data数组中
            let total = res.total;
            let dataBlob = [];//这是创建该数组，目的放存在key值的数据，就不会报黄灯了
            data.map(function (item) {
                dataBlob.push({
                    key: item.id,
                    title: item.title
                })
            });
            let foot = 0;
            if(this.state.start >= total){
                foot = 1;//listView底部显示没有更多数据了
            }
            this.setState({
                total: total,
                dataArray:this.state.dataArray.concat( dataBlob),
                isLoading: false,
                showFoot:foot,
                isRefreshing:false,
            },function(){
                data = null;//重置为空
                dataBlob = null;
                total = null;
            })
        }).catch((error) => {
            this.setState({
                error: true,
                errorInfo: error
            })
        })
    }

    handleRefresh = () => {
        this.setState({
            start: 0,
            showFoot: 0,
            isRefreshing:true,//tag,下拉刷新中，加载完全，就设置成flase
            dataArray:[]
        });
        this.fetchData()
    }

    //加载等待页
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    color='blue'
                    size="large"
                />
            </View>
        );
    }

    _keyExtractor = (item, index) => index;

    //加载失败view
    renderErrorView() {
        return (
            <View style={styles.container}>
                <Text>
                    {this.state.errorInfo}
                </Text>
            </View>
        );
    }

    //返回itemView
    _renderItemView({item}) {
        return (
            <TouchableOpacity style={{paddingBottom: 10}}>
                <View style={{height: 80,width: '100%',backgroundColor: '#ffffff'}}>
                    <Text style={{lineHeight: 80,textAlign: 'center',width: '100%'}}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderData(){
        return (
            <FlatList
                style={{backgroundColor: "#f6f6f6"}}
                data={this.state.dataArray}
                renderItem={this._renderItemView}
                ListFooterComponent={this._renderFooter.bind(this)}
                onEndReached={() => this._onEndReached()}
                onEndReachedThreshold={1}
                keyExtractor={this._keyExtractor}
                //为刷新设置颜色
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.handleRefresh.bind(this)}//因为涉及到this.state
                        colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                        progressBackgroundColor="#ffffff"
                    />
                }
            />
        )
    }

    _renderFooter(){
        if (this.state.showFoot === 1) {
            // alert(this.state.dataArray.length);
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }

    _onEndReached(){
        // alert(this.state.start);
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if((this.state.start!=0) && (this.state.start>=this.state.total)){
            return;
        } else {
            this.state.start += 20;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据，在componentDidMount()已经请求过数据了
        if (this.state.start > 0)
        {
            this.fetchData();
        }
    }

    render() {
        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return this.renderErrorView();
        }
        //加载数据
        return this.renderData();
    }

}

const styles = StyleSheet.create({
    container: {
        padding:10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        marginTop:8,
        marginLeft:8,
        marginRight:8,
        fontSize: 15,
        color: '#ffa700',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center'
    },
    content: {
        marginBottom:8,
        marginLeft:8,
        marginRight:8,
        fontSize: 14,
        color: 'black',
    }
});
