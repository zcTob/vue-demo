<template>
  <div class="order-detail" v-if="list" v-cloak>
    <m-header :title="header.title"></m-header>
    <div class="order-list border-1px">
      <div class="top border-1px">
        <div class="left">
          <div class="num">
            订单编号：{{list.number}}
          </div>
          <div class="time">
            更新时间：{{list.updated_at}}
          </div>
        </div>
        <div class="right">
          <div></div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div class="middle border-1px">
        <div class="goods-list" v-for="(item,index) in list.items" :key="index">
          <div class="goods-info">
            <span class="goods-name">
              {{item.product_name}}
            </span>
            <span class="goods-num">
              {{item.number}}{{item.unit}}
            </span>
          </div>
          <div class="price">
            ￥{{item.unit_price}}/吨
          </div>
        </div>
        <div class="total-price">
          共计{{list.item_count}}件 ￥{{list.origin_price}}
        </div>
        <div class="payment-type">
          <div></div>
          <div>实际总额：<span class="error">￥{{list.total_price}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mHeader from '@/components/header/m-header';
import {orderDetail} from '@/data/getData';
export default {
  data () {
    return {
      header: {
        title: '变更详情'
      },
      list: '',
      maxPage: null
    };
  },
  components: {
    'm-header': mHeader
  },
  methods: {
    async init () {
      let res = await orderDetail(this.$route.query.id);
      this.list = res.data.list;
      this.maxPage = res.data.max_page;
    }
  },
  created () {
    this.init();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'
.error
  color: #ff0000;
.warning
  color: #e67e22;
.order-detail
  background-color: #f8f8f8;
  height: 100%;
  min-height: 100%;
  .order-list
    background-color: #ffffff
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 24px;
    line-height : 1.5;
    border-top-1px(#dddddd)
    border-bottom-1px(#dddddd)
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
        div:nth-child(1)
          display: flex;
          align-items: center
          margin-right:10px;
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
          color: #282828;
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

