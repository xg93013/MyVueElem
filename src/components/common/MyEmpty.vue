<template>
  <div class="my-empty">
    <div class="img"><img src="../../assets/images/empty.png"/></div>
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
  .my-empty{
    width: 100%;
    text-align: center;
    .img{
      width: 100%;
      text-align: center;
      /*margin: 1rem auto 0;*/
      text-align: center;
      img{
        width: 5rem;
        margin: 0 auto 1rem;
      }
    }
  }
</style>
