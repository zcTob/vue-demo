import axios from 'axios';
import MintUI from 'mint-ui';
import store from '@/store/index';
import router from '@/router/index';
import * as types from '@/store/mutations-types';
import qs from 'qs';

// axios.defaults.baseURL = process.env.REMOTE_HOST;
// axios.defaults.baseURL = window.location.origin;
// axios.defaults.baseURL = 'http://zyweb.xin';
axios.defaults.baseURL = 'http://s2test.luliaohui.com';
// axios.defaults.baseURL = 'http://192.168.10.4:7923';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.timeout = 5000;

axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      return config;
    } else {
      config.data = qs.stringify(config.data);
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
let thisInit = 0;
axios.interceptors.response.use(function (response) {
  if (response.status !== 200) {
    return Promise.reject(response);
  }
  if (store.state.islogin && thisInit === 0) {
    thisInit = 1;
    cartLength().then((res) => {
      store.commit('cartLength', res.data.count);
    });
  }
  return response.data;
}, async function (error) {
  if (error.response) {
    MintUI.MessageBox.close(false);
    switch (error.response.status) {
      case 401:
        store.commit(types.LOGOUT);
        router.replace('/login');
        break;
      case 400:
        await MintUI.MessageBox('提示', error.response.data.message).then(function (res) {
          return Promise.reject(error.response);
        });
        break;
      case 422:
        let message;
        for (let i in error.response.data) {
          message = error.response.data[i][0];
          break;
        }
        await MintUI.MessageBox('提示', message).then(function (res) {
          return Promise.reject(error.response);
        });
        break;
      case 406:
        await MintUI.MessageBox('提示', error.response.data.message).then(function (res) {
          return Promise.reject(error.response);
        });
        break;
      default:
        await MintUI.MessageBox('提示', '网络出错了，请刷新页面。');
        return Promise.reject(error);
    }
  }
});

// 获取登录验证码
export const loginYzm = () => {
  return axios.get('/wapapi/login');
};

// 登录
export const loginIn = (data) => axios.post('/wapapi/login', data);

// 退出登录
export const loginOut = () => axios.get('/wapapi/logout');

// 首页数据
export const homeData = () => axios.get('/wapapi/main');

// 炉料资讯
export const getNewsInfo = (id) => axios.get('/wapapi/news-information/' + id);

// 炉料超市
export const supermarketData = (data) => axios.get('/wapapi/supermarket', {params: data});
export const category = () => axios.get('/wapapi/supermarket/category');
export const standard = (id) => axios.get('/wapapi/supermarket/standard', {params: {'category_id': id}});
export const storage = () => axios.get('/wapapi/supermarket/storage');
// 加入购物车
export const addCart = (data) => axios.post('/wapapi/shopping-cart/add-product', data);
export const getCartList = (data) => axios.get('/wapapi/shopping-cart', data);
export const removeCartList = (data) => axios.post('/wapapi/shopping-cart/remove-product', data);
export const cartLength = (data) => axios.get('/wapapi/shopping-cart/cart-length', data);

// 注册短信验证码
export const registerYzm = (tel) => axios.post('/wapapi/register/sms', tel);

// 注册新账户
export const register = (data) => axios.post('/wapapi/register', data);

// 找回密码 --------手机验证码
export const backPasswordYzm = (data) => axios.post('/wapapi/password/sms', data);

// 找回密码
export const backPassword = (data) => axios.post('/wapapi/password/reset', data);

// 个人中心
export const personalCenterData = () => axios.get('/wapapi/member-center');

// 个人设置
export const personalSettingData = () => axios.get('/wapapi/member-dynamics-setting');
export const personalSetting = (data) => axios.post('/wapapi/member-dynamics-setting/set', data);
// 个人资料
export const personalCenterInfo = () => axios.get('/wapapi/member-center/profile');
// 修改个人资料
export const personalCenterEdit = (data) => axios.post('/wapapi/member-center/profile/save', data);
// 原手机验证码接口
export const oldPhoneYzm = (data) => axios.post('/wapapi/member-center/change-phone/now-phone-sms', data);
// 新手机验证码接口
export const newPhoneYzm = (data) => axios.post('/wapapi/member-center/change-phone/new-phone-sms', data);
// 修改手机
export const changePhone = (data) => axios.post('/wapapi/member-center/change-phone', data);
// 修改密码
export const passwordEdit = (data) => axios.post('/wapapi/member-center/change-password', data);
// 修改头像
export const headIcon = (data) => axios({
  url: '/wapapi/member-center/avatar',
  method: 'POST',
  headers: {'Content-Type': 'multipart/form-data'},
  data: data
});

// 获取企业认证信息
export const firmApproveData = () => axios.get('/wapapi/certification');

// 保存企业认证信息
export const firmApprove = (data) => axios({
  url: '/wapapi/certification/save',
  method: 'POST',
  headers: {'Content-Type': 'multipart/form-data'},
  data: data
});

//  获取开票信息
export const ticketInfoData = () => axios.get('/wapapi/invoice');

// 保存开票信息
export const ticketInfo = (data) => axios({
  url: '/wapapi/invoice/save',
  method: 'POST',
  headers: {'Content-Type': 'multipart/form-data'},
  data: data
});

// 地址列表
export const addressLists = () => axios.get('/wapapi/address');
export const addressList = (id) => axios.get('/wapapi/address/' + id);

// 新增地址
export const addressAdd = (data) => axios.post('/wapapi/address/add', data);
// 更新地址
export const addressUpdate = (data) => axios.post('/wapapi/address/update', data);
// 删除地址
export const addressDelete = (data) => axios.post('/wapapi/address/delete', data);
// 设为默认地址
export const addressDefault = (id) => axios.post('/wapapi/address/default',
  {
    'id': id
  });

// 订单中心
export const orderLists = (data) => axios.get('/wapapi/order', {params: data});
// 订单中心 --- 确认收货
export const orderConfirm = (id) => axios.post('/wapapi/order/receive', {'id': id});
// 订单中心 --- 取消订单
export const orderCancel = (id) => axios.post('/wapapi/order/cancel', {'id': id});
// 订单中心 --- 变更详情
export const orderDetail = (id) => axios.get('/wapapi/order/original', {params: {'id': id}});
// 订单中心 --- 执行中
export const ordering = (data) => axios.get('/wapapi/order', {params: data});
// 订单中心 --- 已完成
export const orderFinished = (data) => axios.get('/wapapi/order', {params: data});
// 订单中心 --- 开票阶段
export const orderInvoice = (data) => axios.get('/wapapi/order', {params: data});
// 订单中心 --- 已取消
export const orderCanceled = (data) => axios.get('/wapapi/order', {params: data});

// 购物车 --- 提交
export const submitOrder = (data) => axios.post('/wapapi/shopping-cart/create-order', data);

// 余额
export const balance = () => axios.get('/wapapi/account');
// 充值申请
export const balanceRecharge = (data) => axios({
  url: '/wapapi/account/recharge',
  method: 'POST',
  headers: {'Content-Type': 'multipart/form-data'},
  data: data
});

// 提现申请
export const balanceWithdraw = (data) => axios.post('/wapapi/account/withdraw', data);
// 余额详情
export const balanceDetail = (page) => axios.get('/wapapi/account/detail', {params: {
  'page': page
}});

// 余仓
export const depotIng = (page) => axios.get('/wapapi/storage/pre-delivery', {params: {'page': page}});
export const depotEd = (data) => axios.get('/wapapi/storage/refund-list', {params: data});
export const depotReturn = (id) => axios.post('/wapapi/storage/refund', {'order_item_id': id});

// 物流
// 商品物流
export const logisticsGoods = (page) => axios.get('/wapapi/logistics/product', {params: {'page': page}});
// 开票物流
export const logisticsTicket = () => axios.get('/wapapi/logistics/product');
// 确认物流
export const logisticsConfirm = (id) => axios.post('/wapapi/logistics/product-receive', {'id': id});

// 对账单
// 余额对账
export const balanceCheck = (data) => axios.get('/wapapi/statement/balance', {params: data});
export const balanceCheckDetail = (data) => axios.get('/wapapi/statement/balance_detail', {params: data});
// 商品对账
export const goodsCheck = (data) => axios.get('/wapapi/statement/goods_statistics', {params: data});
export const goodsCheckDetail = (data) => axios.get('/wapapi/statement/goods_detail', {params: data});
export const goodsDetail = (data) => axios.get('/wapapi/statement/goods', {params: data});
// 开票对账
export const ticketCheck = (data) => axios.get('/wapapi/statement/invoice_statistics', {params: data});
export const ticketCheckDetail = (data) => axios.get('/wapapi/statement/invoice_detail', {params: data});
export const ticketDetail = (data) => axios.get('/wapapi/statement/invoice', {params: data});

export const wechatJs = (id) => axios.get('/wapapi/wechat/sdk');
