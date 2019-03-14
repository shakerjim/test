import Vue from 'vue'
import "babel-polyfill"
import App from './staff.vue'

// import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import '../../theme/index.css'
Vue.use(ElementUI)
import axios from "../../lib/http"
// import axios from 'axios'
// import '../../lib/fetch'
Vue.prototype.$http = axios
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

import "../../font/iconfont.css"
import router from "./router/router"

// import i18n from "../../lang";
import i18n from '../../i18n/i18n';
import VueQuillEditor from 'vue-quill-editor'
import '../../lib/css.css'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */ )

import Vuex from 'vuex'
import store from './vuex/store'
Vue.use(Vuex)
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
