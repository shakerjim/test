
<template>
  <div class="toolbox">
    <el-tabs
      type="border-card"
      class="businessInfo"
    >
      <!-- 51job -->
      <el-tab-pane
        :label="$t('screenTool.tab01')"
        v-if="this.$store.state.Privilege.includes('TAB_RESUME_51JOB')"
      >

        <div v-if="cancelScreen">
          <div class="mybutton">
            <el-button
              type="success"
              @click="getHEResultList"
              v-if="this.$store.state.Privilege.includes('BUTTON_RESUME_51JOB_KEYHE')"
            >{{$t('screenTool.one')}}</el-button>
            <el-button
              type="primary"
              style="margin-right:20px"
              @click="screenOpen('screenForm')"
              v-if="this.$store.state.Privilege.includes('BUTTON_RESUME_51JOB_FILTER')"
            >{{$t('screenTool.screen')}}</el-button>
            <el-button
              type="danger"
              style="margin-right:10px"
              @click="deleteAll"
              v-if="this.$store.state.Privilege.includes('BUTTON_RESUME_51JOB_EMPTY')"
            >{{$t('screenTool.clear')}}</el-button>
          </div>

          <!-- 表格数据 -->
          <el-table
            :data="tableData"
            style="width: 100%"
            stripe
            @row-click='handleRowHandle'
            height="600"
            v-loading="listLoading"
            :element-loading-text="$t('businessSystem.loading')"
            :empty-text="$t('recruitSystem.screen.nodata')"
          >
            <el-table-column
              prop="id"
              label="ID"
            >
            </el-table-column>
            <el-table-column
              prop="birthday"
              :label="$t('recruitSystem.screen.birth')"
            >
            </el-table-column>
            <el-table-column
              prop="sex"
              :label="$t('recruitSystem.screen.gender')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab1"
              :label="$t('recruitSystem.screen.ics01')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab2"
              :label="$t('recruitSystem.screen.ics02')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab3"
              :label="$t('recruitSystem.screen.ics03')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab4"
              :label="$t('recruitSystem.screen.ics04')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab5"
              :label="$t('recruitSystem.screen.ics05')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab6"
              :label="$t('recruitSystem.screen.ics06')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab7"
              :label="$t('recruitSystem.screen.ics07')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab8"
              :label="$t('recruitSystem.screen.ics08')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab9"
              :label="$t('recruitSystem.screen.ics09')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab10"
              :label="$t('recruitSystem.screen.ics10')"
            >
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          <div class="mybutton">
            <el-button
              type="success"
              @click="getHEResultList"
            >{{$t('screenTool.one')}}</el-button>
            <el-button
              type="primary"
              style="margin-right:20px"
              @click="cancelScreenbutton"
            >{{$t('screenTool.cancelscreen')}}</el-button>
            <el-button
              type="danger"
              style="margin-right:10px"
              @click="deleteAll"
            >{{$t('screenTool.clear')}}</el-button>
          </div>

          <!-- 表格数据 -->
          <el-table
            :data="tableData"
            style="width: 100%"
            stripe
            @row-click='handleRowHandle'
            height="600"
          >
            <el-table-column
              prop="id"
              label="ID"
            >
            </el-table-column>
            <el-table-column
              prop="birthday"
              :label="$t('recruitSystem.screen.birth')"
            >
            </el-table-column>
            <el-table-column
              prop="sex"
              :label="$t('recruitSystem.screen.gender')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab1"
              :label="$t('recruitSystem.screen.ics01')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab2"
              :label="$t('recruitSystem.screen.ics02')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab3"
              :label="$t('recruitSystem.screen.ics03')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab4"
              :label="$t('recruitSystem.screen.ics04')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab5"
              :label="$t('recruitSystem.screen.ics05')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab6"
              :label="$t('recruitSystem.screen.ics06')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab7"
              :label="$t('recruitSystem.screen.ics07')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab8"
              :label="$t('recruitSystem.screen.ics08')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab9"
              :label="$t('recruitSystem.screen.ics09')"
            >
            </el-table-column>
            <el-table-column
              prop="heResult.ab10"
              :label="$t('recruitSystem.screen.ics10')"
            >
            </el-table-column>
          </el-table>
        </div>

        <!-- 筛选 -->
        <el-dialog
          :visible.sync="dialogFormVisible"
          width="30%"
          class="screenform"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <el-form
            :model="screenForm"
            ref="screenForm"
          >
            <el-form-item
              :label="$t('recruitSystem.screen.ics01')+' >'"
              :label-width="formLabelWidth"
              prop="ab1"
            >
              <!-- <i class="el-icon-arrow-right el-icon--right"></i> -->
              <el-input
                v-model="screenForm.ab1"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('recruitSystem.screen.ics02')+' >'"
              :label-width="formLabelWidth"
              prop="ab2"
            >
              <!-- <i class="el-icon-arrow-right el-icon--right"></i> -->
              <el-input
                v-model="screenForm.ab2"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('recruitSystem.screen.ics03')+' >'"
              :label-width="formLabelWidth"
              prop="ab3"
            >
              <!-- <i class="el-icon-arrow-right el-icon--right"></i> -->
              <el-input
                v-model="screenForm.ab3"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('recruitSystem.screen.ics04')+' >'"
              :label-width="formLabelWidth"
              prop="ab4"
            >
              <!-- <i class="el-icon-arrow-right el-icon--right"></i> -->
              <el-input
                v-model="screenForm.ab4"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('recruitSystem.screen.ics05')+' >'"
              :label-width="formLabelWidth"
              prop="ab5"
            >
              <!-- <i class="el-icon-arrow-right el-icon--right"></i> -->
              <el-input
                v-model="screenForm.ab5"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('recruitSystem.screen.ics06')+' >'"
              :label-width="formLabelWidth"
              prop="ab6"
            >
              <!-- <i class="el-icon-arrow-right el-icon--right"></i> -->
              <el-input
                v-model="screenForm.ab6"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('recruitSystem.screen.ics07')+' >'"
              :label-width="formLabelWidth"
              prop="ab7"
            >
              <!-- <i class="el-icon-arrow-right el-icon--right"></i> -->
              <el-input
                v-model="screenForm.ab7"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('recruitSystem.screen.ics08')+' >'"
              :label-width="formLabelWidth"
              prop="ab8"
            >
              <!-- <i class="el-icon-arrow-right el-icon--right"></i> -->
              <el-input
                v-model="screenForm.ab8"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('recruitSystem.screen.ics09')+' >'"
              :label-width="formLabelWidth"
              prop="ab9"
            >
              <!-- <i class="el-icon-arrow-right el-icon--right"></i> -->
              <el-input
                v-model="screenForm.ab9"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('recruitSystem.screen.ics10')+' >'"
              :label-width="formLabelWidth"
              prop="ab10"
            >
              <!-- <i class="el-icon-arrow-right el-icon--right"></i> -->
              <el-input
                v-model="screenForm.ab10"
                auto-complete="off"
              ></el-input>
            </el-form-item>

          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogFormVisible = false">{{$t('btn.cancel')}}</el-button>
            <el-button
              type="primary"
              @click="findByHE"
            >{{$t('btn.sure')}}</el-button>
          </div>
        </el-dialog>

        <!-- 分页 -->
        <!-- <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                  </div> -->
      </el-tab-pane>
      <el-tab-pane
        :label="$t('screenTool.tab02')"
        v-if="this.$store.state.Privilege.includes('TAB_RESUME_HE')"
      >
        <div v-if="ISshow">
          <el-form
            ref="HEform"
            :model="HEform"
            class="Heform"
            :rules="HEformrules"
            style="overflow:hidden"
          >
            <el-form-item
              :label="$t('screenTool.birth')"
              style="float:left;width:60%"
              prop="dob"
            >
              <el-date-picker
                v-model="HEform.dob"
                align="right"
                type="date"
                :placeholder="$t('screenTool.p1')"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              prop="tob"
              style="float:left;width:40%"
            >
              <el-select
                v-model="HEform.tob"
                :placeholder="$t('screenTool.p2')"
              >
                <el-option
                  :label="$t('screenTool.cnotsure')"
                  :value="'null'"
                ></el-option>
                <el-option
                  :label="item"
                  :value="item"
                  v-for="(item,index) in timeArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('screenTool.sex')"
              prop="gender"
              style="float:left;width:50%"
            >
              <el-radio-group v-model="HEform.gender">
                <el-radio :label="1">{{$t('screenTool.m1')}}</el-radio>
                <el-radio :label="0">{{$t('screenTool.m2')}}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              class="getHeform"
              style="position:absolute;top:245px;left:50%;transform:translateX(-50%)"
            >
              <el-button
                type="success"
                @click="getHEResult('HEform')"
              >{{$t('screenTool.getResult')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="TABshow">
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
              <table
                cellpadding="10"
                cellspacing="0"
                class="testform"
              >
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
              <table
                cellpadding="10"
                cellspacing="0"
                class="testform"
              >
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
              <table
                cellpadding="10"
                cellspacing="0"
                class="testform"
              >
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
              <table
                cellpadding="10"
                cellspacing="0"
                class="testform"
              >
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
              <table
                cellpadding="10"
                cellspacing="0"
                class="testform"
              >
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
              <table
                cellpadding="10"
                cellspacing="0"
                class="testform"
              >
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
          <el-button
            type="primary"
            @click="backgo"
            style="margin-top:30px"
          >{{$t('screenTool.back')}}</el-button>
        </div>
        <!-- <el-button type="success">获取HE结果</el-button> -->

      </el-tab-pane>
      <!-- 匹配报告 -->
      <el-tab-pane
        :label="$t('screenTool.tab03')"
        class="Matchreport"
        v-if="this.$store.state.Privilege.includes('TAB_RESUME_MATCH_REPORT')"
      >
        <div>
          <div class="prp_top">
            <div class="word">{{$t('screenTool.prp')}}</div>
            <el-input
              v-model.trim="jobsearch"
              :placeholder="$t('screenTool.search')"
              @keyup.enter.delete.native="searchJobEvaluationList"
            ></el-input>
            <el-button
              type="primary"
              @click="searchJobEvaluationList"
            >{{$t('screenTool.searchbtn')}}</el-button>
            <!-- <input class="inline-input" v-model.trim="jobsearch" placeholder="请输入姓名或邮箱" @keyup.enter="searchJobEvaluationList"> -->
          </div>
          <el-table
            ref="jobTable"
            @select="handleSelectRowjobTable"
            :data="jobData"
            stripe
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="jobSelectionChange"
            height="230"
            class="jobTable"
          >
            <el-table-column
              type="selection"
              width="55"
              prop="id"
            >
            </el-table-column>
            <el-table-column
              :label="$t('screenTool.name')"
              width="120"
              prop="name"
            >
            </el-table-column>
            <el-table-column
              prop="email"
              :label="$t('screenTool.email')"
            >
            </el-table-column>
            <el-table-column
              prop="updateDate"
              :label="$t('screenTool.updateDate')"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
        <div style="margin-top:20px;margin-bottom:20px">
          <div class="prp_top">
            <div class="word">{{$t('screenTool.ics')}}</div>
            <el-input
              v-model.trim="personsearch"
              :placeholder="$t('screenTool.search')"
              @keyup.enter.delete.native="searchPersonalEvaluationList"
            ></el-input>
            <el-button
              type="primary"
              @click="searchPersonalEvaluationList"
            >{{$t('screenTool.searchbtn')}}</el-button>
            <!-- <input class="inline-input" v-model.trim="personsearch" placeholder="请输入姓名或邮箱" @keyup.enter="searchPersonalEvaluationList"> -->
          </div>
          <el-table
            ref="personTable"
            @select="handleSelectRowpersonTable"
            stripe
            :data="personData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="personSelectionChange"
            height="230"
            class="personTable"
          >
            <el-table-column
              type="selection"
              width="55"
              prop="id"
            >
            </el-table-column>
            <el-table-column
              :label="$t('screenTool.name')"
              width="120"
              prop="name"
            >
            </el-table-column>
            <el-table-column
              prop="email"
              :label="$t('screenTool.email')"
            >
            </el-table-column>
            <el-table-column
              prop="updateDate"
              :label="$t('screenTool.updateDate')"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="language"> -->
        <el-form
          :model="languageValidateForm"
          ref="languageValidateForm"
          :rules="languagerules"
          label-width="160px"
          class="language"
        >
          <el-form-item
            :label="$t('screenTool.lang')"
            prop="language"
          >
            <el-radio-group v-model="languageValidateForm.language">
              <el-radio :label="'cn'">{{$t('screenTool.l01')}}</el-radio>
              <el-radio :label="'en'">{{$t('screenTool.l02')}}</el-radio>
            </el-radio-group>
          </el-form-item>

        </el-form>

        <el-button
          type="success"
          @click="exportMatchReport('languageValidateForm')"
          :loading="Matchbuttonloading"
          :disabled="jobselectArr.length < 1 || personselectArr.length < 1"
        >{{$t('screenTool.getmatch')}}</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
export default {
  data() {
    return {
      Matchbuttonloading: false,
      languagerules: {
        language: [
          {
            required: true,
            message: this.$t("valid.valid011"),
            trigger: "change"
          }
        ]
      },
      languageValidateForm: {
        language: ""
      },
      jobselectArr: [],
      personselectArr: [],
      cancelScreen: true,
      form: {},
      timeArr: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
      ],
      value1: "",
      value5: "",
      value4: "",
      language: "",
      //职位测评
      jobData: [],
      jobsearch: "",
      personsearch: "",
      personData: [],
      //匹配

      state2: "",
      dialogFormVisible: false,
      //HE
      HEform: {
        dob: "",
        tob: "",
        gender: "",
        isTimeAccurate: ""
      },
      ISshow: true,
      TABshow: false,
      ab0values: "",
      ab0Colors: "",
      ab1values: "",
      ab1Colors: "",
      ab2values: "",
      ab2Colors: "",
      HEformrules: {
        dob: [
          {
            type: "string",
            message: this.$t("valid.valid012"),
            trigger: "change",
            required: true
          }
        ],
        tob: [
          {
            type: "string",
            message: this.$t("valid.valid013"),
            trigger: "change",
            required: true
          }
        ],
        gender: [
          {
            message: this.$t("valid.valid014"),
            trigger: "change",
            required: true
          }
        ]
      },
      formLabelWidth: "200px",
      //筛选条件
      screenForm: {
        ab1: "",
        ab2: "",
        ab3: "",
        ab4: "",
        ab5: "",
        ab6: "",
        ab7: "",
        ab8: "",
        ab9: "",
        ab10: ""
      },
      //分页

      //表格数据
      tableData: [],
      listLoading: true
    };
  },
  created() {
    document.title = `${this.$t("sidebar.screenTool")}`;
    // console.log(this.$t())
    this.getInterimUserList();
    this.getPersonalEvaluationList();
    this.getJobEvaluationList();
  },
  methods: {
    handleSelectRowjobTable(selection, row) {
      // console.log("selection", selection);
      // console.log("row", row);
      this.$refs.jobTable.clearSelection();
      this.$refs.jobTable.toggleRowSelection(row, true);
    },
    handleSelectRowpersonTable(selection, row) {
      // console.log("selection", selection);
      // console.log("row", row);
      this.$refs.personTable.clearSelection();
      this.$refs.personTable.toggleRowSelection(row, true);
    },
    //获取HE结果
    getHEResult(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.HEform.isTimeAccurate =
            this.HEform.tob == "null" ? "null" : "on";
          console.log(this.HEform);
          this.$http.post(api.tool.getHEResult(), formatUrl(this.HEform)).then(
            res => {
              console.log(res);
              if (res.data.code == "911") {
                location.href = "./login.html";
              }
              if (res.data.code == "00" && typeof res.data.data == "object") {
                this.$message({
                  type: "error",
                  message: res.data.errMessage
                });
              }
              if (res.data.code == "00" && typeof res.data.data == "string") {
                console.log(res);
                res.data.data = res.data.data
                  .replace(/AB0/g, "个人情况")
                  .replace(/AB2/g, "大胆开拓")
                  .replace(/AB3/g, "求职思考")
                  .replace(/AB4/g, "深究创造")
                  .replace(/AB5/g, "激烈竞争")
                  .replace(/AB6/g, "自信努力")
                  .replace(/AB7/g, "行动表现")
                  .replace(/AB8/g, "友善服务")
                  .replace(/AB9/g, "资源管理")
                  .replace(/AB10/g, "社交销售")
                  .replace(/_/g, "")
                  .replace(/AB1/g, "谨慎守规");
                res.data.data = eval("(" + res.data.data + ")");
                this.ISshow = false;
                this.TABshow = true;
                console.log(res.data.data);

                this.ab0values = res.data.data.ab0Values;
                this.ab0Colors = res.data.data.ab0Colors;
                this.ab1values = res.data.data.ab1Values;
                this.ab1Colors = res.data.data.ab1Colors;
                this.ab2values = res.data.data.ab2Values;
                this.ab2Colors = res.data.data.ab2Colors;
                var AB0 = 0;
                var AB1 = 0;
                var AB2 = 0;
                var AB3 = 0;
                var AB4 = 0;
                var AB5 = 0;
                var AB6 = 0;
                var AB7 = 0;
                var AB8 = 0;
                var AB9 = 0;
                var AB10 = 0;
                if (this.ab0values) {
                  for (var i = 0; i < this.ab0values.length; i++) {
                    if (this.ab0values[i].split(",")[0] == "个人情况") {
                      if (this.ab0values[i].split(",")[1]) {
                        AB0 += parseInt(this.ab0values[i].split(",")[1]);
                      } else {
                        AB0 += 0;
                      }
                    }
                    if (this.ab0values[i].split(",")[0] == "谨慎守规") {
                      if (this.ab0values[i].split(",")[1]) {
                        AB1 += parseInt(this.ab0values[i].split(",")[1]);
                      } else {
                        AB1 += 0;
                      }
                    }
                    if (this.ab0values[i].split(",")[0] == "大胆开拓") {
                      if (this.ab0values[i].split(",")[1]) {
                        AB2 += parseInt(this.ab0values[i].split(",")[1]);
                      } else {
                        AB2 += 0;
                      }
                    }
                    if (this.ab0values[i].split(",")[0] == "求职思考") {
                      if (this.ab0values[i].split(",")[1]) {
                        AB3 += parseInt(this.ab0values[i].split(",")[1]);
                      } else {
                        AB3 += 0;
                      }
                    }
                    if (this.ab0values[i].split(",")[0] == "深究创造") {
                      if (this.ab0values[i].split(",")[1]) {
                        AB4 += parseInt(this.ab0values[i].split(",")[1]);
                      } else {
                        AB4 += 0;
                      }
                    }
                    if (this.ab0values[i].split(",")[0] == "激烈竞争") {
                      if (this.ab0values[i].split(",")[1]) {
                        AB5 += parseInt(this.ab0values[i].split(",")[1]);
                      } else {
                        AB5 += 0;
                      }
                    }
                    if (this.ab0values[i].split(",")[0] == "自信努力") {
                      if (this.ab0values[i].split(",")[1]) {
                        AB6 += parseInt(this.ab0values[i].split(",")[1]);
                      } else {
                        AB6 += 0;
                      }
                    }
                    if (this.ab0values[i].split(",")[0] == "行动表现") {
                      if (this.ab0values[i].split(",")[1]) {
                        AB7 += parseInt(this.ab0values[i].split(",")[1]);
                      } else {
                        AB7 += 0;
                      }
                    }
                    if (this.ab0values[i].split(",")[0] == "友善服务") {
                      if (this.ab0values[i].split(",")[1]) {
                        AB8 += parseInt(this.ab0values[i].split(",")[1]);
                      } else {
                        AB8 += 0;
                      }
                    }
                    if (this.ab0values[i].split(",")[0] == "资源管理") {
                      if (this.ab0values[i].split(",")[1]) {
                        AB9 += parseInt(this.ab0values[i].split(",")[1]);
                      } else {
                        AB9 += 0;
                      }
                    }
                    if (this.ab0values[i].split(",")[0] == "社交销售") {
                      if (this.ab0values[i].split(",")[1]) {
                        AB10 += parseInt(this.ab0values[i].split(",")[1]);
                      } else {
                        AB10 += 0;
                      }
                    }
                  }
                }

                var BAB0 = 0;
                var BAB1 = 0;
                var BAB2 = 0;
                var BAB3 = 0;
                var BAB4 = 0;
                var BAB5 = 0;
                var BAB6 = 0;
                var BAB7 = 0;
                var BAB8 = 0;
                var BAB9 = 0;
                var BAB10 = 0;
                if (this.ab1values) {
                  for (var i = 0; i < this.ab1values.length; i++) {
                    if (this.ab1values[i].split(",")[0] == "个人情况") {
                      if (this.ab1values[i].split(",")[1]) {
                        BAB0 += parseInt(this.ab1values[i].split(",")[1]);
                      } else {
                        BAB0 += 0;
                      }
                    }
                    if (this.ab1values[i].split(",")[0] == "谨慎守规") {
                      if (this.ab1values[i].split(",")[1]) {
                        BAB1 += parseInt(this.ab1values[i].split(",")[1]);
                      } else {
                        BAB1 += 0;
                      }
                    }
                    if (this.ab1values[i].split(",")[0] == "大胆开拓") {
                      if (this.ab1values[i].split(",")[1]) {
                        BAB2 += parseInt(this.ab1values[i].split(",")[1]);
                      } else {
                        BAB2 += 0;
                      }
                    }
                    if (this.ab1values[i].split(",")[0] == "求职思考") {
                      if (this.ab1values[i].split(",")[1]) {
                        BAB3 += parseInt(this.ab1values[i].split(",")[1]);
                      } else {
                        BAB3 += 0;
                      }
                    }
                    if (this.ab1values[i].split(",")[0] == "深究创造") {
                      if (this.ab1values[i].split(",")[1]) {
                        BAB4 += parseInt(this.ab1values[i].split(",")[1]);
                      } else {
                        BAB4 += 0;
                      }
                    }
                    if (this.ab1values[i].split(",")[0] == "激烈竞争") {
                      if (this.ab1values[i].split(",")[1]) {
                        BAB5 += parseInt(this.ab1values[i].split(",")[1]);
                      } else {
                        BAB5 += 0;
                      }
                    }
                    if (this.ab1values[i].split(",")[0] == "自信努力") {
                      if (this.ab1values[i].split(",")[1]) {
                        BAB6 += parseInt(this.ab1values[i].split(",")[1]);
                      } else {
                        BAB6 += 0;
                      }
                    }
                    if (this.ab1values[i].split(",")[0] == "行动表现") {
                      if (this.ab1values[i].split(",")[1]) {
                        BAB7 += parseInt(this.ab1values[i].split(",")[1]);
                      } else {
                        BAB7 += 0;
                      }
                    }
                    if (this.ab1values[i].split(",")[0] == "友善服务") {
                      if (this.ab1values[i].split(",")[1]) {
                        BAB8 += parseInt(this.ab1values[i].split(",")[1]);
                      } else {
                        BAB8 += 0;
                      }
                    }
                    if (this.ab1values[i].split(",")[0] == "资源管理") {
                      if (this.ab1values[i].split(",")[1]) {
                        BAB9 += parseInt(this.ab1values[i].split(",")[1]);
                      } else {
                        BAB9 += 0;
                      }
                    }
                    if (this.ab1values[i].split(",")[0] == "社交销售") {
                      if (this.ab1values[i].split(",")[1]) {
                        BAB10 += parseInt(this.ab1values[i].split(",")[1]);
                      } else {
                        BAB10 += 0;
                      }
                    }
                  }
                }

                var CAB0 = 0;
                var CAB1 = 0;
                var CAB2 = 0;
                var CAB3 = 0;
                var CAB4 = 0;
                var CAB5 = 0;
                var CAB6 = 0;
                var CAB7 = 0;
                var CAB8 = 0;
                var CAB9 = 0;
                var CAB10 = 0;
                if (this.ab2values) {
                  for (var i = 0; i < this.ab2values.length; i++) {
                    if (this.ab2values[i].split(",")[0] == "个人情况") {
                      if (this.ab2values[i].split(",")[1]) {
                        CAB0 += parseInt(this.ab2values[i].split(",")[1]);
                      } else {
                        CAB0 += 0;
                      }
                    }
                    if (this.ab2values[i].split(",")[0] == "谨慎守规") {
                      if (this.ab2values[i].split(",")[1]) {
                        CAB1 += parseInt(this.ab2values[i].split(",")[1]);
                      } else {
                        CAB1 += 0;
                      }
                    }
                    if (this.ab2values[i].split(",")[0] == "大胆开拓") {
                      if (this.ab2values[i].split(",")[1]) {
                        CAB2 += parseInt(this.ab2values[i].split(",")[1]);
                      } else {
                        CAB2 += 0;
                      }
                    }
                    if (this.ab2values[i].split(",")[0] == "求职思考") {
                      if (this.ab2values[i].split(",")[1]) {
                        CAB3 += parseInt(this.ab2values[i].split(",")[1]);
                      } else {
                        CAB3 += 0;
                      }
                    }
                    if (this.ab2values[i].split(",")[0] == "深究创造") {
                      if (this.ab2values[i].split(",")[1]) {
                        CAB4 += parseInt(this.ab2values[i].split(",")[1]);
                      } else {
                        CAB4 += 0;
                      }
                    }
                    if (this.ab2values[i].split(",")[0] == "激烈竞争") {
                      if (this.ab2values[i].split(",")[1]) {
                        CAB5 += parseInt(this.ab2values[i].split(",")[1]);
                      } else {
                        CAB5 += 0;
                      }
                    }
                    if (this.ab2values[i].split(",")[0] == "自信努力") {
                      if (this.ab2values[i].split(",")[1]) {
                        CAB6 += parseInt(this.ab2values[i].split(",")[1]);
                      } else {
                        CAB6 += 0;
                      }
                    }
                    if (this.ab2values[i].split(",")[0] == "行动表现") {
                      if (this.ab2values[i].split(",")[1]) {
                        CAB7 += parseInt(this.ab2values[i].split(",")[1]);
                      } else {
                        CAB7 += 0;
                      }
                    }
                    if (this.ab2values[i].split(",")[0] == "友善服务") {
                      if (this.ab2values[i].split(",")[1]) {
                        CAB8 += parseInt(this.ab2values[i].split(",")[1]);
                      } else {
                        CAB8 += 0;
                      }
                    }
                    if (this.ab2values[i].split(",")[0] == "资源管理") {
                      if (this.ab2values[i].split(",")[1]) {
                        CAB9 += parseInt(this.ab2values[i].split(",")[1]);
                      } else {
                        CAB9 += 0;
                      }
                    }
                    if (this.ab2values[i].split(",")[0] == "社交销售") {
                      if (this.ab2values[i].split(",")[1]) {
                        CAB10 += parseInt(this.ab2values[i].split(",")[1]);
                      } else {
                        CAB10 += 0;
                      }
                    }
                  }
                }
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    backgo() {
      this.ISshow = true;
      this.TABshow = false;
    },
    //51job页面
    getInterimUserList() {
      this.listLoading = true;
      this.$http.post(api.tool.getInterimUserList()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.listLoading = false;

            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].sex == "1") {
                res.data.data[i].sex = this.$t("screenTool.m1");
              }
              if (res.data.data[i].sex == "0") {
                res.data.data[i].sex = this.$t("screenTool.m2");
              }
            }
            this.tableData = res.data.data;
            // this.url=res.data.data
            // console.log(res);
          }
          if (res.data.code == "500") {
            this.listLoading = false;

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
    //点击行进入链接页面
    handleRowHandle(row, event, column) {
      window.open(row.url);
    },
    //一键HE
    getHEResultList() {
      this.$http.post(api.tool.getHEResultList()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            console.log(res);
            this.$message({
              type: "success",
              message: this.$t("valid.msg28")
            });
            this.getInterimUserList();
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
    //筛选
    //按钮
    screenOpen(formName) {
      this.dialogFormVisible = true;

      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      //  this.$refs[formName].resetFields();
    },
    //条件
    findByHE() {
      this.$http.post(api.tool.findByHE(), formatUrl(this.screenForm)).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            console.log(res);
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].sex == "1") {
                res.data.data[i].sex = this.$t("screenTool.m1");
              }
              if (res.data.data[i].sex == "0") {
                res.data.data[i].sex = this.$t("screenTool.m2");
              }
            }
            this.tableData = res.data.data;
            this.dialogFormVisible = false;
            this.cancelScreen = false;
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
    //取消筛选
    cancelScreenbutton() {
      this.cancelScreen = true;
      this.getInterimUserList();
    },
    //清空按钮
    deleteAll() {
      this.$http.post(api.tool.deleteAll()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            console.log(res);
            this.getInterimUserList();
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
    //获取个人测评
    getPersonalEvaluationList() {
      this.$http.post(api.tool.getPersonalEvaluationList()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            console.log(res);
            if (res.data.data) {
              if (res.data.data.length > 5) {
                for (var i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].updateDate =
                    new Date(res.data.data[i].updateDate).getFullYear() +
                    "-" +
                    (parseInt(
                      new Date(res.data.data[i].updateDate).getMonth()
                    ) +
                      1) +
                    "-" +
                    new Date(res.data.data[i].updateDate).getDate();
                }
                // res.data.data.updateDate
                this.personData = res.data.data.slice(0, 5);
              } else {
                for (var i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].updateDate =
                    new Date(res.data.data[i].updateDate).getFullYear() +
                    "-" +
                    (parseInt(
                      new Date(res.data.data[i].updateDate).getMonth()
                    ) +
                      1) +
                    "-" +
                    new Date(res.data.data[i].updateDate).getDate();
                }
                // res.data.data.updateDate
                this.personData = res.data.data;
              }
            }
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
    //获取职位测评
    getJobEvaluationList() {
      this.$http.post(api.tool.getJobEvaluationList()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            console.log(res);
            if (res.data.data) {
              if (res.data.data.length > 5) {
                for (var i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].updateDate =
                    new Date(res.data.data[i].updateDate).getFullYear() +
                    "-" +
                    (parseInt(
                      new Date(res.data.data[i].updateDate).getMonth()
                    ) +
                      1) +
                    "-" +
                    new Date(res.data.data[i].updateDate).getDate();
                }
                this.jobData = res.data.data.slice(0, 5);
              } else {
                for (var i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].updateDate =
                    new Date(res.data.data[i].updateDate).getFullYear() +
                    "-" +
                    (parseInt(
                      new Date(res.data.data[i].updateDate).getMonth()
                    ) +
                      1) +
                    "-" +
                    new Date(res.data.data[i].updateDate).getDate();
                }
                this.jobData = res.data.data;
              }
            }
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
    //搜索职位测评
    searchJobEvaluationList() {
      this.$http
        .post(
          api.tool.searchJobEvaluationList(),
          formatUrl({ search: this.jobsearch.trim() })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              console.log(res);
              if (this.jobsearch.trim() == "") {
                if (res.data.data.length > 5) {
                  for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].updateDate =
                      new Date(res.data.data[i].updateDate).getFullYear() +
                      "-" +
                      (parseInt(
                        new Date(res.data.data[i].updateDate).getMonth()
                      ) +
                        1) +
                      "-" +
                      new Date(res.data.data[i].updateDate).getDate();
                  }
                  this.jobData = res.data.data.slice(0, 5);
                } else {
                  for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].updateDate =
                      new Date(res.data.data[i].updateDate).getFullYear() +
                      "-" +
                      (parseInt(
                        new Date(res.data.data[i].updateDate).getMonth()
                      ) +
                        1) +
                      "-" +
                      new Date(res.data.data[i].updateDate).getDate();
                  }
                  this.jobData = res.data.data;
                }
              } else {
                for (var i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].updateDate =
                    new Date(res.data.data[i].updateDate).getFullYear() +
                    "-" +
                    (parseInt(
                      new Date(res.data.data[i].updateDate).getMonth()
                    ) +
                      1) +
                    "-" +
                    new Date(res.data.data[i].updateDate).getDate();
                }
                // res.data.data.updateDate
                this.jobData = res.data.data;
              }
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
    //搜索个人测评
    searchPersonalEvaluationList() {
      this.$http
        .post(
          api.tool.searchPersonalEvaluationList(),
          formatUrl({ search: this.personsearch.trim() })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              console.log(res);
              if (this.personsearch.trim() == "") {
                if (res.data.data.length > 5) {
                  for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].updateDate =
                      new Date(res.data.data[i].updateDate).getFullYear() +
                      "-" +
                      (parseInt(
                        new Date(res.data.data[i].updateDate).getMonth()
                      ) +
                        1) +
                      "-" +
                      new Date(res.data.data[i].updateDate).getDate();
                  }
                  this.personData = res.data.data.slice(0, 5);
                } else {
                  for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].updateDate =
                      new Date(res.data.data[i].updateDate).getFullYear() +
                      "-" +
                      (parseInt(
                        new Date(res.data.data[i].updateDate).getMonth()
                      ) +
                        1) +
                      "-" +
                      new Date(res.data.data[i].updateDate).getDate();
                  }
                  this.personData = res.data.data;
                }
              } else {
                for (var i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].updateDate =
                    new Date(res.data.data[i].updateDate).getFullYear() +
                    "-" +
                    (parseInt(
                      new Date(res.data.data[i].updateDate).getMonth()
                    ) +
                      1) +
                    "-" +
                    new Date(res.data.data[i].updateDate).getDate();
                }
                // res.data.data.updateDate
                this.personData = res.data.data;
              }
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
    //匹配

    handleSelect(item) {
      console.log(item);
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 职位
    jobSelectionChange(val) {
      this.jobselectArr = val;
      console.log(this.jobselectArr);
    },
    //个人
    personSelectionChange(val) {
      this.personselectArr = val;
      console.log(this.personselectArr);
    },
    //导出匹配报告
    exportMatchReport(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.Matchbuttonloading = true;
          let para = {
            jobId: this.jobselectArr[0].id,
            personalId: this.personselectArr[0].id,
            language: this.languageValidateForm.language
          };
          this.$http
            .get(api.tool.exportMatchReport(), {
              params: para,
              headers: {
                "Content-Type": "application/pdf;charset =utf-8"
              }
            })
            .then(
              res => {
                // this.dialogFormVisible6 = false
                if (res.data.code == "500") {
                  this.Matchbuttonloading = false;
                  this.$message({
                    type: "error",
                    message: res.data.errMessage
                  });
                } else if (res.data.data == "java.lang.NullPointerException") {
                  this.Matchbuttonloading = false;
                  return this.$message({
                    type: "error",
                    message: this.$t("msg.msg29")
                  });
                } else {
                  this.Matchbuttonloading = false;
                  window.open(
                    api.tool.exportMatchReport() + "?" + formatUrl(para),
                    Date.now()
                  );
                }
              },
              error => {
                console.log(error);
              }
            );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script>
<style>
.Matchreport .el-table--border th:first-child .cell {
  display: none;
}
.el-tabs__nav {
  left: 50%;
  transform: translateX(-50%) !important;
}

.mybutton {
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
}

.mybutton button {
  float: right;
}

.screenform .el-dialog__body {
  padding: 20px 20px 0 20px;
}

.screenform .el-dialog__header {
  display: none;
}

.screenform .el-form-item {
  margin-bottom: 5px;
}

.screenform .el-dialog__footer {
  text-align: center;
}

.Matchreport {
  overflow: hidden;
  padding: 0 100px;
}

.prp_top {
  margin-bottom: 20px;
  overflow: hidden;
}

.prp_top .word {
  text-align: left;
  float: left;
  height: 40px;
  line-height: 40px;
  width: 20%;
  font-size: 24px;
}
.prp_top .el-input {
  width: 60%;
  float: left;
}

.language .el-form-item__content {
  text-align: left;
}

.language .el-form-item__label {
  font-size: 24px;
}

/* .el-table thead tr {
  background-color: #ccc;
} */

.Heform {
  padding: 100px 25%;
  width: 50%;
  min-width: 550px;
}

.Heform .el-form-item__label {
  text-align: left;
  width: 32%;
}

.Heform .el-form-item__content {
  float: left;
  width: 68%;
  /* margin-left: 0 !important; */
}

.Heform .el-radio__inner {
  font-size: 16px;
  width: 16px;
  height: 16px;
}

.getHeform .el-form-item__content {
  left: 50%;
  transform: translateX(-50%);
}

/* he */

.testform {
  float: left;
  width: 84% !important;
  margin: 0;
  color: #878d99;
  /*border-color: #e6ebf5;*/
}

.testform th,
.testform td {
  box-sizing: border-box;
  height: 48px;
  width: 16.66%;
  border-right: 1px solid #e6ebf5;
  border-bottom: 1px solid #e6ebf5;
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
.el-table--border {
  border: 1px solid #ebeef5;
}
.toolbox {
  padding: 0 3%;
}
</style>

