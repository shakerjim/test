// API_PATH_DEV: '"//dev"',
let wxbaseurl;
let wxe;
if (location.hostname == 'localhost') {
  wxbaseurl = 'https://testhrm.centalent.cn/wechat/wechatapi/common-service';
  wxe = "wxf00b739bc84b012f"
} else if (location.hostname == 'testhrm.centalent.cn') {
  wxbaseurl = 'https://testhrm.centalent.cn/wechat/wechatapi/common-service';
  wxe = "wxf00b739bc84b012f"
} else if (location.hostname == 'wxhrm.centalent.cn') {
  wxbaseurl = 'https://wxhrm.centalent.cn/wechat/wechatapi/common-service';
  wxe = "wxe82f67ec058dcb65"
} else {
  wxbaseurl = 'https://wxhrm.centalent.cn/wechat/wechatapi/common-service';
  wxe = "wxe82f67ec058dcb65"
}
var api = {};
//系统管理
api.system = {
  // /icsserver/appUser/addPeriod

  exportAdminUserList: function () {
    return BASE_URL + "/icsserver/appUser/exportAdminUserList"
  },
  // POST / icsserver / appUser / exportAdminUserList
  updateAppUser: function () {
    return BASE_URL + "/icsserver/appUser/updateAppUser"
  },
  getAppUser: function () {
    return BASE_URL + "/icsserver/appUser/getAppUser"
  },
  deleteAppUser: function () {
    return BASE_URL + "/icsserver/appUser/deleteAppUser"
  },
  getAppUserList: function () {
    return BASE_URL + "/icsserver/appUser/getAppUserList"
  },
  updatePassword: function () {
    return BASE_URL + "/icsserver/appUser/updatePassword"
  },
  createAppUser: function () {
    return BASE_URL + "/icsserver/appUser/createAppUser"
  },
  getAppUserGroupList: function () {
    return BASE_URL + "/icsserver/appUserGroup/getAppUserGroupList"
  },
  getGroupList: function () {
    return BASE_URL + "/icsserver/appUserGroup/getGroupList"
  },
  createGroup: function () {
    return BASE_URL + "/icsserver/appUserGroup/createGroup"
  },
  deleteAppUserGroup: function () {
    return BASE_URL + "/icsserver/appUserGroup/deleteAppUserGroup"
  },
  getAppUserGroup: function () {
    return BASE_URL + "/icsserver/appUserGroup/getAppUserGroup"
  },
  updateGroup: function () {
    return BASE_URL + "/icsserver/appUserGroup/updateGroup"
  },
  getMailTempList: function () {
    return BASE_URL + "/icsserver/appMailTemp/getMailTempList"
  },
  createMailTemp: function () {
    return BASE_URL + "/icsserver/appMailTemp/createMailTemp"
  },
  deleteById: function () {
    return BASE_URL + "/icsserver/appMailTemp/deleteById"
  },
  getMailTempById: function () {
    return BASE_URL + "/icsserver/appMailTemp/getMailTempById"
  },
  updateMailTemp: function () {
    return BASE_URL + "/icsserver/appMailTemp/updateMailTemp"
  },
  // 不同角色获取不同的权限列表
  getGroupListByType: function () {
    return BASE_URL + "/icsserver/appUserGroup/getGroupListByType"
  },
  // POST /icsserver/appUserGroup/getGroupListByType

}

//登陆
api.login = {
  login: function () {
    return BASE_URL + "/icsserver/appUser/login"
  }
}
//退出
api.logout = {
  logout: function () {
    return BASE_URL + "/icsserver/appUser/logout"
  }
}
//个人测评
api.ics = {
  getPersonalList: function () {
    return BASE_URL + "/icsserver/personal/getPersonalList"
  },
  deleteById: function () {
    return BASE_URL + "/icsserver/personal/deleteById"
  },
  searchPersonal: function () {
    return BASE_URL + "/icsserver/personal/searchPersonal"
  },
  getPersonalById: function () {
    return BASE_URL + "/icsserver/personal/getPersonalById"
  },
  updatePersonalInfo: function () {
    return BASE_URL + "/icsserver/personal/updatePersonalInfo"
  },
  sendPersonalEvaluation: function () {
    return BASE_URL + "/icsserver/user/sendPersonalEvaluation"
  },
  personalReport: function () {
    return BASE_URL + "/icsserver/analysis/personalReport"
  },
  exportEvaluationReport: function () {
    return BASE_URL + "/icsserver/personal/exportEvaluationReport"
  },
  resendEvaluation: function () {
    return BASE_URL + "/icsserver/personal/resendEvaluation"
  },
  //根据权限获取个人测评列表
  findPersonalListByGroup: function () {
    return BASE_URL + "/icsserver/personal/findPersonalListByGroup"
  },
}
//职位测评
api.prp = {
  getJobList: function () {
    return BASE_URL + "/icsserver/job/getJobList"
  },
  deleteById: function () {
    return BASE_URL + "/icsserver/job/deleteById"
  },
  searchJob: function () {
    return BASE_URL + "/icsserver/job/searchJob"
  },
  getJobById: function () {
    return BASE_URL + "/icsserver/job/getJobById"
  },
  updateJobInfo: function () {
    return BASE_URL + "/icsserver/job/updateJobInfo"
  },
  sendJobEvaluation: function () {
    return BASE_URL + "/icsserver/user/sendJobEvaluation"
  },
  jobReport: function () {
    return BASE_URL + "/icsserver/analysis/jobReport"
  },
  exportEvaluationReport: function () {
    return BASE_URL + "/icsserver/job/exportEvaluationReport"
  },
  // 重新发送职位测评
  resendEvaluation: function () {
    return BASE_URL + "/icsserver/job/resendEvaluation"
  },
  // 根据权限获取职位测评列表
  findJobListByGroup: function () {
    return BASE_URL + "/icsserver/job/findJobListByGroup"
  },
}
//评测分析
api.analyse = {

  getEvaluationAnalysis: function () {
    return BASE_URL + "/icsserver/analysis/getEvaluationAnalysis"
  },
  createEvaluationAnalysis: function () {
    return BASE_URL + "/icsserver/analysis/createEvaluationAnalysis"
  },
  deleteById: function () {
    return BASE_URL + "/icsserver/analysis/deleteById"
  },
  getEvaluationAnalysisById: function () {
    return BASE_URL + "/icsserver/analysis/getEvaluationAnalysisById"
  },
  updateEvaluationAnalysis: function () {
    return BASE_URL + "/icsserver/analysis/updateEvaluationAnalysis"
  },

}
//简历筛选工具
api.tool = {
  getHEResult: function () {
    return BASE_URL + "/icsserver/tool/getHEResult"
  },
  getInterimUserList: function () {
    return BASE_URL + "/icsserver/tool/getInterimUserList"
  },
  getHEResultList: function () {
    return BASE_URL + "/icsserver/tool/getHEResultList"
  },
  findByHE: function () {
    return BASE_URL + "/icsserver/tool/findByHE"
  },
  deleteAll: function () {
    return BASE_URL + "/icsserver/tool/deleteAll"
  },
  searchJobEvaluationList: function () {
    return BASE_URL + "/icsserver/tool/searchJobEvaluationList"
  },
  searchPersonalEvaluationList: function () {
    return BASE_URL + "/icsserver/tool/searchPersonalEvaluationList"
  },
  getPersonalEvaluationList: function () {
    return BASE_URL + "/icsserver/tool/getPersonalEvaluationList"
  },
  getJobEvaluationList: function () {
    return BASE_URL + "/icsserver/tool/getJobEvaluationList"
  },
  exportMatchReport: function () {
    return BASE_URL + "/icsserver/tool/exportMatchReport"
  },
  getEvaluationSchedule: function () {
    return BASE_URL + "/icsserver/tool/exportMatchReport"
  },

}
//人才库
api.talent = {
  findCityByStatus: function () {
    return BASE_URL + "/icsserver/appData/findCityByStatus"
  },
  findProvince: function () {
    return BASE_URL + "/icsserver/appData/findProvince"
  },
  findCityByProvinceId: function () {
    return BASE_URL + "/icsserver/appData/findCityByProvinceId"
  },
  findAreaByCityId: function () {
    return BASE_URL + "/icsserver/appData/findAreaByCityId"
  },
  findTalentStatus: function () {
    return BASE_URL + "/icsserver/appData/findTalentStatus"
  },
  findTrade: function () {
    return BASE_URL + "/icsserver/appData/findTrade"
  },
  findJob: function () {
    return BASE_URL + "/icsserver/appData/findJob"
  },
  findTalentPools: function () {
    return BASE_URL + "/icsserver/TalentPool/findTalentPools"
  },
  deleteByIds: function () {
    return BASE_URL + "/icsserver/TalentPool/deleteByIds"
  },
  saveTalentPool: function () {
    return BASE_URL + "/icsserver/TalentPool/saveTalentPool"
  },
  saveWorkExperience: function () {
    return BASE_URL + "/icsserver/TalentPool/saveWorkExperience"
  },
  saveProjectExperience: function () {
    return BASE_URL + "/icsserver/TalentPool/saveProjectExperience"
  },
  saveTalentSkill: function () {
    return BASE_URL + "/icsserver/TalentPool/saveTalentSkill"
  },
  uploadPublic: function () {
    return BASE_URL + "/icsserver/TalentAttachment/uploadPublic"
  },
  findByTalentId: function () {
    return BASE_URL + "/icsserver/TalentAttachment/findByTalentId"
  },
  findPoolById: function () {
    return BASE_URL + "/icsserver/TalentPool/findPoolById"
  },
  updateTalent: function () {
    return BASE_URL + "/icsserver/TalentPool/updateTalent"
  },
  exportPoolById: function () {
    return BASE_URL + "/icsserver/TalentPool/exportPoolById"
  },
  getHEResultList: function () {
    return BASE_URL + "/icsserver/TalentPool/getHEResultList"
  },
  sentPersonalEvaluation: function () {
    return BASE_URL + "/icsserver/TalentPool/sentPersonalEvaluation"
  },
  getPersonalById: function () {
    return BASE_URL + "/icsserver/TalentPool/getPersonalById"
  },
  //查询引擎ES根据多个查询条件获取人才库
  search4ES: function () {
    return BASE_URL + "/icsserver/TalentPool/search4ES"
  },
}
api.TalentHistoryStatus = {
  saveHistoryStatus: function () {
    return BASE_URL + "/icsserver/TalentHistoryStatus/saveHistoryStatus"
  },
  findByTalentId: function () {
    return BASE_URL + "/icsserver/TalentHistoryStatus/findByTalentId"
  },
  deleteHistoryStatus: function () {
    return BASE_URL + "/icsserver/TalentHistoryStatus/deleteHistoryStatus"
  },
}
api.TalentAttachment = {
  deleteByIds: function () {
    return BASE_URL + "/icsserver/TalentAttachment/deleteByIds"
  },
  findByTalentId: function () {
    return BASE_URL + "/icsserver/TalentAttachment/findByTalentId"
  },

}
//企业
api.business = {
  findAllAndSeach: function () {
    return BASE_URL + "/icsserver/Company/findAllAndSeach"
  },
  saveCompanyInfo: function () {
    return BASE_URL + "/icsserver/Company/saveCompanyInfo"
  },
  deleteCompanyInfo: function () {
    return BASE_URL + "/icsserver/Company/deleteCompanyInfo"
  },
  findCompanyInfo: function () {
    return BASE_URL + "/icsserver/Company/findCompanyInfo"
  },
  findCompanyContact: function () {
    return BASE_URL + "/icsserver/Company/findCompanyContact"
  },
  saveCompanyContact: function () {
    return BASE_URL + "/icsserver/Company/saveCompanyContact"
  },
  findCompanyPosition: function () {
    return BASE_URL + "/icsserver/Company/findCompanyPosition"
  },
  findContactById: function () {
    return BASE_URL + "/icsserver/Company/findContactById"
  },
  findCompanyAttachment: function () {
    return BASE_URL + "/icsserver/Company/findCompanyAttachment"
  },
  uploadCompanyAttachment: function () {
    return BASE_URL + "/icsserver/Company/uploadCompanyAttachment"
  },
  deleteCompanyAttachment: function () {
    return BASE_URL + "/icsserver/Company/deleteCompanyAttachment"
  },
  findCompanyStatus: function () {
    return BASE_URL + "/icsserver/Company/findCompanyStatus"
  },
  saveCompanyStatus: function () {
    return BASE_URL + "/icsserver/Company/saveCompanyStatus"
  },
  // 根据权限不同分页显示公司信息
  findCompanyInfoByPrivilege: function () {
    return BASE_URL + "/icsserver/Company/findCompanyInfoByPrivilege"
  },

}
api.position = {
  savePosition: function () {
    return BASE_URL + "/icsserver/position/savePosition"
  },
  findByStatus: function () {
    return BASE_URL + "/icsserver/position/findByStatus"
  },
  searchPosition: function () {
    return BASE_URL + "/icsserver/position/searchPosition"
  },
  findById: function () {
    return BASE_URL + "/icsserver/position/findById"
  },
  updatePosition: function () {
    return BASE_URL + "/icsserver/position/updatePosition"
  },
  sendJobEvaluation: function () {
    return BASE_URL + "/icsserver/position/sendJobEvaluation"
  },
  setJobEvaluationDefault: function () {
    return BASE_URL + "/icsserver/position/setJobEvaluationDefault"
  },
  updateStatus: function () {
    return BASE_URL + "/icsserver/position/updateStatus"
  },
  addFromData: function () {
    return BASE_URL + "/icsserver/position/addFromData"
  },
  addFromInput: function () {
    return BASE_URL + "/icsserver/position/addFromInput"
  },
  deleteCandidates: function () {
    return BASE_URL + "/icsserver/position/deleteCandidates"
  },
  searchFromData: function () {
    return BASE_URL + "/icsserver/position/searchFromData"
  },
  addScreeningNeeds: function () {
    return BASE_URL + "/icsserver/position/addScreeningNeeds"
  },
  deleteScreeningNeeds: function () {
    return BASE_URL + "/icsserver/position/deleteScreeningNeeds"
  },
  bindingJobEvaluation: function () {
    return BASE_URL + "/icsserver/position/bindingJobEvaluation"
  },
  // 根据权限不同分页显示职位信息
  findCompanyPositionByPrivilege: function () {
    return BASE_URL + "/icsserver/position/findCompanyPositionByPrivilege"
  },
  // 把在职位需求测评结果的职位测评移除：
  deleteByJobIdAndPositionId: function () {
    return BASE_URL + "/icsserver/position/deleteByJobIdAndPositionId"
  },
  // /icsserver/position/deleteByJobIdAndPositionId
}
api.news = {
  findPositionNews: function () {
    return BASE_URL + "/icsserver/news/findPositionNews"
  },
  findEvaluationNews: function () {
    return BASE_URL + "/icsserver/news/findEvaluationNews"
  },
  findNeedPositionNews: function () {
    return BASE_URL + "/icsserver/news/findNeedPositionNews"
  },
  //根据权限不同显示显示测评动态
  findEvaluationNewsByPrivilege: function () {
    return BASE_URL + "/icsserver/news/findEvaluationNewsByPrivilege"
  },
  // 根据权限不同分页显示职位信息
  findCompanyPositionByPrivilege: function () {
    return BASE_URL + "/icsserver/position/findCompanyPositionByPrivilege"
  },
}
api.newlogin = {
  loginByMailAndPassword: function () {
    return BASE_URL + "/icsserver/appUser/loginByMailAndPassword"
  },
}
//注册
api.register = {
  // saveAppRegister: function () {
  //   return BASE_URL + "/icsserver/AppRegister/saveAppRegister"
  // },
  saveAppRegisterNew: function () {
    return BASE_URL + "/icsserver/AppRegister/saveAppRegisterNew"
  },
  checkRegister: function () {
    return BASE_URL + "/icsserver/AppRegister/checkRegister"
  },
  getEvaluationRemain: function () {
    return BASE_URL + "/icsserver/AppRegister/getEvaluationRemain"
  },
  saveManager: function () {
    return BASE_URL + "/icsserver/AppRegister/saveManager"
  },
  saveHunterHistoryStatus: function () {
    return BASE_URL + "/icsserver/AppRegister/saveHunterHistoryStatus"
  },
  sendMessage: function () {
    return BASE_URL + "/icsserver/AppRegister/sendMessage"
  },
  RegisterAndLogin: function () {
    return BASE_URL + "/icsserver/AppRegister/RegisterAndLogin"
  },
  // /icsserver/AppRegister/sendMessage
  // POST /icsserver/AppRegister/saveHunterHistoryStatus
  // POST /icsserver/AppRegister/saveManager
  // POST /icsserver/AppRegister/getEvaluationRema
}
api.user = {
  newPassword: function () {
    return BASE_URL + "/icsserver/appUser/newPassword"
  },
  checkPassword: function () {
    return BASE_URL + "/icsserver/appUser/checkPassword"
  },
  addPeriod: function () {
    return BASE_URL + "/icsserver/appUser/addPeriod"
  },
  addEvaluation: function () {
    return BASE_URL + "/icsserver/appUser/addEvaluation"
  },
  findUserEvalationHistory: function () {
    return BASE_URL + "/icsserver/appUser/findUserEvalationHistory"
  },
  //主账户查询所有租户Admin账户
  findAdminUserList: function () {
    return BASE_URL + "/icsserver/appUser/findAdminUserList"
  },
  //根据邮箱登录
  loginByMail: function () {
    return BASE_URL + "/icsserver/appUser/loginByMail"
  },
  //主账户直接修改租户密码
  updatePasswordById: function () {
    return BASE_URL + "/icsserver/appUser/updatePasswordById"
  },
  // 根据Id获取注册用户信息
  getAppUser: function () {
    return BASE_URL + "/icsserver/appUser/getAppUser"
  },
  //删除注册用户信息
  deleteAppUser: function () {
    return BASE_URL + "/icsserver/appUser/deleteAppUser"
  },
  // 主账户修改租户Admin账户信息
  updateHunterAdmin: function () {
    return BASE_URL + "/icsserver/appUser/updateHunterAdmin"
  },
  //创建非Admin账户
  createAppUser: function () {
    return BASE_URL + "/icsserver/appUser/createAppUser"
  },
  // 根据所属企业ID分页查询未删除的用户列表（即主账户列表和租户账户的账户列表）
  findAppUserListByHunterCompanyId: function () {
    return BASE_URL + "/icsserver/appUser/findAppUserListByHunterCompanyId"
  },
  //修改账户信息（非Admin账户）
  updateAppUser: function () {
    return BASE_URL + "/icsserver/appUser/updateAppUser"
  },
  //显示负责销售的用户
  selectSeller: function () {
    return BASE_URL + "/icsserver/appUser/selectSeller"
  },
  //修改登陆密码
  updatePassword: function () {
    return BASE_URL + "/icsserver/appUser/updatePassword"
  },
  //显示登录这权限
  // POST / icsserver / appUser / findPrivilege
  findPrivilege: function () {
    return BASE_URL + "/icsserver/appUser/findPrivilege"
  },
  findUserEvalationDayHistory: function () {
    return BASE_URL + "/icsserver/appUser/findUserEvalationDayHistory"
  },
}
//分类
api.category = {
  getAppUserCategoryList: function () {
    return BASE_URL + "/icsserver/appUserCategory/getAppUserCategoryList"
  },
  createAppUserCategory: function () {
    return BASE_URL + "/icsserver/appUserCategory/createAppUserCategory"
  },
  deleteAppUserCategory: function () {
    return BASE_URL + "/icsserver/appUserCategory/deleteAppUserCategory"
  },
}
//邮件
api.mail = {
  //根据权限不同显示不同模板
  findAppMailTemp: function () {
    return BASE_URL + "/icsserver/appMailTemp/findAppMailTemp"
  },
  saveMailSign: function () {
    return BASE_URL + "/icsserver/appMailTemp/saveMailSign"
  },
}
api.sale = {
  // 显示租户公司负责人列表
  findManager: function () {
    return BASE_URL + "/icsserver/appUser/findManager"
  },
  findHunterStatus: function () {
    return BASE_URL + "/icsserver/appData/findHunterStatus"
  },
  manageAdminUserList: function () {
    return BASE_URL + "/icsserver/appUser/manageAdminUserList"
  },
  exportManageAdminUserList: function () {
    return BASE_URL + "/icsserver/appUser/exportManageAdminUserList"
  },
  //客户形式
  saveForm: function () {
    return BASE_URL + "/icsserver/AppRegister/saveForm"
  },
  deleteStatusById: function () {
    return BASE_URL + "/icsserver/AppRegister/deleteStatusById"
  },
  findStatusByHunter: function () {
    return BASE_URL + "/icsserver/AppRegister/findStatusByHunter"
  },
  // icsserver/AppRegister/findStatusByHunter
  // /icsserver/AppRegister/deleteStatusById
}
api.CompanyEmployee = {
  saveCompanyEmployee: function () {
    return BASE_URL + "/icsserver/CompanyEmployee/saveCompanyEmployee"
  },
  findAllAndSeach: function () {
    return BASE_URL + "/icsserver/CompanyEmployee/findAllAndSeach"
  },
  deleteCompanyEmployee: function () {
    return BASE_URL + "/icsserver/CompanyEmployee/deleteCompanyEmployee"
  },
  findCompanyEmployee: function () {
    return BASE_URL + "/icsserver/CompanyEmployee/findCompanyEmployee"
  },
  sendJobEvaluation: function () {
    return BASE_URL + "/icsserver/CompanyEmployee/sendJobEvaluation"
  },
  bindingJobEvaluation: function () {
    return BASE_URL + "/icsserver/CompanyEmployee/bindingJobEvaluation"
  },
  deleteByJobIdAndEmployeeIdId: function () {
    return BASE_URL + "/icsserver/CompanyEmployee/deleteByJobIdAndEmployeeIdId"
  },
  setJobEvaluationDefault: function () {
    return BASE_URL + "/icsserver/CompanyEmployee/setJobEvaluationDefault"
  },
  sendPersonalEvaluation: function () {
    return BASE_URL + "/icsserver/CompanyEmployee/sendPersonalEvaluation"
  },
  deleteByPersonalIdAndEmployeeIdId: function () {
    return BASE_URL + "/icsserver/CompanyEmployee/deleteByPersonalIdAndEmployeeIdId"
  },
  bindingPersonalEvaluation: function () {
    return BASE_URL + "/icsserver/CompanyEmployee/bindingPersonalEvaluation"
  },
  getPersonalEvaluationList: function () {
    return BASE_URL + "/icsserver/CompanyEmployee/getPersonalEvaluationList"
  },
}
// 微信企业接口
api.wxCompanyInfo = {

  // 企业审核接口-获取企业列表
  getCompanyList: function () {
    return wxbaseurl + '/icsserver/wxCompanyInfo/getCompanyList'
  },
  // 企业审核接口-获取企业详细信息
  getCompanyDetail: function () {
    return wxbaseurl + '/icsserver/wxCompanyInfo/getCompanyDetail'
  },
  // /icsserver/wxCompanyInfo / updateCompanyApproveStatus
  // 企业审核接口-修改企业审核状态
  updateCompanyApproveStatus: function () {
    return wxbaseurl + '/icsserver/wxCompanyInfo/updateCompanyApproveStatus'
  }
}
// 公众号获取完整报告点击事件
api.wxmini = {
  // 公众号获取完整报告点击事件
  getEvaluationAnalysisOrderByDate: function () {
    return wxbaseurl + '/icsserver/analysis/getEvaluationAnalysisOrderByDate'
  },
  // 下载个人测评报告
  exportEvaluationReport: function () {
    return wxbaseurl + '/icsserver/analysis/exportEvaluationReport'
  }
}
//二维码创建
api.code = {

  // 获取场景二维码
  createCode: function () {
    return `${BASE_URL}/wechat/wechatapi/wx-mp/mp/${wxe}/qrcode?tag=`
  },
  // /mp/qrcode/search
  // 搜索场景二维码
  searchCode: function () {
    return `${BASE_URL}/wechat/wechatapi/wx-mp/mp/qrcode/search`
  }
}
export default api
