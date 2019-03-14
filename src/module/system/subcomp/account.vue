<template>
  <div>
    <!-- <div class="detailtitle">Centalent > 系统管理 >
      <span>账号管理列表</span>
    </div> -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="detailtitle"
    >
      <el-breadcrumb-item>
        <a href="./news.html">Centalent</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('systemManagement.accountListpage')}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>账号管理列表</el-breadcrumb-item> -->
    </el-breadcrumb>
    <el-tabs
      type="border-card"
      v-model="activeName"
      class="businessInfo"
    >
      <!--创建用户-->
      <el-dialog
        :visible.sync="createFormVisible"
        width="30%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :model="createform"
          status-icon
          :rules="createrules"
          ref="createform"
          label-width="180px"
          class="demo-ruleForm"
        >
          <el-form-item
            :label="$t('systemManagement.name')"
            prop="name"
          >
            <el-input
              v-model.trim="createform.name"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('systemManagement.useremail')"
            prop="email"
          >
            <el-input
              v-model.trim="createform.email"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('systemManagement.pass')"
            prop="password"
          >
            <el-input
              type="password"
              v-model.trim="createform.password"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('systemManagement.Jurisdiction')"
            prop="groupId"
            v-if="this.$store.state.Privilege.includes('TAB_USER_SELF_EMENDATION_PRIVILEGE')"
          >
            <el-select
              v-model.trim="createform.groupId"
              :placeholder="$t('valid.valid052')"
              auto-complete="off"
            >
              <el-option
                v-for="(item,index) in groupoptions"
                :key="index"
                :label="item.name"
                :value="item.id"
                auto-complete="off"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('systemManagement.classification')"
            prop="categoryIds"
            v-if="this.$store.state.Privilege.includes('TAB_USER_SELF_EMENDATION_CATEGORY')"
          >
            <el-select
              v-model="createform.categoryIds"
              multiple
              :placeholder="$t('valid.valid053')"
              @change="selectchange(createform.categoryIds,'addCategoryForm')"
              popper-class="popcategory"
            >
              <el-option
                v-for="(item,index) in categoryoptions"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
              <el-option
                :label="$t('systemManagement.addClass')"
                value="添加分类"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >

          <el-button @click="createFormVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button
            type="success"
            class="green"
            @click="createAppUser('createform')"
            :loading="isUp"
          >{{$t('btn.submit')}}</el-button>
        </div>
      </el-dialog>
      <!--修改用户-->
      <el-dialog
        :visible.sync="editFormVisible"
        width="30%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :model="editform"
          status-icon
          ref="editform"
          label-width="180px"
          class="demo-ruleForm"
        >
          <el-form-item
            :label="$t('systemManagement.name')"
            prop="name"
          >
            <el-input
              v-model.trim="editform.name"
              auto-complete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            :label="$t('systemManagement.Jurisdiction')"
            prop="groupId"
            v-if="this.$store.state.Privilege.includes('TAB_USER_SELF_EMENDATION_PRIVILEGE')"
          >
            <el-select
              v-model.trim="editform.groupId"
              :placeholder="$t('valid.valid052')"
              auto-complete="off"
            >
              <el-option
                v-for="(item,index) in groupoptions"
                :key="index"
                :label="item.name"
                :value="item.id"
                auto-complete="off"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('systemManagement.classification')"
            v-if="this.$store.state.Privilege.includes('TAB_USER_SELF_EMENDATION_CATEGORY')"
          >
            <el-select
              v-model="categoryIds"
              multiple
              :placeholder="$t('valid.valid053')"
            >
              <el-option
                v-for="(item,index) in categoryoptions"
                :key="index"
                :label="item.name"
                :value="item.id"
                auto-complete="off"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="editFormVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button
            type="success"
            class="green"
            @click="updateAppUser"
            :loading="isSure"
          >{{$t('btn.sure')}}</el-button>
        </div>
      </el-dialog>
      <!--密码修改界面-->
      <el-dialog
        :visible.sync="passwordFormVisible"
        width="30%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :model="passwordform"
          status-icon
          :rules="passwordrules"
          ref="passwordform"
          label-width="180px"
          class="demo-ruleForm"
        >
          <!-- <el-form-item label="用户名" prop="userName">
            <el-input v-model="passwordform.userName" auto-complete="off" :disabled="true"></el-input>
          </el-form-item> -->
          <el-form-item
            :label="$t('systemManagement.oldpass')"
            prop="password"
          >
            <el-input
              type="password"
              v-model="passwordform.password"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('systemManagement.newpass')"
            prop="nPassword"
          >
            <el-input
              type="password"
              v-model="passwordform.nPassword"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('systemManagement.confirmpass')"
            prop="rPassword"
          >
            <el-input
              type="password"
              v-model="passwordform.rPassword"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="passwordFormVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button
            type="success"
            class="green"
            @click="updatePassword('passwordform')"
          >{{$t('btn.sure')}}</el-button>
        </div>
      </el-dialog>
      <!--添加次数-->
      <el-dialog
        :visible.sync="addCountFormVisible"
        width="40%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :model="addCountForm"
          ref="addCountForm"
          :rules="addCountFormrules"
        >
          <el-form-item
            :label="$t('systemManagement.tip.addCounts')"
            :label-width="formLabelWidth"
            prop="addAccount"
          >
            <el-input
              v-model.trim="addCountForm.addAccount"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="addCountFormVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button
            type="success"
            class="green"
            @click="addEvaluation('addCountForm')"
          >{{$t('btn.sure')}}</el-button>
        </div>
        <div style="overflow:hidden;margin:10px 0">
          <span style="float:left;text-align:left;line-height:40px">{{$t('systemManagement.tip.addDayshistory')}}</span>
          <el-button
            plain
            style="float:right;text-align:right"
            @click="seeAll"
          >{{$t('systemManagement.tip.seeAll')}}</el-button>
        </div>
        <el-table
          :data="evalationHistoryData.content"
          style="width:100%"
        >
          <el-table-column
            prop="appRegister.company"
            :label="$t('systemManagement.tip.company')"
          >
          </el-table-column>
          <el-table-column
            prop="addAccount"
            :label="$t('systemManagement.tip.counts')"
          >
          </el-table-column>
          <el-table-column
            prop="createDate"
            :label="$t('systemManagement.tip.addTime')"
          >
          </el-table-column>
        </el-table>
      </el-dialog>

      <!--查看全部-->
      <el-dialog
        :visible.sync="seeAllFormVisible"
        width="40%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >

        <div class="seeAll">
          <el-input
            v-model="seeAllsearch"
            @keyup.enter.delete.native="seeAllsearchbtn"
            :placeholder="$t('systemManagement.tip.company')"
          >
            <template slot="prepend">
              <i class="el-icon-search"></i>
            </template>
          </el-input>
          <el-button
            type="success"
            class="searchbutton green"
            @click="seeAllsearchbtn"
          >{{$t('screenTool.searchbtn')}}</el-button>
        </div>
        <el-table
          :data="seeAllFormData.content"
          style="width:100%"
        >
          <el-table-column
            prop="appRegister.company"
            :label="$t('systemManagement.tip.company')"
          >
          </el-table-column>
          <el-table-column
            prop="addAccount"
            :label="$t('systemManagement.tip.counts')"
          >
          </el-table-column>
          <el-table-column
            prop="createDate"
            :label="$t('systemManagement.tip.addTime')"
          >
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block">
          <el-pagination
            popper-class="testclass"
            @size-change="seeAllSizeChange"
            @current-change="seeAllCurrentChange"
            :current-page="currentPage1"
            :page-size="seeAllFormData.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="seeAllFormData.totalElements"
          >
          </el-pagination>
        </div>
      </el-dialog>
      <!-- 添加天数 -->
      <el-dialog
        :visible.sync="addPeriodFormVisible"
        width="40%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :model="addPeriodForm"
          ref="addPeriodForm"
          :rules="addPeriodFormrules"
        >
          <el-form-item
            :label="$t('systemManagement.tip.addDays')"
            :label-width="formLabelWidth"
            prop="addAccount"
          >
            <el-input
              v-model.trim="addPeriodForm.addAccount"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="addPeriodFormVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button
            type="success"
            class="green"
            @click="addPeriod('addPeriodForm')"
          >{{$t('btn.sure')}}</el-button>
        </div>
        <div style="overflow:hidden;margin:10px 0">
          <span style="float:left;text-align:left;line-height:40px">{{$t('systemManagement.tip.addDayshistory')}}</span>
          <el-button
            plain
            style="float:right;text-align:right"
            @click="seeAllday"
          >{{$t('systemManagement.tip.seeAll')}}</el-button>
        </div>
        <el-table
          :data="evalationDayHistory.content"
          style="width:100%"
        >
          <el-table-column
            prop="appRegister.company"
            :label="$t('systemManagement.tip.company')"
          >
          </el-table-column>
          <el-table-column
            prop="addAccount"
            :label="$t('systemManagement.tip.days')"
          >
          </el-table-column>
          <el-table-column
            prop="createDate"
            :label="$t('systemManagement.tip.addTime')"
          >
          </el-table-column>
        </el-table>
      </el-dialog>
      <!--查看全部天数-->
      <el-dialog
        :visible.sync="seeAlldayFormVisible"
        width="40%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >

        <div class="seeAll">
          <el-input
            v-model="seeAlldaysearch"
            @keyup.enter.delete.native="seeAlldaysearchbtn"
            :placeholder="$t('systemManagement.tip.company')"
          >
            <template slot="prepend">
              <i class="el-icon-search"></i>
            </template>
          </el-input>
          <el-button
            type="success"
            class="searchbutton green"
            @click="seeAlldaysearchbtn"
          >{{$t('screenTool.searchbtn')}}</el-button>
        </div>
        <el-table
          :data="seeAlldayFormData.content"
          style="width:100%"
        >
          <el-table-column
            prop="appRegister.company"
            :label="$t('systemManagement.tip.company')"
          >
          </el-table-column>
          <el-table-column
            prop="addAccount"
            :label="$t('systemManagement.tip.counts')"
          >
          </el-table-column>
          <el-table-column
            prop="createDate"
            :label="$t('systemManagement.tip.addTime')"
          >
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block">
          <el-pagination
            popper-class="testclass"
            @size-change="seeAlldaySizeChange"
            @current-change="seeAlldayCurrentChange"
            :current-page="currentPage1"
            :page-size="seeAlldayFormData.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="seeAlldayFormData.totalElements"
          >
          </el-pagination>
        </div>
      </el-dialog>
      <!--添加分类界面-->
      <el-dialog
        :visible.sync="addCategoryFormVisible"
        width="30%"
        center
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :model="addCategoryForm"
          status-icon
          :rules="addCategoryrules"
          ref="addCategoryForm"
          label-width="180px"
          class="demo-ruleForm"
        >
          <el-form-item
            :label="$t('systemManagement.classificationName')"
            prop="name"
          >
            <el-input
              v-model.trim="addCategoryForm.name"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="addCategoryFormVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button
            type="success"
            class="green"
            @click="createAppUserCategory('addCategoryForm')"
          >{{$t('btn.sure')}}</el-button>
        </div>
      </el-dialog>

      <el-tab-pane
        :label="$t('systemManagement.tab01')"
        name="first"
        v-if="this.$store.state.Privilege.includes('TAB_USER_SELF_MANAGEMENT')"
      >
        <div class="listbuttons">
          <!--删除用户-->
          <el-button
            class="user"
            type="info"
            @click="deleteAppUser"
            :disabled="this.sels.length===0"
            v-if="this.$store.state.Privilege.includes('BUTTON_USER_SELF_DELETE')"
          >{{$t('systemManagement.deleteuser')}}
            <i class="el-icon-close el-icon--right"></i>
          </el-button>
          <el-button
            class="blue user"
            type="primary"
            @click="getAppUser"
            :disabled="this.sels.length!==1"
            v-if="this.$store.state.Privilege.includes('BUTTON_USER_SELF_EMENDATION')"
          >{{$t('systemManagement.edituser')}}</el-button>
          <el-button
            class="green user"
            type="success"
            @click="opencreateAppUser('createform')"
            v-if="this.$store.state.Privilege.includes('BUTTON_USER_SELF_EMENDATION')"
          >{{$t('systemManagement.adduser')}}
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
        </div>

        <!--用户列表-->
        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          stripe
          style="width: 100%"
          :data="userData.content"
          @selection-change="selsChange"
          v-loading="listLoading"
          :element-loading-text="$t('businessSystem.loading')"
          :empty-text="$t('recruitSystem.screen.nodata')"
        >
          <el-table-column
            type="selection"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('systemManagement.name')"
          >
          </el-table-column>
          <el-table-column
            prop="mail"
            :label="$t('systemManagement.useremail')"
          >
          </el-table-column>
          <el-table-column
            :label="$t('systemManagement.pass')"
            v-if="this.$store.state.Privilege.includes('COLUMN_USER_SELF_PASSWORD')"
          >
            <template slot-scope="scope">
              <!--修改密码-->
              <el-button
                type="text"
                class="editbtn"
                @click="handleEdit(scope.$index, scope.row,'passwordform')"
              >{{$t('systemManagement.edit')}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="categoryList"
            :label="$t('systemManagement.classification')"
            :formatter="categoryListchange"
            v-if="this.$store.state.Privilege.includes('COLUMN_USER_SELF_CATEGORY')"
          >
          </el-table-column>
          <el-table-column
            prop="group.name"
            :label="$t('systemManagement.Jurisdiction')"
            v-if="this.$store.state.Privilege.includes('COLUMN_USER_SELF_PRIVILEGE')"
          >
          </el-table-column>
        </el-table>

        <!--分页-->
        <div class="block">
          <el-pagination
            popper-class="testclass"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-size="userData.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userData.totalElements"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('systemManagement.tab02')"
        name="second"
        v-if="this.$store.state.Privilege.includes('TAB_USER_SELF_GROUP_MANAGEMENT')"
      >

        <div class="listbuttons">
          <el-button
            class="user"
            type="info"
            @click="deleteAppUserCategory"
            :disabled="this.categorysels.length===0"
            v-if="this.$store.state.Privilege.includes('BUTTON_USER_SELF_GROUP_EMENDATION')"
          >{{$t('systemManagement.delClass')}}
            <i class="el-icon-close el-icon--right"></i>
          </el-button>
          <el-button
            class="green user"
            type="success"
            @click="opencategory('addCategoryForm')"
            v-if="this.$store.state.Privilege.includes('BUTTON_USER_SELF_GROUP_EMENDATION')"
          >{{$t('systemManagement.addClass')}}
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
        </div>

        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          v-loading="listLoading"
          stripe
          style="width: 100%"
          :data="categoryData.content"
          @selection-change="categoryselsChange"
          :element-loading-text="$t('businessSystem.loading')"
          :empty-text="$t('recruitSystem.screen.nodata')"
        >
          <el-table-column
            type="selection"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('systemManagement.classificationName')"
          >
          </el-table-column>
          <el-table-column
            prop="teamLeaderList"
            :formatter="teamLeaderListchange"
            :label="$t('systemManagement.leadership')"
          >
          </el-table-column>
          <el-table-column
            prop="teamMemberList"
            :formatter="teamMemberListchange"
            :label="$t('systemManagement.Taxonomy')"
          >
          </el-table-column>

        </el-table>
        <!--分页-->
        <div class="block">
          <el-pagination
            popper-class="testclass"
            @size-change="categorySizeChange"
            @current-change="categoryCurrentChange"
            :current-page="currentPage1"
            :page-size="categoryData.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="categoryData.totalElements"
          >
          </el-pagination>
        </div>

      </el-tab-pane>
      <el-tab-pane
        :label="$t('systemManagement.tab03')"
        name="third"
        v-if="this.$store.state.Privilege.includes('TAB_USER_SELF_TENANT_MANAGEMENT')"
      >
        <!-- 主账户直接修改租户密码 -->
        <el-dialog
          :visible.sync="updatePasswordVisible"
          width="30%"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <el-form
            :model="updatePasswordform"
            status-icon
            :rules="updatePasswordformrules"
            ref="updatePasswordform"
            label-width="180px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="新密码"
              prop="password"
            >
              <el-input
                v-model.trim="updatePasswordform.password"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >

            <el-button @click="updatePasswordVisible = false">{{$t('btn.cancel')}}</el-button>
            <el-button
              type="success"
              class="green"
              @click="updatePasswordById('updatePasswordform')"
            >{{$t('btn.b5')}}</el-button>
          </div>
        </el-dialog>
        <!-- 修改用户 -->
        <el-dialog
          :visible.sync="editTenantAccountVisible"
          width="30%"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <el-form
            :model="editTenantAccountform"
            status-icon
            :rules="editTenantAccountformrules"
            ref="editTenantAccountform"
            label-width="180px"
            class="demo-ruleForm"
          >
            <el-form-item
              :label="$t('systemManagement.name')"
              prop="name"
            >
              <el-input
                v-model.trim="editTenantAccountform.name"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="联系方式"
              prop="phone"
            >
              <el-input
                v-model.trim="editTenantAccountform.phone"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >

            <el-button @click="editTenantAccountVisible = false">{{$t('btn.cancel')}}</el-button>
            <el-button
              type="success"
              class="green"
              @click="updateHunterAdmin('editTenantAccountform')"
            >{{$t('btn.b5')}}</el-button>
          </div>
        </el-dialog>
        <!-- 添加用户 -->
        <div class="listbuttons">
          <div style="width:40%;float:left">
            <el-input
              :placeholder="$t('saleSystem.search')"
              v-model.trim="pagesearch"
              @keyup.enter.delete.native="findAdminUserListsearch"
              style="width:80%;padding-left:3%;float:left"
            >
            </el-input>
            <el-button
              type="success"
              class="searchbutton green"
              @click="findAdminUserListsearch"
              icon="el-icon-search"
              style="float:left"
            ></el-button>
          </div>
          <!--删除用户-->
          <div style="width:60%;float:left">
            <el-button
              class="user"
              v-if="this.$store.state.Privilege.includes('BUTTON_USER_SELF_TENANT_EXPORT')"
              @click="exportAdminUserList"
              :loading="isExport"
            >{{$t('saleSystem.exportList')}}</el-button>
            <el-button
              class="user"
              type="info"
              :disabled="this.tenantAccountsels.length==0"
              @click="deleteTenantAccount"
              v-if="this.$store.state.Privilege.includes('BUTTON_USER_SELF_TENANT_DELETE')"
            >{{$t('systemManagement.deleteuser')}}
              <i class="el-icon-close el-icon--right"></i>
            </el-button>
            <el-button
              class="blue user"
              type="primary"
              :disabled="this.tenantAccountsels.length!==1"
              @click="openEditTenantAccount"
              v-if="this.$store.state.Privilege.includes('BUTTON_USER_SELF_TENANT_EMENDATION')"
            >{{$t('systemManagement.edituser')}}</el-button>
            <el-button
              class="green user"
              type="success"
              @click="openaddCount('addCountForm')"
              :disabled="this.tenantAccountsels.length!==1"
              v-if="this.$store.state.Privilege.includes('BUTTON_USER_SELF_TENANT_ADDACCOUNT')"
            >{{$t('btn.b9')}}
              <i class="el-icon-plus el-icon--right"></i>
            </el-button>
            <el-button
              class="green user"
              type="success"
              @click="openaddPeriod('addPeriodForm')"
              :disabled="this.tenantAccountsels.length!==1"
              v-if="this.$store.state.Privilege.includes('BUTTON_USER_SELF_TENANT_ADDACCOUNT')"
            >{{$t('btn.b8')}}
              <i class="el-icon-plus el-icon--right"></i>
            </el-button>
          </div>

        </div>

        <!--用户列表-->
        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          :data="tenantAccountData.content"
          v-loading="listLoading"
          stripe
          style="width: 100%"
          @selection-change="tenantAccountselsChange"
          @sort-change="sortChange"
          :element-loading-text="$t('businessSystem.loading')"
          :empty-text="$t('recruitSystem.screen.nodata')"
        >
          <el-table-column
            type="selection"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('systemManagement.name')"
          >
          </el-table-column>
          <el-table-column
            prop="mail"
            :label="$t('systemManagement.useremail')"
          >
          </el-table-column>
          <el-table-column
            prop="appRegister.company"
            :label="$t('saleSystem.companyName')"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="appRegister.phone"
            :label="$t('saleSystem.link')"
          >
          </el-table-column>
          <el-table-column
            :label="$t('systemManagement.pass')"
            v-if="this.$store.state.Privilege.includes('COLUMN_USER_SELF_TENANT_PASSWORD')"
          >
            <template slot-scope="scope">
              <!--修改密码-->
              <el-button
                type="success"
                class="editbtn green"
                @click="openupdatePass(scope,'updatePasswordform')"
              >{{$t('systemManagement.edit')}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="登录"
            v-if="this.$store.state.Privilege.includes('COLUMN_USER_SELF_TENANT_LOGIN')"
          >
            <template slot-scope="scope">
              <!--修改密码-->
              <el-button
                type="success"
                class="editbtn green"
                @click="loginByMail(scope)"
              >{{$t('systemManagement.login')}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="appRegister.evaluationUsedAccount"
            :label="$t('saleSystem.sendNumber')"
          >
          </el-table-column>
          <el-table-column
            prop="appRegister.evaluationRemain"
            :label="$t('saleSystem.remainingNumber')"
          >
          </el-table-column>
          <el-table-column
            prop="loginTime"
            :label="$t('saleSystem.latestLogintime')"
          >
          </el-table-column>
          <el-table-column
            prop="createDate"
            :label="$t('saleSystem.regTime')"
            :formatter="dateFormat"
          >
          </el-table-column>
          <el-table-column
            prop="appRegister.remainDays"
            :label="$t('saleSystem.RemainingDays')"
          >
          </el-table-column>
        </el-table>

        <!--分页-->
        <div class="block">
          <el-pagination
            popper-class="testclass"
            @size-change="tenantAccountSizeChange"
            @current-change="tenantAccountCurrentChange"
            :current-page="currentPage1"
            :page-size="tenantAccountData.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tenantAccountData.totalElements"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('systemManagement.manageaccount')"
        name="first"
        v-if="this.$store.state.Privilege.includes('TAB_USER_TENANT_MANAGEMENT')"
      >

        <div class="listbuttons">
          <!--删除用户-->
          <el-button
            class="user"
            type="info"
            @click="deleteAppUser"
            :disabled="this.sels.length===0"
            v-if="this.$store.state.Privilege.includes('BUTTON_USER_TENANT_DELETE')"
          >{{$t('systemManagement.deleteuser')}}
            <i class="el-icon-close el-icon--right"></i>
          </el-button>
          <el-button
            class="blue user"
            type="primary"
            @click="getAppUser"
            :disabled="this.sels.length!==1"
            v-if="this.$store.state.Privilege.includes('BUTTON_USER_TENANT_EMENDATION')"
          >{{$t('systemManagement.edituser')}}</el-button>
          <el-button
            @click="opencreateAppUser('createform')"
            class="green user"
            type="success"
            v-if="this.$store.state.Privilege.includes('BUTTON_USER_TENANT_EMENDATION')"
          >{{$t('systemManagement.adduser')}}
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
        </div>

        <!--用户列表-->
        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          stripe
          style="width: 100%"
          :data="userData.content"
          @selection-change="selsChange"
          :element-loading-text="$t('businessSystem.loading')"
          :empty-text="$t('recruitSystem.screen.nodata')"
        >
          <el-table-column
            type="selection"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('systemManagement.name')"
          >
          </el-table-column>
          <el-table-column
            prop="mail"
            :label="$t('systemManagement.useremail')"
          >
          </el-table-column>
          <el-table-column
            :label="$t('systemManagement.pass')"
            v-if="this.$store.state.Privilege.includes('COLUMN_USER_TENANT_PASSWORD')"
          >
            <template slot-scope="scope">
              <!--修改密码-->
              <el-button
                type="text"
                class="editbtn"
                @click="handleEdit(scope.$index, scope.row,'passwordform')"
              >{{$t('systemManagement.edit')}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="categoryList"
            :label="$t('systemManagement.classification')"
            :formatter="categoryListchange"
          >
          </el-table-column>
          <el-table-column
            prop="group.name"
            :label="$t('systemManagement.Jurisdiction')"
          >
          </el-table-column>
        </el-table>

        <!--分页-->
        <div class="block">
          <el-pagination
            popper-class="testclass"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-size="userData.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userData.totalElements"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('systemManagement.tab02')"
        name="fifth"
        v-if="this.$store.state.Privilege.includes('TAB_USER_TENANT_GROUP_MANAGEMENT')"
      >
        <div class="listbuttons">
          <el-button
            class="user"
            type="info"
            @click="deleteAppUserCategory"
            :disabled="this.categorysels.length===0"
            v-if="this.$store.state.Privilege.includes('BUTTON_USER_TENANT_GROUP_EMENDATIONF')"
          >{{$t('systemManagement.delClass')}}
            <i class="el-icon-close el-icon--right"></i>
          </el-button>
          <el-button
            class="green user"
            type="success"
            @click="opencategory('addCategoryForm')"
            v-if="this.$store.state.Privilege.includes('BUTTON_USER_TENANT_GROUP_EMENDATION')"
          >{{$t('systemManagement.addClass')}}
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
        </div>

        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          v-loading="listLoading"
          stripe
          style="width: 100%"
          :data="categoryData.content"
          @selection-change="categoryselsChange"
          :element-loading-text="$t('businessSystem.loading')"
          :empty-text="$t('recruitSystem.screen.nodata')"
        >
          <el-table-column
            type="selection"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('systemManagement.classificationName')"
          >
          </el-table-column>
          <el-table-column
            prop="teamLeaderList"
            :formatter="teamLeaderListchange"
            :label="$t('systemManagement.leadership')"
          >
          </el-table-column>
          <el-table-column
            prop="teamMemberList"
            :formatter="teamMemberListchange"
            :label="$t('systemManagement.Taxonomy')"
          >
          </el-table-column>

        </el-table>
        <!--分页-->
        <div class="block">
          <el-pagination
            popper-class="testclass"
            @size-change="categorySizeChange"
            @current-change="categoryCurrentChange"
            :current-page="currentPage1"
            :page-size="categoryData.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="categoryData.totalElements"
          >
          </el-pagination>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import api from "../../../api/api.js";
import formatUrl from "../../../lib/tool.js";
import { quillEditor } from "vue-quill-editor";
import Util from "../../../tool/tool.js";
let mytools = new Util();
export default {
  data() {
    var validaterPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("valid.againpassword")));
      } else if (value !== this.passwordform.nPassword) {
        callback(new Error(this.$t("valid.valid021")));
      } else {
        callback();
      }
    };

    return {
      loading1: false,
      isSure: false,
      isUp: false,
      isExport: false,
      idArr: [],
      form: {
        id: "",
        tpName: "",
        content: ""
      },
      editorOption: {},
      listLoading: false,
      // 密码表单
      passwordform: {
        userName: "",
        password: "",
        nPassword: "",
        rPassword: ""
      },
      sels: [], //列表选中列
      // 密码界面
      passwordFormVisible: false,
      //修改界面
      editFormVisible: false,
      //修改表单
      editform: {
        group: {}
      },
      //用户列表数据
      userData: [],
      //用户创建界面
      createFormVisible: false,
      // 删除界面
      delVisible: false,
      //创建表单
      createform: {},
      //创建列表验证
      createrules: {
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
        password: [
          {
            required: true,
            message: this.$t("valid.pwdplaceholder"),
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: this.$t("valid.valid023"),
            trigger: "blur"
          },
          {
            pattern: /^(\w){6,30}$/,
            message: this.$t("valid.valid024"),
            trigger: "blur"
          }
        ],
        groupId: [
          {
            required: true,
            message: this.$t("valid.valid052"),
            trigger: "change"
          }
        ]
        // categoryIds: [
        //   { required: true, message: "请选择分类", trigger: "change" }
        // ]
      },
      //密码验证
      passwordrules: {
        // userName: [{ validator: validateuserName, trigger: "blur" }],
        password: [
          {
            required: true,
            message: this.$t("valid.pwdplaceholder"),
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: this.$t("valid.valid023"),
            trigger: "blur"
          },
          {
            pattern: /^(\w){6,30}$/,
            message: this.$t("valid.valid024"),
            trigger: "blur"
          }
        ],
        nPassword: [
          {
            required: true,
            message: this.$t("valid.pwdplaceholder"),
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: this.$t("valid.valid023"),
            trigger: "blur"
          },
          {
            pattern: /^(\w){6,30}$/,
            message: this.$t("valid.valid024"),
            trigger: "blur"
          }
        ],
        rPassword: [{ validator: validaterPassword, trigger: "blur" }]
      },
      //分页
      page: 0,
      size: 20,
      sort: "id",
      currentPage1: 1,
      formLabelWidth: "120px",
      isCollapse: true,
      activeName: "first",
      categoryData: [],
      categorypage: 0,
      categorysize: 100,
      addCategoryForm: {},
      addCategoryFormVisible: false,
      addCategoryrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.valid054"),
            trigger: "blur"
          }
        ]
      },
      categorysels: [],
      addCountForm: {},
      addCountFormrules: {
        addAccount: [
          {
            required: true,
            message: this.$t("valid.valid019"),
            trigger: "blur"
          },
          {
            pattern: /^(\+?[1-9]\d{0,2}|\+?1000)$/,
            message: this.$t("valid.valid055"),
            trigger: "blur"
          }
        ]
      },
      addCountFormVisible: false,
      addPeriodForm: {},
      addPeriodFormrules: {
        addAccount: [
          {
            required: true,
            message: this.$t("valid.valid018"),
            trigger: "blur"
          },
          {
            pattern: /^(\+?[1-9]\d{0,2}|\+?1000)$/,
            message: this.$t("valid.valid055"),
            trigger: "blur"
          }
        ]
      },
      addPeriodFormVisible: false,
      evalationHistoryData: {},
      seeAllFormData: {},
      seeAllFormVisible: false,
      seeAllsize: 20,
      seeAllpage: 0,
      seeAllsearch: "",
      evalationDayHistory: {},
      seeAlldayFormData: {},
      seeAlldayFormVisible: false,
      seeAlldaysize: 20,
      seeAlldaypage: 0,
      seeAlldaysearch: "",
      pageIndex: 0,
      pageCount: 20,
      pagesort: "",
      pagesearch: "",
      tenantAccountData: {},
      updatePasswordVisible: false,
      updatePasswordform: {},
      updatePasswordformrules: {
        password: [
          {
            required: true,
            message: this.$t("valid.pwdplaceholder"),
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: this.$t("valid.valid023"),
            trigger: "blur"
          },
          {
            pattern: /^(\w){6,30}$/,
            message: this.$t("valid.valid024"),
            trigger: "blur"
          }
        ]
      },
      tenantAccountsels: [],
      editTenantAccountVisible: false,
      editTenantAccountform: {},
      editTenantAccountformrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.inputName"),
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
          // {
          //   type: "number",
          //   message: this.$t('valid.valid056')
          // }
        ]
      },
      dialogFormVisible: false,
      registerform: {},
      registerformrules: {
        name: [
          {
            required: true,
            message: this.$t("valid.inputName"),
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
        ],
        password: [
          {
            required: true,
            message: this.$t("valid.pwdplaceholder"),
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: this.$t("valid.valid023"),
            trigger: "blur"
          },
          {
            pattern: /^(\w){6,30}$/,
            message: this.$t("valid.valid024"),
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
          },
          {
            type: "number",
            message: this.$t("valid.valid056")
          }
        ],
        company: [
          {
            required: true,
            message: this.$t("valid.inputCompany"),
            trigger: "blur"
          }
        ]
      },
      categoryoptions: [],
      groupoptions: [],
      categoryIds: [],
      categoryflag: false
    };
  },
  components: {
    quillEditor
  },
  created() {
    document.title = `${this.$t("sidebar.systemManagement")}-${this.$t("sidebar.accountManagement")}`;
    this.findAppUserListByHunterCompanyId();
    this.getGroupListByType();
    this.getAppUserCategoryList();

    this.findAdminUserList();
  },
  methods: {
    selectchange(v, formName) {
      // console.log(v);
      if (v.includes("添加分类")) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
        this.addCategoryFormVisible = true;
        // console.log(this.createform.categoryIds);
        this.createform.categoryIds.splice(
          this.createform.categoryIds.indexOf("添加分类"),
          1
        );
        document.getElementsByClassName("popcategory")[0].style.display =
          "none";
        this.categoryflag = true;
      }
    },
    //主账户列表
    findAppUserListByHunterCompanyId() {
      this.listLoading = true;
      let para = {
        page: this.page,
        size: this.size,
        sort: "id"
      };
      this.$http
        .post(api.user.findAppUserListByHunterCompanyId(), formatUrl(para))
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }

            if (res.data.code == "00") {
              // console.log(res);
              this.listLoading = false;
              this.userData = res.data.data;
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
    //获取用户列表
    // getAppUserList() {
    //   this.listLoading = true;
    //   let para = {
    //     page: this.page,
    //     size: this.size,
    //     sort: this.sort
    //   };
    //   this.$http.post(api.system.getAppUserList(), formatUrl(para)).then(
    //     res => {
    //       if (res.data.code == "911") {
    //         location.href = "./login.html";
    //       }

    //       if (res.data.code == "00") {
    //         // console.log(res);
    //         this.listLoading = false;
    //         this.userData = res.data.data;
    //       }
    //       if (res.data.code == "500") {
    //         this.$message({
    //           type: "error",
    //           message: "暂无数据"
    //         });
    //       }
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // },
    handleSizeChange(val) {
      this.size = val;
      this.findAppUserListByHunterCompanyId();
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      this.findAppUserListByHunterCompanyId();
    },
    // 获取全部未删除的登陆用户分类
    // getAppUserGroupList() {
    //   this.$http.get(api.system.getAppUserGroupList()).then(res => {
    //     this.groupoptions = res.data.data;
    //   });
    // },

    // 不同角色获取不同的权限列表
    getGroupListByType() {
      this.$http.post(api.system.getGroupListByType()).then(
        res => {
          // console.log(res);
          if (res.data.code == "00") {
            // console.log(res);
            this.groupoptions = res.data.data;
          }
          if (res.data.code == "911") {
            location.href = "./login.html";
          }
          if (res.data.code == "500") {
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

      // this.$http.get(api.system.getGroupListByType()).then(res => {
      //   // console.log(res)
      //   this.groupoptions = res.data.data;
      // });
    },
    //清空添加条件
    opencreateAppUser(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.createFormVisible = true;
    },
    //添加非admin用户
    createAppUser(formName) {
      // console.log(this.createform);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.createform
          this.isUp = true;
          this.$http
            .post(api.user.createAppUser(), formatUrl(this.createform))
            .then(res => {
              // console.log(res)
              this.isUp = false;
              if (res.data.code == "500") {
                this.$message({
                  message: res.data.errMessage,
                  type: "error"
                });
              }
              if (res.data.code == "00") {
                this.$message({
                  type: "success",
                  message: this.$t("msg.msg3")
                });
                this.findAppUserListByHunterCompanyId();
                this.createFormVisible = false;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    selsChange(sels) {
      this.sels = sels;
      // console.log(sels);
    },
    dateFormat(row, column) {
      return mytools.datefilter(row.createDate);
    },
    //删除用户
    deleteAppUser() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm(
        this.$t("systemManagement.tip.contetn"),
        this.$t("systemManagement.tip.title"),
        {
          type: "warning"
        }
      )
        .then(() => {
          // this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          this.$http.post(api.user.deleteAppUser(), formatUrl(para)).then(
            res => {
              if (res.data.code == "00") {
                this.$message({
                  type: "success",
                  message: this.$t("msg.msg2")
                });
                this.findAppUserListByHunterCompanyId();
              }
              if (res.data.code == "500") {
                this.$message({
                  type: "error",
                  message: res.data.errMessage
                });
                this.findAppUserListByHunterCompanyId();
              }
            },
            error => {
              console.log(error);
            }
          );
        })
        .catch(() => {});
    },
    //获取用户信息
    getAppUser() {
      var id = this.sels.map(item => item.id).toString();
      this.editFormVisible = true;
      this.$http.post(api.system.getAppUser(), formatUrl({ id })).then(
        res => {
          // console.log(res);
          if (res.data.code == "00") {
            // console.log(res);
            var arr = [];
            res.data.data.categoryList.forEach(el => {
              arr.push(el.id);
            });
            this.categoryIds = arr;
            // res.data.data.categoryList = arr;
            // console.log(arr);
            // this.editform.categoryIds = arr;
            this.editform = res.data.data;
            // this.editform.categoryIds = arr;
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
    // 修改用户
    updateAppUser() {
      this.isSure = true;
      this.$http
        .post(
          api.user.updateAppUser(),
          formatUrl({
            id: this.editform.id,
            name: this.editform.name,
            groupId: this.editform.groupId,
            categoryIds: this.categoryIds
          })
        )
        .then(
          res => {
            this.isSure = false;
            if (res.data.code == "00") {
              this.$message({
                type: "success",
                message: this.$t("msg.msg1")
              });
              this.findAppUserListByHunterCompanyId();
              this.editFormVisible = false;
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
    //打开修改密码界面
    handleEdit(index, row, formName) {
      // console.log(row);
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.passwordFormVisible = true;
      this.passwordform.userName = row.userName;
    },
    // 修改密码
    updatePassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(api.user.updatePassword(), formatUrl(this.passwordform))
            .then(res => {
              if (res.data.code == "500") {
                this.$message({
                  message: res.data.errMessage,
                  type: "error"
                });
              }
              if (res.data.code == "00") {
                this.$message({
                  message: this.$t("msg.msg36"),
                  type: "success"
                });

                this.findAppUserListByHunterCompanyId();
                this.passwordFormVisible = false;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //打开添加次数页面
    openaddCount(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.addCountFormVisible = true;
      this.seeAllsearch = "";
      this.findUserEvalationHistory();
    },
    //打开添加天数页面
    openaddPeriod(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.addPeriodFormVisible = true;
      this.seeAlldaysearch = "";
      this.findUserEvalationDayHistory();
    },
    addPeriod(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              api.user.addPeriod(),
              formatUrl({
                hunterCompanyId: this.tenantAccountsels[0].hunterCompanyId,
                addAccount: this.addPeriodForm.addAccount
              })
            )
            .then(
              res => {
                if (res.data.code == "911") {
                  location.href = "./login.html";
                }
                if (res.data.code == "00") {
                  this.addPeriodFormVisible = false;
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg3")
                  });
                  this.findAdminUserList();
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
    //添加租户测评次数

    addEvaluation(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              api.user.addEvaluation(),
              formatUrl({
                hunterCompanyId: this.tenantAccountsels[0].hunterCompanyId,
                addAccount: this.addCountForm.addAccount
              })
            )
            .then(
              res => {
                if (res.data.code == "911") {
                  location.href = "./login.html";
                }
                if (res.data.code == "00") {
                  // console.log(res);
                  this.findUserEvalationHistory();
                  // this.evalationHistoryData = res.data.data;
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg3")
                  });
                  this.findAdminUserList();
                  this.addCountFormVisible = false;
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
    //显示添加测评的历史纪录
    findUserEvalationHistory() {
      this.$http
        .post(
          api.user.findUserEvalationHistory(),
          formatUrl({ page: 0, size: 5 })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.evalationHistoryData = res.data.data;
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
    //显示添加天数的历史纪录
    findUserEvalationDayHistory() {
      this.$http
        .post(
          api.user.findUserEvalationDayHistory(),
          formatUrl({ page: 0, size: 5 })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              console.log(res);
              this.evalationDayHistory = res.data.data;
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
    seeAlldaysearchbtn() {
      this.seeAlldaypage = 0;
      this.seeAllday();
    },
    seeAllday() {
      this.seeAlldayFormVisible = true;
      this.$http
        .post(
          api.user.findUserEvalationDayHistory(),
          formatUrl({
            page: this.seeAlldaypage,
            size: this.seeAlldaysize,
            search: this.seeAlldaysearch
          })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.seeAlldayFormData = res.data.data;
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

    seeAlldaySizeChange(val) {
      this.seeAlldaysize = val;
      this.seeAllday();
    },
    seeAlldayCurrentChange(val) {
      this.seeAlldaypage = val - 1;
      this.seeAllday();
    },
    seeAllsearchbtn() {
      this.seeAllpage = 0;
      this.seeAll();
    },
    //查看全部
    seeAll() {
      this.seeAllFormVisible = true;
      this.$http
        .post(
          api.user.findUserEvalationHistory(),
          formatUrl({
            page: this.seeAllpage,
            size: this.seeAllsize,
            search: this.seeAllsearch
          })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.seeAllFormData = res.data.data;
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
    seeAllSizeChange(val) {
      this.seeAllsize = val;
      this.seeAll();
    },
    seeAllCurrentChange(val) {
      this.seeAllpage = val - 1;
      this.seeAll();
    },

    //分页获取用户分类列表
    getAppUserCategoryList() {
      this.listLoading = true;
      this.$http
        .post(
          api.category.getAppUserCategoryList(),
          formatUrl({ page: this.categorypage, size: this.categorysize })
        )
        .then(
          res => {
            if (res.data.code == "911") {
              location.href = "./login.html";
            }
            if (res.data.code == "00") {
              // console.log(res);
              this.listLoading = false;
              this.categoryData = res.data.data;
              this.categoryoptions = res.data.data.content;
              if (this.categoryflag) {
                if (this.categoryoptions.length > 0) {
                  this.createform.categoryIds.push(
                    this.categoryoptions[this.categoryoptions.length - 1].id
                  );
                  this.categoryflag = false;
                }
              }
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
    //分类分页
    categorySizeChange(val) {
      this.categorysize = val;
      this.getAppUserCategoryList();
    },
    categoryCurrentChange(val) {
      this.categorypage = val - 1;
      this.getAppUserCategoryList();
    },
    //添加分类界面
    opencategory(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.addCategoryFormVisible = true;
    },
    createAppUserCategory(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              api.category.createAppUserCategory(),
              formatUrl({ name: this.addCategoryForm.name })
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  // console.log(res);
                  this.addCategoryFormVisible = false;
                  this.getAppUserCategoryList();
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg3")
                  });
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

    //选择要删除的分类
    categoryselsChange(sels) {
      this.categorysels = sels;
    },
    //删除分类
    deleteAppUserCategory() {
      var ids = this.categorysels.map(item => item.id).toString();
      this.$confirm(
        this.$t("systemManagement.tip.contetn"),
        this.$t("systemManagement.tip.title"),
        {
          type: "warning"
        }
      )
        .then(() => {
          let para = { ids: ids };
          this.$http
            .post(api.category.deleteAppUserCategory(), formatUrl(para))
            .then(
              res => {
                if (res.data.code == "00") {
                  // console.log(res);
                  this.getAppUserCategoryList();
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg3")
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
    teamLeaderListchange(row, column) {
      // console.log(row.name)
      let teamLeaderArr = [];
      row.teamLeaderList.forEach(el => {
        teamLeaderArr.push(el.name);
      });
      return teamLeaderArr.join("/");
    },
    teamMemberListchange(row, column) {
      let teamMemberArr = [];
      row.teamMemberList.forEach(el => {
        teamMemberArr.push(el.name);
      });
      return teamMemberArr.join("/");
    },
    categoryListchange(row, column) {
      // console.log(row);
      var arr = [];
      row.categoryList.forEach(el => {
        arr.push(el.name);
      });
      return arr.join("/");
    },
    findAdminUserListsearch() {
      this.pageIndex = 0;
      this.findAdminUserList();
    },
    //主账户查询所有租户Admin账户
    findAdminUserList() {
      this.listLoading = true;
      this.$http
        .post(
          api.user.findAdminUserList(),
          formatUrl({
            pageIndex: this.pageIndex,
            pageCount: this.pageCount,
            sort: this.pagesort,
            search: this.pagesearch
          })
        )
        .then(
          res => {
            if (res.data.code == "00") {
              // console.log(res);
              this.tenantAccountData = res.data.data;
              this.listLoading = false;
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

    tenantAccountCurrentChange(val) {
      this.pageIndex = val - 1;
      this.findAdminUserList();
    },
    tenantAccountSizeChange(val) {
      this.pageCount = val;
      this.findAdminUserList();
    },
    sortChange({ column, prop, order }) {
      this.pagesort = "auar.company";
      this.findAdminUserList();
    },
    //登录
    loginByMail(v) {
      // console.log(v);
      this.$http
        .post(
          api.user.loginByMail(),
          formatUrl({
            mail: v.row.mail
          })
        )
        .then(
          res => {
            if (res.data.code == "00") {
              localStorage.setItem("sellerName", res.data.data.name);
              // console.log(res);
              location.href = "./news.html";
              this.$message({
                type: "success",
                message: this.$t("msg.msg37")
              });
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
    openupdatePass(v, formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.updatePasswordform.id = v.row.id;
      // console.log(v);
      this.updatePasswordVisible = true;
    },
    //主账户直接修改租户密码
    updatePasswordById(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              api.user.updatePasswordById(),
              formatUrl({
                id: this.updatePasswordform.id,
                password: this.updatePasswordform.password
              })
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  // console.log(res);
                  this.$message({
                    message: this.$t("msg.msg36"),
                    type: "success"
                  });
                  this.updatePasswordVisible = false;
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
    //
    tenantAccountselsChange(sels) {
      this.tenantAccountsels = sels;
      // console.log(sels);
    },
    openEditTenantAccount() {
      this.editTenantAccountVisible = true;
      this.$http
        .post(
          api.user.getAppUser(),
          formatUrl({
            id: this.tenantAccountsels[0].id
          })
        )
        .then(
          res => {
            if (res.data.code == "00") {
              // console.log(res);
              this.editTenantAccountform = res.data.data.appRegister;
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
    // 主账户修改租户Admin账户信息
    updateHunterAdmin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              api.user.updateHunterAdmin(),
              formatUrl({
                id: this.tenantAccountsels[0].id,
                name: this.editTenantAccountform.name,
                phone: this.editTenantAccountform.phone
              })
            )
            .then(
              res => {
                if (res.data.code == "00") {
                  // console.log(res);
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg2")
                  });
                  this.findAdminUserList();
                  this.editTenantAccountVisible = false;
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
    // 主账户删除租户Admin账户信息
    deleteTenantAccount() {
      var ids = this.tenantAccountsels.map(item => item.id).toString();
      this.$confirm(
        this.$t("systemManagement.tip.contetn"),
        this.$t("systemManagement.tip.title"),
        {
          type: "warning"
        }
      )
        .then(() => {
          let para = { ids: ids };
          this.$http.post(api.user.deleteAppUser(), formatUrl(para)).then(
            res => {
              if (res.data.code == "00") {
                this.$message({
                  type: "success",
                  message: this.$t("msg.msg2")
                });
                this.findAdminUserList();
              }
              if (res.data.code == "500") {
                this.$message({
                  type: "error",
                  message: res.data.errMessage
                });
                this.findAdminUserList();
              }
            },
            error => {
              console.log(error);
            }
          );
        })
        .catch(() => {});
    },
    openregisterAccount(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.dialogFormVisible = true;
    },
    registerAccount(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(api.register.saveAppRegister(), this.registerform)
            .then(
              res => {
                if (res.data.code == "911") {
                  location.href = "./login.html";
                }
                if (res.data.code == "00") {
                  // console.log(res);
                  this.dialogFormVisible = false;
                  this.$message({
                    type: "success",
                    message: this.$t("msg.msg37")
                  });
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
          // alert("cc");
          console.log(this.registerform);
        } else {
          return false;
        }
      });
    },
    exportAdminUserList() {
      this.isExport = true;
      this.$http
        .get(api.system.exportAdminUserList(), {
          headers: {
            "Content-Type": "application/x-msdownload;charset =utf-8"
          }
        })
        .then(
          res => {
            this.isExport = false;
            if (res.data.code == "500") {
              this.$message({
                type: "error",
                message: res.data.errMessage
              });
            } else if (res.data.code == "911") {
              location.href = "./login.html";
            } else {
              window.open(api.system.exportAdminUserList(), Date.now());
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
<style>
.el-table th > .cell {
  text-align: center;
}

.el-select {
  width: 100%;
}

.ql-toolbar.ql-snow {
  background-color: #fff;
  line-height: normal;
  text-align: left;
}

.ql-editor {
  min-height: 100px;
}

.el-form-item.is-required .el-form-item__label:before {
  display: none;
}

.seeAll {
  overflow: hidden;
  margin: 10px 0;
}

.seeAll .el-input {
  width: 85%;
  float: left;
}

.seeAll .el-button {
  width: 15%;
  float: left;
}
.el-main {
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
.el-tabs--border-card > .el-tabs__content {
  padding: 15px 0;
}
.el-form-item__label {
  text-align: left;
}
.el-table {
  border: 1px solid #fff;
}
.listbuttons {
  overflow: hidden;
  padding: 5px 20px 20px 0;
}
.listbuttons button.user {
  float: right;
  margin-left: 20px;
}
.testclass {
  transform: translateX(80px);
}
</style>

  