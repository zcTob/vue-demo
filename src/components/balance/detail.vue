<template>
<div class="balance-detail">
  <mt-loadmore 
  :bottom-method="loadBottom" 
  :bottom-all-loaded="allLoaded" 
  @bottom-status-change="handleBottomChange" 
  ref="loadmore"
  >
    <section class="bd-c">
      <div class="list list-type1 border-1px" v-for="(detail,index) in items.lists" :key="index">
        <div class="left">
          <div>{{detail.type}}</div>
          <div class="time">{{detail.created_at}}</div>
        </div>
        <div class="right">
          <div><span class="name">现金：</span>{{detail.price}}元</div>
          <div><span class="name">承兑：</span>{{detail.acceptance_price}}元</div>
        </div>
      </div>
    </section>
    <div slot="bottom" class="mint-loadmore-bottom llh-loadmore-bottom">
      <span class="loadBottomInfo" v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↓</span>
      <span v-show="bottomStatus === 'loading'"><mt-spinner type="fading-circle"></mt-spinner></span>
    </div>
  </mt-loadmore>
  <span class="loadBottomNothing" v-show="loadNoMore === true">
    <span class="loadBottomIconText">没有更多数据了...</span>
  </span>
</div>
</template>

<script>
import {balanceDetail} from '@/data/getData';
export default {
  data () {
    return {
      allLoaded: false,
      loadNoMore: false,
      bottomStatus: '',
      items: {
        lists: '',
        max_page: '',
        current_page: ''
      }
    };
  },
  components: {
  },
  methods: {
    async init () {
      let res = await balanceDetail();
      this.items.lists = res.data.list;
      this.items.max_page = res.data.max_page;
      this.items.current_page = 1;
    },
    async loadBottom () {
      this.$refs.loadmore.translate = '-100';
      if (this.items.current_page >= this.items.max_page) {
        this.loadNoMore = true;
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        return;
      }
      this.items.current_page += 1;
      let res = await balanceDetail(this.items.current_page);
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
  created () {
    this.init();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'
.balance-detail
  height: 100%;
  width: 100%;
  background-color: #f8f8f8;
  .bd-c
    margin-top: 20px;
    .list
      width: 100%;
      min-height: 120px;
      background-color: #ffffff;
      display: flex;
      padding: 0 30px;
      justify-content: space-between;
      align-items: center;
      line-height: 1.5;
      border-bottom-1px(#dddddd);
      padding: 0 30px;
      color:#282828;
      .time,.name
        color: #989898;
      .right
        text-align: right
</style>

