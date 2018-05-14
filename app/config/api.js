/**
 * Created by dongtao on 2018/3/7.
 */
/**
 * React-Native Fatch网络请求工具类
 * Songlcy create
 * params:请求参数
 * ES6 Promise 使用
 * resolve 成功时候返回
 * reject 失败时候返回
 */

// 请求地址 BASE_URL 
const API_BASE_URL = 'http://api.zhuishushenqi.com' // 线上
// const API_BASE_URL = 'http://api.douban.com' // 线上
// const API_BASE_URL = '' // 测试
// const API_BASE_URL = '' // 本地


// let token = ''; 

// export const fetchRequest = async (url, method, params = '') => {
//     let header = {
//         "Content-Type": "application/json;charset=UTF-8",
//         "accesstoken":token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
//     };
//     console.log('request url:',url,params);  //打印请求参数
//     if(params == ''){   //如果网络请求中没有参数
//         return new Promise(function (resolve, reject) {
//             fetch(API_BASE_URL + url, {
//                 method: method,
//                 headers: header
//             }).then((response) => response.json())
//                 .then((responseData) => {
//                     console.log('res:',url,responseData);  //网络请求成功返回的数据
//                     resolve(responseData);
//                 })
//                 .catch((err) => {
//                     console.log('err:',url, err);     //网络请求失败返回的数据        
//                     reject(err);
//                 });
//         });
//     }else{   //如果网络请求中带有参数
//         return new Promise(function (resolve, reject) {
//             fetch(API_BASE_URL + url, {
//                 method: method,
//                 headers: header,
//                 body:JSON.stringify(params)   //body参数，通常需要转换成字符串后服务器才能解析
//             }).then((response) => response.json())
//                 .then((responseData) => {
//                     console.log('res:',url, responseData);   //网络请求成功返回的数据
//                     resolve(responseData);
//                 })
//                 .catch( (err) => {
//                     console.log('err:',url, err);   //网络请求失败返回的数据  
//                     reject(err);
//                 });
//         });
//     }
// }

const paramsQs = (url, params) => {
    if(params) {
      let paramsStr = '';
      for (var key in params) {
        paramsStr += '&' + key + '=' + params[key]
      }
      paramsStr = paramsStr.replace(/&/, '?') 
      return API_BASE_URL + url + paramsStr
    } else {
      return API_BASE_URL + url
    }
  }
  
  export const Request = async (url, params, s_key) => {
    try {
      let response = await fetch(paramsQs(url, params));
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.warn(error)
    }
  }

export default {
    // 获取搜索热词
    getHotWords(param){
        return Request('/book/search-hotwords');
    },
    // 通过搜索关键字获取小说列表
    getBookListBySearchName(param){
      return Request('/book/fuzzy-search',param);
    },
    // 主题书单 列表
    getThimeBookList() {
      return Request('/book-list');
    },
    // 获取排行榜类型 列表
    getLeaderboardType() {
      return Request('/ranking/gender');
    },
    // 获取排行榜各类型小说列表
    getBookListByLeaderboardType(param) {
      return Request('/ranking/'+ param);
    },
    // 获取所有分类
    getAllCategories() {
      return Request('/cats/lv2/statistics');
    },
    // 获取书本详细信息
    getBookDetail(param){
      return Request('/book/'+ param);
    },
    // 获取书本热门评论
    getBookHotReview(param){
      return Request('/post/review/best-by-book',param);
    },
    // 获取推荐书单
    getBookRecommendation(Recommen_id,param){
      return Request('/book-list/' + Recommen_id + '/recommend',param);
    },
    // 获取书本的章节目录
    getBookChapters(book_id,param){
      return Request('/mix-atoc/' + book_id,param);
    }
    
}