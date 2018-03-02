import {addCart} from '../data/getData';
import store from '../store/index';
let common, project;
common = {};
project = {};

common.objEmpty = function (obj) {
  for (let key in obj) {
    return false;
  }
  return true;
};
common.formatNumber = function (number) {
  if (isNaN(number)) number = 0;
  return Number(number).toFixed(2);
};

common.setStore = function (name, content) {
  if (!name) return false;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
common.getStore = function (name) {
  if (!name) return false;
  let result = window.localStorage.getItem(name);
  if (result == null) return false;
  else if (result.substr(0, 2) === '[{') {
    return JSON.parse(result);
  } else if (result === '[]') {
    return false;
  }
  return result;
};

/**
 * 删除localStorage
 */
common.removeStore = function (name, content) {
  if (!name) return false;
  window.localStorage.removeItem(name);
};

common.getJson = (json) => {
  return JSON.parse(JSON.stringify(json));
};

project.cartConvert = function (item) {
  item.name = item.factory_name + ' ' + item.category_name + '' + item.standard_name;
  delete item.factory_name;
  delete item.category_name;
  delete item.standard_name;
  item.depot = item.storage_name;
  item.price = item.price.toFixed(2);
  item.acceptance_price = item.acceptance_price.toFixed(2);
  return item;
};

project.addCart = function (id, number, goodsItem = {}) {
  let param, isAdd;
  isAdd = true;
  if (isNaN(number) || Number(number) <= 0.01) {
    return;
  }
  // 更新数量
  store.state.cartList.forEach(function (item, index) {
    if (Number(item.id) === Number(id)) {
      isAdd = false;
      item.num = number;
      store.commit('cartList', {key: index, val: item});
      return false;
    }
  });
  let index;
  // add 先设置购物车数量，请求接口后异步同步数据，
  if (isAdd) {
    goodsItem = {
      num: number,
      id: id
    };
    store.commit('addCart', goodsItem);
    index = store.state.cartList.length - 1;
  }
  param = {
    'product_id': id,
    'number': number
  };
  return addCart(param).then((res) => {
    if (typeof index !== 'undefined') {
      store.commit('cartList', {key: index, val: res.data.cart});
    }
  }).catch((err) => {
    console.log(err);
  });
};

export {common, project};
