<template>
  <div class="footer-bar">
    <router-link tag="div" class="tab-item" :to="{ name: 'home' }">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="$route.path.indexOf('home') === -1? '#icon-home' : '#icon-home-active'"></use>
      </svg>
      <p class="tab-text">外卖</p>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'find' }">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="$route.path.indexOf('find') === -1? '#icon-find' : '#icon-find-active'"></use>
      </svg>
      <p class="tab-text">发现</p>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'order' }">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="$route.path.indexOf('order') === -1? '#icon-list' : '#icon-list-active'"></use>
      </svg>
      <p class="tab-text">订单</p>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'user' }">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="$route.path.indexOf('user') === -1? '#icon-user' : '#icon-user-active'"></use>
      </svg>
      <p class="tab-text">我的</p>
    </router-link>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .footer-bar{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    @include wh(100%, 3rem);
    background: $color-white;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    display: flex;
    .tab-item{
      flex: 1;
      font-size: 1.2rem;
      text-align: center;
      p{
        font-size: 0.8rem;
      }
    }
    .router-link-active{
      .tab-text{
        color: $color-theme ;
      }
    }
  }
</style>
