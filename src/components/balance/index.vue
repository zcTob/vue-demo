<template>
  <div class="balance">
    <header class="header">
      <div class="title">
      </div>
      <div class="tc">
        <div class="left">
          <div class="name">现金账户</div>
          <div class="price">￥{{lists.price}}</div>
        </div>
        <div class="right">
          <div class="name">承兑账户</div>
          <div class="price">￥{{lists.acceptance_price}}</div>
        </div>
      </div>
      <div class="btn1">
        <router-link tag="button" to="/balance/recharge">充值</router-link>
      </div>
      <div class="btn2">
        <router-link tag="button" to="/balance/withdraw">提现</router-link>
      </div>
    </header>
    <router-link tag="div" to="/balance/detail" class="item">
      <i class="icon1"></i>
      <span>余额对账</span>
    </router-link>
  </div>
</template>

<script>
import {balance} from '@/data/getData';
export default {
  data () {
    return {
      lists: ''
    };
  },
  methods: {
    async init () {
      let res = await balance();
      this.lists = res.data;
    }
  },
  created () {
    this.init();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'
.balance
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  header.header
    height: 570px;
    width: 100%;
    background: linear-gradient(to left, #56ccf2, #247ef2)
    .title
      height: 88px;
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left
        .mintui
          font-size: 40px;
          font-weight: 700
          color: #ffffff
      .center
          font-size: 36px
          font-weight: 500
          color: #ffffff
          letter-spacing: 5px
    .tc
      display: flex
      margin: 100px 0
      .left,.right
        flex: 1;
        text-align: center
        .name
          font-size: 28px;
          color: #fefefe
          font-weight: 500;
          margin-bottom: 36px;
        .price
          font-size: 36px;
          color: #fefefe;
          font-weight: bold;
    .btn1,.btn2
      text-align: center;
      margin-bottom: 20px;
      button
        width: 300px;
        height: 60px;
        border-radius: 8px;
        background-color: #ffffff;
        border: 1px solid #ffffff;
        font-size: 28px;
        color: #ffffff;
        background-color: transparent;

  .item
    margin: 30px 0;
    background-color: #ffffff;
    height: 100px;
    padding: 0 50px;
    display: flex;
    align-items: center;
    .icon1
      display: inline-block;
      width: 60px;
      height: 42px;
      margin-right: 24px;
      bg-image(icon1);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    span
      color: #282828;
      font-size: 30px;
  
</style>

