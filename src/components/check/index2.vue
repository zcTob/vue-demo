<template>
  <div class="check-ticket-detail">
    <!-- 商品对账 -->
    <template v-if="goodsData.data">
      <div class="item">
        <div class="title">
          <div></div>
          <div class="time"><span class="year blue">{{goodsData.year}}</span>年<span class="month blue">{{goodsData.month}}</span>月&nbsp;商品对账</div>
          <div class="header-date">
            <form action="">   
              <input type="month" ref="date" class="select_date" name="date" @change="changeDate" >
            </form>
          </div>
        </div>
        <div class="sub-title">
          <span class="blue">期初余仓</span>
          <span class="blue">期末余仓</span>
        </div>
        <div class="content">
          <div class="left">
            <div>现金：<span>￥{{goodsData.data.start_list.sum_price}}</span></div>
            <div>承兑：<span>￥{{goodsData.data.start_list.sum_acceptance_price}}</span></div>
          </div>
          <div class="center"></div>
          <div class="right">
            <div>现金：<span>￥{{goodsData.data.end_list.sum_price}}</span></div>
            <div>承兑：<span>￥{{goodsData.data.end_list.sum_acceptance_price}}</span></div>
          </div>
        </div>
      </div>
      <div class="more">
        <router-link :to="{
          path: '/check/goods',
          query: {
            show_year: goodsData.year,
            show_month: goodsData.month
            }
          }"><mt-button type="primary">查看明细</mt-button></router-link>
      </div>
    </template>
  </div>
</template>

<script>
import {goodsCheck} from '@/data/getData';
export default {
  data () {
    return {
      goodsData: {
        data: '',
        year: '',
        month: ''
      }
    };
  },
  components: {
  },
  methods: {
    async goods (y, m) {
      let res = await goodsCheck({
        'show_year': y,
        'show_month': m
      });
      if (res.message === 'success') {
        this.goodsData.data = res.data;
        this.goodsData.year = y;
        this.goodsData.month = m;
      }
    },
    showDate () {
      this.$refs.date.click();
    },
    async changeDate () {
      let date = this.$refs.date.value.split('-');
      // 商品对账
      this.goods(date[0], date[1]);
    },
    async init () {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month === 1) {
        year -= 1;
        month = 12;
      }

      await this.goods(year, month);

      this.$refs.date.min = '2017-12';
      if (year === 2017) {
        this.$refs.date.max = '2018-01';
      } else {
        if (month < 10) {
          this.$refs.date.max = year + '-' + '0' + month;
        } else {
          this.$refs.date.max = year + '-' + month;
        }
      }
    }
  },
  mounted () {
    this.init();
  }
};
</script>
