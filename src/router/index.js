import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载
const home = (resolve) => {
  import('@/views/home/home.vue').then((module) => {
    resolve(module)
  })
}

const find = (resolve) => {
  import('@/views/find/find.vue').then((module) => {
    resolve(module)
  })
}

const order = (resolve) => {
  import('@/views/order/order.vue').then((module) => {
    resolve(module)
  })
}

const user = (resolve) => {
  import('@/views/user/user.vue').then((module) => {
    resolve(module)
  })
}

const login = (resolve) => {
  import('@/views/login/login.vue').then((module) => {
    resolve(module)
  })
}

const address = (resolve) => {
  import('@/views/address/address.vue').then((module) => {
    resolve(module)
  })
}

const addressAdd = (resolve) => {
  import('@/views/address/children/addressAdd.vue').then((module) => {
    resolve(module)
  })
}

const search = (resolve) => {
  import('@/views/search/search.vue').then((module) => {
    resolve(module)
  })
}

const shop = (resolve) => {
  import('@/views/shop/shop.vue').then((module) => {
    resolve(module)
  })
}

const findList = (resolve) => {
  import('@/views/find/children/findList.vue').then((module) => {
    resolve(module)
  })
}

const goods = (resolve) => {
  import('@/views/shop/children/goods.vue').then((module) => {
    resolve(module)
  })
}

const evaluate = (resolve) => {
  import('@/views/shop/children/evaluate.vue').then((module) => {
    resolve(module)
  })
}

const store = (resolve) => {
  import('@/views/shop/children/store.vue').then((module) => {
    resolve(module)
  })
}

const shopcart = (resolve) => {
  import('@/views/shopcart/shopcart.vue').then((module) => {
    resolve(module)
  })
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/find',
      name: 'find',
      component: find,
      children: [{
        path: 'findList',
        name: 'findList',
        component: findList
      }]
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/address',
      name: 'address',
      component: address,
      children: [{
        path: 'addressAdd',
        name: 'addressAdd',
        component: addressAdd
      }]
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      redirect: '/shop/goods',
      children: [{
        path: 'goods',
        name: 'goods',
        component: goods
      }, {
        path: 'evaluate',
        name: 'evaluate',
        component: evaluate
      }, {
        path: 'store',
        name: 'store',
        component: store
      }]
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: shopcart
    }
  ]
})
