<template>
  <div class="home">
    <my-scroll class="homeScroll" ref="scrollRef" :probeType="probeType" :refreshDelay="refreshDelay" :listen-scroll="listenScroll" @scroll="scroll">
      <div class="list-scroll">
        <section class="home-top">
          <div class="top-address" ref="topRefs">
            <router-link to="/address" tag="div" class="address-box">
              <svg class="icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-address"></use>
              </svg>
              <div class="text">祥和佳苑</div>
              <svg class="icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right"></use>
              </svg>
            </router-link>
            <div class="weather-box">
              <P class="text">15°</P>
              <p class="little-text">多云天</p>
            </div>
          </div>
          <transition>
            <router-link to="/search">
              <div class="search-box" ref="searchBoxRef">
                <my-search-box @query="onQueryChange" class="searchClass"></my-search-box>
              </div>
            </router-link>
          </transition>
        </section>
        <section class="type-tab">
          <div class="type-icon swiper-container" id="swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide type-icon-box" v-for="(item, index) in foodTypes" :key="index">
                <div class="type-icon-item" v-for="foodItem in item" :key="foodItem.id">
                  <img v-lazy="imgBaseUrl + foodItem.image_url"/>
                  <p>{{ foodItem.title }}</p>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </section>
        <!-- 推荐商品  -->
        <section class="home-list">
          <div class="list-title">
            <h3>推荐商家</h3>
          </div>
        </section>
        <section class="sort-box" ref="sortRef">
          <my-sort @chooseSort="chooseSort" :scrollY="scrollY" :sortHeight="sortHeight" :topHeight="searchHeight"></my-sort>
        </section>
        <section class="shop-box">
          <my-loading v-show="showLoading" class="shopLoading"></my-loading>
          <my-shop-list :searchGroup="searchGroup" :shopList="shopList"></my-shop-list>
        </section>
        <div class="back-cover" v-show="showCover"></div>
      </div>

    </my-scroll>
    <!--<div class="searchBox" v-show="showSearch">-->
      <!--<my-search-box @query="onQueryChange"></my-search-box>-->
    <!--</div>-->

    <!--热门城市-->
  </div>


</template>
<script>
  import headerBar from '@/components/header/header'
  import MySearchBox from '@/components/common/MySearchBox'
  import MyScroll from '@/components/common/MyScroll'
  import MyLoading from '@/components/common/MyLoading'
  import MySlider from '@/components/common/MySlider'
  import MySort from '@/components/common/MySort'
  import MyShopList from '@/components/common/MyShopList'
  import { getFoodType, shopList } from '@/api/getData.js'
  import { imgBaseUrl } from '@/api/env.js'
  import Swiper from 'swiper/dist/js/swiper.js'
//  import Swiper from "@/assets/js/swiper-3.4.2.min.js"
  import 'swiper/dist/css/swiper.min.css'
  export default {
    components: {
      headerBar,
      MySearchBox,
      MySlider,
      MyScroll,
      MyLoading,
      MySort,
      MyShopList
    },
    data () {
      return {
        query: '',
        scrollY: 0,
        searchHeight: 0, // 搜索框高度
        sortHeight: 0, // 条件选择固定需要高度
        topHeight: 0, // 搜索框固定需要滚动高度
        sortBy: '', // 排序方式
        foodTypes: '', // 食品分类
        showCover: false, // 遮罩层
        showLoading: true, // 加载中
        searchGroup: [], // 查询条件
        shopList: [], // 商店列表
        refreshDelay: 1100,
        imgBaseUrl
      }
    },
    mounted () {
      // 食品分类
      getFoodType().then((res) => {
        let resLength = res.data.length
        let resArr = [...res.data] // 返回一个新的数组
        let foodArr = []
        for (let i = 0, j = 0; i < resLength; i += 10, j++) {
          foodArr[j] = resArr.splice(0, 10)
        }
        this.foodTypes = foodArr
      }).then(() => {
        // eslint-disable-next-line
        new Swiper('#swiper', {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          speed: 200,
          autoplay: '3000',
          disableOnInteraction: false,
          autoplayDisableOnInteraction: false,
          observer: true, // 修改swiper自己或子元素时，自动初始化swiper
          observeParents: true // 修改swiper的父元素时，自动初始化swiper
        })
      })
      shopList().then((res) => {
        this.showLoading = false
        this.shopList = res.data
      })
      setTimeout(() => {
        this.calTopHeight()
      }, 20)
    },
    created () {
      this.listenScroll = true
      this.probeType = 3
    },
    methods: {
      onQueryChange (query) {
        this.query = query
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      calTopHeight () {
        // 搜索框的高度
        this.searchHeight = this.$refs.searchBoxRef.clientHeight
        // 搜索框固定需要高度
        this.topHeight = this.$refs.topRefs.clientHeight
        // 条件选择固定需要高度
        this.sortHeight = this.$refs.sortRef.offsetTop - this.searchHeight
      },
      // 选择分类
      chooseSort (sort) {
        this.sortBy = sort
        if (this.sortBy !== '') {
          this.showCover = true
        } else {
          this.showCover = false
        }
      },
      hideCover () {
        this.showCover = false
      }
    },
    computed: {},
    watch: {
      scrollY (newY) {
        let mathY = -newY
        if (mathY >= this.topHeight) {
          this.$refs.searchBoxRef.style.position = 'absolute'
          this.$refs.searchBoxRef.style.top = `${mathY}px`
        } else {
          this.$refs.searchBoxRef.style.position = 'static'
        }
        if (mathY >= this.sortHeight) {
          this.$refs.sortRef.style.position = 'fixed'
          this.$refs.sortRef.style.top = `${mathY + this.searchHeight}px`
        } else {
          this.$refs.sortRef.style.position = 'static'
        }
      },
      sortBy (newV) {
        if (newV !== '' && -this.scrollY <= this.sortHeight) {
          this.$refs.scrollRef.scrollTo(0, -this.sortHeight, 300)
          this.$refs.searchBoxRef.style.zIndex = 99
          this.$refs.sortRef.style.zIndex = 999
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '~@/assets/scss/common.scss';
  @import "~@/assets/scss/const.scss";
  @import "~@/assets/scss/mixin.scss";
  .home{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 3rem;
    .homeScroll{
      position: relative;
      height: 100%;
      overflow: hidden;
      .home-top{
        background: $color-theme;
        overflow: hidden;
        height: 6rem;
        .top-address{
          padding: 0.4rem 1rem 0;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          .address-box{
            /*position: absolute;*/
            /*left: 1rem;*/
            display: flex;
            align-items: center;
            .icon{
              flex: 1;
              fill: #fff;
            }
            .text{
              flex: 1;
              font-size: 1.1rem;
              white-space: nowrap;
              margin: 0 0.6rem;
              color: #fff;
            }
          }
          .weather-box{
            /*position: absolute;*/
            /*right: 0;*/
            text-align: right;
            .text{
              color: #fff;
              font-size: 1rem;
            }
            .little-text{
              color: #fff;
              font-size: 0.6rem;
            }
          }
        }
        .search-box{
          width: 100%;
          padding: 0.6rem 1rem;
          background: $color-theme;
          z-index: 99;
          .searchClass{
            background: #fff;
          }
        }
      }
      .type-tab{
        .type-icon{
          width: 100%;
          overflow: hidden;
          .type-icon-box{
            width: 100%;
            display: flex;
            overflow: hidden;
            padding-bottom: 1.4rem;
            flex-wrap: wrap;
            .type-icon-item{
              flex: 0 0 20%;
              width: 20%;
              margin: 1rem 0 0;
              text-align: center;
              img {
                width: 70%;
              }
              p{
                font-size: 0.9rem;
              }
            }
          }
          .swiper-pagination{
            position: absolute;
            z-index: 20;
            bottom: 0;
            width: 100%;
            text-align: center;
          }
          .swiper-pagination-switch {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 8px;
            background: #555;
            margin: 0 5px;
            opacity: 0.8;
            border: 1px solid #fff;
            cursor: pointer;
          }
          .swiper-active-switch {
            background: #fff;
          }
        }
      }
      .home-list{
        background: #fff;
        overflow: hidden;
        .list-title{
          overflow: hidden;
          text-align: center;
          margin: 1rem 0 1rem;
        }
      }
      .sort-box{
        position: static;
        z-index: 99;
        width: 100%;
        .list-choice{
          display: flex;
          .choice-item{
            flex: 1;
            span{
              font-size: 0.9rem;
            }
          }
        }
      }
      .shop-box{
        background: #fff;
        overflow: hidden;
        .shopLoading{
          margin: 6rem auto 0;
        }
      }
    }
    .back-cover{
      position: absolute;
      top: 0;
      bottom: 0;
      /*height: 100%;*/
      @include wh(100%, 100%);
      z-index: 10;
      background-color: rgba(0,0,0,0.3);
    }
  }
</style>
