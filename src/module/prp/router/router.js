//1. 导入Vue模块
import Vue from "vue"

//4. 导入路由插件 vue-router
import VueRouter from "vue-router"

//5. 将VueRouter和Vue关联起来
Vue.use(VueRouter);


// 导入相应的组件文件
import prpdetail from "../prpcomp/prpdetail.vue"
import prpperson from "../prpcomp/prpperson.vue"
// import prpsearch from "../prpcomp/prpsearch.vue"

export default new VueRouter({
  routes: [{
      path: "/",
      redirect: '/prpperson'
    },
    {
      path: "/prpperson",
      component: prpperson
    },
    {
      path: "/prpdetail",
      component: prpdetail
    },
    // {
    //   path: "/prpsearch",
    //   component: prpsearch
    // },

  ]
})
