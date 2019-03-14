<template>
  <div>
    <div class="container_box">
      <div class="page_error_msg returnlink">
        <div class="inner">
          <span class="icon_wrp">
            <i class="icon_page_error"></i>
          </span>
          <div class="msg_content">

            <h2>{{$t('login.email.loading')}}

            </h2>
            <div class="download"></div>
            <!-- <img src="../image/downloading.gif" alt=""> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
export default {
  data() {
    return {};
  },
  created() {
    this.checkRegister();
  },
  methods: {
    checkRegister() {
      console.log(this.$route.query.code);
      this.$http
        .post(
          api.register.checkRegister(),
          formatUrl({ code: this.$route.query.code })
        )
        .then(
          res => {
            if (res.data.code == "00") {
              location.href = "./login.html#/success";
            }
            if (res.data.code == "500") {
              if (res.data.errMessage == "邮箱已经激活，可直接登录！") {
                location.href = "./login.html#/actived";
              } else if (res.data.errMessage == "邮箱激活过期，请重新注册！") {
                location.href = "./login.html#/expire";
              } else if (res.data.errMessage == "邮箱尚未注册，请前往注册！") {
                location.href = "./login.html#/noregister";
              } else {
                location.href = "./login.html#/Invalid";
              }
            }
          },
          error => {
            console.log(error);
          }
        );
    }
  }
};
</script>






<style>
.container_box {
  /* margin: 200px auto; */
  /* text-align: center; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.icon_page_error {
  background: url("../image/link.png") 0 0 no-repeat;
  width: 160px;
  height: 120px;
  vertical-align: middle;
  display: inline-block;
}
.returnlink h2 {
  position: absolute;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
}
.msg_content {
  position: relative;
}
.download {
  position: absolute;
  background: url("../image/downloading.gif") 0 0 no-repeat;
  width: 40px;
  height: 40px;
  background-size: cover;
  left: 70%;
  margin-top: 3px;
}
img {
  width: 50px;
}
</style>