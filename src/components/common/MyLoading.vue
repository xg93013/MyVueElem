<template>
  <div class="my-loading">
    <div class="load-img" :style="{backgroundPositionY: -(positionY%7)*2.5 + 'rem'}"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        positionY: 0,
        timer: null
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        this.positionY++
      }, 600)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @keyframes load {
    0%   {transform: translateY(0px);}
    50%  {transform: translateY(-50px);}
    100% {transform: translateY(0px);}
  }
  .my-loading{
    @include wh(2.5rem, 2.5rem);
  }
  .load-img{
    @include wh(100%, 100%);
    background: url(../../assets/images/icon_loading.png) no-repeat 0 0;
    background-size: 2.5rem auto;
    transform: translateY(0px);
    animation: load .6s infinite ease-in-out;
    position: relative;
    z-index: 11;
  }
</style>
