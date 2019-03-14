<template>
  <div>
    <!-- {{this.$store.state.Privilege}} -->
    <!--编辑弹出框-->
    <el-dialog
      :visible.sync="dialogFormVisible3"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div v-if="(analysis=='ICS_PRP_Analysis')">
        <el-form
          :model="icsprpform"
          ref="icsprpform"
          :rules="icsprpformrules"
        >
          <el-form-item
            :label="$t('analysisSystem.setType')"
            :label-width="formLabelWidth"
            prop="category"
          >
            <el-select v-model="icsprpform.category">
              <el-option
                label="P1"
                value="P1_AB1"
              ></el-option>
              <el-option
                label="P2"
                value="P2_AB2"
              ></el-option>
              <el-option
                label="P3"
                value="P3_AB3"
              ></el-option>
              <el-option
                label="P4"
                value="P4_AB4"
              ></el-option>
              <el-option
                label="P5"
                value="P5_AB5"
              ></el-option>
              <el-option
                label="P6"
                value="P6_AB6"
              ></el-option>
              <el-option
                label="P7"
                value="P7_AB7"
              ></el-option>
              <el-option
                label="P8"
                value="P8_AB8"
              ></el-option>
              <el-option
                label="P9"
                value="P9_AB9"
              ></el-option>
              <el-option
                label="P10"
                value="P10_AB10"
              ></el-option>
              <el-option
                :label="$t('analysisSystem.other')"
                value="OTHER"
              ></el-option>
            </el-select>

          </el-form-item>
          <el-form-item
            :label="$t('analysisSystem.c01')"
            :label-width="formLabelWidth"
            prop="condition1"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.condition1"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('analysisSystem.c02')"
            :label-width="formLabelWidth"
            prop="condition2"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.condition2"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('analysisSystem.c03')"
            :label-width="formLabelWidth"
            prop="condition3"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.condition3"
            ></el-input>
          </el-form-item>

          <el-form-item
            :label="$t('analysisSystem.p01')"
            :label-width="formLabelWidth"
            prop="content1"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              :placeholder="$t('valid.valid017')"
              v-model="icsprpform.content1"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            :label="$t('analysisSystem.p02')"
            :label-width="formLabelWidth"
            prop="content2"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              :placeholder="$t('valid.valid017')"
              v-model="icsprpform.content2"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            :label="$t('analysisSystem.p03')"
            :label-width="formLabelWidth"
            prop="content3"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.content3"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('analysisSystem.p04')"
            :label-width="formLabelWidth"
            prop="content4"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.content4"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="Personality Tendency"
            :label-width="formLabelWidth"
            prop="content1En"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="Please enter the content"
              v-model="icsprpform.content1En"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="Job Tendency"
            :label-width="formLabelWidth"
            prop="content2En"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="Please enter the content"
              v-model="icsprpform.content2En"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="Personal Characteristic"
            :label-width="formLabelWidth"
            prop="content3En"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.content3En"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Job Requirement"
            :label-width="formLabelWidth"
            prop="content4En"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.content4En"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div v-else-if="(analysis=='HE_Analysis')">
        <el-form
          :model="icsprpform"
          ref="icsprpform"
          :rules="icsprpformrules1"
        >
          <el-form-item
            :label="$t('analysisSystem.setType')"
            :label-width="formLabelWidth"
            prop="category"
          >
            <el-select v-model="icsprpform.category">
              <el-option
                label="AB1"
                value="P1_AB1"
              ></el-option>
              <el-option
                label="AB2"
                value="P2_AB2"
              ></el-option>
              <el-option
                label="AB3"
                value="P3_AB3"
              ></el-option>
              <el-option
                label="AB4"
                value="P4_AB4"
              ></el-option>
              <el-option
                label="AB5"
                value="P5_AB5"
              ></el-option>
              <el-option
                label="AB6"
                value="P6_AB6"
              ></el-option>
              <el-option
                label="AB7"
                value="P7_AB7"
              ></el-option>
              <el-option
                label="AB8"
                value="P8_AB8"
              ></el-option>
              <el-option
                label="AB9"
                value="P9_AB9"
              ></el-option>
              <el-option
                label="AB10"
                value="P10_AB10"
              ></el-option>
              <el-option
                :label="$t('analysisSystem.other')"
                value="OTHER"
              ></el-option>
            </el-select>

          </el-form-item>
          <el-form-item
            :label="$t('analysisSystem.c01')"
            :label-width="formLabelWidth"
            prop="condition1"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.condition1"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('analysisSystem.c02')"
            :label-width="formLabelWidth"
            prop="condition2"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.condition2"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('analysisSystem.c03')"
            :label-width="formLabelWidth"
            prop="condition3"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.condition3"
            ></el-input>
          </el-form-item>

          <el-form-item
            :label="$t('analysisSystem.h01')"
            :label-width="formLabelWidth"
            prop="content1"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              :placeholder="$t('valid.valid017')"
              v-model="icsprpform.content1"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            :label="$t('analysisSystem.h02')"
            :label-width="formLabelWidth"
            prop="content2"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              :placeholder="$t('valid.valid017')"
              v-model="icsprpform.content2"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            :label="$t('analysisSystem.h03')"
            :label-width="formLabelWidth"
            prop="content3"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.content3"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('analysisSystem.h04')"
            :label-width="formLabelWidth"
            prop="content4"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.content4"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="Excel Job Area (Title) "
            :label-width="formLabelWidth"
            prop="content1En"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="Please enter the content"
              v-model="icsprpform.content1En"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="Excel Job Area (Content)"
            :label-width="formLabelWidth"
            prop="content2En"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="Please enter the content"
              v-model="icsprpform.content2En"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="Critical Job Ability (Title)"
            :label-width="formLabelWidth"
            prop="content3En"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.content3En"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Critical Job Ability (Content)"
            :label-width="formLabelWidth"
            prop="content4En"
          >
            <el-input
              auto-complete="off"
              v-model="icsprpform.content4En"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelupdate('icsprpform')">{{$t('btn.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="updateEvaluationAnalysis('icsprpform',icsprpform)"
          :loading='isSave1'
        >{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>

    <div>
      <el-tabs
        value="ICS_PRP_Analysis"
        @tab-click="changeClick"
        type="border-card"
        class="businessInfo"
      >
        <el-tab-pane
          :label="$t('analysisSystem.tab01')"
          name="ICS_PRP_Analysis"
          v-if="this.$store.state.Privilege.includes('TAB_EVALUATION_ANALYSIS_PRP')"
        >
          <el-button
            @click="addanalyse('icsprpform1')"
            class="addbtn"
            v-if="this.$store.state.Privilege.includes('BUTTON_EVALUATION_ANALYSIS_PRP_EMENDATION')"
          >{{$t('analysisSystem.addAnalysis')}}</el-button>
          <!--弹出框-->
          <el-button
            class="delbtn"
            :disabled="this.sels.length===0"
            @click="deleteById"
            v-if="this.$store.state.Privilege.includes('BUTTON_EVALUATION_ANALYSIS_PRP_EMENDATION')"
          >{{$t('analysisSystem.deleteAnalysis')}}</el-button>
          <!--ics添加分析-->

          <el-dialog
            :visible.sync="dialogFormVisible1"
            center
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
          >
            <el-form
              :model="icsprpform1"
              ref="icsprpform1"
              :rules="icsprpformrules"
            >

              <el-form-item
                :label="$t('analysisSystem.setType')"
                :label-width="formLabelWidth"
                prop="category"
              >
                <el-select v-model="icsprpform1.category">
                  <el-option
                    label="P1"
                    value="P1_AB1"
                  ></el-option>
                  <el-option
                    label="P2"
                    value="P2_AB2"
                  ></el-option>
                  <el-option
                    label="P3"
                    value="P3_AB3"
                  ></el-option>
                  <el-option
                    label="P4"
                    value="P4_AB4"
                  ></el-option>
                  <el-option
                    label="P5"
                    value="P5_AB5"
                  ></el-option>
                  <el-option
                    label="P6"
                    value="P6_AB6"
                  ></el-option>
                  <el-option
                    label="P7"
                    value="P7_AB7"
                  ></el-option>
                  <el-option
                    label="P8"
                    value="P8_AB8"
                  ></el-option>
                  <el-option
                    label="P9"
                    value="P9_AB9"
                  ></el-option>
                  <el-option
                    label="P10"
                    value="P10_AB10"
                  ></el-option>
                  <el-option
                    :label="$t('analysisSystem.other')"
                    value="OTHER"
                  ></el-option>
                </el-select>

              </el-form-item>
              <div v-if='icsprpform1.category!="OTHER"'>
                <el-form-item
                  :label="$t('analysisSystem.c01')"
                  :label-width="formLabelWidth"
                  prop="condition1"
                >
                  <el-input
                    auto-complete="off"
                    v-model="icsprpform1.condition1"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('analysisSystem.c02')"
                  :label-width="formLabelWidth"
                  prop="condition2"
                >
                  <el-input
                    auto-complete="off"
                    v-model="icsprpform1.condition2"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('analysisSystem.c03')"
                  :label-width="formLabelWidth"
                  prop="condition3"
                >
                  <el-input
                    auto-complete="off"
                    v-model="icsprpform1.condition3"
                  ></el-input>
                </el-form-item>
              </div>

              <el-form-item
                :label="$t('analysisSystem.p01')"
                :label-width="formLabelWidth"
                prop="content1"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  :placeholder="$t('valid.valid017')"
                  v-model="icsprpform1.content1"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                :label="$t('analysisSystem.p02')"
                :label-width="formLabelWidth"
                prop="content2"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  :placeholder="$t('valid.valid017')"
                  v-model="icsprpform1.content2"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                :label="$t('analysisSystem.p03')"
                :label-width="formLabelWidth"
                prop="content3"
              >
                <el-input
                  auto-complete="off"
                  v-model="icsprpform1.content3"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('analysisSystem.p04')"
                :label-width="formLabelWidth"
                prop="content4"
              >
                <el-input
                  auto-complete="off"
                  v-model="icsprpform1.content4"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="Personality Tendency"
                :label-width="formLabelWidth"
                prop="content1En"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  placeholder="Please enter the content"
                  v-model="icsprpform1.content1En"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="Job Tendency"
                :label-width="formLabelWidth"
                prop="content2En"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  placeholder="Please enter the content"
                  v-model="icsprpform1.content2En"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="Personal Characteristic"
                :label-width="formLabelWidth"
                prop="content3En"
              >
                <el-input
                  auto-complete="off"
                  v-model="icsprpform1.content3En"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="Job Requirement"
                :label-width="formLabelWidth"
                prop="content4En"
              >
                <el-input
                  auto-complete="off"
                  v-model="icsprpform1.content4En"
                ></el-input>
              </el-form-item>
            </el-form>
            <div
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="resetFormIP('icsprpform1')">{{$t('btn.cancel')}}</el-button>
              <el-button
                type="primary"
                @click="createEvaluationAnalysis('icsprpform1',icsprpform1)"
              >{{$t('btn.sure')}}</el-button>
            </div>
          </el-dialog>

          <el-tabs
            type="card"
            class="subtab"
            @tab-click="handleClick"
            value="P1_AB1"
            v-loading="tabloading"
          >
            <el-tab-pane
              :label="item1[0]"
              :name="item1[1]"
              v-for="(item1,index1) in title1"
              :key='index1'
              v-loading="listloading"
            >
              <el-table
                :data="analyseData.content"
                size="mini"
                stripe
                style="width: 100%"
                ref="analyseTable"
                tooltip-effect="dark"
                @sort-change="sortChange"
                @selection-change="selsChange"
              >
                <el-table-column
                  type="selection"
                  width="55"
                  prop="id"
                >
                </el-table-column>
                <el-table-column
                  prop="condition1"
                  :label="$t('analysisSystem.c01')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="condition2"
                  :label="$t('analysisSystem.c02')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="condition3"
                  :label="$t('analysisSystem.c03')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content1"
                  :label="$t('analysisSystem.p01')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content2"
                  :label="$t('analysisSystem.p02')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content3"
                  :label="$t('analysisSystem.p03')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content4"
                  :label="$t('analysisSystem.p04')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content1En"
                  label="Disposition tendency"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content2En"
                  label="Professional tendency"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content3En"
                  label="Personal characteristics"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content4En"
                  label="Job requirements"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  :label="$t('news.testNews.operation')"
                  prop="id"
                  v-if="$store.state.Privilege.includes('BUTTON_EVALUATION_ANALYSIS_PRP_EMENDATION')"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      round
                      class="editbtn"
                      mini
                      @click="getEvaluationAnalysisById(scope.$index, scope.row)"
                    >{{$t('analysisSystem.edit')}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <div class="block">
                <el-pagination
                  popper-class="testclass"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage1"
                  :page-size="analyseData.size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="analyseData.totalElements"
                >
                </el-pagination>
              </div>
            </el-tab-pane>

            <el-tab-pane
              :label="$t('analysisSystem.other')"
              name="OTHER"
              v-loading="listloading"
            >
              <el-table
                size="mini"
                :data="analyseData.content"
                stripe
                style="width: 100%"
                tooltip-effect="dark"
                @sort-change="sortChange"
                @selection-change="selsChange"
              >
                <el-table-column
                  type="selection"
                  width="55"
                  prop="id"
                >
                </el-table-column>
                <el-table-column
                  prop="content1"
                  :label="$t('analysisSystem.p01')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content2"
                  :label="$t('analysisSystem.p02')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content3"
                  :label="$t('analysisSystem.p03')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content4"
                  :label="$t('analysisSystem.p04')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content1En"
                  label="Disposition tendency"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content2En"
                  label="Professional tendency"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content3En"
                  label="Personal characteristics"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content4En"
                  label="Job requirements"
                  sortable
                >
                </el-table-column>

                <el-table-column :label="$t('news.testNews.operation')">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      round
                      class="editbtn"
                      size="mini"
                      @click="getEvaluationAnalysisById(scope.$index, scope.row)"
                    >{{$t('analysisSystem.edit')}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <div class="block">
                <el-pagination
                  popper-class="testclass"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage1"
                  :page-size="analyseData.size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="analyseData.totalElements"
                >
                </el-pagination>
              </div>
            </el-tab-pane>

          </el-tabs>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('analysisSystem.tab02')"
          name="HE_Analysis"
          v-if="this.$store.state.Privilege.includes('TAB_EVALUATION_ANALYSIS_HE')"
        >
          <el-button
            @click="addanalyse1('icsprpform2')"
            class="addbtn"
            v-if="this.$store.state.Privilege.includes('BUTTON_EVALUATION_ANALYSIS_HE_EMENDATION')"
          >{{$t('analysisSystem.addAnalysis')}}</el-button>

          <el-button
            class="delbtn"
            :disabled="this.sels.length===0"
            @click="deleteById"
            v-if="this.$store.state.Privilege.includes('BUTTON_EVALUATION_ANALYSIS_HE_EMENDATION')"
          >{{$t('analysisSystem.deleteAnalysis')}}</el-button>
          <!--he添加分析-->

          <el-dialog
            :visible.sync="dialogFormVisible2"
            center
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
          >
            <el-form
              :model="icsprpform2"
              ref="icsprpform2"
              :rules="icsprpformrules1"
            >
              <el-form-item
                :label="$t('analysisSystem.setType')"
                :label-width="formLabelWidth"
                prop="category"
              >
                <el-select v-model="icsprpform2.category">
                  <el-option
                    label="AB1"
                    value="P1_AB1"
                  ></el-option>
                  <el-option
                    label="AB2"
                    value="P2_AB2"
                  ></el-option>
                  <el-option
                    label="AB3"
                    value="P3_AB3"
                  ></el-option>
                  <el-option
                    label="AB4"
                    value="P4_AB4"
                  ></el-option>
                  <el-option
                    label="AB5"
                    value="P5_AB5"
                  ></el-option>
                  <el-option
                    label="AB6"
                    value="P6_AB6"
                  ></el-option>
                  <el-option
                    label="AB7"
                    value="P7_AB7"
                  ></el-option>
                  <el-option
                    label="AB8"
                    value="P8_AB8"
                  ></el-option>
                  <el-option
                    label="AB9"
                    value="P9_AB9"
                  ></el-option>
                  <el-option
                    label="AB10"
                    value="P10_AB10"
                  ></el-option>

                </el-select>

              </el-form-item>

              <el-form-item
                :label="$t('analysisSystem.c01')"
                :label-width="formLabelWidth"
                prop="condition1"
              >
                <el-input
                  auto-complete="off"
                  v-model="icsprpform2.condition1"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('analysisSystem.c02')"
                :label-width="formLabelWidth"
                prop="condition2"
              >
                <el-input
                  auto-complete="off"
                  v-model="icsprpform2.condition2"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('analysisSystem.c03')"
                :label-width="formLabelWidth"
                prop="condition3"
              >
                <el-input
                  auto-complete="off"
                  v-model="icsprpform2.condition3"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('analysisSystem.h01')"
                :label-width="formLabelWidth"
                prop="content1"
              >
                <el-input
                  auto-complete="off"
                  :placeholder="$t('valid.valid017')"
                  v-model="icsprpform2.content1"
                ></el-input>
                <!-- </el-input> -->
              </el-form-item>
              <el-form-item
                :label="$t('analysisSystem.h01')"
                :label-width="formLabelWidth"
                prop="content2"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  :placeholder="$t('valid.valid017')"
                  v-model="icsprpform2.content2"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                :label="$t('analysisSystem.h01')"
                :label-width="formLabelWidth"
                prop="content3"
              >
                <el-input
                  auto-complete="off"
                  v-model="icsprpform2.content3"
                  :placeholder="$t('valid.valid026')"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('analysisSystem.h01')"
                :label-width="formLabelWidth"
                prop="content4"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  :placeholder="$t('valid.valid017')"
                  v-model="icsprpform2.content4"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="Excel Job Area (Title)"
                :label-width="formLabelWidth"
                prop="content1En"
              >
                <el-input
                  auto-complete="off"
                  placeholder="Please enter the title"
                  v-model="icsprpform2.content1En"
                ></el-input>
                <!-- </el-input> -->
              </el-form-item>
              <el-form-item
                label="Excel Job Area (Content)"
                :label-width="formLabelWidth"
                prop="content2En"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  placeholder="Please enter the content"
                  v-model="icsprpform2.content2En"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="Critical Job Ability (Title)"
                :label-width="formLabelWidth"
                prop="content3En"
              >
                <el-input
                  auto-complete="off"
                  v-model="icsprpform2.content3En"
                  placeholder="Please enter the title"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="Critical Job Ability (Content)"
                :label-width="formLabelWidth"
                prop="content4En"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  placeholder="Please enter the content"
                  v-model="icsprpform2.content4En"
                >
                </el-input>
              </el-form-item>
            </el-form>
            <div
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="resetFormHE('icsprpform2')">{{$t('btn.cancel')}}</el-button>
              <el-button
                type="primary"
                @click="createEvaluationAnalysis('icsprpform2',icsprpform2)"
                :loading='isSave2'
              >{{$t('btn.sure')}}</el-button>
            </div>
          </el-dialog>

          <el-tabs
            type="card"
            class="subtab"
            @tab-click="handleClick"
            value="P1_AB1"
            v-loading="tabloading"
          >
            <el-tab-pane
              :label="item2[0]"
              :name="item2[1]"
              v-for="(item2,index2) in title2 "
              :key="index2"
            >

              <el-table
                size="mini"
                :data="analyseData.content"
                stripe
                style="width: 100%"
                ref="analyseTable"
                tooltip-effect="dark"
                @sort-change="sortChange"
                @selection-change="selsChange"
                v-loading="listloading"
              >
                <el-table-column
                  type="selection"
                  width="55"
                  prop="id"
                >
                </el-table-column>
                <el-table-column
                  prop="condition1"
                  :label="$t('analysisSystem.c01')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="condition2"
                  :label="$t('analysisSystem.c02')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="condition3"
                  :label="$t('analysisSystem.c03')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content1"
                  :label="$t('analysisSystem.p01')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content2"
                  :label="$t('analysisSystem.p02')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content3"
                  :label="$t('analysisSystem.p03')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content4"
                  :label="$t('analysisSystem.p04')"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content1En"
                  label="Excel Job Area (Title)"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content2En"
                  label="Excel Job Area (Content)"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content3En"
                  label="Critical Job Ability (Title)"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="content4En"
                  label="Critical Job Ability (Content)"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  :label="$t('news.testNews.operation')"
                  prop="id"
                  v-if="$store.state.Privilege.includes('BUTTON_EVALUATION_ANALYSIS_HE_EMENDATION')"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      round
                      class="editbtn"
                      size="mini"
                      @click="getEvaluationAnalysisById(scope.$index, scope.row)"
                    >{{$t('analysisSystem.edit')}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <div class="block">
                <el-pagination
                  popper-class="testclass"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage1"
                  :page-size="analyseData.size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="analyseData.totalElements"
                >
                </el-pagination>
              </div>
            </el-tab-pane>

          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
export default {
  data() {
    var reg = /(?=[\x21-\x7e]+)[^A-Za-z0-9]/;
    var validateCategory = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid015")));
      } else {
        callback();
      }
    };
    var validateCategoryAB = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid015")));
      } else {
        callback();
      }
    };
    var validateCondition1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid016")));
      } else if (value.indexOf("P") == "-1" || !reg.test(value)) {
        callback(new Error(this.$t("valid.valid027")));
      } else {
        callback();
      }
    };
    var validateCondition1AB = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid016")));
      } else if (value.indexOf("AB") == "-1" || !reg.test(value)) {
        callback(new Error(this.$t("valid.valid028")));
      } else {
        callback();
      }
    };

    var validateContent1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid017")));
      } else {
        callback();
      }
    };
    var validateContent1AB = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid017")));
      } else {
        callback();
      }
    };
    var validateContent2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid017")));
      } else {
        callback();
      }
    };
    var validateContent2AB = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid017")));
      } else {
        callback();
      }
    };
    var validateContent3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid017")));
      } else {
        callback();
      }
    };
    var validateContent3AB = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid017")));
      } else {
        callback();
      }
    };

    var validateContent1En = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the content"));
      } else {
        callback();
      }
    };
    var validateContent1EnAB = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the content"));
      } else {
        callback();
      }
    };
    var validateContent2En = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the content"));
      } else {
        callback();
      }
    };
    var validateContent2EnAB = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the content"));
      } else {
        callback();
      }
    };
    var validateContent3En = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the content"));
      } else {
        callback();
      }
    };
    var validateContent3EnAB = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the content"));
      } else {
        callback();
      }
    };
    return {
      title1: [
        ["P1", "P1_AB1"],
        ["P2", "P2_AB2"],
        ["P3", "P3_AB3"],
        ["P4", "P4_AB4"],
        ["P5", "P5_AB5"],
        ["P6", "P6_AB6"],
        ["P7", "P7_AB7"],
        ["P8", "P8_AB8"],
        ["P9", "P9_AB9"],
        ["P10", "P10_AB10"]
      ],
      title2: [
        ["AB1", "P1_AB1"],
        ["AB2", "P2_AB2"],
        ["AB3", "P3_AB3"],
        ["AB4", "P4_AB4"],
        ["AB5", "P5_AB5"],
        ["AB6", "P6_AB6"],
        ["AB7", "P7_AB7"],
        ["AB8", "P8_AB8"],
        ["AB9", "P9_AB9"],
        ["AB10", "P10_AB10"]
      ],

      size: 20,
      page: 0,
      sort: "id",
      sels: [], //列表选中列
      currentPage1: 1,
      analysis: "ICS_PRP_Analysis",
      category: "P1_AB1",
      formLabelWidth: "200px",
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      icsprpform1: {
        analysis: "ICS_PRP_Analysis",
        category: "",
        condition1: "",
        condition2: "",
        condition3: "",
        content1: "",
        content2: "",
        content3: "",
        content4: "",
        content1En: "",
        content2En: "",
        content3En: "",
        content4En: ""
      },
      icsprpform2: {
        analysis: "HE_Analysis",
        category: "",
        condition1: "",
        condition2: "",
        condition3: "",
        content1: "",
        content2: "",
        content3: "",
        content4: "",
        content1En: "",
        content2En: "",
        content3En: "",
        content4En: ""
      },
      icsprpform: {
        analysis: "ICS_PRP_Analysis",
        category: "",
        condition1: "",
        condition2: "",
        condition3: "",
        content1: "",
        content2: "",
        content3: "",
        content4: "",
        content1En: "",
        content2En: "",
        content3En: "",
        content4En: ""
      },
      icsprpformrules: {
        category: [
          { validator: validateCategory, trigger: "change", required: true }
        ],
        condition1: [
          { validator: validateCondition1, trigger: "blur", required: true }
        ],
        content1: [
          { validator: validateContent1, trigger: "blur", required: true }
        ],
        content2: [
          { validator: validateContent2, trigger: "blur", required: true }
        ],
        content3: [
          { validator: validateContent3, trigger: "blur", required: true }
        ],
        content1En: [
          { validator: validateContent1En, trigger: "blur", required: true }
        ],
        content2En: [
          { validator: validateContent2En, trigger: "blur", required: true }
        ],
        content3En: [
          { validator: validateContent3En, trigger: "blur", required: true }
        ]
      },
      icsprpformrules1: {
        category: [
          { validator: validateCategoryAB, trigger: "change", required: true }
        ],
        condition1: [
          { validator: validateCondition1AB, trigger: "blur", required: true }
        ],
        content1: [
          { validator: validateContent1AB, trigger: "blur", required: true }
        ],
        content2: [
          { validator: validateContent2AB, trigger: "blur", required: true }
        ],
        content3: [
          { validator: validateContent3AB, trigger: "blur", required: true }
        ],
        content1En: [
          { validator: validateContent1EnAB, trigger: "blur", required: true }
        ],
        content2En: [
          { validator: validateContent2EnAB, trigger: "blur", required: true }
        ],
        content3En: [
          { validator: validateContent3EnAB, trigger: "blur", required: true }
        ]
      },
      isCollapse: true,
      listloading: false,
      tabloading: false,
      analyseData: "",
      isSave1: false,
      isSave2: false
    };
  },
  created() {
    this.getEvaluationAnalysis();
  },
  methods: {
    //分页并按照分析、类别获取测评分析
    getEvaluationAnalysis() {
      this.listloading = true;
      var para = {
        size: this.size,
        sort: this.sort,
        page: this.page,
        analysis: this.analysis,
        category: this.category
      };
      this.$http
        .post(api.analyse.getEvaluationAnalysis(), formatUrl(para))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.analyseData = res.data.data;
              // console.log()
              this.listloading = false;
              // this.dialogFormVisible1 = false;
              // this.dialogFormVisible2 = false;
            }

            if (res.data.code == "500") {
              this.listloading = false;
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
    //分页
    handleSizeChange(val) {
      this.size = val;
      this.getEvaluationAnalysis();
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getEvaluationAnalysis();
    },

    sortChange({ column, prop, order }) {
      this.sort = prop;
      this.getEvaluationAnalysis();
    },

    selsChange: function(sels) {
      this.sels = sels;
    },
    //分页并按照分析、类别获取测评分析
    handleClick(tab, event) {
      this.analysis = tab.$parent.$parent.name;
      this.category = tab.name;
      this.listloading = true;
      this.getEvaluationAnalysis();
    },
    //ics/prp和he切换
    changeClick(tab, event) {
      // console.log(tab);
      this.analysis = tab.name;
      this.category = tab.$children[tab.$children.length - 1].currentName;
      this.icsprpform.analysis = tab.name;
      this.icsprpform1.analysis = tab.name;
      this.icsprpform2.analysis = tab.name;
      this.listloading = true;
      this.getEvaluationAnalysis();
    },
    //添加分析
    addanalyse(formName) {
      this.dialogFormVisible1 = true;
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    addanalyse1(formName) {
      this.dialogFormVisible2 = true;
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    //创建测评分析
    createEvaluationAnalysis(formName, formCname) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible2 = false;
          this.dialogFormVisible1 = false;
          this.isSave2 = true;
          this.$http
            .post(api.analyse.createEvaluationAnalysis(), formatUrl(formCname))
            .then(
              res => {
                if (res.data.code == "500") {
                  this.dialogFormVisible2 = false;
                  this.isSave2 = false;
                  this.$message({
                    type: "err",
                    message: res.data.errMessage
                  });
                }
                if (res.data.code == "911") {
                  location.href = "./login.html";
                }
                if (res.data.code == "00") {
                  this.isSave2 = false;
                  this.dialogFormVisible1 = false;
                  this.dialogFormVisible2 = false;
                  this.getEvaluationAnalysis();
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg3")
                  });
                }
              },
              error => {}
            );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除测评分析
    deleteById() {
      var ids = this.sels.map(item => item.id).toString();

      this.$confirm(
        this.$t("systemManagement.tip.contetn"),
        this.$t("systemManagement.tip.title"),
        {
          type: "warning"
        }
      )
        .then(() => {
          let para = { ids: ids };
          // console.log(ids);
          this.$http.post(api.analyse.deleteById(), formatUrl(para)).then(
            res => {
              // console.log(res);
              // this.userData = res.body.data.content
              // console.log(this.userData)
              this.getEvaluationAnalysis();
              this.$message({
                type: "success",
                message: this.$t("msg.msg2")
              });
            },
            error => {
              console.log(error);
            }
          );
        })
        .catch(() => {});
    },
    //根据id获取测评分析
    getEvaluationAnalysisById(index, row) {
      var para = { id: row.id };
      this.$http
        .post(api.analyse.getEvaluationAnalysisById(), formatUrl(para))
        .then(
          res => {
            // console.log(res);
            this.dialogFormVisible3 = true;
            this.icsprpform = res.data.data;
            // this.icsprpform.forEach(element => {
            // console.log(this.icsprpform.condition2);
            // });
            // console.log(res);
          },
          error => {
            console.log(error);
          }
        );
    },
    cancelupdate(formName) {
      this.dialogFormVisible3 = false;
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    //修改测评分析信息
    updateEvaluationAnalysis(formName, cformName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible3 = false;
          if (cformName.condition2 == null) {
            cformName.condition2 = "";
          }
          if (cformName.condition3 == null) {
            cformName.condition3 = "";
          }
          this.isSave1 = true;
          this.$http
            .post(api.analyse.updateEvaluationAnalysis(), formatUrl(cformName))
            .then(
              res => {
                // console.log(res);
                if (res.data.code == "00") {
                  // this.dialogFormVisible3 = false;

                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg8")
                  });
                  this.isSave1 = false;
                  this.getEvaluationAnalysis();
                }
                if (res.data.code == "500") {
                  // this.dialogFormVisible3 = false;
                  this.$message({
                    type: "error",
                    message: res.data.errMessage
                  });
                  this.isSave1 = false;
                }

                // this.dialogFormVisible3 = true;
                // this.icsprpform = res.data.data
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
    resetFormIP(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible1 = false;
    },
    resetFormHE(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible2 = false;
    }
  }
};
</script>
<style>
.el-form-item {
  margin-bottom: 20px;
}

a {
  text-decoration: none;
  color: #2d2f33;
}

.el-tabs__nav {
  left: 50%;
  transform: translateX(-50%) !important;
}

.el-tabs__header {
  margin: 20px 0 0;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  background-color: #cccccc;
}

.subtab .el-tabs__content {
  margin-top: 20px;
}

.addbtn {
  position: absolute;
  top: 44px;
  left: 20px;
  z-index: 99;
}

.delbtn {
  position: absolute;
  top: 44px;
  right: 20px;
  z-index: 99;
}

.el-form-item.is-required .el-form-item__label:before {
  margin-left: -10px;
}

.el-form-item__label {
  text-align: left;
}

.el-table th {
  text-align: center;
}

.el-select {
  width: 100%;
}

.el-table th > .cell {
  position: static;
}

.el-table .caret-wrapper {
  position: static;
}

.el-table .sort-caret {
  left: 50%;
  transform: translate(-50%, 0);
}

.el-table .sort-caret.ascending {
  top: 0;
}

.el-table .sort-caret.descending {
  bottom: 0;
}

.el-main {
  padding: 0 3%;
}
.testclass {
  transform: translateX(80px);
}
</style>
