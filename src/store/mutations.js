// 根级别的 mutation
import * as types from './mutations-type.js'

const mutations = {
  // 用户登录
  [types.RECORD_USER] (state, user) {
    state.userInfo = user
    // localSave('user_id', user.user_id)
  },
  // 搜索历史
  [types.SET_SEARCHHISTORY] (state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [types.SET_SHOWSTORE] (state, flag) {
    state.showStore = flag
  },
  // 加入购物车
  [types.SET_CARTLIST] (state, cartlist) {
    state.cartList = cartlist
  }
}

export default mutations
