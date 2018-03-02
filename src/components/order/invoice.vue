<template>
  <div class="orderinvoice" v-if="items" v-cloak>
    <mt-loadmore 
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        @bottom-status-change="handleBottomChange"
      ref="loadmore">
      <div class="order-list border-1px" v-for="(item, index) in items.lists" :key="index">
        <div class="top border-1px">
          <div class="left">
            <div class="num">
              订单编号：{{item.number}}
              <router-link :to="{ path: '/order/detail', query: { id: item.id }}" v-if="item.has_original_order">原始订单</router-link>
            </div>
            <div class="time">
              下单时间：{{item.created_at}}
            </div>
          </div>
          <div class="right">
            <div>{{item.status}}</div>
            <div>
              <div>{{item.money_status}}</div>
              <div>{{item.invoice_status}}</div>
            </div>
          </div>
        </div>
        <div class="middle border-1px">
          <div class="goods-list" v-for="(good,index) in item.items" :key="index">
            <div class="goods-info">
              <span class="goods-name">
                {{good.product_name}}
              </span>
              <span class="goods-num">
                {{good.number}}{{good.unit}}
              </span>
            </div>
            <div class="price">
              ￥{{good.unit_price}}/吨
            </div>
          </div>
          <div class="total-price">
            共计{{item.item_count}}件&nbsp;调价￥{{item.adjust_price}}&nbsp; ￥{{item.origin_price}}
          </div>
          <div class="payment-type">
            <div>支付方式：{{item.type}}支付</div>
            <div>实际总额：<span class="error">￥{{item.total_price}}</span></div>
          </div>
        </div>
        <div class="bottom">
          <div>
            <div>{{item.short_pay_type}}余额：￥{{item.member_account}}</div>
            <div>使用{{item.short_pay_type}}余额：￥{{item.paid_price}}</div>
          </div>
          <div>
            <span v-if="item.show_receive_confirm_button" @click="confirm(item.id)">确认收货</span>
            <span v-else-if="item.show_cancel_button" @click="cancel(item.id)">取消订单</span>
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
import {orderInvoice, orderConfirm, orderCancel} from '@/data/getData';
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
      let res = await orderInvoice({
        'status': 'invoice'
      });
      this.items.lists = res.data.list;
      this.items.max_page = res.data.max_page;
      this.items.current_page = 1;
      let list = {
        ing: res.data.ongoing_count,
        finished: res.data.finished_count,
        invoice: res.data.invoice_count,
        cancel: res.data.canceled_count
      };
      this.$emit('tab', list);
    },
    async confirm (id) {
      let action = await this.$messagebox({
        title: '提示',
        message: '确定收货吗？',
        showCancelButton: true
      });
      if (action === 'confirm') {
        let res = await orderConfirm(id);
        if (res.data === 'success') {
          await this.$messagebox('提示', res.message);
          this.init();
        }
      }
    },
    async cancel (id) {
      let action = await this.$messagebox({
        title: '提示',
        message: '确定取消订单吗？',
        showCancelButton: true
      });
      if (action === 'confirm') {
        let res = await orderCancel(id);
        if (res.data === 'success') {
          await this.$messagebox('提示', res.message);
          this.init();
        }
      }
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
      let res = await orderInvoice({
        'status': 'invoice',
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

