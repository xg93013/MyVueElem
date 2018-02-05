<template>
    <div class="add-address">
      <header-bar :text="headerText" :goBack="true"></header-bar>
      <my-scroll class="scroll-wrapper">
        <div class="list-wrapper">
          <section class="address-list">
            <div class="address-item noborder">
              <span class="title">联系人</span>
              <input class="input" placeholder="姓名" />
            </div>
            <div class="address-item">
              <span class="title"></span>
              <div class="input">
                <span :class="userIdentity === 'male' ? 'radio-item-active' : 'radio-item'" @click="changeIdentity('male')">先生</span>
                <span :class="userIdentity === 'female' ? 'radio-item-active' : 'radio-item'" @click="changeIdentity('female')">女士</span>
              </div>
            </div>
            <div class="address-item">
              <span class="title">电话</span>
              <input class="input" placeholder="手机号码" />
              <div class="icon-box">
                <svg class="icon icon-setting">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-setting"></use>
                </svg>
                <span>通讯录</span>
              </div>
            </div>
            <div class="address-item">
              <span class="title">地址</span>
              <input class="input" placeholder="选择收货地址" />
              <div class="icon-box">
                <svg class="icon icon-setting">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right"></use>
                </svg>
              </div>
            </div>
            <div class="address-item">
              <span class="title">门牌号</span>
              <input class="input" placeholder="例：5号楼203室" />
            </div>
            <div class="address-item">
              <span class="title">标签</span>
              <div class="input">
                <span :class="userTab === 'home' ? 'radio-item-active' : 'radio-item'" @click="changeUserTab('home')">家</span>
                <span :class="userTab === 'company' ? 'radio-item-active' : 'radio-item'" @click="changeUserTab('company')">公司</span>
                <span :class="userTab === 'school' ? 'radio-item-active' : 'radio-item'" @click="changeUserTab('school')">学校</span>
              </div>
            </div>
          </section>
          <section class="subButton">
            <button class="">确定</button>
          </section>
        </div>
      </my-scroll>
    </div>
</template>
<script>
  import headerBar from '@/components/header/header'
  import MyScroll from '@/components/common/MyScroll'
  export default {
    components: {
      MyScroll,
      headerBar
    },
    data () {
      return {
        headerText: '新增地址', // 标题
        isEdit: false, // 是否可编辑
        userName: '', // 联系人
        userIdentity: '', // 身份
        userPhone: '', // 电话
        userAddress: '', // 电话
        userDoorNum: '', // 门牌号
        userTab: '' // 标签
      }
    },
    created () {},
    methods: {
      changeIdentity (item) {
        if (this.userIdentity === '') {
          this.userIdentity = item
        } else {
          if (this.userIdentity === item) {
            this.userIdentity = ''
          } else {
            this.userIdentity = item
          }
        }
      },
      changeUserTab (item) {
        if (this.userTab === '') {
          this.userTab = item
        } else {
          if (this.userTab === item) {
            this.userTab = ''
          } else {
            this.userTab = item
          }
        }
      }
    },
    computed: {
      getIdentity () {
        if (this.userIdentity === 'male') {
          return 'radio-item'
        } else {}
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .add-address{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    background: $theme-background;
    &.fade-enter-active, &.fade-leave-active {
      transition: opacity 0.3s;
      .list-wrapper {
        transition: all 0.3s;
      }
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
      .list-wrapper {
        transform: translate3d(100%, 0, 0);
      }
    }
    .scroll-wrapper{
      position: absolute;
      width: 100%;
      top: 3rem;
      bottom: 0;
      overflow: hidden;
      .address-list{
        background: $color-white;
        margin: 0.6rem 0;
        overflow: hidden;
        .address-item{
          display: flex;
          align-items: center;
          padding: 1rem 0;
          margin: 0 0 0 1rem;
          border-bottom: 1px solid $color-border-a;
          .title{
            flex: 0 0 5rem;
            width: 5rem;
            font-size: 0.9rem;
          }
          .input{
            flex: 1;
            font-size: 0.9rem;
            color: $color-text-a;
            span{
              font-size: 0.8rem;
              border-radius: 0.2rem;
              padding: 0.1rem 0.4rem;
              color: $color-text-a;
            }
            .radio-item{
              border: 1px solid $color-border-a;
            }
            .radio-item-active{
              color: $color-theme;
              border: 1px solid $color-theme;
            }
          }
          .icon-box{
            flex: 0 0 5rem;
            text-align: right;
            width: 5rem;
            padding-right: 1rem;
            .icon-add{
              fill: $color-theme;
            }
            span{
              font-size: 0.8rem;
              color: $color-theme;
            }
          }
        }
        .noborder{
          border-bottom: 0;
        }
      }
      .subButton{
        /*width: 100%;*/
        margin: 1rem 1rem;
        button{
          display: block;
          width: 100%;
          background: $color-button;
          color: $color-white;
          border-radius: 0.4rem;
          padding: 1rem 0;
        }
      }
    }
  }
</style>
