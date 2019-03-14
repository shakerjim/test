<template>
  <div>
    <!--添加模板-->
    <el-dialog
      :visible.sync="dialogFormVisibleadd"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
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
        <el-form-item prop="content">
          <!--<el-input type="textarea" placeholder="请输入模板内容" :autosize="{ minRows: 3}" v-model="templetform.content">-->
          <!--</el-input>-->
          <quill-editor
            v-model="templetform.content"
            ref="myQuillEditor"
            class="editer"
            :options="editorOption"
            @ready="onEditorReady($event)"
          >
          </quill-editor>
        </el-form-item>
        <!-- </el-form-item> -->
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisibleadd = false">{{$t('btn.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="createMailTemp('templetform')"
        >{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!--修改模板-->
    <el-dialog
      :visible.sync="editemailFormVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="edittempletform"
        :rules="templetformrules"
        ref="edittempletform"
      >
        <el-form-item prop="tpName">
          <el-input
            :placeholder="$t('valid.valid042')"
            v-model="edittempletform.tpName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="content">
          <quill-editor
            v-model="edittempletform.tpContent"
            ref="myQuillEditor"
            class="editer"
            :options="editorOption"
            @ready="onEditorReady($event)"
          >
          </quill-editor>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editemailFormVisible = false">{{$t('btn.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="updateMailTemp"
        >{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- <div class="detailtitle">Centalent > 系统管理 >
      <span>邮件模板列表页</span>
    </div> -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="detailtitle"
    >
      <el-breadcrumb-item>
        <a href="./news.html">Centalent</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('systemManagement.modeListpage')}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item></el-breadcrumb-item> -->
    </el-breadcrumb>
    <el-tabs
      type="border-card"
      class="businessInfo"
    >
      <el-tab-pane :label="$t('systemManagement.email.tab01')">
        <div class="listmodel">
          <div class="listbuttons">

            <el-button
              type="info"
              @click="deleteById"
              :disabled="this.idArr.length===0"
              v-if="this.$store.state.Privilege.includes('BUTTON_MAIL_EMENDATION')"
            >{{$t('systemManagement.email.delete')}}
              <i class="el-icon-close el-icon--right"></i>
            </el-button>
            <el-button
              class="blue"
              type="primary"
              @click="getMailTempById"
              :disabled="this.idArr.length!==1"
              v-if="this.$store.state.Privilege.includes('BUTTON_MAIL_EMENDATION')"
            >{{$t('systemManagement.email.editmodel')}}</el-button>
            <el-button
              class="green"
              type="success"
              @click="addemailtemp('templetform')"
              v-if="this.$store.state.Privilege.includes('BUTTON_MAIL_EMENDATION')"
            >{{$t('systemManagement.email.addmodel')}}
              <i class="el-icon-plus el-icon--right"></i>
            </el-button>
          </div>

          <el-checkbox-group v-model="idArr">
            <el-form
              label-width="120px"
              class="modelform"
              v-for="(form,index) in emailmodelform"
              :key="index"
              :model="{form}"
              ref="form"
            >
              <el-form-item :label='$t("valid.valid043")+(index+1)'>

                <el-checkbox
                  name="type"
                  :label='form.id'
                ></el-checkbox>

                <el-input
                  v-model="form.tpName"
                  :readonly="true"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <quill-editor
                  v-model="form.tpContent"
                  ref="myQuillEditor"
                  class="editer"
                  :options="editorOption"
                  @ready="onEditorReady($event)"
                  disabled
                >
                </quill-editor>
              </el-form-item>
            </el-form>
          </el-checkbox-group>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('systemManagement.email.tab02')">
        <div class="listmodel">
          <div class="listbuttons">
            <el-button
              class="blue"
              type="primary"
              @click="saveMailSign('signform')"
            >{{$t('btn.saveedit')}}</el-button>
          </div>
          <el-form
            label-width="90px"
            class="modelform"
            ref="signform"
            :model="signform"
            :rules="signformrules"
          >
            <el-form-item
              :label="$t('systemManagement.email.sign')"
              prop="sign"
            >
              <quill-editor v-model="signform.sign">
              </quill-editor>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
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
      signform: { sign: "" },
      signformrules: {
        sign: [
          {
            required: true,
            message: this.$t("valid.valid051"),
            trigger: "blur"
          }
        ]
      },
      idArr: [],
      form: {
        id: "",
        tpName: "",
        content: ""
      },
      editorOption: {},

      sels: [], //列表选中列
      formLabelWidth: "120px",
      emailmodelform: {
        tpName: "",
        tpContent: "",
        id: ""
      },
      dialogFormVisibleadd: false,
      editemailFormVisible: false,
      templetform: {
        tpName: "",
        content: `<p>${this.$t("valid.valid046")}</p>`
      },
      edittempletform: {
        id: "",
        tpName: "",
        content: ""
      },
      templetformrules: {
        tpName: [{ validator: validatetpName, trigger: "blur" }],
        content: [{ validator: validatecontent, trigger: "blur" }]
      }
    };
  },
  components: {
    quillEditor
  },
  created() {
    document.title = `${this.$t("sidebar.systemManagement")}-${this.$t("sidebar.emailModel")}`;
    // this.getMailTempList();
    this.findAppMailTemp();
  },
  methods: {
    //根据权限不同显示不同模板
    findAppMailTemp() {
      this.$http.post(api.mail.findAppMailTemp()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }

          if (res.data.code == "00") {
            this.emailmodelform = res.data.data;
            this.signform.sign = localStorage.getItem("sign");
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    onEditorReady(editor) {},
    selsChange: function(sels) {
      this.sels = sels;
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
                  message: this.$t("msg.msg19"),
                  type: "success"
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addemailtemp(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.dialogFormVisibleadd = true;
    },
    //删除模板
    deleteById() {
      var ids = this.idArr.map(item => item).toString();
      // console.log(ids)
      // console.log(ids)
      this.$confirm(
        this.$t("recruitSystem.tip.stafftip4"),
        this.$t("systemManagement.tip.title"),
        {
          type: "warning"
        }
      )
        .then(() => {
          let para = { ids: ids };
          this.$http.post(api.system.deleteById(), formatUrl({ ids })).then(
            res => {
              if (res.data.code == "500") {
                this.$message({
                  type: "error",
                  message: this.$t("msg.msg14")
                });
              }
              if (res.data.code == "00") {
                this.$message({
                  type: "success",
                  message: this.$t("msg.msg2")
                });
                this.findAppMailTemp();
                this.idArr = [];
              }
              // console.log(res)
            },
            error => {
              console.log(error);
            }
          );
        })
        .catch(() => {});
    },
    //根据id获取模板

    getMailTempById() {
      // var id = this.sels.map(item => item.id).toString();
      this.editemailFormVisible = true;
      // this.form = this.emailmodelform[0]
      // console.log(this.form)

      this.$http
        .post(api.system.getMailTempById(), formatUrl({ id: this.idArr[0] }))
        .then(
          res => {
            if (res.data.code == "00") {
              // console.log(res);
              this.edittempletform = res.data.data;
            }
            if (res.data.code == "500") {
              // console.log(res)
              // this.edittempletform = res.data.data
              this.$message({
                type: "error",
                message: this.$t("msg.msg35")
              });
            }
            // console.log(res);
          },
          error => {
            console.log(error);
          }
        );
    },
    //修改邮件模板

    updateMailTemp() {
      // console.log(this.edittempletform);
      var para = {
        id: this.edittempletform.id,
        tpName: this.edittempletform.tpName,
        content: this.edittempletform.tpContent
      };
      this.$http.post(api.system.updateMailTemp(), formatUrl(para)).then(
        res => {
          if (res.data.code == "500") {
            this.$message({
              type: "error",
              message: res.data.errMessage
            });
          }
          if (res.data.code == "00") {
            this.$message({
              type: "success",
              message: this.$t("msg.msg1")
            });
            this.findAppMailTemp();
            this.editemailFormVisible = false;
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    saveMailSign(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              api.mail.saveMailSign(),
              formatUrl({ sign: this.signform.sign })
            )
            .then(
              res => {
                if (res.data.code == "500") {
                  this.$message({
                    type: "error",
                    message: res.data.errMessage
                  });
                }
                if (res.data.code == "00") {
                  localStorage.setItem("sign", this.signform.sign);
                  this.findAppMailTemp();
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg1")
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
    }
  }
};
</script>
<style>
.listmodel {
  background-color: #fff;
  padding: 20px 20px;
  margin-bottom: 20px;
}

.listmodel .listbuttons {
  overflow: hidden;
}

.listmodel .listbuttons button {
  float: right;
  margin-left: 20px;
}

.modelform {
  border: 1px solid #f4f8fc;
  margin-top: 20px;
  box-shadow: 2px 2px 2px #ccc;
  padding: 20px;
}

.modelform .el-checkbox {
  position: absolute;
  margin-left: -120px;
}

.modelform .el-form-item__label {
  text-align: right;
}

.ql-toolbar.ql-snow {
  background-color: #fff;
  line-height: normal;
  text-align: left;
}

.ql-editor {
  min-height: 100px;
}

.el-checkbox__label {
  display: none;
}

.el-main {
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
.ql-image,
.ql-video {
  display: none !important;
}
</style>

  

