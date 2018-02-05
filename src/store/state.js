import { getStorage } from '@/assets/js/store.js'
const state = {
  // 登录信息
  userInfo: '',
  // 搜索历史
  searchHistory: getStorage(),
  // 商家详情显示商家信息
  showStore: true,
  // 购物车列表
  cartList: {
    goodsList: [], // 商品列表
    others: {} // 其他信息
  }
}

export default state
