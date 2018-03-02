<template>
  <div class="search">
    <form action="" @submit="search($event)">
      <mt-search v-model="value" :show="true" placeholder="找现货">
       <div v-if="history.length !== 0">
          <mt-cell
            v-for="(item,index) in history"
            :title="item"
            :key="index"
            @click.native.stop="search($event,item)"
          >
            <div class="mint-field-clear" @click.stop="clear(index)">
              <i class="mintui mintui-field-error"></i>
            </div>
          </mt-cell>
        </div>
      </mt-search> 
    </form>
    <m-footer></m-footer>
  </div>
</template>

<script>
import mFooter from '@/components/common/mFooter';
export default {
  data () {
    return {
      value: ''
    };
  },
  components: {
    mFooter
  },
  computed: {
    history () {
      return this.$store.getters.getSearchHistory;
    }
  },
  methods: {
    async search (e, keyword) {
      if (keyword) {
        this.$router.push({
          path: '/supermarket',
          query: {
            keyword: keyword
          }
        });
      } else {
        this.$store.dispatch('setSearchHistory', this.value);
        this.$router.push({
          path: '/supermarket',
          query: {
            keyword: this.value
          }
        });
      }
    },
    clear (i) {
      if (this.history.length === 1) {
        this.$store.dispatch('setSearchHistory', []);
      } else {
        this.history.splice(i, 1);
        let arr = this.history;
        this.$store.dispatch('setSearchHistory', arr);
      }
    }
  },
  mounted () {
  }
};
</script>

<style lang="stylus" scoped>
.search
  >>>.mint-search
    height: calc(100vh - 88px);
    .mint-searchbar
      padding: 16px 20px;
      .mint-searchbar-inner
        border-radius: 4px;
        height: 56px;
        padding: 8px 12px;
        .mintui-search
          font-size: 28px;
        .mint-searchbar-core
          padding-left: 20px;
      .mint-searchbar-cancel
        margin-left: 20px;
  >>>.mint-search-list
    padding-top: 88px;
    .mint-cell-wrapper
      background-size: 120% 2px;/*px*/
</style>

