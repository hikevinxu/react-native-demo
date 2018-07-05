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
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Swiper from 'react-native-swiper';
import { CURRENT_WIN_HEIGHT, CURRENT_WIN_WIDTH } from '../config/global.js'
import { CommunityCate, BookCoverList } from '../components/index.js'

export default class CommunityScreen extends Component {
  constructor(){
    super();
    this.state = {
      showSwiper: false,
      cateList: [{id: 1,cateName: '私人电台',catePic: 'https://qiniujiexino2opublic.51icare.cn/stack2.png'},{id: 2,marginTop: 20,cateName: '畅销精品',catePic: 'https://qiniujiexino2opublic.51icare.cn/crown.png'},{id: 3,marginTop: 20,cateName: '火热连载',catePic: 'https://qiniujiexino2opublic.51icare.cn/hot.png'}],
      bestseller: [{bookId: 1,bookCover: 'https://img3.doubanio.com/view/subject/m/public/s27264181.jpg',bookName: '解忧杂货店'},{bookId: 2,bookCover: 'https://img1.doubanio.com/view/subject/m/public/s2768378.jpg',bookName: '三体'},{bookId: 3,bookCover: 'https://img1.doubanio.com/view/subject/m/public/s10339418.jpg',bookName: '偷影子的人'}],
      hotSerial: [{bookId: 4,bookCover: 'https://img3.doubanio.com/view/subject/m/public/s6980516.jpg',bookName: '失恋33天'},{bookId: 5,bookCover: 'https://img3.doubanio.com/view/subject/m/public/s4066862.jpg',bookName: '放学后'},{bookId: 6,bookCover: 'https://img3.doubanio.com/view/subject/m/public/s3254244.jpg',bookName: '嫌疑人X的献身'}],
    };
    this.clickCateList = this.clickCateList.bind(this);
  }

  componentDidMount(){
    let that = this;
    setTimeout(function(){
      that.setState({
        showSwiper: true
      })
    },1000)
  }

  clickCateList(id){
    // alert(id);
    this.props.navigation.navigate('DoubanList',{
        id: id
    });
  }

  render() {
    return (
      <ScrollView style={styles.viewStyle}>
      <View style={styles.communityTop}>
        <TouchableOpacity style={styles.topView}>
          <Text style={styles.topText}>男生</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topView}>
          <Text style={styles.topText}>女生</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topView}>
          <Text style={styles.topText}>出版</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topView}>
          <Text style={styles.topText}>免费</Text>
        </TouchableOpacity>
      </View>
        {this.state.showSwiper ? 
            <Swiper
            style={styles.swiper}          //样式
            height={CURRENT_WIN_WIDTH / 700 * 320}     //组件高度
            loop={true}                    //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
            index={0}
            autoplay={true}                //自动轮播
            autoplayTimeout={3}                //每隔4秒切换
            horizontal={true}              //水平方向，为false可设置为竖直方向
            paginationStyle={{bottom: 10}} //小圆点的位置：距离底部10px
            showsButtons={false}           //为false时不显示控制按钮
            showsPagination={false}       //为false不显示下方圆点
            dot={<View style={{           //未选中的圆点样式
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 18,
                height: 18,
                borderRadius: 4,
                marginLeft: 10,
                marginRight: 9,
                marginTop: 9,
                marginBottom: 9,
            }}/>}
            activeDot={<View style={{    //选中的圆点样式
                backgroundColor: '#007aff',
                width: 18,
                height: 18,
                borderRadius: 4,
                marginLeft: 10,
                marginRight: 9,
                marginTop: 9,
                marginBottom: 9,
            }}/>}

          >
            <TouchableOpacity onPress={() => alert(1)}>
              <Image source={require('../common/images/bannerone.jpg')} style={styles.img}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert(2)}>
              <Image source={require('../common/images/bannertwo.jpg')} style={styles.img}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert(3)}>
              <Image source={require('../common/images/bannerthree.jpg')} style={styles.img}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert(4)}>
              <Image source={require('../common/images/bannerfour.jpg')} style={styles.img}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert(5)}>
              <Image source={require('../common/images/bannerfive.jpg')} style={styles.img}/>
            </TouchableOpacity>
          </Swiper>
        :
          <View style={styles.wrapper}>
              <Image source={require('../common/images/bannerone.jpg')} style={styles.bannerImg} />
          </View>
        }
        <CommunityCate itemData={this.state.cateList[0]} clickItem={(id) => this.clickCateList(id)} />
        <CommunityCate itemData={this.state.cateList[1]} clickItem={(id) => this.clickCateList(id)} />
        <View style={styles.bookList}>
          {this.state.bestseller ? 
            this.state.bestseller.map((item,key) => {
              console.log(item);
              return <BookCoverList key={key} bookItem={item} />
            })
          :
            null
          }
        </View>
        <CommunityCate itemData={this.state.cateList[2]} clickItem={(id) => this.clickCateList(id)} />
        <View style={styles.bookList}>
          {this.state.hotSerial ? 
              this.state.hotSerial.map((item,key) => {
                console.log(item);
                return <BookCoverList key={key} bookItem={item} />
              })
            :
              null
            }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f6f6f6"
  },
  swiper: {
    width: '100%',
    backgroundColor: 'pink',
    shadowColor: '#000000',
    shadowOffset: {width: 0,height: 5},
    shadowOpacity: 0.8, 
    shadowRadius: 6, 
    elevation: 10 
  },
  img: {
    width: '100%',
    height: CURRENT_WIN_WIDTH / 700 * 320,
    backgroundColor: 'green',
    shadowColor: '#000000',
    shadowOffset: {width: 0,height: 5},
    shadowOpacity: 0.8, 
    shadowRadius: 6, 
    elevation: 10 
  },
  communityTop: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topView: {
    flex: 1
  },
  topText: {
    textAlign: 'center',
    lineHeight: 40
  },
  personDianTai: {
    height: 40,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookList: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10
  }
});
