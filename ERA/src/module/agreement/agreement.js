import Vue from 'vue'
import "babel-polyfill"
import App from './agreement.vue'

// import 'element-ui/lib/theme-chalk/index.css'
// import ElementUI from 'element-ui'
// Vue.use(ElementUI)

// import axios from 'axios'
// Vue.prototype.$http = axios
// axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})
