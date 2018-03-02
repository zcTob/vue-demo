<template>
<div class="balance-withdraw">
  <div class="type border-1px">
    <span class="left">提现方式</span>
    <div class="right">
      <span class="m-radio">
        <input type="radio" name="withdraw_type" id="cash_type" value="1" v-model="form.type">
        <span class="m-radio-check"></span>
      </span>
      <label for="cash_type">现金支付</label>
      <span class="m-radio">
        <input type="radio" name="withdraw_type" id="accept_type" value="2" v-model="form.type">
        <span class="m-radio-check"></span>
      </span>
      <label for="accept_type">承兑支付</label>
    </div>
  </div>
  <div class="cash-num">
    <mt-field label="提现金额" type="number" name="" placeholder="请输入您要提现的金额" v-model="form.money"></mt-field>
  </div>
  <div class="tips">
    当前现金余额：{{items.price}}元，承兑余额：{{items.acceptance_price}}元
  </div>
  <div class="remarks">
    <mt-field label="填写备注" placeholder="请填写备注信息" type="textarea" rows="8" v-model="form.remark"></mt-field>
  </div>
  <div class="footer-btn">
    <mt-button class="llh-btn-lg" type="primary" @click="submit">立刻提现</mt-button>
  </div>
</div>
</template>

<script>
import {balanceWithdraw, balance} from '@/data/getData';
export default {
  data () {
    return {
      header: {
        title: '提现'
      },
      form: {
        type: '1',
        money: '',
        remark: ''
      },
      items: ''
    };
  },
  components: {
  },
  methods: {
    async submit () {
      if (this.form.type !== '1' && this.form.type !== '2') {
        this.$messagebox('提示', '请选择充值方式。');
        return;
      }
      if (this.form.money.length === 0) {
        this.$messagebox('提示', '请填写提现金额。');
        return;
      }

      let res = await balanceWithdraw({
        'money_type': this.form.type,
        'money': this.form.money,
        'content': this.form.remark
      });

      if (res.data === 'success') {
        await this.$messagebox('提示', res.message);
        this.$router.replace('/balance');
      }
    },
    async init () {
      let res = await balance();
      this.items = res.data;
    }
  },
  created () {
    this.init();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'
.balance-withdraw
  height: 100%;
  width: 100%;
  background-color: #f8f8f8;
  .type
    height: 88px;
    background-color: #ffffff;
    display: flex;
    flex-direction : flex-start;
    align-items: center;
    color: #000
    padding: 0 30px;
    border-bottom-1px(#dddddd)
    .left
      font-size: 28px;
      margin-right: 20px;
    .right
      font-size: 24px;
      display: flex;
      align-items: center;
      label
        font-weight: normal
        margin-left: 10px
        margin-right: 20px
  .tips
    height: 48px;
    line-height : 48px;
    font-size: 18px;
    color: #787878;
    padding: 0 30px;
</style>

