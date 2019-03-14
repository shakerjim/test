<template>
  <div class="positiondetail">
    <!-- 负责人 -->
    <el-dialog width="20%" :visible.sync="saleVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-radio-group v-model="mysellerId">
        <el-radio class="saleperson" v-for="(item) in selectSelleroptions" :key="item.id" :label='item.id'>{{item.name}}</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer tradebutton">

        <el-button @click="cancelsaleVisible" size="small">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="suresaleVisible" size="small">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- 职位修改 -->
    <el-dialog :visible.sync="positiondialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" class="positiondialog">
      <el-form :model="editpositionform" :rules="positionrules" ref="editpositionform" label-position="left">
        <el-form-item :label="$t('staffSystem.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model.trim="editpositionform.name" auto-complete="off" :maxlength="maxlength"></el-input>
        </el-form-item>
        <el-form-item :label="$t('news.positonNews.recruitsNumber')" :label-width="formLabelWidth" class="industry" prop="number">
          <el-input v-model.trim="editpositionform.number" auto-complete="off" :maxlength="maxlength"></el-input>
        </el-form-item>
        <el-form-item :label="$t('news.positonNews.monthSalary')" :label-width="formLabelWidth" prop="monthly">
          <el-input v-model.trim="editpositionform.monthly" auto-complete="off" :maxlength="maxlength"></el-input>
        </el-form-item>
        <el-form-item :label="$t('news.positonNews.yearSalary')" :label-width="formLabelWidth" prop="annual">
          <el-input v-model.trim="editpositionform.annual" auto-complete="off" :maxlength="maxlength"></el-input>
        </el-form-item>
        <el-form-item :label="$t('news.positonNews.scale')" :label-width="formLabelWidth" prop="charge" v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CHARGE')">
          <el-input v-model.trim="editpositionform.charge" auto-complete="off" :maxlength="maxlength">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('news.positonNews.chargePerson')" :label-width="formLabelWidth" class="sale" prop="sellerId" v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')">
          <el-select v-model="editpositionform.sellerId" disabled class="sellerId">
            <el-option :label="item.name" :value="item.id" :key="index" v-for="(item,index) in selectSelleroptions"></el-option>
          </el-select>
          <el-button type="success" @click="opensaleVisible">{{$t('businessSystem.tip.choose')}}</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelposition('editpositionform')">{{$t('btn.back')}}</el-button>
        <el-button type="success" class="green" @click="updatePosition('editpositionform')">{{$t('btn.submit')}}</el-button>
      </div>
    </el-dialog>
    <!-- 状态改变 -->
    <el-dialog :visible.sync="statusdialog" width="20%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <span style="font-size:18px">{{$t('recruitSystem.tip.saleTip1')}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelstatus">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="updateStatus">{{$t('btn.sure')}}</el-button>
      </span>
    </el-dialog>
    <!-- 关闭状态 -->
    <el-dialog :title="$t('talentPool.tip.isClosed')" :visible.sync="closedialog" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="colseruleForm" :rules="colserules" ref="colseruleForm" label-width="160px" class="demo-ruleForm">
        <el-form-item :label="$t('talentPool.tip.closeReason')" prop="reason">
          <el-input v-model.trim="colseruleForm.reason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelclosestatus('colseruleForm')">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="updatecloseStatus('colseruleForm')">{{$t('btn.sure')}}</el-button>
      </span>
    </el-dialog>
    <!-- <div class="detailtitle">Centalent > 职位管理列表页 >
      <span>职位管理详情页</span>
    </div> -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="detailtitle">
      <el-breadcrumb-item>
        <a href="./news.html">Centalent</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manage' }">{{$t('recruitSystem.recruitPage')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('recruitSystem.detail.detailPage')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 第一部分 -->
    <div class="main_one">
      <div class="main_topdetailtop">
        <div class="main_leftdetail">
          <h3>
            <span>{{positionform.name}}</span>-
            <span>{{positionform.companyInfo.name}}</span>
          </h3>

        </div>

        <div class="main_right">
          <el-select v-model="positionform.status" ::placeholder="$t('talentPool.tip.select')" @change="statuschange" :popper-append-to-body="false" popper-class="statusselcet">
            <el-option v-for="item in statusoptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button v-if="needbutton && this.$store.state.Privilege.includes('BUTTON_POSITION_FILTER')" @click="onlyreadFormVisible=true" class="hasneed" type="info">{{$t('recruitSystem.detail.hasNeed')}}</el-button>
          <el-button @click="editposition('editpositionform')" v-if="this.$store.state.Privilege.includes('BUTTON_POSITION_EMENDATION')" class="hasneed" type="info">{{$t('recruitSystem.detail.editInfo')}}</el-button>
        </div>

      </div>

      <el-table :data="detailposition" stripe style="width: 100%">
        <el-table-column prop="name" :label="$t('staffSystem.name')">
        </el-table-column>
        <el-table-column prop="companyInfo.name" :label="$t('news.positonNews.affiliatedEnterprises')" v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_COMPANY')">
        </el-table-column>
        <el-table-column prop="number" :label="$t('news.positonNews.recruitsNumber')">
        </el-table-column>
        <el-table-column prop="monthly" :label="$t('news.positonNews.monthSalary')">
        </el-table-column>
        <el-table-column prop="annual" :label="$t('news.positonNews.yearSalary')">
        </el-table-column>
        <el-table-column prop="charge" :label="$t('news.positonNews.scale')" v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CHARGE')">
        </el-table-column>
        <el-table-column prop="appUser.name" :label="$t('news.positonNews.chargePerson')" v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')">
        </el-table-column>
        <el-table-column prop="candidate" :label="$t('news.positonNews.number')">
        </el-table-column>
        <el-table-column prop="candidateStatus" :label="$t('news.positonNews.latestStatus')" :formatter="posFormat1"  v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CANDIDATE_STATUS')">
        </el-table-column>
        <el-table-column prop="updateDate" :label="$t('news.positonNews.updateTime')" :formatter="eldateFormat">
        </el-table-column>
      </el-table>
    </div>
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
          <el-button @click="openaddevaResult" class="green" type="success">{{$t('recruitSystem.detail.linker')}}
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
          <el-button @click="sendemail('emailform')" class="blue" v-if="this.$store.state.Privilege.includes('BUTTON_POSITION_EVALUATION_SEND')">{{$t('btn.send')}}
            <i class="el-icon-my-weibiaoti40 el-icon--right"></i>
          </el-button>

        </div>
      </div>

      <el-table :data="positionform.jobEvaluationList" stripe style="width: 100%" class="resultform" @row-click='handleRowHandleprp' :default-sort="{prop: 'updateDate', order: 'descending'}">
        <el-table-column prop="name" :label="$t('recruitSystem.tip.name')" class-name="tagcell">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isDefault" type="success">{{$t('recruitSystem.detail.defaultbtn')}}</el-tag>
            <!-- <el-button size="small" type="success" v-if="scope.row.isDefault">默认</el-button> -->
            <el-button type="text" size="medium" @click="linkprpdetail(scope)">{{scope.row.name||$t('login.noname')}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="type" :label="$t('ics.email.type')"  :formatter="jbtypeFormat">
        </el-table-column>
        <el-table-column prop="currentPosts" :label="$t('news.testNews.currentPos')">
        </el-table-column>
        <el-table-column prop="email" :label="$t('ics.email.email')">
        </el-table-column>
        <el-table-column prop="updateDate" :label="$t('news.testNews.finishedTime')" :formatter="jbdateformat">
        </el-table-column>
        <el-table-column :label="$t('saleSystem.tip.Operation')" v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_OPERATION')" min-width='300'>
          <template slot-scope="scope">
            <el-button type="text" @click="downloadPrp(scope)" :disabled="scope.row.status!='COMPLETED'">{{$t('recruitSystem.detail.doreport')}}</el-button>
            <el-button type="text" @click="setJobEvaluationDefault(scope)" :disabled="scope.row.status!='COMPLETED'">{{$t('recruitSystem.detail.setdefault')}}</el-button>
            <el-button size="text" @click="resendEvaluation(scope)" v-if="scope.row.resend">{{$t('btn.b3')}}</el-button>
            <el-button size="text" @click="deleteByJobIdAndPositionId(scope)">{{$t('btn.delete')}}</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <el-dialog :visible.sync="evaResultdialog" class="evaResultdialog" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="prp_top">
          <div class="word" >{{$t('recruitSystem.tip.jobTest')}}</div>
          <el-input v-model.trim="jobsearch" :placeholder="$t('recruitSystem.tip.search')" @keyup.enter.delete.native="searchJobEvaluationList"></el-input>
          <el-button type="success" class="green" @click="searchJobEvaluationList" style="float:left">{{$t('recruitSystem.tip.searchbtn')}}</el-button>
          <el-button type="success" style="float:right" :disabled="this.jobResultsels.length===0" @click="bindingJobEvaluation">{{$t('recruitSystem.tip.addResult')}}</el-button>
        </div>
        <el-table ref="jobTable" :data="jobData" tooltip-effect="dark" style="width: 100%" height="230" stripe class="jobTable" @selection-change="jobSelectionChange">
          <el-table-column type="selection" width="55" prop="id">
          </el-table-column>
          <el-table-column :label="$t('recruitSystem.tip.name')" width="160" prop="name">
          </el-table-column>
          <el-table-column prop="email" :label="$t('ics.email.email')">
          </el-table-column>
          <el-table-column prop="updateDate" :label="$t('screenTool.updateDate')" :formatter="jbdateformat">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!--下载职位报告-->
    <el-dialog :visible.sync="prpFormVisible" width="25%" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form label-width="130px" label-position="left">
        <el-form-item :label="$t('ics.email.lang')">
          <el-select v-model="prplanguage" style="width:100%" :placeholder="$t('ics.tip.selectLang')">
            <el-option :label="$t('ics.email.cn')" value="cn"></el-option>
            <el-option :label="$t('ics.email.en')" value="en"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('ics.email.job')">
          <el-input v-model.trim="jobName" :placeholder="$t('valid.valid049')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="prpFormVisible = false">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="downloadPrpsure" v-loading="prpbutton">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>

    <!--添加模板-->
    <el-dialog :visible.sync="dialogFormVisibleadd" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
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
        <el-button @click="cancelcreateMailTemp('emailform')">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" @click="createMailTemp('templetform')">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!--发送职位测评弹出框-->
    <el-dialog :visible.sync="emailFormVisible" center width="30%" @close="closedialogemail('emailform')" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="emailform" ref="emailform" :rules="emailformrules" status-icon :label-position="labelPosition">
        <el-form-item :label="$t('recruitSystem.tip.name')" :label-width="formLabelWidth" prop="name">
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
            <el-radio label="en">{{$t('ics.email.en')}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="$t('ics.email.model')" :label-width="formLabelWidth" prop="mailId" class="modelban">
          <el-select v-model="emailform.mailId" :placeholder="$t('ics.email.model')" @change="check(emailform.mailId,'templetform')">
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

    <!--第三部分发送个人测评弹出框-->
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
        <el-button @click="cancelcreateMailTempper('emailform')">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" @click="createMailTempper('templetform')">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- 发送测评 -->
    <el-dialog :visible.sync="personFormVisible" center width="30%" @close="closedialogemailper('emailPersonform')" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="emailPersonform" ref="emailPersonform" :rules="formrules" status-icon :label-position="labelPosition">
        <el-form-item :label="$t('ics.email.lang')" :label-width="formLabelWidth" prop="language" class="languageradio">
          <el-radio-group v-model="emailPersonform.language">
            <el-radio label="cn">{{$t('ics.email.cn')}}</el-radio>
            <el-radio label="en">{{$t('ics.email.en')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('ics.email.model')" :label-width="formLabelWidth" prop="mailId" class="modelban">
          <el-select v-model="emailPersonform.mailId" :placeholder="$t('ics.email.model')" @change="checkperson(emailPersonform.mailId,'templetform')">
            <el-option :label='$t("valid.valid043")+(index+1)+"---"+ item.tpName' :value="item.id" v-for="(item,index) in emailmodelform" :key="index"></el-option>
            <el-option :label="$t('systemManagement.email.addmodel')" :value="'添加模板'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="mailContent" class="mailmodelcontent">
          <quill-editor v-model="emailPersonform.mailContent" ref="myQuillEditor" class="editer" disabled>
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" class="green" @click="sendPersonalEvaluation('emailPersonform')" :loading="buttonloading">{{$t('btn.suresend')}}</el-button>
        <el-button @click="resetFormperson('emailPersonform')">{{$t('btn.cancel')}}</el-button>

      </div>
    </el-dialog>

    <el-dialog :visible.sync="statusdialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="statusForm" ref="statusForm">
        <el-input type="textarea" :autosize="{ minRows: 3}" :placeholder="$t('valid.valid058')" v-model="statusForm.reason">
        </el-input>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelstatusdialogFormVisible('statusForm')">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="saveHistoryStatus">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- 第三部分 -->
    <div class="main_one">
      <div class="main_topdetail">
        <div class="main_leftdetail">
          <h3>
            <span>{{$t('recruitSystem.detail.recomList')}}</span>
          </h3>
        </div>

        <div class="main_right">
          <el-dropdown @command="handleCommand" v-if="this.$store.state.Privilege.includes('BUTTON_POSITION_CANDIDATE_EMENDATION')">
            <el-button type="success green">
            {{$t('recruitSystem.detail.add')}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="screenFormVisible">{{$t('recruitSystem.detail.formTalent')}}</el-dropdown-item>
              <el-dropdown-item command="personnelFormVisible">{{$t('recruitSystem.detail.handinput')}}</el-dropdown-item>
              <el-dropdown-item command="needFormVisible" v-if="this.$store.state.Privilege.includes('BUTTON_POSITION_CANDIDATE_RELEASE_FILTER')">{{$t('recruitSystem.detail.email')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button @click="opendeldialog('delruleForm')" :disabled="this.positionsels.length==0" v-if="this.$store.state.Privilege.includes('BUTTON_POSITION_CANDIDATE_EMENDATION')" class="hasneed" type='warning'>{{$t('recruitSystem.detail.delete')}}
            <i class="el-icon-close el-icon--right"></i>
          </el-button>
          <el-button @click="sendPersonemail('emailPersonform')" :disabled="this.positionsels.length===0" v-if="this.$store.state.Privilege.includes('BUTTON_POSITION_CANDIDATE_EVALUATION_SEND')" class="blue" type="primary">{{$t('btn.send')}}
            <i class="el-icon-my-weibiaoti40 el-icon--right"></i>
          </el-button>
          <el-button :disabled="this.positionsels.length==0" @click="exportPoolById" :loading="downresume" v-if="this.$store.state.Privilege.includes('BUTTON_POSITION_CANDIDATE_RESUME_DOWNLOAD')" type='info'>{{$t('btn.b6')}}
            <i class="el-icon-my-xiazai1 el-icon--right"></i>
          </el-button>
          <el-button @click="downloadIcs" :disabled="this.positionsels.length==0" v-if="this.$store.state.Privilege.includes('BUTTON_POSITION_CANDIDATE_EVALUATION_DOWNLOAD')" type='info'>{{$t('recruitSystem.detail.doreport')}}
            <i class="el-icon-my-xiazai1 el-icon--right"></i>
          </el-button>

        </div>
      </div>

      <el-table :data="positionform.talentPoolList" size="small" stripe style="width: 100%" @row-click='handleRowHandle' @selection-change="positionselschange" :cell-class-name="tableCellClassName" class="recomtable">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="name" :label="$t('recruitSystem.tip.name')" width="140" sortable>
          <template slot-scope="scope">
            <span @click="linkdetail(scope)" style="color:#249739;cursor:pointer">{{scope.row.name||$t('login.noname')}}</span>
            <!-- <el-button type="text" size="small" @click="linkdetail(scope)">{{scope.row.name}}</el-button> -->
          </template>
        </el-table-column>
        <el-table-column prop="matching" :label="$t('news.positonNews.match')" :formatter="dataFormat" sortable>
        </el-table-column>
        <el-table-column prop="company" :label="$t('news.positonNews.company')" sortable>
        </el-table-column>
        <el-table-column prop="trade" :label="$t('news.positonNews.trade')" sortable v-if="!paralang">
        </el-table-column>
        <el-table-column prop="residence" :label="$t('news.positonNews.city')" sortable v-if="!paralang">
        </el-table-column>
        <el-table-column prop="tradeEn" :label="$t('news.positonNews.trade')" sortable v-if="paralang">
        </el-table-column>
        <el-table-column prop="residenceEn" :label="$t('news.positonNews.city')" sortable v-if="paralang">
        </el-table-column>
        <el-table-column prop="hopeSalary" :label="$t('news.positonNews.hopeSalary')" sortable :sort-by="'hopemoney'">
        </el-table-column>
        <el-table-column prop="age" :label="$t('news.positonNews.age')" sortable>
        </el-table-column>
        <el-table-column prop="degree" :label="$t('news.positonNews.higheducation')" sortable :sort-by="'degreesort'" :formatter="degreeFormat">
        </el-table-column>
        <el-table-column prop="experience" :label="$t('talentPool.tip.tab02')" sortable :sort-by="'experienceID'">
        </el-table-column>
        <el-table-column prop="evaluationStatusShow" :label="$t('news.positonNews.ics')"  sortable :sort-by="'evaluationStatusShowID'">
        </el-table-column>
        <el-table-column prop="status" :label="$t('news.positonNews.newStatus')" width="160"   :filters="[{text: $t('ststus.positionStatus.n6'), value: '已入职'}, {text:  $t('ststus.positionStatus.n5'), value: '面试完成'}, {text: $t('ststus.positionStatus.n4'), value: '待面试'}, {text: $t('ststus.positionStatus.n3'), value: '已联系-没兴趣'},{text: $t('ststus.positionStatus.n2'), value: '已联系-有兴趣'}]" :filter-method="filterHandler" sortable>
          <template slot-scope="scope">
            <el-select :popper-append-to-body="false" v-model="scope.row.status" @change="positionstatuschange(scope)" class="newestselect" size="small">
              <el-option :label="item.name" :value="item.value" v-for="(item,index) in optionsStatus" :key="index"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="updateTimeShow" :label="$t('news.positonNews.updateTime')" sortable :sort-by="'updateTime'">
        </el-table-column>
        <el-table-column :label="$t('news.positonNews.remark')" v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CANDIDATE_REMARK')">
          <template slot-scope="scope">
            <el-button size="small" @click="openfindByTalentIdTalentHistoryStatus(scope)">{{$t('saleSystem.remarks')}}</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 删除候选人 -->
    <el-dialog :title="$t('msg.msg46')" :visible.sync="deldialog" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="delruleForm" :rules="delrules" ref="delruleForm" label-width="170px" class="demo-ruleForm">
        <el-form-item :label="$t('msg.msg47')" prop="reason">
          <el-input type="textarea" :placeholder="$t('saleSystem.tip.changeContent')" v-model.trim="delruleForm.reason" :autosize="{ minRows: 3}">
          </el-input>

        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="canceldeldialog('delruleForm')">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="deleteCandidates('delruleForm')">{{$t('btn.sure')}}</el-button>
      </span>
    </el-dialog>
    <!-- 下载报告 -->
    <el-dialog :visible.sync="downloaoddialog" width="30%" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="reportform" :label-position="labelPosition" class="downreport" ref="reportform" :rules="reportformrules">
        <el-form-item :label="$t('ics.email.lang')" :label-width="formLabelWidth">
          <el-select v-model="reportform.language" :placeholder="$t('recruitSystem.tip.selectLang')">
            <el-option :label="$t('ics.email.cn')" value="cn"></el-option>
            <el-option :label="$t('ics.email.en')"  value="en"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :placeholder="$t('recruitSystem.tip.reportType')" :label-width="formLabelWidth" :label="$t('recruitSystem.tip.reportType')">
          <el-select v-model="reportform.style" :placeholder="$t('recruitSystem.tip.selectType')">
            <el-option :placeholder="$t('recruitSystem.tip.perreport')" value="person"></el-option>
            <el-option :placeholder="$t('recruitSystem.tip.matreport')" value="match"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="downloaoddialog = false">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="downloadIcssure('reportform')" :loading="Matchbuttonloading">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- 备注 -->
    <el-dialog :visible.sync="remarkdialog" width="55%" class="remarkdialog" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="remarkbox">
        <div class="statusTop">
          <el-form label-width="160px" :model="remarkruleForm" :rules="remarkrules" ref="remarkruleForm">
            <el-form-item :label="$t('saleSystem.tip.remark')" prop="reason">
              <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c1')" v-model.trim="remarkruleForm.reason">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button type="success" round class="sure" @click="onlysave('remarkruleForm')">{{$t('btn.sure')}}</el-button>
      </div>
      <el-table :data="historystatusData" stripe style="width: 100%">
        <el-table-column prop="userName" :label="$t('saleSystem.tip.editpeople')" width="180">
        </el-table-column>
        <el-table-column prop="updateTime" :label="$t('saleSystem.tip.editTime')" width="180" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="type" :label="$t('saleSystem.tip.editType')" width="180" :formatter="typeFormat">
        </el-table-column>
        <el-table-column :label="$t('saleSystem.tip.editContent')">
          <template slot-scope="scope">
            <div v-html="$t('btn.b1')+':'+reFormat(scope.row.changed)+'<br>'+$t('saleSystem.tip.remark')+':'+scope.row.reason" style="text-align: left;" v-if="scope.row.type==1"></div>
            <div v-html="$t('saleSystem.tip.remark')+':'+scope.row.reason" style="text-align: left;" v-else></div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('saleSystem.tip.Operation')">
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="deleteHistoryStatus(scope)">{{$t('btn.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 从人才库 -->

    <el-dialog width="50%" :visible.sync="hotVisible" class="provincedialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <div class="surebutton">
        <el-button @click="canceldynamicTags">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="suredynamicTags">{{$t('btn.sure')}}</el-button>
      </div>

      <div class="residencetitle">{{$t('talentPool.tip.selectedcity')}}
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag>

      </div>
      <div class="residencetitle">{{$t('talentPool.tip.hotcity')}}</div>
      <el-popover v-for="(item,index) in hotCity" :key="index" class="hotcityLi" placement="right-end" trigger="click">
        <el-button slot="reference" @click="findAreaByCityIdhot3(item)">{{item|EncityName}}</el-button>
        <el-button @click="showInput(paralang?item.cityNameEn:item.cityName,paralang?item.cityNameEn:item.cityName,cc)" class="button-new-tag" size="mini">{{item|EncityName}}</el-button>
        <el-button v-for="(x,y) in areaDatahot3" :key="y" class="button-new-tag" size="mini" @click="showInput(paralang?item.cityNameEn:item.cityName,paralang?x.areaNameEn:x.areaName)">{{x|EnareaName}}</el-button>
      </el-popover>

      <div class="residencetitle">{{$t('talentPool.tip.allp')}}</div>

      <ul class="provinceList">
        <li v-for="(item,index) in allProvince" :key="index" @click="findCityByProvinceId3(item)">{{item|EnprovinceName}}</li>
      </ul>
      <div class="provinceListChild">
        <el-popover v-for="(item) in cityData" :key="item.cityName" class="hotcityLi" placement="right-end" trigger="click">
          <el-button slot="reference" @click="findAreaByCityId3(item)">{{item|EncityName}}</el-button>
          <el-button @click="showInput(paralang?item.cityNameEn:item.cityName,paralang?item.cityNameEn:item.cityName,cc)" class="button-new-tag" size="mini">{{item|EncityName}}</el-button>
          <el-button v-for="(x,y) in areaData3" :key="y" class="button-new-tag" size="mini" @click="showInput(paralang?item.cityNameEn:item.cityName,paralang?x.areaNameEn:x.areaName)">{{x|EnareaName}}</el-button>
        </el-popover>
      </div>


    </el-dialog>

    <!-- 行业 -->
    <el-dialog width="50%" :visible.sync="screentradeVisible" class="tradedialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <div class="surebutton">
        <el-button @click="cancelscreenarrchange">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="screenarrchange">{{$t('btn.sure')}}</el-button>
      </div>
      <div class="residencetitle">{{$t('talentPool.tip.selecttrade')}}
        <el-tag :key="tag" v-for="tag in screendynamicTagstrade" closable :disable-transitions="false" @close="screentradehandleClose(tag)">
          {{tag}}
        </el-tag>
      </div>
      <ul class="residenceul">
        <li v-for="(item,index) in tradeList" :key="index" class="tradeList">
          <div class="tradebig">{{item|EntradeName}}</div>
          <div class="tradesmall">
            <el-button v-for="(v,i) in item.appTrades" :label="paralang?v.tradeNameEn:v.tradeName" class="button-new-tag" size="mini" :key="i" @click="showInputscreentrade(paralang?v.tradeNameEn:v.tradeName)">{{v|EntradeName}}</el-button>
          </div>
        </li>
      </ul>
    </el-dialog>

    <!-- 职能 -->
    <el-dialog width="50%" :visible.sync="screenjobVisible" class="tradedialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <div class="surebutton">
        <el-button @click="cancelscreenjobarrchange">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="screenjobarrchange">{{$t('btn.sure')}}</el-button>
      </div>
      <div class="residencetitle">{{$t('talentPool.tip.selectjob')}}
        <el-tag :key="tag" v-for="tag in screendynamicTagsjob" closable :disable-transitions="false" @close="screenjobhandleClose(tag)">
          {{tag}}
        </el-tag>
      </div>
      <ul class="residenceul">
        <li v-for="(item,index) in jobList" :key="index" class="tradeList">
          <div class="tradebig">{{item|EnjobName}}</div>
          <div class="jobbig">
            <el-popover v-for="(v,i) in item.appJobs" :key="i" class="jobLi" placement="right-end" trigger="click">
              <el-button slot="reference">{{v|EnjobName}}</el-button>
              <el-button :label="paralang?v.jobNameEn:v.jobName" class="button-new-tag" size="mini" @click="showInputscreenjob(paralang?v.jobNameEn:v.jobName)">{{v|EnjobName}}</el-button>
              <el-button v-for="(x,y) in v.appJobs" :label="paralang?x.jobNameEn:x.jobName" :key="y" class="button-new-tag" size="mini" @click="showInputscreenjob(paralang?x.jobNameEn:x.jobName)">{{x|EnjobName}}</el-button>
            </el-popover>
          </div>
        </li>
      </ul>
    </el-dialog>

    <!--筛选弹出框-->
    <el-dialog :visible.sync="screenFormVisible" width="50%" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-tabs :tab-position="tabPosition" style="height: 600px;" type="border-card">
        <el-tab-pane :label="$t('recruitSystem.screen.infoScreen')">
          <el-form :model="positionscreenForm">
            <el-form-item :label="$t('talentPool.tip.keyword')" :label-width="formLabelWidth">
              <el-input v-model="positionscreenForm.keyword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.residence')" :label-width="formLabelWidth">
              <div @click="hotVisible=true">
                <el-input v-model="positionscreenForm.residence" auto-complete="off" :readonly="true">
                  <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                </el-input>
              </div>

            </el-form-item>
            <el-form-item :label="$t('recruitSystem.screen.job')" :label-width="formLabelWidth">
              <div @click="screenjobVisible=true">
                <el-input v-model="positionscreenForm.job" auto-complete="off" :readonly="true">
                  <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                </el-input>
              </div>

            </el-form-item>
            <el-form-item :label="$t('news.positonNews.trade')" :label-width="formLabelWidth">
              <div @click="screentradeVisible=true">
                <el-input v-model="positionscreenForm.trade" auto-complete="off" :readonly="true">
                  <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                </el-input>

              </div>

            </el-form-item>
            <el-form-item :label="$t('recruitSystem.screen.experience')" :label-width="formLabelWidth" class="work">
              <el-input v-model="positionscreenForm.expericenceFrom" auto-complete="off">
              </el-input>
              <div class="line"></div>
              <el-input v-model="positionscreenForm.expericenceTo" auto-complete="off">
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('recruitSystem.screen.education')" :label-width="formLabelWidth" class="education">
              <el-select clearable :placeholder="$t('talentPool.tip.select')" v-model="positionscreenForm.degreeFrom">
                <el-option :label="$t('recruitSystem.screen.nogeander')" value="">
                </el-option>
                <el-option v-for="item in screenoptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <div class="line"></div>
              <el-select clearable :placeholder="$t('talentPool.tip.select')" v-model="positionscreenForm.degreeTo">
                <el-option :label="$t('recruitSystem.screen.nogeander')" value="">
                </el-option>
                <el-option v-for="item in screenoptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('news.positonNews.age')" :label-width="formLabelWidth" class="age">
              <el-input v-model="positionscreenForm.ageFrom" auto-complete="off">
              </el-input>
              <div class="line"></div>
              <el-input v-model="positionscreenForm.ageTo" auto-complete="off">
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('recruitSystem.screen.gender')" :label-width="formLabelWidth" class="sex">
              <el-radio-group v-model="positionscreenForm.sex">
                <el-radio :label="''">{{$t('talentPool.tip.unlimited')}}</el-radio>
                <el-radio :label="'男'">{{$t('talentPool.tip.man')}}</el-radio>
                <el-radio :label="'女'">{{$t('talentPool.tip.woman')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('news.positonNews.hopeSalary')" :label-width="formLabelWidth" class="money">
              <el-input v-model="positionscreenForm.hopeSalaryFrom" auto-complete="off">
                <template slot="append">{{$t('recruitSystem.screen.price')}}</template>
              </el-input>
              <div class="line"></div>
              <el-input v-model="positionscreenForm.hopeSalaryTo" auto-complete="off">
                <template slot="append">{{$t('recruitSystem.screen.price')}}</template>
              </el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('recruitSystem.screen.testScreen')" v-if="this.$store.state.Privilege.includes('TAB_POSITION_CANDIDATE_ADDDB_EVALUATION')">
          <!--HE-->
          <div class="firsttest">{{$t('recruitSystem.screen.HEtest')}}:</div>
          <el-form :model="positionscreenForm" label-width="300px" class="test">
            <el-form-item  :label="$t('recruitSystem.screen.ics01')+' >='">
              <el-input v-model="positionscreenForm.ab1"></el-input>
            </el-form-item>
            <el-form-item  :label="$t('recruitSystem.screen.ics02')+' >='">
              <el-input v-model="positionscreenForm.ab2"></el-input>
            </el-form-item>
            <el-form-item  :label="$t('recruitSystem.screen.ics03')+' >='">
              <el-input v-model="positionscreenForm.ab3"></el-input>
            </el-form-item>
            <el-form-item  :label="$t('recruitSystem.screen.ics04')+' >='">
              <el-input v-model="positionscreenForm.ab4"></el-input>
            </el-form-item>
            <el-form-item  :label="$t('recruitSystem.screen.ics05')+' >='">
              <el-input v-model="positionscreenForm.ab5"></el-input>
            </el-form-item>
            <el-form-item :label="$t('recruitSystem.screen.ics06')+' >='">
              <el-input v-model="positionscreenForm.ab6"></el-input>
            </el-form-item>
            <el-form-item  :label="$t('recruitSystem.screen.ics07')+' >='">
              <el-input v-model="positionscreenForm.ab7"></el-input>
            </el-form-item>
            <el-form-item  :label="$t('recruitSystem.screen.ics08')+' >='">
              <el-input v-model="positionscreenForm.ab8"></el-input>
            </el-form-item>
            <el-form-item :label="$t('recruitSystem.screen.ics09')+' >='">
              <el-input v-model="positionscreenForm.ab9"></el-input>
            </el-form-item>
            <el-form-item :label="$t('recruitSystem.screen.ics10')+' >='">
              <el-input v-model="positionscreenForm.ab10"></el-input>
            </el-form-item>

          </el-form>
        </el-tab-pane>

      </el-tabs>
      
      <!-- 加入候选人列表 -->
      <el-dialog :visible.sync="CandidateVisible" append-to-body width="80%" @close='closeDialog' :close-on-click-modal="false" :close-on-press-escape="false">
        <el-button type="success" style="margin-bottom:20px" @click="addFromData">{{$t('recruitSystem.tip.addList')}}</el-button>
        <el-table :data="CandidateData.content" stripe style="width: 100%" @row-click='handleRowHandle' height="500" @selection-change="Candidatechange" :row-class-name="tableRowClassName" id="Candidatetable" :cell-class-name="tableCellClassName" v-loading="scrollLoading"  :element-loading-text="$t('businessSystem.loading')"           :empty-text="$t('recruitSystem.screen.nodata')">
          <el-table-column type="selection" width="55" prop="id" :selectable="isSelect">
          </el-table-column>
          <el-table-column prop="name" :label="$t('recruitSystem.tip.name')">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="linkdetail(scope)">{{scope.row.name||$t('login.noname')}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="matching" :label="$t('news.positonNews.match')" :formatter="dataFormat">
          </el-table-column>
          <el-table-column prop="company" :label="$t('news.positonNews.company')">
          </el-table-column>
          <el-table-column prop="trade" :label="$t('news.positonNews.trade')" v-if="!paralang">
          </el-table-column>
          <el-table-column prop="residence" :label="$t('news.positonNews.city')" v-if="!paralang">
          </el-table-column>
          <el-table-column prop="tradeEn" :label="$t('news.positonNews.trade')" v-if="paralang">
          </el-table-column>
          <el-table-column prop="residenceEn" :label="$t('news.positonNews.city')" v-if="paralang">
          </el-table-column>
          <el-table-column prop="hopeSalary" :label="$t('news.positonNews.hopeSalary')">
          </el-table-column>
          <el-table-column prop="age" :label="$t('news.positonNews.age')">
          </el-table-column>
          <el-table-column prop="degree" :label="$t('news.positonNews.higheducation')">
          </el-table-column>
          <el-table-column prop="experience" :label="$t('talentPool.tip.tab02')">
          </el-table-column>
          <el-table-column prop="evaluationStatusShow" :label="$t('news.positonNews.ics')">
          </el-table-column>
          <el-table-column prop="status" :label="$t('news.positonNews.newStatus')" :formatter="posFormat1">
          </el-table-column>
          <el-table-column prop="updateTimeShow" :label="$t('news.positonNews.updateTime')">
          </el-table-column>
          <el-table-column prop="historyStatus" :label="$t('news.positonNews.remark')">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left" width="820">
                <el-table :data="scope.row.historyStatus" stripe style="width: 100%" max-height="250">
                  <el-table-column prop="userName" :label="$t('saleSystem.tip.editpeople')" width="180">
                  </el-table-column>
                  <el-table-column prop="updateTime" :label="$t('saleSystem.tip.editTime')" width="180" :formatter="teldateFormat">
                  </el-table-column>
                  <el-table-column prop="type" :label="$t('saleSystem.tip.editType')" width="180" :formatter="typeFormat">
                  </el-table-column>
                  <el-table-column :label="$t('saleSystem.tip.editContent')" width="280">
                    <template slot-scope="scope">
                      <div v-html="$t('btn.b1')+':'+reFormat(scope.row.changed)+'<br>'+$t('saleSystem.tip.remark')+':'+scope.row.reason" style="text-align: left;" v-if="scope.row.type=='1'"></div>
                      <div v-html="$t('saleSystem.tip.remark')+':'+scope.row.reason" style="text-align: left;" v-else></div>
                    </template>
                  </el-table-column>
                </el-table>
                <div slot="reference" class="name-wrapper">
                  <el-tag>{{$t('saleSystem.remarks')}}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="CandidateData.number+1" :page-size="CandidateData.size" layout="total, sizes, prev, pager, next,jumper" :total="CandidateData.totalElements">
          </el-pagination>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" class="green" @click="searchFromData">{{$t('recruitSystem.screen.screening')}}</el-button>
        <el-button @click="screenFormVisible = false">{{$t('btn.cancel')}}</el-button>

      </div>
    </el-dialog>

    <!-- 手动输入 -->

    <el-dialog :visible.sync="personnelFormVisible" class="mytalent" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <!-- 居住地 -->
      <el-dialog width="50%" :visible.sync="innerVisible" append-to-body class="provincedialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <div class="surebutton">
          <el-button @click="canceldynamicTagsres">{{$t('btn.cancel')}}</el-button>
          <el-button type="success" class="green" @click="suredynamicTagsres">{{$t('btn.sure')}}</el-button>
        </div>

        <div class="residencetitle">{{$t('talentPool.tip.onlyone')}}
          <el-tag :key="tag" v-for="tag in dynamicTagsres" closable :disable-transitions="false" @close="handleCloseres(tag)">
            {{tag}}
          </el-tag>

        </div>
        <div class="residencetitle">{{$t('talentPool.tip.hotcity')}}</div>
        <el-popover v-for="(item,index) in hotCity" :key="index" class="hotcityLi" placement="right-end" trigger="click">
          <el-button slot="reference" @click="findAreaByCityIdhot(item)">{{item|EncityName}}</el-button>
          <el-button @click="showInputres(paralang?item.cityNameEn:item.cityName,paralang?item.cityNameEn:item.cityName,cc)" class="button-new-tag" size="mini">{{item|EncityName}}</el-button>
          <el-button v-for="(x,y) in areaDatahot" :key="y" class="button-new-tag" size="mini" @click="showInputres(paralang?item.cityNameEn:item.cityName,paralang?x.areaNameEn:x.areaName)">{{x|EnareaName}}</el-button>
        </el-popover>

        <div class="residencetitle">{{$t('talentPool.tip.allp')}}</div>

        <ul class="provinceList">
          <li v-for="(item,index) in allProvince" :key="index" @click="findCityByProvinceId(item)">{{item|EnprovinceName}}</li>
        </ul>
        <div class="provinceListChild">
          <el-popover v-for="(item) in cityData" :key="item.cityName" class="hotcityLi" placement="right-end" trigger="click">
            <el-button slot="reference" @click="findAreaByCityId(item)">{{item|EncityName}}</el-button>
            <el-button @click="showInputres(paralang?item.cityNameEn:item.cityName,paralang?item.cityNameEn:item.cityName,cc)" class="button-new-tag" size="mini">{{item|EncityName}}</el-button>
            <el-button v-for="(x,y) in areaData" :key="y" class="button-new-tag" size="mini" @click="showInputres(paralang?item.cityNameEn:item.cityName,paralang?x.areaNameEn:x.areaName)">{{x|EnareaName}}</el-button>
          </el-popover>
        </div>

      </el-dialog>

      <!-- 国籍 -->
      <el-dialog width="50%" :visible.sync="householdVisible" append-to-body class="provincedialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <div class="surebutton">
          <el-button @click="canceldynamicTagshos">{{$t('btn.cancel')}}</el-button>
          <el-button type="success" class="green" @click="suredynamicTagshos">{{$t('btn.sure')}}</el-button>
        </div>

        <div class="residencetitle">{{$t('talentPool.tip.onlyone')}}
          <el-tag :key="tag" v-for="tag in dynamicTagshos" closable :disable-transitions="false" @close="handleClosehos(tag)">
            {{tag}}
          </el-tag>

        </div>
        <div class="residencetitle">{{$t('talentPool.tip.hotcity')}}</div>
        <el-popover v-for="(item,index) in hotCity" :key="index" class="hotcityLi" placement="right-end" trigger="click">
          <el-button slot="reference" @click="findAreaByCityIdhot(item)">{{item|EncityName}}</el-button>
          <el-button @click="showInputhos(paralang?item.cityNameEn:item.cityName,paralang?item.cityNameEn:item.cityName,cc)" class="button-new-tag" size="mini">{{item|EncityName}}</el-button>
          <el-button v-for="(x,y) in areaDatahot" :key="y" class="button-new-tag" size="mini" @click="showInputhos(paralang?item.cityNameEn:item.cityName,paralang?x.areaNameEn:x.areaName)">{{x|EnareaName}}</el-button>
        </el-popover>

        <div class="residencetitle">{{$t('talentPool.tip.allp')}}</div>

        <ul class="provinceList">
          <li v-for="(item,index) in allProvince" :key="index" @click="findCityByProvinceId(item)">{{item|EnprovinceName}}</li>
        </ul>
        <div class="provinceListChild">
          <el-popover v-for="(item) in cityData" :key="item.cityName" class="hotcityLi" placement="right-end" trigger="click">
            <el-button slot="reference" @click="findAreaByCityId(item)">{{item|EncityName}}</el-button>
            <el-button @click="showInputhos(paralang?item.cityNameEn:item.cityName,paralang?item.cityNameEn:item.cityName,cc)" class="button-new-tag" size="mini">{{item|EncityName}}</el-button>
            <el-button v-for="(x,y) in areaData" :key="y" class="button-new-tag" size="mini" @click="showInputhos(paralang?item.cityNameEn:item.cityName,paralang?x.areaNameEn:x.areaName)">{{x|EnareaName}}</el-button>
          </el-popover>
        </div>

      </el-dialog>

      <!-- 行业 -->
      <el-dialog width="50%" :visible.sync="tradeVisible" append-to-body class="tradedialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <div class="surebutton">
          <el-button @click="cancelarrchange">{{$t('btn.cancel')}}</el-button>
          <el-button type="success" class="green" @click="arrchange">{{$t('btn.sure')}}</el-button>
        </div>
        <div class="residencetitle">{{$t('talentPool.tip.selecttrade')}}
          <el-tag :key="tag" v-for="tag in dynamicTagstrade" closable :disable-transitions="false" @close="tradehandleClose(tag)">
            {{tag}}
          </el-tag>
        </div>
        <ul class="residenceul">
          <li v-for="(item,index) in tradeList" :key="index" class="tradeList">
            <div class="tradebig">{{item|EntradeName}}</div>
            <div class="tradesmall">
              <el-button v-for="(v,i) in item.appTrades" :label="paralang?v.tradeNameEn:v.tradeName" :key="i" class="button-new-tag" size="mini" @click="showInputtrade(paralang?v.tradeNameEn:v.tradeName)">{{v|EntradeName}}</el-button>
            </div>
          </li>
        </ul>
      </el-dialog>

      <!-- 职能 -->
      <el-dialog width="50%" :visible.sync="jobVisible" append-to-body class="tradedialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <div class="surebutton">
          <el-button @click="canceljobarrchange">{{$t('btn.cancel')}}</el-button>
          <el-button type="success" class="green" @click="jobarrchange">{{$t('btn.sure')}}</el-button>
        </div>
        <div class="residencetitle">{{$t('talentPool.tip.selectjob')}}
          <el-tag :key="tag" v-for="tag in dynamicTagsjob" closable :disable-transitions="false" @close="jobhandleClose(tag)">
            {{tag}}
          </el-tag>
        </div>
        <ul class="residenceul">
          <li v-for="(item,index) in jobList" :key="index" class="tradeList">
            <div class="tradebig">{{item|EnjobName}}</div>
            <div class="jobbig">
              <el-popover v-for="(v,i) in item.appJobs" :key="i" class="jobLi" placement="right-end" trigger="click">
                <el-button slot="reference">{{v|EnjobName}}</el-button>
                <el-button :label="paralang?v.jobNameEn:v.jobName" class="button-new-tag" size="mini" @click="showInputjob(paralang?v.jobNameEn:v.jobName)">{{v|EnjobName}}</el-button>
                <el-button v-for="(x,y) in v.appJobs" :label="paralang?x.jobNameEn:x.jobName" :key="y" class="button-new-tag" size="mini" @click="showInputjob(paralang?x.jobNameEn:x.jobName)">{{x|EnjobName}}</el-button>
              </el-popover>
            </div>
          </li>
        </ul>
      </el-dialog>

      <el-tabs type="border-card">
        <el-tab-pane :label="$t('talentPool.tip.tab01')">
          <el-form :model="baseinfoForm" class="baseinfo" label-width="160px">
            <el-form-item :label="$t('recruitSystem.tip.name')" style="float: left">
              <el-input v-model.trim="baseinfoForm.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.birth')" style="float: left" class="birthday">
              <div class="block">
                <el-date-picker :editable="false" v-model.trim="baseinfoForm.birthday" type="date" :placeholder="$t('talentPool.tip.chooseDate')" format="yyyy年MM月dd日" value-format="yyyy年MM月dd日">
                </el-date-picker>
              </div>
              <el-select v-model.trim="baseinfoForm.birthTime" :placeholder="$t('talentPool.tip.choosebirth')">
                <el-option :label="$t('screenTool.cnotsure')" :value="'null'"></el-option>
                <el-option :label="item" :value="item" v-for="(item,index) in timeArr" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('recruitSystem.screen.gender')" style="float: left">
              <el-radio-group v-model.trim="baseinfoForm.sex">
                <el-radio :label="'不限'">{{$t('talentPool.tip.unlimited')}}</el-radio>
                <el-radio :label="'男'">{{$t('talentPool.tip.man')}}</el-radio>
                <el-radio :label="'女'">{{$t('talentPool.tip.woman')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.Marriage')" style="float: left">
              <el-radio-group v-model.trim="baseinfoForm.isMary">
                <el-radio :label="true">{{$t('talentPool.tip.married')}}</el-radio>
                <el-radio :label="false">{{$t('talentPool.tip.unmarried')}}</el-radio>
                <el-radio :label="null">{{$t('talentPool.tip.unknown')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.phone')" style="float: left">
              <el-input v-model.trim="baseinfoForm.phone" :blur="setphonechange(baseinfoForm.phone)" v-on:change="phonechange"></el-input>
            </el-form-item>
            <el-form-item :label="$t('ics.email.email')" style="float: left">
              <el-input v-model.trim="baseinfoForm.mail"></el-input>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.nationality')" style="float: left">
              <div @click="householdModalShow">
                <el-input v-model.trim="baseinfoForm.household" :readonly="true">
                  <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.residence')" style="float: left">
              <div @click="locationModalShow">
                <el-input v-model.trim="baseinfoForm.residence" :readonly="true">
                  <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.tab02')" style="float: left">
              <el-input v-model.trim="baseinfoForm.experience">
                <template slot="append">{{$t('talentPool.tip.year')}}</template>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('news.positonNews.hopeSalary')" style="float: left">
              <el-input v-model.trim="baseinfoForm.hopeSalary" :placeholder="$t('talentPool.tip.monthlySalary')">
                <template slot="append">{{$t('recruitSystem.screen.price')}}</template>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('news.positonNews.higheducation')">
              <el-select clearable :placeholder="$t('talentPool.tip.select')" v-model.trim="baseinfoForm.degree">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.school')" style="float: left">
              <el-input v-model.trim="baseinfoForm.school">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.major')" style="float: left">
              <el-input v-model.trim="baseinfoForm.specialty">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.recenttrade')">
              <div @click="tradeVisible=true">
                <el-input v-model.trim="baseinfoForm.trade" :readonly="true">
                  <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                </el-input>
              </div>

            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.recentcompany')" style="float: left">
              <el-input v-model.trim="baseinfoForm.company">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.recentjob')" style="float: left">
              <div @click="jobVisible=true">
                <el-input v-model.trim="baseinfoForm.job" :readonly="true">
                  <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                </el-input>
              </div>
            </el-form-item>`
            <el-form-item :label="$t('talentPool.tip.arrivalTime')">
              <!-- <div class="block">
                <el-date-picker :editable="false" v-model.trim="baseinfoForm.hopeTime" type="date" :placeholder="$t('talentPool.tip.chooseDate')" format="yyyy年MM月dd日" value-format="yyyy年MM月dd日" :picker-options="pickerOptionsarrive">
                </el-date-picker>
              </div> -->
                <el-select v-model="baseinfoForm.hopeTime" :placeholder="$t('talentPool.tip.select')">
                    <el-option :label="item.name" :value="item.value" v-for="(item,index) in arrTimeArr" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.keyword')" class="keyword">
              <el-input v-model.trim="baseinfoForm.keywords" :placeholder="$t('talentPool.tip.comma')" width="100%">
              </el-input>
            </el-form-item>
          </el-form>
          <div class="savetabbutton">
            <el-button type="success green" @click="addFromInput">{{$t('btn.save')}}</el-button>
            <el-button @click="personnelFormVisible=false">{{$t('btn.cancel')}}</el-button>
          </div>

        </el-tab-pane>
        <el-tab-pane :label="$t('talentPool.tip.tab02')" class="experience">
          <div class="producttitle" style="text-align:left;font-size:16px;margin:20px 0">{{$t('talentPool.tip.tab02')}}
            <span style="color:red">{{$t('talentPool.tip.sort')}} </span>
          </div>

          <div style="position:absolute;left:20px;bottom:40px">
            <i size="small" @click="addTabWorkExperience" class="el-icon-circle-plus-outline" style="font-size:18px;cursor:pointer"></i>
          </div>
          <div>
            <div class="productcontent clearfix" v-for="(item,index) in WorkExperienceform" :key="index">
              <el-form ref="WorkExperienceform" :model="WorkExperienceform[index]" label-width="160px">
                <i class="el-icon-remove-outline" style="float:left;margin-left:-44px;margin-top:-15px;font-size:18px;cursor:pointer" closable @click="removeTabWorkExperience(WorkExperienceform[index])"></i>

                <el-form-item :label="$t('talentPool.tip.time')">
                  <el-col :span="9">
                    <el-date-picker :editable="false" :picker-options="prepickerOptions" type="month" :placeholder="$t('talentPool.tip.start')" style="width: 100%;" v-model.trim="WorkExperienceform[index].from" format="yyyy/MM" value-format="yyyy/MM"></el-date-picker>
                  </el-col>
                  <el-col class="line" style="width:23%"></el-col>
                  <el-col :span="9">
                    <el-date-picker :editable="false" :picker-options="pickerOptions" type="month" :placeholder="$t('talentPool.tip.end')" style="width: 100%;" v-model.trim="WorkExperienceform[index].to" value-format="yyyy/MM" format="yyyy/MM"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.company')" style="width:45%;float:left">
                  <el-input v-model.trim="WorkExperienceform[index].company"></el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.situation')" style="width:45%;float:right">
                  <el-input v-model.trim="WorkExperienceform[index].companyDescribe" :placeholder="$t('talentPool.tip.placSituation')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.department')" style="width:45%;float:left">
                  <el-input v-model.trim="WorkExperienceform[index].depart"></el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.position')" style="width:45%;float:right">
                  <el-input v-model.trim="WorkExperienceform[index].job">
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.jobdescription')" style="width:100%;float:left">
                  <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c1')" v-model.trim="WorkExperienceform[index].jobDescribe">
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.reportingObject')" style="width:45%;float:left">
                  <el-input v-model.trim="WorkExperienceform[index].reportTo"></el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.subordinate')" style="width:45%;float:right">
                  <el-input v-model.trim="WorkExperienceform[index].following"></el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.performance')" style="width:100%;float:left">
                  <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c1')" v-model.trim="WorkExperienceform[index].achievement">
                  </el-input>
                </el-form-item>
              </el-form>

            </div>

          </div>
          <div class="savetabbutton">
            <el-button type="success green" @click="saveWorkExperience">{{$t('btn.save')}}</el-button>
            <el-button @click="personnelFormVisible=false">{{$t('btn.cancel')}}</el-button>
          </div>

        </el-tab-pane>
        <el-tab-pane :label="$t('talentPool.tip.tab03')" class="product">
          <div class="producttitle" style="text-align:left;font-size:16px;margin:20px 0">{{$t('talentPool.tip.tab03')}}
            <span style="color:red">{{$t('talentPool.tip.sort')}} </span>
          </div>

          <div style="position:absolute;left:20px;bottom:40px">
            <i size="small" @click="addTabProjectExperience" class="el-icon-circle-plus-outline" style="font-size:18px;cursor:pointer"></i>
          </div>

          <div>

            <div class="productcontent clearfix" v-for="(item,index) in ProjectExperienceform" :key="index">
              <el-form ref="ProjectExperienceform" :model="ProjectExperienceform[index]" label-width="160px">
                <i class="el-icon-remove-outline" style="float:left;margin-left:-44px;margin-top:-15px;font-size:18px;cursor:pointer" closable @click="removeTabProjectExperience(ProjectExperienceform[index])"></i>

                <el-form-item :label="$t('talentPool.tip.time')">
                  <el-col :span="9">
                    <el-date-picker :editable="false" :picker-options="prepickerOptions" type="month" :placeholder="$t('talentPool.tip.start')" style="width: 100%;" v-model.trim="ProjectExperienceform[index].from" format="yyyy/MM" value-format="yyyy/MM"></el-date-picker>
                  </el-col>
                  <el-col class="line" style="width:23%"></el-col>
                  <el-col :span="9">
                    <el-date-picker :editable="false" :picker-options="pickerOptions" type="month" :placeholder="$t('talentPool.tip.end')" style="width: 100%;" v-model.trim="ProjectExperienceform[index].to" value-format="yyyy-MM"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.projectname')">
                  <el-input v-model.trim="ProjectExperienceform[index].name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.projectDescription')">
                  <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c1')" v-model.trim="ProjectExperienceform[index].describe">
                  </el-input>
                </el-form-item>
                <el-form-item  :label="$t('talentPool.tip.responsibility')">
                  <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c1')" v-model.trim="ProjectExperienceform[index].jobDescribe">
                  </el-input>
                </el-form-item>
                <input type="hidden" v-model="ProjectExperienceform[index].talentId">
              </el-form>
            </div>

          </div>
          <div class="savetabbutton">
            <el-button type="success green" @click="saveProjectExperience">{{$t('btn.save')}}</el-button>
            <el-button @click="personnelFormVisible=false">{{$t('btn.cancel')}}</el-button>
          </div>

        </el-tab-pane>
        <el-tab-pane :label="$t('talentPool.tip.tab04')" class="skill">
          <!-- 证书 -->
          <div style="position:relative" class="certificate">
            <div class="producttitle" style="text-align:left;font-size:16px;margin:20px 0">1.{{$t('talentPool.tip.certificate')}}</div>

            <div style="position: absolute;left:-27px;bottom: -10px;">
              <i size="small" @click="addTabtalentCertificates" class="el-icon-circle-plus-outline" style="font-size:18px;cursor:pointer"></i>
            </div>
            <div>
              <div class="productcontent clearfix" v-for="(item,index) in Skillsform.talentCertificates" :key="index">
                <el-form ref="talentCertificatesform" :model="Skillsform.talentCertificates[index]" label-width="160px">
                  <i class="el-icon-remove-outline" style="float:left;margin-left:-44px;margin-top:-15px;font-size:18px;cursor:pointer" closable @click="removeTabtalentCertificates(Skillsform.talentCertificates[index])"></i>

                  <el-form-item :label="$t('talentPool.tip.acquisitionTime')">
                    <div class="block">
                      <el-date-picker :editable="false" v-model.trim="Skillsform.talentCertificates[index].date" type="month" format="yyyy/MM" :placeholder="$t('talentPool.tip.start')" value-format="yyyy/MM">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('talentPool.tip.certificate')">
                    <el-input v-model.trim="Skillsform.talentCertificates[index].name"></el-input>
                  </el-form-item>
                  <input type="hidden" v-model="Skillsform.talentCertificates[index].talentId">
                </el-form>
              </div>
            </div>
          </div>
          <!-- 技能 -->
          <div style="position:relative" class="certificate">
            <div class="producttitle" style="text-align:left;font-size:16px;margin:20px 0">2.{{$t('talentPool.tip.tab04')}}</div>

            <div style="position: absolute;left:-27px;bottom: -10px;">
              <i size="small" @click="addTabtalentSkills" class="el-icon-circle-plus-outline" style="font-size:18px;cursor:pointer"></i>
            </div>
            <div>
              <div class="productcontent clearfix" v-for="(item,index) in Skillsform.talentSkills" :key="index">
                <el-form ref="talentSkillsform" :model="Skillsform.talentSkills[index]" label-width="160px">
                  <i class="el-icon-remove-outline" style="float:left;margin-left:-44px;margin-top:-15px;font-size:18px;cursor:pointer" closable @click="removeTabtalentSkills(Skillsform.talentSkills[index])"></i>

                  <el-form-item :label="$t('talentPool.tip.skill')" style="float:left;width:45%">
                    <el-input v-model.trim="Skillsform.talentSkills[index].name"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('talentPool.tip.skilllevel')" style="float:right;width:45%">
                    <el-input v-model.trim="Skillsform.talentSkills[index].content"></el-input>
                  </el-form-item>
                  <input type="hidden" v-model="Skillsform.talentSkills[index].talentId">
                </el-form>
              </div>
            </div>
          </div>
          <!-- 培训经历 -->
          <div style="position:relative" class="certificate">
            <div class="producttitle" style="text-align:left;font-size:16px;margin:20px 0">3.{{$t('talentPool.tip.training')}}</div>

            <div style="position: absolute;left:-27px;bottom: -10px;">
              <i size="small" @click="addTabtrainingExperiences" class="el-icon-circle-plus-outline" style="font-size:18px;cursor:pointer"></i>
            </div>
            <div>
              <div class="productcontent clearfix" v-for="(item,index) in Skillsform.trainingExperiences" :key="index">
                <el-form ref="trainingExperiencesform" :model="Skillsform.trainingExperiences[index]" label-width="160px">
                  <i class="el-icon-remove-outline" style="float:left;margin-left:-44px;margin-top:-15px;font-size:18px;cursor:pointer" closable @click="removeTabtrainingExperiences(Skillsform.trainingExperiences[index])"></i>

                  <el-form-item :label="$t('talentPool.tip.trainingTime')" style="width:47%;float:left">
                    <el-col :span="10">
                      <el-date-picker :editable="false" :picker-options="prepickerOptions" type="month" :placeholder="$t('talentPool.tip.start')" format="yyyy/MM" value-format="yyyy/MM" style="width: 100%;" v-model.trim="Skillsform.trainingExperiences[index].startDate"></el-date-picker>
                    </el-col>
                    <el-col class="line" style="width:14%"></el-col>
                    <el-col :span="10">
                      <el-date-picker :editable="false" :picker-options="pickerOptions" type="month" :placeholder="$t('talentPool.tip.start')" format="yyyy/MM" value-format="yyyy/MM" style="width: 100%;" v-model.trim="Skillsform.trainingExperiences[index].endDate"></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item :label="$t('talentPool.tip.trainingName')" style="width:47%;float:right">
                    <el-input v-model.trim="Skillsform.trainingExperiences[index].name"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('talentPool.tip.trainingInstitutions')" style="width:47%;float:left">
                    <el-input v-model.trim="Skillsform.trainingExperiences[index].agency"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('talentPool.tip.trainingVenue')" style="width:47%;float:right">
                    <el-input v-model.trim="Skillsform.trainingExperiences[index].place"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('talentPool.tip.trainingDescription')" style="width:100%;float:left">
                    <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c1')" style="width:100%;float:left" v-model.trim="Skillsform.trainingExperiences[index].describe">
                    </el-input>
                  </el-form-item>
                  <input type="hidden" v-model="Skillsform.trainingExperiences[index].talentId">
                </el-form>
              </div>
            </div>
          </div>
          <div class="savetabbutton">
            <el-button type="success green" @click="saveTalentSkill">{{$t('btn.save')}}</el-button>
            <el-button @click="personnelFormVisible=false">{{$t('btn.cancel')}}</el-button>
          </div>

        </el-tab-pane>
        <el-tab-pane :label="$t('talentPool.tip.tab05')">

          <el-upload class="upload-demo" ref="upload" :data="upLoadData" :action="baseAction" :file-list="fileList" :auto-upload="false" :before-upload="beforeUpload" :on-success="uploadsuccess">

            <el-button size="medium" type="success" @click="uploadPublic" class="chuanbutton" style="margin-left:20px">{{$t('businessSystem.detail.upload')}}</el-button>

            <el-button slot="trigger" size="medium" type="success" class="youbutton green">{{$t('businessSystem.detail.browse')}}</el-button>

          </el-upload>

          <div class="attachment">
            <el-button size="small" @click="deleteByTalentAttachmentIds">{{$t('businessSystem.detail.deletefile')}}</el-button>
            <el-button size="small" @click="downloadAttachment">{{$t('businessSystem.detail.downloadfile')}}</el-button>
          </div>

          <el-table ref="multipleTable" border :data="TalentAttachmentData" tooltip-effect="dark" style="width: 100%" :stripe="true" @selection-change="TalentAttachmentselschange" v-loading="downloading" element-loading-text="拼命上传中">
            <el-table-column type="selection" width="55" prop="id">
            </el-table-column>
            <el-table-column :label="$t('businessSystem.detail.fileName')" prop="name">

            </el-table-column>

            <el-table-column prop="uploadTime" :label="$t('businessSystem.detail.time')">
            </el-table-column>
          </el-table>
          <div class="savetabbutton">
            <el-button @click="personnelFormVisible=false" style="margin-top:20px">{{$t('btn.cancel')}}</el-button>
          </div>

        </el-tab-pane>

      </el-tabs>
    </el-dialog>

    <!--发布筛选-->
    <el-dialog :visible.sync="needFormVisible" width="40%" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">

      <el-dialog width="50%" append-to-body :visible.sync="needhouseholdVisible" class="provincedialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <div class="surebutton">
          <el-button @click="canceldynamicTagsneeds">{{$t('btn.cancel')}}</el-button>
          <el-button type="success" class="green" @click="suredynamicTagsneeds">{{$t('btn.sure')}}</el-button>
        </div>

        <div class="residencetitle">{{$t('talentPool.tip.selectedcity')}}
          <el-tag :key="tag" v-for="tag in dynamicTagsneeds" closable :disable-transitions="false" @close="handleCloseneeds(tag)">
            {{tag}}
          </el-tag>

        </div>
        <div class="residencetitle">{{$t('talentPool.tip.hotcity')}}</div>
        <el-popover v-for="(item,index) in hotCity" :key="index" class="hotcityLi" placement="right-end" trigger="click">
          <el-button slot="reference" @click="findAreaByCityIdhot4(item)">{{item|EncityName}}</el-button>
          <el-button @click="showInputneeds(paralang?item.cityNameEn:item.cityName,paralang?item.cityNameEn:item.cityName,cc)" class="button-new-tag" size="mini">{{item|EncityName}}</el-button>
          <el-button v-for="(x,y) in areaDatahot4" :key="y" class="button-new-tag" size="mini" @click="showInputneeds(paralang?item.cityNameEn:item.cityName,paralang?x.areaNameEn:x.areaName)">{{x|EnareaName}}</el-button>
        </el-popover>

        <div class="residencetitle">{{$t('talentPool.tip.allp')}}</div>

        <ul class="provinceList">
          <li v-for="(item,index) in allProvince" :key="index" @click="findCityByProvinceId4(item)">{{item|EnprovinceName}}</li>
        </ul>
        <div class="provinceListChild">
          <el-popover v-for="(item) in cityData" :key="item.cityName" class="hotcityLi" placement="right-end" trigger="click">
            <el-button slot="reference" @click="findAreaByCityId4(item)">{{item|EncityName}}</el-button>
            <el-button @click="showInputneeds(paralang?item.cityNameEn:item.cityName,paralang?item.cityNameEn:item.cityName,cc)" class="button-new-tag" size="mini">{{item|EncityName}}</el-button>
            <el-button v-for="(x,y) in areaData4" :key="y" class="button-new-tag" size="mini" @click="showInputneeds(paralang?item.cityNameEn:item.cityName,paralang?x.areaNameEn:x.areaName)">{{x|EnareaName}}</el-button>
          </el-popover>
        </div>

      </el-dialog>

      <!-- 行业 -->
      <el-dialog width="50%" :visible.sync="tradeVisibleauto" append-to-body class="tradedialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <div class="surebutton">
          <el-button @click="cancelarrchangeauto">{{$t('btn.cancel')}}</el-button>
          <el-button type="success" class="green" @click="arrchangeauto">{{$t('btn.sure')}}</el-button>
        </div>
        <div class="residencetitle">{{$t('talentPool.tip.selecttrade')}}
          <el-tag :key="tag" v-for="tag in dynamicTagstradeauto" closable :disable-transitions="false" @close="tradehandleCloseauto(tag)">
            {{tag}}
          </el-tag>
        </div>
        <ul class="residenceul">
          <li v-for="(item,index) in tradeListauto" :key="index" class="tradeList">
            <div class="tradebig">{{item|EntradeName}}</div>
            <div class="tradesmall">
              <el-button v-for="(v,i) in item.appTrades" :label="paralang?v.tradeNameEn:v.tradeName" :key="i" class="button-new-tag" size="mini" @click="showInputtradeauto(paralang?v.tradeNameEn:v.tradeName)">{{v|EntradeName}}</el-button>
            </div>
          </li>
        </ul>
      </el-dialog>

      <!-- 职能 -->
      <el-dialog width="50%" :visible.sync="jobVisibleauto" append-to-body class="tradedialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <div class="surebutton">
          <el-button @click="canceljobarrchangeauto">{{$t('btn.cancel')}}</el-button>
          <el-button type="success" class="green" @click="jobarrchangeauto">{{$t('btn.sure')}}</el-button>
        </div>
        <div class="residencetitle">{{$t('talentPool.tip.selectjob')}}
          <el-tag :key="tag" v-for="tag in dynamicTagsjobauto" closable :disable-transitions="false" @close="jobhandleCloseauto(tag)">
            {{tag}}
          </el-tag>
        </div>
        <ul class="residenceul">
          <li v-for="(item,index) in jobListauto" :key="index" class="tradeList">
            <div class="tradebig">{{item|EnjobName}}</div>
            <div class="jobbig">
              <el-popover v-for="(v,i) in item.appJobs" :key="i" class="jobLi" placement="right-end" trigger="click">
                <el-button slot="reference">{{v|EnjobName}}</el-button>
                <el-button :label="v.jobName" class="button-new-tag" size="mini" @click="showInputjobauto(paralang?v.jobNameEn:v.jobName)">{{v|EnjobName}}</el-button>
                <el-button v-for="(x,y) in v.appJobs" :label="paralang?x.jobNameEn:x.jobName" :key="y" class="button-new-tag" size="mini" @click="showInputjobauto(paralang?x.jobNameEn:x.jobName)">{{x|EnjobName}}</el-button>
              </el-popover>
            </div>
          </li>
        </ul>
      </el-dialog>

      <el-form :model="screenform">
        <el-form-item :label="$t('talentPool.tip.keyword')" :label-width="formLabelWidth">
          <el-input v-model="screenform.keywords" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('talentPool.tip.residence')" :label-width="formLabelWidth">
          <el-input v-model="screenform.residence" auto-complete="off" :readonly="true">
            <i slot="suffix" class="el-input__icon el-icon-edit" @click="needModalShow"></i>
          </el-input>

        </el-form-item>
        <el-form-item :label="$t('recruitSystem.screen.job')" :label-width="formLabelWidth">
          <el-input v-model="screenform.skill" auto-complete="off" :readonly="true">
            <i slot="suffix" class="el-input__icon el-icon-edit" @click="jobVisibleauto=true"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('news.positonNews.trade')" :label-width="formLabelWidth">
          <el-input v-model="screenform.trade" auto-complete="off" :readonly="true">
            <i slot="suffix" class="el-input__icon el-icon-edit" @click="tradeVisibleauto=true"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('recruitSystem.screen.experience')" :label-width="formLabelWidth" class="work">
          <el-input v-model="screenform.yearFrom" auto-complete="off">
          </el-input>
          <div class="line"></div>
          <el-input v-model="screenform.yearTo" auto-complete="off">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('recruitSystem.screen.education')" :label-width="formLabelWidth" class="education">
          <el-select clearable :placeholder="$t('talentPool.tip.select')" v-model="screenform.degreeFrom">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div class="line"></div>
          <el-select clearable :placeholder="$t('talentPool.tip.select')" v-model="screenform.degreeTo">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('news.positonNews.age')" :label-width="formLabelWidth" class="age">
          <el-input v-model="screenform.ageFrom" auto-complete="off">
          </el-input>
          <div class="line"></div>
          <el-input v-model="screenform.ageTo" auto-complete="off">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('recruitSystem.screen.gender')" :label-width="formLabelWidth" class="sex">
          <el-radio-group v-model="screenform.sex">
            <el-radio :label="'Any'">{{$t('talentPool.tip.unlimited')}}</el-radio>
            <el-radio :label="'Male'">{{$t('talentPool.tip.man')}}</el-radio>
            <el-radio :label="'Female'">{{$t('talentPool.tip.woman')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('news.positonNews.hopeSalary')" :label-width="formLabelWidth" class="money">
          <el-input v-model="screenform.salaryFrom" auto-complete="off">
            <template slot="append">{{$t('recruitSystem.screen.price')}}</template>
          </el-input>
          <div class="line"></div>
          <el-input v-model="screenform.salaryTo" auto-complete="off">
            <template slot="append">{{$t('recruitSystem.screen.price')}}</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('recruitSystem.screen.number')" :label-width="formLabelWidth">
          <el-input v-model="screenform.number" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('recruitSystem.screen.other')" :label-width="formLabelWidth">
          <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c1')" v-model="screenform.other">
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="success" class="green" @click="addScreeningNeeds">{{$t('recruitSystem.screen.pubscreen')}}</el-button>
        <el-button @click="needFormVisible = false">{{$t('btn.cancel')}}</el-button>

      </div>
    </el-dialog>
    <!-- 只读发布需求 -->
    <el-dialog :visible.sync="onlyreadFormVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="onlyreadForm">
        <el-form-item :label="$t('talentPool.tip.keyword')" :label-width="formLabelWidth">
          <el-input v-model="onlyreadForm.keywords" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('talentPool.tip.residence')" :label-width="formLabelWidth">
          <el-input v-model="onlyreadForm.residence" auto-complete="off" :readonly="true">
            <i slot="suffix" class="el-input__icon el-icon-edit"></i>
          </el-input>

        </el-form-item>
        <el-form-item :label="$t('recruitSystem.screen.job')" :label-width="formLabelWidth">
          <el-input v-model="onlyreadForm.skill" auto-complete="off" :readonly="true">
            <i slot="suffix" class="el-input__icon el-icon-edit"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('news.positonNews.trade')" :label-width="formLabelWidth">
          <el-input v-model="onlyreadForm.trade" auto-complete="off" :readonly="true">
            <i slot="suffix" class="el-input__icon el-icon-edit"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('recruitSystem.screen.experience')" :label-width="formLabelWidth" class="work">
          <el-input v-model="onlyreadForm.yearFrom" auto-complete="off" :readonly="true">
          </el-input>
          <div class="line"></div>
          <el-input v-model="onlyreadForm.yearTo" auto-complete="off" :readonly="true">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('recruitSystem.screen.education')" :label-width="formLabelWidth" class="education">
          <el-select clearable :placeholder="$t('talentPool.tip.select')" v-model="onlyreadForm.degreeFrom" disabled>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div class="line"></div>
          <el-select clearable :placeholder="$t('talentPool.tip.select')" v-model="onlyreadForm.degreeTo" disabled>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('news.positonNews.age')" :label-width="formLabelWidth" class="age">
          <el-input v-model="onlyreadForm.ageFrom" auto-complete="off" ::readonly="true">
          </el-input>
          <div class="line"></div>
          <el-input v-model="onlyreadForm.ageTo" auto-complete="off" :readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('recruitSystem.screen.gender')" :label-width="formLabelWidth" class="sex">
          <el-radio-group v-model="onlyreadForm.sex">
            <el-radio :label="'Any'" disabled>{{$t('talentPool.tip.unlimited')}}</el-radio>
            <el-radio :label="'Male'" disabled>{{$t('talentPool.tip.man')}}</el-radio>
            <el-radio :label="'Female'" disabled>{{$t('talentPool.tip.woman')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('news.positonNews.hopeSalary')" :label-width="formLabelWidth" class="money">
          <el-input v-model="onlyreadForm.salaryFrom" auto-complete="off" :readonly="true">
            <template slot="append">{{$t('recruitSystem.screen.price')}}</template>
          </el-input>
          <div class="line"></div>
          <el-input v-model="onlyreadForm.salaryTo" auto-complete="off" :readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('recruitSystem.screen.number')" :label-width="formLabelWidth">
          <el-input v-model="onlyreadForm.number" auto-complete="off" :readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('recruitSystem.screen.other')" :label-width="formLabelWidth">
          <el-input type="textarea" :autosize="{ minRows: 2}" :readonly="true" :placeholder="$t('talentPool.tip.c1')" v-model="onlyreadForm.other">
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="success" class="green" @click="deleteScreeningNeeds">{{$t('msg.msg7')}}</el-button>
        <el-button @click="onlyreadFormVisible = false">{{$t('btn.cancel')}}</el-button>

      </div>
    </el-dialog>
  </div>
  <!-- /pooldetail -->
</template>
<script>
import api from "../../../api/api.js";
import Cookies from "js-cookie";
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
      var validateMailId = (rule, value, callback) => {
      if (value == "") {
        callback(new Error(this.$t("valid.valid009")));
      } else {
        callback();
      }
    };
        var validateLanguage = (rule, value, callback) => {
      if (value == "") {
        callback(new Error(this.$t("valid.valid011")));
      } else {
        callback();
      }
    };
    return {
      arrTimeArr:[
      {name:this.$t('talentPool.arrive.n1'),value:"随时"},
      {name:this.$t('talentPool.arrive.n2'),value:"1周内"},
      {name:this.$t('talentPool.arrive.n3'),value:"1个月内"},
      {name:this.$t('talentPool.arrive.n4'),value:"3个月内"},
      {name:this.$t('talentPool.arrive.n5'),value:"待定"},
      ],
      paralang:true,
      jobName: "",
      scrollLoading: false,
      pickerOptionsarrive: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 <= Date.now();
        }
      },
      emailPersonformlanguage: "",
      dialogFormVisibleadd: false,
      dialogFormVisibleaddper: false,
      dialogFormVisible: false,
      templetform: {
        tpName: "",
         content: `<p>${this.$t("valid.valid046")}</p>`
      },
      templetformrules: {
        tpName: [{ validator: validatetpName, trigger: "blur" }],
        content: [{ validator: validatecontent, trigger: "blur" }]
      },
      mysellerId: "",
      screendynamicTagstrade: [],
      screendynamicTagsjob: [],
      dynamicTagstrade: [],
      dynamicTagsjob: [],
      dynamicTagstradeauto: [],
      dynamicTagsjobauto: [],
      statusdialogFormVisible: false,
      //需求
      sameArrneeds: [],
      dynamicTagsneeds: [],
      needhouseholdVisible: false,
      tradeVisible: false,
      tradeVisibleauto: false,
      jobVisible: false,
      jobVisibleauto: false,
      areaData4: [],
      areaDatahot4: [],
      provinceneeds: "",
      tradeList: [],
      tradeListauto: [],
      jobList: [],
      jobListauto: [],

      allProvince: [],
      //筛选

      cc: "",
      areaData3: [],
      areaDatahot3: [],
      dynamicTags: [],
      sameArr: [],
      dynamicTagsres: [],
      dynamicTagshos: [],

      //居住地
      provinceres: "",
      provincehos: "",
      innerVisible: false,
      householdVisible: false,
      hotCity: [],
      areaDatahot: [],
      cityData: [],
      areaData: [],
      //行业
      screentradeVisible: false,
      //职位
      screenjobVisible: false,
      flag: true,
      currentPage1: 1,

      positionscreenForm: {},
      hotVisible: false,
      screenoptions: [
        // {
        //   value: "0",
        //   label: "不限"
        // },
        {
          value: "1",
          label: "初中及以下"
        },
        {
          value: "2",
          label: "高中/中技/中专"
        },
        {
          value: "3",
          label: "大专"
        },
        {
          value: "4",
          label: "本科"
        },
        {
          value: "5",
          label: "硕士"
        },
        {
          value: "6",
          label: "MBA"
        },
        {
          value: "7",
          label: "博士"
        }
      ],
      screenarr: [],
      screenjobarr: [],

      screentradeVisible: false,
      screenjobVisible: false,
      positionScreenForm: {},
      Matchbuttonloading: false,
      labelPosition: "left",
      jobResultsels: [],
      jobsearch: "",
      evaResultdialog: false,
      jobData: [],
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
      //详情
      detailposition: [],
      positionform: { companyInfo: {}, jobEvaluationList: [], appUser: {} },
      // positionform: {},
      positionrules: {
        name: [{ required: true, message: "请输入职位名称", trigger: "blur" }],
        number: [
          { required: true, message: "请输入招聘人数", trigger: "blur" }
        ],
        monthly: [{ required: true, message: "请输入月薪", trigger: "blur" }],
        annual: [{ required: true, message: "请输入年薪", trigger: "blur" }],
        charge: [
          { required: true, message: "请输入收费比例", trigger: "blur" },
          // {
          //   type: "number",
          //   message: "收费比例为数字值"
          // },
          {
            pattern: /^(\d?\d(\.\d*)?|100)$/,
            message: "范围在0-100",
            trigger: "blur"
          }
        ]
        // sellerId: [
        //   { required: true, message: "请选择负责人", trigger: "blur" }
        // ]
      },
      maxlength: 50,
      emailFormVisible: false,
      emailform: { mailContent: "" },
      emailformrules: {
        name: [{ required: true, message: this.$t('valid.inputName'), trigger: "blur" }],
        email: [
          { required: true, message: this.$t('valid.userplaceholder'), trigger: "blur" },
          { type: "email", message: this.$t('valid.valid022'), trigger: "blur" }
        ],
        type: [
          { required: true, message:  this.$t('valid.valid010'), trigger: "change" }
        ],
        language: [{ validator: validateLanguage, trigger: "change" }],
        mailId:  [{ validator: validateMailId, trigger: "change" }]
      },
      emailmodelform: [],
      buttonloading: false,
      statusoptions: [
        {
          value: "Recruiting",
          label: this.$t('recruitSystem.recruiting')
        },
        {
          value: "Completed",
          label:  this.$t('recruitSystem.recruited')
        },
        {
          value: "Closed",
          label:  this.$t('recruitSystem.closed')
        }
      ],
      status: "",
      colseruleForm: {},
      colserules: {
        reason: [{ required: true, message: this.$t('valid.valid062'), trigger: "blur" }]
      },
      needbutton: false,

      arrauto: [],
      jobarrauto: [],
      statusFormrules: {
        reason: [
          { required: true, message: this.$t('valid.valid059'), trigger: "blur" }
        ],
        changed: [{ message: this.$t('valid.valid037'), trigger: "change" }]
      },
      //状态/备注
      statusForm: {
        reason:""
      },
      optionsStatus: [],
      historystatusData: [],
      //删除候选人
      delruleForm: {},
      delrules: {
        reason: [{ message:this.$t('valid.valid063') , trigger: "blur" }]
      },
      positionsels: [],
      searchcontent: "",
      CandidateVisible: false,
      CandidateData: {},
      Candidatesels: [],
      downresume: false,
      reportform: {
        language: "cn"
      },
      emailPersonform: { mailContent: "" },
      personFormVisible: false,
      formrules: {
        language:[{ validator: validateLanguage, trigger: "change" }],
        mailId:  [{ validator: validateMailId, trigger: "change" }]
      },
      prpFormVisible: false,
      onlyreadFormVisible: false,
      onlyreadForm: {},
      prpid: "",
      icsId: "",
      prplanguage: "",
      prpbutton: false,
      jobId: "",
      //手动导入
      upnumList: [],
      numupload: 0,
      downloading: false,
      baseAction: BASE_URL + "/icsserver/TalentAttachment/uploadPublic",
      upLoadData: {},
      talentId: "",

      baseinfoForm: {},
      arr: [],
      areaarr: [],
      jobarr: [],
      TalentAttachmentsels: [],

      //项目经验
      prepickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: this.$t('valid.valid047'),
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          }
        ]
      },
      TalentAttachmentData: [],
      fileList: [],
      //工作经验
      WorkExperienceform: [{}],
      //项目经验
      ProjectExperienceform: [{}],
      //技能
      Skillsform: {
        talentCertificates: [{}],
        talentSkills: [{}],
        trainingExperiences: [{}]
      },

      //导入人才
      personnelFormVisible: false,
      // 学历
      options: [
        {
          value: "不限",
          label: this.$t('api.tal.a1')
        },
        {
          value: "初中及以下",
          label: this.$t('api.tal.a2')
        },
        {
          value: "高中/中技/中专",
          label: this.$t('api.tal.a3')
        },
        {
          value: "大专",
          label: this.$t('api.tal.a4')
        },
        {
          value: "本科",
          label: this.$t('api.tal.a5')
        },
        {
          value: "硕士",
          label:this.$t('api.tal.a6')
        },
        {
          value: "MBA",
          label: this.$t('api.tal.a7')
        },
        {
          value: "博士",
          label: this.$t('api.tal.a8')
        }
      ],
      //
      needFormVisible: false,

      tabPosition: "left",

      language: "",

      screenFormVisible: false,
      remarkdialog: false,
      downloaoddialog: false,
      deldialog: false,
      statusdialog: false,
      closedialog: false,
      formLabelWidth: "160px",
      screenform: {},

      positiondialog: false,
      saleVisible: false,
      selectSelleroptions: [],
      isevaluationStatusShow: true,
      isShowdown: true,
      remarkruleForm: {},
      remarkrules: {
        reason: [
          { required: true, message: this.$t('valid.valid059'), trigger: "blur" }
        ]
      },
      editpositionform: {},
      reportformrules: {
        language: [
          { required: true, message: this.$t('valid.valid011'), trigger: "change" }
        ],
        style: [
          { required: true, message: this.$t('valid.valid050'), trigger: "change" }
        ]
      },
      positionName: ""
    };
  },
  created() {
    this.getlang();
    this.findById();
    // this.findAppMailTemp();
    this.findProvince();
    this.findCityByStatus();
    this.findJob();
    this.findTrade();
    this.findTalentStatus();
    this.getJobEvaluationList();
    this.selectSeller();
  },
  methods: {
    getlang(){
      if(Cookies.get("language")=='zh'){
        this.paralang=false
      }else{
        this.paralang=true
      }
    },
      reFormat(v) {
        switch (v) {
        case "加入职位":
          return this.$t("ststus.positionStatus.n1");
          break;
        case "已联系-有兴趣":
          return this.$t("ststus.positionStatus.n2");
          break;
        case "已联系-没兴趣":
          return this.$t("ststus.positionStatus.n3");
          break;
        case "待面试":
          return this.$t("ststus.positionStatus.n4");
          break;
        case "面试完成":
          return this.$t("ststus.positionStatus.n5");
          break;
        case "已入职":
          return this.$t("ststus.positionStatus.n6");
          break;
        case "退出职位":
          return this.$t("ststus.positionStatus.n7");
          break;
      }
    },
      //职位候选人状态
    posFormat1(row, column) {
      switch (row.candidateStatus||row.status) {
        case "加入职位":
          return this.$t("ststus.positionStatus.n1");
          break;
        case "已联系-有兴趣":
          return this.$t("ststus.positionStatus.n2");
          break;
        case "已联系-没兴趣":
          return this.$t("ststus.positionStatus.n3");
          break;
        case "待面试":
          return this.$t("ststus.positionStatus.n4");
          break;
        case "面试完成":
          return this.$t("ststus.positionStatus.n5");
          break;
        case "已入职":
          return this.$t("ststus.positionStatus.n6");
          break;
        case "退出职位":
          return this.$t("ststus.positionStatus.n7");
          break;
      }
    },
    degreeFormat(row, column) {
      switch (row.degree) {
        case "不限":
          return this.$t("api.tal.a1");
          break;
        case "初中及以下":
          return this.$t("api.tal.a2");
          break;
        case "高中/中技/中专":
        case "高中":
        case "中技":
        case "中专":
          return this.$t("api.tal.a3");
          break;
        case "大专":
         return this.$t("api.tal.a4");
          break;
        case "本科":
         return this.$t("api.tal.a5");
          break;
        case "硕士":
              return this.$t("api.tal.a6");
          break;
        case "MBA":
             return this.$t("api.tal.a7");
          break;
             case "博士":
             return this.$t("api.tal.a8");
          break;
      }
    },
    setphonechange(value) {
      this.phonechange(value);
    },
    phonechange(value) {
      // 目的是去掉字符串中除数字之外的其它字符
      if (this.baseinfoForm.phone) {
        this.$nextTick(() => {
          this.baseinfoForm.phone = value.replace(/[^\d]/g, "");
        });
      }
    },
    positionstatuschange(v) {
      // console.log(v);
      this.statusForm.reason = null;
      this.statusdialogFormVisible = true;
      this.statusForm.talentId = v.row.id;
      this.statusForm.type = 1;
      this.statusForm.changed = v.row.status;
    },
    cancelstatusdialogFormVisible(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.statusForm.reason = "";
      this.statusdialogFormVisible = false;
      this.findById();
    },

    //负责人
    selectSeller() {
      this.$http.post(api.user.selectSeller()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            // console.log(res);
            this.selectSelleroptions = res.data.data;
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
    cancelsaleVisible() {
      this.saleVisible = false;
      this.mysellerId = this.editpositionform.sellerId;
    },
    suresaleVisible() {
      this.saleVisible = false;
      this.editpositionform.sellerId = this.mysellerId;
    },
    opensaleVisible() {
      this.saleVisible = true;
      this.mysellerId = this.editpositionform.sellerId;
    },
    //根据id获取详情
    dateFormat(row, column) {
      return mytools.datefilter(row.updateTime);
      // console.log(row.updateTime);
    },
    teldateFormat(row, column) {
      return mytools.datefilter(row.updateTime, "-");
      // console.log(row.updateTime);
    },
    eldateFormat(row, column) {
      row.updateDate = row.updateDate ? row.updateDate : row.createDate;
      return mytools.datefilter(row.updateDate, "-");
      // console.log(row.updateTime);
    },
    jbtypeFormat(row, column) {
      if (row.type == "直属领导") {
        return  this.$t('api.sale.a1');
      }
      if (row.type == "最佳表现者") {
        return this.$t('api.sale.a2');
      }
      if (row.type == "人事负责人") {
        return this.$t('api.sale.a3');
      }
    },
    jbdateformat(row, column) {
      if (row.updateDate) {
        return mytools.datefilter(row.updateDate, "-");
      }
    },
    typeFormat(row, column) {
      if (row.type == 1) {
        return this.$t('btn.b1');
      }
      if (row.type == 0) {
        return this.$t('btn.b2');
      }
    },
    findById() {
      // var _this = this;
      var para = { id: this.$route.query.id };
      this.$http.post(api.position.findById(), formatUrl(para)).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.jobId = res.data.data.defaultJobId;
            // console.log(res);
            this.positionName = res.data.data.name;
            if (res.data.data.jobEvaluationList) {
              res.data.data.jobEvaluationList.forEach(function(v, i) {
                v.isDefault = v.id == res.data.data.defaultJobId ? true : false;
              });
              res.data.data.jobEvaluationList.forEach(el => {
                if (el.isDefault == true && !el.prpResult) {
                  this.isShowdown = false;
                } else {
                  this.isShowdown = true;
                }
              });
            }
            // console.log(this.isShowdown);
            if (res.data.data.needId) {
              this.needbutton = true;
            }
            this.detailposition = [res.data.data];

            var poolidList = [];
            res.data.data.talentPoolList.forEach(el => {
              poolidList.push(el.id);
              //最高学历
              if (el.degree) {
                if (el.degree.includes("不限")) {
                  el.degreesort = 1;
                } else if (el.degree.includes("初中")) {
                  el.degreesort = 2;
                } else if (
                  el.degree.includes("高中") ||
                  el.degree.includes("中专") ||
                  el.degree.includes("中技")
                ) {
                  el.degreesort = 3;
                } else if (el.degree.includes("大专")) {
                  el.degreesort = 4;
                } else if (el.degree.includes("本科")) {
                  el.degreesort = 5;
                } else if (el.degree.includes("硕士")) {
                  el.degreesort = 6;
                } else if (el.degree.includes("MBA")) {
                  el.degreesort = 7;
                } else if (el.degree.includes("博士")) {
                  el.degreesort = 8;
                }
              } else {
                el.degreesort = 0;
              }
              //工作经验
              if (el.experience) {
                if (el.experience.includes("无工作经验")) {
                  el.experienceID = 0;
                } else {
                  // el
                  el.experienceID = parseInt(el.experience)
                    ? parseInt(el.experience)
                    : el.experience;
                }
              } else {
                el.experienceID = -1;
              }

              //期望薪资
              if (el.hopeSalary) {
                el.hopemoney = el.hopeSalary.includes("万元/年")
                  ? parseInt(el.hopeSalary.split("-")[0]) / 12 * 10000
                  : parseInt(el.hopeSalary.split("-")[0]);
              } else {
                el.hopemoney = 0;
              }
              //个人测评
              if (el.evaluationStatusShow) {
                if (el.evaluationStatusShow == "未发送") {
                  el.evaluationStatusShowID = 1;
                } else if (el.evaluationStatusShow == "已发送") {
                  el.evaluationStatusShowID = 2;
                } else if (el.evaluationStatusShow.includes("天")) {
                  el.evaluationStatusShowID = parseInt(
                    el.evaluationStatusShow.split("天")[0]
                  );
                } else if (el.evaluationStatusShow.includes("月")) {
                  el.evaluationStatusShowID =
                    parseInt(el.evaluationStatusShow.split("个")[0]) * 30;
                }
              } else {
                el.evaluationStatusShowID = 0;
              }
            });
            localStorage.setItem("poolids", JSON.stringify(poolidList));
            var prpidList = [];
            res.data.data.jobEvaluationList.forEach(el => {
              prpidList.push({
                id: el.id,
                clientId: el.clientId
              });
            });
            localStorage.setItem("prpids", JSON.stringify(prpidList));
            this.positionform = res.data.data;
            document.title = `${this.$t("sidebar.recruitSystem")}-${res.data.data.name}`;
            if (res.data.data.companyPositionScreeningNeeds) {
              this.onlyreadForm = res.data.data.companyPositionScreeningNeeds;
            }

            // console.log(res);
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

    //职位信息修改
    editposition(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      var para = { id: this.$route.query.id };
      this.$http.post(api.position.findById(), formatUrl(para)).then(
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

      // if (this.$refs[formName] !== undefined) {
      //   this.$refs[formName].resetFields();
      // }
      // this.findById();
    },
    cancelposition(formName) {
      this.positiondialog = false;
    },
    updatePosition(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.positionform);
          if (this.editpositionform.sellerId) {
            this.$http
              .post(
                api.position.updatePosition(),
                formatUrl(this.editpositionform)
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
                      message: this.$t('msg.msg6')
                    });
                    // if (this.$refs[formName] !== undefined) {
                    //   this.$refs[formName].resetFields();
                    // }
                    this.positiondialog = false;
                    this.findById();
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
            this.$message({
              type: "warning",
              message: this.$t('valid.valid008')
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //职位测评发送邮件
    //根据权限不同显示不同模板
    closedialogemail(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    closedialogemailper(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.emailFormVisible = false;
    },
    resetFormperson(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.personFormVisible = false;
    },
    sendemail(formName) {
      this.findAppMailTemp();
      this.emailFormVisible = true;
    },

    //发送个人测评
    sendPersonemail(formName) {
      this.findAppMailTempIcs();
      this.personFormVisible = true;
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
    findAppMailTempIcs() {
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
    cancelcreateMailTemp(formName) {
      this.dialogFormVisibleadd = false;
      this.sendemail(formName);
    },
    cancelcreateMailTempper(formName) {
      this.dialogFormVisibleaddper = false;
      this.sendPersonemail(formName);
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
                  message: this.$t('msg.msg19')
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

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
                this.findAppMailTempIcs();
                this.$message({
                  type: "success",
                  message: this.$t('msg.msg19')
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    checkperson(id, formName) {
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
    //获取职位测评
    getJobEvaluationList() {
      this.$http.post(api.tool.getJobEvaluationList()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            // console.log(res);
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
    jobSelectionChange(sels) {
      this.jobResultsels = sels;
      // console.log(sels);
    },
    //职位需求测评结果
    openaddevaResult() {
      this.evaResultdialog = true;
      this.getJobEvaluationList();
      this.jobsearch = "";
    },
    bindingJobEvaluation() {
      var jobIds = this.jobResultsels.map(item => item.id).toString();
      this.$http
        .post(
          api.position.bindingJobEvaluation(),
          formatUrl({ jobIds: jobIds, positionId: this.$route.query.id })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.findById();
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
    deleteByJobIdAndPositionId(v) {
      this.$confirm(
              this.$t("recruitSystem.tip.stafftip5"),
        this.$t("systemManagement.tip.title"), {
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(
              api.position.deleteByJobIdAndPositionId(),
              formatUrl({ jobId: v.row.id, positionId: this.$route.query.id })
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  this.findById();
                  this.$message({
                    type: "success",
                    message: this.$t('msg.msg14')
                  });
                }
                if (res.data.code == "500") {
                  this.$message({
                    type: "error",
                    message: this.$t('msg.msg2')
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
    //发送测评
    sendJobEvaluation(formName) {
      this.emailform.companyPositionId = this.$route.query.id;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.buttonloading = true;
          this.$http
            .post(api.position.sendJobEvaluation(), formatUrl(this.emailform))
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
                  this.findById();
                  this.$message({
                    type: "success",
                    message:this.$t('msg.msg9')
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
    //设置默认
    setJobEvaluationDefault(scope) {
      // console.log(scope);
      var para = { id: this.$route.query.id, jobEvaluationId: scope.row.id };
      this.$http
        .post(api.position.setJobEvaluationDefault(), formatUrl(para))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.$message({
                type: "success",
                message: this.$t('msg.msg30')
              });
              // this.jobId = scope.row.id;
              this.findById();
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
    //状态改变
    cancelstatus() {
      this.statusdialog = false;
      this.findById();
    },
    cancelclosestatus(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.closedialog = false;
      this.findById();
    },
    statuschange(v) {
      if (v == "Recruiting" || v == "Completed") {
        this.statusdialog = true;
      } else if (v == "Closed") {
        this.closedialog = true;
      }
    },
    updateStatus() {
      var para = { id: this.$route.query.id, status: this.positionform.status };
      this.$http.post(api.position.updateStatus(), formatUrl(para)).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.statusdialog = false;
            this.findById();
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
    updatecloseStatus(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var para = {
            id: this.$route.query.id,
            status: this.positionform.status,
            reason: this.colseruleForm.reason
          };
          this.$http.post(api.position.updateStatus(), formatUrl(para)).then(
            res => {
              if (res.data.code == "911") {
                location.href = "./login.html";
              }
              if (res.data.code == "00") {
                this.closedialog = false;
                this.findById();
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
    //数据筛选
    Candidatechange(sels) {
      this.Candidatesels = sels;
    },
    addFromData() {
      if (this.flag) {
        var ids = this.Candidatesels.map(item => item.id).toString();
        this.$http
          .post(
            api.position.addFromData(),
            formatUrl({ poolIds: ids, positionId: this.$route.query.id })
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
                  message:  this.$t('msg.msg38')
                });
                this.CandidateVisible = false;
                this.screenFormVisible = false;
                this.findById();
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
        this.$message({
          type: "warning",
          message: this.$t('msg.msg39')
        });
      }
    },

    findTalentStatus() {
      this.optionsStatus= [
        { id: 3, name: this.$t('ststus.positionStatus.n2'), type: 0 ,value:"已联系-有兴趣"},
        { id: 4, name: this.$t('ststus.positionStatus.n3'), type: 0 ,value:"已联系-没兴趣"},
        { id: 5, name: this.$t('ststus.positionStatus.n4'), type: 0 ,value:"待面试"},
        { id: 6, name: this.$t('ststus.positionStatus.n5'), type: 0 ,value:"面试完成"},
        { id: 7, name: this.$t('ststus.positionStatus.n6'), type: 0 ,value:"已入职"}
      ];
     
      // this.$http.post(api.talent.findTalentStatus()).then(
      //   res => {
      //     if (res.data.code == "00") {
      //       // console.log(res);
      //       this.optionsStatus = res.data.data;
      //       console.log(JSON.stringify( this.optionsStatus))
      //     }
      //     if (res.data.code == "500") {
      //       this.$message({
      //         message: res.data.errMessage,
      //         type: "error"
      //       });
      //     }
      //     if (res.data.code == "911") {
      //       location.href = "./login.html";
      //     }
      //   },
      //   error => {
      //     console.log(error);
      //   }
      // );
    },
    filterHandler(value, row, column) {
      return row.status === value;
    },
    openfindByTalentIdTalentHistoryStatus(v) {
      this.remarkruleForm.talentId = v.row.id;
      this.remarkdialog = true;
      this.findByTalentIdTalentHistoryStatus(v.row.id);
    },
    //查询人才状态和备注
    findByTalentIdTalentHistoryStatus(v) {
      this.$http
        .post(
          api.TalentHistoryStatus.findByTalentId(),
          formatUrl({ talentId: v })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.historystatusData = res.data.data;
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
    //备注/状态
    saveHistoryStatus() {
      if (!this.statusForm.reason) {
        this.statusForm.reason = "";
      }
      this.$http
        .post(api.TalentHistoryStatus.saveHistoryStatus(), this.statusForm)
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.$message({
                type: "success",
                message: this.$t('msg.msg17')
              });
              this.statusdialogFormVisible = false;
              this.statusForm.reason = "";
            }
            if (res.data.code == "500") {
              this.$message({
                type: "error",
                message: this.$t('msg.msg18')
              });
            }
          },
          error => {
            console.log(error);
          }
        );
    },

    onlysave(formName) {
      this.remarkruleForm.type = 0;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              api.TalentHistoryStatus.saveHistoryStatus(),
              this.remarkruleForm
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  this.$message({
                    type: "success",
                    message:this.$t('msg.msg17')
                  });
                  if (this.$refs[formName] !== undefined) {
                    this.$refs[formName].resetFields();
                  }
                  this.remarkruleForm.reason = "";
                  this.findByTalentIdTalentHistoryStatus(
                    this.remarkruleForm.talentId
                  );
                  // this.findStatusByHunter(this.historyData.row.appRegister.id);
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

    //取消删除
    canceldeldialog(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.deldialog = false;
    },
    positionselschange(sels) {
      this.positionsels = sels;
      if (
        this.positionsels.some(
          x =>
            x.evaluationStatusShow == "未发送" || x.evaluationStatusShow == ""
        )
      ) {
        this.isevaluationStatusShow = true;
      } else {
        this.isevaluationStatusShow = false;
      }
      this.positionsels.forEach(el => {
        if (this.positionsels.length > 0) {
          this.$http
            .post(api.talent.getPersonalById(), formatUrl({ id: el.id }))
            .then(
              res => {
                if (res.data.code == "911") {
                  location.href = "./login.html";
                }
                if (res.data.code == "00") {
                  // console.log(res);
                  if (res.data.data.length > 0) {
                    el.icsId = res.data.data[0].id;
                  } else {
                    el.icsId = null;
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
        }
      });
      // console.log(this.positionsels);
    },
    opendeldialog(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.deldialog = true;
    },
    deleteCandidates(formName) {
      var poolIds = this.positionsels.map(item => item.id).toString();
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              api.position.deleteCandidates(),
              formatUrl({
                positionId: this.$route.query.id,
                poolIds,
                reason: this.delruleForm.reason
              })
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  // console.log(res);
                  this.findById();
                  this.deldialog = false;
                  this.$message({
                    type: "success",
                    message: this.$t('msg.msg2')
                  });
                  // this.optionsStatus = res.data.data;
                }
                if (res.data.code == "500") {
                  this.$message({
                    message: res.data.errMessage,
                    type: "error"
                  });
                }
                if (res.data.code == "911") {
                  location.href = "./login.html";
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
    handleSizeChange(val) {
      this.positionscreenForm.pageSize = val;
      this.searchFromData();
    },

    // scrollWindow() {
    //   document.getElementsByClassName('el-table__body')[3].scrollIntoView()
    //   window.scrollTo(0, 0)
    // },

    handleCurrentChange(val) {
      this.CandidateData.content = [];
      this.scrollLoading = true;
      this.positionscreenForm.pageIndex = val - 1;
      this.searchFromData();
      // this.scrollWindow()
    },
    closeDialog() {
      this.CandidateData.content = [];
      this.scrollLoading = true;
      this.positionscreenForm.pageIndex = 0;
      this.positionscreenForm.pageSize = 10;
      // this.scrollWindow()
    },
    //搜索人才数据表
    searchFromData() {
      this.positionscreenForm.position = 1;
      this.positionscreenForm.positionId = this.$route.query.id;
      // console.log(this.positionscreenForm);
      this.$http
        .post(api.position.searchFromData(), formatUrl(this.positionscreenForm))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.CandidateVisible = true;
              this.scrollLoading = false;
              // console.log(res);
              if (res.data.data) {
                // console.log(res);
                if (res.data.data.content) {
                  this.CandidateData = res.data.data;
                }
              } else {
                // this.CandidateData = {};
                this.CandidateData = {
                  content: [],
                  number: 0,
                  size: 10,
                  totalElements: 0
                };
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
    needModalShow() {
      this.cityData = [];
      this.areaData4 = [];
      this.areaDatahot4 = [];
      this.sameArrneeds = [];
      // this.dynamicTagsneeds = [];
      this.needhouseholdVisible = true;
    },
    findAreaByCityIdhot4(item) {
      this.provinceneeds = "";
      this.cityData = [];
      let { id, cityName } = item;
      this.$http
        .post(api.talent.findAreaByCityId(), formatUrl({ cityId: id }))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.areaDatahot4 = res.data.data;
              // this.dynamicTags = this.areaDatahot;
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
    findAreaByCityId4(item) {
      let { id, cityName } = item;
      this.$http
        .post(api.talent.findAreaByCityId(), formatUrl({ cityId: id }))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.areaData4 = res.data.data;
              // item.visibile2 = true;
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
    findCityByProvinceId4(item) {
      // this.provinceneeds = item.provinceName;
      // this.areaData4 = [];

      // let { id, provinceName } = item;
      if(Cookies.get("language") == 'zh'){
        this.provinceneeds = item.provinceName;
        this.areaData4 = [];
        var { id, provinceName } = item;
      }else{
        this.provinceneeds = item.provinceNameEn;
        this.areaData4 = [];
        var { id, provinceNameEn } = item;
      }
      this.$http
        .post(api.talent.findCityByProvinceId(), formatUrl({ provinceId: id }))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.cityData = res.data.data;
              if (this.cityData.length == 0) {
                   if(Cookies.get("language") == 'zh'){
                      if (this.sameArrneeds.includes(item.provinceName)) {
                        return;
                      } else {
                        this.dynamicTagsneeds.push(item.provinceName);
                        this.sameArrneeds.push(item.provinceName);
                      }
                      }else{
                      if (this.sameArrneeds.includes(item.provinceNameEn)) {
                        return;
                      } else {
                        this.dynamicTagsneeds.push(item.provinceNameEn);
                        this.sameArrneeds.push(item.provinceNameEn);
                      }
                }
                // if (this.sameArrneeds.includes(item.provinceName)) {
                //   return;
                // } else {
                //   this.dynamicTagsneeds.push(item.provinceName);
                //   this.sameArrneeds.push(item.provinceName);
                // }
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
    showInputneeds(x, tag) {
      if (this.provinceneeds) {
        if (
          this.dynamicTagsneeds.includes(`${this.provinceneeds}-${x}-${tag}`)
        ) {
          return;
        } else {
          if (x === tag) {
            if (this.sameArrneeds.includes(`${this.provinceneeds}-${x}`)) {
              return;
            } else {
              this.dynamicTagsneeds.push(`${this.provinceneeds}-${x}`);
              this.sameArrneeds.push(`${this.provinceneeds}-${x}`);
            }

            return;
          } else {
            this.dynamicTagsneeds.push(`${this.provinceneeds}-${x}-${tag}`);
          }
        }
      } else {
        if (this.dynamicTagsneeds.includes(`${x}-${tag}`)) {
          return;
        } else {
          if (x === tag) {
            if (this.sameArrneeds.includes(`${x}`)) {
              return;
            } else {
              this.dynamicTagsneeds.push(`${x}`);
              this.sameArrneeds.push(`${x}`);
            }
          } else {
            this.dynamicTagsneeds.push(`${x}-${tag}`);
          }
        }
      }
    },
    suredynamicTagsneeds() {
      this.screenform.residence = this.dynamicTagsneeds.join(",");
      this.needhouseholdVisible = false;
    },
    canceldynamicTagsneeds() {
      this.dynamicTagsneeds = [];
      this.needhouseholdVisible = false;
    },
    handleCloseneeds() {
      this.dynamicTagsneeds.splice(this.dynamicTagsneeds.indexOf(tag), 1);
      this.sameArrneeds.splice(this.sameArrneeds.indexOf(tag), 1);
    },

    //发布筛选要求
    addScreeningNeeds() {
      this.screenform.positionId = this.$route.query.id;
      this.$http
        .post(api.position.addScreeningNeeds(), formatUrl(this.screenform))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.$message({
                type: "success",
                message: this.$t('msg.msg40')
              });
              this.needbutton = true;
              this.needFormVisible = false;
              // this.CandidateVisible = false;
              this.findById();
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
    //删除需求
    deleteScreeningNeeds() {
      this.$http
        .post(
          api.position.deleteScreeningNeeds(),
          formatUrl({
            positionId: this.$route.query.id,
            needId: this.positionform.needId
          })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.onlyreadFormVisible = false;
              // console.log(res);
              this.$message({
                type: "success",
                message:this.$t('msg.msg7')
              });
              this.needbutton = false;
              this.needFormVisible = false;
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
    //下载职位测评
    downloadPrp(v) {
      // console.log(v);
      this.prpFormVisible = true;
      this.prpid = v.row.id;
    },
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
                message: this.$t('msg.msg20')
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
    downloadIcs() {
      this.downloaoddialog = true;
    },
    //下载个人报告
    downloadIcssure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.reportform.style == "person") {
            if (
              this.positionsels.some(
                x =>
                  x.evaluationStatus == "未发送" ||
                  x.evaluationStatus == "" ||
                  x.evaluationStatus == "已发送"
              )
            ) {
              this.$message({
                type: "warning",
                message:this.$t('msg.msg32')
              });
            } else {
              this.Matchbuttonloading = true;
              this.positionsels.forEach(el => {
                let para = {
                  ids: el.icsId,
                  language: this.reportform.language
                };
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
              this.positionsels.some(
                x =>
                  x.evaluationStatus == "未发送" ||
                  x.evaluationStatus == "" ||
                  x.evaluationStatus == "已发送"
              )
            ) {
              this.$message({
                type: "warning",
                message: this.$t('msg.msg32')
              });
            } else if (this.isShowdown == false) {
              this.$message({
                tyep: "warning",
                message: this.$t('msg.msg33')
              });
            } else {
              this.Matchbuttonloading = true;
              this.positionsels.forEach(el => {
                let para = {
                  jobId: this.jobId,
                  personalId: el.icsId,
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
              message: this.$t('msg.msg34')
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //下载简历
    exportPoolById() {
      this.downresume = true;
      this.positionsels.forEach(el => {
        let para = { id: el.id, positionName: this.positionName };

        this.$http
          .get(api.talent.exportPoolById(), {
            params: para,
            headers: {
              "Content-Type": "application/pdf;charset =utf-8"
            }
          })
          .then(
            res => {
              // this.dialogFormVisible6 = false
              if (res.data.code == "500") {
                this.downresume = false;
                this.$message({
                  type: "error",
                  message: res.data.errMessage
                });
              } else if (res.data.data == "java.lang.NullPointerException") {
                this.downresume = false;
                return this.$message({
                  type: "error",
                  message:  this.$t('msg.msg25')
                });
              } else {
                this.downresume = false;
                window.open(
                  api.talent.exportPoolById() + "?" + formatUrl(para),
                  Date.now()
                );
              }
            },
            error => {
              console.log(error);
            }
          );
      });
    },

    sendPersonalEvaluation(formName) {
      var para = {
        language: this.emailPersonform.language,
        mailId: this.emailPersonform.mailId,
        mailContent: this.emailPersonform.mailContent,
        ids: this.positionsels.map(item => item.id).toString()
      };
      // console.log(para);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.buttonloading = true;
          this.$http
            .post(api.talent.sentPersonalEvaluation(), formatUrl(para))
            .then(
              res => {
                // this.buttonloading=true
                if (res.data.code == "500") {
                  if (res.data.data == "java.lang.NullPointerException") {
                    this.$message({
                      type: "err",
                      message: this.$t('msg.msg41')
                    });
                  } else {
                    this.$message({
                      type: "err",
                      message: res.data.errMessage
                    });
                  }
                }
                if (res.data.code == "00") {
                  this.$message({
                    type: "success",
                    message: this.$t('msg.msg9')
                  });
                  this.findById();
                  this.personFormVisible = false;
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
    //手动导入
    locationModalShow() {
      this.cityData = [];
      this.areaData = [];
      this.areaDatahot = [];
      this.sameArr = [];
      this.dynamicTagsres = [];
      this.innerVisible = true;
    },
    householdModalShow() {
      this.cityData = [];
      this.areaData = [];
      this.areaDatahot = [];
      this.sameArr = [];
      this.dynamicTagshos = [];
      this.householdVisible = true;
    },
    findAreaByCityIdhot(item) {
      let { id, cityName } = item;
      this.cityData = [];
      this.provinceres = "";
      this.provincehos = "";

      this.$http
        .post(api.talent.findAreaByCityId(), formatUrl({ cityId: id }))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.areaDatahot = res.data.data;
              // item.visibile = true;
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

    findAreaByCityId(item) {
      let { id, cityName } = item;
      this.$http
        .post(api.talent.findAreaByCityId(), formatUrl({ cityId: id }))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.areaData = res.data.data;
              // item.visibile = true;
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
    //根据省获取市
    findCityByProvinceId(item) {
      // this.provinceres = item.provinceName;
      // this.provincehos = item.provinceName;
      // this.areaData = [];

      // let { id, provinceName } = item;
      if(Cookies.get("language") == 'zh'){
        this.provinceres = item.provinceName;
        this.provincehos = item.provinceName;
        this.areaData = [];

        var { id, provinceName } = item;
      }else{
        this.provinceres = item.provinceNameEn;
        this.provincehos = item.provinceNameEn;
        this.areaData = [];

        var { id, provinceNameEn } = item;
      }
      this.$http
        .post(api.talent.findCityByProvinceId(), formatUrl({ provinceId: id }))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.cityData = res.data.data;
              if (this.cityData.length == 0) {
                if(Cookies.get("language") == 'zh'){
                  this.dynamicTagsres.length < 1
                  ? this.dynamicTagsres.push(item.provinceName)
                  : "";
                this.dynamicTagshos.length < 1
                  ? this.dynamicTagshos.push(item.provinceName)
                  : "";
                }else{
                   this.dynamicTagsres.length < 1
                  ? this.dynamicTagsres.push(item.provinceNameEn)
                  : "";
                  this.dynamicTagshos.length < 1
                  ? this.dynamicTagshos.push(item.provinceNameEn)
                  : "";
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
    findCityByProvinceId3(item) {
      if(Cookies.get("language") == 'zh'){

        this.cc = item.provinceName;
        this.areaData3 = [];

        var { id, provinceName } = item;
      }else{
        this.cc = item.provinceNameEn;
        this.areaData3 = [];
        var { id, provinceNameEn } = item;
      }


      this.$http
        .post(api.talent.findCityByProvinceId(), formatUrl({ provinceId: id }))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.cityData = res.data.data;
              if (this.cityData.length == 0) {

                if(Cookies.get("language") == 'zh'){
                if (this.sameArr.includes(item.provinceName)) {
                  return;
                } else {
                  this.dynamicTags.push(item.provinceName);
                  this.sameArr.push(item.provinceName);
                }
                }else{
                if (this.sameArr.includes(item.provinceNameEn)) {
                  return;
                } else {
                  this.dynamicTags.push(item.provinceNameEn);
                  this.sameArr.push(item.provinceNameEn);
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
    },
    showInputres(x, tag) {
      if (this.dynamicTagsres.length < 1) {
        if (this.provinceres) {
          if (x === tag) {
            this.dynamicTagsres.push(`${this.provinceres}-${x}`);
          } else {
            this.dynamicTagsres.push(`${this.provinceres}-${x}-${tag}`);
          }
        } else {
          if (x === tag) {
            this.dynamicTagsres.push(`${x}`);
          } else {
            this.dynamicTagsres.push(`${x}-${tag}`);
          }
        }
      } else {
        return;
      }
    },
    handleCloseres(tag) {
      this.dynamicTagsres = [];
      this.sameArr = [];
    },
    suredynamicTagsres() {
      this.baseinfoForm.residence = this.dynamicTagsres.join("");
      this.innerVisible = false;
    },
    canceldynamicTagsres() {
      this.dynamicTagsres = [];
      this.innerVisible = false;
    },

    showInputhos(x, tag) {
      if (this.dynamicTagshos.length < 1) {
        if (this.provincehos) {
          if (x === tag) {
            this.dynamicTagshos.push(`${this.provincehos}-${x}`);
          } else {
            this.dynamicTagshos.push(`${this.provincehos}-${x}-${tag}`);
          }
        } else {
          if (x === tag) {
            this.dynamicTagshos.push(`${x}`);
          } else {
            this.dynamicTagshos.push(`${x}-${tag}`);
          }
        }
      } else {
        return;
      }
    },
    handleClosehos(tag) {
      this.dynamicTagshos = [];
      this.sameArr = [];
    },
    suredynamicTagshos() {
      this.baseinfoForm.household = this.dynamicTagshos.join("");
      this.householdVisible = false;
    },
    canceldynamicTagshos() {
      this.dynamicTagshos = [];
      this.householdVisible = false;
    },
    TalentAttachmentselschange: function(sels) {
      this.TalentAttachmentsels = sels;
    },
    //获取显示行业列表
    findTrade() {
      this.$http.post(api.talent.findTrade()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            // console.log(res);
            this.tradeList = res.data.data;
            this.tradeListauto = res.data.data;
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
    screentradehandleClose(tag) {
      this.screendynamicTagstrade.splice(
        this.screendynamicTagstrade.indexOf(tag),
        1
      );
    },
    showInputscreentrade(tag) {
      if (this.screendynamicTagstrade.includes(tag)) {
        return;
      } else {
        this.screendynamicTagstrade.push(tag);
      }
    },
    cancelscreenarrchange() {
      this.screendynamicTagstrade = [];
      this.screentradeVisible = false;
    },
    screenarrchange() {
      this.positionscreenForm.trade = this.screendynamicTagstrade.join(",");
      this.screentradeVisible = false;
    },

    screenjobhandleClose(tag) {
      this.screendynamicTagsjob.splice(
        this.screendynamicTagsjob.indexOf(tag),
        1
      );
    },

    showInputscreenjob(tag) {
      if (this.screendynamicTagsjob.includes(tag)) {
        return;
      } else {
        this.screendynamicTagsjob.push(tag);
      }
    },

    screenjobarrchange() {
      this.positionscreenForm.job = this.screendynamicTagsjob.join(",");
      this.screenjobVisible = false;
    },
    cancelscreenjobarrchange() {
      this.screendynamicTagsjob = [];
      this.screenjobVisible = false;
    },
    //获取显示职能列表
    findJob() {
      this.$http.post(api.talent.findJob()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            // console.log(res);
            this.jobList = res.data.data;
            this.jobListauto = res.data.data;
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
    //获取热门城市
    findCityByStatus() {
      this.$http.post(api.talent.findCityByStatus()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.hotCity = res.data.data;
            this.hotCity2 = res.data.data;
            this.hotCity3 = res.data.data;
            // console.log(res.data.data);
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
    //获取所有省份
    findProvince() {
      this.$http.post(api.talent.findProvince()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.allProvince = res.data.data;
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

    tradehandleClose(tag) {
      this.dynamicTagstrade.splice(this.dynamicTagstrade.indexOf(tag), 1);
    },
    arrchange() {
      this.baseinfoForm.trade = this.dynamicTagstrade.join(",");
      this.tradeVisible = false;
    },
    cancelarrchange() {
      this.dynamicTagstrade = [];
      this.tradeVisible = false;
    },
    showInputtrade(tag) {
      if (this.dynamicTagstrade.includes(tag)) {
        return;
      } else {
        this.dynamicTagstrade.push(tag);
      }
    },
    jobarrchange() {
      this.baseinfoForm.job = this.dynamicTagsjob.join(",");
      this.jobVisible = false;
    },
    jobhandleClose(tag) {
      this.dynamicTagsjob.splice(this.dynamicTagsjob.indexOf(tag), 1);
    },
    canceljobarrchange() {
      this.dynamicTagsjob = [];
      this.jobVisible = false;
    },
    showInputjob(tag) {
      if (this.dynamicTagsjob.includes(tag)) {
        return;
      } else {
        this.dynamicTagsjob.push(tag);
      }
    },

    tradehandleCloseauto(tag) {
      this.dynamicTagstradeauto.splice(
        this.dynamicTagstradeauto.indexOf(tag),
        1
      );
    },
    arrchangeauto() {
      this.screenform.trade = this.dynamicTagstradeauto.join(",");
      this.tradeVisibleauto = false;
    },
    cancelarrchangeauto() {
      this.dynamicTagstradeauto = [];
      this.tradeVisibleauto = false;
    },
    showInputtradeauto(tag) {
      if (this.dynamicTagstradeauto.includes(tag)) {
        return;
      } else {
        this.dynamicTagstradeauto.push(tag);
      }
    },
    jobarrchangeauto() {
      this.screenform.skill = this.dynamicTagsjobauto.join(",");
      this.jobVisibleauto = false;
    },
    jobhandleCloseauto(tag) {
      this.dynamicTagsjobauto.splice(this.dynamicTagsjobauto.indexOf(tag), 1);
    },
    canceljobarrchangeauto() {
      this.dynamicTagsjobauto = [];
      this.jobVisibleauto = false;
    },
    showInputjobauto(tag) {
      if (this.dynamicTagsjobauto.includes(tag)) {
        return;
      } else {
        this.dynamicTagsjobauto.push(tag);
      }
    },
    //录入人才基本信息
    addFromInput() {
      let num = 0;
      for (let i in this.baseinfoForm) {
        if (this.baseinfoForm[i] !== "") {
          num++;
        } else {
          delete this.baseinfoForm[i];
        }
      }
      if (num != 0) {
        this.$http
          .get(api.position.addFromInput(), {
            params: {
              json: this.baseinfoForm,
              positionId: this.$route.query.id
            }
          })
          .then(
            res => {
              if (res.data.code == "911") {
                location.href = "./login.html";
              }
              if (res.data.code == "00") {
                this.$message({
                  type: "success",
                  message: this.$t('msg.msg11')
                });
                this.talentId = res.data.data;
                this.findById();
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
        this.$message({
          message: this.$t('msg.msg10'),
          type: "warning"
        });
      }
    },
    //工作经验
    addTabWorkExperience() {
      this.WorkExperienceform.push({});
    },
    removeTabWorkExperience(item) {
      var index = this.WorkExperienceform.indexOf(item);
      if (index !== -1) {
        this.WorkExperienceform.splice(index, 1);
      }
    },
    //保存工作经验
    saveWorkExperience() {
      // console.log(this.WorkExperienceform);
      if (this.talentId) {
        let num = 0;
        this.WorkExperienceform.forEach(el => {
          for (let i in el) {
            if (el[i] !== "") {
              num++;
            } else {
              delete el[i];
            }
          }
        });
        if (num > 0) {
          if (
            this.WorkExperienceform.every(
              el =>
                Date.parse(new Date(el.to)) - Date.parse(new Date(el.from)) >= 0
            )
          ) {
            this.WorkExperienceform.forEach(x => {
              x.talentId = this.$route.query.id;
            });
            this.$http
              .post(
                api.talent.saveWorkExperience() +
                  "?talentId=" +
                  this.$route.query.id,
                this.WorkExperienceform
              )
              .then(
                res => {
                  if (res.data.code == "911") {
                    location.href = "./login.html";
                  }
                  if (res.data.code == "00") {
                    // console.log(res);
                    this.$message({
                      message: this.$t('msg.msg11'),
                      type: "success"
                    });
                  }
                  if (res.data.code == "500") {
                    this.$message({
                      type: "error",
                      message: this.$t('msg.msg42')
                    });
                  }
                },
                error => {
                  console.log(error);
                }
              );
          } else {
            // console.log(this.WorkExperienceform);
            this.$message({
              type: "warning",
              message: this.$t('msg.msg43')
            });
          }
        } else {
          this.$message({
            type: "warning",
            message: this.$t('msg.msg48')
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: this.$t('msg.msg45')
        });
      }
    },

    //项目经验
    addTabProjectExperience() {
      this.ProjectExperienceform.push({});
    },
    removeTabProjectExperience(item) {
      var index = this.ProjectExperienceform.indexOf(item);
      if (index !== -1) {
        this.ProjectExperienceform.splice(index, 1);
      }
    },

    //保存项目经验
    saveProjectExperience() {
      if (this.talentId) {
        let num = 0;
        this.ProjectExperienceform.forEach(el => {
          for (let i in el) {
            if (el[i] !== "") {
              num++;
            } else {
              delete el[i];
            }
          }
        });
        if (num > 0) {
          if (
            this.ProjectExperienceform.every(
              el =>
                Date.parse(new Date(el.to)) - Date.parse(new Date(el.from)) >= 0
            )
          ) {
            this.ProjectExperienceform.forEach(x => {
              x.talentId = this.$route.query.id;
            });
            this.$http
              .post(
                api.talent.saveProjectExperience() +
                  "?talentId=" +
                  this.$route.query.id,
                this.ProjectExperienceform
              )
              .then(
                res => {
                  if (res.data.code == "911") {
                    location.href = "./login.html";
                  }
                  if (res.data.code == "00") {
                    // console.log(res);
                    this.$message({
                      message: this.$t('msg.msg11'),
                      type: "success"
                    });
                  }
                  if (res.data.code == "500") {
                    this.$message({
                      type: "error",
                      message: this.$t('msg.msg42')
                    });
                  }
                },
                error => {
                  console.log(error);
                }
              );
          } else {
            this.$message({
              type: "warning",
              message: this.$t('msg.msg43')
            });
          }
        } else {
          this.$message({
            type: "warning",
            message:this.$t('msg.msg49')
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: this.$t('msg.msg45')
        });
      }
    },

    //证书
    addTabtalentCertificates() {
      this.Skillsform.talentCertificates.push({});
    },
    removeTabtalentCertificates(item) {
      var index = this.Skillsform.talentCertificates.indexOf(item);
      if (index !== -1) {
        this.Skillsform.talentCertificates.splice(index, 1);
      }
    },
    //技能
    addTabtalentSkills() {
      this.Skillsform.talentSkills.push({});
    },
    removeTabtalentSkills(item) {
      var index = this.Skillsform.talentSkills.indexOf(item);
      if (index !== -1) {
        this.Skillsform.talentSkills.splice(index, 1);
      }
    },
    //培训经历
    addTabtrainingExperiences() {
      this.Skillsform.trainingExperiences.push({});
    },
    removeTabtrainingExperiences(item) {
      var index = this.Skillsform.trainingExperiences.indexOf(item);
      if (index !== -1) {
        this.Skillsform.trainingExperiences.splice(index, 1);
      }
    },
    //技能保存
    saveTalentSkill() {
      if (this.talentId) {
        let num = 0;
        for (let i in this.Skillsform) {
          this.Skillsform[i].forEach(el => {
            for (let j in el) {
              if (el[j] !== "") {
                num++;
              }
            }
          });
        }
        if (num > 0) {
          if (
            this.Skillsform.trainingExperiences.every(
              el =>
                Date.parse(new Date(el.endDate)) -
                  Date.parse(new Date(el.startDate)) >=
                0
            )
          ) {
            this.Skillsform.talentSkills.forEach(x => {
              x.talentId = this.$route.query.id;
            });
            this.Skillsform.talentCertificates.forEach(x => {
              x.talentId = this.$route.query.id;
            });
            this.Skillsform.trainingExperiences.forEach(x => {
              x.talentId = this.$route.query.id;
            });
            this.$http
              .post(
                api.talent.saveTalentSkill() +
                  "?talentId=" +
                  this.$route.query.id,
                this.Skillsform
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
                      message: this.$t('msg.msg11')
                    });
                  }
                  if (res.data.code == "500") {
                    this.$message({
                      type: "error",
                      message: this.$t('msg.msg42')
                    });
                  }
                },
                error => {
                  console.log(error);
                }
              );
          } else {
            this.$message({
              type: "warning",
              message: this.$t('msg.msg43')
            });
          }
        } else {
          this.$message({
            type: "warning",
            message:this.$t('msg.msg44')
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: this.$t('msg.msg45')
        });
      }
    },

    //附件
    //附件
    uploadPublic() {
      if (this.talentId) {
        this.$refs.upload.submit();
      } else {
        this.$message({
          type: "warning",
          message: this.$t('msg.msg45')
        });
      }
    },
    uploadsuccess(response, file, fileList) {
      // console.log(file, fileList);
      this.upnumList = fileList;
    },
    beforeUpload(file) {
      this.downloading = true;
      let fd = new FormData();
      fd.append("upfile", file);
      fd.append("name", file.name);
      fd.append("talentId", this.talentId);
      this.$http.post(api.talent.uploadPublic(), fd).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.numupload++;
            // console.log(this.numupload);
            if (this.numupload == this.upnumList.length) {
              this.downloading = false;
              this.$refs.upload.clearFiles();
              this.numupload = 0;
            }
            this.$message({
              type: "success",
              message: this.$t('msg.msg15')
            });
            this.findByTalentId();
          }
          if (res.data.code == "500") {
            this.$message({
              type: "error",
              message: this.$t('msg.msg16')
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    //id查附件
    findByTalentId() {
      this.$http
        .post(
          api.TalentAttachment.findByTalentId(),
          formatUrl({ talentId: this.talentId })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              for (var i = 0; i < res.data.data.length; i++) {
                res.data.data[i].uploadTime =
                  new Date(res.data.data[i].uploadTime).getFullYear() +
                  "-" +
                  (parseInt(new Date(res.data.data[i].uploadTime).getMonth()) +
                    1) +
                  "-" +
                  new Date(res.data.data[i].uploadTime).getDate();
              }
              this.TalentAttachmentData = res.data.data;
            }
            if (res.data.code == "500") {
              this.$message({
                type: "error",
                message: this.$t('msg.msg42')
              });
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    //附件删除
    //根据id删除对应人才信息
    deleteByTalentAttachmentIds() {
      var ids = this.TalentAttachmentsels.map(item => item.id).toString();
      this.$confirm(   this.$t("systemManagement.tip.contetn"),         this.$t("systemManagement.tip.title"), {
        type: "warning"
      })
        .then(() => {
          let para = { ids: ids };
          // console.log(ids);
          this.$http
            .post(api.TalentAttachment.deleteByIds(), formatUrl(para))
            .then(
              res => {
                if (res.data.code == "00") {
                  // console.log(res);

                  this.findByTalentId();
                  this.$message({
                    type: "success",
                    message: this.$t('msg.msg2')
                  });
                }
                if (res.data.code == "500") {
                  // console.log(res);
                  this.$message({
                    type: "error",
                    message: this.$t('msg.msg14')
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
    //下载附件
    downloadAttachment() {
      // console.log(this.TalentAttachmentsels);
      var arr = [];
      this.TalentAttachmentsels.forEach(function(value, index, array) {
        arr.push(value.url);

        // console.log(value);
      });
      mytools.allDownload(arr);
    },
    //详情
    handleRowHandle(row, event, column) {
      //   console.log(event);
      if (event.target.nodeName == "TD") {
        window.open("./talent.html#/pooldetail?id=" + row.id);
      }
    },
    linkdetail(v) {
      window.open("./talent.html#/pooldetail?id=" + v.row.id);
    },
    handleRowHandleprp(row, event, column) {
      // console.log(column);
      if (event.target.nodeName == "TD") {
        window.open(
          "./prp.html#/prpdetail?id=" + row.id + "&clientId=" + row.clientId
        );
        // console.log(row);
      }
    },
    linkprpdetail(v) {
      window.open(
        "./prp.html#/prpdetail?id=" + v.row.id + "&clientId=" + v.row.clientId
      );
    },
    handleCommand(command) {
      if (command == "screenFormVisible") {
        this.screenFormVisible = true;
        this.positionscreenForm = {};
        this.dynamicTags = [];
        this.screendynamicTagsjob = [];
        this.screendynamicTagstrade = [];
        // this.searchcontent = "";
      }
      if (command == "personnelFormVisible") {
        this.personnelFormVisible = true;
        this.talentId = "";
        this.dynamicTagstrade = [];
        this.dynamicTagsjob = [];
        this.baseinfoForm = {};
        this.TalentAttachmentData = [];
        this.fileList = [];
        //工作经验
        this.WorkExperienceform = [{}];
        //项目经验
        this.ProjectExperienceform = [{}];
        //技能
        this.Skillsform = {
          talentCertificates: [{}],
          talentSkills: [{}],
          trainingExperiences: [{}]
        };
      }
      if (command == "needFormVisible") {
        this.needFormVisible = true;
        this.dynamicTagsneeds = [];
        this.dynamicTagstradeauto = [];
        this.dynamicTagsjobauto = [];
        this.screenform = {};
      }
    },
    //重新发送测评
    resendEvaluation(v) {
      // console.log(v);
      this.$http
        .post(api.prp.resendEvaluation(), formatUrl({ id: v.row.id }))
        .then(
          res => {
            if (res.data.code == "00") {
              // console.log(res);
              this.$message({
                type: "success",
                message:this.$t('msg.msg22')
              });
              this.findById();
              // this.emailform.mailContent = res.data.data.tpContent;
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
    tableRowClassName({ row, rowIndex }) {
      if (row.isPosition == 0) {
        return "";
      }
      return "warning-row";
      // console.log(row);
    },
    isSelect(row, index) {
      if (row.isPosition == 0) {
        return true;
      }
      return false;
    },
    dataFormat(row, column) {
      // console.log(row);
      return `${row.matching}%`;
    },
    // expsort(a, b) {
    //   console.log(a, b);
    // },
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      if (column.label == "个人测评"||column.label =="Personal assessment") {
        if (row.evaluationStatus == "未发送") {
          return "";
        } else if (row.evaluationStatus == "已发送") {
          return "blue-cell";
        } else {
          return "green-cell";
        }
      }
    },
    showInput(x, tag) {
      if (this.cc) {
        if (this.dynamicTags.includes(`${this.cc}-${x}-${tag}`)) {
          return;
        } else {
          if (x === tag) {
            if (this.sameArr.includes(`${this.cc}-${x}`)) {
              return;
            } else {
              this.dynamicTags.push(`${this.cc}-${x}`);
              this.sameArr.push(`${this.cc}-${x}`);
            }

            return;
          } else {
            this.dynamicTags.push(`${this.cc}-${x}-${tag}`);
          }
        }
      } else {
        if (this.dynamicTags.includes(`${x}-${tag}`)) {
          return;
        } else {
          if (x === tag) {
            if (this.sameArr.includes(`${x}`)) {
              return;
            } else {
              this.dynamicTags.push(`${x}`);
              this.sameArr.push(`${x}`);
            }
          } else {
            this.dynamicTags.push(`${x}-${tag}`);
          }
        }
      }
    },
    handleClose(tag) {
      // console.log(tag);
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.sameArr.splice(this.sameArr.indexOf(tag), 1);
    },
    suredynamicTags() {
      this.positionscreenForm.residence = this.dynamicTags.join(",");
      this.hotVisible = false;
    },
    canceldynamicTags() {
      this.dynamicTags = [];
      this.hotVisible = false;
    },

    findAreaByCityIdhot3(item) {
      this.cc = "";
      this.cityData = [];
      let { id, cityName } = item;
      this.$http
        .post(api.talent.findAreaByCityId(), formatUrl({ cityId: id }))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.areaDatahot3 = res.data.data;
              // this.dynamicTags = this.areaDatahot;
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
    findAreaByCityId3(item) {
      let { id, cityName } = item;
      this.$http
        .post(api.talent.findAreaByCityId(), formatUrl({ cityId: id }))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.areaData3 = res.data.data;
              // item.visibile2 = true;
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
    //删除备注
    deleteHistoryStatus(para) {
      // console.log(para);
      this.$confirm(   this.$t("systemManagement.tip.contetn"),         this.$t("systemManagement.tip.title"), {
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(
              api.TalentHistoryStatus.deleteHistoryStatus(),
              formatUrl({ id: para.row.id })
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  // console.log(res);
                  // para.row.id = para.row.talentId;
                  // console.log(para);
                  this.findByTalentIdTalentHistoryStatus(para.row.talentId);
                  this.$message({
                    type: "success",
                    message: this.$t('msg.msg2')
                  });
                }
                if (res.data.code == "500") {
                  // console.log(res);
                  this.$message({
                    type: "error",
                    message: this.$t('msg.msg14')
                  });
                }
              },
              error => {
                console.log(error);
              }
            );
        })
        .catch(() => {});
    }
  }
};
</script>
<style>
.el-dialog__body {
  text-align: left;
}

.resultform a {
  padding: 10px;
}

.emailmodel.el-select {
  width: 100%;
}

.remarkbox {
  position: relative;
}

.remarkbox .sure {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5%;
}

.statusTop {
  overflow: hidden;
  margin: 20px 0;
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
}

.statusTop .el-form-item__content {
  text-align: left;
}

.statusTop .el-select {
  margin-left: 20px;
}

/* 筛选 */

.work .el-input,
.age .el-input,
.education .el-select,
.money .el-input {
  width: 45%;
  float: left;
}

.work .el-input:nth-child(2),
.age .el-input:nth-child(2),
.education .el-select:nth-child(2),
.money .el-input:nth-child(2) {
  margin-left: 20%;
}

.line {
  width: 7%;
  height: 2px;
  background-color: #d8dce5;
  float: left;
  margin: 17px 1% 0;
}

.el-radio__inner {
  width: 20px;
  height: 20px;
}

.languageradio .el-radio-group {
  float: left;
  margin-top: 10px;
}

.test .el-form-item {
  margin-bottom: 10px;
}

/* .test {
  padding-left: 90px;
} */

.firsttest {
  text-align: left;
  /* position: absolute; */
  margin-top: 7px;
}

.test2 {
  margin-top: 20px;
}

.test2 .el-radio + .el-radio {
  margin-left: 0;
}

.test2 .el-radio {
  float: left;
  width: 40%;
  text-align: left;
  margin-right: 10%;
  margin-top: 10px;
}

.test2 .el-radio-group {
  position: absolute;
  left: 0;
  margin-left: 90px;
}

.test2 .el-form-item {
  height: 100px;
}

.baseinfo {
  overflow: hidden;
}

.baseinfo .el-form-item {
  width: 50%;
  float: left;
  height: 40px;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.baseinfo .el-form-item__label {
  text-align: right;
}

.baseinfo .el-select {
  width: 100%;
}

.baseinfo .keyword {
  width: 100%;
}

.baseinfo .el-form-item__content {
  overflow: hidden;
}

.attachment {
  overflow: hidden;
}

.attachment button {
  float: right;
  margin: 20px 0 20px 20px;
}

.upload-demo {
  overflow: hidden;
  position: relative;
}

.el-upload {
  position: absolute;
  right: 100px;
}

.chuanbutton,
.youbutton {
  float: right;
  padding: 10px 25px;
}

.el-upload-list {
  width: 60%;
  float: left;
  /* margin-top: -45px; */
}

.el-upload-list li {
  border: 1px solid #ccc;
}

.productcontent {
  border: 1px solid #878d99;
  padding: 15px;
  margin-top: 20px;
}

.experience,
.product,
.skill {
  padding-left: 30px;
}

.mytalent .savetabbutton {
  text-align: center;
  margin-top: 20px;
}

.el-tabs__content {
  position: relative;
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

.provincedialog .el-dialog__body {
  padding: 20px 0;
}

.provincedialog .el-button {
  padding: 6px 20px;
  border: none;
  width: 20%;
  text-align: left;
}

.provinceList {
  overflow: hidden;
  padding: 0;
}
.provinceListChild .el-button{
  color: #239838
}
.cityList {
  margin: 20px;
  color: #249739;
  font-size: 14px;
}

.areaList {
  margin: 20px;
  font-size: 12px;
}

.areaListhot li {
  width: 50%;
  text-align: left;
  float: left;
  list-style: none;
  cursor: pointer;
}

.areaListhot li:hover {
  color: #249739;
}

.provinceList li {
  /* width: 60px; */
  text-align: left;
  float: left;
  width: 25%;
  list-style: none;
  /* margin-left: 20px; */
  cursor: pointer;
  padding: 6px 20px;
  box-sizing: border-box
}

.areaList li,
.cityList li {
  padding: 0 10px;
  text-align: left;
  float: left;
  list-style: none;
  margin-left: 20px;
  cursor: pointer;
}

.provinceList li:hover {
  color: #249739;
}

.cityList li,
.areaList li {
  margin: 0 20px 0 0;
}

.el-cascader {
  width: 100%;
}

.tradedialog .el-dialog {
  min-width: 840px;
}

.tradedialog .el-dialog__body {
  padding-left: 10px;
}

.tradeList {
  overflow: hidden;
  margin-bottom: 10px;
}

.tradeList .el-checkbox-button__inner {
  width: 100%;
  border: 1px solid #dcdfe6;
}

.tradeList .el-checkbox-button {
  width: 30%;
  margin-right: 3%;
  margin-bottom: 1%;
}

.el-checkbox-button--medium .el-checkbox-button__inner {
  padding: 10px;
  font-size: 12px;
}

.tradeList li {
  width: 33%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
}

.tradebig {
  /* float: left; */
  font-size: 14px;
  font-weight: 700;
  /* width: 30%; */
  text-align: left;
  padding: 10px 0;
}

.tradesmall {
  float: left;
  width: 100%;
}

.tradesmall .el-button--mini {
  width: 50%;
  float: left;
}

.el-button--mini {
  padding: 7px 0;
  float: left;
  width: 50%;
  margin-left: 0;
}

.tradesmall .el-button + .el-button {
  margin: 0;
}

.tradebigul {
  float: right;
  width: 75%;
}

.areabigul,
.jobbigul {
  float: left;
}

.areabigul .el-checkbox-button:first-child .el-checkbox-button__inner {
  color: #fff;
  background-color: #249739;
}

.areabigul .el-checkbox-button__inner,
.jobbigul .el-checkbox-button__inner {
  padding: 5px;
  border: none;
}

.jobbigul .el-checkbox-button:first-child .el-checkbox-button__inner,
.areabigul .el-checkbox-button:first-child .el-checkbox-button__inner {
  border: none;
}

.jobbigul .el-checkbox-button {
  width: 100%;
}

.jobname {
  width: 30%;
  margin-right: 3%;
  margin-bottom: 1%;
  float: left;
}

.jobbig .jobLi .el-button {
  width: 50%;
  float: left;
}

.tradeList .jobname:hover {
  color: #249739;
}

.jobbig {
  float: left;
  width: 100%;
}

.el-popover {
  width: 40%;
  min-width: 450px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.el-popover button  span{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.el-input-group {
  width: 100%;
}

.birthday .el-form-item__content .block {
  width: 58%;
  float: left;
}

.birthday .el-form-item__content .el-select {
  width: 40%;
  float: right;
}

.el-table .cell {
  text-align: center;
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
  width: 190px;
  font-size: 24px;
}

.prp_top .el-input {
  width: 280px;
  float: left;
}

.evaResultdialog .el-dialog {
  min-width: 700px;
}

.el-radio.saleperson {
  display: block;
  margin-bottom: 15px;
  margin-left: 0;
}

.el-select.sellerId {
  float: left;
  width: 80%;
}

.sellerId .el-input__suffix {
  display: none;
}

.positiondialog .el-form-item.is-required .el-form-item__label:before {
  display: none;
}

/* action */

.positiondetail {
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

.hasneed {
  margin-left: 10px;
}

.sale .el-input {
  width: 80%;
  float: left;
}

.sale button {
  width: 15%;
  float: left;
  margin-left: 5%;
}

.result {
  overflow: hidden;
  margin: 20px 0;
  padding: 0 30px;
}

.result button {
  margin-left: 20px;
}

#Candidatetable .warning-row td {
  background: oldlace;
}

.residencetitle {
  color: #249739;
  padding-left: 20px;
  font-weight: 700;
  font-size: 16px;
  margin: 16px 0;
  text-align: left;
}
.residenceul{
  height: 500px;
  overflow-y: scroll
}
.hotcityLi .el-button--mini {
  padding: 7px 0;
  float: left;
  width: 50%;
  margin-left: 0;
}

.el-popper .el-button + .el-button {
  margin-left: 0;
}

.provincedialog .el-dialog__body {
  text-align: left;
}

.surebutton {
  text-align: center;
}

.surebutton .el-button {
  text-align: center;
  padding: 12px 20px;
}

.green-cell {
  color: #249739;
}

.blue-cell {
  color: #00a7b9;
}

.newestselect .el-input--suffix .el-input__inner {
  padding-right: 10px;
}

.modelban .el-select {
  width: 100%;
}

.el-table__column-filter-trigger i {
  color: red;
  font-size: 18px;
  transform: scale(1);
}

.remarkdialog .el-dialog {
  min-width: 820px;
}

.recomtable.el-table,
.recomtable.el-table .cell,
.recomtable.el-table .el-table__body-wrapper {
  overflow: visible;
}

.statusselcet {
  left: 0 !important;
}

.maintipword {
  color: #c0c4cc;
}

.downreport .el-select {
  width: 100%;
}
.resultform .tagcell .cell {
  text-align: left;
  padding-left: 90px;
  position: relative;
}
.resultform .cell .el-tag--success {
  position: absolute;
  top: 0;
  left: 10px;
}

</style>


