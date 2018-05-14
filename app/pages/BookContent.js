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
  StatusBar,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal
} from 'react-native';
import { CURRENT_WIN_HEIGHT, CURRENT_WIN_WIDTH } from '../config/global.js'
import common from '../config/common.js'
import api from '../config/api.js'
import Icon from 'react-native-vector-icons/Ionicons';


export default class BookContentScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: null,
            headerStyle: {
              height: 0,
              backgroundColor: '#DD2219',
            },
            headerTitle: null,
            headerRight: null
        }
    };

    constructor(props){
        super(props);
        this.state={
            showStatusBar: true,
            bookTitle: null,
            bookContent: [],
            mixToc: null,
            modalVisible: false,
            bookChapterList: [],
            currentTime: common.FUNCTION.currentDate(),
            chapterNum: null,
            chapterLength: null,
        };

        this.count = 0           // 偏移量临界值
        this.currentChapter = '' // 当前章节的页数
        this.nextChapter = ''    // 下一章节的页数
        this.number = 0          // 当前章节的章数
        this.x = 0               // 当前的偏移量

        this.renderContent = this.renderContent.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.getBookContent = this.getBookContent.bind(this);
        this._formatChapter = this._formatChapter.bind(this);
        this._showControlStation = this._showControlStation.bind(this);
        this.renderControlModel = this.renderControlModel.bind(this);
        this.back = this.back.bind(this);
        this.clickControlFooterMenu = this.clickControlFooterMenu.bind(this);
        this._closeChapterModel = this._closeChapterModel.bind(this);
        this.randerChapterDom = this.randerChapterDom.bind(this);
        this.selectChapterInfo = this.selectChapterInfo.bind(this);
    }

    // 组件初始化
    componentDidMount(){
        this.timer = setInterval(() => {
            this.setState({
                currentTime: common.FUNCTION.currentDate()
            },function(){
                // console.log(this.state.currentTime);
            })
        },1000)
        const { params } = this.props.navigation.state;
        this.setState({
            bookTitle: params.book_title
        })
        api.getBookChapters(params.book_id,{view: 'chapters'}).then(res => {
            console.log(res.mixToc);
            this.setState({
                mixToc: res.mixToc,
                bookChapterList: res.mixToc.chapters
            },function(){
                this.getBookContent(this.state.mixToc.chapters,0);
            })
        })
    }

    // 组件被移除时触发
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    // 返回按钮
    back(){
        this.props.navigation.goBack();
    }

    // 左划或右划时触发
    handleScroll(e){
        let x = e.nativeEvent.contentOffset.x;
        if(this.count === 0){
            this.count = (this.currentChapter - 1) * CURRENT_WIN_WIDTH;
        }
        this.x = x;
        if(x >= this.count){
            this.count += this.nextChapter * CURRENT_WIN_WIDTH;
            alert(this.state.chapterLength);
            // 获取下一章节
            if(this.state.chapterNum + 2 < this.state.chapterLength){
                let chapterUrl = this.state.mixToc.chapters[this.state.chapterNum + 2].link;
                console.log(chapterUrl);
                let tempUrl = chapterUrl.replace(/\//g, '%2F').replace('?', '%3F');
                fetch("http://chapter2.zhuishushenqi.com/chapter/" + tempUrl).then(res => res.json()).then(res => {
                    console.log(res);
                    if(res.ok){
                        let tempChapterBody = res.chapter.body;
                        let tempChapterTitle = res.chapter.title;
                        let tempContent_arr = this._formatChapter(tempChapterBody, this.state.chapterNum + 2, this.state.mixToc.chapters[this.state.chapterNum + 2].title);
                        this.setState({
                            bookContent: this.state.bookContent.concat(tempContent_arr),
                            chapterNum: this.state.chapterNum + 1
                        },function(){
                            console.log(this.state.bookContent);
                        })
                    }else{
                        alert("下一章加载失败");
                    }
                })
            }else{
                alert("已到达最后一页！")
            }
        }else{
            // 获取上一章节
            if(x === 0 && this.state.chapterNum == 0){
                alert("已到达第一页！");
            }
            if(x === 0 && this.state.chapterNum !== 0){
                alert(1);
                let lastChapterUrl = this.state.mixToc.chapters[this.state.chapterNum - 1].link;
                console.log(lastChapterUrl);
                let lastTempUrl = lastChapterUrl.replace(/\//g, '%2F').replace('?', '%3F');
                fetch("http://chapter2.zhuishushenqi.com/chapter/" + lastTempUrl).then(res => res.json()).then(res => {
                    console.log(res);
                    if(res.ok){
                        let lastChapterBody = res.chapter.body;
                        let lastChapterTitle = res.chapter.title;
                        let lastContent_arr = this._formatChapter(lastChapterBody, this.state.chapterNum - 1, this.state.mixToc.chapters[this.state.chapterNum - 1].title);
                        this.setState({
                            bookContent: lastContent_arr.concat(this.state.bookContent),
                            chapterNum: this.state.chapterNum - 1
                        },function(){
                            console.log(this.state.bookContent);
                            let bookContentView = this.refs.bookContentView;
                            bookContentView.scrollTo({x: (lastContent_arr.length) * CURRENT_WIN_WIDTH, y: 0, animated: false})
                        })
                    }else{
                        alert("上一章加载失败");
                    }
                })
            }
        }
    }

    // 给FlatList 绑定key 值
    _extraUniqueKey(item,index){
        return 'bookContent' + index
    }

    // 把拿到的章节内容分页
    _formatChapter(content, num, title) {
        let _arr =[]
        let _content = '\u3000\u3000' + content.replace(/\n/g, '@\u3000\u3000')
        let _arrTemp = common.FUNCTION.contentFormat(_content)
        _arrTemp.forEach(function(element,index) {
          let _chapterInfo = {
            title: title,
            num: index + 1,
            content: element,
            length: _arrTemp.length
          }
          _arr.push(_chapterInfo)
        });
        return _arr
      }

    // 请求接口拿到章节内容
    getBookContent(chapters,num){
        let chapterUrl = chapters[num].link;
        console.log(chapterUrl);
        let tempUrl = chapterUrl.replace(/\//g, '%2F').replace('?', '%3F')
        fetch("http://chapter2.zhuishushenqi.com/chapter/" + tempUrl).then(res => res.json()).then(res => {
            console.log(res);
            if(res.ok) {
                let currentChapterBody = res.chapter.body;
                let currentChapterTitle = res.chapter.title;
                let bookContent_arr = this._formatChapter(currentChapterBody, num, chapters[num].title);
                this.currentChapter = bookContent_arr.length;
                if(num + 1 >= chapters.length){
                    this.setState({
                        bookContent: bookContent_arr,
                        chapterLength: chapters.length,
                        chapterNum: num
                    },function(){
                        console.log(this.state.bookContent);
                    })
                }else{
                    let nextChapterUrl = chapters[num + 1].link;
                    console.log(nextChapterUrl);
                    let nextTempUrl = nextChapterUrl.replace(/\//g, '%2F').replace('?', '%3F');
                    fetch('http://chapter2.zhuishushenqi.com/chapter/' + nextTempUrl).then(res => res.json()).then(res => {
                        console.log(res);
                        if(res.ok){
                            let nextChapterBody = res.chapter.body;
                            let nextChapterTitle = res.chapter.title;
                            let bookContent_arr2 = this._formatChapter(nextChapterBody, num + 1, chapters[num + 1].title);
                            this.nextChapter = bookContent_arr2.length;
                            bookContent_arr = bookContent_arr.concat(bookContent_arr2);
                            this.setState({
                                bookContent: bookContent_arr,
                                chapterLength: chapters.length,
                                chapterNum: num
                            },function(){
                                console.log(this.state.bookContent);
                                // if(num !== 0){
                                //     let lastChapterUrl = chapters[num - 1].link;
                                //     console.log(lastChapterUrl);
                                //     let lastTempUrl = lastChapterUrl.replace(/\//g, '%2F').replace('?', '%3F');
                                //     fetch('http://chapter2.zhuishushenqi.com/chapter/' + lastTempUrl).then(res => res.json()).then(res => {
                                //         console.log(res);
                                //         if(res.ok){
                                //             let lastChapterBody = res.chapter.body;
                                //             let lastChapterTitle = res.chapter.title;
                                //             let bookContent_arr3 = this._formatChapter(nextChapterBody, num - 1, chapters[num - 1].title);
                                //             bookContent_arr = bookContent_arr3.concat(bookContent_arr);
                                //             this.setState({
                                //                 bookContent: bookContent_arr,
                                //                 chapterLength: chapters.length,
                                //                 chapterNum: num
                                //             },function(){
                                //                 console.log(this.state.bookContent);
                                //                 let bookContentView = this.refs.bookContentView;
                                //                 bookContentView.scrollTo({x: (bookContent_arr3.length) * CURRENT_WIN_WIDTH, y: 0, animated: false})
                                //             })
                                //         }
                                //     })
                                // }
                            })
                        }else{
                            alert("下一章加载失败");
                        }
                    })
                }
            }else{
                alert("加载失败");
            }
        })
    }

    // 页面上下的菜单栏的显示隐藏
    _showControlStation(e) {
        var pageX = e.nativeEvent.pageX;
        var pageY = e.nativeEvent.pageY;
        // alert(pageX,pageY);
        if (pageX > CURRENT_WIN_WIDTH / 3 && pageX < CURRENT_WIN_WIDTH * 2 / 3
              && pageY > CURRENT_WIN_HEIGHT / 3 && pageY < CURRENT_WIN_HEIGHT * 2 / 3) {
          this.setState({showStatusBar: !this.state.showStatusBar,})
        }
    }

    // 渲染文章内容
    renderContent(item){
        return (
            <View 
            style={{flex:1}}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.contentView} 
                onStartShouldSetResponder={() => true} 
                onResponderRelease={(e) => this._showControlStation(e)}>
                    {item.content ? item.content.map((value, index,chapterContent) => {
                        return (
                        <Text style={styles.content} key={index}>
                            {value}
                        </Text>
                        )
                    }) : null }
                </View>
                <View style={{width: CURRENT_WIN_WIDTH, paddingBottom: 10, flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'space-around',}}>
                    <Text style={styles.title}>{this.state.currentTime}</Text>
                    <Text style={styles.title}>{item.num} / {item.length}</Text>
                </View>
            </View>
        )
    }

    // 渲染上下的菜单
    renderControlModel(){
        return (
            <View style={{position: 'absolute', width: CURRENT_WIN_WIDTH, height: CURRENT_WIN_HEIGHT}}>
                <View style={styles.controlTitle}>
                    <TouchableOpacity
                    onPress={() => this.back()}>
                        <Icon 
                        name={'md-arrow-back'}
                        style={{color: '#fff',lineHeight:46,marginLeft: 20}}
                        size={25} />
                    </TouchableOpacity>
                    <View style={styles.controlTitleRight}>
                        <Text style={{color: '#333',marginRight: 20,fontSize: 16,lineHeight:46}}>简介</Text>
                        <Text style={{color: '#333',marginRight: 20,fontSize: 16,lineHeight:46}}>收藏</Text>
                    </View>
                </View>
                <View style={{flex: 1}}></View>
                <View
                style={styles.controlFooter}>
                    <TouchableOpacity style={styles.controlFooterMenu} onPress={(index) => this.clickControlFooterMenu(1)}>
                        <Icon 
                        name={'ios-settings'}
                        style={{color: '#333'}}
                        size={25} />
                        <Text style={{color: '#333'}}>设置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlFooterMenu} onPress={(index) => this.clickControlFooterMenu(2)}>
                        <Icon 
                        name={'ios-cloud-download'}
                        style={{color: '#333'}}
                        size={25} />
                        <Text style={{color: '#333'}}>缓存</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlFooterMenu} onPress={(index) => this.clickControlFooterMenu(3)}>
                        <Icon 
                        name={'ios-bookmarks'}
                        style={{color: '#333'}}
                        size={25} />
                        <Text style={{color: '#333'}}>书签</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlFooterMenu} onPress={(index) => this.clickControlFooterMenu(4)}>
                        <Icon 
                        name={'ios-list-box'}
                        style={{color: '#333'}}
                        size={25} />
                        <Text style={{color: '#333'}}>目录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // 点击footer的菜单做不同的事
    clickControlFooterMenu(index){
        if(index == 1){
            alert("设置");
        }else if(index == 2){
            alert("缓存");
        }else if(index == 3){
            alert("书签");
        }else{
            // alert("目录");
            this.setState({
                modalVisible: true
            })
        }
    }

    // 关闭章节目录model
    _closeChapterModel(){
        this.setState({
            modalVisible: false
        })
    }

    // 在目录里点击某一章节跳到盖章的内容
    selectChapterInfo(rowData,index){
        this.getBookContent(this.state.mixToc.chapters,index);
        this._closeChapterModel();
    }

    // 渲染章节目录
    randerChapterDom(item){
        return (
            <TouchableOpacity onPress={(rowData,index) => this.selectChapterInfo(item.item,item.index)}>
                <Text numberOfLines={1} style={{marginTop: 5,marginLeft: 5,fontSize: 14,marginBottom: 5}}>{item.item.title}</Text>
            </TouchableOpacity>
        )
    }

    // 渲染章节目录的key值
    _chapterUniqueKey(item,index){
        return 'chapter' + index
    }

    _separatorChapter(){
        return <View style={{height:1,backgroundColor:'#ccc'}}/>;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar 
                hidden={this.state.showStatusBar} 
                translucent={true}
                showHideTransition={'slide'}
                barStyle={'light-content'}/>
                <ImageBackground
                style={{width: CURRENT_WIN_WIDTH,height: CURRENT_WIN_HEIGHT}}
                source={require('../common/images/read_bg.jpg')}>
                    {this.state.bookContent.length !== 0 ?
                        <ScrollView
                        ref="bookContentView"
                        horizontal={true}
                        scrollEventThrottle={800}
                        onScroll={(e)=>this.handleScroll(e)}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        pagingEnabled={true} >
                            <FlatList
                            horizontal={true}
                            data={this.state.bookContent}
                            keyExtractor = {this._extraUniqueKey}
                            renderItem={({item}) => this.renderContent(item)} />
                        </ScrollView>
                        :
                        <View style={styles.loadingView}>
                            <Text style={styles.loading}>内容正在加载中.....</Text>
                        </View>
                    }
                    {this.state.showStatusBar ? 
                    null
                    :
                    this.renderControlModel()
                    }
                    <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this._closeChapterModel()}
                    >
                        <TouchableOpacity 
                        activeOpacity={1}
                        style={{height: '100%',width: '100%',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                        onPress={() => this._closeChapterModel()}>
                            <View style={{height: '100%',width: '70%',backgroundColor: '#EEDEBD'}}>
                                <Text style={{marginTop: 20,marginLeft: 10,fontSize: 18,marginBottom: 10,color: '#333'}}>{this.state.bookTitle ? this.state.bookTitle : null}</Text>
                                <View style={{flex:1,borderTopColor: '#ccc',borderTopWidth: 1,padding: 5}}>
                                    {this.state.bookChapterList.length !== 0 ?
                                        <FlatList
                                        data={this.state.bookChapterList}
                                        keyExtractor = {this._chapterUniqueKey}
                                        ItemSeparatorComponent={this._separatorChapter}
                                        renderItem={this.randerChapterDom} />
                                        :
                                        <Text style={styles.loadingView}>暂无章节目录</Text>
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingView: {
        justifyContent:"center",
        alignContent: 'center',
        height: "100%",
        width: CURRENT_WIN_WIDTH
    },
    loading: {
        color: '#604733',
        fontSize: 14,
        lineHeight: 34,
        textAlign: 'center'
    },
    contentView: {
        flex: 1,
        paddingTop: 0,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
    content: {
        color: '#604733',
        fontSize: 17,
        lineHeight: 34
    },
    title: {
        fontSize: 14,
        color: '#999999',
        padding: 15,
        paddingBottom: 5
    },
    controlTitle: {
        width: '100%',
        height: 70,
        backgroundColor: '#DD2219',
        paddingTop: 24,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    controlFooter:{
        width: '100%',
        height: 50,
        backgroundColor: '#DD2219',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    controlTitleRight: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    controlFooterMenu: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chapterModal: {
        
    }
});
