/* eslint-disable quotes */
let Mock = require('mockjs')
export const mockData = {
  // 用户
  loginUser: [{
    user_id: 1,
    phoneNum: '13452440502',
    username: 'no_never',
    type: 'mobile',
    password: '123456',
    avatar: 'user.jpg',
    code: '1234'
  }],
  // 订单列表
  orderList: Mock.mock({
    'rows|5-10': [{
      'imgUrl': 'default.png',
      'shopId|+1': 1,
      'foodList|1-3': [{
        'id|+1': 1,
        'shopId|+1': 1,
        'shopName|+1': [
          '黑泷太郎（中和店）',
          'CoCo都可（成都高新中和店） ',
          '1+加便利超市（中和店）',
          '必旺客',
          '果果巴巴',
          '一只酸奶牛'
        ],
        'imgUrl': 'default.png',
        'foodName|1': [
          '香辣烤肉拌饭+饮料',
          '蜜汁（双拼饭）+赠品',
          '脆皮+烤肉双拼系列',
          '麻辣脆皮鸡饭',
          '椒香牛排饭',
          '香辣牛排饭',
          '浓要脆皮鸡+奶茶'
        ],
        'foodState': {
          'sale|0-2000': 0,
          'price|10-40': 30,
          'evaluation|50-100': 0,
          'activities|1': [{
            'id': 1,
            'name': '满10减5'
          }, {
            'id': 2,
            'name': '满20减10'
          }, {
            'id': 3,
            'name': '满30减15'
          }]
        }
      }],
      'shopName|1': [
        '黑泷太郎（中和店）',
        'CoCo都可（成都高新中和店） ',
        '1+加便利超市（中和店）',
        '必旺客',
        '果果巴巴',
        '一只酸奶牛'
      ],
      'state': 1,
      'time': '@date',
      'totalPrice': 1000
    }],
    'total': 100
  }),
  // 主页数据
  home: Mock.mock({
    'foodType|20': [{
      'id|+1': 1,
      image_url: 'default.png',
      'title|+1': [
        '美食',
        '川湘菜',
        '商超便利',
        '果蔬生鲜',
        '新店特惠',
        '大牌简餐',
        '甜品饮品',
        '医药健康',
        '浪漫鲜花',
        '麻辣烫',
        '满减好店',
        '快餐便当',
        '汉堡薯条',
        '炸鸡炸串',
        '煲仔烧腊',
        '火锅烤鱼',
        '准时达',
        '地方菜系',
        '东兰亚菜',
        '鸭脖卤味'
      ]
    }]
  }),
  // 排序筛选
  sortList: Mock.mock({
    'sortitem': [{
      'id': 1,
      'title': '综合排序'
    }, {
      'id': 2,
      'title': '销量最高'
    }, {
      'id': 3,
      'title': '起送价最低'
    }, {
      'id': 4,
      'title': '配送最快'
    }, {
      'id': 5,
      'title': '配送费最低'
    }],
    'choiceitem': [{
      'id': 1,
      'title': '特色服务',
      'item': [{
        'img': 'default.png',
        'name': '蜂鸟快送'
      }, {
        'img': 'default.png',
        'name': '会员领红包'
      }]
    }, {
      'id': 2,
      'title': '优惠活动',
      'item': [{
        'img': 'default.png',
        'name': '新用户优惠'
      }, {
        'img': 'default.png',
        'name': '下单立减'
      }, {
        'img': 'default.png',
        'name': '赠品优惠'
      }, {
        'img': 'default.png',
        'name': '下单饭红包'
      }, {
        'img': 'default.png',
        'name': '进店领红包'
      }]
    }, {
      'id': 3,
      'title': '人均消费',
      'item': [
        {'name': '￥20以下'},
        {'name': '￥20-40'},
        {'name': '￥40以上'}
      ]
    }, {
      'id': 4,
      'title': '商家属性',
      'item': [{
        'img': 'default.png',
        'name': '品牌商家'
      }, {
        'img': 'default.png',
        'name': '食安保'
      }, {
        'img': 'default.png',
        'name': '新店'
      }, {
        'img': 'default.png',
        'name': '开发票'
      }, {
        'img': 'default.png',
        'name': '在线支付'
      }, {
        'img': 'default.png',
        'name': '准时达'
      }]
    }]
  }),
  // 推荐列表
  recommend: Mock.mock({
    // 推荐商家
    shop: {
      'shopList|20-100': [{
        'id|+1': 1,
        'shopName|1': [
          '黑泷太郎（中和店）',
          'CoCo都可（成都高新中和店） ',
          '1+加便利超市（中和店）',
          '必旺客',
          '果果巴巴',
          '一只酸奶牛'
        ],
        'shopUrl': 'default.png',
        'shopState': {
          'stateScore|0-5': 4.6,
          'stateOrder|0-1000': 0
        },
        'shopPrice': {
          'startPrice|20-30': 20,
          'packPrice|2-3': 2.5
        },
        'tips': {
          'redPacket': [
            {'item': '5元'},
            {'item': '10元'},
            {'item': '15元'}
          ]
        },
        'position': {
          'distance|1-10': 1,
          'packTime|1-60': 0
        },
        'packet': {
          'money': 2.5,
          'box': 4
        },
        'activities': {
          'remission': [
            {
              'id': 1,
              'name': '满10减5'
            },
            {
              'id': 2,
              'name': '满15减5'
            },
            {
              'id': 3,
              'name': '满30减10'
            }
          ],
          'others': [
            {
              'id': 1,
              'name': '本店新用户立减1元'
            }
          ]
        },
        'foodList|10-100': [{
          'id|+1': 1,
          'foodName|+1': [
            '香辣烤肉拌饭+饮料',
            '蜜汁（双拼饭）+赠品',
            '脆皮+烤肉双拼系列',
            '麻辣脆皮鸡饭',
            '椒香牛排饭',
            '香辣牛排饭',
            '浓要脆皮鸡+奶茶'
          ],
          'foodUrl': 'default.png',
          'foodState': {
            'sale|0-2000': 0,
            'price|10-40': 30,
            'evaluation': '90%',
            'activities|1': [{
              'id': 1,
              'name': '满10减5'
            }, {
              'id': 2,
              'name': '满20减10'
            }, {
              'id': 3,
              'name': '满30减15'
            }]
          },
          'foodType|+1': [
            {
              key: 'a',
              name: '买过'
            },
            {
              key: 'b',
              name: '热销'
            },
            {
              key: 'c',
              name: '招牌'
            },
            {
              key: 'd',
              name: '优惠'
            },
            {
              key: 'e',
              name: '扫一扫，领红包'
            },
            {
              key: 'f',
              name: '季节限定'
            },
            {
              key: 'g',
              name: '白色鲜醇'
            },
            {
              key: 'h',
              name: '醇香奶茶'
            },
            {
              key: 'i',
              name: '醇黑浓情'
            },
            {
              key: 'j',
              name: '鲜果鲜茶'
            },
            {
              key: 'k',
              name: '益菌多多'
            }
          ],
          'foodChoose': [{
            id: 1,
            name: '小份',
            'price|10-20.1-2': 10
          }, {
            id: 2,
            name: '中份',
            'price|20-30.1-2': 20
          }, {
            id: 3,
            name: '大份',
            'price|30-40.1-2': 30
          }]
        }]
      }]
    },
    // 推荐食物
    'food|10-50': [{
      'id|+1': 1,
      'shopId|+1': 1,
      'shopName|+1': [
        '黑泷太郎（中和店）',
        'CoCo都可（成都高新中和店） ',
        '1+加便利超市（中和店）',
        '必旺客',
        '果果巴巴',
        '一只酸奶牛'
      ],
      'imgUrl': 'default.png',
      'foodName|1': [
        '香辣烤肉拌饭+饮料',
        '蜜汁（双拼饭）+赠品',
        '脆皮+烤肉双拼系列',
        '麻辣脆皮鸡饭',
        '椒香牛排饭',
        '香辣牛排饭',
        '浓要脆皮鸡+奶茶'
      ],
      'foodState': {
        'sale|0-2000': 0,
        'price|10-40': 30,
        'evaluation|50-100': 0,
        'activities|1': [{
          'id': 1,
          'name': '满10减5'
        }, {
          'id': 2,
          'name': '满20减10'
        }, {
          'id': 3,
          'name': '满30减15'
        }]
      }
    }],
    // 热门搜索
    'hotSearch': [{
      id: 1,
      name: '腊八粥'
    }, {
      id: 2,
      name: '汉堡王新品7折'
    }, {
      id: 3,
      name: '米粉'
    }, {
      id: 4,
      name: '早餐'
    }, {
      id: 5,
      name: '三金片'
    }, {
      id: 6,
      name: '冒菜'
    }, {
      id: 7,
      name: '咖啡'
    }, {
      id: 8,
      name: '德克士'
    }, {
      id: 9,
      name: '鸭脑壳'
    }]
  })
}
