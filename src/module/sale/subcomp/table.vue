

<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tenantAccountData.content"
      tooltip-effect="dark"
      stripe
      style="width: 100%"
      v-loading="listLoading"
      :element-loading-text="$t('businessSystem.loading')"
      @sort-change="sortChange"
      @filter-change="filterchange"
      :empty-text="$t('recruitSystem.screen.nodata')"
    >
      <!-- <el-table-column type="selection" prop="id"> -->
      <!-- </el-table-column> -->
      <el-table-column
        prop="name"
        :label="$t('saleSystem.name')"
      >
      </el-table-column>
      <el-table-column
        prop="mail"
        :label="$t('saleSystem.email')"
      >
      </el-table-column>
      <el-table-column
        prop="appRegister.company"
        :label="$t('saleSystem.companyName')"
      >
      </el-table-column>
      <el-table-column
        prop="appRegister.phone"
        :label="$t('saleSystem.link')"
      >
      </el-table-column>
      <el-table-column
        :label="$t('saleSystem.chargePerson')"
        width="140"
        :filters="chargeoptions"
        prop="appRegister.manager.id"
        column-key="managerId"
        filter-placement="bottom"
      >
        <template slot-scope="scope">
          <el-select
            size="small"
            v-model="scope.row.appRegister.manager.id"
            class="newestselect"
            @change="salechange(scope)"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item,index) in saleoptions"
              :key="index"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column :label="$t('saleSystem.customer')">
        <template slot-scope="scope">
          <el-select
            size="small"
            v-model="scope.row.appRegister.form"
            class="newestselect"
            @change="formchange(scope)"
          >
            <el-option
              :label="item.text"
              :value="item.name"
              v-for="(item,index) in customeroptions"
              :key="index"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('saleSystem.tip.newstatus')"
        width="140"
        prop="appRegister.newStatus"
        :filters="optionsStatus"
        column-key="status"
        filter-placement="bottom"
      >
        <template slot-scope="scope">
          <el-select
            size="small"
            v-model="scope.row.appRegister.newStatus"
            class="newestselect"
            @change="statuschange(scope)"
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item,index) in salestatusoptions"
              :key="index"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="appRegister.evaluationUsedAccount"
        :label="$t('saleSystem.sendNumber')"
        :sortable="'custom'"
      >
      </el-table-column>
      <el-table-column
        prop="appRegister.evaluationRemain"
        :label="$t('saleSystem.remainingNumber')"
        :sortable="'custom'"
      >
      </el-table-column>

      <el-table-column
        prop="appRegister.remainDays"
        :label="$t('saleSystem.RemainingDays')"
        :sortable="'custom'"
      >
      </el-table-column>
      <el-table-column
        prop="loginTime"
        :label="$t('saleSystem.latestLogintime')"
        :sortable="'custom'"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        :label="$t('saleSystem.regTime')"
        :sortable="'custom'"
        :formatter="dateFormat"
      >
      </el-table-column>

      <el-table-column
        :label="$t('saleSystem.remarks')"
        prop="appRegister.remark"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="openremark(scope,'remarkruleForm')"
          >{{$t('saleSystem.remarks')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Util from "../../../tool/tool.js";
let mytools = new Util();
export default {
  props: [
    "tenantAccountData",
    "listLoading",
    "chargeoptions",
    "optionsStatus",
    "saleoptions",
    "customeroptions",
    "salestatusoptions"
  ],
  data() {
    return {
      sels: []
    };
  },
  computed: {},
  methods: {
    dateFormat(row, column) {
      return mytools.datefilter(row.createDate);
    },
    sortChange(row) {
      this.$emit("sortChange", row);
    },
    filterchange(row) {
      this.$emit("filterchange", row);
    },
    statuschange(row) {
      this.$emit("statuschange", row);
    },
    salechange(row) {
      this.$emit("salechange", row);
    },
    formchange(row) {
      this.$emit("formchange", row);
    },
    openremark(a, b) {
      this.$emit("openremark", a, b);
    }
    // chargeoptions() {
    //   this.$emit("chargeoptions", row);
    // }
  }
};
</script>

