<template>
  <div class="setting">
    <section class="main">
      <div class="border-1px">
        <mt-cell title="充值动态" ><mt-switch v-model="recharge" ></mt-switch></mt-cell>
      </div>
      <div class="border-1px">
        <mt-cell title="订单动态" ><mt-switch v-model="order"></mt-switch></mt-cell>
      </div>
      <div class="border-1px">
        <mt-cell title="开票动态" ><mt-switch v-model="invoice" ></mt-switch></mt-cell>
      </div>
      <div class="border-1px">
        <mt-cell title="物流动态" ><mt-switch v-model="logistics"></mt-switch></mt-cell>
      </div>
      <div class="loginout btn-active" @click="loginout">
        退出登录
      </div>
    </section>
  </div>
</template>
<script>
import {personalSettingData, personalSetting, loginOut} from '@/data/getData';
export default {
  data () {
    return {
      invoice: false,
      order: false,
      recharge: false,
      logistics: false
    };
  },
  components: {
  },
  methods: {
    async update (data) {
      this.$store.dispatch('loading', {
        'loading_show': true
      });
      let res = await personalSetting(data);
      this.$store.dispatch('loading', {
        'loading_show': false
      });
      if (res.data === 'success') {
        this.$messagebox('提示', res.message);
      }
    },
    async loginout () {
      let res = await loginOut();
      if (res.data === 'success') {
        let action = await this.$messagebox('提示', res.message);
        if (action === 'confirm') {
          this.$router.replace('/');
        }
      }
    }
  },
  async created () {
    let res = await personalSettingData();
    if (res.data.invoice === 1) {
      this.invoice = true;
    }
    if (res.data.recharge === 1) {
      this.recharge = true;
    }
    if (res.data.logistics === 1) {
      this.logistics = true;
    }
    if (res.data.order === 1) {
      this.order = true;
    }
    this.$watch('invoice', function (val) {
      if (val === true) {
        this.update({
          'key': 'invoice',
          'value': 1
        });
      } else {
        this.update({
          'key': 'invoice',
          'value': 0
        });
      }
    });
    this.$watch('recharge', function (val) {
      if (val === true) {
        this.update({
          'key': 'recharge',
          'value': 1
        });
      } else {
        this.update({
          'key': 'recharge',
          'value': 0
        });
      }
    });
    this.$watch('logistics', function (val) {
      if (val === true) {
        this.update({
          'key': 'logistics',
          'value': 1
        });
      } else {
        this.update({
          'key': 'logistics',
          'value': 0
        });
      }
    });
    this.$watch('order', function (val) {
      if (val === true) {
        this.update({
          'key': 'order',
          'value': 1
        });
      } else {
        this.update({
          'key': 'order',
          'value': 0
        });
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../style/base.styl'
.setting
  width: 100%;
  height: 100%;
  background-color: #f8f8f8
  .main
    &>div
      background-color: #ffffff;
      border-bottom-1px(#dddddd);
    .loginout
      height: 88px;
      line-height : 88px;
      color: #ff0000;
      text-align: center;
      font-size: 28px;
      margin: 20px 0;
      border-bottom: none;
</style>

