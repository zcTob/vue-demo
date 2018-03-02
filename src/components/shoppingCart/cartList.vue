<template>
  <div class="item" :key="index">
    <div class="item-top">
      <div class="shop-checkbox">
        <div class="m-checkbox">
          <input type="checkbox" name="ids" v-model="item.checked" @click="changeChecked">
          <span class="m-checkbox-check"></span>
        </div>
      </div>
      <div>
        <span>{{ item.name }}</span>
        <span>{{ item.depot }}</span>
      </div>
    </div>
    
    <div class="item-c">
      <div class="left">
        <span v-if="showPrice">现金价：{{ item.price }}</span>
        <span v-if="showAcceptancePrice">承兑价：{{ item.acceptance_price }}</span>
      </div>
      <div class="middle">
        <div class="num">
          <span class="add" @click="sub">-</span>
          <input type="number"  v-model="count"  @blur="" ref="input">
          <span class="reduce" @click="add">+</span>
        </div>
      </div>
      <div class="right">
        <div class="del" @click="remove">
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store/index';
  import {common, project} from '@/config/common';
  import {removeCartList} from '../../data/getData';

  export default {
    data () {
      return {
        counts: '1.00',
        checked: this.item.checked
      };
    },
    props: ['item', 'index', 'cart', 'showPrice', 'showAcceptancePrice'],
    computed: {
      count: {
        get: function () {
          return this.item.num;
        },
        set: function (value) {
          if (isNaN(value)) return;
          value = String(value);
          let formattedValue = value.trim().slice(
              0,
              value.indexOf('.') === -1
                ? value.length
                : value.indexOf('.') + 3
            );
          this.$refs.input.value = formattedValue;
          this.item.num = formattedValue;
          this.addCart(this.item.id, this.item.num);
          // this.setCount();
        }
      }
    },
    methods: {
      changeChecked: function () {
        this.checked = !this.checked;
        this.item.checked = this.checked;
        store.commit('cartList', {
          key: this.index,
          val: this.item
        });
      },
      add: function () {
        this.item.num++;
        this.setCount();
      },
      sub: function () {
        if (this.count > 1) {
          this.item.num--;
          this.setCount();
        }
      },
      setCount: function () {
        this.addCart(this.item.id, this.item.num);
        this.item.num = common.formatNumber(this.item.num);
        // store.commit('cartList', {
        //   key: this.index,
        //   val: this.item
        // });
      },
      remove () {
        let that = this;
        this.$messagebox.confirm('确定删除该商品?').then(function (action) {
          if (action === 'confirm') {
            removeCartList({product_id: that.item.cart_id}).then((resolve) => {
              store.commit('removeCartList', that.index);
            }).then((reject) => {
            });
          }
        }).catch(action => {
        });
      },
      async addCart (id, number) {
        project.addCart(id, number);
      }
    },
    mounted () {
    }
  };
</script>
