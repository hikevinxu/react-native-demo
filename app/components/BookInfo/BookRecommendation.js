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
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

import { IMG_BASE_URL } from '../../config/global.js'

class BookRecommendationList extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.clickRecommenBookItem = this.clickRecommenBookItem.bind(this);
  }

  clickRecommenBookItem(recommenItemData){
    alert(recommenItemData.id);
  }

  render() {
    const recommenItemData = this.props.bookItem;
    console.log(4,recommenItemData);
    return (
      <TouchableOpacity style={styles.bookList} onPress={(item) => this.clickRecommenBookItem(recommenItemData)}>
        <Image
          style={{width: 50,height: 70,marginTop: 10}}
          source={recommenItemData.cover ? {uri: IMG_BASE_URL + recommenItemData.cover} : require('../../common/images/2.jpg')}/>
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={{marginLeft: 15,marginBottom: 5,fontSize: 16,color: '#333'}}>{recommenItemData.title}</Text>
          <Text style={{marginLeft: 15,marginBottom: 5,color: '#D4AF37'}}>{recommenItemData.author}</Text>
          <Text numberOfLines={2} style={{marginLeft: 15,marginBottom: 5,color: '#333',fontSize: 12}}>{recommenItemData.desc}</Text>
          <Text style={{marginLeft: 15,color: '#aaa',fontSize: 12}}>共{recommenItemData.bookCount}本书 | {recommenItemData.collectorCount}人收藏</Text>
        </View>
      </TouchableOpacity>
    );
  }
}



export default class BookRecommendation extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.renderBookRecommenList = this.renderBookRecommenList.bind(this);
  }

  _extraUniqueKey(item,index){
    return 'recommenBook' + index;
  }

  _separator = () => {
      return <View style={{height:1,backgroundColor:'#ccc'}}/>;
  }

  renderBookRecommenList(item){
    return <BookRecommendationList bookItem={item} />
  }

  render() {
    const recommenData = this.props.recommenData;
    return (
      <View>
        <View style={{backgroundColor: '#fff',padding: 10}}>
            <View>
                <Text style={{marginLeft: 10}}>推荐书单</Text>
            </View>
            <View style={styles.recommendationList}>
                <FlatList
                data={recommenData}
                keyExtractor = {this._extraUniqueKey}
                ItemSeparatorComponent={this._separator}
                renderItem={({item}) => this.renderBookRecommenList(item)} />
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    recommendationList: {
        width: '100%',
        padding: 5
    },
    bookList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      padding: 10
    }
});
