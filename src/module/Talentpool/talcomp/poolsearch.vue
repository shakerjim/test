<template>
  <div class="talentmain">
    <div class="main_top">
      <div class="main_left">
        <el-button type="success" class="searchbutton green" @click="backpool">{{$t('btn.back')}}</el-button>
      </div>
    </div>

    <div class="tablelist">
      <!-- <div class="title">
        Centalent >
        <span>人才库列表页</span>

      </div> -->
       <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item>
          <a href="./news.html">Centalent</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('talentPool.talentPage')}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="tablebox">
        <div class="listbox">
          <div class="listword">{{$t('talentPool.talentList')}}</div>
          <div class="listbutton">
            <el-button type="success" @click="getHEResultList" v-if="this.$store.state.Privilege.includes('BUTTON_TALENT_KEYHE')" class="green">{{$t('screenTool.one')}}</el-button>
            <el-button :disabled="this.sels.length===0" @click="deleteByIds" v-if="this.$store.state.Privilege.includes('BUTTON_TALENT_DELETE')">{{$t('btn.delete')}}
              <i class="el-icon-close el-icon--right"></i>
            </el-button>
            <!--发送测评弹出框-->
            <el-button @click="sendemail('emailform')" :disabled="this.sels.length===0" v-if="this.$store.state.Privilege.includes('BUTTON_TALENT_EVALUATION_SEND')">{{$t('btn.send')}}
              <i class="el-icon-my-weibiaoti40 el-icon--right"></i>
            </el-button>

          </div>
        </div>
        <!--表格-->
        <el-table ref="multipleTable" :data="talentData.content" tooltip-effect="dark" row-key="id" style="width: 100%" stripe @row-click='handleRowHandle' @selection-change="selsChange" v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type="selection" width="55" prop="id" :reserve-selection="true">
          </el-table-column>
          <el-table-column prop="name" :label="$t('talentPool.tip.name')" >
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="linkdetail(scope)">{{scope.row.name||$t('login.noname')}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="company" :label="$t('talentPool.tip.company')" >
          </el-table-column>
          <el-table-column prop="job" :label="$t('talentPool.tip.position')"  v-if="!paralang">
          </el-table-column>
          <el-table-column prop="trade" :label="$t('news.positonNews.trade')"  v-if="!paralang">
          </el-table-column>
          <el-table-column prop="residence" :label="$t('news.positonNews.city')"  v-if="!paralang">
          </el-table-column>
          <el-table-column prop="jobEn" :label="$t('talentPool.tip.position')" v-if="paralang">
          </el-table-column>
          <el-table-column prop="tradeEn" :label="$t('news.positonNews.trade')" v-if="paralang">
          </el-table-column>
          <el-table-column prop="residenceEn" :label="$t('news.positonNews.city')" v-if="paralang">
          </el-table-column>
          <el-table-column prop="hopeSalary" :label="$t('news.positonNews.hopeSalary')" >
          </el-table-column>
          <el-table-column prop="age" :label="$t('news.positonNews.age')" >
          </el-table-column>
          <el-table-column prop="degree" :formatter="degreeFormat" :label="$t('news.positonNews.higheducation')" >
          </el-table-column>
          <el-table-column prop="experience" :label="$t('news.positonNews.experience')" >
          </el-table-column>
          <el-table-column prop="evaluationStatusShow" :label="$t('news.positonNews.ics')" >
          </el-table-column>
          <el-table-column prop="status" :label="$t('news.positonNews.newStatus')" :formatter="posFormat">
          </el-table-column>
          <el-table-column prop="updateTimeShow" :label="$t('news.positonNews.updateTime')" >
          </el-table-column>

        </el-table>
        <!--分页-->
        <div class="block">
          <el-pagination popper-class="testclass" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="talentData.size" layout="total, sizes, prev, pager, next, jumper" :total="talentData.totalElements">
          </el-pagination>
        </div>
      </div>

    </div>
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
    <!--发送测评弹出框-->

      <el-dialog :visible.sync="dialogFormVisible" center width="30%" @close="closedialog('emailform')" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="emailform" ref="emailform" :rules="formrules" status-icon>
        <el-form-item :label="$t('ics.email.lang')" :label-width="formLabelWidth" prop="language">
          <el-radio-group v-model="emailform.language">
            <el-radio label="cn">{{$t('ics.email.cn')}}</el-radio>
            <el-radio label="en">{{$t('ics.email.en')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('ics.email.model')" :label-width="formLabelWidth" prop="mailId">
          <el-select v-model="emailform.mailId" :placeholder="$t('valid.valid009')" @change="check(emailform.mailId,'templetform')">
            <el-option :label='$t("valid.valid043")+(index+1)+"---"+ item.tpName' :value="item.id" v-for="(item,index) in emailmodelform" :key="index"></el-option>
            <el-option :label="$t('systemManagement.email.addmodel')" :value="'添加模板'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="mailContent">
          <quill-editor v-model="emailform.mailContent" ref="myQuillEditor" class="editer" disabled>
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" class="green" @click="sendPersonalEvaluation('emailform')" :loading="buttonloading">{{$t('btn.suresend')}}</el-button>
        <el-button @click="resetForm('emailform')">{{$t('btn.cancel')}}</el-button>
      </div>
    </el-dialog>

    <!--导入人才-->

  <el-dialog :visible.sync="personnelFormVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" class="mytalent">
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
          <el-button slot="reference" @click="findAreaByCityIdhot(item)">{{item.cityName}}</el-button>
          <el-button @click="showInputres(item.cityName,item.cityName,cc)" class="button-new-tag" size="mini">{{item.cityName}}</el-button>
          <el-button v-for="(x,y) in areaDatahot" :key="y" class="button-new-tag" size="mini" @click="showInputres(item.cityName,x.areaName)">{{x.areaName}}</el-button>
        </el-popover>

        <div class="residencetitle">{{$t('talentPool.tip.allp')}}</div>

        <ul class="provinceList">
          <li v-for="(item,index) in allProvince" :key="index" @click="findCityByProvinceId(item)">{{item.provinceName}}</li>
        </ul>
        <el-popover v-for="(item) in cityData" :key="item.cityName" class="hotcityLi" placement="right-end" trigger="click">
          <el-button slot="reference" @click="findAreaByCityId(item)">{{item.cityName}}</el-button>
          <el-button @click="showInputres(item.cityName,item.cityName,cc)" class="button-new-tag" size="mini">{{item.cityName}}</el-button>
          <el-button v-for="(x,y) in areaData" :key="y" class="button-new-tag" size="mini" @click="showInputres(item.cityName,x.areaName)">{{x.areaName}}</el-button>
        </el-popover>
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
          <el-button slot="reference" @click="findAreaByCityIdhot(item)">{{item.cityName}}</el-button>
          <el-button @click="showInputhos(item.cityName,item.cityName,cc)" class="button-new-tag" size="mini">{{item.cityName}}</el-button>
          <el-button v-for="(x,y) in areaDatahot" :key="y" class="button-new-tag" size="mini" @click="showInputhos(item.cityName,x.areaName)">{{x.areaName}}</el-button>
        </el-popover>

        <div class="residencetitle">{{$t('talentPool.tip.allp')}}</div>

        <ul class="provinceList">
          <li v-for="(item,index) in allProvince" :key="index" @click="findCityByProvinceId(item)">{{item.provinceName}}</li>
        </ul>
        <el-popover v-for="(item) in cityData" :key="item.cityName" class="hotcityLi" placement="right-end" trigger="click">
          <el-button slot="reference" @click="findAreaByCityId(item)">{{item.cityName}}</el-button>
          <el-button @click="showInputhos(item.cityName,item.cityName,cc)" class="button-new-tag" size="mini">{{item.cityName}}</el-button>
          <el-button v-for="(x,y) in areaData" :key="y" class="button-new-tag" size="mini" @click="showInputhos(item.cityName,x.areaName)">{{x.areaName}}</el-button>
        </el-popover>
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
        <ul>
          <li v-for="(item,index) in tradeList" :key="index" class="tradeList">
            <div class="tradebig">{{item.tradeName}}</div>
            <div class="tradesmall">
              <el-button v-for="(v,i) in item.appTrades" :label="v.tradeName" :key="i" class="button-new-tag" size="mini" @click="showInputtrade(v.tradeName)">{{v.tradeName}}</el-button>
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
        <ul>
          <li v-for="(item,index) in jobList" :key="index" class="tradeList">
            <div class="tradebig">{{item.jobName}}</div>
            <div class="jobbig">
              <el-popover v-for="(v,i) in item.appJobs" :key="i" class="jobLi" placement="right-end" trigger="click">
                <el-button slot="reference">{{v.jobName}}</el-button>
                <el-button :label="v.jobName" class="button-new-tag" size="mini" @click="showInputjob(v.jobName)">{{v.jobName}}</el-button>
                <el-button v-for="(x,y) in v.appJobs" :label="x.jobName" :key="y" class="button-new-tag" size="mini" @click="showInputjob(x.jobName)">{{x.jobName}}</el-button>
              </el-popover>
            </div>
          </li>
        </ul>
      </el-dialog>

      <el-tabs type="border-card">
        <el-tab-pane :label="$t('talentPool.tip.tab01')">
          <el-form :model="baseinfoForm" class="baseinfo" label-width="120px">
            <el-form-item :label="$t('recruitSystem.tip.name')" style="float: left">
              <el-input v-model.trim="baseinfoForm.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.birth')" style="float: left" class="birthday">
              <div class="block">
                <el-date-picker :editable="false" v-model.trim="baseinfoForm.birthday" type="date" :placeholder="$t('talentPool.tip.chooseDate')" format="yyyy-MM-dd" value-format="yyyy年MM月dd日">
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
            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.arrivalTime')">
              <div class="block">
                <el-date-picker :editable="false" v-model.trim="baseinfoForm.hopeTime" type="date" :placeholder="$t('talentPool.tip.chooseDate')" format="yyyy年MM月dd日" value-format="yyyy年MM月dd日" :picker-options="pickerOptionsarrive">
                </el-date-picker>
              </div>

            </el-form-item>
            <el-form-item :label="$t('talentPool.tip.keyword')" class="keyword">
              <el-input v-model.trim="baseinfoForm.keywords" :placeholder="$t('talentPool.tip.comma')" width="100%">
              </el-input>
            </el-form-item>
          </el-form>
          <div class="savetabbutton">
              <el-button type="success green" style="margin-top:20px" @click="saveTalentPool">{{$t('btn.save')}}</el-button>
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
              <el-form ref="WorkExperienceform" :model="WorkExperienceform[index]" label-width="80px">
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
                <el-form-item label="$t('talentPool.tip.company')" style="width:45%;float:left">
                  <el-input v-model.trim="WorkExperienceform[index].company"></el-input>
                </el-form-item>
                <el-form-item label="$t('talentPool.tip.situation')" style="width:45%;float:right">
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
              <el-form ref="ProjectExperienceform" :model="ProjectExperienceform[index]" label-width="80px">
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
                <el-form ref="talentCertificatesform" :model="Skillsform.talentCertificates[index]" label-width="80px">
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
                <el-form ref="talentSkillsform" :model="Skillsform.talentSkills[index]" label-width="80px">
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
                <el-form ref="trainingExperiencesform" :model="Skillsform.trainingExperiences[index]" label-width="80px">
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

  </div>
</template>
<script>
import api from "../../../api/api.js";
import { quillEditor } from "vue-quill-editor";
import Util from "../../../tool/tool.js";
import formatUrl from "../../../lib/tool.js";
let mytools = new Util();
import Cookies from "js-cookie";
export default {
  data() {
  var validateLanguage = (rule, value, callback) => {
      if (value == "") {
        callback(new Error(this.$t("valid.valid011")));
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
      paralang:true,
      pickerOptionsarrive: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 <= Date.now();
        }
      },
      listLoading: true,
      dialogFormVisibleadd: false,
      templetform: {
        tpName: "",
           content: `<p>${this.$t("valid.valid046")}</p>`
      },
      templetformrules: {
        tpName: [{ validator: validatetpName, trigger: "blur" }],
        content: [{ validator: validatecontent, trigger: "blur" }]
      },
      screendynamicTagstrade: [],
      screendynamicTagsjob: [],
      dynamicTagstrade: [],
      dynamicTagsjob: [],
      cc: "",
      dynamicTags: [],
      sameArr: [],
      dynamicTagsres: [],
      dynamicTagshos: [],
      //居住地
      provinceres: "",
      innerVisible: false,
      hotCity: [],
      areaDatahot: [],
      cityData: [],
      areaData: [],
      //行业
      screentradeVisible: false,
      //职位
      screenjobVisible: false,
      screenForm: {},
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
      //国籍
      provincehos: "",
      householdVisible: false,
      // hotCity2: [],
      // areaDatahot2: [],
      // cityData2: [],
      upnumList: [],
      numupload: 0,
      downloading: false,
      baseAction: BASE_URL + "/icsserver/TalentAttachment/uploadPublic",
      upLoadData: {},
      talentId: "",
      areaDatahot3: [],
      //发送邮件
      emailform: {
        language: "",
        mailId: "",
        mailContent: ""
      },
      formrules: {
        language: [{ validator: validateLanguage, trigger: "change" }],
        mailId: [{ validator: validateMailId, trigger: "change" }]
      },
      emailmodelform: [],
      buttonloading: false,
      dialogFormVisible: false,
      sels: [], //列表选中列
      TalentAttachmentsels: [],

      tradeVisible: false,
      jobVisible: false,
      tradeList: [],
      jobList: [],
      areaData3: [],
      //省份
      hotVisible: false,
      allProvince: [],
      //项目经验
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
        prepickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
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
           screenoptions: [
        // {
        //   value: null,
        //   label: "不限"
        // },
        {
          value: "1",
            label: this.$t('api.tal.a2')
        },
        {
          value: "2",
          label: this.$t('api.tal.a3')
        },
        {
          value: "3",
              label: this.$t('api.tal.a4')
        },
        {
          value: "4",
          label: this.$t('api.tal.a5')
        },
        {
          value: "5",
                 label:this.$t('api.tal.a6')
        },
        {
          value: "6",
          label: this.$t('api.tal.a7')
        },
        {
          value: "7",
            label: this.$t('api.tal.a8')
        }
      ],
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
      //筛选框
      tabPosition: "left",
      screenFormVisible: false,

      //人才库表格
      talentData: {},
      page: 0,
      size: 20,
      search: "",
      //分页
      currentPage1: 1,
      baseinfoForm: {},
      formLabelWidth: "120px",
      upfile: "",
      name: ""
    };
  },
  created() {
    document.title = `${this.$t("sidebar.talentPool")}`;
    this.getlang();
    this.findProvince();
    this.findCityByStatus();
    this.findTalentPools();
    // this.findAppMailTemp();
    this.findJob();
    this.findTrade();
  },
  components: {
    quillEditor
  },
  methods: {
    getlang(){
      if(Cookies.get("language")=='zh'){
        this.paralang=false
      }else{
        this.paralang=true
      }
    },
           //职位候选人状态
    posFormat(row, column) {
      switch (row.status) {
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
    //导入人才
    importTalent() {
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
      this.personnelFormVisible = true;
    },
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
      // this.cityData2 = [];
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
    //居住地

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
      this.provinceres = item.provinceName;
      this.provincehos = item.provinceName;
      this.areaData = [];

      let { id, provinceName } = item;

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
                this.dynamicTagsres.length < 1
                  ? this.dynamicTagsres.push(item.provinceName)
                  : "";
                this.dynamicTagshos.length < 1
                  ? this.dynamicTagshos.push(item.provinceName)
                  : "";
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
      this.cc = item.provinceName;
      this.areaData3 = [];

      let { id, provinceName } = item;

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
                if (this.sameArr.includes(item.provinceName)) {
                  return;
                } else {
                  this.dynamicTags.push(item.provinceName);
                  this.sameArr.push(item.provinceName);
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
      this.dynamicTagsres.splice(this.dynamicTagsres.indexOf(tag), 1);
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
      this.dynamicTagshos.splice(this.dynamicTagshos.indexOf(tag), 1);
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
    //发送邮件
    sendemail(formName) {
      // this.buttonloading = false;
      this.findAppMailTemp();
      this.dialogFormVisible = true;
    },
    //发送测评
    sendPersonalEvaluation(formName) {
      // var ids = this.sels.map(item => item.id).toString();
      var _this = this;
      var para = {
        language: this.emailform.language,
        mailId: this.emailform.mailId,
        mailContent: this.emailform.mailContent,
        ids: this.sels.map(item => item.id).toString()
      };
      // console.log(para);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.buttonloading = true;
          this.$http
            .post(api.talent.sentPersonalEvaluation(), formatUrl(para))
            .then(
              res => {
                // this.buttonloading=true
                if (res.data.code == "500") {
                  _this.$message({
                    type: "err",
                    message: res.data.errMessage
                  });
                  this.buttonloading = false;
                }
                if (res.data.code == "00") {
                  // console.log(res);
                  this.buttonloading = false;
                  this.dialogFormVisible = false;
                  _this.$refs[formName].resetFields();
                  this.$message({
                    type: "success",
                        message: this.$t('msg.msg9')
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
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.dialogFormVisible = false;
    },
    selsChange: function(sels) {
      this.sels = sels;
      this.$store.state.sels = sels;
      console.log(sels);
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

    screenjobhandleClose(tag) {
      this.screendynamicTagsjob.splice(
        this.screendynamicTagsjob.indexOf(tag),
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
    showInputscreenjob(tag) {
      if (this.screendynamicTagsjob.includes(tag)) {
        return;
      } else {
        this.screendynamicTagsjob.push(tag);
      }
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

    //分页显示人才信息
    findTalentPools() {
      // console.log(this.$store.state.screenForm);
      // var para=this.$store.state.screenForm;
      // if(para)
      this.listLoading = true;
      let para = localStorage.getItem("condition");
      para = JSON.parse(para);
      // console.log(para);
      this.$http.post(api.talent.search4ES(), formatUrl(para)).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.listLoading = false;

            // console.log(this.$store.state.screenForm);
            var idList = [];
            res.data.data.content.forEach(el => {
              el.updateTimeShow = el.updateTimeShow
                ? el.updateTimeShow
                : new Date(el.createTime).getFullYear() +
                  "-" +
                  (parseInt(new Date(el.createTime).getMonth()) + 1) +
                  "-" +
                  new Date(el.createTime).getDate();
              idList.push(el.id);
            });
            this.talentData = res.data.data;
            console.log(this.talentData);
            localStorage.setItem("poolids", JSON.stringify(idList));
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
    //分页
    handleSizeChange(val) {
      let para = JSON.parse(localStorage.getItem("condition"));
      para.pageSize = val;
      localStorage.setItem("condition", JSON.stringify(para));
      // this.$store.state.screenForm.pageSize = val;
      this.findTalentPools();
    },
    handleCurrentChange(val) {
      let para = JSON.parse(localStorage.getItem("condition"));
      // console.log(para)
      para.pageIndex = val - 1;
      localStorage.setItem("condition", JSON.stringify(para));
      // this.$store.state.screenForm.pageIndex = val - 1;
      this.findTalentPools();
    },
    //删除人才信息
    //删除用户
    deleteByIds() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm(this.$t("systemManagement.tip.contetn"),         this.$t("systemManagement.tip.title"), {
        type: "warning"
      })
        .then(() => {
          // this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          // console.log(ids);
          this.$http.post(api.talent.deleteByIds(), formatUrl(para)).then(
            res => {
              if (res.data.code == "00") {
                // console.log(res);
                this.findTalentPools();
                this.sels = [];
                this.$message({
                  type: "success",
                            message: this.$t('msg.msg2')
                });
              }
              if (res.data.code == "500") {
                console.log(res);
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
      this.dynamicTagstrade = [];
      this.dynamicTagstrade.push(tag);
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
      this.dynamicTagsjob = [];
      this.dynamicTagsjob.push(tag);
    },

    //录入人才基本信息
    saveTalentPool() {
      let num = 0;
      for (let i in this.baseinfoForm) {
        if (this.baseinfoForm[i] !== "") {
          num++;
        } else {
          delete this.baseinfoForm[i];
        }
      }
      if (num != 0) {
        this.$http.post(api.talent.saveTalentPool(), this.baseinfoForm).then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              this.$message({
                type: "success",
                    message:this.$t('msg.msg11')
              });

              this.personnelFormVisible = false;
              this.talentId = res.data.data;
              this.findTalentPools();
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
                message:this.$t('msg.msg10'),
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
      // console.log(this.talentId);
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
          for (var i = 0; i < this.WorkExperienceform.length; i++) {
            this.WorkExperienceform[i].talentId = this.talentId;
          }
          this.$http
            .post(
              api.talent.saveWorkExperience() + "?talentId=" + this.talentId,
              this.WorkExperienceform
            )
            .then(
              res => {
                if (res.data.code == "911") {
                  location.href = "./login.html";
                }
                if (res.data.code == "00") {
                  this.$message({
                      message:this.$t('msg.msg11'),
                    type: "success"
                  });
                  // console.log(res);
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
                message: this.$t('msg.msg48')
          });
        }
      } else {
        this.$message({
          type: "warning",
       message:this.$t('msg.msg45')
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
          for (var i = 0; i < this.ProjectExperienceform.length; i++) {
            this.ProjectExperienceform[i].talentId = this.talentId;
          }
          this.$http
            .post(
              api.talent.saveProjectExperience() + "?talentId=" + this.talentId,
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
          for (var i = 0; i < this.Skillsform.talentSkills.length; i++) {
            this.Skillsform.talentSkills[i].talentId = this.talentId;
          }
          for (var i = 0; i < this.Skillsform.talentCertificates.length; i++) {
            this.Skillsform.talentCertificates[i].talentId = this.talentId;
          }
          for (var i = 0; i < this.Skillsform.trainingExperiences.length; i++) {
            this.Skillsform.trainingExperiences[i].talentId = this.talentId;
          }
          // console.log(this.Skillsform);
          this.$http
            .post(api.talent.saveTalentSkill() + "?talentId=" + this.talentId)
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
      this.upnumList = fileList;
    },
    beforeUpload(file) {
      // if (this.talentId) {
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
            console.log(this.numupload);
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
      this.$confirm(this.$t("systemManagement.tip.contetn"),         this.$t("systemManagement.tip.title"), {
        type: "warning"
      })
        .then(() => {
          // this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          console.log(ids);
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
                  console.log(res);
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
      // console.log(event);
      if (event.target.nodeName == "TD") {
        window.open("talent.html#/pooldetail?id=" + row.id);
      }
    },
    linkdetail(v) {
      window.open("./talent.html#/pooldetail?id=" + v.row.id);
    },
    //一键HE
    getHEResultList() {
      this.$http.post(api.talent.getHEResultList()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.$message({
              type: "success",
 message:this.$t('msg.msg28')
            });
          }
          if (res.data.code == "500") {
            this.$message({
              type: "error",
             message: this.$t('msg.msg50')
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    //筛选
    cancelscreenForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.screenForm = {};
      this.dynamicTags = [];
      this.screendynamicTagstrade = [];
      this.screendynamicTagsjob = [];
      this.screenFormVisible = true;
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
      console.log(tag);
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.sameArr.splice(this.sameArr.indexOf(tag), 1);
    },
    suredynamicTags() {
      this.screenForm.residence = this.dynamicTags.join(",");
      this.hotVisible = false;
    },
    canceldynamicTags() {
      this.dynamicTags = [];
      this.hotVisible = false;
    },
    screenarrchange() {
      this.screenForm.trade = this.screendynamicTagstrade.join(",");
      this.screentradeVisible = false;
    },
    cancelscreenarrchange() {
      this.screendynamicTagstrade = [];
      this.screentradeVisible = false;
    },
    screenjobarrchange() {
      this.screenForm.job = this.screendynamicTagsjob.join(",");
      this.screenjobVisible = false;
    },
    cancelscreenjobarrchange() {
      this.screendynamicTagsjob = [];
      this.screenjobVisible = false;
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
    backpool() {
      this.$router.push({ path: "pool" });
    }
  }
};
</script>

<style>
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

.el-form-item {
  margin-bottom: 20px;
}

.el-form-item__label {
  text-align: left;
}

.el-dialog__footer {
  text-align: center;
}

.el-dialog__wrapper .el-button + .el-button {
  margin-left: 60px;
}

.el-dialog__header {
  padding: 0;
}

.el-tabs--border-card > .el-tabs__content {
  padding-right: 20px;
}

.work .el-input,
.age .el-input,
.education .el-select,
.money .el-input {
  width: 40%;
  float: left;
}

.work .el-input:nth-child(2),
.age .el-input:nth-child(2),
.education .el-select:nth-child(2),
.money .el-input:nth-child(2) {
  margin-left: 20%;
}

.line {
  width: 17%;
  height: 2px;
  background-color: #d8dce5;
  float: left;
  margin: 17px 1% 0;
}

.el-radio__inner {
  width: 20px;
  height: 20px;
}

.el-radio-group {
  float: left;
  margin-top: 10px;
}

.test .el-form-item {
  margin-bottom: 10px;
}

.test {
  padding-left: 90px;
}

.firsttest {
  text-align: left;
  position: absolute;
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

.mytalent .el-tabs__header {
  left: 0;
}

.el-tabs__content {
  position: relative;
}
.ql-toolbar.ql-snow {
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
  width: 12%;
  text-align: left;
}

.provinceList {
  overflow: hidden;
  padding: 0;
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
  width: 60px;
  text-align: left;
  float: left;
  list-style: none;
  margin-left: 20px;
  cursor: pointer;
}

.areaList li,
.cityList li {
  /* padding: 0 10px; */
  text-align: left;
  float: left;
  list-style: none;
  width: 50%;
  /* margin-left: 20px; */
  cursor: pointer;
}

.provinceList li:hover {
  color: #249739;
}

.el-cascader {
  width: 100%;
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
  float: left;
  font-size: 14px;
  font-weight: 700;
  width: 20%;
  text-align: left;
}

.tradesmall {
  float: left;
  width: 80%;
}

.tradesmall .el-button--mini {
  width: 33.33%;
  float: left;
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
  width: 33.33%;
  float: left;
}

.tradeList .jobname:hover {
  color: #249739;
}

.jobbig {
  width: 80%;
  float: right;
}

.el-popover {
  width: 26%;
  min-width: 450px;
}

.birthday .el-form-item__content .block {
  width: 58%;
  float: left;
}

.birthday .el-form-item__content .el-select {
  width: 40%;
  float: right;
}

.residencetitle {
  color: #249739;
  padding-left: 20px;
  font-weight: 700;
  font-size: 16px;
  margin: 16px 0;
  text-align: left;
}

.el-button--mini,
.el-button--mini.is-round {
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
.talentmain {
  padding: 0;
}
.testclass {
  transform: translateX(80px);
}
</style>
