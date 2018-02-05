<template>
  <div class="my-user">
    <header-bar :text="headerText" :icon="icon" :iconClass="iconClass">
      <div slot="userSetting">
        <svg class="icon icon-setting">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-setting"></use>
        </svg>
      </div>
    </header-bar>
    <my-scroll ref="scrollRef" class="userScroll">
      <div>
        <section class="user-profile">
          <router-link to="/login" tag="div" class="user-info">
            <img :src="imgBaseUrl + userInfo.avatar" class="img" v-if="userInfo&&userInfo.user_id">
            <span class="img" v-else>
              <svg class="icon img">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-avatar"></use>
              </svg>
            </span>
            <div class="text">
              <h3>{{ username }}</h3>
              <p>{{ mobile }}</p>
            </div>
            <div class="icon-right">
              <svg class="icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right"></use>
              </svg>
            </div>
          </router-link>
        </section>
        <section class="info-data">
          <ul class="clear">
            <router-link to="" tag="li" class="info-data-link">
              <span class="info-data-top"><b>0</b>元</span>
              <span class="info-data-bottom">我的余额</span>
            </router-link>
            <router-link to="" tag="li" class="info-data-link">
              <span class="info-data-top"><b>0</b>个</span>
              <span class="info-data-bottom">我的优惠</span>
            </router-link>
            <router-link to="" tag="li" class="info-data-link">
              <span class="info-data-top"><b>0</b>分</span>
              <span class="info-data-bottom">我的积分</span>
            </router-link>
          </ul>
        </section>
        <section class="profile-nav">
          <router-link to="" class="nav-item">
            <aside>
              <svg class="icon theme-color">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-address"></use>
              </svg>
            </aside>
            <div class="item-box">
              <div class="name">收货地址</div>
              <div class="icon-right">
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right"></use>
                </svg>
              </div>
            </div>
          </router-link>
          <router-link to="" class="nav-item">
            <aside>
              <svg class="icon icon-collection">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-collection"></use>
              </svg>
            </aside>
            <div class="item-box" style="border-bottom: 0">
              <div class="name">我的收藏</div>
              <div class="icon-right">
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right"></use>
                </svg>
              </div>
            </div>
          </router-link>
        </section>
        <section class="profile-nav">
          <router-link to="" class="nav-item">
            <aside>
              <svg class="icon icon-store">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-store"></use>
              </svg>
            </aside>
            <div class="item-box">
              <div class="name">金币商城</div>
              <div class="icon-right">
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right"></use>
                </svg>
              </div>
            </div>
          </router-link>
        </section>
        <section class="profile-nav">
          <router-link to="" class="nav-item">
            <aside>
              <svg class="icon theme-color">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-phone"></use>
              </svg>
            </aside>
            <div class="item-box">
              <div class="name">我的客服</div>
              <div class="icon-right">
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right"></use>
                </svg>
              </div>
            </div>
          </router-link>
          <router-link to="" class="nav-item">
            <aside>
              <svg class="icon theme-color">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-score"></use>
              </svg>
            </aside>
            <div class="item-box">
              <div class="name">我的评分</div>
              <div class="icon-right">
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right"></use>
                </svg>
              </div>
            </div>
          </router-link>
          <router-link to="" class="nav-item">
            <aside>
              <svg class="icon theme-color">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-join"></use>
              </svg>
            </aside>
            <div class="item-box" style="border-bottom: 0">
              <div class="name">加盟合作</div>
              <div class="icon-right">
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right"></use>
                </svg>
              </div>
            </div>
          </router-link>
        </section>
      </div>
    </my-scroll>
  </div>
</template>
<script>
  import MyScroll from '@/components/common/MyScroll'
  import headerBar from '@/components/header/header'
  import { mapGetters } from 'vuex'
  import { imgBaseUrl } from '@/api/env.js'
  export default {
    components: {
      MyScroll,
      headerBar
    },
    data () {
      return {
        headerText: '我的',
        icon: true,
        iconClass: 'setting',
        username: '',
        mobile: '',
        imgBaseUrl
      }
    },
    mounted () {
      this.initData()
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      initData () {
        if (this.userInfo && this.userInfo.user_id) {
          this.username = this.userInfo.username
          this.mobile = this.userInfo.phoneNum
        } else {
          this.username = '立即登录'
          this.mobile = '登录后可享受等多特权'
        }
      }
    },
    watch: {
      userInfo () {
        this.initData()
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .my-user{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    .userScroll{
      position: absolute;
      width: 100%;
      top: 3rem;
      bottom: 3rem;
      overflow: hidden;
      .user-info{
        padding: 1rem;
        display: flex;
        background: $color-theme;
        color: $color-white;
        align-items: center;
        .img{
          flex: 0 0 3rem;
          width: 3rem;
          display:inline-block;
          @include wh(3rem,3rem);
          border-radius: 50%;
        }
        .text{
          flex: 1;
          color: #fff;
          margin-left: 1rem;
          h3{
            color: #fff;
            font-size: 1.1rem;
          }
          p{
            color: #fff;
            font-size: 0.7rem;
            margin-top:0.2rem;
          }
        }
        .icon{
          fill: $color-white;
        }
      }
      .info-data{
        width: 100%;
        background: $color-white;
        box-sizing: border-box;
        padding: 1rem 0;
        .clear{
          display: flex;
          .info-data-link{
            flex: 1;
            text-align: center;
            span{
              display: block;
              width: 100%;
            }
          }
        }
      }
      .profile-nav{
        background: $color-white;
        margin-top: 0.8rem;
        .nav-item{
          display: flex;
          align-items: center;
          aside{
            flex: 0 0 3rem;
            text-align: center;
            font-size: 1.2rem;
            .theme-color{
              fill: $color-theme;
            }
            .icon-collection{
              fill: #F97D4F;
            }
            .icon-store{
              fill: #91DA4D;
            }
          }
          .item-box{
            flex: 1;
            display: flex;
            padding: 1rem 0;
            border-bottom: 1px solid #eee;
            .name{
              flex: 1;
            }
            .icon-right{
              font-size: 1rem;
              flex: 0 0 2rem;
              .icon{
                fill: #ccc;
              }
            }
          }
        }
      }
    }
  }

</style>
