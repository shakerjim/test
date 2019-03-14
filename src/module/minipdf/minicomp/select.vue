<template>
  <div class="main_top">
    <div class="main_left">
      <el-select
        v-model="selectedvalue"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入来源关键词"
        :remote-method="remoteMethod"
        :loading="loading"
        class="selsearch"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        type="success"
        class="searchbutton green"
        icon="el-icon-search"
        @click="getEvaluationAnalysisOrderByDate"
      ></el-button>
    </div>

  </div>

</template>

<script>
export default {
  props: ["codeSource"],
  data() {
    return {
      options: [],
      selectedvalue: [],
      list: [],
      loading: false,
      states: []
    };
  },
  mounted() {
    // this.list = this.states.map(item => {
    //   console.log(item);
    //   return { value: item, label: item };
    // });
  },
  watch: {
    codeSource(v) {
      this.states = v;
      this.list = v.map(item => {
        return { value: item, label: item };
      });
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    getEvaluationAnalysisOrderByDate() {
      this.$emit("getEvaluationAnalysisOrderByDate", this.selectedvalue);
    }
  }
};
</script>
<style scoped>
.selsearch {
  float: left;
}
</style>
