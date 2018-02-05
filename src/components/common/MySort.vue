<template>
  <div class="shop-list">
    <section class="shop-sort" ref="sortRefs">
      <!-- 综合排序 -->
      <div class="sort-item">
        <div class="item-box" @click="chooseSort('sum')" :class="{chooseSort : sortBy === 'sum'}">
          <span :class="{chooseSpan : sortBy === 'sum'}">综合排序</span>
          <svg class="icon" :class="{chooseIcon : sortBy === 'sum'}">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-down"></use>
          </svg>
        </div>
        <transition name="showlist">
          <div class="sort-list"  v-show="sortBy === 'sum'">
            <ul class="sum-list">
              <li v-for="item in sortList.sortitem">{{ item.title }}</li>
            </ul>
          </div>
        </transition>
      </div>
      <!-- 好评优先 -->
      <div class="sort-item">
        <div class="item-box" @click="chooseSort('evaluate')" :class="{chooseSort : sortBy === 'evaluate'}">
          <span :class="{chooseSpan : sortBy === 'evaluate'}">好评优先</span>
        </div>
      </div>
      <!-- 距离最近 -->
      <div class="sort-item">
        <div class="item-box" @click="chooseSort('distance')" :class="{chooseSort : sortBy === 'distance'}">
          <span :class="{chooseSpan : sortBy === 'distance'}">距离最近</span>
        </div>
      </div>
      <!-- 筛选 -->
      <div class="sort-item">
        <div class="item-box" @click="chooseSort('choice')" :class="{chooseSort : sortBy === 'choice'}">
          <span :class="{chooseSpan : sortBy === 'choice'}">筛选</span>
          <svg class="icon" :class="{chooseIcon : sortBy === 'choice'}">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-choice"></use>
          </svg>
        </div>
        <transition name="showlist">
          <my-scroll class="sortScroll">
            <div class="sort-list nobackground" v-show="sortBy === 'choice'">
              <div v-for="choiceitem in sortList.choiceitem">
                <div class="choice-title">{{ choiceitem.title }}</div>
                <ul class="choice-item">
                  <li class="item-item" v-for="item in choiceitem.item">
                    <img class="img" :src="imgBaseUrl + item.img" v-if="item.img"/>
                    <span>{{ item.name }}</span>
                  </li>
                  <li>xasfasf</li>
                  <li>xasfasf</li>
                  <li>xasfasf</li>
                  <li>xasfasf</li>
                  <li>xasfasf</li>
                </ul>
              </div>
              <div class="select-btn">
                <span class="clear-choice">清空</span>
                <span class="select-ok">确定</span>
              </div>
            </div>
          </my-scroll>
        </transition>
      </div>
    </section>
  </div>
</template>
<script>
  import MyScroll from '@/components/common/MyScroll'
  import { sortList } from '@/api/getData.js'
  import { imgBaseUrl } from '@/api/env.js'
  export default {
    components: {
      MyScroll
    },
    data () {
      return {
        sortBy: '', // 排序方式
        sortList: '',
        imgBaseUrl
      }
    },
    methods: {
      chooseSort (sort) {
        if (this.sortBy !== '') {
          if (this.sortBy === sort) {
            this.sortBy = ''
          } else {
            this.sortBy = sort
          }
        } else {
          this.sortBy = sort
        }
        this.$emit('chooseSort', this.sortBy)
      }
    },
    mounted () {
      sortList().then((res) => {
        this.sortList = res.data
      })
    },
    props: {
      scrollY: {
        type: Number,
        default: 0
      },
      sortHeight: {
        type: Number,
        default: 0
      },
      topHeight: {
        type: Number,
        default: 0
      }
    },
    watch: {
      sortBy (newV) {
        if (newV !== '') {
          this.$emit('chooseSort', newV)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .shop-list{
    /*position: static;*/
    /*left: 0;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*right: 0;*/
    width: 100%;
    .shop-sort{
      height: 3rem;
      background-color: #fff;
      border-bottom: 0.025rem solid #f1f1f1;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      .sort-item{
        flex: 0 0 25%;
        width: 25%;
        text-align: center;
        .item-box{
          @include sc(0.85rem, #444);
          line-height: 3rem;
          .showlist-enter-active, .showlist-leave-active {
            transition: all .3s;
            transform: translateY(0);
          }
          .showlist-enter, .showlist-leave-active {
            opacity: 0;
            transform: translateY(-100%);
          }
        }
        .sort-list{
          width: 100%;
          position: absolute;
          top: 3rem;
          left: 0;
          border-top: 0.025rem solid $bc;
          background-color: #fff;
          .sum-list{
            width: 100%;
            li{
              width: 100%;
              @include sc(0.8rem, $color-text-a);
              padding: 0.6rem 0.8rem;
              text-align: left;
            }
          }
          .choice-title{
            width: 100%;
            text-align: left;
            padding: 0.4rem;
            font-size: 0.9rem;
            overflow: hidden;
          }
          .choice-item{
            width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            background: $color-white;
            text-align: center;
            border-top: 1px solid $color-border-a;
            li{
              flex: 0 0 33.3333%;
              width: 33.3333%;
              padding: 0.6rem 0;
              text-align: center;
              font-size: 0.8rem;
              border-right: 1px solid $color-border-a;
              border-bottom: 1px solid $color-border-a;
              .img{
                width: 1rem;
                /*margin: 0 0.4rem 0 0;*/
              }
            }

          }
          .select-btn{
            display: flex;
            margin-top: 1rem;
            line-height: 3rem;
            .clear-choice{
              flex: 0 0 50%;
              @include wh(50%, 3rem);
              text-align: center;
            }
            .select-ok{
              flex: 0 0 50%;
              background: $color-button;
              color: $color-white;
              @include wh(50%, 3rem);
              text-align: center;
            }
          }
        }
        .nobackground{
          background: $theme-background;
        }
        .sortScroll{
          height: 60%;
          overflow: hidden;
        }
        .chooseSort{
          .chooseSpan{
            color: $color-theme;
          }
          .chooseIcon{
            fill: $color-theme;
          }
        }
      }
    }
  }
</style>
