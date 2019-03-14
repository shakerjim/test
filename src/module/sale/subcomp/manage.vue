<template>
  <div class="salemain">
    <t-search @manageAdminUserListsearch="manageAdminUserListsearch">
    </t-search>
    <div class="tablelist">
      <t-breadcrumb></t-breadcrumb>
      <div class="tablebox">
        <t-tabletop
          :exportloading="exportloading"
          @exportManageAdminUserList="exportManageAdminUserList"
        ></t-tabletop>
        <t-table
          :tenantAccountData='tenantAccountData'
          :listLoading="listLoading"
          :optionsStatus="optionsStatus"
          :chargeoptions="chargeoptions"
          :saleoptions="saleoptions"
          :customeroptions="customeroptions"
          :salestatusoptions="salestatusoptions"
          @salechange="salechange"
          @sortChange="sortChange"
          @formchange="formchange"
          @statuschange="statuschange"
          @filterchange="filterchange"
          @openremark="openremark"
        ></t-table>
        <!--分页-->
        <t-pagination
          :tenantAccountData='tenantAccountData'
          :currentPage="currentPage"
          @tenantAccountCurrentChange='tenantAccountCurrentChange'
          @tenantAccountSizeChange='tenantAccountSizeChange'
        ></t-pagination>

      </div>
    </div>
    <t-markdialog
      :remarkdialog="remarkdialog"
      :hunterHistoryStatusData="hunterHistoryStatusData"
      :btnloading="btnloading"
      @deleteStatusById="deleteStatusById"
      @onlysave="onlysave"
      @closedialog="closedialog"
    >

      <el-form
        label-width="160px"
        :model="remarkruleForm"
        :rules="remarkrules"
        ref="remarkruleForm"
        slot="mark"
      >
        <el-form-item
          :label="$t('saleSystem.tip.remark')"
          prop="remark"
        >
          <el-input
            type="textarea"
            :autosize="{ minRows: 2}"
            :placeholder="$t('saleSystem.tip.inputContent')"
            v-model.trim="remarkruleForm.remark"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </t-markdialog>
    <!-- 状态修改 -->
    <el-dialog
      :visible.sync="statusdialog"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form
        ref="delruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item
          :label="$t('saleSystem.tip.saleTip2')"
          prop="reason"
        >
          <el-input
            type="textarea"
            :placeholder="$t('saleSystem.tip.changeContent')"
            v-model.trim="remark"
            :autosize="{ minRows: 3}"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelstatusdialog">{{$t('btn.cancel')}}</el-button>
        <el-button
          type="success"
          class="green"
          @click="saveHunterHistoryStatus"
        >{{$t('btn.sure')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
import table from "./table.vue";
import tabletop from "./tabletop.vue";
import pagination from "./pagination.vue";
import breadcrumb from "./breadcrumb.vue";
import markdialog from "./markdialog.vue";
import search from "./search.vue";
import Cookies from "js-cookie";
// import Util from "../../../tool/tool.js";
// let mytools = new Util();
export default {
  data() {
    return {
      isexport: false,
      pageIndex: null,
      pageCount: null,
      sort: "",
      managerIds: "",
      statuses: "",
      search: "",
      tenantAccountData: {},
      currentPage: 1,
      optionsStatus: [],
      chargeoptions: [],
      customeroptions: [
        { name: "initiative", text: this.$t("api.sale.active") },
        { name: "passive", text: this.$t("api.sale.passive") }
      ],
      saleoptions: [],
      salestatusoptions: [],
      remarkdialog: false,
      statusdialog: false,
      delruleForm: {},
      salechangeId: {},
      statusform: {},
      remark: "",
      formObj: {},
      exportloading: false,
      remarkrules: {
        remark: [
          {
            required: true,
            message: this.$t("valid.valid001"),
            trigger: "blur"
          }
        ]
      },
      remarkruleForm: {},
      hunterHistoryStatusData: [],
      historyData: {},
      listLoading: true,
      btnloading: false
    };
  },
  components: {
    "t-table": table,
    "t-pagination": pagination,
    "t-breadcrumb": breadcrumb,
    "t-tabletop": tabletop,
    "t-markdialog": markdialog,
    "t-search": search
  },
  created() {
    document.title = `${this.$t("sidebar.saleSystem")}`;
    this.updatepagination();
    this.manageAdminUserList();
    this.findManager();
    this.findHunterStatus();
  },
  methods: {
    updatepagination() {
      this.currentPage=parseInt(localStorage.getItem("salepage")) || 0;
      this.pageIndex = localStorage.getItem("salepage") || 0;
      this.pageCount = localStorage.getItem("salecount") || 20;
    },
    //筛选
    filterchange(v) {
      // console.log(v);
      if (v.hasOwnProperty("managerId")) {
        this.managerIds = v.managerId;
        this.pageIndex = 0;
      }
      if (v.hasOwnProperty("status")) {
        this.statuses = v.status;
        this.pageIndex = 0;
      }
      this.manageAdminUserList();
    },
    // 排序
    sortChange({ column, prop, order }) {
      if (prop == "appRegister.evaluationUsedAccount") {
        prop = "auar.evaluationUsedAccount";
      }
      if (prop == "appRegister.evaluationRemain") {
        prop = "auar.evaluationRemain";
      }
      if (prop == "appRegister.remainDays") {
        prop = "auar.endTime";
      }
      order =
        order == "ascending" ? order.substring(0, 3) : order.substring(0, 4);
      this.sort = `${prop},${order}`;
      this.manageAdminUserList();
    },
    manageAdminUserListsearch(v) {
      // console.log(v);
      this.pageIndex = 0;
      this.manageAdminUserList(v);
    },
    //列表
    manageAdminUserList(v) {
      this.listLoading = true;
      this.$http
        .post(
          api.sale.manageAdminUserList(),
          formatUrl({
            pageIndex: localStorage.getItem("salepage") || this.pageIndex,
            pageCount: localStorage.getItem("salecount") || this.pageCount,
            sort: this.sort,
            managerIds: this.managerIds,
            statuses: this.statuses,
            search: v || ""
          })
        )
        .then(
          res => {
            if (res.data.code == "00") {
              this.listLoading = false;

              this.tenantAccountData = res.data.data;
              this.tenantAccountData.content.forEach(el => {
                if (el.appRegister) {
                  el.appRegister.manager = el.appRegister.manager
                    ? el.appRegister.manager
                    : { id: null, name: null };
                } else {
                  el.appRegister = { manager: { id: null, name: null } };
                }
              });
              // console.log(res);
            }
            if (res.data.code == "500") {
              this.listLoading = false;

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
    //负责人
    findManager() {
      this.$http.post(api.sale.findManager()).then(
        res => {
          if (res.data.code == "00") {
            this.saleoptions = res.data.data;
            this.saleoptions.forEach(el => {
              this.chargeoptions.push({ text: el.name, value: el.id });
            });
            // this.chargeoptions=
            // console.log(this.chargeoptions);
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
    findHunterStatus() {
      this.salestatusoptions = [
        {
          id: 8,
          name: this.$t("ststus.saleStatus.n1"),
          value: "未联系",
          type: 1
        },
        {
          id: 9,
          name: this.$t("ststus.saleStatus.n2"),
          value: "已联系",
          type: 1
        },
        {
          id: 10,
          name: this.$t("ststus.saleStatus.n3"),
          value: "已演示",
          type: 1
        },
        {
          id: 11,
          name: this.$t("ststus.saleStatus.n4"),
          value: "已稳定使用",
          type: 1
        },
        {
          id: 12,
          name: this.$t("ststus.saleStatus.n5"),
          value: "已暂停使用",
          type: 1
        },
        {
          id: 13,
          name: this.$t("ststus.saleStatus.n6"),
          value: "无效客户",
          type: 1
        },
        {
          id: 14,
          name: this.$t("ststus.saleStatus.n7"),
          value: "重点跟进",
          type: 1
        },
        {
          id: 15,
          name: this.$t("ststus.saleStatus.n8"),
          value: "无人接听",
          type: 1
        }
      ];
      this.salestatusoptions.forEach(el => {
        this.optionsStatus.push({ text: el.name, value: el.value });
      });

      // this.$http.post(api.sale.findHunterStatus()).then(
      //   res => {
      //     if (res.data.code == "00") {
      //       this.salestatusoptions = res.data.data;
      //       this.salestatusoptions.forEach(el => {
      //         this.optionsStatus.push({ text: el.name, value: el.name });
      //       });
      //       console.log(JSON.stringify(this.salestatusoptions));
      //     }
      //     if (res.data.code == "500") {
      //       this.$message({
      //         type: "error",
      //         message: res.data.errMessage
      //       });
      //     }
      //   },
      //   error => {
      //     console.log(error);
      //   }
      // );
    },
    tenantAccountCurrentChange(val) {
      this.pageIndex = val - 1;
      localStorage.setItem("salepage", this.pageIndex);
      this.manageAdminUserList();
    },
    tenantAccountSizeChange(val) {
      this.pageCount = val;
      localStorage.setItem("salecount", this.pageCount);
      this.manageAdminUserList();
    },

    closedialog(formName) {
      this.remarkdialog = false;
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      // this.remarkruleForm.remark = "";
    },
    openremark(v, formName) {
      this.historyData = v;
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.remarkdialog = true;
      this.remarkruleForm.hunterId = v.row.appRegister.id;
      this.remarkruleForm.type = 0;
      // this.remarkruleForm.remark = "";
      this.remarkruleForm.status = v.row.appRegister.newStatus;
      // this.hunterHistoryStatusData = v.row.appRegister.hunterHistoryStatus;
      this.findStatusByHunter(v.row.appRegister.id);
    },
    //查备注
    findStatusByHunter(id) {
      this.$http.post(api.sale.findStatusByHunter(), formatUrl({ id })).then(
        res => {
          if (res.data.code == "00") {
            this.hunterHistoryStatusData = res.data.data;
            // console.log(res);
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

    //状态修改
    statuschange(v) {
      this.statusdialog = true;
      this.statusform = {
        hunterId: v.row.appRegister.id,
        status: v.row.appRegister.newStatus,
        type: 1
      };
      // console.log(v);
    },
    cancelstatusdialog() {
      this.statusdialog = false;
      this.remark = "";
      this.manageAdminUserList();
    },
    saveHunterHistoryStatus() {
      this.statusform.remark = this.remark;
      this.$http
        .post(api.register.saveHunterHistoryStatus(), this.statusform)
        .then(
          res => {
            if (res.data.code == "00") {
              this.$message({
                type: "success",
                message: this.$t("msg.msg1")
              });
              this.remark = "";
              this.statusdialog = false;
              this.manageAdminUserList();
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
    onlysave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnloading = true;
          this.$http
            .post(api.register.saveHunterHistoryStatus(), this.remarkruleForm)
            .then(
              res => {
                this.btnloading = false;
                if (res.data.code == "00") {
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg17")
                  });
                  if (this.$refs[formName] !== undefined) {
                    this.$refs[formName].resetFields();
                  }
                  this.findStatusByHunter(this.historyData.row.appRegister.id);
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
    //删除备注
    deleteStatusById(v) {
      // console.log(v.row);
      this.$http
        .post(api.sale.deleteStatusById(), formatUrl({ id: v.row.id }))
        .then(
          res => {
            if (res.data.code == "00") {
              this.$message({
                type: "success",
                message: this.$t("msg.msg2")
              });
              this.findStatusByHunter(this.historyData.row.appRegister.id);
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
    //负责人修改
    saveManager() {
      this.$confirm(
        this.$t("saleSystem.tip.saleTip1"),
        this.$t("saleSystem.tip.title"),
        {
          type: "warning"
        }
      )
        .then(() => {
          this.$http
            .post(api.register.saveManager(), formatUrl(this.salechangeId))
            .then(
              res => {
                if (res.data.code == "00") {
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg1")
                  });
                  this.manageAdminUserList();
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
        })
        .catch(() => {
          this.manageAdminUserList();
        });
    },

    salechange(v) {
      this.salechangeId.registerId = v.row.appRegister.id;
      this.salechangeId.managerId = v.row.appRegister.manager.id;
      this.saveManager();
    },

    //导出列表
    exportManageAdminUserList() {
      let para = {
        sort: this.sort,
        managerIds: this.managerIds,
        statuses: this.statuses,
        lang: Cookies.get("language") == "en" ? "en_US" : "zh_CN"
      };
      this.exportloading = true;
      this.isexport = true;
      this.$http
        .get(api.sale.exportManageAdminUserList(), {
          params: para,
          headers: {
            "Content-Type": "application/x-msdownload;charset =utf-8"
          }
        })
        .then(
          res => {
            if (res.data.code == "500") {
              this.isexport = false;
              this.$message({
                type: "error",
                message: res.data.errMessage
              });
              this.exportloading = false;
            } else if (res.data.code == "911") {
              location.href = "./login.html";
            } else {
              this.isexport = false;
              this.exportloading = false;
              window.open(
                api.sale.exportManageAdminUserList() + "?" + formatUrl(para),
                Date.now()
              );
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    //客户形式
    formchange(v) {
      this.formObj.registerId = v.row.appRegister.id;
      this.formObj.form = v.row.appRegister.form;
      this.saveForm();
    },

    saveForm() {
      this.$confirm(
        this.$t("saleSystem.tip.saleTip2"),
        this.$t("saleSystem.tip.title"),
        {
          type: "warning"
        }
      )
        .then(() => {
          this.$http.post(api.sale.saveForm(), formatUrl(this.formObj)).then(
            res => {
              if (res.data.code == "00") {
                this.$message({
                  type: "success",
                  message: this.$t("msg.msg1")
                });
                this.manageAdminUserList();
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
        })
        .catch(() => {
          this.manageAdminUserList();
        });
    }
  }
};
</script>
<style>
.remarkbox {
  position: relative;
}
.remarkbox .sure {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 4%;
}
.statusTop {
  overflow: hidden;
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
}
.newestselect .el-input--suffix .el-input__inner {
  padding-right: 10px;
}
.remarkdialog .el-dialog {
  min-width: 820px;
}
.testclass {
  transform: translateX(80px);
}
.el-form-item__label {
  text-align: left;
  line-height: normal;
}
</style>


