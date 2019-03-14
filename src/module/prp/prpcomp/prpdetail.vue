<template>
  <div class="detail">
    <!--选择语言-->
    <el-dialog
      :visible.sync="dialogFormVisible6"
      width="25%"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item
          :label="$t('ics.tip.selectLang')"
          prop="language"
        >
          <el-select v-model="ruleForm.language">
            <el-option
              :label="$t('ics.email.cn')"
              value="cn"
            ></el-option>
            <el-option
              :label="$t('ics.email.en')"
              value="en"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible6 = false">{{$t('btn.cancel')}}</el-button>
        <el-button
          type="success"
          class="green"
          @click="exportEvaluationReport('ruleForm')"
          :loading="buttonloading2"
        >{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑框 -->
    <el-dialog
      :visible.sync="editdialog"
      width="25%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form
        label-width="180px"
        :model="userform1"
        ref="userform1"
        :rules="userformrules"
        label-position="left"
      >
        <el-form-item
          :label="$t('ics.email.name')"
          prop="name"
        >
          <el-input
            v-model.trim="userform1.name"
            :placeholder="$t('valid.inputName')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('ics.email.email')"
          prop="email"
        >
          <el-input
            v-model.trim="userform1.email"
            :placeholder="$t('valid.userplaceholder')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('news.testNews.currentPos')"
          prop="currentPosts"
        >
          <el-input
            v-model="userform1.currentPosts"
            :placeholder="$t('valid.valid006')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('news.testNews.testPos')"
          prop="companyName"
        >
          <el-input
            :disabled="true"
            v-model="userform1.companyName"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="canceleditdialog('userform1')">{{$t('btn.cancel')}}</el-button>
        <el-button
          type="success"
          class="green"
          @click="updateJobInfo('userform1')"
        >{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>

    <!-- <div class="detailtitle">Centalent > 职位测评管理列表页 >
      <span>职位测评管理详情页</span>
    </div> -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="detailtitle"
    >
      <el-breadcrumb-item>
        <a href="./news.html">Centalent</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/prpperson' }">{{$t('prp.prpPage')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('prp.detail.prpdetail')}}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="subdetail">
      <div class="detail_top">
        <div class="detailword">
          {{$t('prp.detail.title')}}
        </div>
        <div class="detailbutton">
          <el-button
            type="info"
            size="small"
            @click="dialogFormVisible6 = true"
            :disabled="reportbuttondownload"
          >{{$t('btn.downloadReport')}}
            <i class="el-icon-my-xiazai1 el-icon--right"></i>
          </el-button>
          <el-button
            class="blue"
            size="small"
            @click="openeditdialog('userform1')"
          >{{$t('ics.detail.editInfo')}}</el-button>
          <el-button
            type="info"
            size="small"
            @click="deleteById"
          >{{$t('btn.delete')}}
            <i class="el-icon-close el-icon--right"></i>
          </el-button>
        </div>
      </div>
      <el-form
        label-width="180px"
        :model="userform"
        ref="userform"
      >
        <el-form-item
          :label="$t('ics.email.name')"
          prop="name"
        >
          <el-input
            v-model="userform.name"
            :readonly="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('ics.email.email')"
          prop="email"
        >
          <el-input
            v-model="userform.email"
            :readonly="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('news.testNews.currentPos')"
          prop="currentPosts"
        >
          <el-input
            v-model="userform.currentPosts"
            :readonly="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('news.testNews.testPos')"
          prop="companyName"
        >
          <el-input
            :disabled="true"
            v-model="userform.companyName"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div
      class="bigbox"
      style="position:relative"
    >
      <div
        class="el-icon-caret-left arrow-left"
        @click="handlepre"
      ></div>
      <div
        class="el-icon-caret-right arrow-right"
        @click="handlenext"
      ></div>
      <el-tabs
        v-model="activeName"
        type="border-card"
        class="prpcard businessInfo"
      >

        <el-tab-pane
          :label="$t('ics.detail.tab01')"
          name="first"
          v-if="this.$store.state.Privilege.includes('CONTENT_POSITION_EVALUATION_SCORE')"
        >

          <score :prpResultform="prpResultform"></score>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('ics.detail.tab02')"
          name="second"
          v-if="this.$store.state.Privilege.includes('TAB_TALENT_REPORT')"
        >
          <reportcn
            :userform="userform"
            :reportpart1="reportpart1"
            :reportpart2="reportpart2"
            :bardata="bardata"
          ></reportcn>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('ics.detail.tab03')"
          name="third"
          v-if="this.$store.state.Privilege.includes('TAB_TALENT_REPORT')"
        >
          <reporten
            :userform="userform"
            :reportpart1="reportpart1"
            :reportpart2="reportpart2"
            :bardata="bardata"
          ></reporten>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
import score from "./score.vue";
import reportcn from "./reportcn.vue";
import reporten from "./reporten.vue";
export default {
  data() {
    return {
      reportbuttondownload: true,
      editdialog: false,
      userformrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.inputName"),
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: this.$t("valid.userplaceholder"),
            trigger: "blur"
          },
          { type: "email", message: this.$t("valid.valid022"), trigger: "blur" }
        ],
        currentPosts: [
          {
            required: true,
            message: this.$t("valid.valid030"),
            trigger: "blur"
          }
        ]
      },
      status: "",
      schedule: "",
      ruleForm: {
        language: "cn"
      },
      rules: {
        language: [
          {
            required: true,
            message: this.$t("valid.valid011"),
            trigger: "change"
          }
        ]
      },
      buttonloading2: false,
      dialogFormVisible6: false,
      language: "",
      bardata: "",
      reportpart1: "",
      reportpart2: "",
      activeName: "second",
      userform: {},
      userform1: {},
      prpResultform: []
    };
  },
  components: {
    score,
    reportcn,
    reporten
  },
  created() {
    this.getJobById();
    this.jobReport();
    this.getreportbuttondownload();
  },
  methods: {
    //
    getreportbuttondownload() {
      if (this.$route.query.clientId) {
        this.reportbuttondownload = false;
      }
      // console.log()
    },
    //根据id获取用户信息
    getJobById() {
      var para = this.$route.query;
      this.$http.post(api.prp.getJobById(), formatUrl(para)).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            // console.log(res);
            this.listLoading = false;
            this.status = res.data.data.status;
            this.schedule = res.data.data.schedule;
            this.userform = res.data.data;
            document.title = `${this.$t("sidebar.prp")}-${res.data.data.name}`;
            if (res.data.data.prpResult) {
              this.prpResultform = [res.data.data.prpResult];
            } else {
              this.prpResultform = [];
            }
          }
          if (res.data.code == "500") {
            this.$message({
              type: "error",
              message: res.data.errMessage
            });
            this.$router.push({ path: "/prpperson" });
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    //编辑
    openeditdialog(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      var para = this.$route.query;
      this.$http.post(api.prp.getJobById(), formatUrl(para)).then(
        res => {
          if (res.data.code == "00") {
            this.editdialog = true;
            // this.optionsStatus = res.data.data;
            this.userform1 = res.data.data;
            // console.log(res);
          }
          if (res.data.code == "500") {
            this.$message({
              message: res.data.errMessage,
              type: "error"
            });
          }
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
        },
        error => {
          console.log(error);
        }
      );

      // if (this.$refs[formName] !== undefined) {
      //   this.$refs[formName].resetFields();
      // }
      // this.editdialog = true;
    },
    canceleditdialog(formName) {
      // if (this.$refs[formName] !== undefined) {
      //   this.$refs[formName].resetFields();
      // }
      this.editdialog = false;
      // this.getJobById();
    },
    //编辑个人信息
    updateJobInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(api.prp.updateJobInfo(), formatUrl(this.userform1))
            .then(
              res => {
                if (res.data.code == "00") {
                  this.editdialog = false;
                  this.getJobById();
                  this.$message({
                    message: this.$t("msg.msg8"),
                    type: "success"
                  });
                }
                if (res.data.code == "500") {
                  this.$message({
                    message: res.data.errMessage,
                    type: "error"
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
    //删除用户
    deleteById() {
      // var para = this.$route.query;

      var ids = this.$route.query.id;

      this.$confirm(
        this.$t("systemManagement.tip.contetn"),
        this.$t("systemManagement.tip.title"),
        {
          type: "warning"
        }
      )
        .then(() => {
          // this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          console.log(ids);
          this.$http.post(api.prp.deleteById(), formatUrl(para)).then(
            res => {
              if (res.data.code == "00") {
                // this.getJobList();
                this.$message({
                  type: "success",
                  message: this.$t("msg.msg2")
                });
              }
              if (res.data.code == "500") {
                this.$message({
                  type: "error",
                  message: this.$t("msg.msg14")
                });
              }
              this.$router.push({ path: "/prpperson" });
              // this.userData = res.body.data.content
              // console.log(this.userData)
              // this.getJobList()
            },
            error => {
              console.log(error);
            }
          );
        })
        .catch(() => {});
    },
    //下一个
    handlenext() {
      var FlipList = JSON.parse(localStorage.getItem("prpids"));
      var idobj = {
        id: parseInt(this.$route.query.id),
        clientId: this.$route.query.clientId
          ? parseInt(this.$route.query.clientId)
          : null
      };
      var idss = [];
      FlipList.forEach(el => {
        idss.push(el.id);
      });
      var ids = idobj.id;

      var idIndex = idss.indexOf(ids);
      if (idIndex == -1) {
        this.$router.push({
          path: "/prpdetail",
          query: {
            id: FlipList[FlipList.length - 1].id,
            clientId: FlipList[FlipList.length - 1].clientId
          }
        });
        this.getJobById();
        this.jobReport();
      } else if (idIndex >= FlipList.length - 1) {
        this.$message({
          type: "warning",
          message: this.$t("msg.msg27")
        });
      } else {
        this.$router.push({
          path: "/prpdetail",
          query: {
            id: FlipList[idIndex + 1].id,
            clientId: FlipList[idIndex + 1].clientId,
            talentPoolId: FlipList[idIndex + 1].talentPoolId
          }
        });
        this.getJobById();
        this.jobReport();
      }
      // console.log(this.$store.state.FlipList.indexOf(this.$route.query.id));
    },
    //上一个
    handlepre() {
      var FlipList = JSON.parse(localStorage.getItem("prpids"));
      // var FlipList = localStorage.getItem("icsids");

      var idobj = {
        id: parseInt(this.$route.query.id),
        clientId: this.$route.query.clientId
          ? parseInt(this.$route.query.clientId)
          : null
      };
      var idss = [];
      FlipList.forEach(el => {
        idss.push(el.id);
      });
      var ids = idobj.id;

      var idIndex = idss.indexOf(ids);

      if (idIndex <= 0) {
        if (idIndex == -1) {
          this.$router.push({
            path: "/prpdetail",
            query: {
              id: FlipList[0].id,
              clientId: FlipList[0].clientId
            }
          });
          this.getJobById();
          this.jobReport();
        } else {
          this.$message({
            type: "warning",
            message: this.$t("msg.msg26")
          });
        }
      } else {
        this.$router.push({
          path: "/prpdetail",
          query: {
            id: FlipList[idIndex - 1].id,
            clientId: FlipList[idIndex - 1].clientId
          }
        });
        this.getJobById();
        this.jobReport();
      }
    },
    //查询职位报告
    jobReport() {
      var clientId = this.$route.query.clientId;
      if (clientId) {
        this.$http
          .post(api.prp.jobReport(), formatUrl({ clientId: clientId }))
          .then(
            res => {
              console.log(res);
              if (res.data.code == "00") {
                // console.log(res);
                this.bardata = res.data.data.bar;
                if (res.data.data.part1 && res.data.data.part1.length != 0) {
                  this.reportpart1 = res.data.data.part1;
                } else {
                  this.reportpart1 = [];
                }
                if (res.data.data.part2 && res.data.data.part2.length != 0) {
                  this.reportpart2 = res.data.data.part2;
                } else {
                  this.reportpart2 = [];
                }
              }
              if (res.data.code == "500") {
                console.log(res);
                this.bardata = {};
                this.reportpart1 = [];
                this.reportpart2 = [];
                this.$message({
                  message: this.$t("msg.msg23"),
                  type: "error"
                });
              }
            },
            error => {
              console.log(error);
            }
          );
      } else {
        this.bardata = {};
        this.reportpart1 = [];
        this.reportpart2 = [];
        this.$message({
          type: "error",
          message: this.$t("msg.msg23")
        });
      }
    },

    //下载报告
    exportEvaluationReport(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.status == "COMPLETED" && this.schedule == "SecondStep") {
            this.buttonloading2 = true;
            let para = {
              ids: this.$route.query.id,
              language: this.ruleForm.language
            };
            this.$http
              .get(api.prp.exportEvaluationReport(), {
                params: para,
                headers: {
                  "Content-Type": "application/pdf;charset =utf-8"
                }
              })
              .then(
                res => {
                  this.dialogFormVisible6 = false;
                  if (res.data.code == "500") {
                    if (this.ruleForm.language == "cn") {
                      this.$message({
                        type: "error",
                        message: this.$t("msg.msg24")
                      });
                    }
                    if (this.ruleForm.language == "en") {
                      this.$message({
                        type: "error",
                        message: "You don't have reports to download!"
                      });
                    }
                    this.buttonloading2 = false;
                  } else if (
                    res.data.data == "java.lang.NullPointerException"
                  ) {
                    this.buttonloading2 = false;
                    return this.$message({
                      type: "error",
                      message: this.$t("msg.msg20")
                    });
                  } else {
                    this.buttonloading2 = false;
                    window.open(
                      api.prp.exportEvaluationReport() + "?" + formatUrl(para),
                      Date.now()
                    );
                  }
                },
                error => {
                  console.log(error);
                }
              );
          } else {
            if (this.ruleForm.language == "cn") {
              this.$message({
                type: "error",
                message: this.$t("msg.msg24")
              });
            }
            if (this.ruleForm.language == "en") {
              this.$message({
                type: "error",
                message: "You don't have reports to download!"
              });
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style >
.el-table th {
  text-align: center;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 10px 20px;
}

.arrow-left,
.arrow-right {
  font-size: 50px;
  position: absolute;
  cursor: pointer;
}

.arrow-left {
  left: 10px;
  top: 200px;
  margin-left: -50px;
}

.arrow-right {
  right: 10px;
  top: 200px;
  margin-right: -50px;
}

.ratebar .el-rate {
  width: 50%;
  float: left;
  position: absolute;
}

span.el-rate__item {
  width: 20%;
  float: left;
}

i.el-rate__icon.el-icon-my-square {
  font-size: 50px;
  margin-right: 0;
}

.el-icon-my-xiazai1 {
  font-size: 12px;
}
.detail {
  padding: 0 3%;
}
.detailtitle {
  height: 70px;
  line-height: 70px;
  z-index: 100;
  font-size: 14px;
  text-align: left;
}
.detailtitle span {
  color: #249739;
}
.subdetail {
  background-color: #fff;
  padding: 0 30px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #cccccc;
  overflow: hidden;
}
.subdetail .el-form-item {
  width: 50%;
  float: left;
  height: 40px;
}
.detail_top {
  overflow: hidden;
  padding: 20px 0;
}
.detailword {
  float: left;
  font: normal 24px "Microsoft YaHei";
}
.detailbutton {
  float: right;
}
</style>

  