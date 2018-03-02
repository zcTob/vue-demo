import Vue from 'vue';
import Router from 'vue-router';
// import wx from 'weixin-js-sdk';
// import {wechatJs} from '../data/getData';
// import { routerMode } from '../config/env';
import store from '@/store/index';
// 首页
const home = () => import('@/components/home/index');
// 登录
const login = () => import('@/components/login/login');
// 注册
const mRegister = () => import('@/components/register/register');
// 公共头
const mHeader = () => import('@/components/header/m-header');
// 找回密码
const backPassword = () => import('@/components/paw/back-password');
// 个人中心
const personalCenter = () => import('@/components/personal/center/center');
//  个人资料
const personalInfo = () => import('@/components/personal/info/info');
// 企业认证
const firmApprove = () => import('@/components/firmApprove/firmApprove');
// 开票信息
const ticketInfo = () => import('@/components/ticket/info');
// 添加地址
const addressAdd = () => import('@/components/address/add');
// 地址管理
const address = () => import('@/components/address/index');
// 账户修改
const accountedit = () => import('@/components/personal/info/accountedit');
// 密码修改
const pawedit = () => import('@/components/personal/info/pawedit');
// 个人信息编辑
const teledit = () => import('@/components/personal/info/teledit');
// 设置
const setting = () => import('@/components/personal/setting/setting');
// 订单中心
const orderCenter = () => import('@/components/order/center');
const orderLists = () => import('@/components/order/index');
const orderIng = () => import('@/components/order/ing');
const orderFinished = () => import('@/components/order/finished');
const orderInvoice = () => import('@/components/order/invoice');
const orderCancel = () => import('@/components/order/cancel');
const orderDetail = () => import('@/components/order/detail');
const orderNothing = () => import('@/components/order/nothing');

// 对账单
const checkIndex = () => import('@/components/check/index');
const checkIndex1 = () => import('@/components/check/index1');
const checkIndex2 = () => import('@/components/check/index2');
const checkIndex3 = () => import('@/components/check/index3');
// 余额对账明细
const checkBalanceDetail = () => import('@/components/check/balance/balance');
// 商品对账明细
const checkGoods = () => import('@/components/check/goods/index');
// 期初
const checkGoodsStart = () => import('@/components/check/goods/start');
// 期末
const checkGoodsEnd = () => import('@/components/check/goods/end');
// 本期商品
const checkGoodsDetail = () => import('@/components/check/goods/detail');
// 开票对账明细
const checkTicket = () => import('@/components/check/ticket/index');
// 期初
const checkTicketStart = () => import('@/components/check/ticket/start');
// 期末
const checkTicketEnd = () => import('@/components/check/ticket/end');
// 本期开票
const checkTicketDetail = () => import('@/components/check/ticket/detail');

// 采赊宝
const csbIndex = () => import('@/components/csb/index');
const csbDetail = () => import('@/components/csb/detail');
// 余额
const balance = () => import('@/components/balance/index');
const balanceRecharge = () => import('@/components/balance/recharge');
const balanceWithdraw = () => import('@/components/balance/withdraw');
const balanceDetail = () => import('@/components/balance/detail');
// 余仓
const depot = () => import('@/components/depot/index');
const depotIng = () => import('@/components/depot/ing');
const depotEd = () => import('@/components/depot/ed');

// 物流
const logistics = () => import('@/components/logistics/index');

// 购物车
const shoppingCart = () => import('@/components/shoppingCart/index');

// 搜索
const search = () => import('@/components/search/index');

// 现货超市
const supermarket = () => import('@/components/supermarket/index');

// 炉料资讯
const news = () => import('@/components/news/index');
// 炉料汇管理细则
const llhRule = () => import('@/components/rule/rule');
Vue.use(Router);
const router = new Router({
  // mode: routerMode,
  linkActiveClass: 'active',
  routes: [
    // 首页
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        title: '首页'
      }
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    // 注册
    {
      path: '/register',
      name: 'mRegister',
      component: mRegister,
      meta: {
        title: '注册'
      }
    },
    // 公共头
    {
      path: '/header',
      name: 'mHeader',
      component: mHeader
    },
    // 找回密码
    {
      path: '/back_password',
      name: 'backPassword',
      component: backPassword,
      meta: {
        title: '找回密码'
      }
    },
    // 个人中心
    {
      path: '/personal/center',
      name: 'center',
      component: personalCenter,
      meta: {
        title: '个人中心'
      }
    },
    // 个人资料
    {
      path: '/personal/info',
      name: 'info',
      component: personalInfo,
      meta: {
        title: '个人资料'
      }
    },
    // 企业认证
    {
      path: '/firm_approve',
      name: 'firmApprove',
      component: firmApprove,
      meta: {
        title: '企业认证'
      }
    },
    // 开票信息
    {
      path: '/ticket/info',
      name: 'ticketInfo',
      component: ticketInfo,
      meta: {
        title: '开票信息'
      }
    },
    // 添加地址
    {
      path: '/address/add/',
      name: 'addressAdd',
      component: addressAdd,
      children: [
        {
          path: ':id',
          component: addressAdd,
          meta: {
            title: '添加地址'
          }
        }
      ]
    },
    // 地址管理
    {
      path: '/address/index',
      name: 'address',
      component: address,
      meta: {
        title: '地址管理'
      }
    },
    // 修改个人资料
    {
      path: '/personal/info/accountedit',
      name: 'accountedit',
      component: accountedit,
      meta: {
        title: '修改个人资料'
      }
    },
    // 修改密码
    {
      path: '/personal/info/pawedit',
      name: 'pawedit',
      component: pawedit,
      meta: {
        title: '修改密码'
      }
    },
    // 电话修改
    {
      path: '/personal/info/teledit',
      name: 'teledit',
      component: teledit,
      meta: {
        title: '电话修改'
      }
    },
    // 个人中心设置
    {
      path: '/personal/setting',
      name: 'setting',
      component: setting,
      meta: {
        title: '个人中心设置'
      }
    },
    // 订单中心
    {
      path: '/order',
      component: orderCenter,
      meta: {
        title: '订单中心'
      },
      children: [
        {
          path: '',
          redirect: 'index'
        },
        {
          path: 'index',
          component: orderLists
        },
        {
          path: 'ing',
          component: orderIng
        },
        {
          path: 'finished',
          component: orderFinished
        },
        {
          path: 'invoice',
          component: orderInvoice
        },
        {
          path: 'cancel',
          component: orderCancel
        }
      ]
    },
    // 订单详情
    {
      path: '/order/detail',
      name: orderDetail,
      component: orderDetail,
      meta: {
        title: '订单详情'
      }
    },
    // 订单默认页
    {
      path: '/order/default',
      name: orderNothing,
      component: orderNothing,
      meta: {
        title: '订单中心'
      }
    },
    // 对账单
    {
      path: '/check',
      component: checkIndex,
      meta: {
        title: '对账单'
      },
      children: [
        {
          path: '',
          redirect: 'index1'
        },
        {
          path: 'index1',
          component: checkIndex1
        },
        {
          path: 'index2',
          component: checkIndex2
        },
        {
          path: 'index3',
          component: checkIndex3
        }
      ]
    },
    // 对账单  余额对账明细
    {
      path: '/check/balance',
      name: 'checkBalanceDetail',
      component: checkBalanceDetail,
      meta: {
        title: '余额对账明细'
      }
    },
    // 对账单  商品明细
    {
      path: '/check/goods',
      component: checkGoods,
      meta: {
        title: '商品明细'
      },
      children: [
        {
          path: '',
          redirect: 'start'
        },
        {
          path: 'start',
          component: checkGoodsStart
        },
        {
          path: 'end',
          component: checkGoodsEnd
        },
        {
          path: 'detail',
          component: checkGoodsDetail
        }
      ]
    },
    // 对账单  开票详情
    {
      path: '/check/ticket',
      component: checkTicket,
      meta: {
        title: '开票详情'
      },
      children: [
        {
          path: '',
          redirect: 'start'
        },
        {
          path: 'start',
          component: checkTicketStart
        },
        {
          path: 'end',
          component: checkTicketEnd
        },
        {
          path: 'detail',
          component: checkTicketDetail
        }
      ]
    },
    // 采赊宝
    {
      path: '/csb',
      name: 'csbIndex',
      component: csbIndex,
      meta: {
        title: '采赊宝'
      }
    },
    // 采赊宝详情
    {
      path: '/csb/detail',
      name: 'csbDetail',
      component: csbDetail,
      meta: {
        title: '采赊宝详情'
      }
    },
    // 余额
    {
      path: '/balance',
      name: 'balance',
      component: balance,
      meta: {
        title: '余额'
      }
    },
    // 余额充值
    {
      path: '/balance/recharge',
      name: 'balanceRecharge',
      component: balanceRecharge,
      meta: {
        title: '余额充值'
      }
    },
    // 余额提现
    {
      path: '/balance/withdraw',
      name: 'balanceWithdraw',
      component: balanceWithdraw,
      meta: {
        title: '余额提现'
      }
    },
    // 余额明细
    {
      path: '/balance/detail',
      name: 'balanceDetail',
      component: balanceDetail,
      meta: {
        title: '余额明细'
      }
    },
    // 余仓
    {
      path: '/depot',
      component: depot,
      meta: {
        title: '余仓'
      },
      children: [
        {
          path: '',
          redirect: 'index'
        },
        {
          path: 'index',
          component: depotIng
        },
        {
          path: 'refund',
          component: depotEd
        }
      ]
    },
    // 物流中心
    {
      path: '/logistics',
      name: 'logistics',
      component: logistics,
      meta: {
        title: '物流中心'
      }
    },
    // 购物车
    {
      path: '/shopping_cart',
      name: 'shoppingCart',
      component: shoppingCart,
      meta: {
        title: '购物车'
      }
    },
    // 找现货
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        title: '找现货'
      }
    },
    // 现货超市
    {
      path: '/supermarket',
      name: 'supermarket',
      component: supermarket,
      meta: {
        title: '现货超市'
      }
    },
    // 炉料资讯
    {
      path: '/news/:id',
      name: 'news',
      component: news,
      meta: {
        title: '炉料资讯'
      }
    },
    // 炉料汇细则
    {
      path: '/rule',
      component: llhRule,
      meta: {
        title: '炉料资讯'
      }
    }
  ]

});

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta.title) {
    document.title = to.matched[0].meta.title;
  }
  store.dispatch('loading', {
    'loading_show': true
  });
  if (to.matched.length === 0) {
    next('/');
  } else {
    next();
  }
});

router.afterEach((to, form, next) => {
  // wechatJs().then((res) => {
  //   wx.config(res.data.data);
  //   let wechatShareConfig = {
  //     title: res.data.share_config.title,
  //     desc: res.data.share_config.desc,
  //     link: window.location.href,
  //     imgUrl: res.data.share_config.img
  //   };
  //   wx.ready(function () {
  //     wx.onMenuShareTimeline({
  //       title: wechatShareConfig.title, // 分享标题
  //       link: wechatShareConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  //       imgUrl: wechatShareConfig.imgUrl, // 分享图标
  //       success: function () {
  //         // 用户确认分享后执行的回调函数
  //       },
  //       cancel: function () {
  //         // 用户取消分享后执行的回调函数
  //       }
  //     });
  //     wx.onMenuShareAppMessage({
  //       title: wechatShareConfig.title, // 分享标题
  //       desc: wechatShareConfig.desc, // 分享描述
  //       link: wechatShareConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  //       imgUrl: wechatShareConfig.imgUrl, // 分享图标
  //       type: '', // 分享类型,music、video或link，不填默认为link
  //       dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
  //       success: function () {
  //       },
  //       cancel: function () {
  //       }
  //     });
  //   });
  //   wx.error(function (res) {
  //   });
  // });
  store.dispatch('loading', {
    'loading_show': false
  });
});

export default router;
