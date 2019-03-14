<template>
  <div class="block">
    <el-pagination
      popper-class="testclass"
      @size-change="tenantAccountSizeChange"
      @current-change="tenantAccountCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="tenantAccountData.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tenantAccountData.totalElements"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: ["tenantAccountData", "currentPage"],
  data() {
    return {
      // currentPage1: 1
    };
  },
  computed: {
    currentPage1: {
      // getter
      get: function() {
        return this.currentPage + 1;
      },
      // setter
      set: function(newValue) {
        // localStorage.setItem('salepage',newValue)
        // var names = newValue.split(' ')
        // this.name = names[0]
        // this.url = names[names.length - 1]
      }
    }
  },
  methods: {
    tenantAccountSizeChange(val) {
      this.$emit("tenantAccountSizeChange", val);
    },
    tenantAccountCurrentChange(val) {
      this.$emit("tenantAccountCurrentChange", val);
    }
  }
};
</script>
