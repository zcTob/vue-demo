<template>
  <div class="shopping-cart">
    <div class="content"  v-if="showView">
      <section class="sc-wrap">
        <div class="pay-type">
          <div>
            <span class="m-radio">
              <input type="radio" id="cash-payment" name="pay_type" v-model="cart.payType" value="银行汇款">
              <span class="m-radio-check"></span>
            </span>
            <label for="cash-payment">现金支付</label>
            <span class="m-radio">
              <input type="radio" id="accept-payment" name="pay_type" v-model="cart.payType" value="承兑汇票">
              <span class="m-radio-check"></span>
            </span>
            <label for="accept-payment">承兑支付</label>
          </div>
          <div class="clear-cart" id="clearCart" @click="clearCart()">清空</div>
        </div>

        <div class="shops">
          <template v-for="(good,index) in goods">
            <cart-list :item="good" :index="index" :key="index" :showPrice="showPrice" :showAcceptancePrice="showAcceptancePrice"></cart-list>
          </template>
        </div>

        <div class="sc-address">
          <div class="top">
            <div class="ad-icon">
              <i></i>
            </div>
            <div>
              <strong>收货地址</strong>
              <router-link to="/address/add" class="add-address-icon" ></router-link>
            </div>
          </div>
          <div class="item" v-for="(address,key) in addresses" :key="key">
            <!--<template  v-if="isNotRemove">-->
            <div class="list1">
              <div class="adr-checkbox">
                <span class="m-radio">
                  <input type="radio" id="" name="address" v-model="cart.address_id" :value="address.id">
                  <span class="m-radio-check"></span>
                </span>
              </div>
              <div>
                <span>收货人：{{ address.name }}</span>
                <span>{{ address.phone }}</span>
              </div>
            </div>
            <div class="list2">
              <span>
                收货地址： 231321
              </span>
              <span class="del" @click="removeAddress(key,address.id)">
                <i></i>
              </span>
            </div>
            <!--</template>-->
          </div>

        </div>
      </section>
      <div class="submit-order">
        <div class="total-num">
          共计{{ cartLength }}件&nbsp;{{ totalWeight }}吨 
        </div>
        <div class="total-price">
          <span v-if="showPrice">现金价: <span class="red">￥{{ totalPrice }}</span></span>
          <span v-if="showAcceptancePrice">承兑价: <span class="red">￥{{ totalAcceptancePrice }}</span></span>
        </div>
        <div class="submit-btn">
          <mt-button @click="submit">提交订单</mt-button>
        </div>
      </div>
    </div>
    <div class="default" v-if="!showView">
      <img src="./cart@2x.png" alt="">
      <h2>您的购物车暂未添加商品，去现货超市看看~</h2>
      <mt-button type="primary" @click="toBuy">逛一逛</mt-button>
    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
import mFooter from '@/components/common/mFooter';
import store from '@/store/index';
import cartList from './cartList';
import {common, project} from '@/config/common';
import MintUI from 'mint-ui';
import {addressLists, addressDelete, submitOrder, getCartList, removeCartList} from '@/data/getData';
export default {
  data () {
    return {
      goods: {},
      addresses: [
      ],
      cart: {
        shopList: []
      },
      init: false,
      computedAttr: {}
    };
  },
  components: {
    cartList,
    mFooter
  },
  watch: {
    xData: function (value) {
      this.computedAttr = this.changeCart();
    }
  },
  computed: {
    showView: function () {
      return this.$store.state.cartLength;
    },
    showPrice: function () {
      return (this.cart.payType === undefined) || (this.cart.payType === '银行汇款');
    },
    showAcceptancePrice: function () {
      return (this.cart.payType === undefined) || (this.cart.payType === '承兑汇票');
    },
    totalWeight () {
      return common.formatNumber(this.computedAttr.totalWeight);
    },
    cartLength () {
      return this.computedAttr.cartLength;
    },
    totalPrice () {
      return common.formatNumber(this.computedAttr.totalPrice);
    },
    totalAcceptancePrice () {
      return common.formatNumber(this.computedAttr.totalAcceptancePrice);
    },
    cartIDs () {
      return this.computedAttr.cartIDs;
    },
    xData: function () {
      return this.$store.state.cartList;
    }
  },
  methods: {
    toBuy () {
      this.$router.replace('/supermarket');
    },
    clearCart: function () {
      let ids = [];
      this.goods.forEach(function (item) {
        ids.push(item.cart_id);
      });
      this.$messagebox.confirm('您确定清空购物车商品?').then(action => {
        if (action === 'confirm') {
          removeCartList({product_id: ids}).then((resolve) => {
            store.commit('removeCartList');
          }).then((reject) => {
          });
        }
      }).catch(action => {
      });
    },
    submit: function () {
      let data = {};
      data.type = this.cart.payType;
      data.address_id = this.cart.address_id;
      data.cart_id = this.cartIDs;
      submitOrder(data).then((res) => {
        MintUI.MessageBox('提示', res.message).then(res => {
          for (let i in data.cart_id) {
            store.commit('removeCartListByCartID', data.cart_id[i]);
          }
          this.$router.push('/order');
        });
      }, (reject) => {
        let result = reject.data.data;
        if (typeof result.code !== 'undefined') {
          if (result.code === -2) {
            this.$router.push('/ticket/info');
          } else if (result.code === -1) {
            this.$router.push('/firm_approve');
          }
        }
      });
    },
    removeAddress: function (key, id) {
      let that = this;
      this.$messagebox.confirm('确定删除该地址?').then(action => {
        addressDelete({id: id}).then(function (resolve) {
          that.addresses.splice(key, 1);
        });
      }).catch(action => {});
    },
    changeCart: function (key) {
      let result = {
        cartLength: 0,
        totalPrice: 0,
        totalAcceptancePrice: 0,
        totalWeight: 0,
        cartIDs: []
      };
      if ((typeof this.goods.length) === 'undefined') return result;
      this.goods.forEach(item => {
        if (item.checked) {
          result.cartIDs.push(item.cart_id);
          result.cartLength++;
          result.totalPrice += Number(item.num) * Number(item.price);
          result.totalAcceptancePrice += Number(item.num) * Number(item.acceptance_price);
          result.totalWeight += Number(item.num);
        }
      });
      return result;
    }
  },
  created: function () {
    getCartList().then((resolve) => {
      resolve.data.carts.forEach(function (item) {
        project.cartConvert(item);
      });
      store.commit('cartList', resolve.data.carts);
      this.goods = this.$store.state.cartList;
    });
    // address
    addressLists().then((res) => {
      this.addresses = res.data;
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'

>>>.del
  i 
    bg-image(del-icon)
    display: inline-block;
    width: 25px;
    height: 30px;
    background-size: 100% 100%;
    background-repeat: no-repeat;

.shopping-cart
  width: 100%;
  height:  100%;
  background-color: #f8f8f8
  color: #000
  .content
    position : relative;
    width: 100%;
    height: calc(100% - 98px);
    .sc-wrap
      width: 100%;
      height: calc(100% );
      overflow-x: hidden;
      overflow-y: scroll;
    .pay-type
      background-color: #ffffff;
      height: 88px;
      display: flex;
      align-items: center;
      justify-content : space-between;
      padding: 0 25px;
      border-bottom-1px(#ddd)
      label
        margin-right: 40px;
      .m-radio
        margin-right: 12px;
      .clear-cart
        float: right;
        text-align: right;
        font-size: 24px;
        color: #000;
        padding-right: 30px;
    .shops
      background-color: #ffffff;
      >>>.item
        border-bottom-1px(#dddddd);
        padding: 0 46px 0 66px;
        height: 168px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .item-top
          position: relative;
          margin-bottom: 25px;
          div:nth-child(2)
            display: flex;
            justify-content: space-between;
            font-size: 24px;
            color: #000
          .shop-checkbox
            position: absolute;
            left: -40px;
        .item-c
          display: flex;
          flex-direction : row;
          justify-content: space-between;
          align-items: center;
          .left
            display: flex
            width 200px
            flex-direction : column;
            line-height : 1.5;
          .middle
            display:flex;
            flex-direction: row;
            align-items: center;
            .num
              height: 60px;
              width: 215px;
              border: 1px solid #c3c3c3;
              border-radius: 8px;
              display: flex;
              flex-direction: row;
              .add,.reduce
                display: inline-block;
                width: 60px;
                height: 60px;
                font-size: 28px;
                color: #989898;
                line-height : 60px;
                text-align: center;
              input
                outline : none ;
                border: none;
                appearance: none;
                width: 95px;
                height: 58px;
                border-left: 1px solid #c3c3c3;
                border-right: 1px solid #c3c3c3;
                text-align: center;
                padding: 0 10px;
                font-size: 24px;

    .sc-address
      margin-top: 20px;
      background-color: #ffffff;
      .top
        height: 88px;
        padding: 0 46px 0 66px;
        line-height : 88px;
        position: relative;
        border-bottom-1px(#dddddd)
        div:nth-child(2)
          display: flex;
          justify-content: space-between;
          align-items: center;
          strong 
            font-size: 28px;
            color: #2a2a2a;
          .add-address-icon
            display: inline-block;
            width: 54px;
            height: 54px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            bg-image(add-adr);
        .ad-icon
          position: absolute;
          left: 26px;
          i 
            display: inline-block;
            width: 21px;
            height: 30px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            bg-image(ad)
      .item
        min-height: 170px;
        padding: 0 46px 0 66px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-bottom-1px(#dddddd);
        font-size: 24px;
        color: #000
        .list1
          position: relative;
          margin-bottom: 20px;
          div:nth-child(2)
            display: flex;
            justify-content: space-between;
          .adr-checkbox
            position: absolute;
            left: -40px;
        .list2
          display: flex;
          justify-content: space-between;
          align-items: center;
    .submit-order
      width: 100%;
      background-color: #ffffff;
      height: 88px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      bottom: 0;
      font-size: 20px;
      color: #989898;
      .total-price
        margin: 0 20px;
        text-align:right;
        line-height 1.5;
        display: flex;
        flex-direction : column;
        .red
          font-size: 24px;
      .submit-btn
        margin-left: 20px;
        button
          width: 180px;
          height: 88px;
          line-height : 88px;
          background-color: #f22424;
          font-size: 28px;
          color: #ffffff;
  .default
    width: 100%;
    height: calc(100% - 98px - 88px);
    position:relative;
    display: flex;
    flex-direction : column;
    justify-content: center;
    align-items: center;
    padding: 0 10%;
    img 
      width: 238px;
      height: 308px;
    h2
      font-size: 24px;
      color: #0099ff;
      font-weight: normal
      margin: 60px 0 76px;
    button
      width: 200px;
      height: 60px;
      border-radius: 8px;
      background-color: #247ef2;
      font-size: 28px;
      color: #ffffff;
</style>

