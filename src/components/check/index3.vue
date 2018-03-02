<template>
  <div class="check-ticket-detail">
    <!-- 开票对账 -->
    <template v-if="ticketData.data">
        <div class="item">
            <div class="title">
            <div></div>
            <div class="time"><span class="year blue">{{ticketData.year}}</span>年<span class="month blue">{{ticketData.month}}</span>月&nbsp;开票对账</div>
            <div class="header-date">
                <form action="">   
                    <input type="month" ref="date" class="select_date" name="date" @change="changeDate" >
                </form> 
            </div>
            </div>
            <div class="sub-title">
            <span class="blue">期初票额</span>
            <span class="blue">期末票额</span>
            </div>
            <div class="content">
            <div class="left">
                <div><span class="">￥{{ticketData.data.start}}</span></div>
            </div>
            <div class="right">
                <div><span>￥{{ticketData.data.end}}</span></div>
            </div>
            </div>
            <div class="ticket-footer">
            <div>本期票额</div>
            <div>￥{{ticketData.data.period}}</div>
            </div>
        </div>
        <div class="more">
            <router-link :to="{
            path: '/check/ticket',
            query: {
                show_year: ticketData.year,
                show_month: ticketData.month
                }
            }"><mt-button type="primary">查看明细</mt-button></router-link>
        </div>
    </template>
  </div>
</template>

<script>
import {ticketCheck} from '@/data/getData';
export default {
  data () {
    return {
      ticketData: {
        data: '',
        year: '',
        month: ''
      }
    };
  },
  components: {
  },
  methods: {
    async ticket (y, m) {
      let res = await ticketCheck({
        'show_year': y,
        'show_month': m
      });
      if (res.message === 'success') {
        this.ticketData.data = res.data;
        this.ticketData.year = y;
        this.ticketData.month = m;
      }
    },
    showDate () {
      this.$refs.date.click();
    },
    async changeDate () {
      let date = this.$refs.date.value.split('-');
      // 开票对账
      this.ticket(date[0], date[1]);
    },
    async init () {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month === 1) {
        year -= 1;
        month = 12;
      }

      await this.ticket(year, month);

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
