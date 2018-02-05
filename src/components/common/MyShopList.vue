<template>
  <div class="shop-list">
    <router-link tag="div" :to="{ name:'shop',query: { id: item.id }}" class="list-box" v-for="item in shopList" :key="item.id">
      <div class="shop-img"><img v-lazy="imgBaseUrl + item.shopUrl"></div>
      <div class="shop-des">
        <p class="shop-name"><span class="shop-card"></span>{{item.shopName}}</p>
        <div class="state">☆{{ item.shopState.shopScore }}  月售{{ item.shopState.stateOrder }}单</div>
        <div class="price">
          <div class="price-box">￥{{ item.shopState.startPrice }}元起送|配送费{{ item.shopState.packPrice }}元</div>
          <div class="position">{{ item.position.distance }}公里 | {{ item.position.packTime }}分钟</div>
        </div>
        <div class="tips">
          <p>您有本店{{ item.tips.redPacket.length }}个红包</p>
        </div>
        <div class="activites">
          <div class="activity-list">
            <p v-for="(resItem, index) in item.activities.remission" v-if="index < 2">{{ resItem.name }}</p>
          </div>
          <div class="sum">
            10个活动
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
  import { imgBaseUrl } from '@/api/env.js'
  export default {
    data () {
      return {
        imgBaseUrl
      }
    },
    props: {
      searchGroup: {
        type: Array,
        default: []
      },
      shopList: {
        type: Array,
        default: []
      }
    },
    mounted () {

    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .shop-list{
    width: 100%;
    .list-box{
      padding: 1rem;
      display: flex;
      border-bottom: 1px solid $color-border-a;
      .shop-img{
        flex: 0 0 3rem;
        width: 3rem;
        margin-right: 1rem;
        img{
          width: 100%;
        }
      }
      .shop-des{
        flex: 1;
        .shop-name{
          width: 100%;
          @include sc(1.1rem, $color-text-a);
          .shop-card{
            background: #F7E933;
            color: $color-text-a;
          }
        }
        .state{
          @include sc(0.7rem, $color-text-c);
        }
        .price{
          @include sc(0.7rem, $color-text-c);
          margin: 0.4rem 0;
          display: flex;
          .price-box{
            flex: 1;
            @include no-wrap();
          }
          .position{
            @include sc(0.7rem, $color-text-d);
            flex: 0 0 5rem;
            width: 3rem;
            text-align: right;
          }
        }
        .tips{
          @include sc(0.7rem, $color-text-c);
          margin-bottom: 0.2rem;
        }
        .activites{
          display: flex;
          line-height: 1.2rem;
          padding-top: 0.2rem;
          border-top: 1px solid $color-border-a;
          @include sc(0.7rem, $color-text-c);
          .activity-list{
            flex: 1;
          }
          .sum{
            @include sc(0.7rem, $color-text-d);
            flex: 0 0 4rem;
            text-align: right;
          }
        }
      }
    }
  }
</style>
