<template>
  <div class="orderDefault">
    <m-header title="订单中心"></m-header>
    <!-- 没有订单 -->
    <div class="wrap">
      <div class="order-null">
        <img src="./1@2x.png" srcset="./1@2x.png 2x, ./1@3x.png 3x">
        <span>您暂时没有订单，去现货超市逛一逛~</span>
        <mt-button type="primary" @click="link">逛一逛</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import mHeader from '@/components/header/m-header';
export default {
  data () {
    return {

    };
  },
  components: {
    'm-header': mHeader
  },
  methods: {
    link () {
      this.$router.push('/supermarket');
    }
  }
};
</script>

<style lang="stylus" scoped>

  .orderDefault
    width: 100%;
    height: 100%

  .wrap
    width: 100%;
    height: calc(100% - 88px);
    background-color: #ffffff;
    display: flex;
    justify-content: center
    .order-null
      display: flex;
      flex-direction: column;
      align-items center;
      margin-top: 170px;
      img 
        width: 183px;
        height: 252px;
      span
        font-size: 24px;
        color: #0099ff;
        margin-top: 30px;
      button
        border: none;
        outline : none;
        appearance none;
        width: 200px;
        height: 60px;
        line-height: 60px;
        color: #ffffff;
        font-size: 28px;
        border-radius: 8px;
        margin-top: 75px;
        background-color: #247ef2;
</style>

