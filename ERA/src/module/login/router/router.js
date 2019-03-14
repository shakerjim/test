//1. 导入Vue模块
import Vue from "vue"

//4. 导入路由插件 vue-router
import VueRouter from "vue-router"

//5. 将VueRouter和Vue关联起来
Vue.use(VueRouter);


// 导入相应的组件文件
import index from "../logincomp/index.vue"
import indexfree from "../logincomp/indexfree.vue"
import newpwd from "../logincomp/newpwd.vue"
import register from "../logincomp/register.vue"
import expire from "../logincomp/expire.vue"
import noregister from "../logincomp/noregister.vue"
import actived from "../logincomp/actived.vue"
import success from "../logincomp/success.vue"
import pwdsuccess from "../logincomp/pwdsuccess.vue"
import Invalid from "../logincomp/Invalid.vue"

export default new VueRouter({
  routes: [{
      path: "/",
      redirect: '/index'
    },
    {
      path: "/index",
      component: index
    },
    {
      path: "/indexfree",
      component: indexfree
    },
    {
      //新密码
      path: "/newpwd",
      component: newpwd,
    },
    {
      //邮件注册
      path: "/register",
      component: register,
    },
    {
      path: "/expire",
      component: expire,
    },
    {
      // 未登录
      path: "/noregister",
      component: noregister,
    },
    {
      // 成功
      path: "/success",
      component: success,
    },
    {
      // 激活
      path: "/actived",
      component: actived,
    },
    {
      // 激活
      path: "/Invalid",
      component: Invalid,
    },
    {
      // 密码修改成功
      path: "/pwdsuccess",
      component: pwdsuccess,
    },
  ]
})
