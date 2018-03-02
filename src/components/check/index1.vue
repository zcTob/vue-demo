<template>
  <div class="check-ticket-detail">
    <!-- 余额对账 -->
    <template v-if="balanceData.data">
      <div class="item">
        <div class="title">
          <div></div>
          <div class="time">
            <span class="year blue">{{balanceData.year}}</span>年<span class="month blue">{{balanceData.month}}</span>月&nbsp;余额对账
          </div>
          <div class="header-date">
            <form action="">   
              <input type="month" ref="date" class="select_date" name="date" @change="changeDate" >
            </form>
          </div>
        </div>
        <div class="sub-title">
          <span class="blue">期初余额</span>
          <span class="blue">期末余额</span>
        </div>
        <div class="content">
          <div class="left">
            <div>现金：<span>￥{{balanceData.data.start.sum_price}}</span></div>
            <div>承兑：<span>￥{{balanceData.data.start.sum_acceptance_price}}</span></div>
          </div>
          <div class="center"></div>
          <div class="right">
            <div>现金：<span>￥{{balanceData.data.end.sum_price}}</span></div>
            <div>承兑：<span>￥{{balanceData.data.end.sum_acceptance_price}}</span></div>
          </div>
        </div>
      </div>
      <div class="lists border-1px">
        <div class="list border-1px">
          <div class="left">本期充值</div>
          <div class="right">
            <div>现金：<span>{{balanceData.data.recharge.sum_price}}</span></div>
            <div>承兑：<span>{{balanceData.data.recharge.sum_acceptance_price}}</span></div>
          </div>
        </div>
        <div class="list border-1px">
          <div class="left">本期采购</div>
          <div class="right">
            <div>现金：<span>{{balanceData.data.order.银行汇款}}</span></div>
            <div>承兑：<span>{{balanceData.data.order.承兑汇票}}</span></div>
          </div>
        </div>
        <div class="list border-1px">
          <div class="left">本期提现</div>
          <div class="right">
            <div>现金：<span>{{balanceData.data.withdraw.sum_price}}</span></div>
            <div>承兑：<span>{{balanceData.data.withdraw.sum_acceptance_price}}</span></div>
          </div>
        </div>
      </div>
      <div class="more">
        <router-link :to="{
          path: '/check/balance',
          query: {
            show_year: balanceData.year,
            show_month: balanceData.month
            }
          }"
          ><mt-button type="primary">查看明细</mt-button></router-link>
      </div>
    </template>
  </div>
</template>

<script>
import {balanceCheck} from '@/data/getData';
export default {
  data () {
    return {
      balanceData: {
        data: '',
        year: '',
        month: ''
      }
    };
  },
  components: {
  },
  methods: {
    async balance (y, m) {
      let res = await balanceCheck({
        'show_year': y,
        'show_month': m
      });
      if (res.message === 'success') {
        this.balanceData.data = res.data.statistics;
        this.balanceData.year = y;
        this.balanceData.month = m;
      }
    },
    showDate () {
      this.$refs.date.click();
    },
    async changeDate () {
      let date = this.$refs.date.value.split('-');
      // 余额对账
      this.balance(date[0], date[1]);
    },
    async init () {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month === 1) {
        year -= 1;
        month = 12;
      }

      await this.balance(year, month);

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
