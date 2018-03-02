<template>
  <div class="personal-center" v-if="lDatas" v-cloak>
    <section class="main">
      <header>
        <div class="title">
          <span></span>
          <span></span>
          <span><router-link to="/personal/setting"><i class="setting-icon"></i></router-link></span>
        </div>
        <div class="content">
          <div class="headicon" @click="headIconShow">
            <img ref="headicon" border="0" :src="lDatas.avatar" alt="默认头像" @error.once="headIconError">
          </div>
          <div class="name">
            <strong>尊敬的{{lDatas.name}}</strong>
            <span>您好,欢迎来到炉料汇</span>
          </div>
          <div class="approve_status">{{lDatas.status}}</div>
        </div>
      </header>
      <nav>
        <div class="item">
          <router-link to="/personal/info">
            <figure>
              <img src="./nav1@2x.png" alt="" srcset="./nav1@2x.png 750w,./nav1@3x.png 1050w">
              <figcaption>个人资料</figcaption>
            </figure>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/order">
            <figure>
              <img src="./nav2@2x.png" alt="" srcset="./nav2@2x.png 750w,./nav2@3x.png 1050w">
              <figcaption>订单中心</figcaption>
            </figure>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/check">
            <figure>
              <img src="./nav3@2x.png" alt="" srcset="./nav3@2x.png 750w,./nav3@3x.png 1050w">
              <figcaption>对账单</figcaption>
            </figure>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/csb">
            <figure>
              <img src="./nav4@2x.png" alt="" srcset="./nav4@2x.png 750w,./nav4@3x.png 1050w">
              <figcaption>采赊宝</figcaption>
            </figure>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/logistics">
            <figure>
              <img src="./nav5@2x.png" alt="" srcset="./nav5@2x.png 750w,./nav5@3x.png 1050w">
              <figcaption>物流</figcaption>
            </figure>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/balance">
            <figure>
              <img src="./nav6@2x.png" alt="" srcset="./nav6@2x.png 750w,./nav6@3x.png 1050w">
              <figcaption>余额</figcaption>
            </figure>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/depot">
            <figure>
              <img src="./nav7@2x.png" alt="" srcset="./nav7@2x.png 750w,./nav7@3x.png 1050w">
              <figcaption>余仓</figcaption>
            </figure>
          </router-link>
        </div>
      </nav>
      <template v-if="lDatas.show_list">
        <div class="info-show" >
          <section>
            <div v-for="(ldata,index) in lDatas.bottom.list" :key="index">
              <!-- 物流动态 -->
              <div class="item" v-if="ldata.item_type === 'delivery_record'">
                <div class="title">
                  <div class="left">
                    <i class="logistics-icon"></i>
                    物流动态
                  </div>
                  <div class="right" @click="hideDynamic($event, index)">
                    <i class="icon-more"></i>
                    <div class="wrap" v-show="index === wrapShow">
                      <div class="show"  @click="setDynamic('logistics')">
                        <i></i>
                        不在接收此动态
                      </div>
                    </div>
                  </div>
                </div>
                <div class="time">{{ldata.updated_at_string}}</div>
                <div class="content">
                  <div class="status">
                    <div class="left">订单编号:2588899665412</div>
                    <div class="right"><span class="primary">{{ldata.status}}</span></div>
                  </div>
                  <div class="detail">
                    <p v-for="(item,i) in ldata.products" :key="i">{{item.product_name}}  {{item.type}}{{item.unit_price}}元*{{item.number}}吨</p>
                  </div>
                </div>
                <!-- <div class="footer">
                  <span>总计：6吨</span>&nbsp;&nbsp;
                  <span>承兑金额：￥656565.00</span>
                </div> -->
              </div>
              <!-- 订单动态 -->
              <div class="item" v-else-if="ldata.item_type === 'order'">
                <div class="title">
                  <div class="left">
                    <i class="order-icon"></i>
                    订单动态
                  </div>
                  <div class="right" @click="hideDynamic($event, index)">
                    <i class="icon-more"></i>
                    <div class="wrap" v-show="wrapShow === index">
                      <div class="show" @click="setDynamic('order')">
                        <i></i>
                        不在接收此动态
                      </div>
                    </div>
                  </div>
                </div>
                <div class="time">{{ldata.updated_at_string}}</div>
                <div class="content">
                  <div class="status">
                    <div class="left">订单编号:{{ldata.number}}</div>
                    <div class="right"><span class="primary">{{ldata.status}}</span></div>
                  </div>
                  <div class="detail">
                    <p v-for="(item,i) in ldata.items" :key="i">{{item.product_name}}  {{item.type}}{{item.unit_price}}元*{{item.number}}吨</p>
                  </div>
                </div>
                <div class="footer">
                  <span>总计：{{ldata.count}}吨</span>&nbsp;&nbsp;
                  <span>{{ldata.type}}：￥{{ldata.total_price}}</span>
                </div>
              </div>
              <!-- 充值动态 -->
              <div class="item" v-else-if="ldata.item_type === 'recharge'">
                <div class="title">
                  <div class="left">
                    <i class="recharge-icon"></i>
                    充值动态
                  </div>
                  <div class="right" @click="hideDynamic($event, index)" >
                    <i class="icon-more"></i>
                    <div class="wrap" v-show="wrapShow === index">
                      <div class="show" @click="setDynamic('recharge')">
                        <i></i>
                        不在接收此动态
                      </div>
                    </div>
                  </div>
                </div>
                <div class="time">{{ldata.updated_at_string}}</div>
                <div class="content">
                  <div class="status">
                    <div class="left">{{ldata.items[0].type}}: ￥{{ldata.items[0].amount}}</div>
                    <div class="right"><span class="primary">已审核</span></div>
                  </div>
                </div>
              </div>
              <!-- 发票动态 -->
              <div class="item" v-else-if="ldata.item_type === 'invoice_record'">
                <div class="title">
                  <div class="left">
                    <i class="ticket-icon"></i>
                    发票动态
                  </div>
                  <div class="right" @click="hideDynamic($event, index)">
                    <i class="icon-more"></i>
                    <div class="wrap" v-show="wrapShow === index">
                      <div class="show" @click="setDynamic('invoice')">
                        <i></i>
                        不在接收此动态
                      </div>
                    </div>
                  </div>
                </div>
                <div class="time">{{ldata.updated_at_string}}</div>
                <div class="content">
                  <div class="status">
                    <div class="left">发票号:{{ldata.number}}</div>
                    <div class="right"><span class="primary">{{ldata.status}}</span></div>
                  </div>
                  <div class="detail">
                    <p v-for="(item,i) in ldata.items" :key="i">{{item.product_name}}  {{item.type}}{{item.unit_price}}元*{{item.number}}吨</p>
                  </div>
                </div>
                <div class="footer">
                  <span>开票金额：￥{{ldata.amount}}</span>
                </div>
              </div>
              <div class="item" v-else></div>
            </div>
          </section>
          <!-- 订单列表 -->
          <section>
            <div v-for="(ldata,index) in lDatas.bottom.orders" :key="index">
              <div class="order-detail">
                <div class="title border-1px">
                  <span class="left ">订单编号:{{ldata.number}}</span>
                  <span class="right">{{ldata.type}}</span>
                </div>
                <div class="content">
                  <div class="list" v-for="(item,i) in ldata.items" :key="i">
                    <span>{{item.product_name}}</span>
                    <span>{{item.number}}吨</span>
                  </div>
                  <div class="list">
                    <span>博丰生铁&nbsp;球铁10#</span>
                    <span>10吨</span>
                  </div>
                  <div class="list-footer">
                    共计{{ldata.count}}件&nbsp;&nbsp;订单总额<strong>￥：{{ldata.amount}}</strong>
                  </div>
                </div>
                <!-- <div class="od-footer border-1px">
                  <a href="">再来一单</a>
                </div> -->
              </div>
            </div>
          </section>
        </div>
      </template>
      <template v-else>
        <div class="info">
          <section class="firm">
            <router-link  to="/firm_approve">
              <div class="item">
                <img src="./approve.png" alt="" srcset="./approve@2x.png 750w,./approve@3x.png 1050w">
                <h3>欢迎来到炉料汇</h3>
                <h3>
                  <strong v-if="lDatas.certification_status === 0">前去认证</strong>
                  <strong v-if="lDatas.certification_status === 1">审核中</strong>
                  <strong v-if="lDatas.certification_status === 2">已认证</strong>
                </h3>
              </div>
            </router-link>
          </section>
          <section class="ticket">
            <router-link  to="/ticket/info">
              <div class="item">
                <img src="./ticket.png" alt="" srcset="./ticket@2x.png 750w,./ticket@3x.png 1050w">
                <h3>方便准确开票</h3>
                <h3>
                  <strong v-if="lDatas.invoice_status === 0">填写开票资料</strong>
                  <strong v-if="lDatas.invoice_status === 1">已填写</strong>                 
                </h3>
              </div>
            </router-link>
          </section>
          <section class="address">
            <router-link  to="/address/index">
              <div class="item">
                <img src="./address.png" alt="" srcset="./address@2x.png 750w,./address@3x.png 1050w">
                <h3>方便及时发货</h3>
                <h3>
                  <strong v-if="lDatas.address_status === 0">填写收货地址</strong>
                  <strong v-if="lDatas.address_status === 1">已填写</strong>
                </h3>
              </div>
            </router-link>
          </section>
        </div>
      </template>
    </section>
    <m-footer ></m-footer>
    <mt-popup
      v-model="visible"
    >
    </mt-popup>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
    >
      <img class="popup-img" :src="imgPreview" alt="imgPreview">
    </mt-popup>
  </div>
</template>

<script>
import mFooter from '@/components/common/mFooter';
import {personalCenterData} from '@/data/getData';
export default {
  data () {
    return {
      visible: false,
      wrapShow: null,
      lDatas: null,
      imgPreview: null,
      popupVisible: false
    };
  },
  computed: {

  },
  components: {
    mFooter
  },
  mounted () {

  },
  watch: {
    visible: function (val) {
      if (val === false) {
        this.wrapShow = null;
      }
    }
  },
  methods: {
    headIconShow () {
      this.imgPreview = this.$refs.headicon.src;
      this.popupVisible = true;
    },
    hideDynamic ($event, index) {
      // this.wrapShow = index;
      // this.visible = true;
    },
    async init () {
      try {
        this.$store.dispatch('loading', {
          'loading_show': true
        });
        let data = await personalCenterData();
        this.lDatas = data.data;
        this.$store.dispatch('loading', {
          'loading_show': false
        });
      } catch (err) {
      }
    },
    async setDynamic (name) {
      // let res = await personalSetting({
      //   'key': name,
      //   'value': 0
      // });

      // if (res.data === 'success') {
      //   this.visible = false;
      //   this.$messagebox.alert(res.message).then(action => {
      //     this.init();
      //   });
      // }
    }
  },
  created () {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../style/base.styl'
.personal-center
  width: 100%;
  height: 100%;
  background-color: #f8f8f8
  padding-bottom: 98px;
  .main
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 20px;
    header
      padding-top: 30px
      height: 316px
      background-image: linear-gradient(to right,#56ccf2, #247ef2)
      .title
        text-align: center;
        color: rgba(255, 255, 255, 0.8)
        font-size: 36px
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;
        .setting-icon
          bg-image('icon-setting')
          display: inline-block;
          width: 35px;
          height:40px;
          background-size: 100% 100%
          background-repeat: no-repeat
      .content
        height: 140px
        padding-left: 30px
        display: flex
        align-items: center
        justify-content : space-between
        margin-top: 40px
        .headicon
          border: none;
          border-radius: 50%;
          width: 140px;
          height: 140px;
          background-color: #ffffff;
          img
            border: none
            appearance none
            outline: none;
            width: 140px;
            height: 140px;
            border-radius: 50%;
        .name
          margin-left: 14px
          display: flex
          flex-direction: column
          flex: 1
          strong 
            font-size: 36px;/*px*/
            color: #ffffff
            font-weight: 500
            margin-bottom: 8px
            letter-spacing : 2px
          span 
            font-size: 20px;/*px*/
            color: #aee1ff;
            letter-spacing : 2px
            overflow: hidden;
            text-overflow: ellipsis;
        .approve_status
          justify-content: flex-end
          width: 130px
          height: 60px
          line-height 60px
          text-align center
          background-image: url('./approve-bg@2x.png')
          background-repeat: no-repeat
          background-size: 100%
          font-size: 28px;
          color: #ffffff;
          padding-left: 8px;
    nav
      display: flex;
      flex-direction : row
      flex-wrap: wrap
      padding-top: 56px
      background-color: #ffffff;
      .item
        text-align: center
        width: 25%
        margin-bottom: 50px
        figure
          margin: 0
          figcaption
            line-height 2
            font-size: 24px;/*px*/
            color: #282828
    .info
      .firm,.ticket,.address
        padding: 10px 30px
        background-color: #fff;
        margin-bottom: 20px;
        margin-top: 20px;
      .item
        border: 1px dashed #247ef2;/*no*/
        height: 202px
        text-align: center
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        h3
          margin: 0
          font-weight: normal
          font-size: 24px
          line-height: 1.5
          color: #282828
          strong 
            font-size: 28px
    .info-show
      background-color: #f8f8f8;
      .item
        min-height: 270px;
        background: #ffffff
        padding: 20px 30px
        margin-top: 20px
        margin-bottom: 20px
        .title
          display: flex
          justify-content: space-between;
          .left
            color: #787878
            font-size: 20px;
            i
              background-size: 100% 100%;
              background-repeat: no-repeat
              display: inline-block
              margin-right: 4px
            .order-icon
              background-image: url('./order-icon.png')
              width: 18px
              height: 18px 
            .recharge-icon
              background-image: url('./recharge-icon.png')
              width: 20px
              height: 20px
            .ticket-icon
              background-image: url('./ticket-icon.png')
              width: 20px
              height: 15px
            .logistics-icon
              background-image: url('./logistics-icon.png')
              width: 20px
              height: 15px 
          .right
            position: relative;
            .icon-more
              display: inline-block
              width: 38px;
              height: 6px;
              background-image: url('./icon-more.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
            .wrap
              position: absolute;
              right: 0px;
              top: 40px;
              z-index : 3000;
              display: block
            .show
              width: 550px;
              height: 80px;
              display: flex;
              align-items: center
              background-color: #fff;
              border-radius: 8px;
              padding: 10px;
              font-size: 28px;
              color: #282828;
              &:before
                display: inline-block;
                width: 0px;
                height: 0px;
                content: '';
                position: absolute;
                top: -20px;
                right: 10px;
                border-style: solid;
                border-color: transparent transparent rgb(255,255,255);
                border-image: initial;
                border-width: 10px;
              i 
                display: inline-block;
                width: 28px;
                height:28px;
                bg-image('icon1')
                background-size: 100% 100%
                background-repeat: no-repeat
                margin-left: 24px;
                margin-right: 20px;
        .time
          font-size: 20px;
          color: #989898;
        .content
          .status
            display: flex
            justify-content: space-between;
            margin: 20px 0;
            .left
              font-size: 28px;
              color: #282828;
              font-weight: 500
            .right
              font-size: 28px;
              .warning
                color: #ff0000
              .primary
                color: #247ef2
          .detail
            p
              margin: 0;
              padding: 0;
              font-size: 22px;
              color: #787878;
              line-height 2
         .footer
            text-align: right;
            font-size:  24px;
            color: #787878;
            margin: 20px 0;
      .order-detail
        background-color: #ffffff;
        min-height : 300px;
        margin-top: 20px
        margin-bottom: 20px
        .title
          padding-top: 10px
          margin-left: 30px
          margin-right: 30px
          border-bottom-1px(#dddddd)
          display: flex
          justify-content: space-between
          font-size: 28px;
          color: #282828;
          line-height: 50px
          .left
            padding-left: 16px;
            position: relative
            &:before
              content: ''
              width: 8px;
              height: 30px;
              background-color: #247ef2;
              position: absolute;
              top: 11px;
              left: 0
        .content
          padding: 0 30px 0 38px;
          .list
            padding-left: 8px;
            display: flex;
            justify-content: space-between
            font-size: 24px;
            color: #787878
            line-height : 2
          .list-footer
            text-align: right;
            padding-top: 40px;
            padding-bottom: 20px;
            strong 
              font-size: 24px
              color: #282828
        .od-footer
          border-top-1px(#dddddd)
          height: 72px;
          display: flex
          align-items: center
          padding: 0 30px;
          flex-direction : row-reverse
          a
            display: inline-block
            width: 130px;
            height: 50px;
            line-height : 50px;
            border-radius: 4px;
            border: 1px solid #247ef2;
            font-size: 24px;
            color: #247ef2;
            text-align: center


  .mint-popup {
    background: transparent
  } 
  .popup-img {
    max-width: 80vw
  }
</style>
