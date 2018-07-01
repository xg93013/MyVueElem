<template>
  <div class="my-find">
    <header-bar :text="headerText"></header-bar>
    <my-scroll ref="scrollRef" class="scroll-wrapper" :refreshDelay="refreshDelay">
      <div class="scroll-list">
        <section class="find-guide">
          <div class="guide-item">
            <div class="text">
              <h3 class="colorr-orange">金币商城</h3>
              <p>0元好物在这</p>
            </div>
            <div class="img">
              <img :src="imgBaseUrl+'default.png'"/>
            </div>
          </div>
          <div class="guide-item">
            <div class="text">
              <h3 class="color-red">必吃爆料</h3>
              <p>最夯外卖指南</p>
            </div>
            <div class="img">
              img
            </div>
          </div>
          <div class="guide-item">
            <div class="text">
              <h3 class="color-theme">推荐有奖</h3>
              <p>5元现金拿不停</p>
            </div>
            <div class="img">
              img
            </div>
          </div>
          <div class="guide-item">
            <div class="text">
              <h3 class="color-red">周边优惠</h3>
              <p>领取口碑好劵</p>
            </div>
            <div class="img">
              img
            </div>
          </div>
          <div class="guide-item">
            <div class="text">
              <h3 class="color-red">免费流量</h3>
              <p>每月最高500M</p>
            </div>
            <div class="img">
              img
            </div>
          </div>
          <div class="guide-item">
            <div class="text">
              <h3>百元红包</h3>
              <p>兴业银行联名卡</p>
            </div>
            <div class="img">
              img
            </div>
          </div>
        </section>
        <section class="mid-banner">
          <img />
        </section>
        <section class="find-list">
          <div class="list-title">
            <h3>为您推荐</h3>
            <p>你的口味，我都懂得</p>
          </div>
          <div class="find-list-box">
            <my-loading v-show="showLoading" class="shopLoading"></my-loading>
            <div class="find-list-item" v-for="(item, index) in foodList" v-if="index < 8">
              <p class="img"><img v-lazy="imgBaseUrl+item.imgUrl"/></p>
              <div class="name">{{ item.foodName }}</div>
              <div class="state">月售{{ item.foodState.sale }} 好评率{{ item.foodState.evaluation }}%</div>
              <div class="price">￥{{ item.foodState.price }}</div>
              <div class="tips">
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-shop"></use>
                </svg>
                <span>{{ item.shopName }}</span>
              </div>
            </div>
            <div class="find-more">
              <router-link to="/find/findList" tag="span">查看更多123</router-link>
            </div>
          </div>
        </section>
      </div>
    </my-scroll>
    <router-view></router-view>
  </div>
</template>
<script>
  import MyScroll from '@/components/common/MyScroll'
  import MyLoading from '@/components/common/MyLoading'
  import headerBar from '@/components/header/header'
  import { imgBaseUrl } from '@/api/env.js'
  import { foodList } from '@/api/getData.js'
  export default {
    components: {
      MyScroll,
      MyLoading,
      headerBar
    },
    data () {
      return {
        showLoading: true,
        refreshDelay: 1100,
        headerText: '发现',
        foodList: [],
        imgBaseUrl
      }
    },
    mounted () {
      foodList().then((res) => {
        this.showLoading = false
        this.foodList = res.data
      })
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .my-find{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .scroll-wrapper{
      position: absolute;
      width: 100%;
      top: 3rem;
      bottom: 3rem;
      overflow: hidden;
      .find-guide{
        display: flex;
        flex-wrap: wrap;
        background: $color-white;
        .guide-item{
          flex: 0 0 50%;
          width: 50%;
          box-sizing: border-box;
          text-align: center;
          display: flex;
          padding: 1rem;
          box-sizing: border-box;
          border-right: 1px solid $color-border-a;
          border-bottom: 1px solid $color-border-a;
          .text{
            flex: 0 0 70%;
            width: 70%;
            overflow: hidden;
            text-align: left;
            h3{
              @include no-wrap();
              @include sc(1rem, orange);
            }
            .color-red{
              color: #FF261A;
            }
            .color-theme{
              color: $color-theme;
            }
            p{
              @include no-wrap();
              margin-top: 0.2rem;
              @include sc(0.8rem, #999);
            }
          }
          .img{
            flex: 0 0 30%;
            width: 30%;
            img{
              width: 100%;
            }
          }
        }
      }
      .mid-banner{}
      .find-list{
        background: #fff;
        overflow: hidden;
        .list-title{
          margin-top: 1rem;
          text-align: center;
          h3{
            @include sc(1.2rem, $color-text-a);
          }
          p{
            @include sc(0.8rem, $color-text-d);
          }
        }
        .find-list-box{
          display: flex;
          /*margin: 1.2rem 1rem;*/
          flex-wrap: wrap;
          .shopLoading{
            margin: 1rem auto 0;
          }
          .find-list-item{
            flex: 0 0 47%;
            width: 47%;
            margin: 1rem 0 0 2%;
            /*margin-right*/
            overflow: hidden;
            flex-wrap: nowrap;
            text-align: left;
            .img{
              width: 100%;
              padding-top: 100%;
              position: relative;
              background: #eee;
              overflow: hidden;
              img{
                position: absolute;
                width: 100%;
              }
            }
            .name{
              width: 100%;
              @include sc(1.1rem, $color-text-a);
              @include no-wrap();
            }
            .state{
              width: 100%;
              @include sc(0.8rem, $color-text-c);
              @include no-wrap();
            }
            .price{
              width: 100%;
              @include sc(1.2rem, $color-price);
              @include no-wrap();
            }
            .tips{
              width: 100%;
              @include sc(0.8rem, $color-text-d);
              @include no-wrap();
              .icon{
                margin-right: 0.4rem;
              }
            }
          }
          .find-more{
            width: 100%;
            margin: 1rem 0;
            overflow: hidden;
            @include sc(0.8rem, $color-text-e);
            text-align: center;
          }
        }

      }
    }
  }
</style>
