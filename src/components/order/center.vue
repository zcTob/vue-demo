<template>
  <div class="order-center">
    <nav class="oc-nav">
      <router-link to='/order/index' >全部</router-link>
      <router-link to='/order/ing' >执行中<sup class="sup-error" v-if="num.ing" v-cloak>{{num.ing}}</sup></router-link>
      <router-link to='/order/finished' >已完成<sup class="sup-error" v-if="num.finished" v-cloak>{{num.finished}}</sup></router-link>
      <router-link to='/order/invoice' >开票阶段<sup class="sup-error" v-if="num.invoice" v-cloak>{{num.invoice}}</sup></router-link>
      <router-link to='/order/cancel' >已取消<sup class="sup-error" v-if="num.cancel" v-cloak>{{num.cancel}}</sup></router-link>
    </nav>
    <!-- tab-container -->
    <div class="tab-container">
      <router-view @tab="tabNum"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: '1',
      num: {
        ing: '',
        finished: '',
        invoice: '',
        cancel: ''
      }
    };
  },
  components: {
  },
  methods: {
    async init () {

    },
    tabNum (res) {
      this.num.ing = res.ing;
      this.num.finished = res.finished;
      this.num.invoice = res.invoice;
      this.num.cancel = res.cancel;
    }
  },
  created () {
    setTimeout(() => {
      this.init();
    }, 1000);
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'
.error
  color: #ff0000;
.warning
  color: #e67e22;

.sup-error
  display: inline-block
  color: #ffffff;
  font-size: 14px
  background-color: #ff0000;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  text-align : center;
  line-height 22px;
  position relative;
  top: -20px;
.order-center
  background-color: #f8f8f8;
  height: 100%;
  min-height: 100%;

.order-center
  .oc-nav
    display: flex;
    height: 80px;
    line-height : 80px;
    background-color: #ffffff;
    a
      flex: 1;
      font-size: 28px;
      color: #282828;
      text-align: center;
      &.active
        color: #26a2ff
        border-bottom: 2px solid #26a2ff;
        margin-bottom: -2px;

.tab-container
  width: 100%;
  height: calc(100% - 168px);
  overflow-y: scroll;
  &>div
    overflow-y: scroll;
  >>>.order-list
    background-color: #ffffff
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 24px;
    line-height : 1.5;
    .top
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 108px;
      font-size: 24px;
      line-height 1.5;
      padding: 0 15px;
      border-bottom-1px(#dddddd)
      
      .left
        .num
          color: #282828;
          a
            color: #247ef2;
        .time
          color: #787878;
      .right
        display: flex
        flex-direction : row;
        &>div:nth-child(1)
          display: flex;
          align-items: center
          margin-right:10px;
          color: #ff0000;
    .middle
      padding: 20px 15px
      border-bottom-1px(#dddddd)
      .goods-list
        display: flex;
        justify-content: space-between;
        .goods-info
          .goods-name
            color: #282828;
          .goods-num
            color: #787878;
        .price
          color: #787878;
      .total-price
        text-align : right 
        color: #787878;
      .payment-type
        display: flex
        justify-content: space-between;
        div:nth-child(1)
          color: #282828;
        div:nth-child(2)
          color: #787878
    .bottom
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height : 1.5;
      padding: 0 15px;
      div:nth-child(1)
        color: #787878;
      div:nth-child(2)
        span
          display: inline-block
          width: 130px;
          height: 50px;
          line-height 50px;
          color: #247ef2;
          font-size: 24px;
          border: 1px solid #247ef2;
          text-align: center;
          border-radius: 8px;
</style>

