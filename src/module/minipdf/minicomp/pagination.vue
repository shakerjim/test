<template>
  <div class="block ">
    <el-pagination
      @size-change="handleSizeChange"
      popper-class="testclass"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="tableData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: ["tableData"],
  data() {
    return {
      currentPage1: 1
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    }
  }
};
</script>
