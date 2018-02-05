<template>
  <div class="my-search-box">
    <div class="icon-search">
      <svg class="icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-search"></use>
      </svg>
    </div>
    <input type="text" class="box" ref="queryRef" v-model="query" :placeholder="placeholder">
    <i class="icon-dismiss" v-show="query" @click="clearQuery">
      <svg class="icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use>
      </svg>
    </i>
  </div>
</template>
<script>
  import { myDOM } from '@/assets/js/myUtils.js'
  export default {
    components: {},
    data () {
      return {
        query: ''
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '输入商店、商家名称'
      }
    },
    watch: {},
    filters: {},
    methods: {
      blur () {
        this.$refs.queryRef.blur()
        this.$emit('blur')
      },
      getQuery (key) {
        this.query = key
      },
      clearQuery () {
        this.query = ''
      }
    },
    created () {
      // 节流
      this.$watch('query', myDOM.debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 300))
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/common.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .my-search-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    /*width: 100%;*/
    padding: 0.2rem 0.6rem;
    /*height: 2.4rem;*/
    /*background: #fff;*/
    overflow: hidden;
    border-radius: 0.2rem;
    .icon-search {
      font-size: 1.2rem;
      .icon{
        fill: #999;
      }
    }
    .box {
      flex: 1;
      margin: 0 0.2rem;
      border: 0;
      outline: none;
      background: none;
      color: $color-text-d;
      font-size: 0.9rem;
      &::placeholder {
        color: $color-text-d;
      }
    }
    .icon-dismiss {
      font-size: 0.8rem;
      .icon{
        fill: #999;
      }
    }
  }
</style>
