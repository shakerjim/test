import axios from 'axios'

// Vue.prototype.$http = axios
// axios.defaults.withCredentials = true;

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';


// // 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   //在发送请求之前做某事
//   return config;
// }, function (error) {
//   //请求错误时做些事
//   return Promise.reject(error);
// });

// //添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   //对响应数据做些事
//   return response;
// }, function (error) {
//   //请求错误时做些事
//   return Promise.reject(error);
// });

let pending = []
let CancelToken = axios.CancelToken
let removePending = (config, f) => {
  let flagUrl = config.url + '&' + config.method
  if (pending.indexOf(flagUrl) !== -1) {
    if (f) {
      f() // 执行取消操作
    } else {
      pending.splice(pending.indexOf(flagUrl), 1) // 把这条记录从数组中移除
    }
  } else {
    if (f) {
      pending.push(flagUrl)
    }
  }
}
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      console.log('我是拦截')
      config.cancelToken = new CancelToken((c) => {
        removePending(config, c)
      })
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.config.method === 'post') {
      removePending(response.config)
    }
    return response
  },
  error => {
    pending = []
    return {
      data: {
        error: error
      }
    } // 返回接口返回的错误信息
  })
