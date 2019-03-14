<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      custom-class="carouseltab"
      class=""
      Slot="title"
      :fullscreen="true"
      top="0"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-button
        @click="skipguide"
        type="text"
      >{{$t('news.swiper.skip')}}</el-button>
      <el-tabs
        type="border-card"
        :tab-position="'left'"
        :value="activename"
        @tab-click="tabclick"
      >
        <el-tab-pane
          :label="$t('news.swiper.basic')"
          name="carousel1"
        >

          <swiper
            :options="swiperOption1"
            ref="mySwiper1"
          >
            <swiper-slide
              v-for="(item,index) in imgsrc1"
              :key="index"
              class="stop-swiping"
            >
              <img
                :src="item.src"
                alt="基础流程介绍"
                @click="myclick1"
              >
            </swiper-slide>
            <div
              class="swiper-pagination"
              slot="pagination"
            ></div>
            <div
              class="swiper-button-prev"
              slot="button-prev"
            ></div>
            <div
              class="swiper-button-next"
              slot="button-next"
            ></div>
          </swiper>

        </el-tab-pane>
        <el-tab-pane
          :label="$t('news.swiper.position')"
          name="carousel2"
        >
          <swiper
            :options="swiperOption2"
            ref="mySwiper2"
          >
            <swiper-slide
              v-for="(item,index) in imgsrc2"
              :key="index"
              class="stop-swiping"
            >
              <img
                :src="item.src"
                alt="职位需求测评介绍"
                @click="myclick2"
              >
            </swiper-slide>
            <div
              class="swiper-pagination"
              slot="pagination"
            ></div>
            <div
              class="swiper-button-prev"
              slot="button-prev"
            ></div>
            <div
              class="swiper-button-next"
              slot="button-next"
            ></div>
          </swiper>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('news.swiper.ics')"
          name="carousel3"
        >
          <swiper
            :options="swiperOption3"
            ref="mySwiper3"
          >
            <swiper-slide
              v-for="(item,index) in imgsrc3"
              :key="index"
              class="stop-swiping"
            >
              <img
                :src="item.src"
                alt="个人职业倾向测评介绍"
                @click="myclick3"
              >
            </swiper-slide>
            <div
              class="swiper-pagination"
              slot="pagination"
            ></div>
            <div
              class="swiper-button-prev"
              slot="button-prev"
            ></div>
            <div
              class="swiper-button-next"
              slot="button-next"
            ></div>
          </swiper>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('news.swiper.prp')"
          name="carousel4"
        >
          <swiper
            :options="swiperOption4"
            ref="mySwiper4"
          >
            <swiper-slide
              v-for="(item,index) in imgsrc4"
              :key="index"
              class="stop-swiping"
            >
              <img
                :src="item.src"
                alt="个人职位匹配度报告介绍"
                @click="myclick4"
              >
            </swiper-slide>
            <div
              class="swiper-pagination"
              slot="pagination"
            ></div>
            <div
              class="swiper-button-prev"
              slot="button-prev"
            ></div>
            <div
              class="swiper-button-next"
              slot="button-next"
            ></div>
          </swiper>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('news.swiper.screen')"
          name="carousel5"
        >
          <swiper
            :options="swiperOption5"
            ref="mySwiper5"
          >
            <swiper-slide
              v-for="(item,index) in imgsrc5"
              :key="index"
              class="stop-swiping"
            >
              <img
                :src="item.src"
                alt="插件介绍"
                @click="myclick5"
              >
            </swiper-slide>
            <div
              class="swiper-pagination"
              slot="pagination"
            ></div>
            <div
              class="swiper-button-prev"
              slot="button-prev"
            ></div>
            <div
              class="swiper-button-next"
              slot="button-next"
            ></div>
          </swiper>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('news.swiper.account')"
          name="carousel6"
        >
          <swiper
            :options="swiperOption6"
            ref="mySwiper6"
          >
            <swiper-slide
              v-for="(item,index) in imgsrc6"
              :key="index"
              class="stop-swiping"
            >
              <img
                :src="item.src"
                alt="账号管理介绍"
                @click="myclick6"
              >
            </swiper-slide>
            <div
              class="swiper-pagination"
              slot="pagination"
            ></div>
            <div
              class="swiper-button-prev"
              slot="button-prev"
            ></div>
            <div
              class="swiper-button-next"
              slot="button-next"
            ></div>
          </swiper>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <div>
      <div class="iconpic">
        <div
          class="residuecount positionstate"
          v-if="this.$store.state.Privilege.includes('CONTENT_NEWS_EVALUATION_REMAIN')"
        >
          <div class="el-icon-my-tongji myicon myiconblue">
          </div>
          <div class="myiconblueright">
            <div class="wireless">{{$t('news.limit')}}: </div>
            <div class="wireless">{{userInfo.endTime}}</div>
            <div class='allcount'>{{$t('news.remains')}}: {{userInfo.evaluationRemain}}</div>
          </div>

        </div>
        <div class="residuecount companystate">
          <div class="el-icon-my-weibiaoti4 myicon myicongreen">

          </div>
          <div class="myicon_right myicon_rightdown">
            <a
              href="https://ics-appdata-prd.oss-cn-hangzhou.aliyuncs.com/51%E6%8F%92%E4%BB%B6-%E6%A3%AE%E6%9E%81%E6%9D%90.rar"
              target="_blank"
            >
              <el-button
                type="success"
                round
              >
                {{$t('news.jobdownload')}}
              </el-button>
            </a>
          </div>

        </div>
        <div class="residuecount guidestate">
          <div class="el-icon-my-085shucezhongxin myicon myiconyellow">

          </div>
          <div class="myicon_right myicon_rightdown">
            <el-button
              type="success"
              round
              class="guidebutton"
              style="margin-bottom:10px"
              @click="dialogVisible=true"
            >
              {{$t('news.steering')}}
              <i class="el-icon-view el-icon--right"></i>
            </el-button>
            <a
              href="http://ics-appdata-prd.oss-cn-hangzhou.aliyuncs.com/CENTALENT%E7%B3%BB%E7%BB%9F%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.pdf"
              target="_blank"
            >
              <el-button
                type="success"
                round
                class="guidebutton"
              >
                {{$t('news.guide')}}
              </el-button>
            </a>
          </div>
        </div>
      </div>

      <!-- 第一部分 -->
      <div
        v-if="this.$store.state.Privilege.includes('CONTENT_NEWS_COMPANY')"
        class="statedata  companystate"
      >
        <h3 class="clearfix"> {{$t('news.companyNews.title')}}</h3>
        <el-table
          :data="companyData"
          height="250"
          style="width: 100%"
          stripe
          @row-click='handleRowHandlecompany'
          v-loading="companyLoading"
          :element-loading-text="$t('businessSystem.loading')"
          :empty-text="$t('recruitSystem.screen.nodata')"
        >
          <el-table-column
            prop="name"
            :label="$t('news.companyNews.name')"
          >
            <template slot-scope="scope">
              <span
                @click="linkcompanydetail(scope)"
                style="color:#249739;cursor:pointer"
              >{{scope.row.name||$t('login.noname')}}</span>
              <!-- <el-button type="text" size="medium" @click="linkcompanydetail(scope)">{{scope.row.name}}</el-button> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="trade"
            :label="$t('news.companyNews.trade')"
            v-if="!paralang"
          >
          </el-table-column>
          <el-table-column
            prop="tradeEn"
            :label="$t('news.companyNews.trade')"
            v-if="paralang"
          >
          </el-table-column>
          <el-table-column
            prop="scale"
            :label="$t('news.companyNews.scale')"
          >
          </el-table-column>
          <el-table-column
            prop="accountContact"
            :label="$t('news.companyNews.contacts')"
          >
          </el-table-column>
          <el-table-column
            prop="accountRecruiting"
            :label="$t('news.companyNews.position')"
          >
          </el-table-column>
          <el-table-column
            prop="accountCompleted"
            :label="$t('news.companyNews.recruitedPositions')"
          >
          </el-table-column>
          <el-table-column
            prop="accountClosed"
            :label="$t('news.companyNews.closedPositions')"
          >
          </el-table-column>
          <el-table-column
            prop="appUser.name"
            :label="$t('news.companyNews.chargePerson')"
            v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            :label="$t('news.companyNews.newstatus')"
            v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CANDIDATE_STATUS')"
            :formatter="busFormat"
          >
          </el-table-column>
          <el-table-column
            prop="updateTimeShow"
            :label="$t('news.companyNews.updateTime')"
          >
          </el-table-column>
        </el-table>
      </div>
      <!-- 第二部分 -->
      <div
        v-if="this.$store.state.Privilege.includes('CONTENT_NEWS_POSITION')"
        class="statedata positionstate"
      >
        <h3>{{$t('news.positonNews.title')}}</h3>
        <el-table
          :data="positionData"
          height="250"
          style="width: 100%"
          stripe
          :default-sort="{prop: 'updateDate', order: 'descending'}"
          @row-click='handleRowHandleposition'
          :element-loading-text="$t('businessSystem.loading')"
          :empty-text="$t('recruitSystem.screen.nodata')"
          v-loading="positionLoading"
        >
          <el-table-column
            prop="name"
            :label="$t('news.positonNews.jobName')"
          >
            <template slot-scope="scope">
              <span
                @click="linkpositiondetail(scope)"
                style="color:#249739;cursor:pointer"
              >{{scope.row.name||$t('login.noname')}}</span>
              <!-- <el-button type="text" size="medium" @click="linkpositiondetail(scope)">{{scope.row.name}}</el-button> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="companyInfo.name"
            :label="$t('news.positonNews.affiliatedEnterprises')"
          >
          </el-table-column>
          <el-table-column
            prop="number"
            :label="$t('news.positonNews.recruitsNumber')"
          >
          </el-table-column>
          <el-table-column
            prop="monthly"
            :label="$t('news.positonNews.monthSalary')"
          >
          </el-table-column>
          <el-table-column
            prop="annual"
            :label="$t('news.positonNews.yearSalary')"
          >
          </el-table-column>
          <el-table-column
            prop="charge"
            :label="$t('news.positonNews.scale')"
            v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CHARGE')"
          >
          </el-table-column>
          <el-table-column
            prop="appUser.name"
            v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')"
          >
          </el-table-column>
          <el-table-column
            prop="candidate"
            :label="$t('news.positonNews.number')"
          >
          </el-table-column>
          <el-table-column
            prop="candidateStatus"
            :label="$t('news.positonNews.latestStatus')"
            v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CANDIDATE_STATUS')"
            :formatter="posFormat"
          >
          </el-table-column>
          <el-table-column
            prop="updateDate"
            :label="$t('news.positonNews.updateTime')"
          >
          </el-table-column>
        </el-table>
      </div>
      <!-- 第三部分 -->
      <div
        v-if="this.$store.state.Privilege.includes('CONTENT_NEWS_EVALUATION')"
        class="statedata evastate"
      >
        <h3>{{$t('news.testNews.title')}}</h3>
        <el-table
          :data="evaluationData"
          height="250"
          style="width: 100%"
          stripe
          @row-click='handleRowHandleEvaluation'
          v-loading="evaluationLoading"
          :element-loading-text="$t('businessSystem.loading')"
          :empty-text="$t('recruitSystem.screen.nodata')"
        >
          <el-table-column
            prop="name"
            :label="$t('news.testNews.name')"
          >
            <template slot-scope="scope">
              <!-- <el-button type="text" size="medium" @click="linkEvaluationdetail(scope)">{{scope.row.name}}</el-button> -->
              <span
                @click="linkEvaluationdetail(scope)"
                style="color:#249739;cursor:pointer"
              >{{scope.row.name||$t('login.noname')}}</span>

            </template>
          </el-table-column>
          <el-table-column
            prop="position"
            :label="$t('news.testNews.addposition')"
          >
          </el-table-column>
          <el-table-column
            prop="company"
            :label="$t('news.testNews.addcompany')"
          >
          </el-table-column>
          <el-table-column
            prop="type"
            :label="$t('news.testNews.evaluationType')"
            :formatter="typeFormat"
          >
          </el-table-column>
          <el-table-column
            prop="sendTimeShow"
            :label="$t('news.testNews.sendTime')"
          >
          </el-table-column>
          <el-table-column
            prop="updateTimeShow"
            :label="$t('news.testNews.finishedTime')"
          >
          </el-table-column>
        </el-table>
      </div>
      <div
        v-if="this.$store.state.Privilege.includes('CONTENT_NEWS_POSITION_FILTER')"
        class="statedata needstate"
      >
        <h3>{{$t('news.screenNews.title')}}</h3>
        <el-table
          :data="needPositionData"
          height="250"
          style="width: 100%"
          stripe
          @row-click='handleRowHandleScreen'
          v-loading="needPositionLoading"
          :element-loading-text="$t('businessSystem.loading')"
          :empty-text="$t('recruitSystem.screen.nodata')"
        >
          <el-table-column
            prop="name"
            :label="$t('news.screenNews.name')"
          >
            <template slot-scope="scope">
              <span
                @click="linkScreendetail(scope)"
                style="color:#249739;cursor:pointer"
              >{{scope.row.name||$t('login.noname')}}</span>

              <!-- <el-button type="text" size="medium" @click="linkScreendetail(scope)">{{scope.row.name}}</el-button> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="companyInfo.name"
            :label="$t('news.screenNews.addposition')"
          >
          </el-table-column>
          <el-table-column
            prop="number"
            :label="$t('news.screenNews.recruitsNumber')"
          >
          </el-table-column>
          <el-table-column
            prop="monthly"
            :label="$t('news.screenNews.monthSalary')"
          >
          </el-table-column>
          <el-table-column
            prop="annual"
            :label="$t('news.screenNews.yearSalary')"
          >
          </el-table-column>
          <el-table-column
            prop="charge"
            :label="$t('news.screenNews.scale')"
            v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CHARGE')"
          >
          </el-table-column>
          <el-table-column
            prop="appUser.name"
            :label="$t('news.screenNews.chargePerson')"
            v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')"
          >
          </el-table-column>
          <el-table-column
            prop="candidate"
            :label="$t('news.screenNews.number')"
          >
          </el-table-column>
          <el-table-column
            prop="candidateStatus"
            :label="$t('news.screenNews.latestStatus')"
            v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CANDIDATE_STATUS')"
            :formatter="posFormat"
          >
          </el-table-column>
          <el-table-column
            prop="updateDate"
            :label="$t('news.screenNews.updateTime')"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      paralang:true,
      companyLoading: true,
      positionLoading: true,
      needPositionLoading: true,
      evaluationLoading: true,
      activename: "carousel1",
      companyData: [],
      positionData: [],
      evaluationData: [],
      needPositionData: [],
      userInfo: "",
      dialogVisible: false,
      imgsrc1: [
        { src: require("../image/1.基础流程介绍/1.png") },
        { src: require("../image/1.基础流程介绍/2.png") },
        { src: require("../image/1.基础流程介绍/3.png") },
        { src: require("../image/1.基础流程介绍/4.png") },
        { src: require("../image/1.基础流程介绍/5.png") },
        { src: require("../image/1.基础流程介绍/6.png") },
        { src: require("../image/1.基础流程介绍/7.png") },
        { src: require("../image/1.基础流程介绍/8.png") },
        { src: require("../image/1.基础流程介绍/9.png") },
        { src: require("../image/1.基础流程介绍/10.png") },
        { src: require("../image/1.基础流程介绍/11.png") },
        { src: require("../image/1.基础流程介绍/12.png") },
        { src: require("../image/1.基础流程介绍/13.png") },
        { src: require("../image/1.基础流程介绍/14.png") },
        { src: require("../image/1.基础流程介绍/15.png") },
        { src: require("../image/1.基础流程介绍/16.png") },
        { src: require("../image/1.基础流程介绍/17.png") },
        { src: require("../image/1.基础流程介绍/18.png") },
        { src: require("../image/1.基础流程介绍/19.png") },
        { src: require("../image/1.基础流程介绍/20.png") },
        { src: require("../image/1.基础流程介绍/21.png") },
        { src: require("../image/1.基础流程介绍/22.png") },
        { src: require("../image/1.基础流程介绍/23.png") },
        { src: require("../image/1.基础流程介绍/24.png") },
        { src: require("../image/1.基础流程介绍/25.png") }
      ],
      imgsrc2: [
        { src: require("../image/2.职位需求测评介绍/1.png") },
        { src: require("../image/2.职位需求测评介绍/2.png") },
        { src: require("../image/2.职位需求测评介绍/3.png") },
        { src: require("../image/2.职位需求测评介绍/4.png") },
        { src: require("../image/2.职位需求测评介绍/5.png") },
        { src: require("../image/2.职位需求测评介绍/6.png") },
        { src: require("../image/2.职位需求测评介绍/7.png") }
      ],
      imgsrc3: [
        { src: require("../image/3.个人职业倾向测评介绍/1.png") },
        { src: require("../image/3.个人职业倾向测评介绍/2.png") },
        { src: require("../image/3.个人职业倾向测评介绍/3.png") },
        { src: require("../image/3.个人职业倾向测评介绍/4.png") },
        { src: require("../image/3.个人职业倾向测评介绍/5.png") },
        { src: require("../image/3.个人职业倾向测评介绍/6.png") },
        { src: require("../image/3.个人职业倾向测评介绍/7.png") },
        { src: require("../image/3.个人职业倾向测评介绍/8.png") },
        { src: require("../image/3.个人职业倾向测评介绍/9.png") },
        { src: require("../image/3.个人职业倾向测评介绍/10.png") },
        { src: require("../image/3.个人职业倾向测评介绍/11.png") }
      ],
      imgsrc4: [
        { src: require("../image/4.个人职位匹配度报告介绍/1.png") },
        { src: require("../image/4.个人职位匹配度报告介绍/2.png") },
        { src: require("../image/4.个人职位匹配度报告介绍/3.png") },
        { src: require("../image/4.个人职位匹配度报告介绍/4.png") },
        { src: require("../image/4.个人职位匹配度报告介绍/5.png") },
        { src: require("../image/4.个人职位匹配度报告介绍/6.png") },
        { src: require("../image/4.个人职位匹配度报告介绍/7.png") }
      ],
      imgsrc5: [
        { src: require("../image/5.插件介绍/1.png") },
        { src: require("../image/5.插件介绍/2.png") },
        { src: require("../image/5.插件介绍/3.png") }
      ],
      imgsrc6: [
        { src: require("../image/6.账号管理介绍/1.png") },
        { src: require("../image/6.账号管理介绍/2.png") }
      ],
      count: 0,
      swiperOption1: {
        initialSlide: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next"
        },
        centeredSlides: true,
        slideToClickedSlide: true,
        noSwiping: true,
        noSwipingClass: "stop-swiping",
        mousewheel: {
          mousewheelControl: true
        },
        on: {
          scroll: (swiper, event) => {
            this.realIndex1 = this.swiper1.realIndex;
            // if (this.realIndex1 > 24) {
            //   this.activename = "carousel2";
            //   this.swiper1.slideTo(0, 1000, false);
            // }
          }
        }
      },
      swiperOption2: {
        initialSlide: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next"
        },
        slideToClickedSlide: true,
        noSwiping: true,
        noSwipingClass: "stop-swiping",
        mousewheel: {
          mousewheelControl: true
        },
        on: {
          scroll: (swiper, event) => {
            this.realIndex1 = this.swiper2.realIndex;
            // if (this.realIndex1 > 6) {
            //   this.activename = "carousel3";
            //   this.swiper2.slideTo(0, 1000, false);
            // }
          }
        }
      },
      swiperOption3: {
        initialSlide: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next"
        },
        slideToClickedSlide: true,
        noSwiping: true,
        noSwipingClass: "stop-swiping",
        mousewheel: {
          mousewheelControl: true
        },
        on: {
          scroll: (swiper, event) => {
            this.realIndex1 = this.swiper3.realIndex;
            // if (this.realIndex1 > 10) {
            //   this.activename = "carousel4";
            //   this.swiper3.slideTo(0, 1000, false);
            // }
          }
        }
      },
      swiperOption4: {
        initialSlide: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next"
        },
        slideToClickedSlide: true,
        noSwiping: true,
        noSwipingClass: "stop-swiping",
        mousewheel: {
          mousewheelControl: true
        },
        on: {
          scroll: (swiper, event) => {
            this.realIndex1 = this.swiper4.realIndex;
            // if (this.realIndex1 > 6) {
            //   this.activename = "carousel5";
            //   this.swiper4.slideTo(0, 1000, false);
            // }
          }
        }
      },
      swiperOption5: {
        initialSlide: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next"
        },
        slideToClickedSlide: true,
        noSwiping: true,
        noSwipingClass: "stop-swiping",
        mousewheel: {
          mousewheelControl: true
        },
        on: {
          scroll: (swiper, event) => {
            this.realIndex1 = this.swiper5.realIndex;
            // if (this.swiper5.realIndex == 2) {
            //   this.count++;
            // }
            // console.log(this.swiper5)
            // console.log(this.swiper5.realIndex)

            // if (this.realIndex1 >= 2 && this.count > 1) {
            //   this.activename = "carousel6";
            //   this.swiper5.slideTo(0, 1000, false);
            // }
          }
        }
      },
      swiperOption6: {
        initialSlide: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next"
        },
        slideToClickedSlide: true,
        noSwiping: true,
        noSwipingClass: "stop-swiping",
        mousewheel: {
          mousewheelControl: true
        },
        on: {
          scroll: (swiper, event) => {
            this.realIndex1 = this.swiper6.realIndex;
            // if (this.realIndex1 > 1) {
            //   this.activename = "carousel1";
            //   this.swiper6.slideTo(0, 1000, false);
            //   this.dialogVisible = false
            // }
          }
        }
      },

      realIndex1: ""
    };
  },
  created() {
    document.title = `${this.$t("sidebar.news")}`;
    this.getlang()
    this.findCompanyInfoByPrivilege();
    this.findCompanyPositionByPrivilege();
    this.findEvaluationNewsByPrivilege();
    this.findNeedPositionNews();
    this.getEvaluationRemain();
    this.getfirstshow();
  },
  methods: {
    getlang(){
      if(Cookies.get("language")=='zh'){
        this.paralang=false
      }else{
        this.paralang=true
      }
    },
    //企业状态
    busFormat(row, column) {
      switch (row.status) {
        case "无状态":
          return this.$t("ststus.businessStatus.n1");
          break;
        case "完全没有意向":
          return this.$t("ststus.businessStatus.n2");
          break;
        case "潜在客户":
          return this.$t("ststus.businessStatus.n3");
          break;
        case "跟进中":
          return this.$t("ststus.businessStatus.n4");
          break;
        case "准备签约":
          return this.$t("ststus.businessStatus.n5");
          break;
        case "已签约":
          return this.$t("ststus.businessStatus.n6");
          break;
      }
    },
    //职位候选人状态
    posFormat(row, column) {
      switch (row.candidateStatus) {
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
    //测评类型
    typeFormat(row, column) {
      switch (row.type) {
        case "个人测评":
          return this.$t("ststus.testStatus.n1");
          break;
        case "职位测评":
          return this.$t("ststus.testStatus.n2");
          break;
      }
    },
    skipguide() {
      this.dialogVisible = false;
      localStorage.setItem("loginAccount", null);
    },
    myclick1() {
      this.realIndex1 = this.swiper1.realIndex + 1;
      this.swiper1.slideTo(this.realIndex1, 1000, false);
      // console.log(this.swiper1);
      // console.log(this.swiper1.realIndex);
      // console.log(this.realIndex1);
      if (this.realIndex1 > 24) {
        this.activename = "carousel2";
        this.swiper1.slideTo(0, 1000, false);
      }
    },
    myclick2() {
      this.realIndex1 = this.swiper2.realIndex + 1;
      this.swiper2.slideTo(this.realIndex1, 1000, false);
      // console.log(this.swiper2);
      // console.log(this.swiper2.realIndex);
      // console.log(this.realIndex1);
      if (this.realIndex1 > 6) {
        this.activename = "carousel3";
        this.swiper2.slideTo(0, 1000, false);
      }
    },
    myclick3() {
      this.realIndex1 = this.swiper3.realIndex + 1;
      this.swiper3.slideTo(this.realIndex1, 1000, false);
      if (this.realIndex1 > 10) {
        this.activename = "carousel4";
        this.swiper3.slideTo(0, 1000, false);
      }
    },
    myclick4() {
      this.realIndex1 = this.swiper4.realIndex + 1;
      this.swiper4.slideTo(this.realIndex1, 1000, false);
      if (this.realIndex1 > 6) {
        this.activename = "carousel5";
        this.swiper4.slideTo(0, 1000, false);
      }
    },
    myclick5() {
      this.realIndex1 = this.swiper5.realIndex + 1;
      this.swiper5.slideTo(this.realIndex1, 1000, false);
      console.log(this.swiper5);
      console.log(this.swiper5.realIndex);
      // console.log(this.realIndex1)
      if (this.realIndex1 > 2) {
        this.activename = "carousel6";
        this.swiper5.slideTo(0, 1000, false);
      }
    },
    myclick6() {
      this.realIndex1 = this.swiper6.realIndex + 1;
      this.swiper6.slideTo(this.realIndex1, 1000, false);
      if (this.realIndex1 > 1) {
        this.activename = "carousel1";
        this.swiper6.slideTo(0, 1000, false);
        this.dialogVisible = false;
      }
    },
    getfirstshow() {
      // console.log(localStorage.getItem("loginAccount"));
      this.dialogVisible =
        localStorage.getItem("loginAccount") == "1" ? true : false;
    },
    //获取次数
    getEvaluationRemain() {
      this.$http.post(api.register.getEvaluationRemain()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.userInfo = res.data.data;
          }
          if (res.data.code == "500") {
            console.log(res);
            // this.$message({
            //   type: "error",
            //   message: res.data.errMessage
            // });
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    // getcount() {
    //   this.evaluationRemain = localStorage.getItem("evaluationRemain");
    // },
    // 根据权限不同分页显示公司信息
    findCompanyInfoByPrivilege() {
      var para = {
        name: "",
        page: 0,
        size: 10
      };
      this.$http
        .post(api.business.findCompanyInfoByPrivilege(), formatUrl(para))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.companyData = res.data.data.content;
              this.companyLoading = false;
            }
            if (res.data.code == "500") {
              console.log(res);
              // this.$message({
              //   type: "error",
              //   message: res.data.errMessage
              // });
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    // 根据权限不同分页显示职位信息
    findCompanyPositionByPrivilege() {
      this.$http
        .post(
          api.position.findCompanyPositionByPrivilege(),
          formatUrl({
            pageIndex: 0,
            pageCount: 10,
            sort: "updateDate,DESC"
          })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              res.data.data.content.forEach(function(v) {
                v.updateDate = v.updateDate ? v.updateDate : v.createDate;
                var m =
                  new Date(v.updateDate).getMonth() + 1 > 9
                    ? new Date(v.updateDate).getMonth() + 1
                    : "0" + (new Date(v.updateDate).getMonth() + 1);
                var d =
                  new Date(v.updateDate).getDate() > 9
                    ? new Date(v.updateDate).getDate()
                    : "0" + new Date(v.updateDate).getDate();
                v.updateDate =
                  new Date(v.updateDate).getFullYear() + "/" + m + "/" + d;
              });
              this.positionData = res.data.data.content;
              this.positionLoading = false;
            }
            if (res.data.code == "500") {
              console.log(res);
              // this.$message({
              //   type: "error",
              //   message: res.data.errMessage
              // });
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    // 根据权限不同显示显示测评动态
    findEvaluationNewsByPrivilege() {
      this.$http.post(api.news.findEvaluationNewsByPrivilege()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            // console.log(res);
            this.evaluationData = res.data.data;
            this.evaluationLoading = false;
          }
          if (res.data.code == "500") {
            console.log(res);
            // this.$message({
            //   type: "error",
            //   message: res.data.errMessage
            // });
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    findNeedPositionNews() {
      this.$http
        .post(
          api.news.findCompanyPositionByPrivilege(),
          formatUrl({
            ifNeed: 1,
            pageIndex: 0,
            pageCount: 10,
            sort: "updateDate,DESC"
          })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              res.data.data.content.forEach(function(v) {
                var m =
                  new Date(v.updateDate).getMonth() + 1 > 9
                    ? new Date(v.updateDate).getMonth() + 1
                    : "0" + (new Date(v.updateDate).getMonth() + 1);
                var d =
                  new Date(v.updateDate).getDate() > 9
                    ? new Date(v.updateDate).getDate()
                    : "0" + new Date(v.updateDate).getDate();
                v.updateDate =
                  new Date(v.updateDate).getFullYear() + "/" + m + "/" + d;
              });
              this.needPositionData = res.data.data.content;
              this.needPositionLoading = false;
            }
            if (res.data.code == "500") {
              console.log(res);
              // this.$message({
              //   type: "error",
              //   message: res.data.errMessage
              // });
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    //企业
    handleRowHandlecompany(row, event, column) {
      if (event.target.nodeName == "TD") {
        // bussiness.html#/managedetail?id=11782
        window.open("bussiness.html#/managedetail?id=" + row.id);
        // console.log(row.id);
      }
    },
    handleRowHandleposition(row, event, column) {
      if (event.target.nodeName == "TD") {
        window.open("position.html#/managedetail?id=" + row.id);
      }
    },
    //
    handleRowHandleEvaluation(row, event, column) {
      if (event.target.nodeName == "TD") {
        if (row.type == "职位测评") {
          window.open(
            `./prp.html#/prpdetail?id=${row.id}&clientId${
              row.clientId ? "=" + row.clientId : ""
            }`
          );
        }
        if (row.type == "个人测评") {
          window.open(
            `./ics.html#/icsdetail?id=${row.id}&clientId${
              row.clientId ? "=" + row.clientId : ""
            }`
          );
        }
      }
    },
    handleRowHandleScreen(row, event, column) {
      if (event.target.nodeName == "TD") {
        window.open("position.html#/managedetail?id=" + row.id);
        console.log(row.id);
      }
    },
    //详情
    linkcompanydetail(v) {
      window.open("./bussiness.html#/managedetail?id=" + v.row.id);
    },
    linkpositiondetail(v) {
      window.open("./position.html#/managedetail?id=" + v.row.id);
    },
    //详情
    linkEvaluationdetail(v) {
      if (v.row.type == "职位测评") {
        window.open(
          `./prp.html#/prpdetail?id=${v.row.id}&clientId${
            v.row.clientId ? "=" + v.row.clientId : ""
          }`
        );
      }
      if (v.row.type == "个人测评") {
        window.open(
          `./ics.html#/icsdetail?id=${v.row.id}&clientId${
            v.row.clientId ? "=" + v.row.clientId : ""
          }`
        );
      }
    },
    //详情
    linkprpdetail(v) {
      window.open(
        `./prp.html#/prpdetail?id=${v.row.id}&clientId${
          v.row.clientId ? "=" + v.row.clientId : ""
        }`
      );
    },
    linkScreendetail(v) {
      window.open("position.html#/managedetail?id=" + v.row.id);
    },
    tabclick(v) {
      // console.log(v);
      this.activename = v.name;
      this.realIndex1 = 0;
      // this.swiper1.realIndex = 0;
      // this.swiper2.realIndex = 0;
      // this.swiper3.realIndex = 0;
      // this.swiper4.realIndex = 0;
      // this.swiper5.realIndex = 0;
      // this.swiper6.realIndex = 0;
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper1() {
      return this.$refs.mySwiper1.swiper;
    },
    swiper2() {
      return this.$refs.mySwiper2.swiper;
    },
    swiper3() {
      return this.$refs.mySwiper3.swiper;
    },
    swiper4() {
      return this.$refs.mySwiper4.swiper;
    },
    swiper5() {
      return this.$refs.mySwiper5.swiper;
    },
    swiper6() {
      return this.$refs.mySwiper6.swiper;
    }
  }
};
</script>
<style>
.statedata {
  background: #ffffff;
  margin-bottom: 20px;
  padding: 20px 0;
  border-radius: 4px;
  box-shadow: 3px 3px 3px #ccc;
}

.statedata .el-table::before {
  height: 0;
}

h3 {
  float: left;
  color: #212121;
  font: normal 24px "Microsoft YaHei";
  margin: 0;
  padding: 12px 0 12px 30px;
}

.residuecount {
  float: right;
  width: 32%;
  height: 136px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 2px 2px #ccc;
  /* margin-top: 10px; */
  padding-left: 20px;
  box-sizing: border-box;
  border: 1px solid #fafafa;
  margin-bottom: 20px;
  position: relative;
}

.residuecount + .residuecount {
  margin-right: 2%;
}

.myicon {
  width: 74px;
  height: 74px;
  border-radius: 50%;
  font-size: 50px;
  text-align: center;
  line-height: 74px;
  color: #fff;
  margin-top: 31px;
  float: left;
}

.myiconblue {
  background: #00a6ba;
  float: left;
}

.myiconblueright {
  /* float: left; */
  text-align: left;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.myiconblueright .wireless {
  font-size: 20px;
}

.myiconblueright .allcount {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.myicongreen {
  background: #239838;
}

.myiconyellow {
  background: #edb726;
}

.myicon_right {
  text-align: left;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: 26px;
}

.myicon_rightdown {
  margin-left: 50px;
}

.residuecount .countnum {
  /* float: left; */
  font: normal 24px "Microsoft YaHei";
  color: #212121;
}

.residuecount .countword {
  font: normal 18px "Microsoft YaHei";
  color: #7d7d7d;
}

.el-table .cell,
.el-table th div {
  padding-left: 30px;
  text-align: left;
}

.clearfix::after {
  display: block;
  clear: both;
  height: 0;
  content: "";
  visibility: hidden;
  overflow: hidden;
}

.clearfix {
  zoom: 1;
}

.el-main {
  padding: 20px 3%;
}

.iconpic {
  overflow: hidden;
}

.companystate {
  border-top: 3px solid #239838;
}

.positionstate {
  border-top: 3px solid #00a6ba;
}

.guidestate {
  border-top: 3px solid #edb726;
}

.guidestate .guidebutton {
  font-size: 12px;
  padding: 12px 12px;
}

.evastate {
  border-top: 3px solid #edb726;
}

.needstate {
  border-top: 3px solid #f56c6c;
}

.carouseltab .el-tabs--left .el-tabs__item.is-left {
  text-align: left;
}

.carouseltab .el-tabs--left .el-tabs__nav-prev,
.carouseltab .el-tabs--right .el-tabs__nav-prev,
.carouseltab .el-tabs--left .el-tabs__nav-next,
.carouseltab .el-tabs--right .el-tabs__nav-next {
  display: none;
}

.el-carousel__button {
  background-color: #ccc;
  height: 4px;
}

.el-carousel__indicator.is-active button {
  background-color: #239838;
}

.carouseltab .el-dialog__header {
  /* display: none; */
  padding: 0;
}

.carouseltab .el-dialog__body {
  padding: 0;
  text-align: right;
  height: 100%;
}

.carouseltab .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}

.carouseltab .el-tabs--left .el-tabs__header.is-left {
  margin-right: 0;
}

.el-carousel__arrow:hover {
  background-color: rgba(31, 45, 61, 0.6);
}

.carouseltab .el-button {
  height: 5%;
  margin-right: 20px;
}

.el-carousel__indicators {
  text-align: center;
}

.carouseltab img {
  width: 100%;
  height: 100%;
}

.carouseltab .el-tabs--border-card {
  height: 95%;
}

/* .carouseltab .el-carousel__container {
  text-align: center;
} */

/* .el-carousel__container, */

.el-tabs__header .is-left,
.el-tabs__content,
.el-tab-pane,
.swiper-container {
  height: 100%;
}

.swiper-pagination-bullet {
  width: 16px;
  height: 16px;
}

.swiper-button-prev {
  left: 20px;
}

.swiper-button-next {
  right: 20px;
}

.swiper-button-prev,
.swiper-button-next {
  transform: scale(1.5);
}
.carouseltab .el-tabs__item {
  padding: 10px 20px;
  font-size: 20px;
}
.el-tabs__nav.is-left {
  height: auto;
}
</style>

