<template>
  <div class="staffdetail">
    <!-- <div class="detailtitle">Centalent > 现有员工管理列表页 >
      <span>现有员工管理详情页</span>
    </div> -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="detailtitle">
      <el-breadcrumb-item>
        <a href="./news.html">Centalent</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manage' }">{{$t('staffSystem.staffPage')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('staffSystem.staffdetail')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 职位修改 -->
    <el-dialog :visible.sync="positiondialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" class="positiondialog">
      <el-form :model="editpositionform" :rules="editpositionrules" ref="editpositionform" label-position="left">
        <el-form-item :label="$t('staffSystem.jobName')" :label-width="formLabelWidth" prop="name">
          <el-input v-model.trim="editpositionform.name" auto-complete="off" :maxlength="maxlength"    :placeholder="$t('valid.valid030')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('staffSystem.departments')" :label-width="formLabelWidth" class="industry" prop="department">
          <el-input v-model.trim="editpositionform.department" auto-complete="off" :maxlength="maxlength"    :placeholder="$t('valid.valid048')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelposition('editpositionform')">{{$t('btn.back')}}</el-button>
        <el-button type="success" class="green" @click="updatePosition('editpositionform')">{{$t('btn.submit')}}</el-button>
      </div>
    </el-dialog>

    <!-- 第一部分 -->
    <div class="main_one">
      <div class="main_topdetailtop">
        <div class="main_leftdetail">
          <h3>
            <span>{{positionform.name}}</span>-
            <span>{{positionform.department}}</span>
          </h3>
        </div>
        <div class="main_right">
          <el-button class="hasneed" type="info" @click="deleteCompanyEmployee">{{$t('btn.b4')}}</el-button>
          <el-button class="hasneed" type="info" @click="editposition('editpositionform')">{{$t('recruitSystem.detail.editInfo')}}</el-button>
        </div>
      </div>
      <el-table :data="detailposition" stripe style="width: 100%">
        <el-table-column prop="name" :label="$t('staffSystem.jobName')">
        </el-table-column>
        <el-table-column prop="department" :label="$t('staffSystem.departments')">
        </el-table-column>
        <el-table-column prop="number"      :label="$t('staffSystem.number')">
        </el-table-column>
        <el-table-column prop="updateDate"     :label="$t('staffSystem.updateTime')" :formatter="p1dateFormat">
        </el-table-column>
      </el-table>
    </div>

    <!-- 发送测评 -->

    <!--发送职位测评弹出框-->
    <el-dialog :visible.sync="emailFormVisible" center width="30%" @close="closedialogemail('emailform')" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="emailform" ref="emailform" :rules="emailformrules" status-icon label-position="left">
        <el-form-item :label="$t('ics.email.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model.trim="emailform.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ics.email.email')" :label-width="formLabelWidth" prop="email">
          <el-input v-model.trim="emailform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ics.email.type')" :label-width="formLabelWidth" prop="type" class="modelban">
          <el-select v-model="emailform.type" :placeholder="$t('valid.valid010')">
            <el-option :label="$t('api.sale.a1')" :value="'直属领导'"></el-option>
            <el-option :label="$t('api.sale.a2')" :value="'最佳表现者'"></el-option>
            <el-option :label="$t('api.sale.a3')" :value="'人事负责人'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('ics.email.lang')" :label-width="formLabelWidth" prop="language">
          <el-radio-group v-model.trim="emailform.language">
            <el-radio label="cn">{{$t('ics.email.cn')}}</el-radio>
            <el-radio label="en">{{$t('ics.email.en')}}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="$t('ics.email.model')" :label-width="formLabelWidth" prop="mailId" class="modelban">
          <el-select v-model="emailform.mailId" :placeholder="$t('valid.valid009')" @change="check(emailform.mailId,'templetform')">
            <el-option :label='$t("valid.valid043")+(index+1)+"---"+ item.tpName' :value="item.id" v-for="(item,index) in emailmodelform" :key="index"></el-option>
            <el-option :label="$t('systemManagement.email.addmodel')" :value="'添加模板'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="mailContent" class="mailmodelcontent">
          <quill-editor v-model="emailform.mailContent" ref="myQuillEditor" class="editer" disabled>
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" class="green" @click="sendJobEvaluation('emailform')" :loading="buttonloading">{{$t('btn.suresend')}}</el-button>
        <el-button @click="resetForm('emailform')">{{$t('btn.cancel')}}</el-button>
      </div>
    </el-dialog>

    <!--添加模板-->
    <el-dialog :visible.sync="dialogFormVisibleadd" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="templetform" :rules="templetformrules" ref="templetform">
        <el-form-item prop="tpName">
          <el-input  :placeholder="$t('valid.valid042')" v-model="templetform.tpName"></el-input>
        </el-form-item>
        <el-form-item prop="content" class="addmailmodel">
          <quill-editor v-model="templetform.content" ref="myQuillEditor" class="editer">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelcreateMailTemp('emailform')">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" @click="createMailTemp('templetform')">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>

    <!--下载职位报告-->
    <el-dialog :visible.sync="prpFormVisible" width="25%" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form label-width="130px" label-position="left">
        <el-form-item :label="$t('ics.email.lang')">
          <el-select v-model="prplanguage" style="width:100%"  :placeholder="$t('valid.valid011')">
            <el-option :label="$t('ics.email.cn')" value="cn"></el-option>
            <!--<el-option label="English" value="en"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('ics.email.job')">
          <el-input v-model.trim="jobName" :placeholder="$t('valid.valid049')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="prpFormVisible = false">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="downloadPrpsure" :loading="prpbutton">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- 添加测评结果 -->
    <el-dialog :visible.sync="evaResultdialog" class="evaResultdialog" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="prp_top">
          <div class="word">{{$t('recruitSystem.tip.jobTest')}}</div>
          <el-input v-model.trim="jobsearch" :placeholder="$t('recruitSystem.tip.search')" @keyup.enter.delete.native="searchJobEvaluationList"></el-input>
          <el-button type="success" class="green" @click="searchJobEvaluationList" style="float:left">{{$t('recruitSystem.tip.searchbtn')}}</el-button>
          <el-button type="success" style="float:left" :disabled="this.jobResultsels.length===0" @click="bindingJobEvaluation">{{$t('recruitSystem.tip.addResult')}}</el-button>
        </div>
        <el-table ref="jobTable" :data="jobData" tooltip-effect="dark" style="width: 100%" height="230" stripe class="jobTable" @selection-change="jobSelectionChange">
          <el-table-column type="selection" width="55" prop="id">
          </el-table-column>
          <el-table-column :label="$t('ics.email.name')" width="120" prop="name">
          </el-table-column>
          <el-table-column prop="email" :label="$t('ics.email.email')">
          </el-table-column>
          <el-table-column prop="updateDate" :label="$t('screenTool.updateDate')" :formatter="jbdateformat">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 第二部分 -->
    <div class="main_one">
      <div class="main_topdetail">
        <div class="main_leftdetail">
          <h3>
            <span>{{$t('recruitSystem.detail.position')}}</span>
          </h3>
          <div class="maintipword">{{$t('staffSystem.tip')}}</div>
        </div>

        <div class="main_right">
          <el-button class="green" type="success" @click="openaddevaResult">{{$t('recruitSystem.detail.linker')}}
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
          <el-button class="blue" @click="sendemail('emailform')">{{$t('btn.send')}}
            <i class="el-icon-my-weibiaoti40 el-icon--right"></i>
          </el-button>

        </div>
      </div>

      <el-table :data="positionform.jobEvaluationList" stripe style="width: 100%" class="resultform" :default-sort="{prop: 'updateDate', order: 'descending'}">
        <el-table-column prop="name" :label="$t('ics.email.name')">
          <template slot-scope="scope">
            <!-- <el-button size="small" type="success" v-if="scope.row.isDefault">默认</el-button> -->
            <el-tag v-if="scope.row.isDefault" type="success">{{$t('recruitSystem.detail.defaultbtn')}}</el-tag>
            <el-button type="text" size="medium" @click="linkprpdetail(scope)">{{scope.row.name||$t('login.noname')}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="type" :label="$t('ics.email.type')">
        </el-table-column>
        <el-table-column prop="currentPosts" :label="$t('news.testNews.currentPos')">
        </el-table-column>
        <el-table-column prop="email" :label="$t('ics.email.email')">
        </el-table-column>
        <el-table-column prop="updateDate" :label="$t('news.testNews.finishedTime')" :formatter="jbdateformat">
        </el-table-column>
        <el-table-column :label="$t('news.testNews.operation')">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.status!='COMPLETED'" @click="downloadPrp(scope)">{{$t('recruitSystem.detail.doreport')}}</el-button>
            <el-button type="text" :disabled="scope.row.status!='COMPLETED'" @click="setJobEvaluationDefault(scope)">{{$t('recruitSystem.detail.setdefault')}}</el-button>
            <el-button size="text" @click="resendEvaluation(scope)" v-if="scope.row.resend">{{$t('btn.b3')}}</el-button>
            <el-button size="text" @click="deleteByJobIdAndEmployeeIdId(scope)">{{$t('btn.delete')}}</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <!--添加模板-->
    <el-dialog :visible.sync="dialogFormVisibleaddper" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="templetform" :rules="templetformrules" ref="templetform">
        <el-form-item prop="tpName">
          <el-input :placeholder="$t('valid.valid042')" v-model="templetform.tpName"></el-input>
        </el-form-item>
        <el-form-item prop="content" class="addmailmodel">
          <quill-editor v-model="templetform.content" ref="myQuillEditor" class="editer">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelcreateMailTempper('emailPersonform')">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" @click="createMailTempper('templetform')">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- 发送测评 -->
    <el-dialog :visible.sync="personFormVisible" center width="30%" @close="closedialogemailper('emailPersonform')" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="emailPersonform" ref="emailPersonform" :rules="formrules" status-icon label-position="left">
        <el-form-item :label="$t('ics.email.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model.trim="emailPersonform.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ics.email.email')" :label-width="formLabelWidth" prop="email">
          <el-input v-model.trim="emailPersonform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ics.email.link')" :label-width="formLabelWidth" prop="contact">
          <el-input v-model.trim="emailPersonform.contact" auto-complete="off" :blur="setphonechange(emailPersonform.contact)" v-on:change="phonechange"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ics.email.lang')" :label-width="formLabelWidth" prop="language">
          <el-radio-group v-model="emailPersonform.language">
            <el-radio label="cn">{{$t('ics.email.cn')}}</el-radio>
            <el-radio label="en">{{$t('ics.email.en')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item    :label="$t('ics.email.model')" :label-width="formLabelWidth" prop="mailId">
          <el-select v-model.trim="emailPersonform.mailId" :placeholder="$t('valid.valid009')" @change="checkper(emailPersonform.mailId,'templetform')">
            <el-option :label='$t("valid.valid043")+(index+1)+"---"+ item.tpName' :value="item.id" v-for="(item,index) in emailmodelform" :key="index"></el-option>
            <el-option       :label="$t('systemManagement.email.addmodel')" :value="'添加模板'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="mailContent" class="mailmodelcontent">
          <quill-editor v-model.trim="emailPersonform.mailContent" ref="myQuillEditor" class="editer" disabled>
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" class="green" @click="sendPersonalEvaluation('emailPersonform')" :loading="buttonloading">{{$t('btn.suresend')}}</el-button>
        <el-button @click="resetFormperson('emailPersonform')">{{$t('btn.cancel')}}</el-button>
      </div>
    </el-dialog>

    <!-- 添加个人测评结果 -->
    <el-dialog :visible.sync="perResultdialog" class="evaResultdialog" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="prp_top">
          <div class="word">{{$t("screenTool.ics")}}</div>
          <el-input v-model.trim="personsearch" :placeholder="$t('recruitSystem.tip.search')" @keyup.enter.delete.native="searchPersonalEvaluationList"></el-input>
          <el-button type="success" class="green" style="float:left" @click="searchPersonalEvaluationList">{{$t('recruitSystem.tip.searchbtn')}}</el-button>
          <el-button type="success" style="float:left" @click="bindingPersonalEvaluation">{{$t("recruitSystem.tip.addStaff")}}</el-button>
        </div>
        <el-table ref="jobTable" :data="personData" tooltip-effect="dark" style="width: 100%" height="230" stripe class="jobTable" @selection-change="staffperselschange" :row-class-name="tableRowClassName" v-loading="getpersonloading">
          <el-table-column type="selection" width="55" prop="id" :selectable="isSelect">
          </el-table-column>
          <el-table-column :label="$t('ics.email.name')" width="120" prop="name">
          </el-table-column>
          <el-table-column prop="email" :label="$t('ics.email.email')">
          </el-table-column>
          <el-table-column prop="updateDate" :label="$t('screenTool.updateDate')" :formatter="jbdateformat">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 下载报告 -->
    <!-- 下载报告 -->
    <el-dialog :visible.sync="downloaoddialog" width="20%" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="reportform" label-position="left" class="downreport" ref="reportform" :rules="reportformrules">
        <el-form-item :label="$t('ics.email.lang')" :label-width="formLabelWidth" prop="language">
          <el-select v-model="reportform.language" :placeholder="$t('recruitSystem.tip.selectStaff')">
            <el-option :label="$t('ics.email.cn')" value="cn"></el-option>
            <el-option :label="$t('ics.email.en')" value="en"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('recruitSystem.tip.reportType')" :label-width="formLabelWidth" prop="style">
          <el-select v-model="reportform.style" :placeholder="$t('recruitSystem.tip.selectType')">

            <el-option :label="$t('recruitSystem.tip.perreport')" value="person"></el-option>
            <el-option :label="$t('recruitSystem.tip.matreport')" value="match"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="canceldownloadIcssure">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="downloadIcssure('reportform')" :loading="Matchbuttonloading">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>

    <!-- 第三部分 -->
    <div class="main_one">
      <div class="main_topdetail">
        <div class="main_leftdetail">
          <h3>
            <span>{{$t('recruitSystem.tip.staffList')}}</span>
          </h3>
        </div>

        <div class="main_right">
          <el-button type='warning' :disabled="this.staffsels.length==0" @click="deleteByPersonalIdAndEmployeeIdId">{{$t('recruitSystem.detail.delete')}}
            <i class="el-icon-close el-icon--right"></i>
          </el-button>
          <el-button class="green" type="success" @click="openaddperResult">{{$t('recruitSystem.detail.linker')}}
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
          <el-button class="blue" type="primary" @click="sendPersonemail('emailPersonform')">{{$t('btn.send')}}
            <i class="el-icon-my-weibiaoti40 el-icon--right"></i>
          </el-button>

          <el-button type='info' @click="openreport('reportform')" :disabled="this.staffsels.length==0">{{$t('recruitSystem.detail.doreport')}}
            <i class="el-icon-my-xiazai1 el-icon--right"></i>
          </el-button>

        </div>
      </div>

      <el-table stripe ref="multipleTable" :data="positionform.personalEvaluationList" tooltip-effect="dark" style="width: 100%" @selection-change="staffselschange" row-key="id" v-loading="listLoading"           :element-loading-text="$t('businessSystem.loading')"
          :empty-text="$t('recruitSystem.screen.nodata')" highlight-current-row class="icspersontable" :cell-class-name="tableCellClassName">
        <el-table-column type="selection" width="55" prop="id" :reserve-selection="true">
        </el-table-column>
        <el-table-column prop="name" :label="$t('ics.email.name')">
          <template slot-scope="scope">
            <span @click="linkdetail(scope)" style="color:#249739;cursor:pointer">{{scope.row.name||$t('login.noname')}}</span>
            <!-- <el-button type="text" size="medium" @click="linkdetail(scope)">{{scope.row.name}}</el-button> -->
          </template>
        </el-table-column>
        <el-table-column prop="matching" :label="$t('news.positonNews.match')" :formatter="dataFormat">
        </el-table-column>
        <el-table-column prop="email" :label="$t('ics.email.email')">
        </el-table-column>
        <el-table-column prop="contact" :label="$t('ics.email.link')" show-overflow-tooltip>
        </el-table-column>
        <el-table-column :label="$t('news.testNews.birth')" show-overflow-tooltip prop="birthDates">
          <template slot-scope="scope">
            {{scope.row.birthDates}}&nbsp;&nbsp; {{scope.row.birthTime=="null"?"":scope.row.birthTime}}
          </template>
        </el-table-column>
        <el-table-column prop="sex" :label="$t('news.testNews.gender')" :formatter="sexFormat">
        </el-table-column>
        <el-table-column prop="status" :label="$t('news.testNews.testStatus')" show-overflow-tooltip :formatter="statusFormat">
        </el-table-column>
        <el-table-column prop="sendTime" :label="$t('news.testNews.sendTime')" show-overflow-tooltip :formatter="dateFormat">
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
import api from "../../../api/api.js";

import Util from "../../../tool/tool.js";
import formatUrl from "../../../lib/tool.js";
let mytools = new Util();
export default {
  data() {
    var validatetpName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid044")));
      } else {
        callback();
      }
    };
    var validatecontent = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.valid045")));
      } else {
        callback();
      }
    };
    return {
      listLoading: false,
      editpositionform: {},
      editpositionrules: {
        name: [{ required: true, message: this.$t("valid.valid030"), trigger: "blur" }],
        department: [
          { required: true, message: this.$t("valid.valid048"), trigger: "blur" }
        ]
      },
      icsdata: [],
      // positionform: { companyInfo: {}, jobEvaluationList: [], appUser: {} },
      positionform: {},
      detailposition: [],
      formLabelWidth: "220px",
      maxlength: 50,
      positiondialog: false,
      // 发送职位测评
      emailFormVisible: false,
      emailmodelform: [],
      emailform: { mailContent: "" },
      emailformrules: {
        name: [{ required: true, message: this.$t("valid.inputName"), trigger: "blur" }],
        email: [
          { required: true, message: this.$t("valid.userplaceholder"), trigger: "blur" },
          { type: "email", message:this.$t("valid.valid022"), trigger: "blur" }
        ],
        type: [
          { required: true, message: this.$t("valid.valid010"), trigger: "change" }
        ],
        language: [
          { required: true, message: this.$t("valid.valid011"), trigger: "change" }
        ],
        mailId: [
          { required: true, message: this.$t("valid.valid009"), trigger: "change" }
        ]
      },
      buttonloading: false,
      // 添加模板
      dialogFormVisibleadd: false,
      templetform: {
        tpName: "",
        content: `<p>${this.$t("valid.valid046")}</p>`
      },
      templetformrules: {
        tpName: [{ validator: validatetpName, trigger: "blur" }],
        content: [{ validator: validatecontent, trigger: "blur" }]
      },
      // 下载职位报告
      prpFormVisible: false,
      prplanguage: "cn",
      jobName: "",
      prpbutton: false,
      //添加职位测评结果
      evaResultdialog: false,
      jobsearch: "",
      jobResultsels: [],
      jobData: [],
      //第三部分
      dialogFormVisibleaddper: false,
      personFormVisible: false,
      emailPersonform: { mailContent: "" },
      formrules: {
        name: [{ required: true, message:  this.$t("valid.inputName"), trigger: "blur" }],
        email: [
          { required: true, message:this.$t("valid.userplaceholder"), trigger: "blur" },
          {
            type: "email",
            message: this.$t("valid.valid022"),
            trigger: "blur"
          }
        ],
        contact: [
          {
            message: this.$t("valid.inputlink"),
            trigger: "blur"
          },
          {
            pattern: /^1[3|4|5|7|8|9][0-9]{9}$/,
            message:this.$t("valid.valid040"),
            trigger: "blur"
          }
        ],
        language: [
          { required: true, message: this.$t("valid.valid011"), trigger: "change" }
        ],
        mailId: [
          { required: true, message: this.$t("valid.valid009"), trigger: "change" }
        ]
      },
      //第三部分
      staffsels: [],
      perResultdialog: false,
      personData: [],
      personsearch: "",
      perResultsels: [],
      //下载报告
      downloaoddialog: false,
      reportform: {
        language: "cn"
      },
      Matchbuttonloading: false,
      reportformrules: {
        language: [
          { required: true, message: this.$t("valid.valid011"), trigger: "change" }
        ],
        style: [
          { required: true, message: this.$t("valid.valid050"), trigger: "change" }
        ]
      },
      getpersonloading: false
    };
  },
  created() {
    this.findCompanyEmployee();
    // this.findAppMailTemp();
    // this.getJobEvaluationList();
    // this.getPersonalEvaluationList();
  },
  methods: {
    dataFormat(row, column) {
      // console.log(row);
      return `${row.matching}%`;
    },
    setphonechange(value) {
      this.phonechange(value);
    },
    phonechange(value) {
      // 目的是去掉字符串中除数字之外的其它字符
      if (this.emailPersonform.contact) {
        this.$nextTick(() => {
          this.emailPersonform.contact = value.replace(/[^\d]/g, "");
        });
      }
    },
    //删除职位
    deleteCompanyEmployee() {
      // var ids = this.sels.map(item => item.id).toString();
      let ids = this.$route.query.id;
      this.$confirm(    this.$t("recruitSystem.tip.stafftip1"),
        this.$t("systemManagement.tip.title"),{
        type: "warning"
      })
        .then(() => {
          let para = { ids: ids };
          console.log(ids);
          this.$http
            .post(api.CompanyEmployee.deleteCompanyEmployee(), formatUrl(para))
            .then(
              res => {
                if (res.data.code == "00") {
                  // this.findPersonalListByGroup();
                  this.$router.push({ path: "/manage" });
                  this.$message({
                    type: "success",
                     message: this.$t("msg.msg2")
                  });
                }
                if (res.data.code == "500") {
                  // console.log(res);
                  this.$message({
                    type: "error",
                       message: this.$t("msg.msg14")
                  });
                }
              },
              error => {
                console.log(error);
              }
            );
        })
        .catch(() => {});
    },
    //打开编辑职位
    editposition(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      var para = { id: this.$route.query.id };
      this.$http
        .post(api.CompanyEmployee.findCompanyEmployee(), formatUrl(para))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.positiondialog = true;
              this.editpositionform = res.data.data;
            }
            if (res.data.code == "500") {
              // console.log(res);
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
    //取消编辑职位
    cancelposition(formName) {
      this.positiondialog = false;
    },
    //编辑职位
    updatePosition(formName) {
      var para = {
        id: this.$route.query.id,
        name: this.editpositionform.name,
        department: this.editpositionform.department
      };
      // this.para.id = this.$route.query.id;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post(api.CompanyEmployee.saveCompanyEmployee(), para).then(
            res => {
              if (res.data.code == "00") {
                this.$message({
                  type: "success",
                        message: this.$t("msg.msg6")
                });
                this.positiondialog = false;
                this.findCompanyEmployee();
              }
              if (res.data.code == "500") {
                // console.log(res);
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
    //
    dateFormat(row, column) {
      return mytools.datefilter(row.sendTime);
    },
    //第一部分日期格式
    p1dateFormat(row, column) {
      return mytools.datefilter(row.updateDate);
    },
    statusFormat(row, column) {
     if (row.status == "SENT") {
        return this.$t("news.testNews.sent");
      }
      if (row.status == "COMPLETED") {
        return this.$t("news.testNews.finished");
      }
    },
    sexFormat(row, column) {
  if (row.sex == "1") {
        return this.$t("screenTool.m1");
      } else if (row.sex == "0") {
        return this.$t("screenTool.m2");
      }
    },
    //获取职位详情
    findCompanyEmployee() {
      var para = { id: this.$route.query.id };
      this.$http
        .post(api.CompanyEmployee.findCompanyEmployee(), formatUrl(para))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              console.log(res);
              document.title = `${this.$t("sidebar.staffSystem")}-${res.data.data.name}`;
              this.detailposition = [res.data.data];
              this.jobId = res.data.data.defaultJobId;
              this.positionform = res.data.data;
              if (res.data.data.jobEvaluationList) {
                res.data.data.jobEvaluationList.forEach(function(v, i) {
                  v.isDefault =
                    v.id == res.data.data.defaultJobId ? true : false;
                });
                res.data.data.jobEvaluationList.forEach(el => {
                  if (el.isDefault == true && !el.prpResult) {
                    this.isShowdown = false;
                  } else {
                    this.isShowdown = true;
                  }
                });
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
    check(id, formName) {
      if (id == "添加模板") {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
        this.dialogFormVisibleadd = true;
      } else {
        this.$http.post(api.system.getMailTempById(), formatUrl({ id })).then(
          res => {
            if (res.data.code == "00") {
              // console.log(res)
              this.emailform.mailContent = res.data.data.tpContent;
              // this.emailPersonform.mailContent = res.data.data.tpContent;
            }
            if (res.data.code == "500") {
              this.$message({
                type: "error",
                message: res.data.errMessage
              });
            }
            // console.log(res);
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    checkper(id, formName) {
      if (id == "添加模板") {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
        this.dialogFormVisibleaddper = true;
      } else {
        this.$http.post(api.system.getMailTempById(), formatUrl({ id })).then(
          res => {
            if (res.data.code == "00") {
              // console.log(res)
              // this.emailform.mailContent = res.data.data.tpContent;
              this.emailPersonform.mailContent = res.data.data.tpContent;
            }
            if (res.data.code == "500") {
              this.$message({
                type: "error",
                message: res.data.errMessage
              });
            }
            // console.log(res);
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    //根据权限不同显示不同模板
    findAppMailTemp() {
      this.$http.post(api.mail.findAppMailTemp()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            if (res.data.data.length > 0) {
              this.emailmodelform = res.data.data;
              this.emailform.mailId = this.emailmodelform[0].id;
              this.emailform.mailContent = this.emailmodelform[0].tpContent;
            } else {
              if (this.emailform.mailId == "添加模板") {
                let fields = this.$refs["emailform"].fields;
                // console.log(fields);
                for (let i = 0; i < fields.length; i++) {
                  if (fields[i].prop === "mailId") {
                    fields[i].resetField();
                    break;
                  }
                }
              }
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    findAppMailTempPer() {
      this.$http.post(api.mail.findAppMailTemp()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            if (res.data.data.length > 0) {
              this.emailmodelform = res.data.data;
              this.emailPersonform.mailId = this.emailmodelform[0].id;
              this.emailPersonform.mailContent = this.emailmodelform[0].tpContent;
            } else {
              if (this.emailPersonform.mailId == "添加模板") {
                let fields = this.$refs["emailPersonform"].fields;
                // console.log(fields);
                for (let i = 0; i < fields.length; i++) {
                  if (fields[i].prop === "mailId") {
                    fields[i].resetField();
                    break;
                  }
                }
              }
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    //打开发送职位测评
    sendemail(formName) {
      this.findAppMailTemp();
      this.emailFormVisible = true;
    },
    //取消发送职位测评
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.emailFormVisible = false;
    },
    //关闭职位测评框
    closedialogemail(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    //发送职位测评
    sendJobEvaluation(formName) {
      this.emailform.companyEmployeeId = this.$route.query.id;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.buttonloading = true;
          this.$http
            .post(
              api.CompanyEmployee.sendJobEvaluation(),
              formatUrl(this.emailform)
            )
            .then(
              res => {
                if (res.data.code == "500") {
                  this.$message({
                    type: "err",
                    message: res.data.errMessage
                  });
                  this.buttonloading = false;
                }
                if (res.data.code == "00") {
                  this.buttonloading = false;
                  this.emailFormVisible = false;
                  this.findCompanyEmployee();
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg9")
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
    // 第二部分日期格式
    jbdateformat(row, column) {
      if (row.updateDate) {
        return mytools.datefilter(row.updateDate, "-");
      }
    },
    //取消添加模板
    cancelcreateMailTemp(formName) {
      this.dialogFormVisibleadd = false;
      this.sendemail(formName);
    },
    //添加模板
    createMailTemp(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var Params = {
            tpName: this.templetform.tpName,
            content: this.templetform.content
          };
          this.$http
            .post(api.system.createMailTemp(), formatUrl(Params))
            .then(res => {
              // console.log(res)
              if (res.data.code == "500") {
                this.$message({
                  message: res.data.errMessage,
                  type: "error"
                });
              }
              if (res.data.code == "00") {
                this.dialogFormVisibleadd = false;
                this.findAppMailTemp();
                this.$message({
                  type: "success",
                  message: this.$t("msg.msg19")
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //打开载职位测评
    downloadPrp(v) {
      // console.log(v);
      this.prpFormVisible = true;
      this.prpid = v.row.id;
    },
    //下载职位测评
    downloadPrpsure() {
      this.prpbutton = true;
      let para = {
        ids: this.prpid,
        language: this.prplanguage,
        jobName: this.jobName
      };
      this.$http
        .get(api.prp.exportEvaluationReport(), {
          params: para,
          headers: {
            "Content-Type": "application/pdf;charset =utf-8"
          }
        })
        .then(
          res => {
            this.prpFormVisible = false;
            if (res.data.code == "500") {
              this.$message({
                type: "error",
                message: res.data.errMessage
              });
              this.prpbutton = false;
            } else if (res.data.data == "java.lang.NullPointerException") {
              return this.$message({
                type: "error",
                message:  this.$t("msg.msg20")
              });
              this.prpbutton = false;
            } else {
              window.open(
                api.prp.exportEvaluationReport() + "?" + formatUrl(para),
                Date.now()
              );
              this.prpbutton = false;
              this.prpFormVisible = false;
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    //删除绑定职位测评
    deleteByJobIdAndEmployeeIdId(v) {
      this.$confirm(this.$t("recruitSystem.tip.stafftip2"),
        this.$t("systemManagement.tip.title"), {
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(
              api.CompanyEmployee.deleteByJobIdAndEmployeeIdId(),
              formatUrl({
                jobId: v.row.id,
                employeeId: this.$route.query.id
              })
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  this.findCompanyEmployee();
                  this.$message({
                    type: "success",
                    message:  this.$t("msg.msg2")
                  });
                }
                if (res.data.code == "500") {
                  this.$message({
                    type: "error",
                    message: this.$t("msg.msg14")
                  });
                }
              },
              error => {
                console.log(error);
              }
            );
        })
        .catch(() => {});
    },
    //添加测评结果
    //职位需求测评结果
    openaddevaResult() {
      this.evaResultdialog = true;
      this.getJobEvaluationList();
      this.jobsearch = "";
    },
    jobSelectionChange(sels) {
      this.jobResultsels = sels;
      // console.log(sels);
    },
    //搜索职位测评
    searchJobEvaluationList() {
      this.$http
        .post(
          api.tool.searchJobEvaluationList(),
          formatUrl({ search: this.jobsearch })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              if (this.jobsearch.trim() == "") {
                if (res.data.data.length > 5) {
                  this.jobData = res.data.data.slice(0, 5);
                } else {
                  this.jobData = res.data.data;
                }
              } else {
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

    //获取职位测评
    getJobEvaluationList() {
      this.$http.post(api.tool.getJobEvaluationList()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            if (res.data.data) {
              if (res.data.data.length > 5) {
                this.jobData = res.data.data.slice(0, 5);
              } else {
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
    //绑定职位测评
    bindingJobEvaluation() {
      var jobIds = this.jobResultsels.map(item => item.id).toString();
      this.$http
        .post(
          api.CompanyEmployee.bindingJobEvaluation(),
          formatUrl({ jobIds: jobIds, employeeId: this.$route.query.id })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.findCompanyEmployee();
              this.evaResultdialog = false;
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
    //设置默认
    setJobEvaluationDefault(scope) {
      var para = { id: this.$route.query.id, jobEvaluationId: scope.row.id };
      this.$http
        .post(api.CompanyEmployee.setJobEvaluationDefault(), formatUrl(para))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.$message({
                type: "success",
                message:this.$t("msg.msg30")
              });
              this.findCompanyEmployee();
            }
            if (res.data.code == "500") {
              // console.log(res);
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
    //重新发送测评
    resendEvaluation(v) {
      // console.log(v);
      this.$http
        .post(api.prp.resendEvaluation(), formatUrl({ id: v.row.id }))
        .then(
          res => {
            if (res.data.code == "00") {
              this.$message({
                type: "success",
                message: this.$t("msg.msg22")
              });
              this.findCompanyEmployee();
            }
            if (res.data.code == "500") {
              this.$message({
                type: "error",
                message: res.data.errMessage
              });
            }
            // console.log(res);
          },
          error => {
            console.log(error);
          }
        );
    },
    //职位详情页
    linkprpdetail(v) {
      window.open(
        "./prp.html#/prpdetail?id=" + v.row.id + "&clientId=" + v.row.clientId
      );
    },
    //现有员工打开发送个人测评
    sendPersonemail(formName) {
      this.findAppMailTempPer();
      this.personFormVisible = true;
    },
    //发送测评弹出框关闭
    closedialogemailper(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    //取消测评弹出框
    cancelcreateMailTempper(formName) {
      this.dialogFormVisibleaddper = false;
      this.sendPersonemail(formName);
    },
    //确认测评弹出框
    createMailTempper(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var Params = {
            tpName: this.templetform.tpName,
            content: this.templetform.content
          };
          this.$http
            .post(api.system.createMailTemp(), formatUrl(Params))
            .then(res => {
              // console.log(res)
              if (res.data.code == "500") {
                this.$message({
                  message: res.data.errMessage,
                  type: "error"
                });
              }
              if (res.data.code == "00") {
                this.dialogFormVisibleaddper = false;
                this.findAppMailTempPer();
                this.$message({
                  type: "success",
                  message: this.$t("msg.msg19")
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetFormperson(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.personFormVisible = false;
    },
    //现有员工发送测评
    sendPersonalEvaluation(formName) {
      this.emailPersonform.companyEmployeeId = this.$route.query.id;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              api.CompanyEmployee.sendPersonalEvaluation(),
              formatUrl(this.emailPersonform)
            )
            .then(res => {
              // console.log(res)
              if (res.data.code == "500") {
                this.$message({
                  message: res.data.errMessage,
                  type: "error"
                });
              }
              if (res.data.code == "00") {
                this.personFormVisible = false;
                this.findCompanyEmployee();
                this.$message({
                  type: "success",
                  message: this.$t("msg.msg9")
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    staffselschange(sels) {
      this.staffsels = sels;
    },
    //删除员工列表员工
    deleteByPersonalIdAndEmployeeIdId() {
      var ids = this.staffsels.map(item => item.id).toString();
      this.$confirm(this.$t("recruitSystem.tip.stafftip2"),
        this.$t("systemManagement.tip.title"),{
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(
              api.CompanyEmployee.deleteByPersonalIdAndEmployeeIdId(),
              formatUrl({
                personalIds: ids,
                employeeId: this.$route.query.id
              })
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  this.findCompanyEmployee();
                  // this.staffselschange()
                  this.staffsels = [];
                  console.log(this.staffsels);
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg2")
                  });
                }
                if (res.data.code == "500") {
                  this.$message({
                    type: "error",
                    message: this.$t("msg.msg14")
                  });
                }
              },
              error => {
                console.log(error);
              }
            );
        })
        .catch(() => {});
    },
    openaddperResult() {
      this.perResultdialog = true;
      this.personsearch = "";
      this.getPersonalEvaluationList();
    },
    //获取个人测评
    getPersonalEvaluationList() {
      this.getpersonloading = true;
      this.$http
        .post(
          api.CompanyEmployee.getPersonalEvaluationList(),
          formatUrl({
            employeeId: this.$route.query.id
          })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.getpersonloading = false;
              console.log(res);
              if (res.data.data) {
                if (res.data.data.length > 5) {
                  this.personData = res.data.data.slice(0, 5);
                } else {
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
    tableRowClassName({ row, rowIndex }) {
      if (row.isEmployee == 0) {
        return "";
      }
      return "warning-row";
      // console.log(row);
    },
    isSelect(row, index) {
      if (row.isEmployee == 0) {
        return true;
      }
      return false;
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
                  this.personData = res.data.data.slice(0, 5);
                } else {
                  this.personData = res.data.data;
                }
              } else {
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
    //绑定到员工列表
    bindingPersonalEvaluation() {
      var personalIds = this.perResultsels.map(item => item.id).toString();
      this.$http
        .post(
          api.CompanyEmployee.bindingPersonalEvaluation(),
          formatUrl({
            personalIds: personalIds,
            employeeId: this.$route.query.id
          })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.$message({
                type: "success",
                message: this.$t("msg.msg3")
              });
              this.findCompanyEmployee();
              this.perResultdialog = false;
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
    staffperselschange(sels) {
      this.perResultsels = sels;
    },
    // tip
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      if (column.label == "测评状态") {
        if (row.status == "SENT") {
          return "green-cell";
        } else if (row.status == "COMPLETED") {
          return "blue-cell";
        } else {
          return "";
        }
      }
    },
    openreport(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.downloaoddialog = true;
    },
    canceldownloadIcssure() {
      this.downloaoddialog = false;
    },
    linkdetail(v) {
      window.open(
        `./ics.html#/icsdetail?id=${v.row.id}&clientId${
          v.row.clientId ? "=" + v.row.clientId : ""
        }&talentPoolId${v.row.talentPool ? "=" + v.row.talentPool.id : ""}`
      );
      // window.open("./talent.html#/pooldetail?id=" + v.row.id);
    },
    downloadIcssure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.reportform.style == "person") {
            if (
              this.staffsels.some(
                x =>
                  // x.evaluationStatusShow == "未发送" ||
                  // x.evaluationStatusShow == "" ||
                  // x.evaluationStatusShow == "已发送"
                  x.status != "COMPLETED"
              )
            ) {
              this.$message({
                type: "warning",
                message: this.$t('msg.msg31')
              });
            } else {
              this.Matchbuttonloading = true;
              this.staffsels.forEach(el => {
                let para = { ids: el.id, language: this.reportform.language };
                // // console.log(el);
                // if (el.evaluationStatusShow == "未发送") {
                // } else {
                this.$http
                  .get(api.ics.exportEvaluationReport(), {
                    params: para,
                    headers: {
                      "Content-Type": "application/pdf;charset =utf-8"
                    }
                  })
                  .then(
                    res => {
                      // this.dialogFormVisible6 = false;
                      if (res.data.code == "500") {
                        this.Matchbuttonloading = false;
                        this.$message({
                          type: "error",
                          message: res.data.errMessage
                        });
                      } else if (
                        res.data.data == "java.lang.NullPointerException"
                      ) {
                        this.Matchbuttonloading = false;
                        return this.$message({
                          type: "error",
                          message: this.$t('msg.msg20')
                        });
                      } else {
                        this.Matchbuttonloading = false;
                        window.open(
                          api.ics.exportEvaluationReport() +
                            "?" +
                            formatUrl(para),
                          Date.now()
                        );
                        this.downloaoddialog = false;
                      }
                    },
                    error => {
                      console.log(error);
                    }
                  );
                // }
              });
            }
          } else if (this.reportform.style == "match") {
            if (
              this.staffsels.some(
                x =>
                  // x.evaluationStatusShow == "未发送" ||
                  // x.evaluationStatusShow == "" ||
                  // x.evaluationStatusShow == "已发送"
                  x.status != "COMPLETED"
              )
            ) {
              this.$message({
                type: "warning",
                message:this.$t('msg.msg32')
              });
            } else if (this.isShowdown == false) {
              this.$message({
                tyep: "warning",
                message: this.$t('msg.msg33')
              });
            } else {
              this.Matchbuttonloading = true;
              this.staffsels.forEach(el => {
                let para = {
                  jobId: this.jobId,
                  personalId: el.id,
                  language: this.reportform.language
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
                      if (res.data.code == "500") {
                        this.Matchbuttonloading = false;
                        this.$message({
                          type: "error",
                          message: res.data.errMessage
                        });
                      } else if (
                        res.data.data == "java.lang.NullPointerException"
                      ) {
                        this.Matchbuttonloading = false;
                        return this.$message({
                          type: "error",
                          message: this.$t('msg.msg29')
                        });
                      } else {
                        this.Matchbuttonloading = false;
                        window.open(
                          api.tool.exportMatchReport() + "?" + formatUrl(para),
                          Date.now()
                        );
                        this.downloaoddialog = false;
                      }
                    },
                    error => {
                      console.log(error);
                    }
                  );
              });
            }
          } else {
            this.$message({
              type: "warning",
              message:  this.$t('msg.msg34')
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style>
.downreport .el-select {
  width: 100%;
}

.green-cell {
  color: #249739;
}

.blue-cell {
  color: #00a7b9;
}

.staffdetail {
  padding: 0 3%;
}

.detailtitle {
  height: 70px;
  line-height: 70px;
  z-index: 100;
  font-size: 14px;
  text-align: left;
}

.detailtitle span {
  color: #249739;
}

.main_one {
  background-color: #fff;
  padding: 10px 0 20px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 2px #ccc;
  border-radius: 5px;
  border: 1px solid #fff;
}

.main_topdetailtop {
  margin: 10px 0;
  padding: 0 30px;
}

.main_topdetail {
  overflow: hidden;
  margin: 10px 0;
  padding: 0 30px;
}

.main_leftdetail {
  float: left;
  text-align: left;
}

.main_leftdetail h3 {
  box-sizing: border-box;
  padding-top: 4px;
  height: 40px;
  font: normal 24px "Microsoft YaHei";
  margin: 0;
  color: #212121;
}

.main_leftdetail h3 span:nth-child(2) {
  color: #00a7b9;
}

.main_right {
  float: right;
}

.modelban .el-select {
  width: 100%;
}

.mailmodelcontent .ql-toolbar.ql-snow {
  display: none;
}

.ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-top: 1px solid #ccc !important;
}

.addmailmodel .ql-toolbar.ql-snow {
  padding: 0;
  line-height: 20px;
  text-align: left;
}

.addmailmodel .ql-toolbar.ql-snow .ql-formats {
  margin-right: 0;
}

.addmailmodel .ql-container.ql-snow {
  min-height: 100px;
}

.addmailmodel .ql-image,
.addmailmodel .ql-video {
  display: none !important;
}

.ql-container.ql-snow {
  min-height: 100px;
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
  width: 40%;
  float: left;
}

.maintipword {
  color: #c0c4cc;
}

.warning-row td {
  background: oldlace !important;
}

.resultform .cell {
  text-align: left;
  padding-left: 80px;
  position: relative;
}
.resultform .cell .el-tag--success {
  position: absolute;
  top: 0;
  left: 10px;
}
</style>
