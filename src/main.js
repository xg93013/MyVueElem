// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/js/iconfont'
import './assets/js/rem'
import Mock from './mock/mock'
import VueLazyload from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Mock.bootstrap()
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('@/assets/images/default.png')// 没有加载出来的图片
})
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
