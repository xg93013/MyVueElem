import * as types from './mutations-type.js'
import { localSave, localClear } from '@/assets/js/store.js'
import '@/assets/js/jsFloatComputer'

function findIndex (list, good) {
  return list.findIndex((item) => {
    return item.id === good.id
  })
}
/**
 * 保存商家搜索历史
 * @param commit
 * @param key
 * @param query
 */
export const saveHistory = function ({commit}, {key, query}) {
  commit(types.SET_SEARCHHISTORY, localSave(key, query))
}

export const clearHistory = function ({commit}, key) {
  commit(types.SET_SEARCHHISTORY, localClear(key))
}
/**
 * 保存登录信息
 * @param commit
 * @param key
 * @param query
 */
export const saveUser = function ({commit}, {key, query}) {
  let localUser = localSave(key, query)
  commit(types.RECORD_USER, localUser[0])
}

/**
 * 加入购物车
 * @param commit
 * @param state
 * @param key
 * @param query
 */
export const addCart = function ({commit, state}, {key, goods, others}) {
  let localArr = [] // 本地存储数组
  let currentCart = state.cartList
  let currentList = state.cartList.goodsList.slice(0) // 返回一个新的数组
  // 查询待商品是否已在列表中
  let cIndex = findIndex(currentList, goods)
  // 若存在商品
  if (cIndex > -1) {
    currentList.splice(cIndex, 1)
  }
  // 单条商品总价
  goods.totalPrice = Math.multiply(goods.count, goods.typePrice)
  // 添加商品
  currentList.splice(cIndex, 0, goods)
  currentCart.goodsList = currentList
  currentCart.others = others
  // 本地存储
  localArr.push(currentCart)
  // localSave(key, localArr)
  commit(types.SET_CARTLIST, currentCart)
}

/**
 * 减少单个商品数量
 * @param commit
 * @param state
 * @param key 本地存储
 * @param goods 商品列表
 * @param otehers 其他信息（配送费，打包费）
 */
export const minusCart = function ({commit, state}, {key, goods, others}) {
  let localArr = [] // 本地存储数组
  let currentCart = state.cartList // 返回一个新的数组
  let currentList = state.cartList.goodsList.slice(0)
  // 查询待商品是否已在列表中
  let cIndex = findIndex(currentList, goods)
  // 若存在商品数量为1时
  if (cIndex > -1 && goods.count === 0) {
    currentList.splice(cIndex, 1)
    currentCart.cartTotalMoney = 0
  } else {
    // 单条商品总价
    goods.totalPrice = Math.multiply(goods.count, goods.typePrice)
    currentList.splice(cIndex, 1, goods)
  }
  currentCart.goodsList = currentList
  currentCart.others = others
  localArr.push(currentCart)
  // localSave(key, localArr)
  commit(types.SET_CARTLIST, currentCart)
}

/**
 * 清空购物车
 * @param commit
 * @param key
 */
export const clearCart = function ({commit}, key) {
  // localClear(key)
  let cartList = {
    goodsList: [], // 商品列表
    others: {} // 其他信息
  }
  commit(types.SET_CARTLIST, cartList)
}
