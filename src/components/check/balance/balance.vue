<template>
  <div class="check-balance">
    <section class="content">
      <mt-loadmore 
      :bottom-method="loadBottom" 
      :bottom-all-loaded="allLoaded" 
      @bottom-status-change="handleBottomChange"
      :autoFill="false"
      ref="loadmore"
      >
        <div class="list" v-for="(list, index) in balanceData" :key="index">
          <div class="left">
            <div>{{list.log_type_text}}</div>
            <div>{{list.created_at}}</div>
          </div>
          <div class="right">
            <div v-if="Number(list.price) !== 0">现金：{{list.price}}</div>
            <div v-if="Number(list.acceptance_price) !== 0">承兑：{{list.acceptance_price}}</div>
            <div v-if="list.serial_number">票号：{{list.serial_number[0]}}</div>
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
      <m-detail v-show="hide_switch"></m-detail>
    </section>
  </div>
</template>

<script>
import {balanceCheckDetail} from '@/data/getData';
import mDetail from '@/components/check/detail';
export default {
  data () {
    return {
      balanceData: '',
      allLoaded: false,
      bottomStatus: '',
      loadNoMore: false,
      current_page: 1,
      hide_switch: false
    };
  },
  components: {
    mDetail
  },
  methods: {
    async init () {
      let res = await balanceCheckDetail(this.$route.query);
      if (res.message === 'success') {
        this.balanceData = res.data.list;
      }

      this.hide_switch = false;
      if (res.data.list.length === 0) {
        this.hide_switch = true;
      }
    },
    async loadBottom () {
      this.$refs.loadmore.translate = '-100';
      this.current_page += 1;
      let res = await balanceCheckDetail({
        'page': this.current_page,
        'show_year': this.$route.query.show_year,
        'show_month': this.$route.query.show_month
      });
      if (res.data.list.length === 0) {
        this.loadNoMore = true;
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        return;
      }
      for (let i = 0; i < res.data.list.length; i++) {
        this.balanceData.push(res.data.list[i]);
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
@import '../../../style/base.styl'
.check-balance
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  .content
    height: calc(100% - 88px);
    width: 100%;
    overflow-y : scroll;
    overflow-x : hidden;
    .list
      width: 100%;
      min-height: 120px;
      background-color: #ffffff;
      display: flex;
      padding: 0 30px;
      justify-content: space-between;
      align-items: center;
      line-height: 1.5;
      border-bottom-1px(#dddddd)
      .right
        max-width: 50%;
        &>div
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap break-word;
  .loadBottomNothing
    background-color: #f8f8f8;
</style>
