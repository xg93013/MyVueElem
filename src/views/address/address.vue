<template>
  <transition name="address-fade">
    <div class="my-address">
      <div class="list-wrapper">
        <header-bar :text="headerText" :goClose="true">
          <div slot="changeLogin">
            <router-link to="/address/addressAdd" tag="span">
              新增地址
            </router-link>
          </div>
        </header-bar>
        <my-scroll class="scroll-wrapper" ref="scrollRef" :refreshDelay="refreshDelay">
          <div class="scroll-list">
            <section class="select-box">
              <div class="select-city">
                <p>成都市</p>
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right"></use>
                </svg>
              </div>
              <my-search-box ref="searchBoxRef" @query="onQueryChange" class="search"></my-search-box>
            </section>
            <!--当前地址-->
            <section class="address-list">
              <p class="title">当前地址</p>
              <div class="address-item">
                <span class="text">{{ nowCity }}</span>
                <div class="find-pos">
                  <svg class="icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-setting"></use>
                  </svg>
                  <span>重新定位</span>
                </div>
              </div>
            </section>
            <!--收货地址-->
            <section class="address-list">
              <p class="title">收货地址</p>
              <div class="list-item">
                <p>长虹科技大厦</p>
                <div class="address-user">winfred-1345244934</div>
              </div>
            </section>
            <!--附近地址-->
            <section class="address-list">
              <p class="title">附近地址</p>
              <div class="list-item">
                <p>长虹科技大厦</p>
              </div>
              <div class="list-item">
                <p>长虹科技大厦</p>
              </div>
              <div class="list-item">
                <p>长虹科技大厦</p>
              </div>
            </section>
          </div>
        </my-scroll>
      </div>

      <transition name="router-slid" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </transition>
</template>
<script>
  import headerBar from '@/components/header/header'
  import MyScroll from '@/components/common/MyScroll'
  import MySearchBox from '@/components/common/MySearchBox'
  import { cityNow } from '@/api/getData.js'
  export default {
    components: {
      MyScroll,
      headerBar,
      MySearchBox
    },
    data () {
      return {
        headerText: '选择收货地址',
        query: '',
        nowCity: '',   // 当前城市
        guessCityid: '', // 当前城市id
        refreshDelay: 500,
        hotcity: []     // 热门城市列表
      }
    },
    mounted () {
      // 获取当前城市
      cityNow().then(res => {
        this.nowCity = res.address
      })
      setTimeout(() => {
        this.$refs.scrollRef.refresh()
      }, 500)
    },
    methods: {
      clickTop () {
        console.log('新增')
      },
      onQueryChange (query) {
        this.query = query
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import "~@/assets/scss/const.scss";
  @import "~@/assets/scss/mixin.scss";

  .my-address{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 99;
    background: #f5f5f5;
    &.address-fade-enter-active, &.address-fade-leave-active {
      transition: opacity 0.3s;
      .list-wrapper {
        transition: all 0.3s;
      }
    }
    &.address-fade-enter, &.address-fade-leave-to {
      opacity: 0;
      .list-wrapper {
        transform: translate3d(0, 100%, 0);
      }
    }
    .router-slid-enter-active, .router-slid-leave-active {
      transition: all .3s;
    }
    .router-slid-enter, .router-slid-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
    }
    .scroll-wrapper{
      position: absolute;
      /*height: 100%;*/
      width: 100%;
      top: 3rem;
      bottom: 0;
      overflow: hidden;
      .select-box{
        background: $color-theme;
        display: flex;
        padding: 0.4rem 1rem;
        align-items: center;
        .select-city{
          flex: 0 0 20%;
          width: 20%;
          text-align: center;
          display: flex;
          margin-right: 1rem;
          align-items: center;
          p{
            color: #fff;
            flex: 0 0 80%;
            width: 80%;
            @include no-wrap();
            font-size: 0.9rem;
            /*margin: 0 1rem;*/
          }
          .icon{
            flex: 0 0 20%;
            width: 20%;
            font-size: 0.6rem;
            fill: #fff;
          }
        }
        .search{
          flex: 1;
          background: #fff;
        }
      }
      .address-list{
        .title{
          @include sc(0.9rem, $color-text-b)
          margin: 0.4rem 0.8rem;
        }
        .address-item{
          background: $color-white;
          padding: 0.6rem 0.8rem;
          display: flex;
          justify-content: space-between;
          .text{
            flex: 1;
            @include sc(1rem, $color-text-b)
          }
          .find-pos{
            flex: 0 0 6rem;
            text-align: right;
            font-size: 0.9rem;
            @include no-wrap();
            .icon{
              fill: $color-theme;
            }
            span{
              color: $color-theme;
            }
          }
        }
        .list-item{
          background: $color-white;
          padding: 0.6rem 0.8rem;
          border-bottom: 1px solid #eee;
          @include no-wrap();
          p{
            @include sc(1rem, $color-text-b)
          }
          .address-user{
            @include sc(0.9rem, $color-text-d)
          }
        }
      }
    }

  }
</style>
