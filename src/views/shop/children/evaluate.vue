<template>
  <div class="my-evaluate">
    <div class="evaluate-top">
      <div class="left">
        <h3 class="total-score">4.5</h3>
        <p class="little">综合评分</p>
        <p>高于周边商家18%</p>
      </div>
      <div class="right">
        <div class="score-item">
          <div class="name">服务态度</div>
          <div class="star">☆</div>
          <div class="score">4.5</div>
        </div>
        <div class="score-item">
          <div class="name">服务态度</div>
          <div class="star">☆</div>
          <div class="score">4.5</div>
        </div>
        <div class="score-item">
          <div class="name">送达时间</div>
          <div class="star">☆</div>
          <div class="score">4.5</div>
        </div>
      </div>
    </div>
    <div class="evaluate-list"></div>
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
  @import '~@/assets/scss/common.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .my-evaluate{
    background: $theme-background;
    height: 100%;
    .evaluate-top{
      display: flex;
      background: $color-white;
      padding: 0.6rem 0;
      .left{
        flex: 0 0 35%;
        width: 35%;
        text-align: center;
        .total-score{
          @include sc(1.2rem, $color-red)
        }
        p{
          @include sc(0.7rem, $color-text-c)
        }
      }
      .right{
        flex: 1;
        border-left: 1px solid $color-border-a;
        padding-left: 2rem;
        .score-item{
          display: flex;
          align-items: center;
          line-height: 1.4rem;
          .name{
            flex: 0 0 3rem;
            width: 3rem;
            @include sc(0.7rem, $color-text-c)
          }
          .star{
            flex: 1;
            @include sc(0.7rem, $color-text-c)
          }
          .score{
            flex: 0 0 4rem;
            width: 4rem;
            @include sc(0.7rem, $color-red)
          }
        }
      }
    }
  }
</style>
