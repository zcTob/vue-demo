<template>
  <div class="depot">
    <nav class="navbar">
      <router-link to="/depot/index">待发商品</router-link>
      <router-link to="/depot/refund">退货</router-link>
    </nav>

    <!-- tab-container -->
    <div class="tab-container">
      <router-view></router-view>
    </div>
    <!-- tab-container -->
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  components: {
  },
  methods: {

  }
};
</script>

<style lang="stylus" scoped>
.depot
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  .navbar
    height: 80px;
    line-height : 80px;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    a
      flex: 1;
      color: #282828;
      font-size: 28px;
      text-align: center;
      &.active
        color: #26a2ff;
        border-bottom: 0.04rem solid #26a2ff;
        margin-bottom: -2px;
  .tab-container
    width: 100%;
    height: calc(100% - 168px);
    overflow: scroll;
    &>div
      overflow-y: scroll;
  >>>.lists
    margin-top: 20px;
    background-color: #ffffff;
    .thead
      height: 66px;
      padding: 0 16px;
      font-size: 24px;
      color: #282828;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom:1px solid #dddddd;
    .tbody
      display: flex
      .right
        width: 200px;
        display: flex;
        justify-content : center;
        align-items: center;
        border-left: 1px solid #dddddd;
        button
          width: 96px;
          height: 50px;
          line-height : 50px;
          background-color: #247ef2;
          font-size: 24px;
          color: #ffffff;
          border-radius: 8px;
      .left
        flex: 1;
        .list
          padding-left: 16px;
          display: flex;
          flex-direction : column;
          height: 110px;
          justify-content: center;
          line-height : 1.5
          strong
            font-size:24px;
            color: #282828;
          span 
            font-size: 22px;
            color: #787878;


</style>

