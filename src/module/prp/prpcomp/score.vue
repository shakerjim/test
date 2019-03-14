<template>
    <div class="scoretab">
        <h3>PRP Result</h3>
        <el-table :data="prpResultform" style="width: 100%" stripe>
            <el-table-column prop="p1" label="P1">
            </el-table-column>
            <el-table-column prop="p2" label="P2">
            </el-table-column>
            <el-table-column prop="p3" label="P3">
            </el-table-column>
            <el-table-column prop="p4" label="P4">
            </el-table-column>
            <el-table-column prop="p5" label="P5">
            </el-table-column>
            <el-table-column prop="p6" label="P6">
            </el-table-column>
            <el-table-column prop="p7" label="P7">
            </el-table-column>
            <el-table-column prop="p8" label="P8">
            </el-table-column>
            <el-table-column prop="p9" label="P9">
            </el-table-column>
            <el-table-column prop="p10" label="P10">
            </el-table-column>
            <el-table-column prop="other" label="PTT">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  props: ["prpResultform"]
};
</script>  
<style scoped>
.scoretab {
  box-shadow: 2px 2px 2px #ccc;
  border: 1px solid #f4f8fc;
  margin-bottom: 20px;
}
h3 {
  margin: 30px auto 10px;
}
</style>

