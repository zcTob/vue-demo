<template>
  <div class="personal-info">
    <section class="list">
      <div class="headicon  border-1px">
        <mt-cell title="头像" is-link to="/personal/info/accountedit">
          <img  :src="info.icon" alt="头像" @error.once="headIconError">
        </mt-cell>
      </div>
      <div class="name  border-1px">
        <mt-field label="姓名" :readonly="true"><a class="list-right" href="javascript:;">{{info.name}}</a></mt-field>
      </div>
      <div class="sex  border-1px">
        <mt-field label="性别" :readonly="true"><a class="list-right" href="javascript:;">{{info.sex}}</a></mt-field>
      </div>
      <div class="firm-name">
        <mt-field label="公司名称" :readonly="true"><a class="list-right" href="javascript:;">{{info.firm_name}}</a></mt-field>
      </div>
      <div class="firm-approve">
        <mt-cell title="企业认证" is-link to="/firm_approve">{{info.firm_approve}}</mt-cell>
      </div>
      <div class="ticket">
        <mt-cell title="开票信息管理"  is-link to="/ticket/info">{{info.ticket.label}}</mt-cell>
        <div class="content border-1px" v-if="info.ticket.status">
          <div class="">税号：{{info.ticket.id}}</div>
          <div class="">抬头：{{info.ticket.title}}</div>
        </div>
      </div>
      <div class="address border-1px">
        <mt-cell title="收货地址管理" is-link to="/address/index">{{info.address.label}}</mt-cell>
        <div class="content border-1px" v-if="info.address.status">
          <div class="">姓名：{{info.address.name}}</div>
          <div class="">手机号：{{info.address.tel}}</div>
          <div class="">详细地址：{{info.address.address}}</div>
        </div>
      </div>
      <div class="tel border-1px">
        <mt-cell title="手机号" is-link to="/personal/info/teledit">{{info.phone}}</mt-cell>
      </div>
      <div class="paw">
        <mt-cell title="修改登录密码" is-link to="/personal/info/pawedit"></mt-cell>
      </div>
    </section>
  </div>
</template>

<script>
import { personalCenterInfo } from '@/data/getData';
export default {
  data () {
    return {
      header: {
        title: '个人资料',
        href: ''
      },
      captcha: '',
      info: {
        icon: '',
        name: '张宇',
        sex: '男',
        firm_name: '鉅甲电子',
        firm_approve: '已认证',
        ticket: {
          status: false,
          label: '',
          id: '',
          title: ''
        },
        address: {
          status: false,
          label: '',
          name: '',
          tel: '',
          address: ''
        },
        phone: ''
      }
    };
  },
  components: {
  },
  methods: {
    init () {
      let that = this;
      personalCenterInfo()
      .then((res) => {
        that.info.icon = res.data.avatar;
        that.info.name = res.data.name;
        that.info.phone = res.data.phone;
        that.info.sex = res.data.sex;
        that.info.firm_name = res.data.company;
        that.info.firm_approve = res.data.certification_status;
        that.info.ticket.title = res.data.invoice_title;
        that.info.address.name = res.data.address_name;
        that.info.address.tel = res.data.address_phone;
        that.info.address.address = res.data.address_address;
        if (res.data.avatar.length !== 0) {
          that.info.ticket.id = res.data.invoice_tax_id;
        }
        if (res.data.invoice_tax_id) {
          that.info.ticket.label = '编辑收票信息';
          that.info.ticket.status = true;
        } else {
          that.info.ticket.label = '暂无收票信息';
          that.info.ticket.status = false;
        }

        if (res.data.address_name) {
          that.info.address.label = '编辑收货地址信息';
          that.info.address.status = true;
        } else {
          that.info.address.label = '暂无收货地址信息';
          that.info.address.status = false;
        }
      })
      .catch((err) => {
        if (err) {
          that.$messagebox('提示', '服务器出错了。');
        }
      });
    }
  },
  created () {
    this.init();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../style/base.styl'
.personal-info
  width: 100%
  height: 100%
  background-color: #f8f8f8
  overflow-x: hidden;
  .list
    &>div
      background-color: #ffffff
    .list-right
      display: flex
      align-items : center
      font-size: 24px;
      color: #787878
    .headicon
      >>>.mint-cell
        height: 120px
        line-height: 120px
        .mint-cell-wrapper
          line-height : 120px;
      img 
        width: 100px;
        height: 100px;
        border-radius: 50%;
    .right-icon
      background-image: url('./2@2x.png');
      display: inline-block;
      width: 15px;
      height: 25px;
      background-size: 100%;
      background-repeat: no-repeat;
      margin-left: 22px
    .name,.sex,.firm-name
      padding-right: 37px
      background-color: #ffffff
    .firm-approve,.ticket,.address
      margin: 20px auto;
    .ticket,.address
      background-color: #ffffff
      .content
        padding: 20px 30px 40px 
        border-top-1px(#dddddd)
        font-size: 24px;
        color: #787878;
        line-height : 40px
    .name,.headicon,.sex,.tel
      border-bottom-1px(#dddddd)
</style>


