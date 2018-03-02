<template>
  <div class="check-goods-end">
    <mt-loadmore 
      :bottom-method="loadBottom" 
      :bottom-all-loaded="allLoaded" 
      @bottom-status-change="handleBottomChange"
      :autoFill="false"
      ref="loadmore"
      >
      <div class="list border-1px" v-for="(list,index) in end.data" :key="index">
        <div class="left">
          <div>{{list.name}}</div>
          <div>{{list.settlement_price}}元*{{list.remaining}}吨</div>
        </div>
        <div class="right">
          <div>{{list.type_text}}</div>
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
import { goodsCheckDetail } from '@/data/getData';
export default {
  data () {
    return {
      end: {
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
      let res = await goodsCheckDetail({
        'show_year': this.$route.query.show_year,
        'show_month': this.$route.query.show_month,
        'show': '2'
      });

      if (res.message === 'success') {
        this.end.data = res.data.list;
      }

      this.$emit('hide', false);
      if (res.data.list.length === 0) {
        this.$emit('hide', true);
      }
    },
    async loadBottom () {
      this.$refs.loadmore.translate = '-100';
      this.current_page += 1;

      let res = await goodsCheckDetail({
        'show': '2',
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
        this.end.data.push(res.data.list[i]);
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
    this.init(); // 期末
  }
};
</script>

<style lang="stylus" scoped>
</style>
