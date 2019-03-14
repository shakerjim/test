<template>
  <div class="container_box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" center label-width="140px" class="demo-ruleForm login-container">
      <el-form-item :label="$t('login.email.inputnewpass')" prop="password">
        <el-input v-model.trim="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('login.email.confirmnewpass')" prop="checkPass">
        <el-input type="password" v-model.trim="ruleForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{$t('login.email.sure')}}</el-button>
        <el-button @click="resetForm('ruleForm')">{{$t('login.email.reset')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('valid.againpassword')));
      } else if (value !== this.ruleForm.password) {
        callback(new Error(this.$t('valid.valid021')));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        checkPass: ""
      },
      rules: {
        password: [
          { required: true, message: this.$t('valid.pwdplaceholder'), trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: this.$t('valid.valid023'),
            trigger: "blur"
          },
          {
            pattern: /^(\w){6,30}$/,
            message: this.$t('valid.valid024'),
            trigger: "blur"
          }
        ],
        checkPass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  created() {
    this.checkdate();
  },
  methods: {
    checkdate() {
      this.$http
        .post(
          api.user.checkPassword(),
          formatUrl({
            id: this.$route.query.id.replace(",", ""),
            passwordToken: this.$route.query.passwordToken
          })
        )
        .then(
          res => {
            if (
              res.data.code == "500" &&
              res.data.errMessage == "邮件已过期！"
            ) {
              location.href = "./login.html#/expire";
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              api.user.checkPassword(),
              formatUrl({
                id: this.$route.query.id.replace(",", ""),
                passwordToken: this.$route.query.passwordToken,
                password: this.ruleForm.password
              })
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  // console.log(res);
                  location.href = "./login.html#/pwdsuccess";
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  /* margin: 180px auto; */
  width: 450px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.el-form-item__label {
  text-align: left;
}

.el-form-item.is-required .el-form-item__label:before {
  display: none;
}

.login-container .el-button + .el-button {
  margin-left: 80px;
}
</style>

