import React, { Component } from 'react';
import {
    Dimensions
} from 'react-native';

// 屏幕 适配
const BASE_WIN_HEIGHT = 667;
const BASE_WIN_WIDTH = 375;

// 主题色
const APP_THIEF_COLOR = '#DD2219'

// 当前设备的宽高
var CURRENT_WIN_WIDTH = Dimensions.get('window').width;
var CURRENT_WIN_HEIGHT = Dimensions.get('window').height;
// alert(Dimensions.get('window').width);

// 图片公共地址头
const IMG_BASE_URL = 'http://statics.zhuishushenqi.com'

export {
    BASE_WIN_HEIGHT,
    BASE_WIN_WIDTH,
    CURRENT_WIN_HEIGHT,
    CURRENT_WIN_WIDTH,
    IMG_BASE_URL,
    APP_THIEF_COLOR
}