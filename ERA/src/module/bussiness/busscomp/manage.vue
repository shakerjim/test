<template>
  <div class="bussmain">
    <div class="main_top">
      <div class="main_left">
        <el-input
          :placeholder="$t('businessSystem.search')"
          v-model.trim="search"
          @keyup.enter.delete.native="findCompanyInfoByPrivilegesearch"
        >
        </el-input>
        <el-button
          type="success"
          class="searchbutton green"
          @click="findCompanyInfoByPrivilegesearch"
          icon="el-icon-search"
        ></el-button>
      </div>

    </div>
    <div class="tablelist">
      <!-- <div class="title">
        Centalent >
        <span>企业管理列表页</span>
      </div> -->
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="title"
      >
        <el-breadcrumb-item>
          <a href="./news.html">Centalent</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('businessSystem.businessPage')}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="tablebox">
        <div class="listbox">
          <div class="listword">
            {{$t('businessSystem.businessList')}}
          </div>
          <div class="listbutton">
            <el-button
              @click="addbussiness('bussinessform')"
              v-if="this.$store.state.Privilege.includes('BUTTON_COMPANY_EMENDATION')"
              class="addbutton green"
              type="success"
            > {{$t('businessSystem.addCompany')}}
              <i class="el-icon-plus el-icon--right"></i>
            </el-button>

            <el-button
              type="info"
              :disabled="this.sels.length===0"
              @click="deleteCompanyInfo"
              v-if="this.$store.state.Privilege.includes('BUTTON_COMPANY_DELETE')"
              class="delbutton"
            >{{$t('businessSystem.delete')}}
              <i class="el-icon-close el-icon--right"></i>
            </el-button>

          </div>
        </div>
        <!--表格-->
        <el-table
          :stripe="true"
          :data="companydata.content"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="selsChange"
          v-loading="listLoading"
          :element-loading-text="$t('businessSystem.loading')"
          class="icspersontable"
          :empty-text="$t('recruitSystem.screen.nodata')"
        >
          <el-table-column
            type="selection"
            width="55"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('businessSystem.search')"
          >
            <template slot-scope="scope">
              <span
                @click="linkcompanydetail(scope)"
                style="color:#249739;cursor:pointer"
              >{{scope.row.name}}</span>
              <!-- <el-button type="text" size="medium" @click="linkcompanydetail(scope)">{{scope.row.name}}</el-button> -->
            </template>
          </el-table-column>

          <el-table-column
            prop="trade"
            :label="$t('news.companyNews.trade')"
            v-if="!paralang"
          >
          </el-table-column>
          <el-table-column
            prop="tradeEn"
            :label="$t('news.companyNews.trade')"
            v-if="paralang"
          >
          </el-table-column>
          <el-table-column
            prop="scale"
            :label="$t('news.companyNews.scale')"
          >
          </el-table-column>
          <el-table-column
            prop="accountContact"
            :label="$t('news.companyNews.contacts')"
          >
          </el-table-column>
          <el-table-column
            prop="accountRecruiting"
            :label="$t('news.companyNews.position')"
          >
          </el-table-column>
          <el-table-column
            prop="accountCompleted"
            :label="$t('news.companyNews.recruitedPositions')"
          >
          </el-table-column>
          <el-table-column
            prop="accountClosed"
            :label="$t('news.companyNews.closedPositions')"
          >
          </el-table-column>
          <el-table-column
            prop="appUser.name"
            :label="$t('news.companyNews.chargePerson')"
          >

          </el-table-column>
          <el-table-column
            prop="status"
            :label="$t('news.companyNews.newstatus')"
            :formatter="busFormat"
          >

          </el-table-column>
          <el-table-column
            prop="updateTimeShow"
            :label="$t('news.companyNews.updateTime')"
          >

          </el-table-column>
        </el-table>
        <!--分页-->
        <!--分页-->
        <div class="block ">
          <el-pagination
            @size-change="handleSizeChange"
            popper-class="testclass"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="companydata.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="companydata.totalElements"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 行业 -->
      <el-dialog
        width="50%"
        :visible.sync="tradeVisible"
        class="tradedialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane
            :label="paralang?item.tradeNameEn:item.tradeName"
            v-for="(item,index) in tradeList"
            :key="index"
          >
            <el-radio-group v-model="mytrade">
              <el-radio
                :label="paralang?x.tradeNameEn:x.tradeName"
                v-for="(x,y) in item.appTrades"
                :key="y"
                class="tradeRadio"
              >{{paralang?x.tradeNameEn:x.tradeName}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
        </el-tabs>
        <div
          slot="footer"
          class="dialog-footer tradebutton"
        >
          <el-button
            type="success green"
            @click="suretradeVisible"
          >{{$t('btn.sure')}}</el-button>
          <el-button @click="canceltradeVisible">{{$t('btn.cancel')}}</el-button>
        </div>
      </el-dialog>
      <!-- 负责人 -->
      <el-dialog
        width="20%"
        :visible.sync="saleVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <el-radio-group v-model="mysellerId">
          <el-radio
            class="saleperson"
            v-for="(item,index) in selectSelleroptions"
            :key="index"
            :label='item.id'
          >{{item.name}}</el-radio>
        </el-radio-group>
        <div
          slot="footer"
          class="dialog-footer tradebutton"
        >

          <el-button
            @click="cancelsaleVisible"
            size="small"
          >{{$t('btn.cancel')}}</el-button>
          <el-button
            type="success green"
            @click="suresaleVisible"
            size="small"
          >{{$t('btn.sure')}}</el-button>
        </div>
      </el-dialog>
      <!-- 添加企业 -->
      <el-dialog
        :visible.sync="addbussinessdialog"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >

        <el-form
          :model="bussinessform"
          :rules="bussinessformrules"
          ref="bussinessform"
        >
          <el-form-item
            :label="$t('businessSystem.tip.name')"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model.trim="bussinessform.name"
              auto-complete="off"
              :maxlength="maxlength"
              :placeholder="$t('valid.valid029')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('businessSystem.tip.trade')"
            :label-width="formLabelWidth"
            prop="trade"
            class="industry"
          >
            <div @click="findTrade">
              <el-input
                v-model.trim="bussinessform.trade"
                auto-complete="off"
                :placeholder="$t('valid.valid003')"
                :readonly="true"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-edit"
                ></i>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item
            :label="$t('businessSystem.tip.scale')"
            :label-width="formLabelWidth"
            prop="scale"
          >
            <el-select
              v-model.trim="bussinessform.scale"
              :placeholder="$t('valid.valid008')"
            >
              <el-option
                :label="$t('api.sale.s1')"
                value="少于50人"
              ></el-option>
              <el-option
                :label="$t('api.sale.s2')"
                value="50-150人"
              ></el-option>
              <el-option
                :label="$t('api.sale.s3')"
                value="150-500人"
              ></el-option>
              <el-option
                :label="$t('api.sale.s4')"
                value="500-1000人"
              ></el-option>
              <el-option
                :label="$t('api.sale.s5')"
                value="1000-5000人"
              ></el-option>
              <el-option
                :label="$t('api.sale.s6')"
                value="5000-10000人"
              ></el-option>
              <el-option
                :label="$t('api.sale.s7')"
                value="10000人以上"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('news.companyNews.chargePerson')"
            :label-width="formLabelWidth"
            class="sale"
            prop="sellerId"
          >
            <el-select
              v-model="bussinessform.sellerId"
              class="sellerId"
              disabled
            >
              <el-option
                :label="item.name"
                :value="item.id"
                :key="index"
                v-for="(item,index) in selectSelleroptions"
              ></el-option>
            </el-select>
            <el-button
              type="success"
              @click="opensaleVisible"
            >{{$t('businessSystem.tip.choose')}}</el-button>
          </el-form-item>
          <!-- <input type="hidden" v-model.trim="bussinessform.sellerId"> -->
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="addbussinessdialog = false">{{$t('btn.cancel')}}</el-button>
          <el-button
            type="success"
            @click="saveCompanyInfo('bussinessform')"
            :loading="isSure"
          >{{$t('btn.sure')}}</el-button>
        </div>
      </el-dialog>

    </div>

  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
import { quillEditor } from "vue-quill-editor";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      paralang: true,
      isSure: false,
      mysellerId: "",
      mytrade: "",
      maxlength: 50,
      bussinessform: {
        // sellerId: ""
      },
      addbussinessdialog: false,
      tradeVisible: false,
      tabPosition: "left",
      tradeList: [],
      dialogFormVisible6: false,
      language: "",
      emailmodelform: [],
      buttonloading: false,
      buttonloading2: false,
      listLoading: false,
      page: 0,
      size: 20,
      search: "",
      userData: [],
      sels: [], //列表选中列
      currentPage: 1,
      companydata: {},
      searchcontent: "",
      // index: "",
      //navList: [" 最新动态", " 企业管理", "职位管理", " 简历筛选工具", " 人才库", "个人测评管理", "职位测评管理", " 系统管理", "评测分析管理"],

      isCollapse: true,

      dialogFormVisible: false,
      formLabelWidth: "180px",
      bussinessformrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.valid002"),
            trigger: "blur"
          }
        ],
        scale: [
          {
            required: true,
            message: this.$t("valid.valid004"),
            trigger: "change"
          }
        ],
        trade: [
          {
            required: true,
            message: this.$t("valid.valid003"),
            trigger: "change"
          }
        ]
        // sellerId: [
        //   { required: true, message: "请选择负责人", trigger: "blur,change" }
        // ]
      },
      //负责人
      saleVisible: false,
      selectSelleroptions: []
    };
  },
  created() {
    document.title = `${this.$t("sidebar.businessSystem")}`;
    this.getlang();
    this.updatepagination();
    this.findCompanyInfoByPrivilege();
    this.selectSeller();
  },
  components: {
    quillEditor
  },
  methods: {
    getlang() {
      if (Cookies.get("language") == "zh") {
        this.paralang = false;
      } else {
        this.paralang = true;
      }
    },
    updatepagination() {
      this.currentPage = parseInt(localStorage.getItem("busspage")) + 1 || 1;
      this.page = localStorage.getItem("busspage") || 0;
      this.size = localStorage.getItem("busscount") || 20;
    },
    //企业状态
    busFormat(row, column) {
      switch (row.status) {
        case "无状态":
          return this.$t("ststus.businessStatus.n1");
          break;
        case "完全没有意向":
          return this.$t("ststus.businessStatus.n2");
          break;
        case "潜在客户":
          return this.$t("ststus.businessStatus.n3");
          break;
        case "跟进中":
          return this.$t("ststus.businessStatus.n4");
          break;
        case "准备签约":
          return this.$t("ststus.businessStatus.n5");
          break;
        case "已签约":
          return this.$t("ststus.businessStatus.n6");
          break;
      }
    },
    //行业列表
    //获取显示行业列表
    findTrade() {
      this.tradeVisible = true;
      this.$http.post(api.talent.findTrade()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            // console.log(res);
            this.tradeList = res.data.data;
            this.mytrade = this.bussinessform.trade;
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
    findCompanyInfoByPrivilegesearch() {
      this.page = 0;
      this.findCompanyInfoByPrivilege();
    },
    // 根据权限不同分页显示公司信息
    findCompanyInfoByPrivilege() {
      this.listLoading = true;
      var para = {
        name: this.search,
        pageIndex: this.page,
        pageCount: this.size
      };
      this.$http
        .post(api.business.findCompanyInfoByPrivilege(), formatUrl(para))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.listLoading = false;
              this.companydata = res.data.data;
            }
            if (res.data.code == "500") {
              this.listLoading = false;
              // console.log(res);
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

    //分页
    handleSizeChange(val) {
      this.size = val;
      localStorage.setItem("busscount", this.size);
      this.findCompanyInfoByPrivilege();
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      localStorage.setItem("busspage", this.page);
      this.findCompanyInfoByPrivilege();
    },
    selsChange(sels) {
      this.sels = sels;
      // console.log(sels)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    //添加企业
    addbussiness(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.addbussinessdialog = true;
    },
    saveCompanyInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.bussinessform.sellerId) {
            this.$message({
              type: "warning",
              message: this.$t("valid.valid008")
            });
          } else {
            this.isSure = true;
            this.$http
              .post(api.business.saveCompanyInfo(), this.bussinessform)
              .then(
                res => {
                  this.isSure = false;
                  if (res.data.code == "00") {
                    // console.log(res);
                    this.findCompanyInfoByPrivilege();
                    this.addbussinessdialog = false;
                    this.$message({
                      type: "success",
                      message: this.$t("msg.msg3")
                    });
                    // this.companydata = res.data.data
                  }
                  if (res.data.code == "500") {
                    console.log(res);
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
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除企业
    deleteCompanyInfo() {
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
          this.$http
            .post(api.business.deleteCompanyInfo(), formatUrl(para))
            .then(
              res => {
                if (res.data.code == "00") {
                  // console.log(res);
                  this.findCompanyInfoByPrivilege();
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
    //负责人
    selectSeller() {
      this.$http.post(api.user.selectSeller()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            // console.log(res);
            this.selectSelleroptions = res.data.data;
            this.mysellerId = this.selectSelleroptions[0].id;
            this.bussinessform.sellerId = this.mysellerId;
          }
          if (res.data.code == "500") {
            console.log(res);
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
    cancelsaleVisible() {
      this.saleVisible = false;
      this.mysellerId = this.bussinessform.sellerId;
    },
    suresaleVisible() {
      this.saleVisible = false;
      this.bussinessform.sellerId = this.mysellerId;
    },
    canceltradeVisible() {
      this.tradeVisible = false;
      this.mytrade = "";
    },
    suretradeVisible() {
      this.tradeVisible = false;
      this.bussinessform.trade = this.mytrade;
    },
    opensaleVisible() {
      this.saleVisible = true;
      this.mysellerId = this.bussinessform.sellerId;
    },
    //详情
    linkcompanydetail(v) {
      window.open("./bussiness.html#/managedetail?id=" + v.row.id);
      // console.log(v);
    }
  }
};
</script>
<style>
.bussmain {
  padding: 0;
}
.ql-toolbar.ql-snow {
  display: none;
}

.ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-top: 1px solid #ccc;
}

.ql-container.ql-snow {
  min-height: 100px;
}

.el-select {
  width: 100%;
}

.icspersontable a {
  text-decoration: none;
  display: block;
}

.sale .el-input {
  width: 80%;
  float: left;
}

.sale button {
  width: 15%;
  float: left;
  margin-left: 5%;
}

.industry .el-input-group {
  width: 100%;
}
.tradebutton {
  text-align: center;
}
.el-tabs__item {
  background-color: #fafafa;
}
.el-tabs__item.is-active {
  background-color: #fff;
}
.tradeRadio {
  width: 100%;
  float: left;
  margin: 10px 0 20px 0 !important;
}
.tradedialog .el-dialog {
  min-width: 780px;
}
.tradedialog .el-radio-group {
  width: 100%;
  text-align: left;
}
.tradedialog .el-dialog__body {
  padding: 0 20px;
}

.el-radio.saleperson {
  margin-bottom: 15px;
  margin-left: 0;
  width: 100%;
  float: left;
  text-align: left;
}
.el-select.sellerId {
  float: left;
  width: 80%;
}
.sellerId .el-input__suffix {
  display: none;
}
.el-button--text {
  color: #249739;
}
.el-button--text:focus,
.el-button--text:hover {
  color: #649739;
}
.el-form-item.is-required .el-form-item__label:before {
  display: none;
}
.testclass {
  transform: translateX(80px);
}
</style>
