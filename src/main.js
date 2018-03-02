// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import '../static/flexible.min.js';
import 'normalize.css';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './style/common.styl';
import App from './App';
import router from './router';
import store from './store/';
import './style/mint_reset.styl';
import FastClick from 'fastclick';

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

Vue.config.productionTip = false;
Vue.use(MintUI);

Vue.prototype.$axios = axios;
/* eslint-disable no-new */

Vue.prototype.createObjectURL = function (blob) {
  if (window.URL) {
    return window.URL.createObjectURL(blob);
  } else if (window.webkitURL) {
    return window.webkitURL.createObjectURL(blob);
  } else {
    return null;
  }
};

Vue.prototype.headIconError = function (err) {
  err.target.src = './static/img/default-icon@2x.png';
};

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
