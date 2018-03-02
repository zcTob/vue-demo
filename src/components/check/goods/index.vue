<template>
  <div class="check-goods">
    <nav class="nav">
      <router-link :to="{
        path: '/check/goods/start',
        query: this.$route.query
        }"
      >
        期初余仓
      </router-link>

      <router-link :to="{
        path: '/check/goods/end',
        query: this.$route.query
        }"
      >
        期末余仓
      </router-link>

      <router-link :to="{
        path: '/check/goods/detail',
        query: this.$route.query
        }"
      >
        本期商品
      </router-link>
    </nav>
    <section class="content">
      <router-view @hide="hide"></router-view>
      <m-detail v-show="hide_switch"></m-detail>
    </section>
  </div>
</template>

<script>
import mDetail from '@/components/check/detail';
export default {
  data () {
    return {
      hide_switch: false
    };
  },
  components: {
    mDetail
  },
  methods: {
    hide (val) {
      this.hide_switch = val;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../style/base.styl'
.check-goods
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  .content
    height: calc(100% - 80px);
    padding-top: 20px;
    overflow-x : hidden;
    overflow-y : scroll;
  .nav
    height: 80px;
    line-height : 80px;
    display: flex;
    background-color: #fff;
    a
      flex: 1;
      text-align :center;
      color: #282828;
      font-size: 28px;
      &.active
        color: #26a2ff
        border-bottom: 2px solid #26a2ff;
        margin-bottom: -2px;
>>>.list
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
  .right
    text-align: right

</style>
