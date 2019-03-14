<template>
  <div class="bussdetail">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="companytitle">
      <el-breadcrumb-item>
        <a href="./news.html">Centalent</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list' }">执照审核管理列表</el-breadcrumb-item>
      <el-breadcrumb-item>执照审核管理详情页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="companydetail">
      <div v-if="this.$route.query.status=='FAIL_CHECK'" class="checktitle red">审核不通过</div>
      <div v-if="this.$route.query.status=='ADOPT_CHECK'" class="checktitle greencn">审核通过</div>
      <div v-if="this.$route.query.status=='CHECK_PENDING'" class="checktitle yellow">待审核</div>
      <el-form ref="form" :model="cnform" label-width="120px">
        <el-form-item label="企业名称">
          <el-input v-model="form.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="企业类型">
          <el-input v-model="form.companyType" readonly></el-input>
        </el-form-item>
        <el-form-item label="企业地区">
          <el-input v-model="form.area" readonly></el-input>
        </el-form-item>
        <el-form-item label="企业行业">
          <el-input v-model="form.trade" readonly></el-input>
        </el-form-item>
        <el-form-item label="企业规模">
          <el-input v-model="form.scale" readonly></el-input>
        </el-form-item>
        <el-form-item label="企业LOGO">
          <div>
            <img :src="form.logoUrl" alt="">
          </div>
        </el-form-item>
        <el-form-item label="营业执照">
          <div>
            <img :src="form.businessLicenseUrl" alt="">
          </div>
        </el-form-item>
        <el-form-item v-if="show">
          <el-button type="primary" @click="agree">同意</el-button>
          <el-button @click="refuse">拒绝</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>

</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";

export default {
  data() {
    return {
      form: {},
      show: true,
      originalApproveStatus: null
    };
  },
  computed: {
    cnform: function() {
      if (this.form.companyType == "PRIVATE_ENTERPRISES") {
        this.form.companyType = "私有企业";
      }
      if (this.form.companyType == "FOREIGN_CAPITAL") {
        this.form.companyType = "外资/中外合资企业";
      }
      if (this.form.companyType == "STATE_ENTERPRISES") {
        this.form.companyType = "国有企业";
      }
    }
  },
  created() {
    this.getCompanyDetail();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    getCompanyDetail() {
      let para = {
        token: "o213jofvv0sdi2304m3l2rnfdc0ds98r0345i3lmrlewfhcsd9",
        companyId: this.$route.query.id
      };
      this.$http
        .get(api.wxCompanyInfo.getCompanyDetail(), {
          params: para
        })
        .then(
          res => {
            if (res.data.code == "00") {
              this.form = res.data.data;
              this.originalApproveStatus = res.data.data.approveStatus;
            }
            console.log(res);
            //   this.listLoading = false;
            //   if (res.data.code == "00") {
            //     this.companyContent = res.data.data;
            //   }
          },
          error => {
            console.log(error);
          }
        );
    },
    agree() {
      let para = {
        token: "o213jofvv0sdi2304m3l2rnfdc0ds98r0345i3lmrlewfhcsd9",
        companyId: this.$route.query.id,
        approveStatus: "ADOPT_CHECK",
        originalApproveStatus: this.originalApproveStatus
      };
      this.$http
        .post(api.wxCompanyInfo.updateCompanyApproveStatus(), formatUrl(para))
        .then(
          res => {
            // console.log(res);
            // this.listLoading = false;
            if (res.data.code == "00") {
              //   this.companyContent = res.data.data;

              this.$message({
                type: "success",
                message: "同意审核成功"
              });
              this.$router.replace({
                path: "/detail",
                query: {
                  id: this.$route.query.id,
                  status: "ADOPT_CHECK"
                }
              });
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
    refuse() {
      let para = {
        token: "o213jofvv0sdi2304m3l2rnfdc0ds98r0345i3lmrlewfhcsd9",
        companyId: this.$route.query.id,
        approveStatus: "FAIL_CHECK",
        originalApproveStatus: this.originalApproveStatus
      };
      this.$http
        .post(api.wxCompanyInfo.updateCompanyApproveStatus(), formatUrl(para))
        .then(
          res => {
            // console.log(res);
            // this.listLoading = false;
            if (res.data.code == "00") {
              // this.show = false;
              // this.$route.query.status = "FAIL_CHECK";

              this.$message({
                type: "success",
                message: "拒绝审核成功"
              });
              this.$router.replace({
                path: "/detail",
                query: {
                  id: this.$route.query.id,
                  status: "FAIL_CHECK"
                }
              });
              //   this.companyContent = res.data.data;
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
    }
  }
};
</script>
<style>
.bussdetail {
  padding: 0 3%;
}
.companytitle {
  height: 70px;
  line-height: 70px;
  font-size: 14px;
  text-align: left;
  color: #414141;
}
.companytitle span {
  color: #249739;
}
.companydetail {
  background: #ffffff;
  margin-bottom: 30px;
  padding: 50px 40px 0;
  border: 1px solid #fff;
  box-shadow: 2px 2px 2px #ccc;
  border-radius: 5px;
}
.el-form-item img {
  width: 100%;
}
.checktitle {
  font-size: 24px;
  text-align: center;
  padding-bottom: 22px;
  font-weight: bold;
}
.red {
  color: red;
}
.greencn {
  color: #249739;
}
.yellow {
  color: orange;
}
</style>


