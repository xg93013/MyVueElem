<template>
  <div class="header-bar">
    <div class="left">
      <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-back"></use>
        </svg>
      </section>
      <section class="head_goback" v-if="goClose" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </section>
    </div>
    <div class="text">{{text}}</div>
    <div class="right">
      <slot name="userSetting"></slot>
      <slot name="changeLogin"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      // 右侧文字
      rightText: {
        type: String,
        default: ''
      },
      // 右侧图标样式
      iconClass: {
        type: String,
        default: ''
      },
      // 返回
      goBack: {
        type: Boolean,
        default: false
      },
      // 关闭
      goClose: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clickRight () {
        this.$emit('clickTop')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .header-bar{
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    z-index: 99;
    @include wh(100%, 3rem);
    background: $color-theme;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    display: flex;
    align-items: center;
    .left{
      position: absolute;
      left: 1rem;
      top: 0.7rem;
      .icon{
        font-size: 1.1rem;
        fill: #fff;
      }
    }
    .text{
      flex: 1;
      font-size: 1.1rem;
      color: $color-white;
      text-align: center;
    }
    .right{
      position: absolute;
      right: 1rem;
      top: 0.7rem;
      span {
        color: $color-white;
        font-size: 0.9rem;
      }
      .icon-setting{
        font-size: 1.3rem;
        fill: #fff;
      }
    }
  }
</style>
