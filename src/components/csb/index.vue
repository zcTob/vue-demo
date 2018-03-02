<template>
  <div class="csb">
    <div class="banner"></div>
    <div class="items">
      <mt-loadmore 
      :bottom-method="loadBottom" 
      :bottom-all-loaded="allLoaded" 
      :bottomPullText="bottomPullText"  
      :bottomDropText='bottomDropText'
      :bottomLoadingText='bottomLoadingText'
      :autoFill='autoFill'
      ref="loadmore">
      <div class="item1">
        <h2>开通说明</h2>
        <p>在“炉料汇”注册并认证，连续三个月有交易记录，且其认证信息中个人信息块为该企业的法人信息的企业，有机会获得开通“采赊宝”的权 利，企业“采赊宝”授信额度大小与其在“炉料汇”上交易额、信用等因素有关。</p>
      </div>
      <div class="item2">
        <div>
          <img src="./img1@2x.png" alt="">
          <strong>信用贷</strong>
          <span>无需抵押</span>
          <span>平台授信</span>
        </div>
        <div>
          <img src="./img2@2x.png" alt="">
          <strong>订单融</strong>
          <span>授信客户</span>
          <span>订单直融</span>
        </div>
        <div>
          <img src="./img3@2x.png" alt="">
          <strong>操作简</strong>
          <span>一旦授信</span>
          <span>一步就融</span>
        </div>
        <div>
          <img src="./img4@2x.png" alt="">
          <strong>时效快</strong>
          <span>T日借款</span>
          <span>T日到账</span>
        </div>
      </div>
      <div class="item3">
        <h1>操作流程</h1>
        <ul>
          <li>
            <img src="./guild1@2x.png" alt="">
            <span>开通采赊宝</span>
          </li>
          <li>
            <img src="./guild4@2x.png" alt="">
          </li>
          <li>
            <img src="./guild2@2x.png" alt="">
            <span>借款付单</span>
          </li>
          <li>
            <img src="./guild4@2x.png" alt="">
          </li>
          <li>
            <img src="./guild3@2x.png" alt="">
            <span>还款</span>
          </li>
        </ul>
      </div>
      <div class="footer">
        <div class="item5">
          <a href="javascript:;">立即申请&nbsp;（采赊宝暂不支持移动端)</a>
        </div>
      </div>
      <div class="item4">
        <span class="more">
          <img src="./up@2x.png" alt="">
          <span>上滑查看详情</span>
        </span>
      </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      allLoaded: false,
      autoFill: false,
      bottomPullText: '',
      bottomDropText: '',
      bottomLoadingText: ''
    };
  },
  components: {
  },
  methods: {
    loadBottom: function () {
      this.$router.push('/csb/detail');
      this.$refs.loadmore.onBottomLoaded();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'
.csb
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  .banner
    width: 100%;
    height: 235px;
    bg-image(banner);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  .items
    height: calc(100% - 235px);
    overflow-y: scroll;
    overflow-x: hidden;
    .item1
      padding: 0 30px;
      background-color: #ffffff;
      h2
        padding: 30px 0;
        padding-left: 18px;
        font-size: 24px;
        color: #282828;
        position: relative;
        &:before
          left: 0
          content: '';
          position: absolute;
          width: 8px;
          height: 32px;
          background-color: #247ef2;
      p
        font-size: 20px;
        color: #282828;
        line-height: 1.8;
        margin: 0;
        padding: 0 0 46px 0;
    .item2
      background-color: #ffffff;
      margin-top: 10px;
      display: flex;
      justify-content : space-around;
      align-items: center;
      height: 240px;
      padding: 0 15px;
      &>div
        text-align : center;
        img,strong,span
          display: block;
          margin: auto;
          max-height: 90px;
        strong 
          font-size: 20px;
          color: #282828;
          margin: 14px 0 ;
        span 
          font-size: 14px;
          color: #787878;
          line-height : 1.5
    .item3
      h1
        margin: 20px 0;
        font-size: 24px;
        color: #282828;
        background-color: #f8f8f8;
        text-align: center;
      ul
        list-style: none 
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 240px;
        padding: 0 60px;
        background-color: #ffffff;
        li
          text-align : center;
          img,span 
            display: block;
            margin: auto;
          img 
            margin-bottom: 30px;
            max-height: 62px; 
    .item4
      height: 85px;
      padding: 0 30px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      background-color:#f8f8f8;
      .more
        text-align: center;
        position: relative
        img 
          height: 23px;
          max-height:  23px;
          display: block;
          margin: auto;
        span 
          font-size: 16px;
          color: #787878;
          display: block;
          line-height: 2
      .more:before
        content: '';
        position: absolute;
        left: 162px;
        width: 226px;
        height: 2px;
        background-color: #dddddd;
        top: 29px;
      .more:after
        content: '';
        position: absolute;
        right: 162px;
        width: 226px;
        height: 2px;
        background-color: #dddddd;
        top: 29px;
 .footer
  .item5
    height: 96px; 
    display: flex;
    justify-content: center;
    align-items: center;
    a
      display: block;
      width: 626px;
      height: 70px;
      border-radius: 8px;
      background-color: #787878;
      color: #fffefe;
      text-align : center;
      font-weight: 500;
      line-height : 70px;
</style>
