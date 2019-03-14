<template>
  <div>
    <div class="matchreport" :style="backgroundDiv">

      <div class="main clearfix">

        <div class="job_brief ">
          <div class="name">
            <span>姓名</span>
            <span>/</span>
            <span>{{userform.name}}</span>
          </div>
        </div>
        <div class="reportline">
          <div></div>
        </div>

      </div>

    </div>
    <div class="matchreport_con" v-if="Object.keys(reportpart1).length!=0||reportpart2.length!=0||reportpart3.length!=0">
      <header>
        <img src="../image/header.png" alt="header">
      </header>
      <div class="sen_cav_container" id="myChart">
      </div>
      <div class="container clearfix">
        <!-- 第一部分 -->
        <div class="part1 clearfix">
          <span>Part.1</span>
          <span>性格特征</span>
        </div>
        <!-- 块 -->

        <div v-if="reportpart1.prominent || reportpart1.obvious || reportpart1.show">
          <div class="section" v-if="reportpart1.prominent">
            <div class="outicon">
              <div class="innericon">1</div>
            </div>
            <div class="outcontent">
              <div>
                <div class="p1title">
                  <span>尤为凸显的性格特征</span>
                </div>
                <div class="positionneed">
                  以下描述的性格特这会展现得非常明显难以被改变，比起改变更应好好加以利用。
                </div>

              </div>
              <div class="out_txt" v-for="(item) in reportpart1.prominent" :key="item.id">
                <!-- {{part1content1}} -->{{item.content1}}
              </div>

            </div>
          </div>
          <div class="section" v-if="reportpart1.obvious">
            <div class="outicon">
              <div class="innericon">{{reportpart1.prominent?2:1}}</div>
            </div>
            <div class="outcontent">
              <div>
                <div class="p1title">
                  <span>较为明显的性格特征</span>
                </div>
                <div class="positionneed">
                  以下所描述的性格特征会展现得比较明显。可短期改变这些性格表现，但无法长期坚持。
                </div>

              </div>
              <div class="out_txt" v-for="(item) in reportpart1.obvious" :key="item.id">
                <!-- {{part1content2}} -->{{item.content1}}
              </div>

            </div>
          </div>
          <div class="section" v-if="reportpart1.show">
            <div class="outicon">
              <div class="innericon">{{reportpart1.prominent&&reportpart1.obvious?3:reportpart1.prominent&&!reportpart1.obvious || !reportpart1.prominent&&reportpart1.obvious?2:!reportpart1.prominent&&!reportpart1.obvious?1:1}}</div>
            </div>
            <div class="outcontent">
              <div>
                <div class="p1title">
                  <span>会展现出的性格特征</span>
                </div>
                <div class="positionneed">
                  以下所描述的性格特征不是最为明显，且有较大的弹性可以改变
                </div>

              </div>
              <div class="out_txt" v-for="(item) in reportpart1.show" :key="item.id">
                <!-- {{part1content3}} -->{{item.content1}}
              </div>

            </div>
          </div>
        </div>
        <div class="section" v-else>
          <div class="outicon">
            <div class="innericon">1</div>
          </div>
          <div class="outcontent">
            <div>
              <div class="p1title">
                <span>会展现出的性格特征</span>
              </div>
              <div class="positionneed">

              </div>
            </div>
            <div class="out_txt" v-for="(item) in reportpart1.other" :key="item.id">
              <!-- {{part1content3}} -->{{item.content1}}
            </div>

          </div>
        </div>
        <!-- 第二部分 -->
        <div class="part2 clearfix" v-if="reportpart2.length!=0">
          <span>Part.2</span>
          <span>适合的职业倾向</span>
        </div>
        <!-- 块 -->
        <div class="section" v-for="(item,index) in reportpart2" :key="item.id" v-if="reportpart2">
          <div class="outicon">
            <div class="innericon">{{index+1}}</div>
          </div>
          <div class="outcontent">
            <div>
              <div class="title">
                <div>{{item.content3}}</div>
                <!-- <div class="seven"></div> -->
                <div class="ratebar">
                  <el-rate v-if="key==item.id" v-for="(value, key) in bardata" :key="key" :value="value>5?value-5:0" disabled-void-color="#f0f0f0" :icon-classes="['el-icon-my-square', 'el-icon-my-square', 'el-icon-my-square']" disabled-void-icon-class="el-icon-my-square" void-icon-class="el-icon-my-square" :max="5" disabled :colors="['#39d255', '#39d255', '#39d255']">
                  </el-rate>
                  <el-rate v-if="key==item.id" v-for="(value, key, index) in bardata" :key="index" :value="value>5?5:value" disabled-void-color="#f0f0f0" :icon-classes="['el-icon-my-square', 'el-icon-my-square', 'el-icon-my-square']" disabled-void-icon-class="el-icon-my-square" void-icon-class="el-icon-my-square" :max="5" disabled :colors="['#f0f0f0', '#00cece', '#00cece']">
                  </el-rate>
                </div>

              </div>
            </div>
            <div class="out_txt">
              {{item.content2}}
            </div>
          </div>
        </div>

        <!-- 第三部分 -->
        <div class="part3 clearfix" v-if="reportpart3.length!=0">
          <span>Part.{{reportpart2.length==0?2:3}}</span>
          <span>擅长的工作领域</span>
        </div>
        <!-- 块 -->
        <div class="section" v-if="reportpart3" v-for="(item,index) in reportpart3" :key="item.id">
          <div class="outicon">
            <div class="innericon">{{index+1}}</div>
          </div>
          <div class="outcontent">
            <div>
              <div class="title">
                <span>{{item.content1}}</span>
              </div>
            </div>
            <div class="out_txt">
              <div v-for="(kk,index) in item.content2.split('\n')" :key="index">
                {{kk}}
              </div>
              <!-- {{item.content2}} -->
            </div>
          </div>
        </div>
        <!-- 第四部分 -->

        <div class="part3 clearfix" v-if="IcogResultform.length!=0">
          <span>Part.{{reportpart3.length==0?3:4}}</span>
          <span>学习适应能力</span>
        </div>
        <!-- 根据icog结果判断 -->

        <div class="section">
          <!-- 第一种情况 -->
          <div class="outcontent" v-if="IcogResultform.length>0?IcogResultform[0].score>=0&&IcogResultform[0].score<=16:false">

            <img src="../image/1.png" alt="" width="100%">
            <div class="outcontentwoed">
              <div style="color:#de5401;font-size:27px;font-weight:700;margin:10px 0"> 较慢：</div>
              <div>1. 很难灵活调节自己去适应和自己匹配度较低的工作内容；</div>
              <div>2. 适合稳定应用现有知识、流程或方法的工作内容，不适合需要不断接受新事物和知识的工作内容；</div>
              <div>3. 不擅长需要快速思维和跳跃性思维性的工作内容。</div>
            </div>
          </div>
          <!-- 第二种情况 -->
          <div class="outcontent" v-if="IcogResultform.length>0?IcogResultform[0].score>=17&&IcogResultform[0].score<=26:false">
            <img src="../image/2.png" alt="" width="100%">
            <div class="outcontentwoed">
              <div style="color:#dea001;font-size:27px;font-weight:700;margin:10px 0">中等：</div>
              <div>1. 不是很容易调节自己去适应和自己匹配度较低的工作内容；</div>
              <div>2. 适合稳定应用现有知识、流程或方法，且需要经常接受新事物和知识的工作内容；</div>
              <div>3. 能够快速思维，但是不擅长需要跳跃性思维的工作内容。</div>
            </div>
          </div>
          <!-- 第三种情况 -->
          <div class="outcontent" v-if="IcogResultform.length>0?IcogResultform[0].score>=27&&IcogResultform[0].score<=36:false">
            <img src="../image/3.png" alt="" width="100%">
            <div class="outcontentwoed">
              <div style="color:#19a950;font-size:27px;font-weight:700;margin:10px 0">较快：</div>
              <div>1. 能够调节自己去适应和自己匹配度较低的工作内容；</div>
              <div>2. 适合需要快速接受且运用新事物和知识，需要不断学习和变化的工作内容；</div>
              <div>3. 能够处理需要快速思维和跳跃性思维的工作内容。</div>
            </div>
          </div>
          <!-- 第四种情况 -->
          <div class="outcontent" v-if="IcogResultform.length>0?IcogResultform[0].score>=37&&IcogResultform[0].score<=50:false">
            <img src="../image/4.png" alt="" width="100%">
            <div class="outcontentwoed">
              <div style="color:#00cece;font-size:27px;font-weight:700;margin:10px 0">极快：</div>
              <div>1. 无论匹配情况如何都能够很好调节自己适应工作内容；</div>
              <div>2. 适合需要非常积极接受和运用新事物和知识，需要频繁学习和变化的工作内容；</div>
              <div>3. 擅长处理需要快速思维和跳跃性思维的工作内容。</div>
            </div>
          </div>
        </div>
      </div>
      <div class="page">
        <div>
          <span>Page</span>
          <span>1</span>
          <span>/1</span>
        </div>
      </div>
      <footer>
        <div class="footer_l"></div>
        <div class="footer_r"></div>
      </footer>
    </div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/radar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
export default {
  props: [
    "userform",
    "reportpart1",
    "reportpart2",
    "reportpart3",
    "bardata",
    "IcogResultform",
    "userProfessionalTendenciesVO"
  ],
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + require("../image/New_1.png") + ")"
      },
      cData: []
    };
  },
  mounted() {
    // setTimeout(this.drawpic, 5000);
  },
  watch: {
    userProfessionalTendenciesVO: function(newVal, oldVal) {
      this.cData = newVal; //newVal即是chartData
      setTimeout(this.drawpic, 500);
    }
  },
  methods: {
    drawpic() {
      // console.log(this);
      let myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        legend: {
          data: ["个人适合的职业倾向"],
          icon: "circle",
          selected: true,
          selectedMode: false, //取消图例的点击事件
          x: "center",
          padding: [20, 0]
        },
        // backgroundColor: "#eff6f8",
        textStyle: {
          fontSize: 30
        },
        color: ["#e83632"],
        tooltip: {
          // trigger: 'axis'
        },
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#6f6f6f",
              fontSize: 18
            }
          },
          axisLine: {
            lineStyle: {
              color: ["#e8edf3"]
            }
          },
          splitLine: {
            lineStyle: {
              color: ["#e8edf3"]
            }
          },
          splitNumber: 6,
          nameGap: 15,
          splitArea: {
            show: true,
            areaStyle: {
              color: [
                "#f5f9fb",
                "#f5f9fb",
                "#f5f9fb",
                "#f5f9fb",
                "#f5f9fb",
                "#fff"
              ],
              shadowColor: "#f5f9fb",
              shadowBlur: 10
            }
          },
          indicator: [
            {
              name: "听令配合",
              max: 100
            },
            {
              name: "谨慎守规",
              max: 100
            },
            {
              name: "稳定行动",
              max: 100
            },
            {
              name: "沟通社交",
              max: 100
            },
            {
              name: "主导领导",
              max: 100
            },
            {
              name: "大胆灵活",
              max: 100
            },

            {
              name: "快速行动",
              max: 100
            },

            {
              name: "思考分析",
              max: 100
            }
          ]
          // radius: [95]
        },
        series: [
          {
            symbol: "circle",
            clickable: false,
            symbolSize: 4,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default",

                  // opacity: 0.8, // 图表中各个图区域的透明度
                  color: "#f3c8c4" // 图表中各个图区域的颜色,
                  // borderColor: ['#f3c8c4']
                }
              }
            },
            lineStyle: {
              color: ["#f3c8c4"]
            },
            type: "radar",
            data: [
              {
                value: this.cData,
                name: "个人适合的职业倾向"
              }
            ]
          }
        ]
      });
    }
  }
};
</script>   
<style scoped>
.sep {
  height: 30px;
}

.clearfix:before,
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.matchreport {
  width: 100%;
  max-width: 1356px;
  height: 1755px;
  overflow: hidden;
  text-align: left;
  margin: 0 auto 30px auto;
  background-repeat: no-repeat;
  /*background: url("../../../assets/New_1.png") no-repeat;*/
  background-size: contain;
}

.matchreport img,
.matchreport_con img {
  width: 100%;
  vertical-align: middle;
}

footer {
  overflow: hidden;
}

.footer_l {
  width: 26%;
  height: 14px;
  background-color: #19a950;
  float: left;
}

.footer_r {
  width: 74%;
  height: 14px;
  background-color: #1ea3c5;
  float: left;
}

.main {
  width: 100%;
  position: relative;
}

.job_brief {
  font: 700 70px "Microsoft YaHei";
  color: #373737;
  float: left;
  width: 100%;
  margin: 750px 0 0 0;
  padding-left: 360px;
  box-sizing: border-box;
}

.reportline {
  width: 100%;
  float: left;
  margin: 40px 0 0 0;
  padding-left: 360px;
  box-sizing: border-box;
}

.reportline div {
  width: 155px;
  height: 10px;
  background-color: #19a950;
}

.matchreport_con {
  width: 100%;
  max-width: 1356px;
  background-color: #fff;
  text-align: left;
  margin: 0 auto;
}

.container {
  margin: 47px 0 108px 230px;
  border-left: 10px solid #d9d9d9;
  padding-right: 118px;
  box-sizing: border-box;
}

.container .part1,
.container .part2,
.container .part3 {
  margin-bottom: 70px;
  margin-top: 50px;
}

.container .part1 span:nth-child(1),
.container .part2 span:nth-child(1),
.container .part3 span:nth-child(1) {
  /* width: 90px; */
  border-radius: 3px 36px 36px 3px;
  background-color: #efefef;
  font: 700 50px "Microsoft YaHei";
  color: #373737;
  padding: 6px 32px;
  float: left;
}

.container .part1 span:nth-child(2),
.container .part2 span:nth-child(2),
.container .part3 span:nth-child(2) {
  font: 700 50px "Microsoft YaHei";
  color: #373737;
  margin-left: 44px;
  float: left;
}

.outicon {
  margin-left: -57px;
  float: left;
}

.innericon {
  border: 12px solid #fff;
  width: 78px;
  height: 78px;
  font: 700 42px/78px "Microsoft YaHei";
  color: #fff;
  text-align: center;
  border-radius: 50%;
  background-color: #1ea3c5;
}

.outcontent {
  margin-left: 68px;
  margin-bottom: 20px;
}

.outcontent .title {
  overflow: hidden;
  padding: 20px 0 30px 0;
  border-bottom: 2px dotted #a8a8a8;
  font: 36px "Microsoft YaHei";
}

.p1title {
  padding: 20px 0 0 0;
  font: 38px "Microsoft YaHei";
}

.outcontent .title > div:nth-child(1) {
  float: left;
  color: #383838;
  text-align: left;
  width: 74%;
}

.outcontent .title > div:nth-child(2),
.outcontent .title > div:nth-child(3) {
  padding: 2px 0;
  height: 100%;
  box-sizing: border-box;
  float: right;
  width: 26%;
}

.positionneed {
  font: 27px/32px "Microsoft YaHei";
  color: #939393;
  margin-top: 6px;
  padding-bottom: 40px;
  border-bottom: 2px dotted #a8a8a8;
}

.out_txt {
  margin-top: 40px;
  font: 27px "Microsoft YaHei";
  /* text-indent:32px; */
}

/* 能量条 */

.page {
  position: relative;
  padding-right: 118px;
  font: 700 30px "Microsoft YaHei";
  color: #1ea3c5;
}

.page div {
  position: absolute;
  right: 0;
  bottom: 20px;
}

.section {
  page-break-inside: avoid;
}

.ratebar {
  position: relative;
}

div {
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  word-wrap: break-word;
}

.ratebar .el-rate:nth-child(1) {
  left: 45%;
}

.ratebar .el-rate:nth-child(2) {
  left: -5%;
}
.outcontentwoed div {
  font-size: 27px;
}
.sen_cav_container {
  width: 100%;
  height: 800px;
}
</style>
