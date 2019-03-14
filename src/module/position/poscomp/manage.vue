<template>
  <div class="positionmain">
    <!-- 添加职位 -->
    <el-dialog
      :visible.sync="positiondialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <!-- 负责人 -->
      <el-dialog
        width="20%"
        :visible.sync="saleVisible"
        append-to-body
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
        <!-- :label='item.name+"/"+item.id' -->
        <div
          slot="footer"
          class="dialog-footer tradebutton"
        >

          <el-button
            @click="cancelsaleVisible"
            size="small"
          >{{$t('btn.cancel')}}</el-button>
          <el-button
            type="success"
            class="green"
            @click="suresaleVisible"
            size="small"
          >{{$t('btn.sure')}}</el-button>
        </div>
      </el-dialog>
      <el-form
        :model="positionform"
        :rules="positionformrules"
        ref="positionform"
        :label-position="'left'"
      >
        <el-form-item
          :label="$t('staffSystem.jobName')"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model.trim="positionform.name"
            auto-complete="off"
            :maxlength="maxlength"
            :placeholder="$t('valid.valid030')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('news.positonNews.recruitsNumber')"
          :label-width="formLabelWidth"
          class="industry"
          prop="number"
        >
          <el-input
            v-model.trim="positionform.number"
            auto-complete="off"
            :maxlength="maxlength"
            :placeholder="$t('valid.valid031')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('news.positonNews.monthSalary')"
          :label-width="formLabelWidth"
          prop="monthly"
        >
          <el-input
            v-model.trim="positionform.monthly"
            auto-complete="off"
            :maxlength="maxlength"
            :placeholder="$t('valid.valid032')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('news.positonNews.yearSalary')"
          :label-width="formLabelWidth"
          prop="annual"
        >
          <el-input
            v-model.trim="positionform.annual"
            auto-complete="off"
            :maxlength="maxlength"
            :placeholder="$t('valid.valid033')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('news.positonNews.chargePerson')"
          :label-width="formLabelWidth"
          class="sale"
          prop="sellerId"
        >
          <el-select
            v-model="positionform.sellerId"
            disabled
            class="sellerId"
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
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="positiondialog = false">{{$t('btn.back')}}</el-button>
        <el-button
          type="success"
          class="green"
          @click="savePosition('positionform')"
          :loading="isUp"
        >{{$t('btn.submit')}}</el-button>
      </div>
    </el-dialog>

    <div class="main_top">

      <el-input
        :placeholder="$t('recruitSystem.search')"
        v-model.trim="searchcontent"
        @keyup.enter.delete.native="findCompanyPositionByPrivilegesearch"
      >
      </el-input>
      <el-button
        type="success"
        class="searchbutton green"
        @click="findCompanyPositionByPrivilegesearch"
        icon="el-icon-search"
      ></el-button>
    </div>
    <div class="tablelist">
      <!-- <div class="title">Centalent >
        <span>职位管理列表页</span>
      </div> -->
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="title"
      >
        <el-breadcrumb-item>
          <a href="./news.html">Centalent</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('recruitSystem.recruitPage')}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="tablebox">
        <div class="listbox">
          <div class="listword">
            {{$t('recruitSystem.recruitList')}}
          </div>

        </div>

        <el-button
          class="blue addposition"
          @click="addposition('positionform')"
          v-if="this.$store.state.Privilege.includes('BUTTON_POSITION_ADD')"
        > {{$t('businessSystem.detail.addPosition')}}
          <i class="el-icon-plus el-icon--right"></i>
        </el-button>
        <el-tabs
          type="border-card"
          @tab-click="changeClick"
          value="Recruiting"
          class="businessInfo"
        >
          <el-tab-pane
            :label="$t('recruitSystem.recruiting')"
            name="Recruiting"
          >
            <el-table
              :data="tableData.content"
              stripe
              style="width: 100%"
              v-loading="listLoading"
              :element-loading-text="$t('businessSystem.loading')"
              :empty-text="$t('recruitSystem.screen.nodata')"
              highlight-current-row
              class="icspersontable"
            >
              <el-table-column
                prop="name"
                :label="$t('news.positonNews.jobName')"
              >
                <template slot-scope="scope">
                  <span
                    @click="linkpositiondetail(scope)"
                    style="color:#249739;cursor:pointer"
                  >{{scope.row.name||$t('login.noname')}}</span>
                  <!-- <el-button type="text" size="medium" @click="linkpositiondetail(scope)">{{scope.row.name}}</el-button> -->
                </template>
              </el-table-column>

              <el-table-column
                prop="companyInfo.name"
                :label="$t('news.positonNews.affiliatedEnterprises')"
                v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_COMPANY')"
              >
                <template slot-scope="scope">
                  <span
                    @click="linkcompanydetail(scope)"
                    style="color:#249739;cursor:pointer"
                  >{{scope.row.companyInfo.name}}</span>

                  <!-- <el-button type="text" size="medium" @click="linkcompanydetail(scope)">{{scope.row.companyInfo.name}}</el-button> -->
                </template>
              </el-table-column>
              <!-- <el-table-column prop="companyInfo.name" :label="$t('news.positonNews.affiliatedEnterprises')"  v-else>
                    </el-table-column> -->
              <el-table-column
                prop="number"
                :label="$t('news.positonNews.recruitsNumber')"
              >
              </el-table-column>
              <el-table-column
                prop="monthly"
                :label="$t('news.positonNews.monthSalary')"
              >
              </el-table-column>
              <el-table-column
                prop="annual"
                :label="$t('news.positonNews.yearSalary')"
              >
              </el-table-column>
              <el-table-column
                prop="charge"
                :label="$t('news.positonNews.scale')"
                v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CHARGE')"
              >
              </el-table-column>
              <el-table-column
                prop="appUser.name"
                :label="$t('news.positonNews.chargePerson')"
                v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')"
              >
              </el-table-column>
              <el-table-column
                prop="candidate"
                :label="$t('news.positonNews.number')"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="candidateStatus"
                :label="$t('news.positonNews.latestStatus')"
                :formatter="posFormat"
                v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CANDIDATE_STATUS')"
              >
              </el-table-column>
              <el-table-column
                prop="updateDate"
                :label="$t('news.positonNews.updateTime')"
              >
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                popper-class="testclass"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="tableData.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.totalElements"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane
            :label="$t('recruitSystem.recruited')"
            name="Completed"
          >
            <el-table
              :data="tableData.content"
              stripe
              style="width: 100%"
              v-loading="listLoading"
              :element-loading-text="$t('businessSystem.loading')"
              :empty-text="$t('recruitSystem.screen.nodata')"
              highlight-current-row
              class="icspersontable"
            >
              <el-table-column
                prop="name"
                :label="$t('news.positonNews.jobName')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="medium"
                    @click="linkpositiondetail(scope)"
                  >{{scope.row.name||$t('login.noname')}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="companyInfo.name"
                :label="$t('news.positonNews.affiliatedEnterprises')"
                v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_COMPANY')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="medium"
                    @click="linkcompanydetail(scope)"
                  >{{scope.row.companyInfo.name}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="number"
                :label="$t('news.positonNews.recruitsNumber')"
              >
              </el-table-column>
              <el-table-column
                prop="monthly"
                :label="$t('news.positonNews.monthSalary')"
              >
              </el-table-column>
              <el-table-column
                prop="annual"
                :label="$t('news.positonNews.yearSalary')"
              >
              </el-table-column>
              <el-table-column
                prop="charge"
                :label="$t('news.positonNews.scale')"
                v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CHARGE')"
              >
              </el-table-column>
              <el-table-column
                prop="appUser.name"
                :label="$t('news.positonNews.chargePerson')"
                v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')"
              >
              </el-table-column>
              <el-table-column
                prop="candidate"
                :label="$t('news.positonNews.number')"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="candidateStatus"
                :label="$t('news.positonNews.latestStatus')"
                :formatter="posFormat"
                v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CANDIDATE_STATUS')"
              >
              </el-table-column>
              <el-table-column
                prop="updateDate"
                :label="$t('news.positonNews.updateTime')"
              >
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                popper-class="testclass"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="tableData.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.totalElements"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane
            :label="$t('recruitSystem.closed')"
            name="Closed"
          >
            <el-table
              :data="tableData.content"
              stripe
              style="width: 100%"
              v-loading="listLoading"
              :element-loading-text="$t('businessSystem.loading')"
              :empty-text="$t('recruitSystem.screen.nodata')"
              highlight-current-row
              class="icspersontable"
            >
              <el-table-column
                prop="name"
                :label="$t('news.positonNews.jobName')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="medium"
                    @click="linkpositiondetail(scope)"
                  >{{scope.row.name||$t('login.noname')}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="companyInfo.name"
                :label="$t('news.positonNews.affiliatedEnterprises')"
                v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_COMPANY')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="medium"
                    @click="linkcompanydetail(scope)"
                  >{{scope.row.companyInfo.name}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="number"
                :label="$t('news.positonNews.recruitsNumber')"
              >
              </el-table-column>
              <el-table-column
                prop="monthly"
                :label="$t('news.positonNews.monthSalary')"
              >
              </el-table-column>
              <el-table-column
                prop="annual"
                :label="$t('news.positonNews.yearSalary')"
              >
              </el-table-column>
              <el-table-column
                prop="charge"
                :label="$t('news.positonNews.scale')"
                v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CHARGE')"
              >
              </el-table-column>
              <el-table-column
                prop="appUser.name"
                :label="$t('news.positonNews.chargePerson')"
                v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')"
              >
              </el-table-column>
              <el-table-column
                prop="candidate"
                :label="$t('news.positonNews.number')"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="candidateStatus"
                :label="$t('news.positonNews.latestStatus')"
                :formatter="posFormat"
                v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CANDIDATE_STATUS')"
              >
              </el-table-column>
              <el-table-column
                prop="updateDate"
                :label="$t('news.positonNews.updateTime')"
              >
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                popper-class="testclass"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="tableData.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.totalElements"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

    </div>

  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
export default {
  data() {
    return {
      listLoading: true,
      mysellerId: "",
      positiondialog: false,
      positionform: {},
      positionformrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.valid030"),
            trigger: "blur"
          }
        ],
        number: [
          {
            required: true,
            message: this.$t("valid.valid031"),
            trigger: "blur"
          }
        ],
        monthly: [
          {
            required: true,
            message: this.$t("valid.valid032"),
            trigger: "blur"
          }
        ],
        annual: [
          {
            required: true,
            message: this.$t("valid.valid033"),
            trigger: "blur"
          }
        ],
        charge: [
          {
            required: true,
            message: this.$t("valid.valid038"),
            trigger: "blur"
          },
          {
            type: "number",
            message: this.$t("valid.valid057")
          },
          {
            pattern: /^(0|[1-9]\d?|100)$/,
            message: this.$t("valid.valid039"),
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "100px",
      maxlength: 50,
      saleVisible: false,
      selectSelleroptions: [],
      status: "Recruiting",
      page: 0,
      size: 20,
      currentPage1: 1,
      tableData: [],
      searchcontent: "",
      isUp: false
    };
  },
  created() {
    document.title = `${this.$t("sidebar.recruitSystem")}`;
    this.findCompanyPositionByPrivilege();
    this.selectSeller();
  },
  methods: {
    //职位候选人状态
    posFormat(row, column) {
      switch (row.candidateStatus) {
        case "无状态":
          return this.$t("ststus.businessStatus.n1");
          break;
        case "加入职位":
          return this.$t("ststus.positionStatus.n1");
          break;
        case "已联系-有兴趣":
          return this.$t("ststus.positionStatus.n2");
          break;
        case "已联系-没兴趣":
          return this.$t("ststus.positionStatus.n3");
          break;
        case "待面试":
          return this.$t("ststus.positionStatus.n4");
          break;
        case "面试完成":
          return this.$t("ststus.positionStatus.n5");
          break;
        case "已入职":
          return this.$t("ststus.positionStatus.n6");
          break;
        case "退出职位":
          return this.$t("ststus.positionStatus.n7");
          break;
      }
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
            this.positionform.sellerId = this.mysellerId;
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
      this.mysellerId = this.positionform.sellerId;
    },
    suresaleVisible() {
      this.saleVisible = false;
      this.positionform.sellerId = this.mysellerId;
    },
    opensaleVisible() {
      this.saleVisible = true;
      this.mysellerId = this.positionform.sellerId;
    },
    changeClick(tab, event) {
      // console.log(tab);
      this.status = tab.name;
      // this.findByStatus();
      this.findCompanyPositionByPrivilege();
    },
    findCompanyPositionByPrivilegesearch() {
      this.page = 0;
      this.findCompanyPositionByPrivilege();
    },
    findCompanyPositionByPrivilege() {
      this.listLoading = true;

      var para = {
        status: this.status,
        pageIndex: this.page,
        pageCount: this.size,
        search: this.searchcontent,
        sort: "updateDate,DESC",
        ifNeed: ""
      };
      this.$http
        .post(api.position.findCompanyPositionByPrivilege(), formatUrl(para))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.listLoading = false;
              // console.log(res);
              if (res.data.data.content.length > 0) {
                res.data.data.content.forEach(el => {
                  el.updateDate = el.updateDate ? el.updateDate : el.createDate;
                  el.updateDate =
                    new Date(el.updateDate).getFullYear() +
                    "-" +
                    parseInt(new Date(el.updateDate).getMonth() + 1) +
                    "-" +
                    new Date(el.updateDate).getDate();
                });
              }

              this.tableData = res.data.data;
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
    linkpositiondetail(v) {
      this.$router.push({
        path: "/managedetail",
        query: {
          id: v.row.id
        }
      });
      // console.log(v);
    },
    linkcompanydetail(v) {
      location.href = "./bussiness.html#/managedetail?id=" + v.row.companyId;
    },
    handleSizeChange(val) {
      this.size = val;
      this.findCompanyPositionByPrivilege();
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      this.findCompanyPositionByPrivilege();
    },
    //添加职位
    addposition(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.positiondialog = true;
      // this.positionform.sellerId = parseInt(localStorage.getItem("sellerId"));
    },
    savePosition(formName) {
      // this.positionform.companyId = this.$route.query.id;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.positionform.sellerId) {
            this.isUp = true;
            this.$http
              .post(api.position.savePosition(), formatUrl(this.positionform))
              .then(
                res => {
                  this.isUp = false;
                  if (res.data.code == "00") {
                    this.$message({
                      type: "success",
                      message: this.$t("msg.msg3")
                    });
                    this.positiondialog = false;
                    this.findCompanyPositionByPrivilege();
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
          } else {
            this.$message({
              type: "warning",
              message: this.$t("valid.valid008")
            });
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
<style>
/* .el-main {
  padding: 0;
} */
.positionmain {
  padding: 0;
}
.main_top {
  min-width: 700px;
  height: 110px;
  background-color: #fff;
  border-left: 1px solid #ebeef5;
  padding-left: 20px;
  padding-top: 31px;
  box-sizing: border-box;
}

.main_top .el-input {
  float: left;
  width: 480px;
  font-size: 16px;
  color: #7b7f7f;
}

.main_top .el-input__inner {
  height: 48px;
  background-color: #f4f7fc;
}

.main_top .searchbutton {
  float: left;
  height: 48px;
  padding: 12px;
  font-size: 24px;
}

.tablelist {
  position: relative;
  padding: 0 3%;
  background-color: #f4f8fc;
  margin-bottom: 30px;
}

.tablelist .el-tabs__nav {
  left: 50%;
  transform: translateX(-50%) !important;
}

.tablelist .el-tabs--border-card > .el-tabs__content {
  padding: 0 0 15px 0;
  border: 1px solid #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #ccc;
}

.tablebox .listbox {
  position: absolute;
  padding: 14px 30px;
  z-index: 99;
}

.businessInfo.el-tabs--border-card {
  margin: 0;
}

.addposition.el-button {
  position: absolute;
  right: 5%;
  top: 69px;
  z-index: 99;
}

.el-form-item.is-required .el-form-item__label:before {
  display: none;
}

.sellerId .el-input__suffix {
  display: none;
}

.el-select.sellerId {
  float: left;
  width: 80%;
}

.sale button {
  width: 15%;
  float: left;
  margin-left: 5%;
}

.el-radio.saleperson {
  display: block;
  margin-bottom: 15px;
  margin-left: 0;
  text-align: left;
}
.testclass {
  transform: translateX(80px);
}
</style>


