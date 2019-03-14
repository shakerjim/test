//1. 导入Vue模块
import Vue from "vue"

//4. 导入路由插件 vue-router
import VueRouter from "vue-router"

//5. 将VueRouter和Vue关联起来
Vue.use(VueRouter);


// 导入相应的组件文件
import icsdetail from "../icscomp/icsdetail.vue"
import icsperson from "../icscomp/icsperson.vue"



export default new VueRouter({
  routes: [{
      path: "/",
      redirect: '/icsperson'
    },
    {
      path: "/icsperson",
      component: icsperson
    },
    {
      path: "/icsdetail",
      component: icsdetail,
    },
  ]
})
