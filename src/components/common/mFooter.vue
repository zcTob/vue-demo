<template>
  <div class="mfooter">
    <footer>
      <router-link tag="div" to="/home" class="home" >
        <i></i>
        <span>首页</span>
      </router-link>
      <router-link tag="div" to='/supermarket' class="supermarket" >
        <i></i>
        <span>现货超市</span>
      </router-link>
      <router-link tag="div" to='/search' class="search" >
        <i></i>
        <span>找现货</span>
      </router-link>
      <router-link tag="div" to='/shopping_cart' class="shopping-cart" >
        <i></i>
        <span>购物车<em class="sup" v-if="cartLength >0 ">{{cartLength}}</em></span>
      </router-link>
      <router-link tag="div" to='/personal/center' class="center">
        <i></i>
        <span>个人中心</span>
      </router-link>
    </footer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  data () {
    return {
      home: false,
      supermarket: false,
      search: false,
      shoppingCart: false,
      center: false
    };
  },
  props: {
    isActive: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters(
      [
        'cartLength'
      ]
    )
  },
  mounted: function () {
    var that = this;
    switch (that.isActive) {
      case 'home':
        that.home = true;
        break;
      case 'supermarket':
        that.supermarket = true;
        break;
      case 'search':
        that.search = true;
        break;
      case 'shoppingCart':
        that.shoppingCart = true;
        break;
      case 'center':
        that.center = true;
        break;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'
.mfooter
  position: absolute
  bottom: 0
  left: 0
  width: 100%
  height: 98px;/*px*/
  box-shadow: 0 -2px 2px 0 rgba(0,0,0,0.05)
  footer
    width: 100%;
    height:100%;
    background-color: #fff;
    display: flex;
    div
      flex: 1
      align-self: center
      text-align center
      align-content: center
      display flex
      flex-direction: column
      align-items center
      span
        margin-top: 12px
        font-size: 20px; /*px*/
        color: #282828
      i 
        background-repeat: no-repeat;
        background-size: 100% 100%;
    .home
      i 
        bg-image('footer1')
        width: 50px;/*px*/
        height: 46px;/*px*/
      &.active
        i
          bg-image('footer1-active')
        span 
          color: #247ef2
    .supermarket
      i
        bg-image('footer2')
        width: 41px;/*px*/
        height: 40px;/*px*/
      &.active
        i
          bg-image('footer2-active')
        span 
          color: #247ef2
    .search
      i 
        bg-image('footer3')
        width: 44px;/*px*/
        height: 41px;/*px*/
      &.active
        i
          bg-image('footer3-active')
        span 
          color: #247ef2
    .shopping-cart
      position relative
      .sup
        position: absolute;
        top: 0;
        font-size: 20px;
        color:#ffffff;
        font-style: normal;
        background-color: #f44336
        padding: 4px 12px;
        border-radius: 16px;
        transform: translateX(-50%)
      i
        bg-image('footer4')
        width: 48px;/*px*/
        height: 41px;/*px*/
      &.active
        i
          bg-image('footer4-active')
        span 
          color: #247ef2
    .center
      i
        bg-image('footer5')
        width: 42px;/*px*/
        height: 38px;/*px*/
      &.active
        i
          bg-image('footer5-active')
        span 
          color: #247ef2
  >>>.mint-msgbox-title
    width: 305px;
    height: 160px;

</style>
