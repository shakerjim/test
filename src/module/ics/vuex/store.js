import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    Privilege: [],
    sels: [],
    selectedRows: {}
  },
  mutations: {
    rowchange(state, {currentPage, ids}) {
      state.selectedRows = {
        ...state.selectedRows,
        [currentPage]: ids
      }
    }
  }
})
export default store
