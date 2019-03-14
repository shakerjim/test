<template>
  <div class="bussdetail">
    <!-- <div class="companytitle">
      Centalent > 企业管理列表页 >
      <span>企业管理详情页</span>
    </div> -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="companytitle"
    >
      <el-breadcrumb-item>
        <a href="./news.html">Centalent</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manage' }">{{$t('businessSystem.businessPage')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('businessSystem.detail.detailPage')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 编辑企业 -->
    <el-dialog
      :visible.sync="editbussinessdialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <!-- 负责人 -->
      <el-dialog
        width="20%"
        :visible.sync="editsaleVisible"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <el-radio-group v-model="editsellerId">
          <el-radio
            class="saleperson"
            v-for="(item,index) in selectSelleroptions"
            :key="index"
            :label='item.id'
          >{{item.name}}</el-radio>
        </el-radio-group>
        <!-- :label='item.name+"/"+item.id' -->
        <div
          slot="footer"
          class="dialog-footer tradebutton"
        >

          <el-button
            @click="canceleditsaleVisible"
            size="small"
          >{{$t('btn.cancel')}}</el-button>
          <el-button
            type="success"
            class="green"
            @click="sureeditsaleVisible"
            size="small"
          >{{$t('btn.sure')}}</el-button>
        </div>
      </el-dialog>
      <!-- 行业 -->
      <el-dialog
        width="50%"
        :visible.sync="tradeVisible"
        append-to-body
        class="tradedialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane
            :label="item.tradeName"
            v-for="(item,index) in tradeList"
            :key="index"
          >
            <el-radio-group v-model="mytrade">
              <el-radio
                :label="x.tradeName"
                v-for="(x,y) in item.appTrades"
                :key="y"
                class="tradeRadio"
              >{{x.tradeName}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
        </el-tabs>
        <div
          slot="footer"
          class="dialog-footer tradebutton"
        >
          <el-button
            type="success"
            class="green"
            @click="suretradeVisible"
          >{{$t('btn.sure')}}</el-button>
          <el-button @click="canceltradeVisible">{{$t('btn.cancel')}}</el-button>
        </div>
      </el-dialog>
      <el-form
        :model="bussinessform"
        :rules="bussinessformrules"
        ref="bussinessform"
      >
        <el-form-item
          :label="$t('businessSystem.tip.name')"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model.trim="bussinessform.name"
            auto-complete="off"
            :maxlength="maxlength"
            :placeholder="$t('valid.valid029')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.tip.trade')"
          :label-width="formLabelWidth"
          prop="trade"
          class="industry"
          :maxlength="maxlength"
          :placeholder="$t('valid.valid003')"
        >

          <el-input
            v-model.trim="bussinessform.trade"
            auto-complete="off"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-edit"
              @click="findTrade"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.tip.scale')"
          :label-width="formLabelWidth"
          prop="scale"
        >
          <el-select
            v-model.trim="bussinessform.scale"
            :placeholder="$t('valid.valid004')"
          >
            <el-option
              :label="$t('api.sale.s1')"
              value="少于50人"
            ></el-option>
            <el-option
              :label="$t('api.sale.s2')"
              value="50-150人"
            ></el-option>
            <el-option
              :label="$t('api.sale.s3')"
              value="150-500人"
            ></el-option>
            <el-option
              :label="$t('api.sale.s4')"
              value="500-1000人"
            ></el-option>
            <el-option
              :label="$t('api.sale.s5')"
              value="1000-5000人"
            ></el-option>
            <el-option
              :label="$t('api.sale.s6')"
              value="5000-10000人"
            ></el-option>
            <el-option
              :label="$t('api.sale.s7')"
              value="10000人以上"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('news.companyNews.chargePerson')"
          :label-width="formLabelWidth"
          prop="sellerId"
          class="sale"
          v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')"
        >
          <el-select
            v-model="bussinessform.sellerId"
            disabled
            class="sellerId"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              :key="index"
              v-for="(item,index) in selectSelleroptions"
            ></el-option>
          </el-select>
          <el-button
            type="success"
            @click="openeditsaleVisible"
          >{{$t('businessSystem.tip.choose')}}</el-button>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="canceleditbussiness('bussinessform')">{{$t('btn.cancel')}}</el-button>
        <el-button
          type="success"
          class="green"
          @click="saveCompanyInfo('bussinessform')"
          :disabled="iseditshow"
        >{{$t('btn.sure')}}</el-button>
      </div>
    </el-dialog>

    <!-- 添加职位 -->
    <el-dialog
      :visible.sync="positiondialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <!-- 负责人 -->
      <el-dialog
        width="20%"
        :visible.sync="saleVisible"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <el-radio-group v-model="mysellerId">
          <el-radio
            class="saleperson"
            v-for="(item,index) in selectSelleroptions"
            :key="index"
            :label='item.id'
          >{{item.name}}</el-radio>
        </el-radio-group>
        <div
          slot="footer"
          class="dialog-footer tradebutton"
        >
          <el-button
            @click="cancelsaleVisible"
            size="small"
          >{{$t('btn.cancel')}}</el-button>
          <el-button
            type="success"
            class="green"
            @click="suresaleVisible"
            size="small"
          >{{$t('btn.sure')}}</el-button>
        </div>
      </el-dialog>
      <el-form
        :model="positionform"
        :rules="positionformrules"
        ref="positionform"
        :label-position="'left'"
      >
        <el-form-item
          :label="$t('businessSystem.tip.positioNname')"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model.trim="positionform.name"
            auto-complete="off"
            :maxlength="maxlength"
            :placeholder="$t('valid.valid030')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.tip.recruitsNumber')"
          :label-width="formLabelWidth"
          class="industry"
          prop="number"
        >
          <el-input
            v-model.trim="positionform.number"
            auto-complete="off"
            :maxlength="maxlength"
            :placeholder="$t('valid.valid031')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.tip.monthSalary')"
          :label-width="formLabelWidth"
          prop="monthly"
        >
          <el-input
            v-model.trim="positionform.monthly"
            auto-complete="off"
            :maxlength="maxlength"
            :placeholder="$t('valid.valid032')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.tip.yearSalary')"
          :label-width="formLabelWidth"
          prop="annual"
        >
          <el-input
            v-model.trim="positionform.annual"
            auto-complete="off"
            :maxlength="maxlength"
            :placeholder="$t('valid.valid033')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.tip.chargescale')"
          :label-width="formLabelWidth"
          prop="charge"
          v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CHARGE')"
        >
          <el-input
            v-model.trim="positionform.charge"
            auto-complete="off"
            :maxlength="maxlength"
            :placeholder="$t('valid.valid034')"
          >
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.tip.chargePerson')"
          :label-width="formLabelWidth"
          class="sale"
          prop="sellerId"
          v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')"
        >
          <el-select
            v-model="positionform.sellerId"
            disabled
            class="sellerId"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              :key="index"
              v-for="(item,index) in selectSelleroptions"
            ></el-option>
          </el-select>
          <el-button
            type="success"
            @click="opensaleVisible"
          >{{$t('businessSystem.tip.choose')}}</el-button>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="positiondialog = false">{{$t('btn.back')}}</el-button>
        <el-button
          type="success"
          class="green"
          @click="savePosition('positionform')"
          :loading="isaddshow"
        >{{$t('btn.submit')}}</el-button>
      </div>
    </el-dialog>

    <!-- 添加联系人 -->
    <el-dialog
      :visible.sync="contactdialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="addcontactform"
        :rules="addcontactformrules"
        ref="addcontactform"
      >
        <el-form-item
          :label="$t('news.companyNews.contacts')"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model.trim="addcontactform.name"
            auto-complete="off"
            :maxlength="maxlength"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.detail.position')"
          :label-width="formLabelWidth"
          prop="trade"
        >
          <el-input
            v-model.trim="addcontactform.trade"
            auto-complete="off"
            :maxlength="maxlength"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.detail.linkphone')"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input
            v-model.trim="addcontactform.phone"
            auto-complete="off"
            :maxlength="maxlength"
            :blur="setphonechange(addcontactform.phone)"
            v-on:change="phonechange"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.detail.email')"
          :label-width="formLabelWidth"
          prop="mail"
        >
          <el-input
            v-model.trim="addcontactform.mail"
            auto-complete="off"
            :maxlength="maxlength"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="contactdialog = false">{{$t('btn.back')}}</el-button>
        <el-button
          type="success"
          class="green"
          @click="saveCompanyContact('addcontactform')"
          :loading="isaddcontactshow"
        >{{$t('btn.submit')}}</el-button>
      </div>
    </el-dialog>

    <!-- 修改联系人 -->
    <el-dialog
      :visible.sync="editcontactdialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="editcontactform"
        :rules="editcontactformrules"
        ref="editcontactform"
      >
        <el-form-item
          :label="$t('news.companyNews.contacts')"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model.trim="editcontactform.name"
            auto-complete="off"
            :maxlength="maxlength"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.detail.position')"
          :label-width="formLabelWidth"
          prop="trade"
        >
          <el-input
            v-model.trim="editcontactform.trade"
            auto-complete="off"
            :maxlength="maxlength"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.detail.linkphone')"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input
            v-model.trim="editcontactform.phone"
            auto-complete="off"
            :maxlength="maxlength"
            :blur="setphonechange2(editcontactform.phone)"
            v-on:change="phonechange2"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('businessSystem.detail.email')"
          :label-width="formLabelWidth"
          prop="mail"
        >
          <el-input
            v-model.trim="editcontactform.mail"
            auto-complete="off"
            :maxlength="maxlength"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="canceleditcontact('editcontactform')">{{$t('btn.back')}}</el-button>
        <el-button
          type="success"
          class="green"
          @click="editcontact('editcontactform')"
          :loading="iseditcontactshow"
        >{{$t('btn.submit')}}</el-button>
      </div>
    </el-dialog>
    <div class="companydetail">
      <div class="mybutton">
        <h3>{{bussinessform.name}}</h3>
        <el-button
          @click="editCompanyinfo"
          v-if="this.$store.state.Privilege.includes('BUTTON_COMPANY_EMENDATION')"
          type="info"
        >{{$t('businessSystem.detail.editInfo')}}</el-button>
        <el-button
          style="margin-right:20px"
          @click="addposition('positionform')"
          v-if="this.$store.state.Privilege.includes('BUTTON_POSITION_EMENDATION')"
          class="blue"
        >{{$t('businessSystem.detail.addPosition')}}
          <i class="el-icon-plus el-icon--right"></i>
        </el-button>

      </div>
      <el-table
        :data="detailData"
        style="width: 100%"
        class="company"
        :stripe="true"
        :empty-text="$t('recruitSystem.screen.nodata')"
      >
        <el-table-column
          prop="name"
          :label="$t('news.companyNews.name')"
        >
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
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>

    <el-tabs
      type="border-card"
      class="businessInfo"
    >
      <el-tab-pane :label="$t('businessSystem.detail.position')">

        <div class="positiontab">
          <h3 style="color:#e40202">{{$t('businessSystem.detail.recruiting')}}：
            <span>{{companyData.招聘中人数}}</span>
          </h3>
          <el-table
            :data="companyData.招聘中"
            stripe
            style="width: 100%"
            @row-click='handleRowHandle'
            :empty-text="$t('recruitSystem.screen.nodata')"
          >
            <el-table-column
              prop="name"
              :label="$t('businessSystem.tip.positioNname')"
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
              prop="number"
              :label="$t('businessSystem.tip.recruitsNumber')"
            >
            </el-table-column>
            <el-table-column
              prop="monthly"
              :label="$t('businessSystem.tip.monthSalary')"
            >
            </el-table-column>
            <el-table-column
              prop="annual"
              :label="$t('businessSystem.tip.yearSalary')"
            >
            </el-table-column>
            <el-table-column
              prop="charge"
              :label="$t('businessSystem.tip.chargescale')"
              v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CHARGE')"
            >
            </el-table-column>
            <el-table-column
              prop="appUser.name"
              :label="$t('news.companyNews.chargePerson')"
              v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')"
            >
            </el-table-column>
            <el-table-column
              prop="candidate"
              :label="$t('businessSystem.tip.number')"
            >
            </el-table-column>
            <el-table-column
              prop="candidateStatus"
              :label="$t('businessSystem.tip.newStatus')"
              :formatter="posFormat"
            >
            </el-table-column>
            <el-table-column
              prop="updateDate"
              :label="$t('news.companyNews.updateTime')"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>

        <div class="positiontab">
          <h3 style="color:#249739">{{$t('businessSystem.detail.recruited')}} :
            <span>{{companyData.已完成人数}}</span>
          </h3>
          <el-table
            :data="companyData.已完成"
            stripe
            style="width: 100%"
            @row-click='handleRowHandle'
            :empty-text="$t('recruitSystem.screen.nodata')"
          >
            <el-table-column
              prop="name"
              :label="$t('businessSystem.tip.positioNname')"
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
              prop="number"
              :label="$t('businessSystem.tip.recruitsNumber')"
            >
            </el-table-column>
            <el-table-column
              prop="monthly"
              :label="$t('businessSystem.tip.monthSalary')"
            >
            </el-table-column>
            <el-table-column
              prop="annual"
              :label="$t('businessSystem.tip.yearSalary')"
            >
            </el-table-column>
            <el-table-column
              prop="charge"
              :label="$t('businessSystem.tip.chargescale')"
              v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CHARGE')"
            >
            </el-table-column>
            <el-table-column
              prop="appUser.name"
              :label="$t('news.companyNews.chargePerson')"
              v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')"
            >
            </el-table-column>
            <el-table-column
              prop="candidate"
              :label="$t('businessSystem.tip.number')"
            >
            </el-table-column>
            <el-table-column
              prop="updateDate"
              :label="$t('news.companyNews.updateTime')"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>

        <div class="positiontab">
          <h3 style="color:#8a8a8a">{{$t('businessSystem.detail.closed')}} :
            <span>{{companyData.已关闭人数}}</span>
          </h3>
          <el-table
            :data="companyData.已关闭"
            stripe
            style="width: 100%"
            @row-click='handleRowHandle'
            :empty-text="$t('recruitSystem.screen.nodata')"
          >
            <el-table-column
              prop="name"
              :label="$t('businessSystem.tip.positioNname')"
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
              prop="number"
              :label="$t('businessSystem.tip.recruitsNumber')"
            >
            </el-table-column>
            <el-table-column
              prop="monthly"
              :label="$t('businessSystem.tip.monthSalary')"
            >
            </el-table-column>
            <el-table-column
              prop="annual"
              :label="$t('businessSystem.tip.yearSalary')"
            >
            </el-table-column>
            <el-table-column
              prop="charge"
              :label="$t('businessSystem.tip.chargescale')"
              v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_CHARGE')"
            >
            </el-table-column>
            <el-table-column
              prop="appUser.name"
              :label="$t('news.companyNews.chargePerson')"
              v-if="this.$store.state.Privilege.includes('COLUMN_POSITION_SALE')"
            >
            </el-table-column>
            <el-table-column
              prop="candidate"
              :label="$t('businessSystem.tip.number')"
            >
            </el-table-column>
            <el-table-column
              prop="updateDate"
              :label="$t('news.companyNews.updateTime')"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('news.companyNews.contacts')"
        v-if="this.$store.state.Privilege.includes('TAB_COMPANY_CONTACT')"
      >
        <div class="mybutton">
          <h3>{{$t('businessSystem.detail.linkList')}} </h3>
          <el-button
            type='info'
            :disabled="editcontactbutton"
            @click="findContactById"
            v-if="this.$store.state.Privilege.includes('BUTTON_COMPANY_CONTACT_EMENDATION')"
          >{{$t('businessSystem.detail.editlink')}} </el-button>
          <el-button
            @click="addcontact('addcontactform')"
            style="margin-right:20px"
            v-if="this.$store.state.Privilege.includes('BUTTON_COMPANY_CONTACT_EMENDATION')"
            class="green"
            type="success"
          >{{$t('businessSystem.detail.addlink')}}
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
        </div>
        <el-table
          :data="contactList"
          style="width: 100%"
          class="company"
          stripe
          highlight-current-row
          @current-change="handleCurrentChange"
          :empty-text="$t('recruitSystem.screen.nodata')"
        >
          <el-table-column
            prop="name"
            :label="$t('news.companyNews.contacts')"
          >
          </el-table-column>
          <el-table-column
            prop="trade"
            :label="$t('businessSystem.detail.position')"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            :label="$t('businessSystem.detail.linkphone')"
          >
          </el-table-column>
          <el-table-column
            prop="mail"
            :label="$t('businessSystem.detail.email')"
          >
          </el-table-column>
          <el-table-column
            prop="updateTimeShow"
            :label="$t('news.companyNews.updateTime')"
            show-overflow-tooltip
          >
          </el-table-column>

        </el-table>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('businessSystem.detail.file')"
        v-if="this.$store.state.Privilege.includes('TAB_COMPANY_ATTACHMENT')"
      >

        <el-upload
          class="upload-demo"
          ref="upload"
          :data="upLoadData"
          :action="baseAction"
          :file-list="fileList"
          :auto-upload="false"
          :before-upload="beforeUpload"
          :on-success="uploadsuccess"
        >

          <el-button
            type="success"
            @click="uploadCompanyAttachment"
            class="chuanbutton"
            v-if="this.$store.state.Privilege.includes('BUTTON_COMPANY_ATTACHMENT_EMENDATION')"
          >{{$t('businessSystem.detail.upload')}}
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>

          <el-button
            slot="trigger"
            type="success"
            class="youbutton green"
          >{{$t('businessSystem.detail.browse')}}
            <i class="el-icon-view el-icon--right"></i>
          </el-button>

        </el-upload>
        <div class="attachment">
          <el-button
            @click="deleteCompanyAttachment"
            v-if="this.$store.state.Privilege.includes('BUTTON_COMPANY_ATTACHMENT_EMENDATION')"
            type="info"
            :disabled="this.TalentAttachmentsels.length==0"
          >{{$t('businessSystem.detail.deletefile')}}
            <i class="el-icon-close el-icon--right"></i>
          </el-button>
          <el-button
            @click="downloadAttachment"
            v-if="this.$store.state.Privilege.includes('BUTTON_COMPANY_ATTACHMENT_EMENDATION')"
            type="info"
            :disabled="this.TalentAttachmentsels.length==0"
          >{{$t('businessSystem.detail.downloadfile')}}
            <i class="el-icon-my-xiazai1 el-icon--right"></i>
          </el-button>
        </div>

        <el-table
          ref="multipleTable"
          :data="attachmentData"
          tooltip-effect="dark"
          style="width: 100%"
          :empty-text="$t('recruitSystem.screen.nodata')"
          @selection-change="TalentAttachmentselschange"
          :stripe="true"
          v-loading="downloading"
        >
          <el-table-column
            type="selection"
            width="55"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            :label="$t('businessSystem.detail.fileName')"
            prop="name"
            show-overflow-tooltip
          >

          </el-table-column>

          <el-table-column
            prop="updateTimeShow"
            :label="$t('businessSystem.detail.time')"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>

      </el-tab-pane>

      <el-tab-pane
        :label="$t('businessSystem.detail.status')"
        v-if="this.$store.state.Privilege.includes('TAB_COMPANY_STATUS')"
      >

        <div style="position:relative">
          <div class="statusTop">
            <el-form
              label-width="160px"
              :model="statusForm"
              :rules="statusFormrules"
              ref="statusForm"
            >
              <el-form-item :label="$t('saleSystem.tip.newstatus')">
                <el-radio
                  v-model="statusForm.type"
                  label="0"
                >{{$t('saleSystem.tip.noupdate')}}</el-radio>
                <el-radio
                  v-model="statusForm.type"
                  label="1"
                >{{$t('saleSystem.tip.update')}}</el-radio>
                <el-select
                  v-model="statusForm.changedStatus"
                  :disabled="statusForm.type!='1'"
                >
                  <el-option
                    :label="$t('api.sale.n1')"
                    value="无状态"
                  ></el-option>
                  <el-option
                    :label="$t('api.sale.n2')"
                    value="完全没有意向"
                  ></el-option>
                  <el-option
                    :label="$t('api.sale.n3')"
                    value="潜在客户"
                  ></el-option>
                  <el-option
                    :label="$t('api.sale.n4')"
                    value="跟进中"
                  ></el-option>
                  <el-option
                    :label="$t('api.sale.n5')"
                    value="准备签约"
                  ></el-option>
                  <el-option
                    :label="$t('api.sale.n6')"
                    value="已签约"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('saleSystem.tip.remark ')"
                prop="reason"
              >
                <el-input
                  :placeholder="$t('valid.valid059')"
                  v-model="statusForm.reason"
                ></el-input>
              </el-form-item>
              <input
                type="hidden"
                v-model="statusForm.companyId"
              >

            </el-form>

          </div>
          <el-button
            type="success"
            style="position:absolute;top:50%;transform:translateY(-50%);right:5%"
            @click="saveCompanyStatus('statusForm')"
            v-if="this.$store.state.Privilege.includes('BUTTON_COMPANY_STATUS_COMMIT')"
          >{{$t('btn.submit')}}</el-button>
        </div>

        <el-table
          :data="statusData"
          stripe
          style="width: 100%"
          :empty-text="$t('recruitSystem.screen.nodata')"
        >

          <el-table-column
            prop="userName"
            :label="$t('saleSystem.tip.editpeople')"
          >
          </el-table-column>
          <el-table-column
            prop="updateTimeShow"
            :label="$t('saleSystem.tip.editpeople')"
          >
          </el-table-column>
          <el-table-column
            prop="type"
            :label="$t('saleSystem.tip.editType')"
          >
          </el-table-column>
          <el-table-column :label="$t('saleSystem.tip.editContent')">
            <template slot-scope="scope">
              <div
                v-html="$t('btn.b1')+':'+reFormat(scope.row.changedStatus)+'<br>'+$t('saleSystem.tip.remark')+':'+(scope.row.reason)"
                style="text-align: left;"
                v-if="scope.row.type==1"
              ></div>
              <div
                v-html="$t('saleSystem.tip.remark')+':'+scope.row.reason"
                style="text-align: left;"
                v-else
              ></div>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
import Util from "../../../tool/tool.js";
import Cookies from "js-cookie";
let mytools = new Util();
export default {
  data() {
    return {
      paralang:true,
      iseditcontactshow: false,
      isaddcontactshow: false,
      isaddshow: false,
      iseditshow: false,
      mysellerId: "",
      mytrade: "",
      editsellerId: "",
      maxlength: 50,
      statusFormrules: {
        reason: [
          {
            required: true,
            message: this.$t("valid.valid001"),
            trigger: "blur"
          }
        ],
        changed: [{ message: this.$t("valid.valid037"), trigger: "change" }]
      },
      statusForm: {},
      statusData: [],
      TalentAttachmentsels: [],
      downloading: false,
      numupload: 0,
      fileList: [],
      upnumList: [],
      baseAction: BASE_URL + "/icsserver/Company/uploadCompanyAttachment",
      upLoadData: {},
      bussinessformrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.valid002"),
            trigger: "blur"
          }
        ],
        scale: [
          {
            required: true,
            message: this.$t("valid.valid004"),
            trigger: "change"
          }
        ],
        trade: [
          {
            required: true,
            message: this.$t("valid.valid007"),
            trigger: "blur"
          }
        ]
        // sellerId: [
        //   { required: true, message: "请选择负责人", trigger: "change,blur" }
        // ]
      },
      bussinessform: {},
      detailData: [],
      tradeVisible: false,
      tabPosition: "left",
      tradeList: [],
      positiondialog: false,
      formLabelWidth: "160px",
      editbussinessdialog: false,
      positionform: {},
      positionformrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.valid030"),
            trigger: "blur"
          }
        ],
        number: [
          {
            required: true,
            message: this.$t("valid.valid031"),
            trigger: "blur"
          }
        ],
        monthly: [
          {
            required: true,
            message: this.$t("valid.valid032"),
            trigger: "blur"
          }
        ],
        annual: [
          {
            required: true,
            message: this.$t("valid.valid033"),
            trigger: "blur"
          }
        ],
        charge: [
          {
            required: true,
            message: this.$t("valid.valid038"),
            trigger: "blur"
          },
          // {
          //   type: "number",
          //   message: "收费比例为数字值"
          // },
          {
            // pattern: /^(0|[1-9]\d?|100)$/,
            pattern: /^(\d?\d(\.\d*)?|100)$/,
            message: this.$t("valid.valid039"),
            trigger: "blur"
          }
        ]
        // sellerId: [
        //   { required: true, message: "请选择负责人", trigger: "blur" }
        // ]
      },
      contactdialog: false,
      addcontactform: {},
      addcontactformrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.valid005"),
            trigger: "blur"
          },
          {}
        ],
        trade: [
          {
            required: true,
            message: this.$t("valid.valid006"),
            trigger: "blur,change"
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t("valid.inputlink"),
            trigger: "blur"
          },
          {
            pattern: /^1[3|4|5|7|8|9][0-9]{9}$/,
            message: this.$t("valid.valid040"),
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: this.$t("valid.userplaceholder"),
            trigger: "blur"
          },
          { type: "email", message: this.$t("valid.valid022"), trigger: "blur" }
        ]
      },
      editcontactdialog: false,
      editcontactform: {},
      editcontactformrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.valid005"),
            trigger: "blur"
          }
        ],
        trade: [
          {
            required: true,
            message: this.$t("valid.valid006"),
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t("valid.inputlink"),
            trigger: "blur"
          },
          {
            pattern: /^1[3|4|5|7|8|9][0-9]{9}$/,
            message: this.$t("valid.valid040"),
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: this.$t("valid.userplaceholder"),
            trigger: "blur"
          },
          { type: "email", message: this.$t("valid.valid022"), trigger: "blur" }
        ]
      },
      companyData: {},
      contactList: [],
      currentRow: "",
      editcontactbutton: true,
      attachmentData: [],
      saleVisible: false,
      selectSelleroptions: [],
      editsaleVisible: false
    };
  },

  created() {
    this.getlang()
    this.findCompanyContact();
    this.findCompanyPosition();
    this.findCompanyAttachment();
    this.findCompanyInfo();
    this.findCompanyStatus();
    this.selectSeller();
  },
  methods: {
    getlang() {
      if (Cookies.get("language") == "zh") {
        this.paralang = false;
      } else {
        this.paralang = true;
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
    //
     reFormat(v) {
      switch (v) {
        case "未联系":
          return this.$t("ststus.saleStatus.n1");
          break;
        case "已联系":
          return this.$t("ststus.saleStatus.n2");
          break;
        case "已演示":
          return this.$t("ststus.saleStatus.n3");
          break;
        case "已稳定使用":
          return this.$t("ststus.saleStatus.n4");
          break;
        case "已暂停使用":
          return this.$t("ststus.saleStatus.n5");
          break;
        case "无效客户":
          return this.$t("ststus.saleStatus.n6");
          break;
        case "重点跟进":
          return this.$t("ststus.saleStatus.n7");
          break;
        case "无人接听":
          return this.$t("ststus.saleStatus.n8");
          break;
      }
    },
    setphonechange(value) {
      this.phonechange(value);
    },
    phonechange(value) {
      // 目的是去掉字符串中除数字之外的其它字符
      if (this.addcontactform.phone) {
        this.$nextTick(() => {
          this.addcontactform.phone = value.replace(/[^\d]/g, "");
        });
      }
    },
    setphonechange2(value) {
      this.phonechange2(value);
    },
    phonechange2(value) {
      // 目的是去掉字符串中除数字之外的其它字符
      if (this.editcontactform.phone) {
        this.$nextTick(() => {
          this.editcontactform.phone = value.replace(/[^\d]/g, "");
        });
      }
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
            this.mysellerId = this.selectSelleroptions[0].id;
            this.positionform.sellerId = this.mysellerId;
          }
          if (res.data.code == "500") {
            console.log(res);
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
      this.mysellerId = this.positionform.sellerId;
    },
    suresaleVisible() {
      this.saleVisible = false;
      this.positionform.sellerId = this.mysellerId;
    },
    opensaleVisible() {
      this.saleVisible = true;
      this.mysellerId = this.bussinessform.sellerId;
    },
    canceltradeVisible() {
      this.tradeVisible = false;
      this.mytrade = "";
    },
    suretradeVisible() {
      this.tradeVisible = false;
      this.bussinessform.trade = this.mytrade;
    },
    canceleditsaleVisible() {
      this.editsaleVisible = false;
      this.editsellerId = "";
    },
    sureeditsaleVisible() {
      this.editsaleVisible = false;
      this.bussinessform.sellerId = this.editsellerId;
    },
    openeditsaleVisible() {
      this.editsaleVisible = true;
      this.editsellerId = this.bussinessform.sellerId;
    },
    //获取企业信息
    findCompanyInfo() {
      var para = { id: this.$route.query.id };
      this.$http.post(api.business.findCompanyInfo(), formatUrl(para)).then(
        res => {
          if (res.data.code == "00") {
            // console.log(res);
            this.bussinessform = res.data.data;
            this.detailData = [res.data.data];
            document.title = `${this.$t("sidebar.businessSystem")}-${
              res.data.data.name
            }`;
          }
          if (res.data.code == "500") {
            console.log(res);
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    editCompanyinfo() {
      this.editbussinessdialog = true;
    },
    //显示现有职位信息
    findCompanyPosition() {
      var para = { companyId: this.$route.query.id };
      this.$http.post(api.business.findCompanyPosition(), formatUrl(para)).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            // console.log(res.data.data);
            if (res.data.data.已关闭.length > 0) {
              var el = res.data.data.已关闭;
              el.forEach(v => {
                v.updateDate = v.updateDate ? v.updateDate : v.createDate;
                v.updateDate =
                  new Date(v.updateDate).getFullYear() +
                  "/" +
                  (new Date(v.updateDate).getMonth() + 1) +
                  "/" +
                  new Date(v.updateDate).getDate();
              });
            }
            if (res.data.data.招聘中.length > 0) {
              var el = res.data.data.招聘中;
              el.forEach(v => {
                v.updateDate = v.updateDate ? v.updateDate : v.createDate;
                v.updateDate =
                  new Date(v.updateDate).getFullYear() +
                  "/" +
                  (new Date(v.updateDate).getMonth() + 1) +
                  "/" +
                  new Date(v.updateDate).getDate();
              });
            }
            if (res.data.data.已完成.length > 0) {
              var el = res.data.data.已完成;
              el.forEach(v => {
                v.updateDate = v.updateDate ? v.updateDate : v.createDate;
                v.updateDate =
                  new Date(v.updateDate).getFullYear() +
                  "/" +
                  (new Date(v.updateDate).getMonth() + 1) +
                  "/" +
                  new Date(v.updateDate).getDate();
              });
            }
            this.companyData = res.data.data;
          }
          if (res.data.code == "500") {
            console.log(res);
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    //获取显示行业列表
    findTrade() {
      this.tradeVisible = true;
      this.$http.post(api.talent.findTrade()).then(
        res => {
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "00") {
            this.tradeList = res.data.data;
            this.mytrade = this.bussinessform.trade;
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
    //修改企业信息
    saveCompanyInfo(formName) {
      var para = {
        id: this.$route.query.id,
        name: this.bussinessform.name,
        trade: this.bussinessform.trade,
        scale: this.bussinessform.scale,
        sellerId: this.bussinessform.sellerId
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.bussinessform.sellerId) {
            this.iseditshow = true;
            this.$http.post(api.business.saveCompanyInfo(), para).then(
              res => {
                if (res.data.code == "00") {
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg1")
                  });
                  setTimeout(() => {
                    this.iseditshow = false;
                  }, 1000);
                  this.editbussinessdialog = false;
                  this.findCompanyInfo();
                  if (this.$refs[formName] !== undefined) {
                    this.$refs[formName].resetFields();
                  }
                }
                if (res.data.code == "500") {
                  console.log(res);
                  this.iseditshow = false;
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
              message: this.$t("valid.valid008")
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    canceleditbussiness(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.findCompanyInfo();
      this.editbussinessdialog = false;
    },
    //添加职位
    addposition(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.positiondialog = true;
      // this.positionform.sellerId = parseInt(localStorage.getItem("sellerId"));
    },
    savePosition(formName) {
      this.positionform.companyId = this.$route.query.id;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.positionform.sellerId) {
            this.isaddshow = true;
            this.$http
              .post(api.position.savePosition(), formatUrl(this.positionform))
              .then(
                res => {
                  if (res.data.code == "00") {
                    this.$message({
                      type: "success",
                      message: this.$t("msg.msg3")
                    });
                    setTimeout(() => {
                      this.isaddshow = false;
                    }, 1000);
                    // this.isaddshow = false;
                    this.positiondialog = false;
                    this.findCompanyPosition();
                    this.findCompanyStatus();
                  }
                  if (res.data.code == "500") {
                    this.isaddshow = false;
                    console.log(res);
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
              message: this.$t("valid.valid008")
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //显示企业联系人
    findCompanyContact() {
      this.$http
        .post(
          api.business.findCompanyContact(),
          formatUrl({ companyId: this.$route.query.id })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.contactList = res.data.data;
              this.editcontactbutton = true;

              // this.tradeList = res.data.data;
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
    //添加联系人
    addcontact(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.contactdialog = true;
    },
    saveCompanyContact(formName) {
      this.addcontactform.companyId = this.$route.query.id;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isaddcontactshow = true;
          this.$http
            .post(api.business.saveCompanyContact(), this.addcontactform)
            .then(
              res => {
                if (res.data.code == "00") {
                  this.$message({
                    message: this.$t("msg.msg4"),
                    type: "success"
                  });
                  setTimeout(() => {
                    this.isaddcontactshow = false;
                  }, 1000);

                  this.contactdialog = false;
                  this.findCompanyContact();
                }
                if (res.data.code == "500") {
                  this.isaddcontactshow = false;
                  console.log(res);
                  this.$message({
                    type: "error",
                    message: res.data.message
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
    //查询联系人
    findContactById() {
      this.editcontactdialog = true;
      this.$http
        .post(
          api.business.findContactById(),
          formatUrl({ id: this.currentRow })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.editcontactform = res.data.data;
              // this.contactList = res.data.data;
              // this.tradeList = res.data.data;
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
    //编辑联系人
    editcontact(formName) {
      var para = {
        id: this.editcontactform.id,
        name: this.editcontactform.name,
        trade: this.editcontactform.trade,
        phone: this.editcontactform.phone,
        mail: this.editcontactform.mail,
        companyId: this.editcontactform.companyId
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.iseditcontactshow = true;
          this.$http.post(api.business.saveCompanyContact(), para).then(
            res => {
              if (res.data.code == "00") {
                this.$message({
                  message: this.$t("msg.msg5"),
                  type: "success"
                });
                // console.log(res);
                setTimeout(() => {
                  this.iseditcontactshow = false;
                }, 1000);
                this.editcontactdialog = false;
                this.findCompanyContact();
                if (this.$refs[formName] !== undefined) {
                  this.$refs[formName].resetFields();
                }
              }
              if (res.data.code == "500") {
                this.iseditcontactshow = false;
                console.log(res);
                this.$message({
                  type: "error",
                  message: res.data.message
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
    canceleditcontact(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      // this.findCompanyInfo();
      this.editcontactdialog = false;
    },
    //显示企业附件
    findCompanyAttachment() {
      this.$http
        .post(
          api.business.findCompanyAttachment(),
          formatUrl({
            companyId: this.$route.query.id
          })
        )
        .then(
          res => {
            if (res.data.code == "00") {
              // console.log(res);
              this.attachmentData = res.data.data;
            }
            if (res.data.code == "500") {
              console.log(res);
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    //上传附件
    beforeUpload(file) {
      this.downloading = true;
      let fd = new FormData();
      fd.append("upfile", file);
      fd.append("name", file.name);
      fd.append("companyId", this.$route.query.id);
      this.$http.post(api.business.uploadCompanyAttachment(), fd).then(
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
              message: this.$t("msg.msg15")
            });
            this.findCompanyAttachment();
          }
          if (res.data.code == "500") {
            this.$message({
              type: "error",
              message: this.$t("msg.msg16")
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    uploadCompanyAttachment() {
      this.$refs.upload.submit();
    },
    uploadsuccess(response, file, fileList) {
      console.log(file, fileList);
      this.upnumList = fileList;
    },
    //删除附件
    deleteCompanyAttachment() {
      var ids = this.TalentAttachmentsels.map(item => item.id).toString();
      this.$confirm(
        this.$t("systemManagement.tip.contetn"),
        this.$t("systemManagement.tip.title"),
        {
          type: "warning"
        }
      )
        .then(() => {
          let para = { ids: ids };
          console.log(ids);
          this.$http
            .post(api.business.deleteCompanyAttachment(), formatUrl(para))
            .then(
              res => {
                if (res.data.code == "00") {
                  console.log(res);
                  this.findCompanyAttachment();
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg2")
                  });
                }
                if (res.data.code == "500") {
                  console.log(res);
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

    //下载附件
    downloadAttachment() {
      var arr = [];
      this.TalentAttachmentsels.forEach(function(value, index, array) {
        arr.push(value.url);
      });
      mytools.allDownload(arr);
    },
    //企业状态
    findCompanyStatus() {
      this.$http
        .post(
          api.business.findCompanyStatus(),
          formatUrl({
            companyId: this.$route.query.id
          })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              console.log(res);
              for (var i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].type == "1") {
                  res.data.data[i].type = this.$t("btn.b1");
                }
                if (res.data.data[i].type == "0") {
                  res.data.data[i].type = this.$t("btn.b2");
                }
              }
              this.statusData = res.data.data;
              // this.savePosition()
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
    //保存状态
    saveCompanyStatus(formName) {
      this.statusForm.companyId = this.$route.query.id;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.statusForm.type == 1 && !this.statusForm.changedStatus) {
            this.$message({
              type: "warning",
              message: this.$t("valid.valid041")
            });
          } else {
            this.$http
              .post(api.business.saveCompanyStatus(), this.statusForm)
              .then(
                res => {
                  if (res.data.code == "911") {
                    location.href = "./login.html";
                  }
                  if (res.data.code == "00") {
                    console.log(res);
                    // this.findByTalentIdTalentHistoryStatus();
                    this.$message({
                      type: "success",
                      message: this.$t("msg.msg17")
                    });
                    this.findCompanyStatus();
                    if (this.$refs[formName] !== undefined) {
                      this.$refs[formName].resetFields();
                    }
                    // this.TalentAttachmentData = res.data.data
                  }
                  if (res.data.code == "500") {
                    this.$message({
                      type: "error",
                      message: this.$t("msg.msg18")
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
    handleCurrentChange(val) {
      if (val) {
        this.currentRow = val.id;
        this.editcontactbutton = false;
      }

      // console.log(val);
    },

    //职位详情
    handleRowHandle(row, event, column) {
      // console.log(event);
      if (event.target.nodeName == "TD") {
        window.open("./position.html#/managedetail?id=" + row.id);
        // location.href = "./position.html#/managedetail?id=" + row.id;
      }
    },
    linkpositiondetail(v) {
      window.open("./position.html#/managedetail?id=" + v.row.id);
    },
    //附件
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 附件表格
    TalentAttachmentselschange: function(sels) {
      this.TalentAttachmentsels = sels;
    }
  }
};
</script>
<style>
.sellerId .el-input__suffix {
  display: none;
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
.el-dialog__header {
  padding: 0;
}
.el-form-item.is-required .el-form-item__label:before {
  display: none;
}
.industry .el-input-group {
  width: 100%;
}
.el-dialog__body .el-select {
  width: 100%;
}
.attachment {
  margin: 20px 0;
}
.attachment button {
  float: right;
  margin: 20px 0 20px 20px;
}

.fileList {
  float: left;
  width: 60%;
}
.uploadbutton {
  float: right;
  width: 100%;
}
.uploadbutton button {
  float: right;
  padding: 10px 25px;
}
.el-upload-list {
  width: 60%;
  float: left;
  /* margin-top: -45px; */
}
.upload-demo .el-upload {
  width: 40%;
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

.tradeRadio {
  width: 50%;
  float: left;
  margin: 0 0 20px 0 !important;
}
.tradedialog .el-dialog {
  min-width: 780px;
}
.tradedialog .el-dialog__header {
  padding: 15px 15px 10px;
}
.tradedialog .el-radio-group {
  width: 100%;
}
.tradedialog .el-dialog__body {
  padding: 0 20px;
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

.el-input-group {
  width: 100%;
}
.el-radio.saleperson {
  display: block;
  margin-bottom: 15px;
  margin-left: 0;
  text-align: left;
}
.el-select.sellerId {
  float: left;
  width: 80%;
}

/* 公司按钮 */
.bussdetail {
  padding: 0 3%;
}
.companytitle {
  height: 70px;
  line-height: 70px;
  font-size: 14px;
  text-align: left;
  color: #414141;
}
.companytitle span {
  color: #249739;
}
.companydetail {
  background: #ffffff;
  padding-bottom: 20px;
  margin-bottom: 30px;
  border: 1px solid #fff;
  box-shadow: 2px 2px 2px #ccc;
  border-radius: 5px;
}
/* .companydetail h3,
.mybutton h3 */
h3 {
  font: normal 24px "Microsoft YaHei";
  color: #212121;
  float: left;
  margin: 0;
}
.mybutton {
  overflow: hidden;
  height: 90px;
  box-sizing: border-box;
  padding: 25px 30px;
}
.mybutton button {
  float: right;
}
/* 表格 */
/* .el-table .cell,
.el-table th div {
  text-align: center;
}
.el-table tr {
  background: #f4f8fc;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #fff;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #ccc;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 0;
}
.el-table::before {
  height: 0;
} */
/* .businessInfo .el-table__body tr.current-row > td {
  background-color: #ccc;
} */
.businessInfo.el-tabs--border-card {
  margin-bottom: 30px;
  border: 0;
}
.businessInfo.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #fff;
  background-color: #249739;
}
.businessInfo.el-tabs--border-card > .el-tabs__header {
  background-color: #fff;
  border: 0;
}
.businessInfo.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  border: 0;
  border-right: 1px solid #f4f8fc;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.businessInfo .el-tabs__item {
  height: 58px;
  box-sizing: border-box;
  padding: 10px 30px !important;
  font-size: 18px;
}
.businessInfo.el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
  color: #fff;
  background-color: #249739;
}
.positiontab {
  margin-bottom: 20px;
  box-shadow: 3px 3px 3px #ccc;
  padding: 20px 10px;
  border-radius: 3px;
}
.positiontab h3 {
  margin-bottom: 10px;
}
</style>


