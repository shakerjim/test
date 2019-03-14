import axios from 'axios'
import Vue from 'vue'
import Cookies from "js-cookie";
var vue = new Vue; // 实例化一个新的vue对象，用于绑定toast插件


// axios默认配置
//axios.defaults.timeout = 5000;          // 超时时间
// **路由请求拦截**
// http request 拦截器
axios.interceptors.request.use(
  config => {
    //config.data = JSON.stringify(config.data);  
    config.headers.lang = Cookies.get("language")=="zh"?"zh_CN":"en_US"
    // console.log(config)
    // axios.defaults.withCredentials = true;
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    //判断是否存在ticket，即判断用户是否登录，如果存在的话，则每个http header都加上ticket

    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// **路由响应拦截**
// http response 拦截器
// axios.interceptors.response.use(
//   response => {

//   },
//   error => {
//     return Promise.reject(error.response)   // 返回接口返回的错误信息
//   });
export default axios;
