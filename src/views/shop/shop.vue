<template>
  <div class="my-shop">
    <!--商店简介-->
    <transition name="show-store">
    <div class="shop-header" ref="topRefs">
      <!--顶部操作栏-->
      <div class="top">
        <div class="back" @click="back">
          <svg class="icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-back"></use>
          </svg>
        </div>
        <div class="search">
          <my-search-box @query="onQueryChange" ref="searchRefs"></my-search-box>
        </div>
        <div class="more">
          <svg class="icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-setting"></use>
          </svg>
        </div>
      </div>
      <!--商店信息-->
      <div class="shop-top">
        <div class="top-img">
          <div class="img"><img :src="imgBaseUrl + shopInfo.shopUrl"></div>
          <div class="shop-des">
            <p class="name">{{ shopInfo.shopName }}</p>
            <p class="state">
              <span>评分{{ shopInfo.shopState.stateScore }}</span>
              <span>月售{{ shopInfo.shopState.stateOrder }}</span>
            </p>
            <p class="state">
              <span>蜂鸟快送 约{{ shopInfo.position.packTime }}分钟</span>
              <span>距离{{ shopInfo.position.distance }}km</span>
            </p>
            <!--<p class="tips">-->
            <!--1、本店推荐使用饿了么订餐-->
            <!--</p>-->
            <!--商家详细信息-->
            <!--<div class="activity">-->
            <!--<div class="item">{{ shopInfo.activities.remission[0].name }}</div>-->
            <!--<div class="sum">{{ shopInfo.activities.remission.length }}和优惠</div>-->
            <!--</div>-->
            <!--<div class="red-packet">-->
            <!--<p class="left"><span v-for="reditem in shopInfo.tips.redPacket">{{ reditem.item + ',' }}</span>专属红包</p>-->
            <!--<p class="right">领取</p>-->
            <!--</div>-->
          </div>
          <div class="favorite">
            <svg class="icon">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-favorite"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <!--商品信息-->
    <!--@touchstart.prevent="Touchstart" @touchmove.prevent="Touchmove" @touchend.prevent="Touchend-->
    <div class="shop-box" ref="shopBoxRefs">
      <div class="shop-class">
        <router-link tag="div" :to="{ name:'goods',query: { id: shopId }}" class="item" replace><span>点餐</span></router-link>
        <router-link tag="div" :to="{ name:'evaluate',query: { id: shopId }}" class="item" replace><span>评价</span></router-link>
        <router-link tag="div" :to="{ name:'store',query: { id: shopId }}"  class="item" replace><span>商家</span></router-link>
      </div>
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
  import MySearchBox from '@/components/common/MySearchBox'
  import { mapGetters, mapMutations } from 'vuex'
  import { searchShopById } from '@/api/getData.js'
  import { imgBaseUrl } from '@/api/env.js'
  export default {
    components: {
      MySearchBox
    },
    data () {
      return {
        query: '', // 搜索关键字
        shopId: 0, // 商家id
        shopInfo: {
          shopName: '',
          shopUrl: '',
          shopState: {
            stateScore: '',
            stateOrder: ''
          },
          position: {
            packTime: '',
            distance: ''
          }
        }, // 商家信息
        topHeight: 0,
        imgBaseUrl
      }
    },
    watch: {
      showStore (flag) {
        if (flag) {
          this.$refs.shopBoxRefs.style.top = `${this.topHeight}px`
        } else {
          this.$refs.shopBoxRefs.style.top = 0
        }
      }
    },
    computed: {
      ...mapGetters(['showStore'])
    },
    methods: {
      ...mapMutations(['SET_SHOWSTORE']),
      // 商家基本信息
      _getShopInfo (id) {
        searchShopById(id).then((res) => {
          this.shopInfo = res.data
        })
      },
      // 返回
      back () {
        this.$router.go(-1)
      },
      // 搜索
      onQueryChange (query) {
        this.query = query
      },
      calHeight () {
        this.topHeight = this.$refs.topRefs.clientHeight
        this.$refs.shopBoxRefs.style.top = `${this.topHeight}px`
      }
    },
    created () {
      this.shopId = this.$route.query.id
      this._getShopInfo(this.shopId)
    },
    mounted () {
//      this.calHeight()
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import "~@/assets/scss/const.scss";
  @import "~@/assets/scss/mixin.scss";
  .my-shop{
    .show-store-enter, .show-store-leave{
      opacity: 0;
    }
    .shop-header{
      position: fixed;
      top: 0;
      overflow: hidden;
      width: 100%;
      /*transition: all 0.4s;*/
      .top{
        height: 3rem;
        display: flex;
        background: #917464;
        color: #fff;
        overflow: hidden;
        align-items: center;
        .back{
          flex: 0 0 2.5rem;
          width: 2.5rem;
          text-align: center;
          .icon{
            fill: #fff;
          }
        }
        .search{
          flex: 1;
          background: $color-white;
        }
        .more{
          flex: 0 0 2.5rem;
          width: 2.5rem;
          text-align: center;
          .icon{
            fill: #fff;
          }
        }
      }
      .shop-top{
        .top-img{
          /*height: 3rem;*/
          background: #917464;
          display: flex;
          padding: 0.6rem;
          /*position: relative;*/
          .img{
            flex: 0 0 4rem;
            width: 4rem;
            height: 4rem;
            background: #fff;
            img{
              width: 100%;
            }
          }
          .shop-des {
            /*position: absolute;*/
            flex: 1;
            text-align: left;
            margin-left: 1rem;
            .name {
              @include no-wrap();
              @include sc(1.1rem, $color-white);
            }
            .state {
              span{
                display: inline-block;
                @include sc(0.7rem, $color-text-e);
              }
            }
            .tips {
              @include no-wrap();
              @include sc(0.7rem, $color-white);
              margin-bottom: 1rem;
            }
            .activity {
              width: 80%;
              margin: 1rem auto 0;
              display: flex;
              border: 1px solid $color-white;
              padding: 0.4rem 0.2rem;
              @include sc(0.7rem, $color-white);
              .item {
                flex: 1;
                text-align: left;
              }
              .sum {
                flex: 0 0 3rem;
                width: 3rem;
              }
            }
          }
          .favorite{
            flex: 0 0 2rem;
            width: 1.8rem;
            height: 1.8rem;
            line-height: 1.8rem;
            background: #fff;
            border-radius: 50%;
            text-align: center;
            .icon{
              font-size: 1.2rem;
              fill: $color-red;
            }
          }
          .red-packet{
            width: 70%;
            background: #FFF7F4;
            margin: 1rem auto 1.5rem;
            display: flex;
            border: 1px solid #ffdde4;
            padding: 0.4rem 0.2rem;
            align-items: center;
            @include sc(0.7rem, $color-text-d);
            .left{
              flex: 1;
              span{
                @include sc(1rem, $color-red);
              }
            }
            .right{
              flex: 0 0 2rem;
              width: 2rem;
            }
          }
        }
      }
    }
    .shop-box{
      position: fixed;
      top: 8rem;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
      transition: all 0.4s;
      background: #fff;
      .shop-class{
        display: flex;
        margin-top: 1rem;
        .item{
          flex: 1;
          @include sc(0.8rem, $color-text-a);
          text-align: center;
          span{
            display: inline-block;
            padding: 0.4rem 0;
            border-bottom: 3px solid #fff;
          }
        }
        .router-link-active{
          span{
            border-bottom: 3px solid $color-theme;
          }
        }
      }
    }
  }
</style>
