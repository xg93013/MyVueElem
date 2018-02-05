<template>
  <transition name="findlist">
    <div class="my-find-list">
      <header-bar :text="headerText" :goBack="true"></header-bar>
      <my-scroll ref="scrollRef" class="scroll-wrapper" :refreshDelay="refreshDelay">
        <div class="scroll-list">
          <section class="find-list">
            <div class="find-list-box">
              <my-loading v-show="showLoading" class="shopLoading"></my-loading>
              <div class="find-list-item" v-for="(item, index) in foodList">
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

              </div>
            </div>
          </section>
        </div>
      </my-scroll>
    </div>
  </transition>
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
        headerText: '为您推荐',
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
  .findlist-enter-active, .findlist-leave-active {
    transition: all 0.3s;
  }
  .findlist-enter, .findlist-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .my-find-list{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background: #fff;
    .scroll-wrapper{
      position: absolute;
      width: 100%;
      top: 3rem;
      bottom: 3rem;
      overflow: hidden;
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
            margin: 10rem auto 0;
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
