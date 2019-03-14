<template>
  <div class="positionmain">
    <div class="tablelist">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item>
          <a href="./news.html">Centalent</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>执照审核管理列表页</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="tablebox">
        <div class="listbox">
          <div class="listword">
            执照审核管理列表
          </div>

        </div>

        <el-tabs type="border-card" value="CHECK_PENDING" class="businessInfo" @tab-click="changeClick">
          <el-tab-pane label="审核中" name="CHECK_PENDING">

            <el-table :data="companyContentcn.content" stripe style="width: 100%" v-loading="listLoading" element-loading-text="拼命加载中" highlight-current-row class="icspersontable">
              <el-table-column prop="name" label="企业名称">
                <template slot-scope="scope">
                  <span @click="linkcompanydetail(scope)" style="color:#249739;cursor:pointer">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="companyType" label="企业类型">
              </el-table-column>
              <el-table-column prop="area" label="企业地区">
              </el-table-column>
              <el-table-column prop="trade" label="企业行业">
              </el-table-column>
              <el-table-column prop="scale" label="企业规模">
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination popper-class="testclass" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="companyContent.size" layout="total, sizes, prev, pager, next, jumper" :total="companyContent.totalElements">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="审核成功" name="ADOPT_CHECK">

            <el-table :data="companyContentcn.content" stripe style="width: 100%" v-loading="listLoading" element-loading-text="拼命加载中" highlight-current-row class="icspersontable">
              <el-table-column prop="name" label="企业名称">
                <template slot-scope="scope">
                  <span @click="linkcompanydetail(scope)" style="color:#249739;cursor:pointer">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="companyType" label="企业类型">
              </el-table-column>
              <el-table-column prop="area" label="企业地区">
              </el-table-column>
              <el-table-column prop="trade" label="企业行业">
              </el-table-column>
              <el-table-column prop="scale" label="企业规模">
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination popper-class="testclass" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="companyContent.size" layout="total, sizes, prev, pager, next, jumper" :total="companyContent.totalElements">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="审核失败" name="FAIL_CHECK">

            <el-table :data="companyContentcn.content" stripe style="width: 100%" v-loading="listLoading" element-loading-text="拼命加载中" highlight-current-row class="icspersontable">
              <el-table-column prop="name" label="企业名称">
                <template slot-scope="scope">
                  <span @click="linkcompanydetail(scope)" style="color:#249739;cursor:pointer">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="companyType" label="企业类型">
              </el-table-column>
              <el-table-column prop="area" label="企业地区">
              </el-table-column>
              <el-table-column prop="trade" label="企业行业">
              </el-table-column>
              <el-table-column prop="scale" label="企业规模">
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination popper-class="testclass" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="companyContent.size" layout="total, sizes, prev, pager, next, jumper" :total="companyContent.totalElements">
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
      pageNum: 0,
      pageSize: 20,
      currentPage1: 1,
      approveStatus: "CHECK_PENDING",
      companyContent: [],
      listLoading: true
    };
  },
  computed: {
    companyContentcn: function() {
      if (this.companyContent.content) {
        this.companyContent.content.forEach(el => {
          if (el.companyType == "PRIVATE_ENTERPRISES") {
            el.companyType = "私有企业";
          }
          if (el.companyType == "FOREIGN_CAPITAL") {
            el.companyType = "外资/中外合资企业";
          }
          if (el.companyType == "STATE_ENTERPRISES") {
            el.companyType = "国有企业";
          }
        });
      }

      return this.companyContent;
    }
  },
  created() {
    this.getCompanyList();
  },
  methods: {
    // 企业审核接口-获取企业列表
    getCompanyList() {
      let para = {
        approveStatus: this.approveStatus,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        token: "o213jofvv0sdi2304m3l2rnfdc0ds98r0345i3lmrlewfhcsd9"
      };
      this.$http.post(api.wxCompanyInfo.getCompanyList(), formatUrl(para)).then(
        res => {
          console.log(res);
          this.listLoading = false;
          if (res.data.code == "00") {
            this.companyContent = res.data.data;
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    changeClick(tab, event) {
      // console.log(tab);
      this.approveStatus = tab.name;
      // this.findByStatus();
      this.getCompanyList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCompanyList();
    },
    handleCurrentChange(val) {
      this.pageNum = val - 1;
      this.getCompanyList();
    },
    linkcompanydetail(v) {
      // console.log(v);
      this.$router.push({
        path: "/detail",
        query: {
          id: v.row.id,
          status: v.row.approveStatus
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


