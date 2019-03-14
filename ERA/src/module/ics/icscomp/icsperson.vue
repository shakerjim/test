<template>
  <div class="icsmain">
    <!--添加模板-->
    <el-dialog
      :visible.sync="dialogFormVisibleadd"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form
        :model="templetform"
        :rules="templetformrules"
        ref="templetform"
      >
        <el-form-item prop="tpName">
          <el-input
            :placeholder="$t('valid.valid042')"
            v-model="templetform.tpName"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="content"
          class="addmailmodel"
        >
          <quill-editor
            v-model="templetform.content"
            ref="myQuillEditor"
            class="editer"
          >
          </quill-editor>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelcreateMailTemp('emailform')">{{$t('btn.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="createMailTemp('templetform')"
        >{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- Form -->
    <el-dialog
      :visible.sync="dialogFormVisible6"
      width="25%"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form>
        <el-form-item :label="$t('valid.valid011')">
          <el-select v-model="language">
            <el-option
              :label="$t('ics.email.cn')"
              value="cn"
            ></el-option>
            <!-- <el-option label="English" value="en"></el-option> -->
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
          @click="exportEvaluationReport"
          :loading="buttonloading2"
        >{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormVisible"
      center
      width="30%"
      @close="closedialog('emailform')"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="emailform"
        ref="emailform"
        :rules="formrules"
        status-icon
        :label-position="labelPosition"
      >
        <el-form-item
          :label="$t('ics.email.name')"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model.trim="emailform.name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('ics.email.email')"
          :label-width="formLabelWidth"
          prop="email"
        >
          <el-input
            v-model.trim="emailform.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('ics.email.link')"
          :label-width="formLabelWidth"
          prop="contact"
        >
          <el-input
            v-model.trim="emailform.contact"
            auto-complete="off"
            :blur="setphonechange(emailform.contact)"
            v-on:change="phonechange"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('ics.email.lang')"
          :label-width="formLabelWidth"
          prop="language"
        >
          <el-radio-group v-model="emailform.language">
            <el-radio label="cn">{{$t('ics.email.cn')}}</el-radio>
            <el-radio label="en">{{$t('ics.email.en')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('ics.email.model')"
          :label-width="formLabelWidth"
          prop="mailId"
        >
          <el-select
            v-model.trim="emailform.mailId"
            :placeholder="$t('valid.valid009')"
            @change="check(emailform.mailId,'templetform')"
          >
            <el-option
              :label='$t("valid.valid043")+(index+1)+"---"+ item.tpName'
              :value="item.id"
              v-for="(item,index) in emailmodelform"
              :key="index"
            ></el-option>
            <el-option
              :label="$t('systemManagement.email.addmodel')"
              :value="'添加模板'"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="mailContent"
          class="mailmodelcontent"
        >
          <quill-editor
            v-model.trim="emailform.mailContent"
            ref="myQuillEditor"
            class="editer"
            disabled
          >
          </quill-editor>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="success"
          class="green"
          @click="sendPersonalEvaluation('emailform')"
          :loading="buttonloading"
        >{{$t('btn.suresend')}}</el-button>
        <el-button @click="resetForm('emailform')">{{$t('btn.cancel')}}</el-button>

      </div>
    </el-dialog>
    <div class="main_top">
      <div class="main_left">
        <el-input
          :placeholder="$t('ics.search')"
          v-model.trim="searchcontent"
          @keyup.enter.delete.native="findPersonalListByGroupsearch"
        >
        </el-input>
        <el-button
          type="success"
          class="searchbutton green"
          @click="findPersonalListByGroupsearch"
          icon="el-icon-search"
        ></el-button>
      </div>

    </div>
    <div class="tablelist">
      <!-- <div class="title">
        Centalent >
        <span>个人测评管理列表页</span>
      </div> -->
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="title"
      >
        <el-breadcrumb-item>
          <a href="./news.html">Centalent</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('ics.icsPage')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="tablebox">
        <div class="listbox">
          <div class="listword">
            {{$t('ics.icsList')}}
          </div>

          <div class="listbutton">
            <el-button
              type="info"
              :disabled="this.sels.length===0"
              @click="dialogFormVisible6 = true"
              v-if="this.$store.state.Privilege.includes('BUTTON_TALENT_REPORT_DOWNLOAD')"
            > {{$t('btn.downloadReport')}}
              <i class="el-icon-my-xiazai1 el-icon--right"></i>
            </el-button>
            <el-button
              type="info"
              @click="deleteById"
              :disabled="this.sels.length===0"
              v-if="this.$store.state.Privilege.includes('BUTTON_TALENT_EMENDATION')"
            >{{$t('btn.delete')}}
              <i class="el-icon-close el-icon--right"></i>
            </el-button>

            <!--发送测评弹出框-->
            <el-button
              class="blue"
              @click="sendemail('emailform')"
              v-if="this.$store.state.Privilege.includes('BUTTON_TALENT_EVALUATION_SEND')"
            >{{$t('btn.send')}}
              <i class="el-icon-my-weibiaoti40 el-icon--right"></i>
            </el-button>

          </div>
        </div>
        <!--表格-->
        <el-table
          stripe
          ref="multipleTable"
          :data="icsdata.content"
          tooltip-effect="dark"
          style="width: 100%"
          row-key="id"
          @sort-change="sortChange"
          @selection-change="selsChange"
          v-loading="listLoading"
          :element-loading-text="$t('businessSystem.loading')"
          :empty-text="$t('recruitSystem.screen.nodata')"
          highlight-current-row
          class="icspersontable"
        >
          <el-table-column
            type="selection"
            width="55"
            prop="id"
            :reserve-selection="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('news.testNews.name')"
            width="100"
            :sortable="'custom'"
          >
            <template slot-scope="scope">
              <span
                @click="linkicsdetail(scope)"
                style="color:#249739;cursor:pointer"
              >{{scope.row.name}}</span>
              <!-- <el-button type="text" size="medium" @click="linkicsdetail(scope)">{{scope.row.name}}</el-button> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="email"
            :label="$t('news.testNews.email')"
            width="180"
            :sortable="'custom'"
          >
          </el-table-column>
          <el-table-column
            prop="contact"
            :label="$t('news.testNews.link')"
            show-overflow-tooltip
            :sortable="'custom'"
          >
          </el-table-column>
          <el-table-column
            :label="$t('news.testNews.birth')"
            show-overflow-tooltip
            :sortable="'custom'"
            prop="birthDates"
          >
            <template slot-scope="scope">
              {{scope.row.birthDates}}&nbsp;&nbsp; {{scope.row.birthTime=="null"?"":scope.row.birthTime}}
            </template>
          </el-table-column>
          <el-table-column
            prop="sex"
            :label="$t('news.testNews.gender')"
            width="80"
            :sortable="'custom'"
            :formatter="sexFormat"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            :label="$t('news.testNews.testStatus')"
            show-overflow-tooltip
            :sortable="'custom'"
            :formatter="statusFormat"
          >
          </el-table-column>
          <el-table-column
            prop="sendTime"
            :label="$t('news.testNews.sendTime')"
            show-overflow-tooltip
            :sortable="'custom'"
            :formatter="dateFormat"
          >
          </el-table-column>
          <el-table-column
            prop="detail"
            :label="$t('news.testNews.operation')"
            show-overflow-tooltip
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="evaluationdeatil(scope)"
              >{{$t('news.testNews.detailbtn')}}</el-button>
              <!-- <router-link style="float:left;width:50%" :to="{ path: 'icsdetail', query: { id:scope.row.id,clientId:scope.row.clientId,talentPoolId: scope.row.talentPool?scope.row.talentPool.id:null}}" target="_blank">详情</router-link> -->
              <el-button
                type="text"
                @click="resendEvaluation(scope)"
                v-if="scope.row.resend"
              >{{$t('btn.b3')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <!--分页-->
        <div class="block">
          <el-pagination
            popper-class="testclass"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="icsdata.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="icsdata.totalElements"
          >
          </el-pagination>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
import { quillEditor } from "vue-quill-editor";
import Util from "../../../tool/tool.js";
let mytools = new Util();
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.inputName")));
      } else {
        callback();
      }
    };

    var validateLanguage = (rule, value, callback) => {
      if (value == "") {
        callback(new Error(this.$t("valid.valid011")));
      } else {
        callback();
      }
    };
    var validateMailId = (rule, value, callback) => {
      if (value == "") {
        callback(new Error(this.$t("valid.valid009")));
      } else {
        callback();
      }
    };
    var validatetpName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid044")));
      } else {
        callback();
      }
    };
    var validatecontent = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid045")));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisibleadd: false,
      templetform: {
        tpName: "",
        content: `<p>${this.$t("valid.valid046")}</p>`
      },
      templetformrules: {
        tpName: [{ validator: validatetpName, trigger: "blur" }],
        content: [{ validator: validatecontent, trigger: "blur" }]
      },
      labelPosition: "left",
      dialogFormVisible6: false,
      language: "cn",
      emailmodelform: [],
      buttonloading: false,
      buttonloading2: false,
      listLoading: false,
      searchcontent: "",
      pageIndex: 0,
      pageCount: 20,
      sort: "",
      userData: [],
      sels: [], //列表选中列
      currentPage1: 1,
      icsdata: {},

      dialogFormVisible: false,
      formLabelWidth: "180px",
      emailform: {
        name: "",
        email: "",
        contact: "",
        language: "",
        mailId: "",
        mailContent: ""
      },
      formrules: {
        name: [{ validator: validateName, trigger: "blur", required: true }],
        email: [
          {
            required: true,
            message: this.$t("valid.userplaceholder"),
            trigger: "blur"
          },
          {
            type: "email",
            message: this.$t("valid.valid022"),
            trigger: "blur"
          }
        ],
        contact: [
          {
            // required: true,
            message: this.$t("valid.inputlink"),
            trigger: "blur"
          },
          {
            pattern: /^1[3|4|5|7|8|9][0-9]{9}$/,
            message: this.$t("valid.valid040"),
            trigger: "blur"
          }
        ],
        language: [{ validator: validateLanguage, trigger: "change" }],
        mailId: [{ validator: validateMailId, trigger: "change" }]
      }
      // evaluationRemain: ""
    };
  },
  created() {
    document.title = `${this.$t("sidebar.ics")}`;
    this.findPersonalListByGroup();
    // this.findAppMailTemp();
  },

  components: {
    quillEditor
  },
  methods: {
    setphonechange(value) {
      this.phonechange(value);
    },
    phonechange(value) {
      // 目的是去掉字符串中除数字之外的其它字符
      if (this.emailform.contact) {
        this.$nextTick(() => {
          this.emailform.contact = value.replace(/[^\d]/g, "");
        });
      }
    },
    sendemail(formName) {
      // this.buttonloading = false;
      this.findAppMailTemp();
      this.dialogFormVisible = true;
    },
    findPersonalListByGroupsearch() {
      this.pageIndex = 0;
      this.findPersonalListByGroup();
    },
    //根据权限获取个人测评列表
    findPersonalListByGroup() {
      this.listLoading = true;
      let para = {
        search: this.searchcontent,
        pageIndex: this.pageIndex,
        pageCount: this.pageCount,
        sort: this.sort
      };
      this.$http.post(api.ics.findPersonalListByGroup(), formatUrl(para)).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.listLoading = false;
            var idList = [];
            res.data.data.content.forEach(el => {
              idList.push({
                id: el.id,
                clientId: el.clientId,
                talentPoolId: el.talentPool ? el.talentPool.id : null
              });
            });
            localStorage.setItem("icsids", JSON.stringify(idList));
            this.icsdata = res.data.data;
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
    },
    dateFormat(row, column) {
      return mytools.datefilter(row.sendTime);
    },
    statusFormat(row, column) {
      if (row.status == "SENT") {
        return this.$t("news.testNews.sent");
      }
      if (row.status == "COMPLETED") {
        return this.$t("news.testNews.finished");
      }
    },
    sexFormat(row, column) {
      if (row.sex == "1") {
        return this.$t("screenTool.m1");
      } else if (row.sex == "0") {
        return this.$t("screenTool.m2");
      }
    },
    //发送测评邮件
    sendPersonalEvaluation(formName) {
      console.log(this.emailform);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.buttonloading = true;
          this.$http
            .post(api.ics.sendPersonalEvaluation(), formatUrl(this.emailform))
            .then(
              res => {
                if (res.data.code == "500") {
                  this.$message({
                    type: "err",
                    message: res.data.errMessage
                  });
                  this.buttonloading = false;
                }
                if (res.data.code == "00") {
                  this.buttonloading = false;
                  this.dialogFormVisible = false;
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg9")
                  });
                  this.findPersonalListByGroup();
                }
              },
              error => {}
            );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //分页
    handleSizeChange(val) {
      this.pageCount = val;
      this.findPersonalListByGroup();
    },
    handleCurrentChange(val) {
      this.pageIndex = val - 1;
      this.findPersonalListByGroup();
    },

    sortChange({ column, prop, order }) {
      order =
        order == "ascending"
          ? order.toUpperCase().substring(0, 3)
          : order.toUpperCase().substring(0, 4);
      this.sort = `${prop},${order}`;
      this.findPersonalListByGroup();
    },

    selsChange(sels) {
      this.sels = sels;
      // console.log(sels);
    },
    closedialog(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.dialogFormVisible = false;
    },
    //删除用户
    deleteById() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm(
        this.$t("systemManagement.tip.contetn"),
        this.$t("systemManagement.tip.title"),
        {
          type: "warning"
        }
      )
        .then(() => {
          let para = { ids: ids };
          // console.log(ids);
          this.$http.post(api.ics.deleteById(), formatUrl(para)).then(
            res => {
              if (res.data.code == "00") {
                this.findPersonalListByGroup();
                this.sels = [];
                this.$message({
                  type: "success",
                  message: this.$t("msg.msg2")
                });
              }
              if (res.data.code == "500") {
                console.log(res);
                this.$message({
                  type: "error",
                  message: this.$t("msg.msg14")
                });
              }
            },
            error => {
              console.log(error);
            }
          );
        })
        .catch(() => {});
    },
    //根据权限不同显示不同模板
    findAppMailTemp() {
      this.$http.post(api.mail.findAppMailTemp()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            if (res.data.data.length > 0) {
              this.emailmodelform = res.data.data;
              this.emailform.mailId = this.emailmodelform[0].id;
              this.emailform.mailContent = this.emailmodelform[0].tpContent;
            } else {
              if (this.emailform.mailId == "添加模板") {
                let fields = this.$refs["emailform"].fields;
                // console.log(fields);
                for (let i = 0; i < fields.length; i++) {
                  if (fields[i].prop === "mailId") {
                    fields[i].resetField();
                    break;
                  }
                }
              }
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    },

    check(id, formName) {
      if (id == "添加模板") {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
        this.dialogFormVisibleadd = true;
      } else {
        this.$http.post(api.system.getMailTempById(), formatUrl({ id })).then(
          res => {
            if (res.data.code == "00") {
              // console.log(res)
              this.emailform.mailContent = res.data.data.tpContent;
            }
            if (res.data.code == "500") {
              this.$message({
                type: "error",
                message: res.data.errMessage
              });
            }
            // console.log(res);
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    cancelcreateMailTemp(formName) {
      this.dialogFormVisibleadd = false;
      this.sendemail(formName);
    },
    //添加模板
    createMailTemp(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var Params = {
            tpName: this.templetform.tpName,
            content: this.templetform.content
          };
          this.$http
            .post(api.system.createMailTemp(), formatUrl(Params))
            .then(res => {
              // console.log(res)
              if (res.data.code == "500") {
                this.$message({
                  message: res.data.errMessage,
                  type: "error"
                });
              }
              if (res.data.code == "00") {
                this.dialogFormVisibleadd = false;
                this.findAppMailTemp();
                this.$message({
                  type: "success",
                  message: this.$t("msg.msg19")
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //下载报告
    exportEvaluationReport() {
      if (this.sels.every(x => x.status == "COMPLETED")) {
        this.sels.forEach(el => {
          let para = { ids: el.id, language: this.language };
          // if (el.status == "已完成") {
          this.buttonloading2 = true;
          this.$http
            .get(api.ics.exportEvaluationReport(), {
              params: para,
              headers: {
                "Content-Type": "application/pdf;charset =utf-8"
              }
            })
            .then(
              res => {
                this.dialogFormVisible6 = false;
                if (res.data.code == "500") {
                  this.buttonloading2 = false;
                  this.$message({
                    type: "error",
                    message: res.data.errMessage
                  });
                } else if (res.data.data == "java.lang.NullPointerException") {
                  this.buttonloading2 = false;
                  return this.$message({
                    type: "error",
                    message: this.$t("msg.msg20")
                  });
                } else {
                  this.buttonloading2 = false;
                  window.open(
                    api.ics.exportEvaluationReport() + "?" + formatUrl(para),
                    Date.now()
                  );
                }
              },
              error => {
                console.log(error);
              }
            );
          // }
        });
      } else {
        this.$message({
          type: "warning",
          message: this.$t("msg.msg21")
        });
      }
    },
    //重新发送测评
    resendEvaluation(v) {
      console.log(v);
      this.$http
        .post(api.ics.resendEvaluation(), formatUrl({ id: v.row.id }))
        .then(
          res => {
            if (res.data.code == "00") {
              // console.log(res);
              this.$message({
                type: "success",
                message: this.$t("msg.msg22")
              });
              this.findPersonalListByGroup();
            }
            if (res.data.code == "500") {
              this.$message({
                type: "error",
                message: res.data.errMessage
              });
            }
            // console.log(res);
          },
          error => {
            console.log(error);
          }
        );
    },
    //详情
    linkicsdetail(v) {
      window.open(
        `./ics.html#/icsdetail?id=${v.row.id}&clientId${
          v.row.clientId ? "=" + v.row.clientId : ""
        }&talentPoolId${v.row.talentPool ? "=" + v.row.talentPool.id : ""}`
      );
      // ("./ics.html#/icsdetail?id=" + v.row.id);
      // console.log(v);
    },
    evaluationdeatil(v) {
      window.open(
        `./ics.html#/icsdetail?id=${v.row.id}&clientId${
          v.row.clientId ? "=" + v.row.clientId : ""
        }&talentPoolId${v.row.talentPool ? "=" + v.row.talentPool.id : ""}`
      );
      // ("./ics.html#/icsdetail?id=" + v.row.id);
      // console.log(v);
    }
  }
};
</script>
<style>
.mailmodelcontent .ql-toolbar.ql-snow {
  display: none;
}

.ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-top: 1px solid #ccc !important;
}
.addmailmodel .ql-toolbar.ql-snow {
  padding: 0;
  line-height: 20px;
}
.addmailmodel .ql-toolbar.ql-snow .ql-formats {
  margin-right: 0;
}
.addmailmodel .ql-container.ql-snow {
  min-height: 100px;
}
.addmailmodel .ql-image,
.addmailmodel .ql-video {
  display: none !important;
}
.ql-container.ql-snow {
  min-height: 100px;
}
.el-select {
  width: 100%;
}

.el-form-item {
  margin-bottom: 20px;
}
.icspersontable a {
  text-decoration: none;
  display: block;
}
/* .el-main {
  padding: 0;
} */
.icsmain {
  padding: 0;
}
.testclass {
  transform: translateX(80px);
}
</style>
