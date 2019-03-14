<template>
  <div class="listbox">
    <div class="listword">
      小程序测评列表
    </div>
    <div class="listbutton">
      <el-button @click="createCode">创建场景二维码
        <i class="el-icon-share el-icon--right"></i>
      </el-button>
      <el-button
        type="info"
        :disabled="this.sels.length===0"
        @click="exportEvaluationReport"
        :loading="morereport"
      >报告下载
        <i class="el-icon-my-xiazai1 el-icon--right"></i>
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sels", "morereport"],
  methods: {
    exportEvaluationReport() {
      this.$emit("exportEvaluationReport");
    },
    createCode() {
      this.$emit("createCode");
    }
  }
};
</script>

