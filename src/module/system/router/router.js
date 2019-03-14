//1. 导入Vue模块
import Vue from "vue"

//4. 导入路由插件 vue-router
import VueRouter from "vue-router"

//5. 将VueRouter和Vue关联起来
Vue.use(VueRouter);


// 导入相应的组件文件
import account from "../subcomp/account.vue"
// import user from "../subcomp/user.vue"
import mailmodel from "../subcomp/mailmodel.vue"


export default new VueRouter({
  routes: [{
      path: "/",
      redirect: '/account'
    },
    {
      path: "/account",
      component: account
    },
    {
      path: "/mailmodel",
      component: mailmodel
    },

  ]
})
