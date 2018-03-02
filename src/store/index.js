import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';
Vue.use(Vuex);

const state = {
  token: false,
  user: {
    islogin: false,
    username: null,
    password: null,
    id: 0
  },
  cartList: [],
  cartLength: null,
  loading_show: false,
  shoppingCart: null,
  supermarketData: null,
  searchHistory: []
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
