<template>
  <el-header>
    <div class="logopic">
      <a href="./news.html"> <img
          :src="imgurl"
          alt="logo"
        ></a>
    </div>
    <div class="systitle">
      <span>
        {{$t('login.name')}}
      </span>
      <i class="el-icon-view" @click="expandmeau"></i>
    </div>

    <div class="personout">
      <!-- <div> -->
      <!-- <i class="el-icon-view"></i> -->
      <!-- </div> -->
      <selectlang />
      <i
        class="el-icon-my-tuichu"
        @click="logout"
      ></i>
      <div class="sellerName">{{sellerName}}</div>
      <i class="el-icon-my-wutouxiang"></i>
    </div>
    <div class="telllink">
      <span>{{$t('sidebar.hotlink')}} :</span>
      <span>8621-68405627</span>
    </div>

  </el-header>
</template>
<script>
import api from "../api/api.js";
import selectlang from "./selectLang";
export default {
  name: "senheader",
  data() {
    return {
      imgurl: require("../assets/logoIcon.png"),
      isCollapse:true
    };
  },
  components: {
    selectlang
  },
  props: ["sellerName"],
  created() {
    this.isCollapse=localStorage.getItem('isCollapse')?JSON.parse(localStorage.getItem('isCollapse')):true
  },
  methods: {
    logout() {
      this.$confirm(
        this.$t("login.tip.sureLoginout"),
        this.$t("login.tip.title"),
        {
          type: "warning"
        }
      )
        .then(() => {
          this.$http.post(api.logout.logout()).then(
            res => {
              console.log(res);
              if (res.data.code == "00") {
                location.href = "./login.html";
              }
            },
            error => {
              console.log(error);
            }
          );
        })
        .catch(() => {});
    },
    expandmeau(){
      this.isCollapse=!this.isCollapse;
      localStorage.setItem('isCollapse',this.isCollapse)
      this.$emit('showisCollapse',localStorage.getItem('isCollapse')||this.isCollapse)
    }
  }
};
</script>
<style scoped>
.telllink {
  float: right;
  font-size: 16px;
  margin-right: 30px;
}
.personout {
  float: right;
}
.logopic img {
  width: 100%;
}
.el-icon-view{
  cursor: pointer;
}
</style>

