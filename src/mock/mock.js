import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { mockData } from './data/data'

export default {
  /**
   * mock bootstrap
   */
  bootstrap () {
    let mock = new MockAdapter(axios)

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    })

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    })

    // 短信登录
    mock.onPost('/v1/login/app_mobile').reply(config => {
      let { code, mobile } = JSON.parse(config.data)
      let user = null
      return new Promise((resolve, reject) => {
        let hasUser = mockData.loginUser.some(u => {
          if (u.code === code && u.phoneNum === mobile) {
            user = JSON.parse(JSON.stringify(u))
            return true
          }
        })

        if (hasUser) {
          resolve([200, { code: 200, msg: '登录成功', user }])
        } else {
          resolve([200, { code: 500, msg: '账号或密码错误' }])
        }
      })
    })

    // 账号密码登录
    mock.onPost('/v1/login').reply(config => {
      let { username, password } = JSON.parse(config.data)
      let user = null
      return new Promise((resolve, reject) => {
        let hasUser = mockData.loginUser.some(u => {
          if (u.username === username && u.password === password) {
            user = JSON.parse(JSON.stringify(u))
            return true
          }
        })

        if (hasUser) {
          resolve([200, { code: 200, msg: '登录成功', user }])
        } else {
          resolve([200, { code: 500, msg: '账号或密码错误' }])
        }
      })
    })

    // 判断用户是否存在
    mock.onGet('/v1/users/exists').reply(config => {
      let params = config.params
      let user = null
      return new Promise((resolve, reject) => {
        let hasUser = mockData.loginUser.some((item) => {
          if (item.phoneNum === params.phoneNumber && item.type === params.type) {
            user = JSON.parse(JSON.stringify(item))
            return true
          }
        })
        if (!hasUser) {
          resolve([200, { code: 500, msg: '手机号尚未绑定！' }])
        } else {
          resolve([200, { code: 200, msg: '请求成功！', user }])
        }
      })
    })

    // 获取当前位置
    mock.onGet('/v1/cities').reply(config => {
      return Promise.resolve([200, {
        longitude: '111',
        latitude: '222',
        address: '四川省成都市高新区'
      }])
    })

    // 获取食品分类
    mock.onGet('/v1/foodType').reply(config => {
      return Promise.resolve([200, {
        data: mockData.home.foodType
      }])
    })

    // 获取商家分类
    mock.onGet('/v1/sortList').reply(config => {
      return Promise.resolve([200, {
        data: mockData.sortList
      }])
    })

    // 获取所有商家
    mock.onGet('/v1/shopList').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            data: mockData.recommend.shop.shopList
          }])
        }, 1000)
      })
    })

    // 模糊查询商家
    mock.onGet('/v1/searchShop').reply(config => {
      let params = config.params
      let shop = []
      return new Promise((resolve, reject) => {
        mockData.recommend.shop.shopList.forEach((item) => {
          if (item.shopName.indexOf(params.shopName) >= 0) {
            shop.push(item)
          }
        })
        resolve([200, {data: shop}])
      })
    })

    // 热门搜索
    mock.onGet('/v1/hotSearch').reply(config => {
      return Promise.resolve([200, {
        data: mockData.recommend.hotSearch
      }])
    })

    // 推荐食物
    mock.onGet('/v1/foodList').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            data: mockData.recommend.food
          }])
        }, 1000)
      })
    })

    // 订单
    mock.onGet('/v1/orderList').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            data: mockData.orderList.rows
          }])
        }, 1000)
      })
    })

    // 商店信息
    mock.onGet('/v1/searchShopById').reply(config => {
      let params = config.params
      let shop = ''
      return new Promise((resolve, reject) => {
        mockData.recommend.shop.shopList.forEach((item) => {
          if (item.id === params.shopId) {
            shop = item
          }
        })
        resolve([200, {data: shop}])
      })
    })

    // 商店所有商品
    mock.onGet('/v1/shopGoods').reply(config => {
      let shopId = config.params.shopId
      let goods = null
      return new Promise((resolve, reject) => {
        let hasShop = mockData.recommend.shop.shopList.some((item) => {
          if (item.id === shopId) {
            goods = item.foodList
            return true
          }
        })
        if (!hasShop) {
          resolve([200, { code: 500, msg: '不存在商家！' }])
        } else {
          resolve([200, { code: 200, msg: '请求成功！', data: goods }])
        }
      })
    })

    // 商店商品分类
    mock.onGet('/v1/shopGoodsType').reply(config => {
      let shopId = config.params.shopId
      let types = []
      return new Promise((resolve, reject) => {
        mockData.recommend.shop.shopList.forEach((item) => {
          if (item.id === shopId) {
            item.foodList.forEach((fooditem) => {
              if (types.length !== 0) {
                let index = types.findIndex((typeitem) => {
                  return typeitem.key === fooditem.foodType.key
                })
                if (index > 0) {
                  types.splice(index, 1)
                }
                console.log(index)
              }
              // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
              types.push(fooditem.foodType)
            })
          }
        })
        console.log(types)
        resolve([200, {data: types}])
      })
    })
  }
}
