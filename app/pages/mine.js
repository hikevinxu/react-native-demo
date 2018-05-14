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
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { MineMenuList } from '../components/index.js'

export default class MineScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuListData: [{menuIndex: 1,menuImage: 'https://qiniujiexino2opublic.51icare.cn/share.png',menuTitle: '分享与保存',menuSubtitle: ''},{menuIndex: 2,menuImage: 'https://qiniujiexino2opublic.51icare.cn/member.png',menuTitle: '我的主页',menuSubtitle: '个人中心'},{menuIndex: 3,menuImage: 'https://qiniujiexino2opublic.51icare.cn/about.png',menuTitle: '任务',menuSubtitle: '做任务，拿奖励'},{menuIndex: 4,menuImage: 'https://qiniujiexino2opublic.51icare.cn/invitation.png',menuTitle: '我的福利卡',menuSubtitle: ''},{menuIndex: 5,menuImage: 'https://qiniujiexino2opublic.51icare.cn/wallet.png',menuTitle: '阅读书单',menuSubtitle: ''},{menuIndex: 6,menuImage: 'https://qiniujiexino2opublic.51icare.cn/help.png',menuTitle: '帮助与反馈',menuSubtitle: '常见问题'},{menuIndex: 7,menuImage: 'https://qiniujiexino2opublic.51icare.cn/set.png',menuTitle: '设置',menuSubtitle: ''}]
    };
    this.goLogin = this.goLogin.bind(this);
    this.clickMenuItem = this.clickMenuItem.bind(this);
    this.renderMenuList = this.renderMenuList.bind(this);
  }

  componentDidMount(){

  }

  goLogin(){
    alert(123);
  }

  clickMenuItem(itemData){
    alert(itemData.menuIndex);
  }

  _keyExtractor(item ,index){
    return "menu" + item.menuIndex;
  }

  renderMenuList(item){
    return (
      <MineMenuList key={item.menuIndex} menuItem={item} clickMenuItem={(itemData) => this.clickMenuItem(itemData)} />
    )
  }

  render() {
    return (
      <ScrollView>
        <View
        style={{justifyContent: 'space-between',alignItems: 'center'}}>
          <TouchableOpacity
          style={{width: 80,height: 110,marginTop: 30}}
          onPress={() => this.goLogin()}>
            <Image
              style={{width: 80,height: 80,}}
              source={require('./../common/images/myAccount.png')}/>
            <Text style={{textAlign: 'center',marginTop: 10}}>点击登录</Text>
          </TouchableOpacity>
          <View
          style={{width: '100%',height: 80,justifyContent: 'space-around',flexDirection: 'row',marginTop: 30}}>
            <TouchableOpacity
            style={{width: 40,height: 80}}
            onPress={() => this.goLogin()}>
              <Image
                style={{width: 40,height: 40,}}
                source={require('./../common/images/myzhanghu.png')}/>
              <Text style={{textAlign: 'center',marginTop: 10,color: '#222'}}>充值</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{width: 40,height: 80}}
            onPress={() => this.goLogin()}>
              <Image
                style={{width: 40,height: 40,}}
                source={require('./../common/images/mybaodan1.png')}/>
              <Text style={{textAlign: 'center',marginTop: 10,color: '#222'}}>订单</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{width: 40,height: 80}}
            onPress={() => this.goLogin()}>
              <Image
                style={{width: 40,height: 40,}}
                source={require('./../common/images/pieChart.png')}/>
              <Text style={{textAlign: 'center',marginTop: 10,color: '#222'}}>资产</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{width: 40,height: 80}}
            onPress={() => this.goLogin()}>
              <Image
                style={{width: 40,height: 40,}}
                source={require('./../common/images/mytixian.png')}/>
              <Text style={{textAlign: 'center',marginTop: 10,color: '#222'}}>会员</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10,width: '100%',height: 10,backgroundColor: '#ddd'}}></View>
          <View style={{width: '100%',paddingLeft: 15,paddingRight: 15}}>
            <FlatList
            data={this.state.menuListData}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => this.renderMenuList(item)}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
