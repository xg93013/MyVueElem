import fetch from '@/api/fetch.js'

/**
 * 获取所有城市
 * @returns {Promise.<TResult>}
 */
export const groupcity = () => fetch('/v1/cities', {
  type: 'group'
})

/**
 * 获取热门城市
 * @returns {Promise.<TResult>}
 */

export const hotcity = () => fetch('/v1/cities', {
  type: 'hot'
})

/**
 * 账号登录
 * @param username
 * @param password
 * @param captcha_code
 */
export const accountLogin = (username, password) => fetch('/v1/login', {
  username: username,
  password: password
}, 'POST')

/**
 * 手机号登录
 * @param code
 * @param mobile
 * @param validate_token
 */
export const phoneLogin = (code, mobile) => fetch('/v1/login/app_mobile', {
  code: code,
  mobile: mobile
}, 'POST')

/**
 * 检查用户是否存在
 * @param checkNumber
 * @param type
 */
export const checkExsis = (phoneNumber, type) => fetch('/v1/users/exists', {
  phoneNumber: phoneNumber,
  type: type
})

/**
 * 获取当前位置
 */
export const cityNow = () => fetch('/v1/cities', {
  type: 'guess'
})

/**
 * 获取食品分类
 */
export const getFoodType = () => fetch('/v1/foodType')

/**
 * 获取商家分类
 */
export const sortList = () => fetch('/v1/sortList')

/**
 * 按id查询商家
 * @param shopId
 */
export const searchShopById = (shopId) => fetch('/v1/searchShopById', {
  shopId: shopId
})

/**
 * 获取所有商家
 */
export const shopList = () => fetch('/v1/shopList')

/**
 * 查询商家所有商品
 * @param shopId
 */
export const shopGoods = (shopId) => fetch('/v1/shopGoods', {
  shopId: shopId
})

/**
 * 查询商家所有商品类型
 * @param shopId
 */
export const shopGoodsType = (shopId) => fetch('/v1/shopGoodsType', {
  shopId: shopId
})

/**
 * 查询商家
 * @param query
 */
export const searchShop = (query) => fetch('/v1/searchShop', {
  shopName: query
})

/**
 * 热门搜索
 */
export const hotSearch = () => fetch('/v1/hotSearch')

/**
 * 推荐食物
 */
export const foodList = () => fetch('/v1/foodList')

/**
 * 获取所有订单
 */
export const orderList = () => fetch('/v1/orderList')
