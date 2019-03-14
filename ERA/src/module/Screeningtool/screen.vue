<template>
  <div>
    <el-container>
      <!--头部-->
      <Senheader
        :sellerName="sellerName"
        @showisCollapse="isCollapsehand"
      />
      <el-container class="mainbox">
        <!--侧边栏-->
        <el-aside>
          <el-menu
            default-active="6"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
          >
            <el-menu-item
              index="1"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_NEWS')"
            >
              <a href="./news.html">
                <i class="el-icon-my-fangzi"></i>{{$t('sidebar.news')}}
                <span class="el-icon-caret-left"></span>

              </a>
              <!-- <span class="el-icon-caret-left"></span> -->
            </el-menu-item>
            <el-menu-item
              index="2"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_SELLER__MANAGEMENT')"
            >
              <a href="./sale.html">
                <i class="el-icon-my-sale"></i>{{$t('sidebar.saleSystem')}}
                <span class="el-icon-caret-left"></span>
              </a>
            </el-menu-item>
            <el-menu-item
              index="3"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_COMPANY_MANAGEMENT')"
            >
              <a href="./bussiness.html">
                <i class="el-icon-my-icon-test"></i>{{$t('sidebar.businessSystem')}}</a>
              <span class="el-icon-caret-left"></span>
            </el-menu-item>
            <el-menu-item
              index="4"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_POSITION_MANAGEMENT')"
            >
              <a href="./position.html">
                <i class="el-icon-my-caidan"></i>{{$t('sidebar.recruitSystem')}}</a>
              <span class="el-icon-caret-left"></span>
            </el-menu-item>
            <el-menu-item
              index="5"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_EMPLOYEE_MANAGEMENT')"
            >
              <a href="./staff.html">
                <i class="el-icon-my-yuangongguanli"></i>{{$t('sidebar.staffSystem')}}</a>
              <span class="el-icon-caret-left"></span>
            </el-menu-item>
            <el-menu-item
              index="6"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_RESUME_FILTER_TOOL')"
            >
              <a href="./screen.html">
                <i class="el-icon-my-weibiaoti4"></i>{{$t('sidebar.screenTool')}}</a>
              <span class="el-icon-caret-left"></span>
            </el-menu-item>
            <el-menu-item
              index="7"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_TALENT')"
            >
              <a href="./talent.html">
                <i class="el-icon-my-085shucezhongxin"></i>{{$t('sidebar.talentPool')}}</a>
              <span class="el-icon-caret-left"></span>
            </el-menu-item>
            <el-menu-item
              index="8"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_PERSONAL_EVALUATION')"
            >
              <a href="./ics.html">
                <i class="el-icon-my-fenxi1"></i>{{$t('sidebar.ics')}}</a>
              <span class="el-icon-caret-left"></span>
            </el-menu-item>
            <el-menu-item
              index="9"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_JOB_EVALUATION')"
            >
              <a href="./prp.html">
                <i class="el-icon-my-tongji"></i>{{$t('sidebar.prp')}}</a>
              <span class="el-icon-caret-left"></span>
            </el-menu-item>
            <el-submenu
              index="10"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_SYSTEM')"
            >
              <template slot="title">
                <i class="el-icon-my-guanlishitu"></i>
                <span>{{$t('sidebar.systemManagement')}}</span>
                <span class="el-icon-caret-left"></span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="10-1"
                  v-if="this.$store.state.Privilege.includes('SIDERBAR_SYSTEM_USER')"
                >
                  <a href="./system.html#/account">{{$t('sidebar.accountManagement')}}
                    <i class="el-icon-arrow-right"></i>
                  </a>
                </el-menu-item>
                <el-menu-item
                  index="10-2"
                  v-if="this.$store.state.Privilege.includes('SIDERBAR_SYSTEM_MAIL')"
                >
                  <a href="./system.html#/mailmodel">{{$t('sidebar.emailModel')}}
                    <i class="el-icon-arrow-right"></i>
                  </a>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item
              index="11"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_EVALUATION_ANALYSIS')"
            >
              <a href="./analyse.html">
                <i class="el-icon-my-msnui-sys-report"></i>{{$t('sidebar.analysisSystem')}}</a>
              <span class="el-icon-caret-left"></span>
            </el-menu-item>
            <el-menu-item
              index="12"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_WXAPP_COMPANY_MANAGEMEN')"
            >
              <a href="./verify.html">
                <i class="el-icon-my-yuangongguanli"></i>证书审核</a>
              <span class="el-icon-caret-left"></span>
            </el-menu-item>
            <el-menu-item
              index="13"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_WXAPP_EXPORT_REPORT')"
            >
              <a href="./minipdf.html">
                <i class="el-icon-my-print"></i>小程序测评</a>
              <span class="el-icon-caret-left"></span>
            </el-menu-item>
            <el-menu-item
              index="14"
              v-if="this.$store.state.Privilege.includes('SIDERBAR_EVALUATION_ANALYSIS')"
            >
              <a href="./code.html">
                <i class="el-icon-mobile-phone"></i>{{$t('sidebar.code')}}</a>
              <span class="el-icon-caret-left"></span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!--主体部分-->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <!-- <el-container>
            <el-footer></el-footer>
          </el-container> -->
    </el-container>
  </div>
</template>
<script>
import api from "../../api/api.js";
import Senheader from "../../components/senheader";
export default {
  data() {
    return {
      sellerName: "",
      num: "",
      isCollapse: true
    };
  },
  components: {
    Senheader
  },
  created() {
    if (this.$route.path == "/account") {
      this.num = "10-1";
    } else {
      this.num = "10-2";
    }
    // console.log(this.$route.path);
    this.setWeb();
    this.findPrivilege();
    this.sellerName = localStorage.getItem("sellerName");
    this.isCollapsehand();
  },
  methods: {
    findPrivilege() {
      this.$http.post(api.user.findPrivilege()).then(
        res => {
          if (res.data.code == "00") {
            console.log(res);
            this.$store.state.Privilege = res.data.data;
          }
          if (res.data.code == "500") {
            location.href = "./login.html";
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    setWeb() {
      localStorage.setItem("web", window.location.href); //设置name为panda
    },
    isCollapsehand(data) {
      // console.log(data)
      this.isCollapse = data
        ? JSON.parse(data)
        : JSON.parse(localStorage.getItem("isCollapse"));
    }
  }
};
</script>
<style>
html {
  zoom: 0.75;
}

/* .el-header {
  min-width: 1520px;
} */
</style>

  