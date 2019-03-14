<template>
  <div>
    <div class="matchreport" :style="backgroundDiv">
      <div class="main clearfix">
        <div class="job_brief ">
          <div class="name">
            <span>Name</span>
            <span>/</span>
            <span>{{userform.name}}</span>
          </div>
        </div>
        <div class="line">
          <div></div>
        </div>

      </div>

    </div>
    <div class="matchreport_con" v-if="Object.keys(reportpart1).length!=0||reportpart2.length!=0||reportpart3.length!=0">
      <header>
        <img src="../image/header.png" alt="header">
      </header>
      <div class="container clearfix">
        <!-- 第一部分 -->
        <div class="part1 clearfix">
          <span>Part.1</span>
          <span>Characteristic Traits</span>
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
                  <span>Extra Strong Characteristic:</span>
                </div>
                <div class="positionneed">
                  The following characteristics will be shown very obviously, as well as hard to be changed. So comparing to change those, applying to the right area would be better.
                </div>

              </div>
              <div class="out_txt" v-for="(item) in reportpart1.prominent" :key="item.id">
                <!-- {{part1content1}} -->{{item.content1En}}
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
                  <span>Obvious Characteristic:</span>
                </div>
                <div class="positionneed">
                  The following characteristics will be shown quite obviously. It’s possible to change those in the short term, but not long term perspective.
                </div>
              </div>
              <div class="out_txt" v-for="(item) in reportpart1.obvious" :key="item.id">
                <!-- {{part1content2}} -->{{item.content1En}}
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
                  <span>Not so Obvious Characteristic:</span>
                </div>
                <div class="positionneed">
                  The following characteristics exist but not so obvious. Also quite flexible for those to be changed and maintain in a longer time.
                </div>

              </div>
              <div class="out_txt" v-for="(item) in reportpart1.show" :key="item.id">
                <!-- {{part1content3}} -->{{item.content1En}}
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
                <span>Not so Obvious Characteristic:</span>
              </div>
              <div class="positionneed">

              </div>
            </div>
            <div class="out_txt" v-for="(item) in reportpart1.other" :key="item.id">
              <!-- {{part1content3}} -->{{item.content1En}}
            </div>

          </div>
        </div>
        <!-- 第二部分 -->
        <div class="part2 clearfix" v-if="reportpart2.length!=0">
          <span>Part.2</span>
          <span>Suitable Job Requirements</span>
        </div>
        <!-- 块 -->
        <div class="section" v-for="(item,index) in reportpart2" :key="item.id" v-if="reportpart2">
          <div class="outicon">
            <div class="innericon">{{index+1}}</div>
          </div>
          <div class="outcontent">
            <div>
              <div class="title">
                <div>{{item.content3En}}</div>
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
              {{item.content2En}}
            </div>
          </div>
        </div>

        <!-- 第三部分 -->
        <div class="part3 clearfix" v-if="reportpart3.length!=0">
          <span>Part.{{reportpart2.length==0?2:3}}</span>
          <span>Suitable Job Categories</span>
        </div>
        <!-- 块 -->
        <div class="section" v-if="reportpart3" v-for="(item,index) in reportpart3" :key="item.id">
          <div class="outicon">
            <div class="innericon">{{index+1}}</div>
          </div>
          <div class="outcontent">
            <div>
              <div class="title">
                <span>{{item.content1En}}</span>
              </div>
            </div>
            <div class="out_txt">
              {{item.content2En}}
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
export default {
  props: ["userform", "reportpart1", "reportpart2", "reportpart3", "bardata"],
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + require("../image/New_1.png") + ")"
      }
    };
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
  /*background: url("../../../assets/New_1.png") no-repeat;*/
  background-repeat: no-repeat;
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

.line {
  width: 100%;
  float: left;
  margin: 40px 0 0 0;
  padding-left: 360px;
  box-sizing: border-box;
}

.line div {
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
  width: 100%;
}

.outcontent .title > div:nth-child(2),
.outcontent .title > div:nth-child(3) {
  padding: 2px 0;
  height: 100%;
  box-sizing: border-box;
  float: left;
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
  margin: 20px 0 40px 0;
}

div {
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  word-wrap: break-word;
}

.ratebar .el-rate:nth-child(1) {
  left: 50%;
}

.ratebar .el-rate:nth-child(2) {
  left: 0;
}
</style>