<template>
  <div class="app">

    <div class="lang">
      <el-button type="primary" @click="backhome">Home Page</el-button>
      <langselect />
    </div>
    <div class="toptitle">
      <div class="logoIcon">
        <img
          src="../image/logo.png"
          alt=""
        >
      </div>
      <!-- <h3 class="title">Centalent</h3> -->
      <p>{{$t('login.name')}}</p>
    </div>
    <el-tabs
      type="border-card"
      class="indexTab"
      v-model="activeName"
    >
      <el-tab-pane
        :label="$t('login.landing')"
        class="loginTab"
        name="first"
      >
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          :rules="rules"
          label-width="40px"
          class="demo-ruleForm"
        >
          <!-- <h3 class="title">CENTALENT系统登录</h3> -->
          <el-form-item prop="mail">
            <el-input
              prefix-icon="el-icon-my-yonghu"
              auto-complete="on"
              v-model.trim="ruleForm.mail"
              v-focus-next-on-enter="'inputpass'"
              ref="inputmail"
              :placeholder="$t('login.username')"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-my-mima"
              v-model.trim="ruleForm.password"
              @keyup.enter.native="handleSubmit('ruleForm')"
              ref="inputpass"
              type="password"
              :placeholder="$t('login.password')"
            ></el-input>
          </el-form-item>
          <el-form-item class="passlink">
            <el-checkbox
              v-model="rememberchecked"
              class="remember"
            >{{$t('login.remember')}}</el-checkbox>
            <el-button
              type="text"
              class="forgetPass"
              @click="openforget('forgetForm')"
            >{{$t('login.forgetpwd')}}</el-button>
          </el-form-item>

          <el-form-item class="Tbutton">
            <el-button
              type="primary login"
              :loading="logining"
              @click.native.prevent="handleSubmit('ruleForm')"
            >{{ $t('login.loginbtn')}}</el-button>
            <!-- <el-button class="register" @click="openregister('registerform')">注册</el-button> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane
        :label="$t('login.register')"
        class="registerTab"
        name="second"
      >
        <el-form
          :model="registerform"
          ref="registerform"
          :rules="registerformrules"
          status-icon
        >

          <el-form-item
            :label="$t('login.useremail')"
            :label-width="formLabelWidth"
            prop="mail"
          >
            <el-input
              v-model.trim="registerform.mail"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('login.password')"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              v-model="registerform.password"
              auto-complete="off"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('login.confirm_passwrd')"
            :label-width="formLabelWidth"
            prop="checkpass"
          >
            <el-input
              v-model="registerform.checkpass"
              auto-complete="off"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('login.personname')"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model.trim="registerform.name"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('login.link')"
            :label-width="formLabelWidth"
            prop="phone"
          >
            <el-input
              v-model.trim="registerform.phone"
              auto-complete="off"
              :blur="setphonechange(registerform.phone)"
              v-on:change="phonechange"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('login.code')"
            :label-width="formLabelWidth"
            prop="shortMsgCode"
            class="phonecode"
          >
            <el-input
              auto-complete="off"
              v-model.trim="registerform.shortMsgCode"
            >
              <el-button
                slot="append"
                v-show="sendAuthCode"
                @click="getAuthCode('registerform')"
                class="auth_text_green"
              >
                <span>{{$t('login.freeCode')}} </span>
              </el-button>
              <el-button
                slot="append"
                v-show="!sendAuthCode"
              >
                <span class="auth_text_blue">{{auth_time}} </span> {{$t('login.resend')}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item
            :label="$t('login.companyName')"
            :label-width="formLabelWidth"
            prop="company"
          >
            <el-input
              v-model.trim="registerform.company"
              auto-complete="off"
            ></el-input>
          </el-form-item>

          <el-form-item :label-width="formLabelWidth">
            <el-checkbox
              v-model="checked"
              class="remember"
            >{{$t('login.agree')}}</el-checkbox>
            <el-button
              type="text"
              @click="agreementLink"
              class="agreementLink"
            >
              {{$t('login.agreement')}}
            </el-button>
          </el-form-item>
          <el-button
            type="success"
            @click="registerAccount('registerform')"
            :disabled="checked==true?false:true"
            class="registerButton besure"
            :loading="isShowloading"
          >{{$t('btn.sure')}}</el-button>
          <el-button
            @click="cancelRegister('registerform')"
            class="registerButton cancel"
          >{{ $t('btn.cancel')}}</el-button>
        </el-form>
      </el-tab-pane> -->

    </el-tabs>
    <!-- 忘记密码 -->

    <el-dialog
      :visible.sync="forgetFormdialog"
      width="460px"
      center
      :lock-scroll="false"
      :close-on-click-modal="false"
      class="mailForget"
    >
      <el-form
        :model="forgetForm"
        ref="forgetForm"
        :rules="forgetFormrules"
      >
        <el-form-item
          :label="$t('login.useremail')"
          :label-width="formLabelWidth"
          prop="mail"
        >
          <el-input
            v-model="forgetForm.mail"
            auto-complete="off"
            :placeholder="$t('valid.userplaceholder')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="sendemail('forgetForm')"
          class="registerButton besure"
        >{{$t('btn.sure')}}</el-button>
        <el-button
          @click="forgetFormdialog = false"
          class="registerButton cancel"
        >{{ $t('btn.cancel')}}</el-button>
      </div>
    </el-dialog>
    <!-- <el-form-item label="公司类型" :label-width="formLabelWidth" prop="isHunter">
                                                    <el-select v-model="registerform.isHunter" placeholder="请选择公司类型">
                                                      <el-option label="普通公司" value="1"></el-option>
                                                      <el-option label="猎头公司" value="0"></el-option>
                                                    </el-select>
                                                  </el-form-item> -->
  </div>
</template>
<script>
import langselect from "../../../components/selectLang";
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
export default {
  components: {
    langselect
  },
  data() {
    var checkphone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error(this.$t("valid.inputlink")));
      } else {
        if (!/^1[3|4|5|7|8|9][0-9]{9}$/.test(value)) {
          callback(new Error(this.$t("valid.valid020")));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.againpassword")));
      } else if (value !== this.registerform.password) {
        callback(new Error(this.$t("valid.valid021")));
      } else {
        callback();
      }
      // console.log("1" + value);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.pwdplaceholder")));
      } else {
        if (this.registerform.checkpass !== "") {
          this.$refs.registerform.validateField("checkpass");
        }
        callback();
      }
      // console.log("2" + value);
    };
    return {
      isShowloading: false,
      activeName: "first",
      sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
      auth_time: 0 /*倒计时 计数器*/,
      webhref: "",
      rememberchecked: false,
      checked: false,
      logining: false,
      ruleForm: {},
      rules: {
        mail: [
          {
            required: true,
            message: this.$t("valid.userplaceholder"),
            trigger: "blur"
          },
          { type: "email", message: this.$t("valid.valid022"), trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: this.$t("valid.pwdplaceholder"),
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: this.$t("valid.valid023"),
            trigger: "blur"
          },
          {
            pattern: /^(\w){6,30}$/,
            message: this.$t("valid.valid024"),
            trigger: "blur"
          }
        ]
      },
      registerform: {
        password: "",
        checkpass: "",
        name: "",
        mail: "",
        phone: "",
        shortMsgCode: "",
        company: "",
        isHunter: ""
      },
      registerformrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.inputName"),
            trigger: "blur"
          },
          {
            required: true,
            message: this.$t("valid.inputName"),
            trigger: "change"
          }
        ],
        mail: [
          {
            required: true,
            message: this.$t("valid.userplaceholder"),
            trigger: "blur"
          },
          {
            required: true,
            type: "email",
            message: this.$t("valid.valid022"),
            trigger: "blur"
          },
          {
            required: true,
            type: "email",
            message: this.$t("valid.valid022"),
            trigger: "change"
          }
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          // { validator: validatePass, trigger: "change" },
          // { required: true, message: "请输入密码", trigger: "blur" },
          // { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 30,
            message: this.$t("valid.valid023"),
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: this.$t("valid.valid023"),
            trigger: "change"
          },
          {
            pattern: /^(\w){6,30}$/,
            message: this.$t("valid.valid024"),
            trigger: "blur"
          },
          {
            pattern: /^(\w){6,30}$/,
            message: this.$t("valid.valid024"),
            trigger: "change"
          }
        ],
        checkpass: [
          { validator: validatePass2, trigger: "blur" },
          { validator: validatePass2, trigger: "change" }
          // { required: true, message: "请再次输入密码", trigger: "blur" },
          // {
          //   validator: (rule, value, callback) => {
          //     if (value === "") {
          //       callback(new Error("请再次输入密码"));
          //     } else if (value !== this.registerform.password) {
          //       callback(new Error("两次输入密码不一致!"));
          //     } else {
          //       callback();
          //     }
          //   },
          //   trigger: "blur"
          // }
        ],
        phone: [
          // {
          //   required: true,
          //   message: "请输入联系方式",
          //   trigger: "blur"
          // },
          // {
          //   pattern: /^1[3|4|5|7|8|9][0-9]{9}$/,
          //   message: "手机号格式不正确",
          //   trigger: "blur"
          // }
          { validator: checkphone, trigger: "blur" },
          { validator: checkphone, trigger: "change" }
        ],
        shortMsgCode: [
          {
            required: true,
            message: this.$t("valid.inputCode"),
            trigger: "change"
          },
          {
            required: true,
            message: this.$t("valid.inputCode"),
            trigger: "blur"
          }
        ],
        company: [
          {
            required: true,
            message: this.$t("valid.valid002"),
            trigger: "blur"
          },
          {
            required: true,
            message: this.$t("valid.valid002"),
            trigger: "change"
          }
        ],
        isHunter: [
          {
            required: true,
            message: this.$t("valid.valid025"),
            trigger: "change"
          }
        ]
      },
      formLabelWidth: "120px",
      forgetForm: {},
      forgetFormdialog: false,
      forgetFormrules: {
        mail: [
          {
            required: true,
            message: this.$t("valid.userplaceholder"),
            trigger: "blur"
          },
          { type: "email", message: this.$t("valid.valid022"), trigger: "blur" }
        ]
      }
    };
  },
  // computed: {
  //   reverseMessage: function() {
  //     return this.message.split(' ').reverse().join('');
  //   }
  // },
  created() {
    document.title = `${this.$t("login.title")}`;
    if (document.cookie.length > 0) {
      this.rememberchecked = true;
      this.getCookie();
      // setTimeout(console.log(this), 5000);
    }
  },
  methods: {
    backhome(){
      location.href="http://www.era-investment.com"
    },
    setphonechange(value) {
      this.phonechange(value);
    },
    phonechange(value) {
      // 目的是去掉字符串中除数字之外的其它字符
      if (this.registerform.phone) {
        this.$nextTick(() => {
          this.registerform.phone = value.replace(/[^\d]/g, "");
        });
      }
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //判断复选框是否被勾选 勾选则调用配置cookie方法
          if (this.rememberchecked == true) {
            //传入账号名，密码，和保存天数3个参数
            this.setCookie(this.ruleForm.mail, this.ruleForm.password, 7);
          } else {
            this.clearCookie();
          }
          this.logining = true;
          this.$http
            .post(
              api.newlogin.loginByMailAndPassword(),
              formatUrl(this.ruleForm)
            )
            .then(
              res => {
                this.logining = false;
                if (res.data.code == "911") {
                  location.href = "./login.html";
                }
                if (res.data.code == "00") {
                  if (localStorage.getItem("uuid")) {
                    if (localStorage.getItem("uuid") == res.data.data.id) {
                      if (this.webhref) {
                        if (
                          !res.data.data.privilegeCodes.includes(
                            "SIDERBAR_COMPANY_MANAGEMENT"
                          )
                        ) {
                          if (this.webhref.includes("bussiness")) {
                            location.href = "./news.html";
                          } else {
                            location.href = this.webhref
                              ? this.webhref
                              : "./news.html";
                          }
                        } else if (
                          !res.data.data.privilegeCodes.includes(
                            "SIDERBAR_RESUME_FILTER_TOOL"
                          )
                        ) {
                          if (this.webhref.includes("screen")) {
                            location.href = "./news.html";
                          } else {
                            location.href = this.webhref
                              ? this.webhref
                              : "./news.html";
                          }
                        } else if (
                          !res.data.data.privilegeCodes.includes(
                            "SIDERBAR_EVALUATION_ANALYSIS"
                          )
                        ) {
                          if (this.webhref.includes("analyse")) {
                            location.href = "./news.html";
                          } else {
                            location.href = this.webhref
                              ? this.webhref
                              : "./news.html";
                          }
                        } else if (
                          !res.data.data.privilegeCodes.includes(
                            "SIDERBAR_EMPLOYEE_MANAGEMENT"
                          )
                        ) {
                          if (this.webhref.includes("staff")) {
                            location.href = "./news.html";
                          } else {
                            location.href = this.webhref
                              ? this.webhref
                              : "./news.html";
                          }
                        } else {
                          location.href = this.webhref
                            ? this.webhref
                            : "./news.html";
                        }
                      } else {
                        location.href = this.webhref
                          ? this.webhref
                          : "./news.html";
                      }
                    } else {
                      location.href = "./news.html";
                    }
                  } else {
                    location.href = "./news.html";
                    localStorage.removeItem("icsids");
                    localStorage.removeItem("prpids");
                    localStorage.removeItem("poolids");
                  }
                  localStorage.clear();
                  localStorage.setItem("uuid", res.data.data.id);
                  localStorage.setItem("sellerName", res.data.data.name);
                  localStorage.setItem("sign", res.data.data.sign);
                  localStorage.setItem(
                    "loginAccount",
                    res.data.data.loginAccount
                  );
                }
                if (res.data.code == "500") {
                  // if(res)
                  this.$message({
                    type: "error",
                    message: res.data.errMessage
                  });
                }
              },
              error => {
                console.log(error);
              }
            );
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    agreementLink() {
      window.open("./agreement.html");
    },
    cancelRegister(formName) {
      // this.registerform = {};
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    registerAccount(formName) {
      // console.log(this.registerform.phone, this.registerform.phone.length)
      var para = {
        name: this.registerform.name,
        mail: this.registerform.mail,
        password: this.registerform.password,
        phone: this.registerform.phone,
        company: this.registerform.company,
        isHunter: 1
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isShowloading = true;
          this.$http
            .post(
              api.register.saveAppRegisterNew() +
                `?shortMsgCode=${this.registerform.shortMsgCode}`,
              para
            )
            .then(
              res => {
                if (res.data.code == "911") {
                  location.href = "./login.html";
                }
                if (res.data.code == "00") {
                  this.$message({
                    type: "success",
                    message: this.$t("msg1.msg12")
                  });
                  // console.log(res);

                  this.isShowloading = false;
                  this.setCookie(res.data.data.mail, res.data.data.password, 7);
                  this.$http
                    .post(
                      api.newlogin.loginByMailAndPassword(),
                      formatUrl({
                        mail: res.data.data.mail,
                        password: res.data.data.password
                      })
                    )
                    .then(
                      res => {
                        if (res.data.code == "911") {
                          location.href = "./login.html";
                        }
                        if (res.data.code == "00") {
                          localStorage.clear();
                          localStorage.setItem("uuid", res.data.data.id);
                          localStorage.setItem(
                            "sellerName",
                            res.data.data.name
                          );
                          localStorage.setItem("sign", res.data.data.sign);
                          localStorage.setItem(
                            "loginAccount",
                            res.data.data.loginAccount
                          );
                          this.activeName = "first";

                          location.href = "./news.html";
                        }
                        if (res.data.code == "500") {
                          // if(res)
                          this.$message({
                            type: "error",
                            message: res.data.errMessage
                          });
                        }
                      },
                      error => {
                        console.log(error);
                      }
                    );

                  if (this.$refs[formName] !== undefined) {
                    this.$refs[formName].resetFields();
                  }
                  // }
                }
                if (res.data.code == "500") {
                  this.isShowloading = false;
                  this.$message({
                    type: "error",
                    message: res.data.errMessage
                  });
                }
              },
              error => {
                console.log(error);
              }
            );
          // alert("cc");
          console.log(this.registerform);
        } else {
          return false;
        }
      });
    },
    openforget(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.clearCookie();
      this.forgetFormdialog = true;
    },
    sendemail(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              api.user.newPassword(),
              formatUrl({ mail: this.forgetForm.mail })
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  console.log(res);
                  this.$message({
                    type: "success",
                    message: this.$t("msg1.msg13")
                  });
                  this.forgetFormdialog = false;
                }
                if (res.data.code == "500") {
                  this.$message({
                    type: "error",
                    message: res.data.errMessage
                  });
                }
              },
              error => {
                console.log(error);
              }
            );
        } else {
          return false;
        }
      });
    },
    //设置cookie
    setCookie(c_mail, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "mail" + "=" + c_mail + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "mail") {
            this.ruleForm.mail = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "password") {
            this.ruleForm.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    getWeb() {
      this.webhref = localStorage.getItem("web");
    },
    // 邮箱跳转
    //功能：根据用户输入的Email跳转到相应的电子邮箱首页
    gotoEmail($mail) {
      let $t;
      $t = $mail.split("@")[1];
      $t = $t.toLowerCase();
      if ($t == "163.com") {
        return "mail.163.com";
      } else if ($t == "vip.163.com") {
        return "vip.163.com";
      } else if ($t == "126.com") {
        return "mail.126.com";
      } else if ($t == "qq.com" || $t == "vip.qq.com" || $t == "foxmail.com") {
        return "mail.qq.com";
      } else if ($t == "gmail.com") {
        return "mail.google.com";
      } else if ($t == "sohu.com") {
        return "mail.sohu.com";
      } else if ($t == "tom.com") {
        return "mail.tom.com";
      } else if ($t == "vip.sina.com") {
        return "vip.sina.com";
      } else if ($t == "sina.com.cn" || $t == "sina.com") {
        return "mail.sina.com.cn";
      } else if ($t == "tom.com") {
        return "mail.tom.com";
      } else if ($t == "yahoo.com.cn" || $t == "yahoo.cn") {
        return "mail.cn.yahoo.com";
      } else if ($t == "tom.com") {
        return "mail.tom.com";
      } else if ($t == "yeah.net") {
        return "www.yeah.net";
      } else if ($t == "21cn.com") {
        return "mail.21cn.com";
      } else if ($t == "hotmail.com") {
        return "www.hotmail.com";
      } else if ($t == "sogou.com") {
        return "mail.sogou.com";
      } else if ($t == "188.com") {
        return "www.188.com";
      } else if ($t == "139.com") {
        return "mail.10086.cn";
      } else if ($t == "189.cn") {
        return "webmail15.189.cn/webmail";
      } else if ($t == "wo.com.cn") {
        return "mail.wo.com.cn/smsmail";
      } else {
        return "";
      }
    },

    getAuthCode(formName) {
      this.$refs.registerform.validateField("phone", valid => {
        if (!valid) {
          this.$http
            .post(
              api.register.sendMessage(),
              formatUrl({
                phone: this.registerform.phone
              })
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  this.sendAuthCode = false;
                  this.auth_time = 60;
                  var auth_timetimer = setInterval(() => {
                    this.auth_time--;
                    if (this.auth_time <= 0) {
                      this.sendAuthCode = true;
                      clearInterval(auth_timetimer);
                    }
                  }, 1000);
                }
                if (res.data.code == "500") {
                  this.$message({
                    type: "error",
                    message: res.data.errMessage
                  });
                }
              },
              error => {
                console.log(error);
              }
            );
        } else {
          return false;
        }
      });
    }
  },
  //页面加载调用获取cookie值
  mounted() {
    this.getCookie();
    this.getWeb();
  }
};
</script>
<style>
.app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  /* background: url("../image/banner.png") center no-repeat; */
  /* background-size: cover; */
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
}
.lang {
  position: absolute;
  right: 50px;
  top: 50px;
}
.el-tabs--border-card.indexTab {
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 0 auto;
  width: 520px;
  /* padding: 35px 35px 15px 35px; */
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.remember {
  /* margin: 0px 0px 35px 0px; */
  float: left;
  width: 30%;
}

.forgetPass {
  float: right;
}

.Tbutton {
  text-align: center;
}

.login {
  width: 100%;
  float: left;
  background-color: #239639;
  border-color: #239639;
  font-size: 20px;
}

.register {
  float: right;
}

.el-form-item.is-required .el-form-item__label:before {
  display: none;
}

.el-form-item__label {
  text-align: left;
}

.indexTab .el-tabs__nav {
  width: 100%;
}

.indexTab.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  /* width: 50%; */
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: #515151;
  font-family: "Microsoft Yahei";
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.indexTab.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #ffffff;
  background-color: #239739;
  border-right-color: #239739;
  border-left-color: #239739;
}

.indexTab .el-tabs__item {
  height: 60px;
  line-height: 60px;
}

.indexTab.el-tabs--border-card > .el-tabs__header {
  background-color: #fff;
  border-bottom: 3px solid #239639;
}

.indexTab.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  margin: 0;
}

/* .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
  color: #239639;
} */

.loginTab {
  padding: 25px 55px 0 15px;
}

.loginTab .el-form-item {
  margin-bottom: 30px;
}

.loginTab .el-input__inner {
  background-color: #eff5f7;
  height: 57px;
  border-bottom: 2px solid #dee4e8;
  border-radius: 0;
}

.loginTab .el-input__inner:focus {
  background-color: #fff;
  border-color: #fff;
  border-bottom: 2px solid #239639;
}

.indexTab .el-checkbox__inner {
  background-color: #eff5f7;
  width: 26px;
  height: 26px;
}

.indexTab .el-checkbox__label {
  font-size: 16px;
}

.indexTab .el-button--text:focus,
.indexTab .el-button--text:hover {
  color: #0faa00;
}

.indexTab .el-button--text {
  color: #239639;
  font-size: 16px;
}

.agreementLink.el-button--text {
  width: 70%;
}

.indexTab .el-checkbox__input.is-checked .el-checkbox__inner,
.indexTab .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #239639;
  border-color: #239639;
}

.indexTab .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #239639;
}

.indexTab .el-checkbox__inner::after {
  height: 15px;
  left: 8px;
  width: 8px;
}

.loginTab .el-button--primary:focus,
.loginTab .el-button--primary:hover {
  background: #0faa00;
  border-color: #0faa00;
}

.loginTab .el-input {
  font-size: 16px;
}

/* .loginTab .el-form-item__content {
  line-height: 55px;
} */

.loginTab .el-input--prefix .el-input__inner {
  padding-left: 46px;
}

.loginTab .el-input__prefix {
  left: 10px;
}

.loginTab .el-input__icon {
  line-height: 57px;
  width: 36px;
}

.loginTab [class*="el-icon-my"] {
  font-size: 22px;
}

.toptitle {
  text-align: center;
  position: relative;
  overflow: hidden;
}

.logoIcon {
  position: relative;
  width: 91px;
  height: 91px;
  border-radius: 50px;
  background-color: #fff;
  /* left: 50%; */
  /* transform: translateX(-50%); */
  margin: 0 auto;
  /* background: url(../image/logo.png) no-repeat; */
}

.logoIcon img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.toptitle .title {
  font: bold 34px "Microsoft Yahei";
  margin: 16px 0 0;
  color: #515151;
}

.toptitle p {
  font-size: 18px;
  margin: 0 0 23px;
}

.registerTab {
  padding: 10px 15px 0 15px;
}

.registerTab .el-select {
  width: 100%;
}

.registerTab .el-form-item__label {
  font-size: 18px !important;
}

.registerTab .el-input__inner {
  font-size: 16px;
}

.registerButton {
  width: 47%;
  border-radius: 4px;
  float: left;
  height: 60px;
  line-height: 30px;
  font-size: 20px;
  color: #fff;
}

.registerButton.besure {
  background: #239639;
}

/* .registerButton.besure:hover  */

.registerButton.cancel {
  background: #898989;
  color: #fff;
  border-color: #898989;
}

.registerButton.cancel:hover {
  background: #fff;
  color: #898989;
}

.registerButton + .registerButton {
  margin-left: 6%;
}

.mailForget .el-dialog--center .el-dialog__footer {
  padding-bottom: 90px;
}

.mailForget .el-form-item__label {
  font-size: 18px;
  height: 50px;
  line-height: 50px;
}

.mailForget .el-dialog--center .el-dialog__body {
  padding: 25px 27px 0px;
}

.mailForget .el-input__inner {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
}

.mailForget .el-input__inner:focus {
  border-color: #239639;
}

.mailForget .registerButton:nth-child(1) {
  border-color: #239639;
}

.mailForget .registerButton:nth-child(1):hover {
  border-color: #b3e19d;
}

.auth_text_blue {
  color: #4093c6;
}

.auth_text_green span {
  color: #239639;
}

/* .phonecode .el-form-item__content .el-input__inner, */

/* .phonecode .el-form-item__content .el-input-group__append {
  width: 50%;
} */

.phonecode
  .el-form-item__content
  .el-input-group__append
  .el-button
  + .el-button {
  margin-left: 0;
  padding-left: 0;
}
.el-langselect{
  margin-top: 7px
}
</style>

