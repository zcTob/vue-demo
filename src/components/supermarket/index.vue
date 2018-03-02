<template>
  <div class="supermarket" v-if="items.lists!=null">
    <section class="s-c">
      <div class="select-column">
        <div class="sc" :class="{active: category.active}" @click="slShow('category',$event)">
          <span>{{category.name}}</span>
          <span class="sc-icon">
            <i class="down"></i>
          </span>
        </div>
        <div class="sc" :class="{active: standard.active}" @click="slShow('standard',$event)">
          <span>{{standard.name}}</span>
          <span class="sc-icon">
            <i class="down"></i>
          </span>
        </div>
        <div class="sc" :class="{active: storage.active}" @click="slShow('storage',$event)">
          <span>{{storage.name}}</span>
          <span class="sc-icon">
            <i class="down"></i>
          </span>
        </div>
        <div class="sc price-sort" @click="sortPrice()">
          <span>报价</span>
          <span class="sc-icon">
            <i class="up" v-show="sortPriceUp"></i>
            <i class="down" v-show="sortPriceDown"></i>
          </span>
        </div>
      </div>
      <div class="sm-content"> 
        <div class="items">
          <template v-if="items.lists">
            <mt-loadmore 
            :bottom-method="loadBottom" 
            :bottom-all-loaded="allLoaded" 
            @bottom-status-change="handleBottomChange"
            :autoFill="false"
            ref="loadmore"
            >
              <div class="item" v-for="(list,index) in items.lists" :key="index">
                <div class="title">
                  <span>{{list.factory_name}} {{list.category_name}}{{list.standard_name}}</span>
                  <span>库存：{{list.stock}}吨</span>
                </div>
                <div class="price">
                  <div class="left">
                    <div>
                      现金价：<span class="blue">{{list.price}}元/吨</span>
                    </div>
                    <div>
                      承兑价：<span class="orange">{{list.acceptance_price}}元/吨</span>
                    </div>
                  </div>
                  <div class="right">
                    <add-cart-btn :id="list.today_price_id"  v-on:addCart="addCart">购买</add-cart-btn>
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
          </template>
        </div>
      </div>
      <ball ref="ball"></ball>
    </section>
    <div class="sc-wrap" v-show="slSwitch" @click.self="slShow($event)"></div>
    <div class="select-list" v-show="slSwitch">
      <ul v-if="lists.name === 'category'">
        <li @click="select(lists.name, null, '品名')">全部</li>
        <li v-for="list in category.list" :key="list.id" @click="select(lists.name, list.id, list.name)">{{list.name}}</li>
      </ul>

      <ul v-if="lists.name === 'standard'">
        <li @click="select(lists.name, null, '规格')">全部</li>
        <li v-for="list in standard.list" :key="list.id" @click="select(lists.name, list.id, list.name)">{{list.name}}</li>
      </ul>

      <ul v-if="lists.name === 'storage'">
        <li @click="select(lists.name, null, '仓库')">全部</li>
        <li v-for="list in storage.list" :key="list.id" @click="select(lists.name, list.id, list.name)">{{list.name}}</li>
      </ul>
    </div>
    <m-footer ></m-footer>
  </div>
</template>

<script>
import mFooter from '@/components/common/mFooter';
import ball from '@/components/common/ball';
import addCartBtn from '@/components/btn/addCart';
import {supermarketData, category, standard, storage} from '@/data/getData';
export default {
  data () {
    return {
      slSwitch: false,
      sortPriceUp: false,
      sortPriceDown: false,
      allLoaded: false,
      bottomStatus: '',
      loadNoMore: false,
      items: {
        lists: '',
        current_page: ''
      },
      lists: {
        name: ''
      },
      category: {
        name: '品名',
        id: '',
        list: '',
        active: false
      },
      standard: {
        name: '规格',
        id: '',
        list: '',
        active: false
      },
      storage: {
        name: '仓库',
        id: '',
        list: '',
        active: false
      }
    };
  },
  components: {
    mFooter,
    addCartBtn,
    ball
  },
  methods: {
    addCart: function (target) {
      this.$refs.ball.drop(target);
    },
    async select (name, id, title) {
      this.sortPriceUp = false;
      this.sortPriceDown = false;
      this.loadNoMore = false;
      this[name].name = title;
      this[name].id = id;
      let res = await supermarketData({
        'factory_id': this.storage.id,
        'category_id': this.category.id,
        'standard_id': this.standard.id
      });
      this.items.lists = res.data.products.list;
      this.items.current_page = 1;
      this.$nextTick(() => {
        this.allLoaded = false;
        this[name].active = false;
        this.slSwitch = false;
      });
    },
    async slShow (name, $event) {
      this.lists.name = '';
      this.category.active = false;
      this.standard.active = false;
      this.storage.active = false;
      switch (name) {
        case 'category':
          if (!this.category.list) {
            let res = await category();
            this.category.list = res.data;
          }
          this.lists.name = 'category';
          this.category.active = true;
          break;
        case 'standard':
          if (this.category.id === '') {
            return;
          }
          let res = await standard(this.category.id);
          this.standard.list = res.data;
          this.lists.name = 'standard';
          this.standard.active = true;
          break;
        case 'storage':
          if (!this.storage.list) {
            let res = await storage();
            this.storage.list = res.data;
          }
          this.lists.name = 'storage';
          this.storage.active = true;
          break;
        default:
          this.category.active = false;
          this.standard.active = false;
          this.storage.active = false;
      }
      if (this.slSwitch === false) {
        this.slSwitch = true;
      } else {
        this.slSwitch = false;
        this.category.active = false;
        this.standard.active = false;
        this.storage.active = false;
      }
    },
    async sortPrice () {
      this.loadNoMore = false;
      if (this.sortPriceUp === false) {
        let res = await supermarketData({
          'factory_id': this.storage.id,
          'category_id': this.category.id,
          'standard_id': this.standard.id,
          'order_by': 'price',
          'order': 'asc',
          'keyword': this.$router.currentRoute.query.keyword
        });
        this.items.lists = res.data.products.list;
        this.items.current_page = 1;
        this.$nextTick(() => {
          this.sortPriceUp = true;
          this.sortPriceDown = false;
        });
      } else if (this.sortPriceUp === true) {
        let res = await supermarketData({
          'factory_id': this.storage.id,
          'category_id': this.category.id,
          'standard_id': this.standard.id,
          'order_by': 'price',
          'order': 'desc',
          'keyword': this.$router.currentRoute.query.keyword
        });
        this.items.lists = res.data.products.list;
        this.items.current_page = 1;
        this.$nextTick(() => {
          this.sortPriceUp = false;
          this.sortPriceDown = true;
        });
      }
    },
    init: async function () {
      var that = this;
      this.$store.dispatch('loading', {
        'loading_show': true
      });
      await supermarketData(that.$router.currentRoute.query).then((res) => {
        this.items.lists = res.data.products.list;
        this.items.current_page = 1;
        this.$store.dispatch('loading', {
          'loading_show': false
        });
      });
    },
    async loadBottom () {
      this.$refs.loadmore.translate = '-100';
      this.items.current_page += 1;
      let sort = null;
      if (this.sortPriceUp === true) {
        sort = 'asc';
      }
      if (this.sortPriceDown === true) {
        sort = 'desc';
      }
      let res = await supermarketData({
        'factory_id': this.storage.id,
        'category_id': this.category.id,
        'standard_id': this.standard.id,
        'page': this.items.current_page,
        'keyword': this.$router.currentRoute.query.keyword,
        'order_by': 'price',
        'order': sort
      });
      if (res.data.products.list.length === 0) {
        this.loadNoMore = true;
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        return;
      }

      for (let i = 0; i < res.data.products.list.length; i++) {
        this.items.lists.push(res.data.products.list[i]);
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
@import '../../style/base.styl'

.supermarket
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .s-c
    width: 100%;
    height: calc(100% - 98px);/*px*/
    overflow: scroll;
  .sc-wrap
    width: 100%;
    height: calc(100% - 80px);/*px*/
    background-color: #000;
    opacity : .5
    position: absolute;
    top: 80px;
    left: 0;
    z-index: 999;
  .select-list
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    z-index: 999999999999999;
    ul
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;
      li
        height: 80px;
        width: 100%;
        line-height : 80px;
        padding: 0 30px;
        border-bottom: 1px solid #dddddd;
        font-size: 28px;
        color: #2a2a2a;
  .select-column
    height: 80px;/*px*/
    display: flex
    align-items: center;
    background-color:#ffffff;
    // border-bottom-1px(#dddddd);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.05)
    .sc
      flex: 1
      text-align: center;
      font-size: 28px;
      color: #000;
      .sc-icon
        margin-left: 16px;
      .up:before
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 0px solid transparent
        border-right: 12px solid transparent
        border-bottom: 12px solid #c3c3c3
        border-left: 12px solid transparent
        position relative;
        top: -6px;
      .down:before
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 12px solid #c3c3c3
        border-right: 12px solid transparent
        border-bottom: 0px solid transparent
        border-left: 12px solid transparent
        position relative;
        top: -6px;
    .active
      .down:before
        border-top: 0px solid transparent
        border-bottom: 12px solid #247ef2


  .sm-content
    width: 100%;
    height: calc(100% - 80px);/*px*/
    overflow: scroll;
    .items
      .item
        height: 160px;
        padding: 0 30px
        border-bottom-1px(#dddddd);
        line-height: 1.5
        display: flex;
        flex-direction : column;
        justify-content: center;
        .title
          font-size: 28px;
          color: #2a2a2a;
          display: flex;
          justify-content: space-between;
        .price
          font-size: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left
            color: #989898;
          .right
            >>>button
              appearance none;
              outline : none;
              border: none;
              width: 95px;
              height: 50px;
              font-size: 24px;
              border-radius: 8px;
              background-color: #247ef2;
              color: #ffffff;
</style>

