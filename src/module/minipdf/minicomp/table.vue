

<template>
  <div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="tableData.list"
      row-key="talentId"
      tooltip-effect="dark"
      @selection-change="selsChange"
      :stripe="true"
      style="width: 100%"
      v-loading="listLoading"
      element-loading-text="拼命加载中"
    >
      <el-table-column
        type="selection"
        width="55"
        prop="talentId"
        :reserve-selection="true"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="来源"
      >
        <template slot-scope="scope">
          <el-tag disable-transitions>{{scope.row.tag||'未知'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="birthDay"
        label="生日"
      >
      </el-table-column>
      <el-table-column
        prop="residence"
        label="居住地"
      >
      </el-table-column>
      <el-table-column
        prop="school"
        label="学校"
      >
      </el-table-column>
      <el-table-column
        prop="degree"
        label="学历"
      >
      </el-table-column>
      <el-table-column
        prop="jobType"
        label="求职类型"
        :formatter="jobFormat"
      >
      </el-table-column>
      <el-table-column
        prop="hopeSalary"
        label="期望薪资"
      >
      </el-table-column>
      <el-table-column
        prop="updateDate"
        label="更新时间"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            :loading="scope.row.download"
            @click="handledownload(scope.row)"
          >下载</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
export default {
  props: ["tableData", "listLoading"],
  data() {
    return {
      sels: []
    };
  },
  computed: {},
  methods: {
    jobFormat(row, column) {
      if (row.jobType == "FullTimeJob") {
        return "全职";
      }
      if (row.jobType == "PartTimeJob") {
        return "实习";
      }
    },
    handledownload(row) {
      this.$emit("handleButton", row);
    },
    selsChange(sels) {
      this.$emit("selsChange", sels);
    }
  }
};
</script>

