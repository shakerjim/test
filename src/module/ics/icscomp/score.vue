<template>
     <div>
    <!--ics-->
    <div v-if="this.$store.state.Privilege.includes('CONTENT_TALENT_SCORE_ELSE')" class="scoretab">
      <h3>ICS Result</h3>
      <el-table :data="IcsResultform" style="width: 100%" stripe>
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
        <el-table-column prop="ptt" label="PTT">
        </el-table-column>
      </el-table>
    </div>
    <!--icog-->
    <div v-if="this.$store.state.Privilege.includes('CONTENT_TALENT_SCORE_ICOG')" class="scoretab">
      <h3>{{$t('ics.detail.speed')}}</h3>
      <el-table :data="IcogResultform" style="width: 100%" stripe>
        <el-table-column prop="noAttempts" :label="$t('ics.detail.allfinish')">
        </el-table-column>
        <el-table-column prop="score" :label="$t('ics.detail.allscore')">
        </el-table-column>
      </el-table>
      <div class="icogword">
        <div class="attentionword">{{$t('ics.detail.p1')}}</div>
        <div>&nbsp;{{$t('ics.detail.p2')}}</div>
        <div>{{$t('ics.detail.p3')}}</div>
        <div>{{$t('ics.detail.p4')}}</div>
        <div>{{$t('ics.detail.p5')}}</div>
      </div>
    </div>
    <!--he-->
    <div v-if="this.$store.state.Privilege.includes('CONTENT_TALENT_SCORE_ELSE')">
      <div class="scoretab">
        <h3>HE Result</h3>
        <el-table :data="ab0values?totalResultform:[]" style="width: 100%" stripe>
          <el-table-column prop="AB0" :label="$t('recruitSystem.screen.ics00')">
          </el-table-column>
          <el-table-column prop="AB1" :label="$t('recruitSystem.screen.ics01')">
          </el-table-column>
          <el-table-column prop="AB2" :label="$t('recruitSystem.screen.ics02')">
          </el-table-column>
          <el-table-column prop="AB3" :label="$t('recruitSystem.screen.ics03')">
          </el-table-column>
          <el-table-column prop="AB4" :label="$t('recruitSystem.screen.ics04')">
          </el-table-column>
          <el-table-column prop="AB5" :label="$t('recruitSystem.screen.ics05')">
          </el-table-column>
          <el-table-column prop="AB6" :label="$t('recruitSystem.screen.ics06')">
          </el-table-column>
          <el-table-column prop="AB7" :label="$t('recruitSystem.screen.ics07')">
          </el-table-column>
          <el-table-column prop="AB8" :label="$t('recruitSystem.screen.ics08')">
          </el-table-column>
          <el-table-column prop="AB9" :label="$t('recruitSystem.screen.ics09')">
          </el-table-column>
          <el-table-column prop="AB10" :label="$t('recruitSystem.screen.ics10')">
          </el-table-column>
        </el-table>
      </div>

      <!--ab0-->
      <div class="hetab">
        <div class="hetitle">
          <h3>HE-AB0 Table</h3>
        </div>
        <ul>
          <li>Column</li>
          <li>HS-ABx</li>
          <li>HS-Score</li>
          <li>EB-Abx</li>
          <li>EB-Score</li>
        </ul>
        <div v-if="ab0values && ab0Colors">
          <table cellpadding="10" cellspacing="0" class="testform">
            <tr>
              <th>H</th>
              <th>D</th>
              <th>M</th>
              <th>Y</th>
              <th>TYL</th>
              <th>YL</th>
            </tr>
            <tr>
              <td :bgcolor="ab0Colors[0]">{{ab0values[0].split(",")[0]}}</td>
              <td :bgcolor="ab0Colors[1]">{{ab0values[1].split(",")[0]}}</td>
              <td :bgcolor="ab0Colors[2]">{{ab0values[2].split(",")[0]}}</td>
              <td :bgcolor="ab0Colors[3]">{{ab0values[3].split(",")[0]}}</td>
              <td :bgcolor="ab0Colors[8]">{{ab0values[8].split(",")[0]}}</td>
              <td :bgcolor="ab0Colors[9]">{{ab0values[9].split(",")[0]}}</td>
            </tr>
            <tr>
              <td>{{ab0values[0].split(",")[1]}}</td>
              <td>{{ab0values[1].split(",")[1]}}</td>
              <td>{{ab0values[2].split(",")[1]}}</td>
              <td>{{ab0values[3].split(",")[1]}}</td>
              <td>{{ab0values[8].split(",")[1]}}</td>
              <td>{{ab0values[9].split(",")[1]}}</td>
            </tr>
            <tr>
              <td :bgcolor="ab0Colors[4]">{{ab0values[4].split(",")[0]}}</td>
              <td :bgcolor="ab0Colors[5]">{{ab0values[5].split(",")[0]}}</td>
              <td :bgcolor="ab0Colors[6]">{{ab0values[6].split(",")[0]}}</td>
              <td :bgcolor="ab0Colors[7]">{{ab0values[7].split(",")[0]}}</td>
              <td :bgcolor="ab0Colors[10]">{{ab0values[10].split(",")[0]}}</td>
              <td :bgcolor="ab0Colors[11]">{{ab0values[11].split(",")[0]}}</td>
            </tr>
            <tr>
              <td>{{ab0values[4].split(",")[1]}}</td>
              <td>{{ab0values[5].split(",")[1]}}</td>
              <td>{{ab0values[6].split(",")[1]}}</td>
              <td>{{ab0values[7].split(",")[1]}}</td>
              <td>{{ab0values[10].split(",")[1]}}</td>
              <td>{{ab0values[11].split(",")[1]}}</td>
            </tr>
          </table>
        </div>
        <div v-else>
          <table cellpadding="10" cellspacing="0" class="testform">
            <tr>
              <th>H</th>
              <th>D</th>
              <th>M</th>
              <th>Y</th>
              <th>TYL</th>
              <th>YL</th>
            </tr>
            <tr>{{$t('recruitSystem.screen.nodata')}}</tr>
          </table>
        </div>
      </div>
      <!--ab1-->
      <div class="hetab">
        <div class="hetitle">
          <h3>HE-AB1 Table</h3>
        </div>
        <ul>
          <li>Column</li>
          <li>HS-ABx</li>
          <li>HS-Score</li>
          <li>EB-Abx</li>
          <li>EB-Score</li>
        </ul>
        <div v-if="ab1Colors && ab1values ">
          <table cellpadding="10" cellspacing="0" class="testform">
            <tr>
              <th>H</th>
              <th>D</th>
              <th>M</th>
              <th>Y</th>
              <th>TYL</th>
              <th>YL</th>
            </tr>
            <tr>
              <td :bgcolor="ab1Colors[0]">{{ab1values[0].split(",")[0]}}</td>
              <td :bgcolor="ab1Colors[1]">{{ab1values[1].split(",")[0]}}</td>
              <td :bgcolor="ab1Colors[2]">{{ab1values[2].split(",")[0]}}</td>
              <td :bgcolor="ab1Colors[3]">{{ab1values[3].split(",")[0]}}</td>
              <td :bgcolor="ab1Colors[8]">{{ab1values[8].split(",")[0]}}</td>
              <td :bgcolor="ab1Colors[9]">{{ab1values[9].split(",")[0]}}</td>
            </tr>
            <tr>
              <td>{{ab1values[0].split(",")[1]}}</td>
              <td>{{ab1values[1].split(",")[1]}}</td>
              <td>{{ab1values[2].split(",")[1]}}</td>
              <td>{{ab1values[3].split(",")[1]}}</td>
              <td>{{ab1values[8].split(",")[1]}}</td>
              <td>{{ab1values[9].split(",")[1]}}</td>
            </tr>
            <tr>
              <td :bgcolor="ab1Colors[4]">{{ab1values[4].split(",")[0]}}</td>
              <td :bgcolor="ab1Colors[5]">{{ab1values[5].split(",")[0]}}</td>
              <td :bgcolor="ab1Colors[6]">{{ab1values[6].split(",")[0]}}</td>
              <td :bgcolor="ab1Colors[7]">{{ab1values[7].split(",")[0]}}</td>
              <td :bgcolor="ab1Colors[10]">{{ab1values[10].split(",")[0]}}</td>
              <td :bgcolor="ab1Colors[11]">{{ab1values[11].split(",")[0]}}</td>
            </tr>
            <tr>
              <td>{{ab1values[4].split(",")[1]}}</td>
              <td>{{ab1values[5].split(",")[1]}}</td>
              <td>{{ab1values[6].split(",")[1]}}</td>
              <td>{{ab1values[7].split(",")[1]}}</td>
              <td>{{ab1values[10].split(",")[1]}}</td>
              <td>{{ab1values[11].split(",")[1]}}</td>
            </tr>
          </table>
        </div>
        <div v-else>
          <table cellpadding="10" cellspacing="0" class="testform">
            <tr>
              <th>H</th>
              <th>D</th>
              <th>M</th>
              <th>Y</th>
              <th>TYL</th>
              <th>YL</th>
            </tr>
             <tr>{{$t('recruitSystem.screen.nodata')}}</tr>
          </table>
        </div>
      </div>
      <!--ab2-->
      <div class="hetab">
        <div class="hetitle">
          <h3>HE-AB2 Table</h3>
        </div>
        <ul>
          <li>Column</li>
          <li>HS-ABx</li>
          <li>HS-Score</li>
          <li>EB-Abx</li>
          <li>EB-Score</li>
        </ul>
        <div v-if="ab2Colors && ab2values ">
          <table cellpadding="10" cellspacing="0" class="testform">
            <tr>
              <th>H</th>
              <th>D</th>
              <th>M</th>
              <th>Y</th>
              <th>TYL</th>
              <th>YL</th>
            </tr>
            <tr>
              <td :bgcolor="ab2Colors[0]">{{ab2values[0].split(",")[0]}}</td>
              <td :bgcolor="ab2Colors[1]">{{ab2values[1].split(",")[0]}}</td>
              <td :bgcolor="ab2Colors[2]">{{ab2values[2].split(",")[0]}}</td>
              <td :bgcolor="ab2Colors[3]">{{ab2values[3].split(",")[0]}}</td>
              <td :bgcolor="ab2Colors[8]">{{ab2values[8].split(",")[0]}}</td>
              <td :bgcolor="ab2Colors[9]">{{ab2values[9].split(",")[0]}}</td>
            </tr>
            <tr>
              <td>{{ab2values[0].split(",")[1]}}</td>
              <td>{{ab2values[1].split(",")[1]}}</td>
              <td>{{ab2values[2].split(",")[1]}}</td>
              <td>{{ab2values[3].split(",")[1]}}</td>
              <td>{{ab2values[8].split(",")[1]}}</td>
              <td>{{ab2values[9].split(",")[1]}}</td>
            </tr>
            <tr>
              <td :bgcolor="ab2Colors[4]">{{ab2values[4].split(",")[0]}}</td>
              <td :bgcolor="ab2Colors[5]">{{ab2values[5].split(",")[0]}}</td>
              <td :bgcolor="ab2Colors[6]">{{ab2values[6].split(",")[0]}}</td>
              <td :bgcolor="ab2Colors[7]">{{ab2values[7].split(",")[0]}}</td>
              <td :bgcolor="ab2Colors[10]">{{ab2values[10].split(",")[0]}}</td>
              <td :bgcolor="ab2Colors[11]">{{ab2values[11].split(",")[0]}}</td>
            </tr>
            <tr>
              <td>{{ab2values[4].split(",")[1]}}</td>
              <td>{{ab2values[5].split(",")[1]}}</td>
              <td>{{ab2values[6].split(",")[1]}}</td>
              <td>{{ab2values[7].split(",")[1]}}</td>
              <td>{{ab2values[10].split(",")[1]}}</td>
              <td>{{ab2values[11].split(",")[1]}}</td>
            </tr>
          </table>
        </div>
        <div v-else>
          <table cellpadding="10" cellspacing="0" class="testform">
            <tr>
              <th>H</th>
              <th>D</th>
              <th>M</th>
              <th>Y</th>
              <th>TYL</th>
              <th>YL</th>
            </tr>
            <tr>{{$t('recruitSystem.screen.nodata')}}</tr>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  props: [
    "IcsResultform",
    "IcogResultform",
    "totalResultform",
    "ab0values",
    "ab0Colors",
    "ab1Colors",
    "ab1values",
    "ab2Colors",
    "ab2values"
  ]
};
</script>  
<style scoped>
.testform {
  float: left;
  width: 84% !important;
  margin: 0;
  color: #878d99;
}

.testform th,
.testform td {
  box-sizing: border-box;
  height: 48px;
  width: 16.66%;
  border-right: 1px solid #e6ebf5;
  border-bottom: 1px solid #e6ebf5;
}
.scoretab {
  box-shadow: 2px 2px 2px #ccc;
  border: 1px solid #f4f8fc;
  margin-bottom: 20px;
}
.hetab {
  display: block;
  margin-top: 20px;
  border: 1px solid #e6ebf5;
  background-color: #fff;
  overflow: hidden;
}

.hetitle h3 {
  margin: 0;
  height: 65px;
  line-height: 65px;
  background-color: #ccc;
}

.hetab ul {
  list-style: none;
  margin: 0;
  padding: 0;
  float: left;
  width: 16%;
  /*margin-top: 1px;*/
  background-color: #fff;
}

.hetab li {
  box-sizing: border-box;
  height: 48px;
  /*width: 200px;*/
  line-height: 48px;
  border-right: 1px solid #e6ebf5;
  border-bottom: 1px solid #e6ebf5;
}

.hetab ul li:nth-last-child() {
  border-bottom: none;
}
h3 {
  margin: 30px auto 10px;
}

.el-table th {
  text-align: center;
}

.icogword {
  text-align: left;
  font-size: 14px;
  padding-left: 20px;
  padding-bottom: 10px;
  color: #909399;
}
.icogword .attentionword {
  font-size: 16px;
  line-height: 26px;
}
</style>

