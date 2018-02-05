<!-- 确认对话框 组件 -->
<template>
  <transition name="confirm-fade">
    <div class="my-confirm" v-show="showFlag" @click.stop>
      <div class="tip-icon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-face"></use>
        </svg>
      </div>
      <p class="text">{{ text }}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        // 显示
        showFlag: false
      }
    },
    props: {
      // 描述性文字
      text: {
        type: String,
        default: 'tips'
      }
    },
    watch: {},
    methods: {
      // 显示对话框
      show () {
        this.showFlag = true
        setTimeout(() => {
          this.hide()
        }, 3000)
      },
      // 隐藏对话框
      hide () {
        this.showFlag = false
      }
    },
    filters: {},
    computed: {},
    created () {},
    mounted () {},
    destroyed () {}
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';

  .my-confirm {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 1.4rem 1rem;
    text-align: center;
    transform: translate(-50%, -50%);
    z-index: 999;
    background-color: $color-background-d;
    border-radius: 0.4rem;
    .icon{
      font-size: 1.3rem;
      fill: #fff;
    }
    .text{
      color: #fff;
      padding: 0.2rem 0.5rem;
    }
    &.confirm-fade-enter-active {
      animation: confirm-fadein 0.3s;
      .confirm-content {
        animation: confirm-zoom 0.3s;
      }
    }
  }

  @keyframes confirm-fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes confirm-zoom {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
