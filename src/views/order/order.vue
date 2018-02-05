<template>
  <div class="my-order">
    <header-bar :text="headerText"></header-bar>
    <div class="empty-page" v-show="!userInfo">
      <my-empty></my-empty>
      <p class="tip-text">登录后可查看订单</p>
      <router-link to="/login" tag="button" class="login-btn">立即登录</router-link>
    </div>
    <my-scroll class="scroll-wrapper" :refreshDelay="refreshDelay" v-show="userInfo">
      <section class="order-list">
        <my-loading v-show="showLoading" class="showLoading"></my-loading>
        <div class="ordex-item" v-for="item in orderList">
          <div class="img">
            <img :src="imgBaseUrl + item.imgUrl"/>
          </div>
          <div class="des">
            <div class="top">
              <div class="name">{{ item.shopName }}</div>
              <div class="state">
                <span v-if="item.state === 1">订单已完成</span>
              </div>
            </div>
            <div class="time">{{ item.time }}</div>
            <div class="bot">
              <div class="name">{{ item.foodList[0].foodName }}</div>
              <div class="price">￥{{ item.totalPrice }}</div>
            </div>
            <div class="btn">
              <span>再来一单</span>
              <span class="red-b">评价得10金币</span>
            </div>
          </div>
        </div>
      </section>
    </my-scroll>
  </div>
</template>
<script>
  import headerBar from '@/components/header/header'
  import MyLoading from '@/components/common/MyLoading'
  import MyScroll from '@/components/common/MyScroll'
  import MyEmpty from '@/components/common/MyEmpty'
  import { mapGetters } from 'vuex'
  import { imgBaseUrl } from '@/api/env.js'
  import { orderList } from '@/api/getData.js'
  export default {
    components: {
      MyLoading,
      MyScroll,
      MyEmpty,
      headerBar
    },
    data () {
      return {
        showLoading: true, // 显示加载中
        refreshDelay: 1100,
        headerText: '订单',
        orderList: [], // 订单列表
        imgBaseUrl
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    mounted () {
      orderList().then((res) => {
        this.showLoading = false
        this.orderList = res.data
      })
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .my-order{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    .showLoading{
      margin: 10rem auto 0;
    }
    .empty-page{
      position: absolute;
      top: 50%;
      left: 50%;
      -ms-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
      -o-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
      text-align: center;
      .tip-text{
        font-size: 1.1rem;
        color: $color-text-c;
      }
      .login-btn{
        font-size: 1rem;
        padding: 0.6rem 1.5rem;
        margin-top: 1rem;
        background: $color-button;
        border-radius: 0.2rem;
        color: #fff;
      }
    }
    .scroll-wrapper{
      width: 100%;
      position: absolute;
      top: 3rem;
      bottom: 3rem;
      overflow: hidden;
      .order-list{
        overflow: hidden;
        .ordex-item{
          margin: 0 0 0 1rem;
          padding: 1rem 0;
          overflow: hidden;
          display: flex;
          border-bottom: 1px solid $color-border-a;
          .img{
            flex: 0 0 3rem;
            width: 3rem;
            margin-right: 0.8rem;
            img{
              width: 100%;
            }
          }
          .des{
            flex: 1;
            margin-right: 1rem;
            overflow: hidden;
            .top{
              display: flex;
              .name{
                flex: 1;
                @include no-wrap();
                @include sc(0.9rem,  $color-text-a)
              }
              .state{
                flex: 0 0 4rem;
                width: 4rem;
                text-align: right;
                @include sc(0.8rem,  $color-text-d);
              }
            }
            .time{
              @include sc(0.8rem,  $color-text-d)
            }
            .bot{
              display: flex;
              margin-top: 1rem;
              .name{
                flex: 1;
                @include no-wrap();
                @include sc(0.9rem,  $color-text-a)
              }
              .price{
                flex: 0 0 3rem;
                width: 3rem;
                text-align: right;
                @include sc(0.8rem,  $color-text-a);
              }
            }
            .btn{
              text-align: right;
              overflow: hidden;
              margin: 0.8rem 0 0;
              span{
                display: inline-block;
                border-radius: 0.2rem;
                padding: 0.3rem 0.6rem;
                @include sc(0.8rem, $color-theme);
                border: 1px solid $color-theme;
              }
              .red-b{
                color: $color-red;
                border: 1px solid $color-red;
              }
            }
          }
        }
      }
    }
  }
</style>
