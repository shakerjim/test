<template>
  <div class="staffmain">
    <div class="main_top">

      <el-input
        :placeholder="$t('staffSystem.search')"
        v-model.trim="searchcontent"
        @keyup.enter.delete.native="findAllAndSeachsearch"
      >
      </el-input>
      <el-button
        type="success"
        class="searchbutton green"
        @click="findAllAndSeachsearch"
        icon="el-icon-search"
      ></el-button>
    </div>
    <div class="tablelist">
      <!-- <div class="title">Centalent >
        <span>现有员工管理列表页</span>
      </div> -->
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="title"
      >
        <el-breadcrumb-item>
          <a href="./news.html">Centalent</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('staffSystem.staffPage')}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="tablebox">
        <div class="listbox">
          <div class="listword">
            {{$t('staffSystem.staffList')}}
          </div>
          <el-button
            class="blue addposition"
            @click="addposition('positionform')"
          > {{$t('businessSystem.detail.addPosition')}}
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
        </div>

        <div>
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
              :label="$t('staffSystem.name')"
            >
              <template slot-scope="scope">
                <span
                  @click="linkpositiondetail(scope)"
                  style="color:#249739;cursor:pointer"
                >{{scope.row.name}}</span>
                <!-- <el-button type="text" size="medium" @click="linkpositiondetail(scope)">{{scope.row.name}}</el-button> -->
              </template>
            </el-table-column>
            <el-table-column
              prop="department"
              :label="$t('staffSystem.departments')"
            >
            </el-table-column>
            <el-table-column
              prop="number"
              :label="$t('staffSystem.number')"
            >
            </el-table-column>
            <el-table-column
              prop="updateDate"
              :label="$t('staffSystem.updateTime')"
              :formatter="dateFormat"
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
        </div>
      </div>

    </div>

    <!-- 添加职位 -->
    <el-dialog
      :visible.sync="positiondialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
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
          :label="$t('staffSystem.departments')"
          :label-width="formLabelWidth"
          class="industry"
          prop="department"
        >
          <el-input
            v-model.trim="positionform.department"
            auto-complete="off"
            :maxlength="maxlength"
            :placeholder="$t('valid.valid048')"
          ></el-input>
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
          @click="saveCompanyEmployee('positionform')"
          :loading="isSave"
        >{{$t('btn.submit')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "../../../api/api.js";
import Util from "../../../tool/tool.js";
import formatUrl from "../../../lib/tool.js";
let mytools = new Util();
export default {
  data() {
    return {
      maxlength: 50,
      positiondialog: false,
      positionformrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.valid030"),
            trigger: "blur"
          }
        ],
        department: [
          {
            required: true,
            message: this.$t("valid.valid048"),
            trigger: "blur"
          }
        ]
      },
      listLoading: true,
      status: "",
      page: 0,
      size: 20,
      searchcontent: "",
      tableData: [],
      currentPage1: 1,
      positionform: {},
      formLabelWidth: "220px",
      isSave: false
    };
  },
  created() {
    this.findAllAndSeach();
    // this.selectSeller();
  },
  methods: {
    dateFormat(row, column) {
      return mytools.datefilter(row.updateDate);
    },
    findAllAndSeach() {
      this.listLoading = true;
      var para = {
        page: this.page,
        size: this.size,
        search: this.searchcontent
      };
      this.$http
        .post(api.CompanyEmployee.findAllAndSeach(), formatUrl(para))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.listLoading = false;
              // console.log(res);
              // if (res.data.data.content.length > 0) {
              //   res.data.data.content.forEach(el => {
              //     el.updateDate = el.updateDate ? el.updateDate : el.createDate;
              //     el.updateDate =
              //       new Date(el.updateDate).getFullYear() +
              //       "-" +
              //       parseInt(new Date(el.updateDate).getMonth() + 1) +
              //       "-" +
              //       new Date(el.updateDate).getDate();
              //   });
              // }

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
    findAllAndSeachsearch() {
      this.page = 0;
      this.findAllAndSeach();
    },
    handleSizeChange(val) {
      this.size = val;
      this.findAllAndSeach();
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      this.findAllAndSeach();
    },
    //添加职位
    addposition(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.positiondialog = true;
      // this.positionform.sellerId = parseInt(localStorage.getItem("sellerId"));
    },
    saveCompanyEmployee(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isSave = true;
          this.$http
            .post(api.CompanyEmployee.saveCompanyEmployee(), this.positionform)
            .then(
              res => {
                if (res.data.code == "00") {
                  this.isSave = false;
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg3")
                  });
                  this.positiondialog = false;
                  this.findAllAndSeach();
                  window.open(
                    "./staff.html#/managedetail?id=" + res.data.data.id
                  );
                }
                if (res.data.code == "500") {
                  this.isSave = false;
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    linkpositiondetail(v) {
      window.open("./staff.html#/managedetail?id=" + v.row.id);
      // console.log(v);
    },
    linkcompanydetail(v) {
      window.open("./bussiness.html#/managedetail?id=" + v.row.companyId);
      // console.log(v);
    }
  }
};
</script>
<style>
.staffmain {
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
.addposition.el-button {
  /* position: absolute; */
  right: 5%;
  float: right;
  /* top: 69px; */
  z-index: 99;
}
.testclass {
  transform: translateX(80px);
}
</style>


