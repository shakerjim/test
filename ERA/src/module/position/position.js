import Vue from 'vue'
import "babel-polyfill"
import App from './position.vue'

// import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import '../../theme/index.css'

Vue.use(ElementUI)

import axios from "../../lib/http"
// import '../../lib/fetch'
Vue.prototype.$http = axios
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post["lang"] = localStorage.getItem('lang')?localStorage.getItem('lang'):"en_US";
import "../../font/iconfont.css"
import router from "./router/router"
import VueQuillEditor from 'vue-quill-editor'
import '../../lib/css.css'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import i18n from "../../lang";
import i18n from '../../i18n/i18n';
Vue.use(VueQuillEditor, /* { default global options } */ )
import Cookies from "js-cookie";
import Vuex from 'vuex'
import store from './vuex/store'
Vue.use(Vuex)
Vue.filter('EnprovinceName', function (item) {
  if (Cookies.get("language") == 'zh') {
    return item.provinceName
  } else {
    return item.provinceNameEn
  }
})
Vue.filter('EncityName', function (item) {
  if (Cookies.get("language") == 'zh') {
    return item.cityName
  } else {
    return item.cityNameEn
  }
})
Vue.filter('EnareaName', function (item) {
  if (Cookies.get("language") == 'zh') {
    return item.areaName
  } else {
    return item.areaNameEn
  }
})
Vue.filter('EntradeName', function (item) {
  if (Cookies.get("language") == 'zh') {
    return item.tradeName
  } else {
    return item.tradeNameEn
  }
})
Vue.filter('EnjobName', function (item) {
  if (Cookies.get("language") == 'zh') {
    return item.jobName
  } else {
    return item.jobNameEn
  }
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
