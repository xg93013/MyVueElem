<template>
  <div class="my-shopcart">
    <!--<div class="head">-->
      <!--<router-link tag="div" class="head_goback" :to="{ name:'shop',query: { id: cartList.others.shopId }}">-->
        <!--<svg class="icon" aria-hidden="true">-->
          <!--<use xlink:href="#icon-back"></use>-->
        <!--</svg>-->
      <!--</router-link>-->
    <!--</div>-->
    <header-bar :goBack="true"></header-bar>
    <my-scroll class="scroll-wrapper">
      <div class="scroll-list">
        <section class="info-box">
          <ul class="top-info-box">
            <li class="item">
              <div class="left">送达时间</div>
              <div class="right">
                <span class="text">选择收货地址</span>
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right"></use>
                </svg>
              </div>
            </li>
            <li class="item">
              <div class="left">支付方式</div>
              <div class="right">
                <span class="text">选择送达时间</span>
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right"></use>
                </svg>
              </div>
            </li>
          </ul>
        </section>
        <section class="info-box">
          <div class="title">{{ cartList.others.shopName }}</div>
          <!--商品列表-->
          <div class="cartlist">
            <div class="cart-item" v-for="item in cartList.goodsList">
              <div class="img">
                <img />
              </div>
              <div class="name">{{ item.foodName }}</div>
              <div class="count">x{{ item.count }}</div>
              <div class="price">￥{{ item.totalPrice }}</div>
            </div>
          </div>
          <!--其他信息-->
          <div class="others">
            <div class="item">
              <div class="name">打包费</div>
              <div class="price">￥{{ cartList.others.packetMoney }}</div>
            </div>
            <div class="item">
              <div class="name">配送费</div>
              <div class="price">￥{{ cartList.others.dispatching }}</div>
            </div>
          </div>
        </section>
      </div>
    </my-scroll>
    <!--结算-->
    <div class="cal-box">
      <div class="price">￥{{ cartList.others.totalMoney }}</div>
      <button class="pay">去结算</button>
    </div>
  </div>
</template>
<script>
  import MyScroll from '@/components/common/MyScroll'
  import headerBar from '@/components/header/header'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    components: {
      headerBar,
      MyScroll
    },
    data () {
      return {
        headerText: '地址'
      }
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    methods: {
      ...mapMutations(['SET_SHOWSTORE'])
    },
    created () {
      this.SET_SHOWSTORE(true)
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .my-shopcart{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: $theme-background;
    .head{
      width: 100%;
      height: 3rem;
      position: relative;
      .head_goback{
        position: absolute;
        left: 1rem;
        top: 1rem;
      }
    }
    .scroll-wrapper{
      position: absolute;
      width: 100%;
      top: 3rem;
      bottom: 3rem;
      left: 0;
      right: 0;
      overflow: hidden;
      .info-box{
        background: $color-white;
        overflow: hidden;
        margin: 0.6rem 0.6rem;
        padding: 0.4rem 1rem;
        .top-info-box{
          .item{
            display: flex;
            font-size: 0.8rem;
            padding: 0.6rem 0;
            border-bottom: 1px solid $color-border-a;
            .left{
              flex: 1;
            }
            .right{
              flex: 0 0 6rem;
              width: 6rem;
              color: $color-theme;
              .text{
                @include sc(0.8rem, $color-theme)
              }
            }
          }
        }
        .title{
          border-bottom: 1px solid $color-border-a;
          @include sc(0.9rem, $color-text-a);
          padding: 0.6rem 0;
        }
        .cartlist{
          .cart-item{
            display: flex;
            overflow: hidden;
            padding: 0.4rem 0;
            border-bottom: 1px solid $color-border-a;
            .img{
              flex: 0 0 3rem;
              width: 3rem;
              img{
                width: 3rem;
                height: 3rem;
              }
            }
            .name{
              flex: 1;
              margin-left: 0.4rem;
              @include sc(0.9rem, $color-text-a)
            }
            .count{
              flex: 0 0 2rem;
              width: 3rem;
              @include sc(0.8rem, $color-text-c)
            }
            .price{
              flex: 0 0 4rem;
              width: 4rem;
              @include sc(0.9rem, $color-text-a)
            }
          }
        }
        .others{
          .item{
            display: flex;
            padding: 1rem 0;
            border-bottom: 1px solid $color-border-a;
            @include sc(0.9rem, $color-text-a);
            .name{
              flex: 1;
            }
            .price{
              flex: 0 0 3rem;
              text-align: right;
            }
          }
        }
      }
    }
    .cal-box{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3rem;
      display: flex;
      background: $color-dialog-background;
      .price{
        flex: 1;
        line-height: 3rem;
        color: $color-white;
        margin-left: 1rem;
      }
      .pay{
        flex: 0 0 6rem;
        width: 6rem;
        background: $color-button;
        @include sc(0.8rem, $color-white);
      }
    }
  }
</style>
