<template>
  <!--主体部分-->

  <div
    class="detail"
    ref="viewBox"
  >
    <!-- Form -->
    <el-dialog
      :visible.sync="dialogFormVisible6"
      width="25%"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item
          :label="$t('ics.tip.selectLang')"
          prop="language"
        >
          <el-select v-model="ruleForm.language">
            <el-option
              :label="$t('ics.email.cn')"
              value="cn"
            ></el-option>
            <el-option
              :label="$t('ics.email.en')"
              value="en"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible6 = false">{{$t('btn.cancel')}}</el-button>
        <el-button
          type="success"
          class="green"
          @click="exportEvaluationReport('ruleForm')"
          :loading="buttonloading2"
        >{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑框 -->
    <el-dialog
      :visible.sync="editdialog"
      width="25%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form
        label-width="120px"
        :model="userform1"
        ref="userform1"
        :rules="userformrules"
        label-position="left"
      >
        <el-form-item
          :label="$t('ics.email.name')"
          prop="name"
        >
          <el-input
            v-model.trim="userform1.name"
            :placeholder="$t('valid.inputName')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('ics.email.email')"
          prop="email"
        >
          <el-input
            v-model.trim="userform1.email"
            :placeholder="$t('valid.userplaceholder')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('ics.email.link')"
          prop="contact"
        >
          <el-input
            v-model.trim="userform1.contact"
            :placeholder="$t('valid.inputlink')"
            :blur="setphonechange(userform1.contact)"
            v-on:change="phonechange"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="canceleditdialog('userform1')">{{$t('btn.cancel')}}</el-button>
        <el-button
          type="success"
          class="green"
          @click="updatePersonalInfo('userform1')"
          :loading="buttonloading"
        >{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- <div class="detailtitle">Centalent > 个人测评管理列表页 >
      <span>个人测评管理详情页</span>
    </div> -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="detailtitle"
    >
      <el-breadcrumb-item>
        <a href="./news.html">Centalent</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/icsperson' }">{{$t('ics.icsPage')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('ics.icsList')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="subdetail">
      <div class="detail_top">
        <div class="detailword">
          {{$t('ics.detail.perinfo')}}
        </div>
        <div class="detailbutton">
          <el-button
            type="info"
            size="small"
            @click="exportPoolById"
            :loading="resumeloading"
            :disabled="this.$route.query.talentPoolId?false:true"
            v-if="this.$store.state.Privilege.includes('BUTTON_TALENT_RESUME_DOWNLOAD')"
          >{{$t('btn.b7')}}
            <i class="el-icon-my-xiazai1 el-icon--right"></i>
          </el-button>
          <el-button
            type="info"
            size="small"
            @click="dialogFormVisible6 = true"
            v-if="this.$store.state.Privilege.includes('BUTTON_TALENT_REPORT_DOWNLOAD')"
          > {{$t('btn.downloadReport')}}
            <i class="el-icon-my-xiazai1 el-icon--right"></i>
          </el-button>
          <el-button
            class="blue"
            size="small"
            @click="openeditdialog('userform1')"
          >{{$t('ics.detail.editInfo')}}</el-button>
        </div>
      </div>
      <el-form
        label-width="180px"
        :model="userform"
        ref="userform"
      >
        <el-form-item
          :label="$t('ics.email.name')"
          prop="name"
        >
          <el-input
            v-model.trim="userform.name"
            :readonly="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('ics.email.email')"
          prop="email"
        >
          <el-input
            v-model.trim="userform.email"
            :readonly="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('ics.email.link')"
          prop="contact"
        >
          <el-input
            v-model.trim="userform.contact"
            :readonly="true"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div
      class="bigbox"
      style="position:relative"
    >
      <div
        class="el-icon-caret-left arrow-left"
        @click="preclick"
      ></div>
      <div
        class="el-icon-caret-right arrow-right"
        @click="nextclick"
      ></div>
      <el-tabs
        v-model="activeName"
        type="border-card"
        class="icscard businessInfo"
      >
        <el-tab-pane
          :label="$t('ics.detail.tab01')"
          name="first"
          v-loading="listLoading"
          v-if="this.$store.state.Privilege.includes('TAB_TALENT_SCORE_NEW')"
        >
          <score
            :IcsResultform="IcsResultform"
            :IcogResultform="IcogResultform"
            :ab0values="ab0values"
            :totalResultform="totalResultform"
            :ab0Colors="ab0Colors"
            :ab1Colors="ab1Colors"
            :ab1values="ab1values"
            :ab2Colors="ab2Colors"
            :ab2values="ab2values"
          ></score>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('ics.detail.tab02')"
          name="second"
          v-if="this.$store.state.Privilege.includes('TAB_TALENT_REPORT')"
        >
          <reportcn
            :userProfessionalTendenciesVO='userProfessionalTendenciesVO'
            :userform="userform"
            :bardata="bardata"
            :reportpart1="reportpart1"
            :reportpart2="reportpart2"
            :reportpart3="reportpart3"
            :IcogResultform="IcogResultform"
          ></reportcn>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('ics.detail.tab03')"
          name="third"
          v-if="this.$store.state.Privilege.includes('TAB_TALENT_REPORT')"
        >
          <reporten
            :userform="userform"
            :bardata="bardata"
            :reportpart1="reportpart1"
            :reportpart2="reportpart2"
            :reportpart3="reportpart3"
          ></reporten>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
import reportcn from "./reportcn.vue";
import reporten from "./reporten.vue";
import score from "./score.vue";

export default {
  data() {
    return {
      editdialog: false,
      userformrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.inputName"),
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: this.$t("valid.userplaceholder"),
            trigger: "blur"
          },
          { type: "email", message: this.$t("valid.valid022"), trigger: "blur" }
        ],
        contact: [
          {
            required: true,
            message: this.$t("valid.inputlink"),
            trigger: "blur"
          },
          {
            pattern: /^1[3|4|5|7|8|9][0-9]{9}$/,
            message: this.$t("valid.valid020"),
            trigger: "blur"
          }
        ]
      },
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: this.$t("valid.valid047"),
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          }
        ]
      },
      TalentAttachmentData: [],
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
      talentPool: {},
      ruleForm: {
        language: "cn"
      },
      rules: {
        language: [
          {
            required: true,
            message: this.$t("valid.valid011"),
            trigger: "change"
          }
        ]
      },
      status: "",
      schedule: "",
      dialogFormVisible6: false,
      bardata: "",
      reportpart1: {},
      reportpart2: [],
      reportpart3: [],
      buttonloading: false,
      buttonloading2: false,
      listLoading: false,
      activeName: "first",
      userform: {
        id: "",
        name: "",
        email: "",
        contact: ""
      },
      userform1: {},
      IcsResultform: [],
      IcogResultform: [],
      totalResultform: [
        {
          AB0: "",
          AB1: "",
          AB2: "",
          AB3: "",
          AB4: "",
          AB5: "",
          AB6: "",
          AB7: "",
          AB8: "",
          AB9: "",
          AB10: ""
        }
      ],
      ab0values: "",
      ab0Colors: "",
      ab1values: "",
      ab1Colors: "",
      ab2values: "",
      ab2Colors: "",
      userProfessionalTendenciesVO: []
    };
  },
  components: {
    reportcn,
    reporten,
    score
  },
  created() {
    this.getPersonalById();
    this.personalReport();
    this.$store.state.Privilege.includes("TAB_TALENT_SCORE_NEW")
      ? (this.activeName = "first")
      : (this.activeName = "second");
  },
  mounted() {},

  filters: {},
  methods: {
    setphonechange(value) {
      this.phonechange(value);
    },
    phonechange(value) {
      // 目的是去掉字符串中除数字之外的其它字符
      if (this.userform1.contact) {
        this.$nextTick(() => {
          this.userform1.contact = value.replace(/[^\d]/g, "");
        });
      }
    },
    //根据id获取用户信息
    getPersonalById() {
      var para = this.$route.query;
      console.log(para);
      this.listLoading = true;
      this.$http.post(api.ics.getPersonalById(), formatUrl(para)).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            // console.log(res)
            if (res.data.data.talentPool) {
              if (!res.data.data.talentPool.birthTime) {
                res.data.data.talentPool.birthTime = "null";
              }
              this.talentPool = res.data.data.talentPool;
              this.WorkExperienceform = res.data.data.talentPool.workExperiences
                ? res.data.data.talentPool.workExperiences
                : [{}];
              this.ProjectExperienceform = res.data.data.talentPool
                .projectEperiences
                ? res.data.data.talentPool.projectEperiences
                : [{}];
              this.Skillsform.talentSkills = res.data.data.talentPool.skills
                ? res.data.data.talentPool.skills
                : [{}];
              this.Skillsform.trainingExperiences = res.data.data.talentPool
                .trainingExperiences
                ? res.data.data.talentPool.trainingExperiences
                : [{}];
              this.Skillsform.talentCertificates = res.data.data.talentPool
                .certificates
                ? res.data.data.talentPool.certificates
                : [{}];

              if (res.data.data.talentPool.attachments) {
                res.data.data.talentPool.attachments.forEach(el => {
                  el.uploadTime =
                    new Date(el.uploadTime).getFullYear() +
                    "-" +
                    new Date(el.uploadTime).getMonth() +
                    1 +
                    "-" +
                    new Date(el.uploadTime).getDate();
                });
              }
              this.TalentAttachmentData = res.data.data.talentPool.attachments;
            }

            // console.log(res);

            this.listLoading = false;
            this.status = res.data.data.status;
            this.schedule = res.data.data.schedule;
            this.userform = res.data.data;
            document.title = `${this.$t("sidebar.ics")}-${res.data.data.name}`;
            if (res.data.data.icsResult) {
              this.IcsResultform = [res.data.data.icsResult];
            } else {
              this.IcsResultform = [];
            }
            if (res.data.data.cogResult) {
              this.IcogResultform = [res.data.data.cogResult];
            } else {
              this.IcogResultform = [];
            }
            if (res.data.data.heResult) {
              // var result = res.data.data.heResult.results
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
              // console.log(res.data.data.heResult.results)
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

              // console.log(!isNaN(AB3 + BAB3 + CAB3))

              this.totalResultform[0].AB0 = AB0;
              // AB0 + BAB0 + CAB0 == 0 || isNaN(AB0 + BAB0 + CAB0)
              //   ? ""
              //   : AB0 + BAB0 + CAB0;
              this.totalResultform[0].AB1 = res.data.data.heResult.ab1;
              // AB1 + BAB1 + CAB1 == 0 || isNaN(AB1 + BAB1 + CAB1)
              //   ? ""
              //   : AB1 + BAB1 + CAB1;
              this.totalResultform[0].AB2 = res.data.data.heResult.ab2;
              // AB2 + BAB2 + CAB2 == 0 || isNaN(AB2 + BAB2 + CAB2)
              //   ? ""
              //   : AB2 + BAB2 + CAB2;
              this.totalResultform[0].AB3 = res.data.data.heResult.ab3;
              // AB3 + BAB3 + CAB3 == 0 || isNaN(AB3 + BAB3 + CAB3)
              //   ? ""
              //   : AB3 + BAB3 + CAB3;
              this.totalResultform[0].AB4 = res.data.data.heResult.ab4;
              // AB4 + BAB4 + CAB4 == 0 || isNaN(AB4 + BAB4 + CAB4)
              //   ? ""
              //   : AB4 + BAB4 + CAB4;
              this.totalResultform[0].AB5 = res.data.data.heResult.ab5;
              // AB5 + BAB5 + CAB5 == 0 || isNaN(AB5 + BAB5 + CAB5)
              //   ? ""
              //   : AB5 + BAB5 + CAB5;
              this.totalResultform[0].AB6 = res.data.data.heResult.ab6;
              // AB6 + BAB6 + CAB6 == 0 || isNaN(AB6 + BAB6 + CAB6)
              //   ? ""
              //   : AB6 + BAB6 + CAB6;
              this.totalResultform[0].AB7 = res.data.data.heResult.ab7;
              // AB7 + BAB7 + CAB7 == 0 || isNaN(AB7 + BAB7 + CAB7)
              //   ? ""
              //   : AB7 + BAB7 + CAB7;
              this.totalResultform[0].AB8 = res.data.data.heResult.ab8;
              // AB8 + BAB8 + CAB8 == 0 || isNaN(AB8 + BAB8 + CAB8)
              //   ? ""
              //   : AB8 + BAB8 + CAB8;
              this.totalResultform[0].AB9 = res.data.data.heResult.ab9;
              // AB9 + BAB9 + CAB9 == 0 || isNaN(AB9 + BAB9 + CAB9)
              //   ? ""
              //   : AB9 + BAB9 + CAB9;
              this.totalResultform[0].AB10 = res.data.data.heResult.ab10;
              // AB10 + BAB10 + CAB10 == 0 || isNaN(AB10 + BAB10 + CAB10)
              //   ? ""
              //   : AB10 + BAB10 + CAB10;
            } else {
              this.ab0values = "";
              this.ab0Colors = "";
              this.ab1values = "";
              this.ab1Colors = "";
              this.ab2values = "";
              this.ab2Colors = "";
            }

            console.log(res);
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
    canceleditdialog(formName) {
      // if (this.$refs[formName] !== undefined) {
      //   this.$refs[formName].resetFields();
      // }
      this.editdialog = false;
      // this.getPersonalById();
    },
    //编辑个人信息
    updatePersonalInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.buttonloading = true;
          // console.log(this.userform)
          this.$http
            .post(api.ics.updatePersonalInfo(), formatUrl(this.userform1))
            .then(
              res => {
                if (res.data.code == "00") {
                  this.getPersonalById();
                  this.buttonloading = false;
                  this.$message({
                    message: this.$t("msg.msg8"),
                    type: "success"
                  });
                  // if (this.$refs[formName] !== undefined) {
                  //   this.$refs[formName].resetFields();
                  // }
                  this.editdialog = false;
                }
                if (res.data.code == "500") {
                  this.$message({
                    message: res.data.errMessage,
                    type: "error"
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
    //查询个人报告
    personalReport() {
      var clientId = this.$route.query.clientId;
      if (clientId) {
        this.$http.post(api.ics.personalReport(), formatUrl({ clientId })).then(
          res => {
            if (res.data.code == "00") {
              // console.log("fja");
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
              this.bardata = {};
              this.reportpart1 = {};
              this.reportpart2 = [];
              this.reportpart3 = [];
              this.userProfessionalTendenciesVO = [];
              this.$message({
                message: this.$t("msg.msg23"),
                type: "error"
              });
            }
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.$message({
          message: this.$t("msg.msg23"),
          type: "error"
        });
        this.bardata = {};
        this.reportpart1 = {};
        this.reportpart2 = [];
        this.reportpart3 = [];
        this.userProfessionalTendenciesVO = [];
      }
    },
    exportEvaluationReport(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.status == "COMPLETED" && this.schedule == "ThirdStep") {
            this.buttonloading2 = true;
            let para = {
              ids: this.$route.query.id,
              language: this.ruleForm.language
            };
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
                    if (this.language == "cn") {
                      this.$message({
                        type: "error",
                        message: this.$t("msg.msg24")
                      });
                    }
                    if (this.language == "en") {
                      this.$message({
                        type: "error",
                        message: "You don't have reports to download!"
                      });
                    }
                  } else if (
                    res.data.data == "java.lang.NullPointerException"
                  ) {
                    this.buttonloading2 = false;
                    return this.$message({
                      type: "error",
                      message: this.$t("msg.msg20")
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
            if (this.ruleForm.language == "cn") {
              this.$message({
                type: "error",
                message: this.$t("msg.msg24")
              });
            }
            if (this.ruleForm.language == "en") {
              this.$message({
                type: "error",
                message: "You don't have reports to download!"
              });
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //导出简历

    exportPoolById() {
      this.resumeloading = true;
      let para = { id: this.$route.query.talentPoolId };
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
                message: this.$t("msg.msg25")
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
    //上一条
    preclick() {
      var FlipList = JSON.parse(localStorage.getItem("icsids"));
      // var FlipList = localStorage.getItem("icsids");

      var idobj = {
        id: parseInt(this.$route.query.id),
        clientId: this.$route.query.clientId
          ? parseInt(this.$route.query.clientId)
          : null,
        talentPoolId: this.$route.query.talentPoolId
          ? parseInt(this.$route.query.talentPoolId)
          : null
      };
      var idss = [];
      FlipList.forEach(el => {
        idss.push(el.id);
      });
      var ids = idobj.id;

      var idIndex = idss.indexOf(ids);

      if (idIndex <= 0) {
        if (idIndex == -1) {
          this.$router.push({
            path: "/icsdetail",
            query: {
              id: FlipList[0].id,
              clientId: FlipList[0].clientId,
              talentPoolId: FlipList[0].talentPoolId
            }
          });
          this.getPersonalById();
          this.personalReport();
        } else {
          this.$message({
            type: "warning",
            message: this.$t("msg.msg26")
          });
        }
      } else {
        this.$router.push({
          path: "/icsdetail",
          query: {
            id: FlipList[idIndex - 1].id,
            clientId: FlipList[idIndex - 1].clientId,
            talentPoolId: FlipList[idIndex - 1].talentPoolId
          }
        });
        this.getPersonalById();
        this.personalReport();
      }
    },
    nextclick() {
      var FlipList = JSON.parse(localStorage.getItem("icsids"));
      var idobj = {
        id: parseInt(this.$route.query.id),
        clientId: this.$route.query.clientId
          ? parseInt(this.$route.query.clientId)
          : null,
        talentPoolId: this.$route.query.talentPoolId
          ? parseInt(this.$route.query.talentPoolId)
          : null
      };
      var idss = [];
      FlipList.forEach(el => {
        idss.push(el.id);
      });
      var ids = idobj.id;

      var idIndex = idss.indexOf(ids);
      if (idIndex == -1) {
        this.$router.push({
          path: "/icsdetail",
          query: {
            id: FlipList[FlipList.length - 1].id,
            clientId: FlipList[FlipList.length - 1].clientId,
            talentPoolId: FlipList[FlipList.length - 1].talentPoolId
          }
        });
        this.getPersonalById();
        this.personalReport();
      } else if (idIndex >= FlipList.length - 1) {
        this.$message({
          type: "warning",
          message: this.$t("msg.msg27")
        });
      } else {
        this.$router.push({
          path: "/icsdetail",
          query: {
            id: FlipList[idIndex + 1].id,
            clientId: FlipList[idIndex + 1].clientId,
            talentPoolId: FlipList[idIndex + 1].talentPoolId
          }
        });
        this.getPersonalById();
        this.personalReport();
      }
      // console.log(this.$store.state.FlipList.indexOf(this.$route.query.id));
    },
    //编辑
    openeditdialog(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      var para = this.$route.query;
      this.$http.post(api.ics.getPersonalById(), formatUrl(para)).then(
        res => {
          if (res.data.code == "00") {
            this.editdialog = true;
            // this.optionsStatus = res.data.data;
            this.userform1 = res.data.data;
            // console.log(res);
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
  }
};
</script>
<style >
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

.arrow-left,
.arrow-right {
  font-size: 50px;
  position: absolute;
  cursor: pointer;
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

.el-icon-my-xiazai1 {
  font-size: 12px;
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
.subdetail .el-form-item {
  width: 45%;
  float: left;
  height: 40px;
}
.subdetail .el-form-item .el-form-item__label {
  text-align: left;
}
.subdetail .el-form-item:nth-child(even) {
  margin-left: 10%;
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
</style>

  