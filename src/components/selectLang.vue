<template>
  <div class="el-langselect">
    <el-dropdown
      trigger="click"
      @command="handleSetLanguage"
    >
      <div class="el-langselect__box">
        <i class="el-icon-my-diqiu">{{$t('ics.email.lang')}}</i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          command="zh"
          :disabled="language === 'zh'"
        >{{$t('ics.email.cn')}}</el-dropdown-item>
        <el-dropdown-item
          command="en"
          :disabled="language === 'en'"
        >{{$t('ics.email.en')}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "langselect",
  data() {
    return {
      language: ""
    };
  },
  created() {
    this.getLang();
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      Cookies.set("language", lang);
      // this.$store.dispatch("setLanguage", lang);
      // const message = this.$t("app.switchlang");
      this.$message({
        type: "success",
        message: this.$t("app.switchlang")
      });
      this.getLang();
      this.$router.go(0);
    },
    getLang() {
      this.language = Cookies.get("language") || "en";
    }
  }
};
</script>
<style scoped>
.el-dropdown-menu {
  transform: translateX(90px);
}
.el-icon-my-diqiu {
  /* font-size: 24px; */
  color: #fff;
}
.el-langselect {
  float: right;
  margin-left: 40px;
}
</style>


