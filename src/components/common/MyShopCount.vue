<template>
  <div class="my-count">
    <transition name="move">
      <div class="cart-decrease" @click.stop.prevent="decreaseCart">
        <svg class="icon" v-if="foodNum !== 0">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-minus"></use>
        </svg>
      </div>
    </transition>
    <div class="cart-count">{{ foodNum }}</div>
    <div class="cart-add" @click.stop.prevent="addCart">
      <svg class="icon icon-add">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-add" ></use>
      </svg>
    </div>
  </div>
</template>
<script>
//  shopId: 0,
//    goodsList: [{
//    goodsInfo: {},
//    count: 0
//  }]
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {}
    },
    props: {
      good: {
        type: Object,
        default: null
      },
      shopId: {
        type: Number,
        default: 0
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      foodNum () {
        let goodsList = this.cartList.goodsList.slice(0)
        let index = goodsList.findIndex((item) => {
          return item.id === this.good.id
        })
        if (index > -1) {
//          this.good = JSON.parse(JSON.stringify(goodsList[index]))
          return goodsList[index].count
        } else {
          return 0
        }
      }
    },
    methods: {
      decreaseCart () {
        this.$emit('minus', this.good)
      },
      addCart () {
        // 添加商品数量
        this.$emit('add', this.good)
      }
    },
    mounted () {}
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .my-count{
    .cart-decrease{
      display: inline-block;
      .icon{
        fill: $color-theme;
      }
    }
    .cart-count{
      width: 1.4rem;
      text-align: center;
      display: inline-block;
    }
    .cart-add{
      display: inline-block;
      .icon-add{
        fill: $color-theme;
      }
    }
  }
</style>
