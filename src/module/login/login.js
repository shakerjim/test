import Vue from 'vue'
import "babel-polyfill"
import App from './login.vue'

import '../../theme/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import axios from "../../lib/http"
// import axios from 'axios'
import '../../lib/fetch'
Vue.prototype.$http = axios
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
import "../../font/iconfont.css"
// import i18n from "../../lang";
import i18n from '../../i18n/i18n';
import router from "./router/router"
//自定义指令
Vue.directive('focusNextOnEnter', {
  bind: function (el, {
    value
  }, vnode) {
    el.addEventListener('keyup', (ev) => {
      if (ev.keyCode === 13) {
        let nextInput = vnode.context.$refs[value]
        if (nextInput && typeof nextInput.focus === 'function') {
          nextInput.focus()
          // nextInput.select()
        }
      }
    })
  }
})
new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
