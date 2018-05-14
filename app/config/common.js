/*
 * description: the config of app
 * author: 麦芽糖
 * time: 2017年03月12日19:45:10
 */

'use strict'

import {
    Platform
} from 'react-native'
import { CURRENT_WIN_HEIGHT, CURRENT_WIN_WIDTH } from './global.js'

const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 24)
const header_height = (Platform.OS === 'ios' ? 70 : 74)

module.exports = {
  css: {
    boxColor: ['#90C5F0', '#91CED5', '#F88F55', '#C0AFD0', '#E78F8F', '#67CCB7', '#F6BC7E']
  },
  FUNCTION: {
    /*
    * description: 获取min-max之间的一个随机整数数
    * author: 麦芽糖
    * time: 2018.03.08
    */
    getRandom: function(min,max){
      var r = Math.random() * (max - min);
      var re = Math.round(r + min);
      re = Math.max(Math.min(re, max), min)
      return re;
    },
    contentFormat: function(content){
      let fontCount = parseInt(CURRENT_WIN_WIDTH / 17 - 1)
      let fontLines = parseInt((CURRENT_WIN_HEIGHT - 100) / 34)
      const length = content.length
      let array = []
      let x = 0, y, m = 0
      while (x < length) {
        let _array = []
        for (var i = 0; i <= fontLines; i++) {
          let str = content.substring(x, x + fontCount)
          if (str.indexOf('@') != -1) {
            y = x + str.indexOf('@') + 1
            _array[i] = content.substring(x, y).replace('@', '')
            x = y
            continue
          } else {
            y = x + fontCount
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
        }
        array[m] = _array
        m++
      }
      return array
    },
    // 获取当前时间
    currentDate: function(){
      let temp = new Date()
      var h = temp.getHours()
      var minute = temp.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      return h + ':' + minute
    }
  }
}