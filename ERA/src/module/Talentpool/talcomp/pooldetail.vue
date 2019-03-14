<template>
  <!--主体部分-->

  <div class="detail">
    <!-- Form -->
    <el-dialog :visible.sync="dialogFormVisible6" width="25%" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="downruleForm" :rules="downrules" ref="downruleForm">
        <el-form-item :label="$t('recruitSystem.tip.reportlang')" prop="language">
          <el-select v-model="downruleForm.language">
            <el-option :label="$t('ics.email.cn')" value="cn"></el-option>
            <el-option :label="$t('ics.email.en')" value="en"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item :label="$t('talentPool.detail.testTime')" prop="ids">
          <el-select v-model="downruleForm.ids">
            <el-option v-for="(item,index) in downoptions" :key="index" :label="item.updateDate" :value="item.ids">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible6 = false">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="exportEvaluationReport('downruleForm')" :loading="buttonloading2">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog :visible.sync="editTalentdialog" width="25%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form label-width="180px" :model="talentuserform1" ref="talentuserform1" :rules="editrules">
        <el-form-item :label="$t('recruitSystem.tip.name')" prop="name">
          <el-input v-model.trim="talentuserform1.name"></el-input>
        </el-form-item>

        <el-form-item :label="$t('saleSystem.email')" prop="mail">
          <el-input v-model.trim="talentuserform1.mail"></el-input>
        </el-form-item>
        <el-form-item :label="$t('saleSystem.newstatus')" class="newstatus editnewstatus">
          <el-select v-model="talentuserform1.status" @change="selectTip('statusTalentform',talentuserform1.status)">
            <el-option :label="item.name" :value="item.value" v-for="(item,index) in optionsStatus" :key="index" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('saleSystem.link')" prop="phone">
          <el-input v-model.trim="talentuserform1.phone" :blur="setphonechange(talentuserform1.phone)" v-on:change="phonechange"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTalentdialog('talentuserform1')">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="updateTalent('talentuserform1')" :loading="isupdateTalent">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- 更改原因 -->
    <el-dialog :title="$t('talentPool.detail.needreason')" :visible.sync="dialogFormVisibleTip" class="Tipdialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="statusTalentform" :rules="rules" ref="statusTalentform">
        <el-form-item prop="reason">
          <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c2')" v-model="statusTalentform.reason">
          </el-input>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelbutton">{{$t('btn.cancel')}}</el-button>
        <el-button type="success" class="green" @click="besurebutton('statusTalentform')">{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- <div class="detailtitle">Centalent > 人才库列表页 >
      <span>人才库详情页</span>
    </div> -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="detailtitle">
      <el-breadcrumb-item>
        <a href="./news.html">Centalent</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/pool' }">{{$t('talentPool.talentPage')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('talentPool.detail.talentDetail')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="subdetail">
      <div class="detail_top">
        <div class="detailword">
          {{$t('talentPool.detail.info')}}
        </div>
        <div class="detailbutton">
          <el-button size="small" @click="exportPoolById" :loading="resumeloading" v-if="this.$store.state.Privilege.includes('BUTTON_TALENT_RESUME_DOWNLOAD')" type="info">{{$t('btn.b7')}}
            <i class="el-icon-my-xiazai1 el-icon--right"></i>
          </el-button>
          <el-button size="small" @click="downreport('downruleForm')" v-if="this.$store.state.Privilege.includes('BUTTON_TALENT_REPORT_DOWNLOAD')" type="info" :disabled="this.downoptions.length==0">{{$t('btn.downloadReport')}}
            <i class="el-icon-my-xiazai1 el-icon--right"></i>
          </el-button>
          <el-button size="small" @click="openUpdateTalent('talentuserform1')" type="primary" class="blue">{{$t('ics.detail.editInfo')}}
          </el-button>
        </div>
      </div>

      <el-form label-width="180px" :model="talentuserform" ref="talentuserform" class="userform">
        <el-form-item :label="$t('saleSystem.name')">
          <el-input v-model="talentuserform.name" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="51 ID:" v-if="this.$store.state.Privilege.includes('CONTENT_TALENT_51ID')">
          <a :href="talentuserform.url">{{talentuserform.fiftyOneId}}</a>

        </el-form-item>

        <el-form-item :label="$t('saleSystem.email')">
          <el-input v-model="talentuserform.mail" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('saleSystem.newstatus')" class="newstatus">
          <el-select v-model="talentuserform.status" @change="selectTip('statusTalentform',talentuserform.status)" :disabled="true">
            <el-option :label="item.name" :value="item.value" v-for="(item,index) in optionsStatus" :key="index" :disabled="item.disabled"></el-option>
          </el-select>
          {{talentuserform.updateTime}}
        </el-form-item>
        <el-form-item :label="$t('saleSystem.link')">
          <el-input v-model="talentuserform.phone" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('recruitSystem.tip.updateTime')" class="updateTime">
          <!-- <el-input v-model="userform.contact"></el-input> -->
          {{talentuserform.updateTime}}
        </el-form-item>

      </el-form>
    </div>
   <div class="bigbox" style="position:relative">
      <div class="el-icon-caret-left arrow-left" @click="preclick"></div>
      <div class="el-icon-caret-right arrow-right" @click="nextclick"></div>
      <el-tabs v-model="activeName" type="border-card" class="businessInfo" @tab-click="changeClick">

        <el-tab-pane :label="$t('talentPool.detail.tab01')" name="first" class="infoTab" v-if="this.$store.state.Privilege.includes('TAB_TALENT_RESUME')">
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
              <el-button @click="showInputres(paralang?item.cityNameEn:item.cityName,paralang?item.cityNameEn:item.cityName)" class="button-new-tag" size="mini">{{item|EncityName}}</el-button>
              <el-button v-for="(x,y) in areaDatahot" :key="y" class="button-new-tag" size="mini" @click="showInputres(paralang?item.cityNameEn:item.cityName,paralang?x.areaNameEn:x.areaName)">{{x|EnareaName}}</el-button>
            </el-popover>

            <div class="residencetitle">{{$t('talentPool.tip.allp')}}</div>

            <ul class="provinceList">
              <li v-for="(item,index) in allProvince" :key="index" @click="findCityByProvinceId(item)">{{item|EnprovinceName}}</li>
            </ul>
            <div class="provinceListChild">
              <el-popover v-for="(item) in cityData" :key="item.cityName" class="hotcityLi" placement="right-end" trigger="click">
                <el-button slot="reference" @click="findAreaByCityId(item)">{{item|EncityName}}</el-button>
                <el-button @click="showInputres(paralang?item.cityNameEn:item.cityName,paralang?item.cityNameEn:item.cityName)" class="button-new-tag" size="mini">{{item|EncityName}}</el-button>
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
              <el-button @click="showInputhos(paralang?item.cityNameEn:item.cityName,paralang?item.cityNameEn:item.cityName)" class="button-new-tag" size="mini">{{item|EncityName}}</el-button>
              <el-button v-for="(x,y) in areaDatahot" :key="y" class="button-new-tag" size="mini" @click="showInputhos(paralang?item.cityNameEn:item.cityName,paralang?x.areaNameEn:x.areaName)">{{x|EnareaName}}</el-button>
            </el-popover>

            <div class="residencetitle">{{$t('talentPool.tip.allp')}}</div>

            <ul class="provinceList">
              <li v-for="(item,index) in allProvince" :key="index" @click="findCityByProvinceId(item)">{{item|EnprovinceName}}</li>
            </ul>
            <div class="provinceListChild">
              <el-popover v-for="(item) in cityData" :key="item.cityName" class="hotcityLi" placement="right-end" trigger="click">
                <el-button slot="reference" @click="findAreaByCityId(item)">{{item|EncityName}}</el-button>
                <el-button @click="showInputhos(paralang?item.cityNameEn:item.cityName,paralang?item.cityNameEn:item.cityName)" class="button-new-tag" size="mini">{{item|EncityName}}</el-button>
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

          <el-tabs class="mytalent">
            <el-tab-pane :label="$t('talentPool.tip.tab01')">
              <el-form :model="baseinfoForm" class="baseinfo" label-width="200px">
                <el-form-item :label="$t('recruitSystem.tip.name')" style="float: left">
                  <el-input v-model="baseinfoForm.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.birth')" style="float: left" class="birthday">
                  <div class="block">
                    <el-date-picker :editable="false" v-model="baseinfoForm.birthday" type="date" :placeholder="$t('talentPool.tip.chooseDate')" format="yyyy-MM-dd" value-format="yyyy年MM月dd日">
                    </el-date-picker>
                  </div>
                  <el-select v-model="baseinfoForm.birthTime" :placeholder="$t('talentPool.tip.choosebirth')" :popper-append-to-body="false">
                    <el-option :label="$t('screenTool.cnotsure')" :value="'null'"></el-option>
                    <el-option :label="item" :value="item" v-for="(item,index) in timeArr" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('recruitSystem.screen.gender')" style="float: left">
                  <el-radio-group v-model="baseinfoForm.sex">
                  <el-radio :label="'不限'">{{$t('talentPool.tip.unlimited')}}</el-radio>
                    <el-radio :label="'男'">{{$t('talentPool.tip.man')}}</el-radio>
                    <el-radio :label="'女'">{{$t('talentPool.tip.woman')}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.Marriage')" style="float: left">
                  <el-radio-group v-model="baseinfoForm.isMary">
                  <el-radio :label="true">{{$t('talentPool.tip.married')}}</el-radio>
                    <el-radio :label="false">{{$t('talentPool.tip.unmarried')}}</el-radio>
                    <el-radio :label="null">{{$t('talentPool.tip.unknown')}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.phone')" style="float: left">
                  <el-input v-model="baseinfoForm.phone"></el-input>
                </el-form-item>
                <el-form-item :label="$t('ics.email.email')" style="float: left">
                  <el-input v-model="baseinfoForm.mail"></el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.nationality')" style="float: left">
                  <div @click="householdModalShow">
                    <el-input v-model="baseinfoForm.household" :readonly="true">
                      <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                    </el-input>
                  </div>

                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.residence')"  style="float: left">
                  <div @click="locationModalShow">
                    <el-input v-model="baseinfoForm.residence" :readonly="true">
                      <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                    </el-input>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.tab02')" style="float: left">
                  <el-input v-model="baseinfoForm.experience">
                    <template slot="append">{{$t('talentPool.tip.year')}}</template>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('news.positonNews.hopeSalary')" style="float: left">
                  <el-input v-model="baseinfoForm.hopeSalary" :placeholder="$t('talentPool.tip.monthlySalary')">
                    <template slot="append">{{$t('recruitSystem.screen.price')}}</template>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('news.positonNews.higheducation')">
                  <el-select clearable :placeholder="$t('talentPool.tip.select')" v-model="baseinfoForm.degree">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.school')" style="float: left">
                  <el-input v-model="baseinfoForm.school">
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.major')" style="float: left">
                  <el-input v-model="baseinfoForm.specialty">
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.recenttrade')">
                  <div @click="tradeVisible=true">
                    <el-input v-model="baseinfoForm.trade" :readonly="true">
                      <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                    </el-input>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.recentcompany')" style="float: left">
                  <el-input v-model="baseinfoForm.company">
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.recentjob')"  style="float: left">
                  <div @click="jobVisible=true">
                    <el-input v-model="baseinfoForm.job" :readonly="true">
                      <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                    </el-input>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.arrivalTime')">
                     <el-select v-model="baseinfoForm.hopeTime" :placeholder="$t('talentPool.tip.select')">
                      <el-option :label="item.name" :value="item.value" v-for="(item,index) in arrTimeArr" :key="index"></el-option>
                    </el-select>
                   <!-- <el-input v-model="baseinfoForm.hopeTime">
                  </el-input> -->
                  <!-- <div class="block">
                    <el-date-picker :editable="false" v-model="baseinfoForm.hopeTime" type="date" :placeholder="$t('talentPool.tip.chooseDate')" format="yyyy-MM-dd" value-format="yyyy年MM月dd日" :picker-options="pickerOptionsarrive">
                    </el-date-picker>
                  </div> -->
                </el-form-item>
                <el-form-item :label="$t('talentPool.tip.keyword')" class="keyword">
                  <el-input v-model="baseinfoForm.keywords" :placeholder="$t('talentPool.tip.comma')" width="100%">
                  </el-input>
                </el-form-item>
              </el-form>
              <el-button type="success" style="margin-top:20px" @click="saveTalentPool" :loading="isSave1">{{$t('btn.save')}}</el-button>
            </el-tab-pane>
            <el-tab-pane :label="$t('talentPool.tip.tab02')" class="experience">
              <div class="producttitle" style="text-align:left;font-size:16px;margin:20px 0">{{$t('talentPool.tip.tab02')}}
                <span style="color:red">{{$t('talentPool.tip.sort')}} </span>
              </div>

              <div style="position:absolute;left:0;bottom:40px">
                <i size="small" @click="addTabWorkExperience" class="el-icon-circle-plus-outline" style="font-size:18px;cursor:pointer"></i>
              </div>
              <div>
                <div class="productcontent clearfix" v-for="(item,index) in WorkExperienceform" :key="index">
                  <el-form ref="WorkExperienceform" :model="WorkExperienceform[index]" label-width="180px">
                    <i class="el-icon-remove-outline" style="float:left;margin-left:-46px;margin-top:-15px;font-size:18px;cursor:pointer" closable @click="removeTabWorkExperience(WorkExperienceform[index])"></i>

                    <el-form-item :label="$t('talentPool.tip.time')">
                      <el-col :span="9">
                        <el-date-picker :editable="false" :picker-options="prepickerOptions" type="month" :placeholder="$t('talentPool.tip.start')" style="width: 100%;" v-model.trim="WorkExperienceform[index].from" format="yyyy/MM" value-format="yyyy/MM"></el-date-picker>
                      </el-col>
                      <el-col class="line" style="width:23%"></el-col>
                      <el-col :span="9">
                        <el-date-picker :editable="false" :picker-options="pickerOptions" type="month" :placeholder="$t('talentPool.tip.end')" style="width: 100%;" v-model.trim="WorkExperienceform[index].to" format="yyyy/MM" value-format="yyyy/MM"></el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item :label="$t('talentPool.tip.company')" style="width:45%;float:left">
                      <el-input v-model="WorkExperienceform[index].company"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('talentPool.tip.situation')" style="width:45%;float:right">
                      <el-input v-model="WorkExperienceform[index].companyDescribe" :placeholder="$t('talentPool.tip.placSituation')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('talentPool.tip.department')" style="width:45%;float:left">
                      <el-input v-model="WorkExperienceform[index].depart"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('talentPool.tip.position')" style="width:45%;float:right">
                      <el-input v-model="WorkExperienceform[index].job">
                        <!-- <el-button slot="append" icon="el-icon-edit" @click="workjobVisible=true"></el-button> -->
                      </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('talentPool.tip.jobdescription')" style="width:100%;float:left">
                      <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c1')" v-model="WorkExperienceform[index].jobDescribe">
                      </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('talentPool.tip.reportingObject')" style="width:45%;float:left">
                      <el-input v-model="WorkExperienceform[index].reportTo"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('talentPool.tip.subordinate')" style="width:45%;float:right">
                      <el-input v-model="WorkExperienceform[index].following"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('talentPool.tip.performance')" style="width:100%;float:left">
                      <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c1')" v-model="WorkExperienceform[index].achievement">
                      </el-input>
                    </el-form-item>
                  </el-form>

                </div>

              </div>
              <el-button type="success" style="margin-top:20px" @click="saveWorkExperience" :loading="isSave2">{{$t('btn.save')}}</el-button>
            </el-tab-pane>
            <el-tab-pane :label="$t('talentPool.tip.tab03')"  class="product">
              <div class="producttitle" style="text-align:left;font-size:16px;margin:20px 0">{{$t('talentPool.tip.tab03')}}
                <span style="color:red">{{$t('talentPool.tip.sort')}} </span>
              </div>

              <div style="position:absolute;left:0;bottom:40px">
                <i size="small" @click="addTabProjectExperience" class="el-icon-circle-plus-outline" style="font-size:18px;cursor:pointer"></i>
              </div>

              <div>

                <div class="productcontent clearfix" v-for="(item,index) in ProjectExperienceform" :key="index">
                  <el-form ref="ProjectExperienceform" :model="ProjectExperienceform[index]" label-width="180px">
                    <i class="el-icon-remove-outline" style="float:left;margin-left:-46px;margin-top:-15px;font-size:18px;cursor:pointer" closable @click="removeTabProjectExperience(ProjectExperienceform[index])"></i>

                    <el-form-item :label="$t('talentPool.tip.time')">
                      <el-col :span="9">
                        <el-date-picker :editable="false" :picker-options="prepickerOptions" type="month" :placeholder="$t('talentPool.tip.start')" style="width: 100%;" v-model="ProjectExperienceform[index].from" format="yyyy/MM" value-format="yyyy/MM"></el-date-picker>
                      </el-col>
                      <el-col class="line" style="width:23%"></el-col>
                      <el-col :span="9">
                        <el-date-picker :editable="false" :picker-options="pickerOptions" type="month" :placeholder="$t('talentPool.tip.end')" style="width: 100%;" v-model="ProjectExperienceform[index].to" format="yyyy/MM" value-format="yyyy/MM"></el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item :label="$t('talentPool.tip.projectname')">
                      <el-input v-model="ProjectExperienceform[index].name"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('talentPool.tip.projectDescription')">
                      <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c1')" v-model="ProjectExperienceform[index].describe">
                      </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('talentPool.tip.responsibility')">
                      <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c1')" v-model="ProjectExperienceform[index].jobDescribe">
                      </el-input>
                    </el-form-item>
                    <input type="hidden" v-model="ProjectExperienceform[index].talentId">
                  </el-form>
                </div>

              </div>
              <el-button type="success" style="margin-top:20px" @click="saveProjectExperience" :loading="isSave3">{{$t('btn.save')}}</el-button>

            </el-tab-pane>
            <el-tab-pane :label="$t('talentPool.tip.tab04')" class="skill">
              <!-- 证书 -->
              <div style="position:relative" class="certificate">
                <div class="producttitle" style="text-align:left;font-size:16px;margin:20px 0">1.{{$t('talentPool.tip.certificate')}}</div>

                <div style="position: absolute;left:-28px;bottom: -10px;">
                  <i size="small" @click="addTabtalentCertificates" class="el-icon-circle-plus-outline" style="font-size:18px;cursor:pointer"></i>
                </div>
                <div>
                  <div class="productcontent clearfix" v-for="(item,index) in Skillsform.talentCertificates" :key="index">
                    <el-form ref="talentCertificatesform" :model="Skillsform.talentCertificates[index]" label-width="180px">
                      <i class="el-icon-remove-outline" style="float:left;margin-left:-44px;margin-top:-15px;font-size:18px;cursor:pointer" closable @click="removeTabtalentCertificates(Skillsform.talentCertificates[index])"></i>

                      <el-form-item :label="$t('talentPool.tip.acquisitionTime')">
                        <div class="block">
                          <el-date-picker :editable="false" v-model="Skillsform.talentCertificates[index].date" type="month" format="yyyy/MM" :placeholder="$t('talentPool.tip.start')" value-format="yyyy/MM">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                      <el-form-item :label="$t('talentPool.tip.certificate')">
                        <el-input v-model="Skillsform.talentCertificates[index].name"></el-input>
                      </el-form-item>
                      <input type="hidden" v-model="Skillsform.talentCertificates[index].talentId">
                    </el-form>
                  </div>
                </div>
              </div>
              <!-- 技能 -->
              <div style="position:relative" class="certificate">
                <div class="producttitle" style="text-align:left;font-size:16px;margin:20px 0">2.{{$t('talentPool.tip.tab04')}}</div>

                <div style="position: absolute;left:-28px;bottom: -10px;">
                  <i size="small" @click="addTabtalentSkills" class="el-icon-circle-plus-outline" style="font-size:18px;cursor:pointer"></i>
                </div>
                <div>
                  <div class="productcontent clearfix" v-for="(item,index) in Skillsform.talentSkills" :key="index">
                    <el-form ref="talentSkillsform" :model="Skillsform.talentSkills[index]" label-width="80px">
                      <i class="el-icon-remove-outline" style="float:left;margin-left:-44px;margin-top:-15px;font-size:18px;cursor:pointer" closable @click="removeTabtalentSkills(Skillsform.talentSkills[index])"></i>

                      <el-form-item :label="$t('talentPool.tip.skill')" style="float:left;width:45%">
                        <el-input v-model="Skillsform.talentSkills[index].name"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('talentPool.tip.skilllevel')" style="float:right;width:45%">
                        <el-input v-model="Skillsform.talentSkills[index].content"></el-input>
                      </el-form-item>
                      <input type="hidden" v-model="Skillsform.talentSkills[index].talentId">
                    </el-form>
                  </div>
                </div>
              </div>
              <!-- 培训经历 -->
              <div style="position:relative" class="certificate">
                <div class="producttitle" style="text-align:left;font-size:16px;margin:20px 0">3.{{$t('talentPool.tip.training')}}</div>

                <div style="position: absolute;left:-28px;bottom: -10px;">
                  <i size="small" @click="addTabtrainingExperiences" class="el-icon-circle-plus-outline" style="font-size:18px;cursor:pointer"></i>
                </div>
                <div>
                  <div class="productcontent clearfix" v-for="(item,index) in Skillsform.trainingExperiences" :key="index">
                    <el-form ref="trainingExperiencesform" :model="Skillsform.trainingExperiences[index]" label-width="180px">
                      <i class="el-icon-remove-outline" style="float:left;margin-left:-44px;margin-top:-15px;font-size:18px;cursor:pointer" closable @click="removeTabtrainingExperiences(Skillsform.trainingExperiences[index])"></i>

                      <el-form-item :label="$t('talentPool.tip.trainingTime')" style="width:47%;float:left;height:40px">
                        <el-col :span="10">
                          <el-date-picker :editable="false" :picker-options="prepickerOptions" type="month" :placeholder="$t('talentPool.tip.start')" format="yyyy/MM" value-format="yyyy/MM" style="width: 100%;" v-model="Skillsform.trainingExperiences[index].startDate"></el-date-picker>
                        </el-col>
                        <el-col class="line" style="width:14%"></el-col>
                        <el-col :span="10">
                          <el-date-picker :editable="false" :picker-options="pickerOptions" type="month" :placeholder="$t('talentPool.tip.start')" format="yyyy/MM" value-format="yyyy/MM" style="width: 100%;" v-model="Skillsform.trainingExperiences[index].endDate"></el-date-picker>
                        </el-col>
                      </el-form-item>
                      <el-form-item :label="$t('talentPool.tip.trainingName')" style="width:47%;float:right;height:40px">
                        <el-input v-model="Skillsform.trainingExperiences[index].name"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('talentPool.tip.trainingInstitutions')" style="width:47%;float:left;height:40px">
                        <el-input v-model="Skillsform.trainingExperiences[index].agency"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('talentPool.tip.trainingVenue')" style="width:47%;float:right;height:40px">
                        <el-input v-model="Skillsform.trainingExperiences[index].place"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('talentPool.tip.trainingDescription')" style="width:100%;float:left">
                        <el-input type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('talentPool.tip.c1')" style="width:100%;float:left" v-model="Skillsform.trainingExperiences[index].describe">
                        </el-input>
                      </el-form-item>
                      <input type="hidden" v-model="Skillsform.trainingExperiences[index].talentId">
                    </el-form>
                  </div>
                </div>
              </div>
              <el-button type="success" style="margin-top:20px" @click="saveTalentSkill" :loading="isSave4">{{$t('btn.save')}}</el-button>

            </el-tab-pane>
            <el-tab-pane :label="$t('talentPool.tip.tab05')">

              <el-upload class="upload-demo" ref="upload" :action="baseAction" :file-list="fileList" :auto-upload="false" :before-upload="beforeUpload" :on-success="uploadsuccess">

                <el-button type="success" @click="uploadPublic" class="chuanbutton">{{$t('businessSystem.detail.upload')}}
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>

                <el-button slot="trigger" type="success" class="youbutton green">{{$t('businessSystem.detail.browse')}}
                  <i class="el-icon-view el-icon--right"></i>
                </el-button>

              </el-upload>

              <div class="attachment">
                <el-button s @click="deleteByIds" type="info">{{$t('businessSystem.detail.deletefile')}}
                  <i class="el-icon-close el-icon--right"></i>
                </el-button>
                <el-button @click="downloadAttachment" type="info">{{$t('businessSystem.detail.downloadfile')}}
                  <i class="el-icon-my-xiazai1 el-icon--right"></i>
                </el-button>
              </div>

              <el-table ref="multipleTable" :data="TalentAttachmentData" tooltip-effect="dark" style="width: 100%" stripe @selection-change="TalentAttachmentselschange" v-loading="downloading"     :element-loading-text="$t('talentPool.loading')"
                :empty-text="$t('recruitSystem.screen.nodata')">
                <el-table-column type="selection" width="55" prop="id">
                </el-table-column>
                <el-table-column :label="$t('businessSystem.detail.fileName')" prop="name" show-overflow-tooltip>

                </el-table-column>

                <el-table-column prop="uploadTime" :label="$t('businessSystem.detail.time')" show-overflow-tooltip>
                </el-table-column>
              </el-table>

            </el-tab-pane>

          </el-tabs>
        </el-tab-pane>
        <el-tab-pane :label="$t('talentPool.detail.tab02')" name="second" v-if="this.$store.state.Privilege.includes('TAB_TALENT_REPORT')">
          <div class="reportSelect">
            <el-form :model="testruleForm">
              <el-form-item :label="$t('talentPool.detail.testTime')">
                <el-select v-model="testruleForm.clientId" :placeholder="$t('valid.valid060')" @change="personalReport" @clear="clearOption">
                  <el-option v-for="(item,index) in testoptions" :disabled="item.isShow" :key="index" :label="item.updateDate" :value="item.clientId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('ics.email.lang')">
                <el-select v-model="testruleForm.language" :popper-append-to-body="false" @clear="clearOption">
                  <el-option :label="$t('ics.email.cn')" value="cn"></el-option>
                  <el-option :label="$t('ics.email.en')" value="en"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <reportcn v-if="testruleForm.language=='cn'" :userProfessionalTendenciesVO='userProfessionalTendenciesVO' :userform="baseinfoForm" :bardata="bardata" :reportpart1="reportpart1" :reportpart2="reportpart2" :reportpart3="reportpart3" :IcogResultform="IcogResultform"></reportcn>
          <!-- <reporten v-if="testruleForm.language=='en'" :userform="baseinfoForm" :bardata="bardata" :reportpart1="reportpart1" :reportpart2="reportpart2" :reportpart3="reportpart3"></reporten> -->
        </el-tab-pane>
        <el-tab-pane :label="$t('talentPool.detail.tab03')" name="third" v-loading="listLoading" v-if="this.$store.state.Privilege.includes('TAB_TALENT_SCORE_NEW')">
          <score :IcsResultform="IcsResultform" :IcogResultform="IcogResultform" :ab0values="ab0values" :heResultform="heResultform" :ab0Colors="ab0Colors" :ab1Colors="ab1Colors" :ab1values="ab1values" :ab2Colors="ab2Colors" :ab2values="ab2values"></score>
        </el-tab-pane>
        <el-tab-pane :label="$t('talentPool.detail.tab04')" name="four" v-if="this.$store.state.Privilege.includes('TAB_TALENT_STATUS')">
          <div style="position:relative">
            <div class="statusTop">
              <el-form label-width="180px" :model="statusForm" :rules="statusFormrules" ref="statusForm">
                <el-form-item :label="$t('saleSystem.newstatus')">
                  <el-radio v-model="statusForm.type" label="0">{{$t('saleSystem.tip.noupdate')}}</el-radio>
                  <el-radio v-model="statusForm.type" label="1">{{$t('saleSystem.tip.update')}}</el-radio>
                  <el-select v-model="statusForm.changed" :disabled="statusForm.type!='1'">
                    <el-option :label="item.name" :value="item.value" v-for="(item,index) in optionsStatus" :key="index" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('saleSystem.tip.remark')" prop="reason">
                  <el-input type="textarea" :autosize="{ minRows: 2}" v-model="statusForm.reason" :placeholder="$t('saleSystem.tip.inputContent')">
                  </el-input>
                  <!-- <el-input placeholder="请输入" v-model="statusForm.reason"></el-input> -->
                </el-form-item>
                <input type="hidden" v-model="statusForm.talentId">
              </el-form>

            </div>
            <el-button type="success" style="position:absolute;top:50%;transform:translateY(-50%);right:5%" @click="saveHistoryStatus('statusForm')">{{$t('btn.submit')}}</el-button>
          </div>
          <el-table :data="historystatusData" stripe style="width: 100%">
            <el-table-column prop="userName" :label="$t('saleSystem.tip.editpeople')" width="180">
            </el-table-column>
            <el-table-column prop="updateTime" :label="$t('saleSystem.tip.editTime')" width="180">
            </el-table-column>
            <el-table-column prop="type" :label="$t('saleSystem.tip.editType')" width="180" :formatter="statusFormat">
            </el-table-column>
            <el-table-column :label="$t('saleSystem.tip.editContent')">
              <template slot-scope="scope">
                  <div v-html="$t('btn.b1')+':'+reFormat(scope.row.changed)+'<br>'+$t('saleSystem.tip.remark')+':'+scope.row.reason" style="text-align: left;" v-if="scope.row.type==1"></div>
                  <div v-html="$t('saleSystem.tip.remark')+':'+scope.row.reason" style="text-align: left;" v-else></div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('saleSystem.tip.Operation')">
              <template slot-scope="scope">
                <el-button size="small" type="danger" @click="deleteHistoryStatus(scope.row)">{{$t('btn.delete')}}</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import api from "../../../api/api.js";
import Util from "../../../tool/tool.js";
import formatUrl from "../../../lib/tool.js";
let mytools = new Util();
import reportcn from "./reportcn.vue";
import reporten from "./reporten.vue";
import score from "./score.vue";
import Cookies from "js-cookie";
export default {
  data() {
    let that = this;
    return {
      arrTimeArr:[
      {name:this.$t('talentPool.arrive.n1'),value:"随时"},
      {name:this.$t('talentPool.arrive.n2'),value:"1周内"},
      {name:this.$t('talentPool.arrive.n3'),value:"1个月内"},
      {name:this.$t('talentPool.arrive.n4'),value:"3个月内"},
      {name:this.$t('talentPool.arrive.n5'),value:"待定"},
      ],
      paralang:true,
      isSave1: false,
      isSave2: false,
      isSave3: false,
      isSave4: false,

      pickerOptionsarrive: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 <= Date.now();
        }
      },
      dynamicTagstrade: [],
      dynamicTagsjob: [],
      dynamicTagsres: [],
      dynamicTagshos: [],
      //居住地
      provinceres: "",
      innerVisible: false,
      hotCity: [],
      areaDatahot: [],
      cityData: [],
      areaData: [],
      //国籍
      provincehos: "",
      householdVisible: false,
      resumeloading: false,
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

      numupload: 0,
      downloading: false,
      testruleForm: {
        language: "cn"
      },
      downruleForm: {
        language: "cn"
      },
      pooldata: [],
      TalentAttachmentsels: [],
      baseAction: BASE_URL + "/icsserver/TalentAttachment/uploadPublic",
      upLoadData: [],
      statusTalentform: {
        talentId: "",
        reason: "",
        changed: ""
      },
      updateTalentform: {
        name: "",
        mail: "",
        phone: "",
        status: {
          talentId: "",
          reason: "",
          changed: ""
        }
      },
      isupdateTalent: false,
      editrules: {
        name: [{ message: this.$t('valid.inputName'), trigger: "blur" }],
        mail: [
          { message:  this.$t('valid.userplaceholder'), trigger: "blur" },
          {
            type: "email",
            message: this.$t('valid.valid022'),
            trigger: "blur"
          }
        ],
        phone: [
          {
            message: this.$t('valid.inputlink'),
            trigger: "blur"
          },
          {
            pattern: /^1[3|4|5|7|8|9][0-9]{9}$/,
            message: this.$t('valid.valid040'),
            trigger: "blur"
          }
        ]
      },
      statusFormrules: {
        reason: [
          { required: true, message: this.$t('valid.valid059'), trigger: "blur" }
        ],
        changed: [{ message: this.$t('valid.valid037'), trigger: "change" }]
      },
      downrules: {
        language: [
          { required: true, message: this.$t('valid.valid011'), trigger: "change" }
        ],
        ids: [{ required: true, message: this.$t('valid.valid060'), trigger: "change" }]
      },
      testoptions: [],
      downoptions: [],
      rules: {
        reason: [
          { required: true, message: this.$t('valid.valid059'), trigger: "blur" }
        ]
      },
      // testrules:[],
      //状态/备注
      statusForm: {},
      recordupdateTime: "",
      talentId: "",
      //

      jobarr: [],
      workjobarr: [[]],
      arr: [],
      tradeVisible: false,
      jobVisible: false,
      workjobVisible: false,
      tradeList: [],
      jobList: [],

      //省份

      hotVisible: false,
      allProvince: [],
      allVisible: false,

      TalentAttachmentData: [],
      fileList: [],
      upnumList: [],
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
      sels: [], //列表选中列
      upfile: "",
      name: "",
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
      //筛选框
      tabPosition: "left",
      screenFormVisible: false,
      formLabelWidth: "180px",
      historystatusData: [],
      dialogFormVisibleTip: false,
      time: "",
      language: "",
      dialogFormVisible6: false,
      bardata: "",
      reportpart: "",
      reportpart1: "",
      reportpart2: "",
      reportpart3: "",
      buttonloading: false,
      buttonloading2: false,
      listLoading: false,
      activeName: "first",
      userform: {
        id: "",
        name: "",
        email: "",
        contact: "",
        status: ""
      },
      baseinfoForm: {},
      //用户信息
      talentuserform: {},
      talentuserform1: {
        // name: "",
        // mail: "",
        // phone: ""
      },
      //用户状态
      optionsStatus: [],
      IcsResultform: [],
      IcogResultform: [],
      heResultform: [],
      ab0values: "",
      ab0Colors: "",
      ab1values: "",
      ab1Colors: "",
      ab2values: "",
      ab2Colors: "",
      editTalentdialog: false,
      userProfessionalTendenciesVO: []
    };
  },
  // filters:{
  //   // EnprovinceName(val){
  //   //   return "cc"
  //   //   // console.log(item)
  //   //   // if(Cookies.get("language")=='zh'){
  //   //   //   return item.provinceName
  //   //   // }else{
  //   //   //   return item.provinceNameEn
  //   //   // }
  //   // }
  // },
  created() {
    this.getlang()
    this.findProvince();
    this.findCityByStatus();
    this.findJob();
    this.findTrade();
    this.findTalentStatus();
    this.findPoolById();
    this.findscore();
    this.getPersonalById();
    this.findByTalentId();
    this.findByTalentIdTalentHistoryStatus();
  },
  mounted() {},
  components: { reportcn, reporten, score },
  methods: {
    getlang(){
      if(Cookies.get("language")=='zh'){
        this.paralang=false
      }else{
        this.paralang=true
      }
    },
    statusFormat(row, column) {
      // console.log(row)
      if (row.type == 0) {
        return this.$t("btn.b2");
      }
      if (row.type == 1) {
        return this.$t("btn.b1");
      }
    },
    reFormat(v) {
        switch (v) {
        case "无状态":
          return this.$t("ststus.businessStatus.n1");
          break;
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
        //显示人才状态列表
    findTalentStatus() {
        this.optionsStatus=[
          {"value":"无状态",name:this.$t("ststus.businessStatus.n1"),disabled: true},
          {"value":"加入职位",name:this.$t("ststus.positionStatus.n1"),disabled: true},
          {"id":3,"value":"已联系-有兴趣","type":0,name:this.$t("ststus.positionStatus.n2")},
          {"id":4,"value":"已联系-没兴趣","type":0,name:this.$t("ststus.positionStatus.n3")},
          {"id":5,"value":"待面试","type":0,name:this.$t("ststus.positionStatus.n4")},
          {"id":6,"value":"面试完成","type":0,name:this.$t("ststus.positionStatus.n5")},
          {"id":7,"value":"已入职","type":0,name:this.$t("ststus.positionStatus.n6")},
          {"value":"退出职位",name:this.$t("ststus.positionStatus.n7"),disabled: true},]
      // this.$http.post(api.talent.findTalentStatus()).then(
      //   res => {
      //     if (res.data.code == "00") {
      //       // console.log(res);
      //       this.optionsStatus = res.data.data;
      //       console.log(JSON.stringify(this.optionsStatus))
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
    setphonechange(value) {
      this.phonechange(value);
    },
    phonechange(value) {
      // 目的是去掉字符串中除数字之外的其它字符
      if (this.talentuserform1.phone) {
        this.$nextTick(() => {
          this.talentuserform1.phone = value.replace(/[^\d]/g, "");
        });
      }
    },
    clearOption() {
      this.testruleForm.clientId = "";
      // console.log(this.$refs.timeselect);
      this.testruleForm.language = null;
      // console.log(v);D
    },
    locationModalShow() {
      this.cityData = [];
      this.areaData = [];
      this.areaDatahot = [];
      this.dynamicTagsres = [];
      this.innerVisible = true;
    },
    householdModalShow() {
      this.cityData = [];
      this.areaData = [];
      this.areaDatahot = [];
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
    showInputres(x, tag) {
      this.dynamicTagsres = [];
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
    },
    handleCloseres(tag) {
      this.dynamicTagsres.splice(this.dynamicTagsres.indexOf(tag), 1);
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
      this.dynamicTagshos = [];
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
    },
    handleClosehos(tag) {
      this.dynamicTagshos.splice(this.dynamicTagshos.indexOf(tag), 1);
    },
    suredynamicTagshos() {
      this.baseinfoForm.household = this.dynamicTagshos.join("");
      this.householdVisible = false;
    },
    canceldynamicTagshos() {
      this.dynamicTagshos = [];
      this.householdVisible = false;
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
    //获取{{$t('talentPool.tip.hotcity')}}
    findCityByStatus() {
      this.$http.post(api.talent.findCityByStatus()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.hotCity = res.data.data;
            this.hotCity2 = res.data.data;
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
    //获取{{$t('talentPool.tip.allp')}}
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
      this.isSave1 = true;
      this.$http.post(api.talent.saveTalentPool(), this.baseinfoForm).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.isSave1 = false;
            this.$message({
              type: "success",
              message: this.$t('msg.msg11')
            });
            this.talentId = res.data.data;
            // console.log(res);
          }
          if (res.data.code == "500") {
            this.isSave1 = false;
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
      if (
        this.WorkExperienceform.every(
          el => Date.parse(new Date(el.to)) - Date.parse(new Date(el.from)) >= 0
        )
      ) {
        this.WorkExperienceform.forEach(x => {
          x.talentId = this.$route.query.id;
        });
        this.isSave2 = true;
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
                this.isSave2 = false;
              }
              if (res.data.code == "500") {
                this.isSave2 = false;
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
      if (
        this.ProjectExperienceform.every(
          el => Date.parse(new Date(el.to)) - Date.parse(new Date(el.from)) >= 0
        )
      ) {
        this.ProjectExperienceform.forEach(x => {
          x.talentId = this.$route.query.id;
        });
        this.isSave3 = true;
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
                this.isSave3 = false;
                this.$message({
                  message: this.$t('msg.msg11'),
                  type: "success"
                });
              }
              if (res.data.code == "500") {
                this.isSave3 = false;
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
        this.isSave4 = true;
        this.$http
          .post(
            api.talent.saveTalentSkill() + "?talentId=" + this.$route.query.id,
            this.Skillsform
          )
          .then(
            res => {
              if (res.data.code == "911") {
                location.href = "./login.html";
              }
              if (res.data.code == "00") {
                // console.log(res);
                this.isSave4 = false;
                this.$message({
                  type: "success",
                  message: this.$t('msg.msg11')
                });
              }
              if (res.data.code == "500") {
                this.isSave4 = false;
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
    },
    //附件
    uploadPublic() {
      this.$refs.upload.submit();
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
      fd.append("talentId", this.$route.query.id);
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
            this.downloading = false;
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
          formatUrl({ talentId: this.$route.query.id })
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
                message: this.$t('msg.msg51')
              });
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    // 附件表格

    TalentAttachmentselschange: function(sels) {
      this.TalentAttachmentsels = sels;
      // console.log(this.TalentAttachmentsels);
    },
    downloadAttachment() {
      // console.log("cc");
      let arr = [];
      this.TalentAttachmentsels.forEach(function(value, index, array) {
        arr.push(value.url);

        // console.log(value);
      });
      mytools.allDownload(arr);
    },

    //查询人才状态和备注
    findByTalentIdTalentHistoryStatus() {
      this.$http
        .post(
          api.TalentHistoryStatus.findByTalentId(),
          formatUrl({ talentId: this.$route.query.id })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              for (var i = 0; i < res.data.data.length; i++) {
                // if (res.data.data[i].type == "1") {
                //   res.data.data[i].type = "状态更新";
                // }
                // if (res.data.data[i].type == "0") {
                //   res.data.data[i].type = "仅备注";
                // }
                res.data.data[i].updateTime =
                  new Date(res.data.data[i].updateTime).getFullYear() +
                  "-" +
                  (parseInt(new Date(res.data.data[i].updateTime).getMonth()) +
                    1) +
                  "-" +
                  new Date(res.data.data[i].updateTime).getDate();
              }
              this.historystatusData = res.data.data;
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
    //备注/状态
    saveHistoryStatus(formName) {
      this.statusForm.talentId = this.$route.query.id;
      // console.log(this.statusForm.changed);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.statusForm.type == 1 && !this.statusForm.changed) {
            this.$message({
              type: "warning",
              message: this.$t('valid.valid041')
            });
          } else {
            this.$http
              .post(
                api.TalentHistoryStatus.saveHistoryStatus(),
                this.statusForm
              )
              .then(
                res => {
                  if (res.data.code == "911") {
                    location.href = "./login.html";
                  }
                  if (res.data.code == "00") {
                    if (this.$refs[formName] !== undefined) {
                      this.$refs[formName].resetFields();
                    }
                    this.findByTalentIdTalentHistoryStatus();
                    this.$message({
                      type: "success",
                      message: this.$t('msg.msg17')
                    });
                    // this.TalentAttachmentData = res.data.data
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
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //根据id删除对应人才信息
    deleteByIds() {
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
    findscore() {
      var para = this.$route.query;
      this.$http.post(api.talent.findPoolById(), formatUrl(para)).then(
        res => {
          if (res.data.code == "00") {
            //分数
            this.IcsResultform = [];
            this.$http.post(api.talent.getPersonalById(), formatUrl(para)).then(
              res => {
                if (res.data.code == "911") {
                  location.href = "./login.html";
                }
                if (res.data.code == "00") {
                  // console.log(res);
                  this.listLoading = false;
                  if (res.data.data.length > 0) {
                    if (res.data.data[0].cogResult) {
                      this.IcogResultform = [res.data.data[0].cogResult];
                    } else {
                      this.IcogResultform = [];
                    }
                  } else {
                    this.IcogResultform = [];
                  }
                }
                if (res.data.code == "500") {
                  this.testoptions = [];
                  this.downoption = [];
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

            if (res.data.data.heResult) {
              this.heResultform = [res.data.data.heResult];
              res.data.data.heResult.results = res.data.data.heResult.results
                .replace(/AB0/g, "个人情况")
                .replace(/AB2/g, "大胆开拓")
                .replace(/AB3/g, "求知思考")
                .replace(/AB4/g, "深究创造")
                .replace(/AB5/g, "激烈竞争")
                .replace(/AB6/g, "自信努力")
                .replace(/AB7/g, "行动表现")
                .replace(/AB8/g, "友善服务")
                .replace(/AB9/g, "资源管理")
                .replace(/AB10/g, "社交销售")
                .replace(/_/g, "")
                .replace(/AB1/g, "谨慎守规");
              res.data.data.heResult.results = eval(
                "(" + res.data.data.heResult.results + ")"
              );
              this.ab0values = res.data.data.heResult.results.ab0Values;
              this.ab0Colors = res.data.data.heResult.results.ab0Colors;
              this.ab1values = res.data.data.heResult.results.ab1Values;
              this.ab1Colors = res.data.data.heResult.results.ab1Colors;
              this.ab2values = res.data.data.heResult.results.ab2Values;
              this.ab2Colors = res.data.data.heResult.results.ab2Colors;
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
                  if (this.ab0values[i].split(",")[0] == "求知思考") {
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
                  if (this.ab1values[i].split(",")[0] == "求知思考") {
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
                  if (this.ab2values[i].split(",")[0] == "求知思考") {
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
            } else {
              this.heResultform = [];
              this.ab0values = "";
              this.ab0Colors = "";
              this.ab1values = "";
              this.ab1Colors = "";
              this.ab2values = "";
              this.ab2Colors = "";
            }
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
    },
    // 根据人才id显示全部的信息（未作测试包含一键he）
    findPoolById() {
      var para = this.$route.query;
      this.$http.post(api.talent.findPoolById(), formatUrl(para)).then(
        res => {
          if (res.data.code == "00") {
            //状态
            if (res.data.data.historyStatus) {
              res.data.data.historyStatus.forEach(el => {
                el.updateTime =
                  new Date(el.updateTime).getFullYear() +
                  "-" +
                  (parseInt(new Date(el.updateTime).getMonth()) + 1) +
                  "-" +
                  new Date(el.updateTime).getDate();
              });
            }

            //更新时间
            if (res.data.data.updateTime) {
              res.data.data.updateTime =
                new Date(res.data.data.updateTime).getFullYear() +
                "-" +
                (parseInt(new Date(res.data.data.updateTime).getMonth()) + 1) +
                "-" +
                new Date(res.data.data.updateTime).getDate();
            }

            this.talentuserform = res.data.data;
            document.title = `${this.$t("sidebar.talentPool")}-${res.data.data.name}`;
            this.baseinfoForm = {
              id: res.data.data.id,
              name: res.data.data.name,
              company: res.data.data.company,
              job:this.paralang?res.data.data.jobEn:res.data.data.job,
              trade:this.paralang? res.data.data.tradeEn:res.data.data.trade,
              residence:this.paralang? res.data.data.residenceEn:res.data.data.residence,
              hopeSalary: res.data.data.hopeSalary,
              birthday: res.data.data.birthday,
              birthTime: res.data.data.birthTime
                ? res.data.data.birthTime
                : "null",
              degree: res.data.data.degree,
              experience: res.data.data.experience,
              sex: res.data.data.sex,
              phone: res.data.data.phone,
              mail: res.data.data.mail,
              school: res.data.data.school,
              specialty: res.data.data.specialty,
              isMary: res.data.data.isMary,
              household:this.paralang? res.data.data.householdEn:res.data.data.household,
              hopeTime:res.data.data.hopeTime ,
              keywords: res.data.data.keywords
            };
            //工作经验
            if (res.data.data.workExperiences) {
              for (var i = 0; i < res.data.data.workExperiences.length; i++) {
                this.WorkExperienceform[i] = res.data.data.workExperiences[i];
              }
            } else {
              this.WorkExperienceform = [{}];
            }

            //项目经验
            // if()
            if (res.data.data.projectEperiences) {
              for (var i = 0; i < res.data.data.projectEperiences.length; i++) {
                this.ProjectExperienceform[i] =
                  res.data.data.projectEperiences[i];
              }
            } else {
              this.ProjectExperienceform = [{}];
            }

            this.Skillsform.talentCertificates = res.data.data.certificates
              ? res.data.data.certificates
              : [{}];
            this.Skillsform.talentSkills = res.data.data.skills
              ? res.data.data.skills
              : [{}];
            this.Skillsform.trainingExperiences = res.data.data
              .trainingExperiences
              ? res.data.data.trainingExperiences
              : [{}];
            if (res.data.data.attachments) {
              for (var i = 0; i < res.data.data.attachments.length; i++) {
                res.data.data.attachments[i].uploadTime =
                  new Date(
                    res.data.data.attachments[i].uploadTime
                  ).getFullYear() +
                  "-" +
                  (parseInt(
                    new Date(res.data.data.attachments[i].uploadTime).getMonth()
                  ) +
                    1) +
                  "-" +
                  new Date(res.data.data.attachments[i].uploadTime).getDate();
              }
            }

            this.TalentAttachmentData = res.data.data.attachments;
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
    },
    //根据id获取用户信息(报告时间)
    getPersonalById() {
      this.testoptions = [];
      this.downoption = [];
      var para = this.$route.query;
      this.listLoading = true;
      this.$http.post(api.talent.getPersonalById(), formatUrl(para)).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            // console.log(res);
            this.listLoading = false;
            if (res.data.data.length > 0) {
              for (var i = 0; i < res.data.data.length; i++) {
                // if (res.data.data[i].clientId) {
                res.data.data[i].updateDate =
                  new Date(res.data.data[i].updateDate).getFullYear() +
                  "-" +
                  (parseInt(new Date(res.data.data[i].updateDate).getMonth()) +
                    1) +
                  "-" +
                  new Date(res.data.data[i].updateDate).getDate() +
                  "   " +
                  new Date(res.data.data[i].updateDate).getHours() +
                  " : " +
                  (new Date(res.data.data[i].updateDate).getMinutes() > 9
                    ? new Date(res.data.data[i].updateDate).getMinutes()
                    : "0" + new Date(res.data.data[i].updateDate).getMinutes());
                this.testoptions.push({
                  clientId: res.data.data[i].clientId,
                  updateDate: res.data.data[i].updateDate,
                  isShow: res.data.data[i].clientId ? false : true
                });
                this.downoptions.push({
                  ids: res.data.data[i].id,
                  updateDate: res.data.data[i].updateDate
                });
                // }
              }
            }
          }
          if (res.data.code == "500") {
            this.testoptions = [];
            this.downoption = [];
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
    //分数（如果用户做过测试）
    changeClick(tab, event) {
      if (tab.name == "third") {
        this.$http
          .post(
            api.talent.getPersonalById(),
            formatUrl({ id: this.$route.query.id })
          )
          .then(
            res => {
              if (res.data.code == "911") {
                location.href = "./login.html";
              }
              if (res.data.code == "00") {
                if (res.data.data.length > 0) {
                  if (res.data.data[0].icsResult) {
                    this.IcsResultform = [res.data.data[0].icsResult];
                  } else {
                    this.IcsResultform = [];
                  }
                  if (res.data.data[0].cogResult) {
                    this.IcogResultform = [res.data.data[0].cogResult];
                  } else {
                    this.IcogResultform = [];
                  }
                  if (res.data.data[0].heResult) {
                    this.heResultform = [res.data.data[0].heResult];
                    res.data.data[0].heResult.results = res.data.data[0].heResult.results
                      // res.data.data[0].heResult.results = res.data.data[0].heResult.results
                      .replace(/AB0/g, "个人情况")
                      .replace(/AB2/g, "大胆开拓")
                      .replace(/AB3/g, "求知思考")
                      .replace(/AB4/g, "深究创造")
                      .replace(/AB5/g, "激烈竞争")
                      .replace(/AB6/g, "自信努力")
                      .replace(/AB7/g, "行动表现")
                      .replace(/AB8/g, "友善服务")
                      .replace(/AB9/g, "资源管理")
                      .replace(/AB10/g, "社交销售")
                      .replace(/_/g, "")
                      .replace(/AB1/g, "谨慎守规");
                    // console.log(res.data.data[0].heResult.results)
                    res.data.data[0].heResult.results = eval(
                      "(" + res.data.data[0].heResult.results + ")"
                    );
                    this.ab0values =
                      res.data.data[0].heResult.results.ab0Values;
                    this.ab0Colors =
                      res.data.data[0].heResult.results.ab0Colors;
                    this.ab1values =
                      res.data.data[0].heResult.results.ab1Values;
                    this.ab1Colors =
                      res.data.data[0].heResult.results.ab1Colors;
                    this.ab2values =
                      res.data.data[0].heResult.results.ab2Values;
                    this.ab2Colors =
                      res.data.data[0].heResult.results.ab2Colors;
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
                        if (this.ab0values[i].split(",")[0] == "求知思考") {
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
                        if (this.ab1values[i].split(",")[0] == "求知思考") {
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
                        if (this.ab2values[i].split(",")[0] == "求知思考") {
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
                  } else {
                    this.heResultform = [];
                    this.ab0values = "";
                    this.ab0Colors = "";
                    this.ab1values = "";
                    this.ab1Colors = "";
                    this.ab2values = "";
                    this.ab2Colors = "";
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
      }
    },
    checkscore() {
      this.$http
        .post(
          api.talent.getPersonalById(),
          formatUrl({ id: this.$route.query.id })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              if (res.data.data.length > 0) {
                if (res.data.data[0].icsResult) {
                  this.IcsResultform = [res.data.data[0].icsResult];
                } else {
                  this.IcsResultform = [];
                }
                if (res.data.data[0].cogResult) {
                  this.IcogResultform = [res.data.data[0].cogResult];
                } else {
                  this.IcogResultform = [];
                }
                if (res.data.data[0].heResult) {
                  this.heResultform = [res.data.data[0].heResult];
                  res.data.data[0].heResult.results = res.data.data[0].heResult.results
                    // res.data.data[0].heResult.results = res.data.data[0].heResult.results
                    .replace(/AB0/g, "个人情况")
                    .replace(/AB2/g, "大胆开拓")
                    .replace(/AB3/g, "求知思考")
                    .replace(/AB4/g, "深究创造")
                    .replace(/AB5/g, "激烈竞争")
                    .replace(/AB6/g, "自信努力")
                    .replace(/AB7/g, "行动表现")
                    .replace(/AB8/g, "友善服务")
                    .replace(/AB9/g, "资源管理")
                    .replace(/AB10/g, "社交销售")
                    .replace(/_/g, "")
                    .replace(/AB1/g, "谨慎守规");
                  // console.log(res.data.data[0].heResult.results)
                  res.data.data[0].heResult.results = eval(
                    "(" + res.data.data[0].heResult.results + ")"
                  );
                  this.ab0values = res.data.data[0].heResult.results.ab0Values;
                  this.ab0Colors = res.data.data[0].heResult.results.ab0Colors;
                  this.ab1values = res.data.data[0].heResult.results.ab1Values;
                  this.ab1Colors = res.data.data[0].heResult.results.ab1Colors;
                  this.ab2values = res.data.data[0].heResult.results.ab2Values;
                  this.ab2Colors = res.data.data[0].heResult.results.ab2Colors;
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
                      if (this.ab0values[i].split(",")[0] == "求知思考") {
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
                      if (this.ab1values[i].split(",")[0] == "求知思考") {
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
                      if (this.ab2values[i].split(",")[0] == "求知思考") {
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
                } else {
                  this.heResultform = [];
                  this.ab0values = "";
                  this.ab0Colors = "";
                  this.ab1values = "";
                  this.ab1Colors = "";
                  this.ab2values = "";
                  this.ab2Colors = "";
                }
              } else {
                this.findscore();
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
    cancelbutton() {
      // location.reload()
      this.dialogFormVisibleTip = false;
      this.findPoolById();
    },

    //备注dialog
    besurebutton(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisibleTip = false;
          // console.log(this.statusTalentform);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    openUpdateTalent(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      var para = this.$route.query;
      this.$http.post(api.talent.findPoolById(), formatUrl(para)).then(
        res => {
          if (res.data.code == "00") {
            this.editTalentdialog = true;
            // this.optionsStatus = res.data.data;
            this.talentuserform1 = res.data.data;
            console.log(res);
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
    },
    cancelTalentdialog(formName) {
      // if (this.$refs[formName] !== undefined) {
      //   this.$refs[formName].resetFields();
      // }
      // this.findPoolById();
      this.editTalentdialog = false;
    },
    //修改个人信息
    updateTalent(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isupdateTalent = true;
          if (this.statusTalentform.reason) {
            this.statusTalentform = {
              talentId: this.$route.query.id,
              reason: this.statusTalentform.reason,
              changed: this.statusTalentform.changed
            };
            this.updateTalentform = {
              name: this.talentuserform1.name,
              mail: this.talentuserform1.mail,
              phone: this.talentuserform1.phone,
              status: this.statusTalentform
            };

            // console.log(this.updateTalentform);
            this.$http
              .post(api.talent.updateTalent(), this.updateTalentform)
              .then(
                res => {
                  if (res.data.code == "00") {
                    this.$message({
                      message: this.$t('msg.msg8'),
                      type: "success"
                    });
                    this.isupdateTalent = false;
                    // if (this.$refs[formName] !== undefined) {
                    //   this.$refs[formName].resetFields();
                    // }
                    this.editTalentdialog = false;
                    this.findPoolById();
                    this.findByTalentIdTalentHistoryStatus();
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
            // console.log(this.updateTalentform);
            this.updateTalentform = {
              name: this.talentuserform1.name,
              mail: this.talentuserform1.mail,
              phone: this.talentuserform1.phone,
              status: {
                talentId: this.$route.query.id,
                reason: this.$t('valid.valid061'),
                changed: this.talentuserform1.status
              }
            };
            this.$http
              .post(api.talent.updateTalent(), this.updateTalentform)
              .then(
                res => {
                  if (res.data.code == "00") {
                    this.isupdateTalent = false;
                    this.$message({
                      message: this.$t('msg.msg8'),
                      type: "success"
                    });
                    // if (this.$refs[formName] !== undefined) {
                    //   this.$refs[formName].resetFields();
                    // }
                    this.editTalentdialog = false;
                    this.findPoolById();
                    this.findByTalentIdTalentHistoryStatus();
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
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //查询个人报告
    personalReport(v) {
      var clientId = v;
      // if (clientId) {
      this.$http.post(api.ics.personalReport(), formatUrl({ clientId })).then(
        res => {
          if (res.data.code == "00") {
            // console.log(res);
            this.bardata = res.data.data.bar;
            let newrabardata = [];
            let rabardata = res.data.data.userProfessionalTendenciesVO;
            newrabardata.push(rabardata["tingLingPeiHe"]);
            newrabardata.push(rabardata["zunXunGuiZe"]);
            newrabardata.push(rabardata["wenDingRenWu"]);
            newrabardata.push(rabardata["gouTongChuLi"]);
            newrabardata.push(rabardata["zhuDaoLingDao"]);
            newrabardata.push(rabardata["daDanTuPo"]);
            newrabardata.push(rabardata["fanZaRenWu"]);
            newrabardata.push(rabardata["siKaoChuLi"]);
            this.userProfessionalTendenciesVO = newrabardata;
            this.reportpart = res.data.data;
            if (res.data.data.part1 && res.data.data.part1.length != 0) {
              this.reportpart1 = res.data.data.part1;
              if (
                res.data.data.part1.other &&
                res.data.data.part1.other.length != 0
              ) {
                res.data.data.part1.other.forEach(el => {
                  res.data.data.part2.push(el);
                });
              }
            } else {
              this.reportpart1 = {};
            }
            if (res.data.data.part2 && res.data.data.part2.length != 0) {
              this.reportpart2 = res.data.data.part2;
            } else {
              this.reportpart2 = [];
            }
            if (res.data.data.part3 && res.data.data.part3.length != 0) {
              this.reportpart3 = res.data.data.part3;
            } else {
              this.reportpart3 = [];
            }
          }
          if (res.data.code == "500") {
            this.userProfessionalTendenciesVO = [];
            this.reportpart1 = {};
            this.reportpart2 = [];
            this.reportpart3 = [];
            this.$message({
              message: this.$t('msg.msg23'),
              type: "error"
            });
          }
        },
        error => {
          console.log(error);
        }
      );
      // }
    },
    //报告下载
    downreport(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.dialogFormVisible6 = true;
    },
    exportEvaluationReport(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.buttonloading2 = true;
          let para = this.downruleForm;
          // console.log(para);
          this.$http
            .get(api.ics.exportEvaluationReport(), {
              params: para,
              headers: {
                "Content-Type": "application/pdf;charset =utf-8"
              }
            })
            .then(
              res => {
                this.dialogFormVisible6 = false;
                if (res.data.code == "500") {
                  this.buttonloading2 = false;
                  this.$message({
                    type: "error",
                    message: res.data.errMessage
                  });
                } else if (res.data.data == "java.lang.NullPointerException") {
                  this.buttonloading2 = false;
                  return this.$message({
                    type: "error",
                    message: this.$t('msg.msg20')
                  });
                } else {
                  this.buttonloading2 = false;
                  window.open(
                    api.ics.exportEvaluationReport() + "?" + formatUrl(para),
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

      // console.log(this.downruleForm);
      // console.log(this.downoptions);
    },
    // select改变
    selectTip(formName, v) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.dialogFormVisibleTip = true;
      this.statusTalentform.changed = v;
    },
    //导出简历

    exportPoolById() {
      this.resumeloading = true;
      let para = { id: this.$route.query.id };
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
              this.resumeloading = false;
              this.$message({
                type: "error",
                message: res.data.errMessage
              });
            } else if (res.data.data == "java.lang.NullPointerException") {
              this.resumeloading = false;
              return this.$message({
                type: "error",
                message: this.$t('msg.msg25')
              });
            } else {
              this.resumeloading = false;
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
    },
    //删除备注
    deleteHistoryStatus(para) {
      this.$confirm(this.$t("systemManagement.tip.contetn"),         this.$t("systemManagement.tip.title"), {
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(
              api.TalentHistoryStatus.deleteHistoryStatus(),
              formatUrl({ id: para.id })
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  // console.log(res);
                  this.findByTalentIdTalentHistoryStatus();
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
    // 翻页
    preclick() {
      this.clearOption();
      this.bardata = {};
      this.reportpart1 = {};
      this.reportpart2 = [];
      this.reportpart3 = [];
      var FlipList = localStorage.getItem("poolids")
        ? JSON.parse(localStorage.getItem("poolids"))
        : [];
      var idIndex = FlipList.indexOf(parseInt(this.$route.query.id));
      if (idIndex <= 0) {
        if (idIndex == -1) {
          this.$router.push({
            path: "/pooldetail",
            query: { id: FlipList[0] }
          });
          this.getPersonalById();
          this.findPoolById();
          this.findByTalentId();
          this.checkscore();
        } else {
          this.$message({
            type: "warning",
            message: this.$t('msg.msg26')
          });
        }
      } else {
        this.$router.push({
          path: "/pooldetail",
          query: { id: FlipList[idIndex - 1] }
        });
        this.getPersonalById();
        this.findPoolById();
        this.findByTalentId();
        this.checkscore();
      }
      // console.log(this.$store.state.FlipList);
    },
    nextclick() {
      // this.testruleForm.clientId = null;
      // this.testruleForm.language = null;
      this.clearOption();
      this.bardata = {};
      this.reportpart1 = {};
      this.reportpart2 = [];
      this.reportpart3 = [];
      var FlipList = JSON.parse(localStorage.getItem("poolids"));
      var idIndex = FlipList.indexOf(parseInt(this.$route.query.id));
      // console.log(FlipList);
      // console.log(idIndex);
      // console.log(FlipList.indexOf(parseInt(this.$route.query.id)));
      if (idIndex == -1) {
        this.$router.push({
          path: "/pooldetail",
          query: { id: FlipList[FlipList.length - 1] }
        });
        this.getPersonalById();
        this.findPoolById();
        this.findByTalentId();
        this.checkscore();
      } else if (idIndex >= FlipList.length - 1) {
        this.$message({
          type: "warning",
          message: this.$t('msg.msg27')
        });
      } else {
        this.$router.push({
          path: "/pooldetail",
          query: { id: FlipList[idIndex + 1] }
        });
        this.getPersonalById();
        this.findPoolById();
        this.findByTalentId();
        this.checkscore();
      }
      // console.log(this.$store.state.FlipList.indexOf(this.$route.query.id));
    }
  }
};
</script>
<style >
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

.ratebar .el-rate {
  width: 50%;
  float: left;
  position: absolute;
}

span.el-rate__item {
  width: 20%;
  float: left;
}

i.el-rate__icon.el-icon-my-square {
  font-size: 50px;
  margin-right: 0;
}

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

.heResultform {
  background-color: #fff;
  float: left;
  width: 100% !important;
  margin: 0;
  color: #878d99;
  margin-bottom: 10px;
}

.heResultform th,
.heResultform td {
  box-sizing: border-box;
  height: 48px;
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

.el-input-group {
  width: 100%;
}

.el-form-item__label {
  text-align: left;
}

.el-table th {
  text-align: center;
}

.el-button--small,
.el-button--small.is-round {
  margin-top: 3px;
  /*float: right;*/
}

/* .el-tabs__content {
  border: 1px solid #ccc;
  margin-bottom: 30px;
  padding: 0 47px;
} */

h3 {
  margin: 30px auto 10px;
}

.arrow-left,
.arrow-right {
  font-size: 50px;
  position: absolute;
  cursor: pointer;
  /* display: none; */
}

.arrow-left {
  left: 10px;
  top: 200px;
  margin-left: -50px;
}

.arrow-right {
  right: 10px;
  top: 200px;
  margin-right: -50px;
}

#juhao div:nth-last-child(1) {
  display: none;
}

.Tipdialog a {
  color: #239838;
}

.Tipdialog .el-dialog__header {
  text-align: left;
}

.userform {
  overflow: hidden;
  position: relative;
}

.userform .el-form-item {
  height: 41px;
  width: 45%;
  float: left;
  /* overflow: hidden; */
}

.userform .el-form-item:nth-child(even) {
  margin-left: 10%;
  text-align: left;
}

.reportSelect {
  /* overflow: hidden; */
  margin: 20px 0;
}

.reportSelect .el-form-item {
  width: 40%;
  float: left;
}

.reportSelect .el-form-item .el-select {
  width: 100%;
}

.reportSelect .el-form-item + .el-form-item {
  margin-left: 20%;
}

.reportSelect .el-form-item .el-form-item__label {
  width: 30%;
  float: left;
}

.reportSelect .el-form-item .el-form-item__content {
  float: right;
  width: 70%;
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

.el-table__header tr {
  background-color: #ccc;
}

/* // */

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

/* .el-radio__inner {
  width: 20px;
  height: 20px;
} */

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

/* .baseinfo .el-form-item__content {
  overflow: hidden;
} */

.attachment {
  margin: 20px 0;
  overflow: hidden;
}

.attachment button {
  float: right;
  margin: 0 0 0 20px;
}

.upload-demo {
  overflow: hidden;
  position: relative;
}

.el-upload {
  position: absolute;
  right: 115px;
}

.chuanbutton,
.youbutton {
  float: right;
  /* padding: 10px 25px; */
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

.provinceList li:hover {
  color: #239838;
}

.el-cascader {
  width: 100%;
}

.tradedialog .el-dialog__body {
  padding-left: 10px;
}

.tradedialog .el-dialog {
  min-width: 840px;
}

.tradedialog .el-dialog__footer {
  text-align: center;
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

.tradesmall .el-button + .el-button {
  margin: 0;
}

.jobbig .jobLi .el-button {
  /* width: 33.33%; */
  width: 50%;
  float: left;
}
.jobbig .jobLi span {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.jobname {
  width: 30%;
  margin-right: 3%;
  margin-bottom: 1%;
  float: left;
}

.tradeList .jobname:hover {
  color: #239838;
}

.jobbig {
  /* width: 80%;
  float: right; */
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
.infoTab .el-tabs__nav {
  left: 50%;
  transform: translateX(-50%) !important;
}

.birthday .el-form-item__content .block {
  width: 49%;
  float: left;
}

.birthday .el-form-item__content .el-select {
  width: 49%;
  float: right;
}

.newstatus .el-select {
  float: left;
  width: 50%;
  margin-right: 20%;
}

.updateTime .el-form-item__content {
  text-align: left;
}

.editnewstatus .el-select {
  width: 100%;
}

.detail {
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

.subdetail {
  background-color: #fff;
  padding: 0 30px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #cccccc;
  overflow: hidden;
}

.detail_top {
  overflow: hidden;
  padding: 20px 0;
}

.detailword {
  float: left;
  font: normal 24px "Microsoft YaHei";
}

.detailbutton {
  float: right;
}

.el-icon-my-xiazai1 {
  font-size: 12px;
}

.businessInfo.el-tabs--border-card > .el-tabs__content {
  min-height: 500px;
  /* overflow-y: scroll; */
  margin-bottom: 30px;
}

.mytalent.el-tabs > .el-tabs__content {
  height: 420px;
  overflow-y: scroll;
}

.mytalent.el-tabs > .el-tabs__content .el-tab-pane {
  position: relative;
  padding-right: 10px;
}

.scoretab {
  box-shadow: 2px 2px 2px #ccc;
  border: 1px solid #f4f8fc;
  margin-bottom: 20px;
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
}

.el-button--mini {
  padding: 7px 0;
  float: left;
  width: 50%;
  margin-left: 0;
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

  