<template>
  <div class="bussmain">
    <t-select
      :codeSource="codeSource"
      @getEvaluationAnalysisOrderByDate="getEvaluationAnalysisOrderByDate"
    ></t-select>
    <div class="tablelist">
      <t-breadcrumb></t-breadcrumb>
      <div class="tablebox">
        <t-tabletop
          :sels="sels"
          :morereport='morereport'
          @exportEvaluationReport='exportEvaluationReport'
          @createCode="createCode"
        ></t-tabletop>
        <!--表格-->
        <t-table
          :tableData='tableData'
          :listLoading='listLoading'
          @handleButton="handledownload"
          @selsChange="selsChange"
        ></t-table>
        <!--分页-->
        <t-pagination
          :tableData='tableData'
          @handleCurrentChange='handleCurrentChange'
          @handleSizeChange='handleSizeChange'
        ></t-pagination>
        <!--分页-->

      </div>
      <t-dialog
        :dialogVisible='dialogVisible'
        @closedialog="closedialog"
        @suredialog="suredialog"
      ></t-dialog>
    </div>

  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
import table from "./table.vue";
import tabletop from "./tabletop.vue";
import pagination from "./pagination.vue";
import breadcrumb from "./breadcrumb.vue";
import dialog from "./dialog.vue";
import select from "./select.vue";
export default {
  data() {
    return {
      tableData: {
        list: []
      },
      listLoading: true,
      pageSize: 20,
      pageNum: 1,
      sels: [],
      morereport: false,
      dialogVisible: false,
      scene: "",
      tags: "",
      codeSource: []
    };
  },
  components: {
    "t-table": table,
    "t-pagination": pagination,
    "t-breadcrumb": breadcrumb,
    "t-tabletop": tabletop,
    "t-dialog": dialog,
    "t-select": select
  },
  computed: {},
  created() {
    this.getEvaluationAnalysisOrderByDate();
    this.searchCode();
  },
  methods: {
    getEvaluationAnalysisOrderByDate(val) {
      this.tags = val;
      let para = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        tags: this.tags || []
      };
      this.$http.post(api.wxmini.getEvaluationAnalysisOrderByDate(), para).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            console.log(res);
            res.data.data.list.forEach(el => {
              el.download = false;
            });
            this.tableData = res.data.data;
            this.listLoading = false;
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
    searchCode() {
      this.$http
        .get(api.code.searchCode(), {
          params: { tag: "" }
        })
        .then(res => {
          // console.log(res);
          if (res.data.code == "00") {
            this.codeSource = res.data.data;
          }
        });
    },
    jobFormat(row, column) {
      if (row.jobType == "FullTimeJob") {
        return "全职";
      }
      if (row.jobType == "PartTimeJob") {
        return "实习";
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getEvaluationAnalysisOrderByDate(this.tags);
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.pageNum = val;
      this.getEvaluationAnalysisOrderByDate(this.tags);
    },
    selsChange(sels) {
      this.sels = sels;
      // console.log(sels);
    },
    createCode() {
      this.scene = "";
      this.dialogVisible = true;
    },
    closedialog() {
      this.dialogVisible = false;
    },
    suredialog(scene) {
      this.dialogVisible = false;
      setTimeout(() => {
        this.searchCode();
      }, 300);

      window.open(api.code.createCode() + scene);
    },
    //单个下载
    handledownload(row) {
      let para = {
        talentId: row.talentId
      };
      row.download = true;
      var fileFrame = document.createElement("iframe");
      fileFrame.src =
        api.wxmini.exportEvaluationReport() + "?" + formatUrl(para); //文件路径
      fileFrame.style.display = "none";
      document.body.appendChild(fileFrame);
      setTimeout(function() {
        row.download = false; //修改此处
      }, 2000);
    },
    //多个下载
    exportEvaluationReport() {
      this.morereport = true;
      this.sels.forEach((el, index) => {
        let para = { talentId: el.talentId };
        if (index == 0) {
          setTimeout(
            // console.log(para),
            function() {
              window.open(
                api.wxmini.exportEvaluationReport() + "?" + formatUrl(para),
                "_self"
              );
            },
            2000 * index
          );
        } else {
          setTimeout(
            // console.log(para),
            function() {
              window.open(
                api.wxmini.exportEvaluationReport() + "?" + formatUrl(para),
                "_self"
              );
            },
            6000 + 2000 * index
          );
        }
      });
      setTimeout(() => {
        this.morereport = false; //修改此处
      }, 6000 + this.sels.length * 2000);
    }
  }
};
</script>
<style>
</style>
