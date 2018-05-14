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
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { IMG_BASE_URL } from '../../config/global.js'

export default class BookReviewList extends Component {
    constructor(props){
        super(props);
        this.state={

        }
        this.renderXing = this.renderXing.bind(this);
        this.clickReviewItem = this.clickReviewItem.bind(this);
    }

    renderXing(num){
        let xing = []
        for(let i=0;i<num;i++){
            xing.push(
                <Icon 
                name={'star'}
                key={'xing' + i}
                style={{color: '#DD2219', marginRight: 20}}
                size={15} />
            )
        }
        return xing
    }

    clickReviewItem(ReviewItemData){
        if(this.props.clickReviewItem){
            this.props.clickReviewItem(ReviewItemData);
        }
    }

  render() {
    const ReviewItemData = this.props.ReviewItemData;
    console.log(ReviewItemData);
    return (
        <TouchableOpacity style={{flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'flex-start',marginBottom: 10,marginTop: 10}} onPress={(item)=>this.clickReviewItem(ReviewItemData)}>
            <Image
            style={{width: 50,height: 50,borderRadius: 25,marginTop: 10}}
            source={ReviewItemData.author.avatar ? {uri: IMG_BASE_URL + ReviewItemData.author.avatar} : require('../../common/images/2.jpg')}/>
            <View style={{marginLeft: 15,flex: 1}}> 
                <Text style={{color: '#D4AF37'}}>{ReviewItemData.author.nickname}</Text>
                <Text numberOfLines={1} style={{color: '#333',paddingTop: 5,}}>{ReviewItemData.title}</Text>
                <Text style={styles.reviewRating}>{this.renderXing(ReviewItemData.rating)}   
                </Text>
                <Text numberOfLines={2} style={styles.reviewContent}>{ReviewItemData.content}</Text>
                <View style={styles.reviewLike}>
                    <Icon 
                    name={'thumbs-o-up'}
                    style={{color: '#aaa'}}
                    size={15} />
                    <Text style={{marginLeft: 5,fontSize: 12,}}>{ReviewItemData.likeCount}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    reviewContent:{
        color: '#aaa',
        fontSize: 12,
        marginTop: 5
    },
    reviewRating: {
        paddingTop: 5,
    },
    reviewLike:{
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    }
});
