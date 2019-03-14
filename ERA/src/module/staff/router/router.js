//1. 导入Vue模块
import Vue from "vue"

//4. 导入路由插件 vue-router
import VueRouter from "vue-router"

//5. 将VueRouter和Vue关联起来
Vue.use(VueRouter);


// 导入相应的组件文件
import manage from "../staffcomp/manage.vue"
import managedetail from "../staffcomp/managedetail.vue"

export default new VueRouter({
  routes: [{
      path: "/",
      redirect: '/manage'
    },
    {
      path: "/manage",
      component: manage
    },
    {
      path: "/managedetail",
      component: managedetail,
    },
  ]
})
