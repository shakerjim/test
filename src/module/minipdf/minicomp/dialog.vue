<template>
  <el-dialog
    title="请输入要创建的二维码场景"
    :visible.sync="dialogVisible"
    width="30%"
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    center
  >
    <el-input
      :maxlength="14"
      v-model="myscene"
      placeholder="请输入内容"
      clearable
    >
    </el-input>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="closedialog">取 消</el-button>
      <el-button
        type="primary"
        @click="suredialog"
      >确 定</el-button>
    </span>
  </el-dialog>

</template>
<script>
// import api from "../../../api/api.js";
export default {
  props: ["dialogVisible"],
  data() {
    return {
      //   dialogVisible: false
      myscene: ""
    };
  },
  watch: {
    scene(val) {
      this.myscene = val;
    }
  },
  methods: {
    closedialog() {
      this.$emit("closedialog");
    },
    suredialog() {
      if (this.myscene) {
        this.$emit("suredialog", this.myscene);
      } else {
        this.$message({
          showClose: true,
          message: "请输入你所需的场景",
          type: "warning"
        });
      }
    }
  }
};
</script>

