<template>
  <div class="my-goods" ref="boxRefs">
    <div class="food-type">
      <my-scroll class="left-wrapper" ref="leftScroll" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
        <div class="left-box" ref="menuRefs">
          <ul class="menu-list">
            <li v-for="(item, index) in goodsType" :class="{'current': currentIndex === index}" @click="changeIndex(index)">{{ item }}</li>
          </ul>
        </div>
      </my-scroll>
    </div>
    <!--商品列表-->
    <div class="food-list">
      <my-scroll class="right-wrapper" ref="rightScroll" :listenScroll="listenScroll" @scroll="rightscroll" :probeType="probeType">
        <div class="right-box">
          <div class="type-list" v-for="item in goodsList" ref="goodsRefs">
            <h5 class="title"><span>{{ item.title }}</span>大家喜欢吃，才是真好吃</h5>
            <div class="item" v-for="gooditem in item.items">
              <div class="img"><img :src="imgBaseUrl + gooditem.foodUrl"></div>
              <div class="des">
                <div class="name">{{ gooditem.foodName }}</div>
                <div class="state">月售{{ gooditem.foodState.sale }}， 好评率{{ gooditem.foodState.evaluation }}</div>
                <div class="price">￥{{ gooditem.foodChoose[0].price }}</div>
                <div class="count">
                  <my-shop-count :good='gooditem' :shopId="shopId" @add="addShopCart" @minus="decreaseCart"></my-shop-count>
                </div>
              </div>
            </div>
          </div>
        </div>
      </my-scroll>
    </div>
    <!--choice-mask-->
    <div class="choice-mask" v-show="showChoice"></div>
    <!--商品规格-->
    <div class="food-choice" v-show="showChoice">
      <div class="choice-title">
        <span>{{ selectGood.foodName }}</span>
        <div class="close-choice" @click="closeChoice">
          <svg class="icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
      <div class="choice-box">
        <p class="title">规格</p>
        <ul class="choice-list">
          <li class="item" v-for="(item, index) in selectGood.foodChoose" :key="item.id" :class="{'native': index === currentType }" @click="choiceChoiceType(index)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="choice-price">
        <span class="money">￥{{ selectGood.typePrice }}</span>
        <span class="go-ok" @click="addToCart">选好了</span>
      </div>
    </div>
    <!--购物车结算-->
    <div class="food-cart" @click="toggleShowList">
      <div class="img"></div>
      <div class="text">
        <p>
          <span v-if="this.cartList.goodsList.length === 0">未选购商品</span>
          <span v-if="this.cartList.goodsList.length !== 0" class="high-price">￥{{ cartTotalMoney }}</span>
        </p>
        <p class="little">另需配送费{{ shopInfo.packet.money }}元</p>
      </div>
      <div class="price">
        <!--<span class="text">￥20起送</span>-->
        <button class="go-cart-gray" v-if="this.cartList.goodsList.length === 0">￥20起送</button>
        <router-link to="/shopcart" tag="button" class="go-cart" @click.stop.prevent="goCart" v-if="this.cartList.goodsList.length !== 0" replace>去结算</router-link>
        <!--<button class="go-cart" ></button>-->
      </div>
    </div>
    <!--购物车列表-->
    <div class="food-cart-list" v-show="showLists">
      <div class="list-header">
        <h1 class="title">
          <span class="text">已选商品</span>
          <div class="clear" @click="showConfirm">
            <svg class="icon">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-delete"></use>
            </svg>
            <span>清空</span></div>
        </h1>
      </div>
      <!-- 中部列表 -->
      <my-scroll ref="listScrollRef" class="list-content" :refreshDelay="refreshDelay">
        <div class="scroll-list">
          <transition-group name="list" tag="ul" class="list-box">
            <li :key="item.id" class="item" ref="listRef" v-for="(item, index) in cartList.goodsList">
              <div class="name">
                <p>{{ item.foodName }}</p>
                <p class="type">{{ item.typeName }}</p>
              </div>
              <div class="price">￥{{ item.totalPrice }}</div>
              <div class="count">
                <my-shop-count :good="item" :shopId="shopId" @add="addShopCart" @minus="decreaseCart"></my-shop-count>
              </div>
            </li>
          </transition-group>
          <div class="pack-money">
            <span class="name">餐盒费</span>
            <span class="money">￥{{ shopInfo.packet.box }}</span>
          </div>
        </div>
      </my-scroll>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideLists" v-show="showLists"></div>
    </transition>
    <my-confirm :text="conformText" @confirm="confirmClear" ref="confirmRefs"></my-confirm>
  </div>
</template>
<script>
  import MyScroll from '@/components/common/MyScroll'
  import MyShopCount from '@/components/common/MyShopCount'
  import MyConfirm from '@/components/common/MyConfirm'
  import { imgBaseUrl } from '@/api/env.js'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { shopGoods, searchShopById } from '@/api/getData.js'
  import '@/assets/js/jsFloatComputer'
  export default {
    components: {
      MyScroll,
      MyShopCount,
      MyConfirm
    },
    data () {
      return {
        listenScroll: true,
        leftScrollY: 0,
        probeType: 1,
        refreshDelay: 20,
        rightScrollY: 0,
        conformText: '清空购物车？',
        currentIndex: 0, // 当前商品类型
        shopId: 0, // 商店id
        shopInfo: {},
        showLists: false, // 是否显示列表
        showChoice: false, // 是否显示商品规格
        currentType: 0, // 当前选择规格
        goodsList: [], // 商品列表
        goodsType: [], // 商品类型列表
        selectGood: '', // 选择的商品
        othersInfo: {}, // 购物车其他信息
        goodsListHeight: [], // 商品列表title高度
        imgBaseUrl
      }
    },
    watch: {
      data () {
        // 数据变化重新计算
        setTimeout(() => {
          this._calHeight()
        }, 20)
      },
      // 商品列表滚动
      rightScrollY (newY) {
        let mathY = -newY
        for (let i = 0; i < this.goodsListHeight.length; i++) {
          if (mathY >= this.goodsListHeight[i] && mathY < this.goodsListHeight[i + 1]) {
            this.currentIndex = i
            return
          }
        }
      },
      // 监听购物车列表
      cartList () {
        setTimeout(() => {
          // 重新渲染列表
          this.$refs.listScrollRef.refresh()
        }, 30)
      },
      cartTotalMoney (newV) {
        if (this.others.totalMoney) {
          this.others.totalMoney = newV
        }
      }
    },
    created () {
      this.listenScroll = true
      this.probeType = 3
      this.shopId = Number(this.$route.query.id)
      this._getShopInfo(this.shopId)
      this.$nextTick(() => {
        // 商品及左侧标题
        this._getGoodsInfo()
        // 重新渲染滚动列表
        setTimeout(() => {
          this.$refs.leftScroll.refresh()
          this.$refs.rightScroll.refresh()
          this.$refs.listScrollRef.refresh()
        }, 300)
      })
    },
    computed: {
      ...mapGetters(['showStore', 'cartList']),
      cartTotalMoney () {
        let totalMoney = 0
        let goodsList = this.cartList.goodsList.slice(0)
        if (goodsList.length === 0) {
          return totalMoney
        }
        for (let i = 0; i < goodsList.length; i++) {
          totalMoney = parseFloat((totalMoney + goodsList[i].totalPrice).toFixed(2))
        }
        totalMoney = parseFloat((totalMoney + this.cartList.others.packetMoney).toFixed(2))
        return totalMoney
      }
    },
    methods: {
      ...mapMutations(['SET_SHOWSTORE']),
      ...mapActions(['addCart', 'minusCart', 'clearCart']),
      // 商家基本信息
      _getShopInfo (id) {
        searchShopById(id).then((res) => {
          this.shopInfo = res.data
        })
      },
      scroll (pos) {
        this.leftScrollY = pos.y
      },
      rightscroll (pos) {
        this.rightScrollY = pos.y
      },
      // 减小商品数量
      decreaseCart (good) {
        this.selectGood = JSON.parse(JSON.stringify(good))
        if (this.selectGood.count !== 0) {
          this.selectGood.count--
          this.minusCart({
            key: 'shopcart',
            goods: this.selectGood,
            others: this.othersInfo
          })
        }
      },
      // 增加商品数量
      addShopCart (good) {
        this.selectGood = JSON.parse(JSON.stringify(good))
        if (!this.selectGood.count) {
          // 选择规格
          this.currentType = 0 // 默认规格
          this.selectGood.typePrice = good.foodChoose[0].price // 默认价格
          this.selectGood.typeName = this.selectGood.foodChoose[0].name
          this.selectGood.count = 1
          this.showChoice = true // 显示规格
        } else {
          // 增加商品
          this.selectGood.count++
          this.addToCart()
        }
      },
      // 关闭规格
      closeChoice () {
        this.showChoice = false
      },
      // 选择规格
      choiceChoiceType (index) {
        this.currentType = index
        this.selectGood.typeId = this.selectGood.foodChoose[index].id
        this.selectGood.typeName = this.selectGood.foodChoose[index].name
        this.selectGood.typePrice = this.selectGood.foodChoose[index].price
      },
      // 存储商品至vuex
      addToCart () {
        // 购物车附加信息
        this.othersInfo = {
          packetMoney: this.shopInfo.packet.box, // 打包费
          dispatching: this.shopInfo.packet.money, // 配送费
          shopName: this.shopInfo.shopName, // 商家名称
          shopId: this.shopId // 商家id
        }
        // 添加商品
        this.addCart({
          key: 'shopcart',
          goods: this.selectGood,
          others: this.othersInfo
        })
        this.showChoice = false
      },
      // 显示提示框
      showConfirm () {
        this.$refs.confirmRefs.show()
      },
      // 清空购物车
      confirmClear () {
        this.selectGood = ''
        this.clearCart('shopcart')
      },
      toggleShowList () {
        if (this.cartList.goodsList.length > 0) {
          this.showLists = !this.showLists
        }
      },
      // 隐藏购物车列表
      hideLists () {
        this.showLists = false
      },
      // 重组商品
      _formatGoods (list) {
        let rsArr = []
        let map = {}
        list.forEach((item, index) => {
          let key = item.foodType.key
          if (!map[key]) {
            map[key] = {
              title: item.foodType.name,
              items: []
            }
          }
          map[key].items.push(item)
        })
        for (let key in map) {
          let value = map[key]
          rsArr.push(value)
        }
        return rsArr
      },
      _getGoodsInfo () {
        // 获取所有商品
        shopGoods(this.shopId).then((res) => {
          this.goodsList = this._formatGoods(res.data)
          this._getGoodsType()
        })
      },
      // 根据商品列表获取商品类别
      _getGoodsType () {
        let typeArr = []
        for (let i = 0; i < this.goodsList.length; i++) {
          typeArr.push(this.goodsList[i].title)
        }
        this.goodsType = typeArr
      },
      // 切换类型
      changeIndex (index) {
        this.currentIndex = index
        this.$refs.rightScroll.scrollToElement(this.$refs.goodsRefs[index], 200)
      },
      // 计算商品title高度
      _calHeight () {
        let height = 0
        let goodsArr = this.$refs.goodsRefs
        this.goodsListHeight.push(height)
        for (let i = 0; i < goodsArr.length; i++) {
          height += goodsArr[i].clientHeight
          this.goodsListHeight.push(height)
        }
      },
      // 结算商品
      goCart () {}
    },
    mounted () {
      // 所有商品
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .my-goods {
    position: absolute;
    width: 100%;
    top: 3rem;
    bottom: 3rem;
    display: flex;
    .food-type{
      flex: 0 0 4rem;
      width: 4rem;
      .left-wrapper{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .left-box{
          width: 100%;
          background: $theme-background;
          .menu-list{
            li{
              padding: 0.6rem 0.6rem;
              @include sc(0.8rem, $color-text-a)
            }
            .current{
              background: #fff;
              @include sc(0.8rem, $color-text-a)
            }
          }
        }
      }
    }
    .food-list{
      flex: 1;
      /*width: 75%;*/
      margin-left: 1rem;
      overflow: hidden;
      .right-wrapper{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .right-box{
          width: 100%;
          overflow: hidden;
          .type-list{
            .title{
              padding: 1rem 0;
              border-bottom: 1px solid $color-border-a;
              @include sc(0.7rem, $color-text-d);
              span{
                @include sc(0.95rem, $color-text-a);
                margin-right: 0.4rem;
              }
            }
            .item{
              display: flex;
              overflow: hidden;
              position: relative;
              padding: 0.6rem 0;
              .img{
                flex: 0 0 5rem;
                width: 5rem;
                height: 5rem;
                overflow: hidden;
                img{
                  width: 100%;
                }
              }
              .des{
                flex: 1;
                height: 100%;
                margin-left: 0.2rem;
                .name{
                  @include no-wrap();
                  @include sc(1rem, $color-text-a)
                }
                .state{
                  @include no-wrap();
                  @include sc(0.7rem, $color-text-d)
                }
                .price{
                  position:absolute;
                  left: 5rem;
                  bottom: 1rem;
                  @include sc(1rem, $color-red);
                }
                .count{
                  position:absolute;
                  right: 1rem;
                  bottom: 1rem;
                }
              }
            }
          }
        }
      }
    }
    .food-cart{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 41;
      height: 3rem;
      align-items: center;
      background: #595959;
      display: flex;
      .img{
        flex: 0 0 3rem;
        width: 3rem;
        position: relative;
        img{
          position: absolute;
          top: -0.4rem;
        }
      }
      .text{
        flex: 1;
        p{
          span{
            @include sc(0.8rem, $color-text-d);
          }
          .high-price{
            @include sc(1.1rem, $color-white);
          }
        }
        .little{
          @include sc(0.8rem, $color-text-d);
        }
      }
      .price{
        flex: 0 0 5rem;
        width: 5rem;
        text-align: center;
        .text{
          width: 100%;
          display: inline-block;
          height: 3rem;
          line-height: 3rem;
          @include sc(1rem, $color-text-e);
          background: #6A6A6A;
        }
        .go-cart{
          width: 100%;
          display: inline-block;
          height: 3rem;
          line-height: 3rem;
          @include sc(1rem, $color-white);
          background: $color-theme-a;
        }
        .go-cart-gray{
          width: 100%;
          display: inline-block;
          height: 3rem;
          line-height: 3rem;
          @include sc(1rem, $color-white);
          background: $color-text-d;
        }
      }
    }
    .food-cart-list{
      position: fixed;
      bottom: 3rem;
      left: 0;
      right: 0;
      z-index: 41;
      background: $theme-background;
      .list-header{
        .title{
          display: flex;
          height: 2.4rem;
          margin: 0 1rem;
          line-height: 2.4rem;
          align-items: center;
          .text {
            flex: 1;
            @include sc(1rem, $color-text-d);
          }
          .clear {
            @include sc(1rem, $color-text-d);
            .icon{
              font-size: 0.8rem;
            }
            span {
              @include sc(1rem, $color-text-d)
            }
          }
        }
      }
      .list-content{
        max-height: 10rem;
        overflow: hidden;
        .list-box{
          background: $color-white;
          .item{
            display: flex;
            padding: 0.8rem 0;
            margin: 0 1rem;
            align-items: center;
            border-bottom: 1px solid $color-border-a;
            .name{
              flex: 1;
              p{
                @include no-wrap();
              }
              .type{
                @include sc(0.7rem, $color-text-d);
              }
            }
            .price{
              flex: 0 0 4.2rem;
              width: 4.2rem;
              color: $color-red;
            }
            .count{
              text-align: right;
              flex: 0 0 4.6rem;
              width: 4.6rem;
            }
          }
        }
        .pack-money{
          display: flex;
          padding: 0.6rem 1rem;
          background: $color-white;
          margin: 0.6rem 0;
          .name{
            flex: 1;
          }
          .money{
            flex: 0 0 3rem;
            width: 3rem;
          }
        }
      }
    }
    .food-choice{
      position: fixed;
      width: 80%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      background: #fff;
      border-radius: 0.4rem;
      .choice-title{
        text-align: center;
        padding: 1rem;
        position: relative;
        @include sc(1rem, $color-text-a);
        .close-choice{
          position: absolute;
          right: 1rem;
          top: 1rem;
        }
      }
      .choice-box{
        .title{
          margin: 0 0 0 1rem;
          @include sc(0.7rem, $color-text-d);
        }
        .choice-list{
          /*display: flex;*/
          .item{
            /*flex: 1;*/
            display: inline-block;
            background: $theme-background;
            border-radius: 0.4rem;
            text-align: center;
            @include sc(0.7rem, $color-text-a);
            padding: 0.4rem 1rem;
            margin: 0.6rem 0 0 0.6rem;
          }
          .native{
            background: $color-theme;
            color: #fff;
          }
        }

      }
      .choice-price{
        display: flex;
        overflow: hidden;
        background: $theme-background;
        padding: 0.4rem 1rem;
        margin-top: 1rem;
        border-radius: 0 0 0.4rem 0.4rem;
        /*-moz-border-radius-bottomleft: 0.4rem;*/
        .money{
          flex: 1;
          @include sc(1.2rem, $color-red)
        }
        .go-ok{
          display: inline-block;
          flex: 0 0 5rem;
          width: 5rem;
          height: 2rem;
          text-align: center;
          line-height: 2rem;
          /*margin: 0 1rem 0 0;*/
          background: $color-theme;
          @include sc(0.8rem, $color-white)
        }
      }
    }
    .list-mask, .choice-mask{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 40;
      backdrop-filter: blur(10px);
      opacity: 1;
      background: rgba(7, 17, 27, 0.6);
      &.fade-enter-active, &.fade-leave-active{
        transition: all 0.5s;
      }
      &.fade-enter, &.fade-leave-active{
        opacity: 0;
        background: rgba(7, 17, 27, 0);
      }
    }
  }
</style>
