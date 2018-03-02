<template>
  <div class="depotEd" v-if="items">
    <mt-loadmore 
      :bottom-method="loadBottom" 
      :bottom-all-loaded="allLoaded" 
      @bottom-status-change="handleBottomChange"
    ref="loadmore">

      <div class="lists" v-for="(item,index) in items.lists" :key="index">
        <div class="thead">
          <span>订单编号：{{item.order_number}}</span>
          <span>票额：{{item.unit_price}}</span>
        </div>
        <div class="tbody">
          <div class="left">
            <div class="list">
              <strong>{{item.factory_name}} </strong>
              <span>{{item.category_name}}{{item.standard_name}}&nbsp;{{item.unit_price}}元/吨&nbsp;{{item.number}}吨&nbsp;&nbsp;&nbsp;退货：{{item.remaining}}吨</span>
            </div>
          </div>
          <div class="right">
            <span class="red">{{item.status}}</span>
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
  </div>
</template>

<script>
import {depotEd} from '@/data/getData';
export default {
  data () {
    return {
      items: {
        lists: '',
        max_page: '',
        current_page: ''
      },
      allLoaded: false,
      loadNoMore: false,
      bottomStatus: ''
    };
  },
  methods: {
    async init () {
      let res = await depotEd();
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
      let res = await depotEd({
        'page': this.items.current_page
      });
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

</style>
