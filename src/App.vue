<template>
  <div id="app">
    <router-view/>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import footerBar from '@/components/footer/footer'
export default {
  components: {
    footerBar
  }
}
</script>

<style lang="scss">
  /*@import "normalize";*/
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
