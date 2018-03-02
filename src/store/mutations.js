import * as types from './mutations-types';
import {common} from '../config/common';
import Vue from 'vue';
export default {
  [types.LOADING] (state, data) {
    state.loading_show = data.loading_show;
  },
  [types.LOGOUT] (state, data) {
    state.token = false;
  },
  [types.TOKEN] (state, data) {
    state.token = data.token;
  },
  [types.SUPERMARKET_DATA] (state, data) {
    state.SUPERMARKET_DATA = data;
  },
  [types.SET_SEARCH_HISTORY] (state, data) {
    if (data instanceof Array) {
      if (data.length === 0) {
        window.localStorage.removeItem('searchHistory');
      } else {
        window.localStorage.setItem('searchHistory', data);
      }
      // state.searchHistory = data;
    } else {
      var his = window.localStorage.getItem('searchHistory');
      if (his) {
        var arr = his.split(',');
        arr.push(data);
        window.localStorage.setItem('searchHistory', arr);
      } else {
        window.localStorage.setItem('searchHistory', data);
      }
      // state.searchHistory.push(data);
    }
    var sh = window.localStorage.getItem('searchHistory');
    if (!sh) {
      state.searchHistory = [];
    } else {
      state.searchHistory = sh.split(',');
    }
  },
  cartList (state, cartList) {
    if (cartList.key !== undefined) {
      Vue.set(state.cartList, cartList.key, cartList.val);
    } else {
      state.cartList = cartList;
    }
    state.cartLength = state.cartList.length;

    common.setStore('cartList', state.cartList);
  },
  removeCartList (state, key) {
    if (key !== undefined) {
      state.cartList.splice(key, 1);
    } else {
      state.cartList.splice(0);
    }
    state.cartLength = state.cartList.length;

    common.setStore('cartList', state.cartList);
  },
  removeCartListByCartID (state, cartId) {
    state.cartList.forEach(function (item, index) {
      if (parseInt(item.cart_id) === parseInt(cartId)) {
        state.cartList.splice(index, 1);
      }
    });
    state.cartLength = state.cartList.length;

    common.setStore('cartList', state.cartList);
  },
  addCart (state, info, index = 0) {
    if (index === 0) {
      index = parseInt(state.cartList.length);
      state.cartList.push(info);
    }
    state.cartLength = index + 1;
    common.setStore('cartList', state.cartList);
  },
  cartLength (state, length) {
    state.cartLength = length;
  }
};
