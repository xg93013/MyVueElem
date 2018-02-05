<template>
  <div class="my-search">
    <section class="search-top">
      <div class="back" v-show="!showCancel" @click="$router.go(-1)">
        <svg class="icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-back"></use>
        </svg>
      </div>
      <div class="search-box" @click="blur">
        <my-search-box @query="onQueryChange" ref="searchRefs"></my-search-box>
      </div>
      <div class="cancel" v-show="showCancel"><span @click="cancel">取消</span></div>
    </section>

    <section class="search-wrapper" v-show="!query">
      <my-scroll class="scroll-wrapper" :data="searchHistory" ref="scrollRef">
        <div class="scroll-list">
          <!--搜索历史-->
          <div class="list">
            <div class="title">
              <span class="title-text">搜索历史</span>
              <span class="clear" @click="clearHis">
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-delete"></use>
                </svg>
              </span>
            </div>
            <div class="history-list" v-show="searchHistory">
              <ul>
                <li v-for="item in searchHistory" class="item" @click="selectHistory(item)">{{ item }}</li>
              </ul>
            </div>
          </div>
          <!--热门搜索-->
          <div class="list">
            <div class="title">
              <span class="title-text">热门搜索</span>
            </div>
            <div class="history-list" >
              <ul>
                <li v-for="item in hotSearch" class="item" @click="selectHistory(item.name)">{{ item.name }}</li>
              </ul>
            </div>
          </div>
        </div>
      </my-scroll>
    </section>
    <!-- 搜索结果 -->
    <section class="search-wrapper" v-show="query">
      <my-scroll class="scroll-wrapper">
        <div class="scroll-list">
          <div class="result-list" @click="selectItem" v-for="item in searchResult">
            <div class="img"><img :src="imgBaseUrl + item.shopUrl"></div>
            <div class="des">
              <p class="name">{{ item.shopName }}</p>
              <div class="tips">
                <span>评分：{{ item.shopState.stateScore }}分</span>
                <span>月售：{{ item.shopState.stateOrder }}单</span>
                <span>{{ item.position.distance }}公里</span>
              </div>
            </div>
          </div>
        </div>
      </my-scroll>
    </section>
  </div>
</template>
<script>
  import MyScroll from '@/components/common/MyScroll'
  import MySearchBox from '@/components/common/MySearchBox'
  import { mapActions, mapGetters } from 'vuex'
  import { imgBaseUrl } from '@/api/env.js'
  import { searchShop, hotSearch } from '@/api/getData.js'
  export default {
    components: {
      MyScroll,
      MySearchBox
    },
    data () {
      return {
        query: '',
        showCancel: false,
        key: 'searchkey',
        searchResult: [],
        hotSearch: [],
        imgBaseUrl
      }
    },
    watch: {
      query (newv) {
        searchShop(newv).then((res) => {
          this.searchResult = res.data
        })
        if (!newv) {
          setTimeout(() => {
            this.$refs.scrollRef.refresh()
          }, 20)
        }
      }
    },
    created () {
      hotSearch().then((res) => {
        this.hotSearch = res.data
      })
    },
    computed: {
      ...mapGetters(['searchHistory'])
    },
    methods: {
      ...mapActions(['saveHistory', 'clearHistory']),
      blur () {
        this.showCancel = true
      },
      selectItem () {
        this.saveHis()
      },
      selectHistory (item) {
        this.$refs.searchRefs.getQuery(item)
      },
      onQueryChange (query) {
        this.query = query
      },
      cancel () {
        this.showCancel = false
      },
      clearHis () {
        this.clearHistory(this.key)
      },
      saveHis () {
        this.saveHistory({
          key: this.key,
          query: this.query
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .my-search{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: $color-white;
    .search-top{
      display: flex;
      align-items: center;
      padding: 0.6rem;
      .back{
        flex: 0 0 2rem;
      }
      .search-box{
        flex: 1;
        background: $theme-background;
      }
      .cancel{
        flex: 0 0 3rem;
        text-align: center;
      }
    }
    .search-wrapper{
      position: absolute;
      width: 100%;
      top: 3rem;
      bottom: 0;
      padding: 0 0.8rem;
      .scroll-wrapper{
        height: 100%;
        overflow: hidden;
        .scroll-list{
          .list{
            .title{
              display: flex;
              margin-top: 1rem;
              .title-text{
                flex: 1;
                @include sc(1.1rem, $color-text-b);
                font-weight: bold;
              }
              .clear{
                flex: 1;
                text-align: right;
              }
            }
            .history-list{
              /*margin-top: 1rem;*/
              .item{
                display: inline-block;
                padding: 0.4rem 0.8rem;
                @include sc(1rem, $color-text-c);
                border-radius: 0.2rem;
                background: $theme-background;
                margin: 0.6rem 0.6rem 0 0;
              }
            }
          }
          .result-list{
            display: flex;
            border-bottom: 1px solid $color-border-a;
            padding: 0.6rem 0;
            margin: 0 0.6rem;
            .img{
              flex: 0 0 3rem;
              width: 3rem;
              img{
                width: 100%;
              }
            }
            .des{
              flex: 1;
              margin-left: 1rem;
              .name{
                @include no-wrap();
                @include sc(1.2rem, $color-text-a)
              }
              .tips{
                @include no-wrap();
                span{
                  @include sc(0.8rem, $color-text-d)
                }
              }
            }
          }
        }
      }
    }
  }
</style>
