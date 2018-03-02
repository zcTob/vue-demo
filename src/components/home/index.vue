<template>
  <div class="home" v-if="homeData !== null">
    <div class="wrap">
      <div class="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item>
            <img src="./0@2x.png" srcset="./0@2x.png 2x, ./0@3x.png 3x">
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="./1@2x.png" srcset="./1@2x.png 2x, ./1@3x.png 3x">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="goods">
        <div class="good" v-for="(list,index) in homeData.todayProducts" :key="index" 
        @click.stop="toSupermarket($event,list.standard_id, list.factory_id, list.category_id)">
          <div class="g-top">
            <span><a href="">{{list.factory_name}}</a></span>
            <span>{{list.date}}</span>
          </div>
          <div class="g-middle">
            <span>{{list.category_name}}{{list.standard_name}}</span>
            <span>{{list.rate}}% <i :class="list.icon === 'up'? 'price-up':'price-down'"></i></span>
          </div>
          <div class="g-bottom">
            <span>￥{{list.acceptance_price}}</span>
            <span><add-cart-btn :id="list.today_price_id" v-on:addCart="addCart">购买</add-cart-btn></span>
          </div>
        </div>
      </div>

      <div class="company-logo">
        <mt-swipe :auto="4000" :showIndicators='false'  :stopPropagation="true">
          <mt-swipe-item>
            <div class="cl-box">
              <div>
                <img src="./7@2x.png"  srcset="./7@2x.png 2x, ./7@3x.png 3x">
              </div>
              <div>
                <img src="./8@2x.png" srcset="./8@2x.png 2x, ./8@3x.png 3x">
              </div>
              <div>
                <img src="./9@2x.png" srcset="./9@2x.png 2x, ./9@3x.png 3x">
              </div>
            </div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="cl-box">
              <div>
                <img src="./10@2x.png" srcset="./10@2x.png 2x, ./10@3x.png 3x">
              </div>
              <div>
                <img src="./11@2x.png" srcset="./11@2x.png 2x, ./11@3x.png 3x">
              </div>
              <div>
                <img src="./12@2x.png" srcset="./12@2x.png 2x, ./12@3x.png 3x">
              </div>
            </div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="cl-box">
              <div>
                <img src="./13@2x.png" srcset="./13@2x.png 2x, ./13@3x.png 3x">
              </div>
              <div>
                
              </div>
              <div>
                
              </div>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>

      <div class="news">
        <div class="hot border-1px" @click="toNews(homeData.news.first.id)">
          <div class="left">
            <img src="./5@2x.png" srcset="./5@2x.png 2x, ./5@3x.png 3x">
          </div>
          <div class="right">
            <p><strong>【{{homeData.news.first.type}}】</strong>{{homeData.news.first.title}}</p>
            <div class="time"><i class="icon-time"></i>{{homeData.news.first.publish_at}}</div>
          </div>
        </div>
        <div class="item border-1px" v-for="(list,index) in homeData.news.list" :key="index" @click="toNews(list.id)">
          <p>{{list.title}}</p>
          <div class="time"><i class="icon-time"></i>{{list.publish_at}}</div>
        </div>
      </div>
    </div>
    <m-footer></m-footer>
    <ball ref="ball"></ball>
  </div>
</template>

<script>
import mFooter from '@/components/common/mFooter';
import addCartBtn from '@/components/btn/addCart';
import { homeData } from '@/data/getData';
import ball from '../common/ball';
export default {
  data () {
    return {
      homeData: null  // 主页数据
    };
  },
  components: {
    mFooter,
    addCartBtn,
    ball
  },
  created: function () {
    this.init();
  },
  mounted () {

  },
  methods: {
    addCart: function (target) {
      this.$refs.ball.drop(target);
    },
    toNews (id) {
      this.$router.push('/news/' + id);
    },
    toSupermarket ($event, standardId, factoryId, categoryId) {
      this.$router.push({
        path: '/supermarket',
        query: {
          'standard_id': standardId,
          'factory_id': factoryId,
          'category_id': categoryId
        }
      });
    },
    init: async function () {
      var that = this;
      that.$store.dispatch('loading', {
        'loading_show': true
      });
      await homeData().then((res) => {
        that.homeData = res.data;
      });
      that.$store.dispatch('loading', {
        'loading_show': false
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'
.home
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  .wrap
    width: 100%;
    height: calc(100% - 98px);/*px*/
    overflow-x : hidden;
    overflow-y: scroll;
  .banner 
    height: 234px;
    img 
      width: 100%;
      height: 234px;
  
  .goods
    margin-top: 20px;
    background-color:#ffffff;
    display: flex;
    flex-direction : row;
    flex-wrap: wrap;
    .good
      width: 50vw;
      height: 200px;
      padding: 16px;
      display: flex;
      justify-content: center;
      flex-direction: column
      line-height : 2;
      border-right: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;
      &>div
        display: flex;
        justify-content: space-between;
        align-items : center;
      .g-top
        span>a
          font-size: 28px;
          color: #282828;
        span 
          font-size: 24px;
          color: #989898;
      .g-middle
        span 
          font-size: 24px;
          color: #282828;
          i
            background-repeat: no-repeat;
            background-size: 100% 100%;
        .price-up
          bg-image(price-up)
          display: inline-block
          width: 18px;
          height: 19px;
        .price-down
          bg-image(price-down)
          display: inline-block
          width: 18px;
          height: 19px;
      .g-bottom
        span:nth-child(1)
          font-size: 36px;
          font-weight: bold;
          color: #247ef2
        span:nth-child(2)
          >>>button
            appearance none;
            outline : none;
            border: none;
            width: 85px;
            height: 50px;
            line-height : 50px;
            border-radius: 8px;
            background-color: #ffffff;
            border: 1px solid #247ef2;
            font-size: 24px;
            color: #247ef2;
  .company-logo
    width: 100%;
    height: 120px;
    background-color: #ffffff;
    margin: 20px 0;
    .cl-box
      margin-top: 25px;
      width: 100%;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      &>div
        width: 235px;
        height: 70px;
        display:flex;
        justify-content: center;
        align-items: center;
        img 
          width: 100%;
  .news      
    width: 100%;
    background-color: #ffffff;
    margin: 20px 0;
    padding-bottom: 26px;
    &>div
      padding: 20px;
      border-bottom-1px(#ddd)
    .hot
      display: flex;
      justify-content: flex-start;
      .left
        width: 250px;
        height: 145px;
        img 
          width: 250px;
          height: 145px;
          border-radius: 8px;
      .right
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between
        p
          margin: 0 10px;
          padding: 0;
          font-size: 28px;
          color: #282828;
          strong 
            color: #247ef2;
        .time
          text-align: right;
    .time
      font-size: 20px;
      color: #989898;
      text-align: right;
      .icon-time
        display: inline-block;
        width: 24px;
        height: 24px;
        bg-image(time);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 10px;
    .item
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 126px;
      p
        margin: 0;
        padding: 0;
        font-size: 28px;
        color: #282828;
</style>

