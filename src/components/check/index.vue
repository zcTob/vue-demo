<template>
  <div class="check-ticket-detail">
    <nav class="nav">
      <router-link :to="{
        path: '/check/index1'
        }"
      >
        余额对账
      </router-link>

      <router-link :to="{
        path: '/check/index2'
        }"
      >
        商品对账
      </router-link>

      <router-link :to="{
        path: '/check/index3'
        }"
      >
        开票对账
      </router-link>
    </nav>

    <section class="content">
      <router-view></router-view>
    </section>
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

  },
  mounted () {

  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'
.check-ticket-detail
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  overflow-x: hidden;
  overflow-y: scroll;

  .nav
    height: 80px;
    line-height : 80px;
    display: flex;
    background-color: #fff;
    a
      flex: 1;
      text-align :center;
      color: #282828;
      font-size: 28px;
      &.active
        color: #26a2ff
        border-bottom: 3px solid #26a2ff;/*px*/
  >>>.content
    .item
      margin: 20px 15px;
      padding: 36px 24px 50px;
      background-color: #ffffff;
      text-align: center;
      box-shadow: 0px 4px 10px 0 #dddddd
      .title 
        display: flex;
        justify-content: space-between;
        .time
          border-bottom: 1px solid #247ef2;
          font-size: 22px;
          color: #787878;
          line-height 1.5;
        .header-date 
          display: inline-block;
          width: 36px;/*px*/
          height: 34px;/*px*/
          bg-image('date');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          input
            display: inline-block;
            width: 100%;
            height: 100%;
            opacity : 0;
      .sub-title
        display: flex;
        justify-content: space-around;
        margin-bottom: 40px;
        margin-top: 40px;
        font-size: 24px;
      .content
        display: flex;
        justify-content: space-around
        .left,.right
          font-size: 22px;
          color: #787878;
          text-align: center;
          flex: 1;
          div
            margin-bottom: 25px;
            display: flex;
            align-items: center
            justify-content: center;
            padding-left: 20px;
          span 
            font-size: 32px;
            color: #787878;
            font-weight: bold;
        .center
          width: 2px;
          height: 100px;
          background-color: #dddddd;
      .ticket-footer
        text-align: center;
        div:nth-child(1)
          font-size: 24px;
          color: #247ef2;
          margin: 40px;
        div:nth-child(2)
          font-size: 32px;
          color: #787878
          font-weight: bold;
    .list
      min-height: 120px;
      padding: 0 40px;
      display: flex;
      justify-content : space-between;
      align-items:center;
      background-color: #ffffff;
      border-bottom-1px(#dddddd);
      .left
        font-size: 28px;
        color: #282828;
      .right
        font-size: 24px;
        color: #989898;
        line-height : 1.5
        span 
          font-size: 28px;
          color: #282828;
    .lists
      border-top-1px(#dddddd)
    .more
      text-align center;
      margin-top: 80px
      button
        width: 200px;
        height: 60px;
        border-radius: 8px;
        font-size: 28px;
        color: #ffffff;

  >>>.m-header {
    .right {
      text-align: right;
      margin-right: 30px;
    }
    .header-date {
      display: inline-block;
      width: 36px;/*px*/
      height: 34px;/*px*/
      bg-image('date');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      input {
        display: inline-block;
        width: 100%;
        height: 100%;
        opacity : 0;
      }
    }
  }

  >>>.picker-slot{
    font-size: 36px;
  }

</style>
