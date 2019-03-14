<template>

  <!-- 备注 -->
  <el-dialog
    :visible.sync="myremarkdialog"
    @close="closedialog('remarkruleForm')"
    width="55%"
    class="remarkdialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="remarkbox">
      <div class="statusTop">
        <!-- 表单 -->
        <slot name="mark"></slot>
      </div>
      <el-button
        type="success"
        round
        class="sure"
        :loading="mybtnloading"
        @click="onlysave('remarkruleForm')"
      >{{$t("btn.sure")}}</el-button>
    </div>

    <el-table
      stripe
      style="width: 100%"
      :data="hunterHistoryStatusData"
    >
      <el-table-column
        :label="$t('saleSystem.tip.editpeople')"
        width="180"
        prop="appUser.name"
      >
      </el-table-column>
      <el-table-column
        :label="$t('saleSystem.tip.editTime')"
        width="180"
        prop="createDate"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        :label="$t('saleSystem.tip.editType')"
        width="180"
        prop="type"
        :formatter="statusFormat"
      >
      </el-table-column>
      <el-table-column
        :label="$t('saleSystem.tip.editContent')"
        prop="remark"
      >
        <template slot-scope="scope">
          <div
            v-html="$t('btn.b1')+':'+posFormat(scope.row.status)+'<br>'+$t('saleSystem.tip.remark')+':'+(scope.row.remark)"
            style="text-align: left;"
            v-if="scope.row.type==1"
          ></div>
          <div
            v-html="$t('saleSystem.tip.remark')+':'+scope.row.remark"
            style="text-align: left;"
            v-else
          ></div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('saleSystem.tip.Operation')">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="deleteStatusById(scope)"
          >{{$t("btn.delete")}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

</template>
<script>
// import api from "../../../api/api.js";
import Util from "../../../tool/tool.js";
let mytools = new Util();
export default {
  props: ["remarkdialog", "hunterHistoryStatusData", "btnloading"],
  data() {
    return {
      myremarkdialog: false,
      mybtnloading: false
      //   dialogVisible: false
      //   scene: ""
    };
  },
  watch: {
    remarkdialog(val) {
      this.myremarkdialog = val;
    },
    btnloading(val) {
      this.mybtnloading = val;
    }
  },
  methods: {
    closedialog(v) {
      this.$emit("closedialog", v);
    },
    onlysave(v) {
      this.$emit("onlysave", v);
    },
    deleteStatusById(v) {
      this.$emit("deleteStatusById", v);
    },
    dateFormat(row, column) {
      return mytools.datefilter(row.createDate);
    },
    statusFormat(row, column) {
      if (row.type == 0) {
        return this.$t("btn.b2");
      }
      if (row.type == 1) {
        return this.$t("btn.b1");
      }
    },
    posFormat(v) {
      switch (v) {
        case "未联系":
          return this.$t("ststus.saleStatus.n1");
          break;
        case "已联系":
          return this.$t("ststus.saleStatus.n2");
          break;
        case "已演示":
          return this.$t("ststus.saleStatus.n3");
          break;
        case "已稳定使用":
          return this.$t("ststus.saleStatus.n4");
          break;
        case "已暂停使用":
          return this.$t("ststus.saleStatus.n5");
          break;
        case "无效客户":
          return this.$t("ststus.saleStatus.n6");
          break;
        case "重点跟进":
          return this.$t("ststus.saleStatus.n7");
          break;
        case "无人接听":
          return this.$t("ststus.saleStatus.n8");
          break;
      }
    }
  }
};
</script>

