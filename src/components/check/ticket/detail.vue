<template>
  <div class="check-ticket-detail">
    <mt-loadmore
      :bottom-method="loadBottom" 
      :bottom-all-loaded="allLoaded" 
      @bottom-status-change="handleBottomChange"
      :autoFill="false"
      ref="loadmore"
      >
      <div class="list list-type1 border-1px" v-for="(list, index) in ticket.data" :key="index">
        <div class="left">
          <div>票号：{{list.tax_id}}</div>
          <div>{{list.tax_create_at}}</div>
        </div>
        <div class="right">
          <div>金额：{{list.invoice_price}}</div>
          <div>{{list.settlement_price}}元*{{list.invoice_number}}吨</div>
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
  </div>
</template>

<script>
import {ticketDetail} from '@/data/getData';
export default {
  data () {
    return {
      ticket: {
        data: []
      },
      allLoaded: false,
      bottomStatus: '',
      loadNoMore: false,
      current_page: 1
    };
  },
  methods: {
    async init () {
      let res = await ticketDetail({
        'show_year': this.$route.query.show_year,
        'show_month': this.$route.query.show_month
      });
      if (res.message === 'success') {
        this.ticket.data = res.data.list;
      }

      this.$emit('hide', false);
      if (res.data.list.length === 0) {
        this.$emit('hide', true);
      }
    },
    async loadBottom () {
      this.$refs.loadmore.translate = '-100';
      this.current_page += 1;

      let res = await ticketDetail({
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
        this.ticket.data.push(res.data.list[i]);
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
    this.init(); // 本期开票
  }
};
</script>

<style lang="stylus" scoped>

</style>
