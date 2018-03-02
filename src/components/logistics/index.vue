<template>
  <div class="logistics">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">商品物流</mt-tab-item>
      <mt-tab-item id="2">开票物流</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
  <mt-tab-container v-model="selected">
    <mt-tab-container-item id="1">
      <mt-loadmore 
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        @bottom-status-change="handleBottomChange"
      ref="loadmore">
        <div class="lists" v-for="(item,index) in items.lists" :key="index">
          <div class="thead">
            <span>订单编号：{{item.order_number}}</span>
            <span>出库单号：{{item.delivery_record_number}}</span>
          </div>
          <div class="tbody">
            <div class="left">
              <div v-for="(list,i) in item.items" :key="i">
                <div class="list">
                  <strong>{{list.factory_name}} </strong>
                  <span>{{list.category_name}}{{list.standard_name}}&nbsp;{{list.unit_price}}元/吨&nbsp;{{list.number}}{{list.unit}}</span>
                </div>
              </div>
            </div>

            <div class="right">
              <mt-button @click="confirm(item.id)" v-if="item.received === false">收货</mt-button>
              <mt-button :disabled="true" v-else-if="item.received === true">已收货</mt-button>
            </div>
          </div>
          <div class="tfooter">
            <div class="accept-time">发货时间：<span>{{item.delivery_date}}</span></div>
            <div class="driver-info">
              <div>
                司机姓名：<span>{{item.driver_name}}</span>
              </div>
              <div>
                电话：<span>{{item.driver_phone}}</span>
              </div>
              <div>
                车牌号码：<span>{{item.license_plate_number}}</span>
              </div>
            </div>
          </div>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom llh-loadmore-bottom">
          <span class="loadBottomInfo" v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↓</span>
          <span class="loadBottomIcon" v-show="bottomStatus === 'loading'">
            <mt-spinner type="fading-circle" color="#26a2ff" :size="40"></mt-spinner>
            <span class="loadBottomIconText">加载中...</span>
          </span>
        </div>
      </mt-loadmore>
      <span class="loadBottomNothing" v-show="loadNoMore === true">
        <span class="loadBottomIconText">没有更多数据了...</span>
      </span>
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <div class="missing" v-show="hide_missing">
        <img src="./img1@2x.png" alt="">
        <p>正在搭建中，敬请期待!</p>
      </div>
    </mt-tab-container-item>
  </mt-tab-container>
  </div>
</template>

<script>

import {logisticsGoods, logisticsConfirm} from '@/data/getData';
export default {
  data () {
    return {
      selected: '1',
      hide_missing: false,
      items: {
        lists: '',
        max_page: Number,
        current_page: Number
      },
      allLoaded: false,
      loadNoMore: false,
      bottomStatus: ''
    };
  },
  components: {
  },
  methods: {
    confirm: function (id) {
      this.$messagebox.confirm(
        '您是否确认收货？'
      ).then(async action => {
        let res = await logisticsConfirm(id);
        if (res.data === 'success') {
          await this.$messagebox.alert(res.message);
          this.init();
        }
      });
    },
    async init () {
      let res = await logisticsGoods();
      this.items.lists = res.data.list;
      this.items.max_page = res.data.max_page;
      this.items.current_page = 1;
    },
    async loadBottom () {
      if (this.items.current_page >= this.items.max_page) {
        this.loadNoMore = true;
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        return;
      }
      this.items.current_page += 1;
      let res = await logisticsGoods(this.items.current_page);
      for (let i = 0; i < res.data.list.length; i++) {
        this.items.lists.push(res.data.list[i]);
      }
      this.$nextTick(() => {
        this.$refs.loadmore.onBottomLoaded();
      });
    },
    handleBottomChange (status) {
      this.bottomStatus = status;
    }
  },
  watch: {
    selected: function (val) {
      if (val !== 1) {
        this.hide_missing = true;
      } else {
        this.hide_missing = false;
      }
    }
  },
  created () {
    this.init();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'
.logistics
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  .lists
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
      border-bottom: 1px solid #dddddd;
    .tbody
      display: flex
      .right
        width: 200px;
        display: flex;
        justify-content : center;
        align-items: center;
        border-left: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
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
          border-bottom: 1px solid #dddddd
          strong
            font-size:24px;
            color: #282828;
          span 
            font-size: 22px;
            color: #787878;
    .tfooter
      padding: 0 16px;
      line-height : 1.5
      height: 100px;
      display: flex;
      justify-content : center;
      align-items: flex-start;
      flex-direction : column
      .driver-info
        width: 100%;
        display: flex
        flex-direction : row;
        justify-content: space-between;

.missing{
  width: 100%;
  height: 100%
  text-align: center;
  padding-top: 160px;
  img{
    width: 212px; 
    height: 245px;
    margin-bottom: 26px;
  }    
  p{
    font-size: 24px;
    color: #0099ff;
  }
} 
</style>

