<template>
  <transition name="login-fade">
    <div class="my-login">
      <div class="list-wrapper">
        <header-bar :text="loginWay ? '短信登录' : '密码登录'" :goClose="true">
          <div slot="changeLogin">
            <span @click="clickTop">{{ loginWay ? '密码登录' : '短信登录' }}</span>
          </div>
        </header-bar>
        <!--短信登录-->
        <form class="loginForm" v-show="loginWay">
          <section class="input-box">
            <input type="text" placeholder="请输入手机号" v-model="phoneNumber"/>
            <button @click.prevent="getVerifyCode" :class="{showPhoneBtn:rightPhoneNumber}" v-show="!waitTime">获取验证码</button>
            <button @click.prevent v-show="waitTime">已发送({{waitTime}}s)</button>
          </section>
          <section class="input-box">
            <input type="text" placeholder="验证码" v-model="VerifyCode"/>
          </section>
        </form>
        <!--密码登录-->
        <form class="loginForm" v-show="!loginWay">
          <section class="input-box">
            <input type="text" placeholder="手机/邮箱/用户名" v-model="userAccount"/>
          </section>
          <section class="input-box">
            <input type="text" placeholder="密码" v-model="userPwd"/>
          </section>
        </form>
        <p class="tips">温馨提示<a>用户服务协议</a></p>
        <div class="login_container" @click="mobileLogin">登录</div>
        <my-tips ref="confirmRef" @confirm="confirm" @cancel="cancel" :text="confirmText"></my-tips>
      </div>
    </div>
  </transition>
</template>
<script>
  import headerBar from '@/components/header/header'
  import MyTips from '@/components/common/MyTips'
  import { checkExsis, phoneLogin, accountLogin } from '@/api/getData.js'
  import { mapActions } from 'vuex'
  export default {
    components: {
      headerBar,
      MyTips
    },
    data () {
      return {
        icon: false,
        rightText: '密码登录',
        loginWay: true, // 登录方式，默认短信登录
        phoneNumber: '',  // 输入手机号码
        waitTime: 0, // 验证码倒计时
        VerifyCode: '', // 短信验证码
        userAccount: '', // 账户
        userPwd: '', // 账户密码
        confirmText: '', // 错误提示文本
        validate_code: '' // 账号验证码
      }
    },
    methods: {
      ...mapActions([
        'saveUser'
      ]),
      clickTop () {
        this.loginWay = !this.loginWay
//        console.log(this.loginWay)
      },
      async getVerifyCode () {
        if (this.rightPhoneNumber) {
          this.waitTime = 30
          let timer = setInterval(() => {
            this.waitTime --
            if (this.waitTime === 0) {
              clearInterval(timer)
            }
          }, 1000)
          let exist = await checkExsis(this.phoneNumber, 'mobile')
          if (exist.code === 500) {
            this.$refs.confirmRef.show()
            this.confirmText = '手机号未绑定！'
          }
        }
      },
      async mobileLogin () {
        if (this.loginWay) {
          if (!this.rightPhoneNumber) {
            this.$refs.confirmRef.show()
            this.confirmText = '手机号码不正确'
            // eslint-disable-next-line
            return
          } else if (!(/^\d{4}$/gi.test(this.VerifyCode))) {
            this.$refs.confirmRef.show()
            this.confirmText = '短信验证码不正确'
            // eslint-disable-next-line
            return
          }
          this.userInfo = await phoneLogin(this.VerifyCode, this.phoneNumber)
        } else {
          if (!this.userAccount) {
            this.$refs.confirmRef.show()
            this.confirmText = '账号不正确'
            // eslint-disable-next-line
            return
          } else if (!this.userPwd) {
            this.$refs.confirmRef.show()
            this.confirmText = '密码不正确'
            // eslint-disable-next-line
            return
          }
          this.userInfo = await accountLogin(this.userAccount, this.userPwd)
        }
        console.log(this.userInfo.user)
        if (!this.userInfo.user) {
          this.$refs.confirmRef.show()
          this.confirmText = '登录失败'
//          if (!this.loginWay) this.getCaptchaCode()
        } else {
          this.saveUser({
            key: 'loginUser',
            query: this.userInfo.user
          })
          this.$router.go(-1)
        }
      },
      confirm () {
        this.$refs.confirmRef.confirm()
      },
      cancel () {
        this.$refs.confirmRef.cancel()
      }
    },
    computed: {
      rightPhoneNumber () {
        return /^1\d{10}$/gi.test(this.phoneNumber)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .my-login{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: #f5f5f5;
    &.login-fade-enter-active, &.login-fade-leave-active {
      transition: opacity 0.3s;
      .list-wrapper {
        transition: all 0.3s;
      }
    }
    &.login-fade-enter, &.login-fade-leave-to {
      opacity: 0;
      .list-wrapper {
        transform: translate3d(0, 100%, 0);
      }
    }
    .loginForm{
      width: 100%;
      margin-top: 1rem;
      background: $color-white;
      .input-box{
        display: flex;
        height: 4rem;
        justify-content: space-between;
        padding: 0 1rem;
        border-bottom: 1px solid #eee;
        input{
          @include sc(1rem, #666);
          @include no-outline();
        }
        button{
          @include sc(1rem, #666);
          padding: 0 .4rem;
          margin: 1rem 0rem;
          border: 1px;
          border-radius: 0.15rem;
        }
        .showPhoneBtn{
          background: $color-theme;
          color: #fff;
        }
      }
    }
    .tips{
      @include sc(.5rem, #999);
      padding: .4rem .6rem;
      line-height: .5rem;
      a{
        color: #3b95e9;
      }
    }
    .login_container{
      margin: 1rem 1rem;
      padding: 1rem 1rem;
      text-align: center;
      border-radius: .4rem;
      background: $color-theme-a;
      color: $color-white;
    }
  }
</style>
