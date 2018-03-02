<template>
  <div class="balance-recharge">
    <div class="type border-1px">
      <span class="left">充值方式</span>
      <div class="right">
        <span class="m-radio">
          <input type="radio" name="withdraw_type" id="cash_type" value='1' v-model="form.type">
          <span class="m-radio-check"></span>
        </span>
        <label for="cash_type">现金支付</label>
        <span class="m-radio">
          <input type="radio" name="withdraw_type" id="accept_type" value='2' v-model="form.type">
          <span class="m-radio-check"></span>
        </span>
        <label for="accept_type">承兑支付</label>
      </div>
    </div>
    <div class="cash-num">
      <mt-field label="充值金额" type="number" name="" placeholder="请输入您要充值的金额" v-model="form.money"></mt-field>
    </div>
    <div class="tips">
      当前现金余额：{{items.price}}元，承兑余额：{{items.acceptance_price}}元
    </div>

    <div class="upload-img border-1px">
      <span class="label" for=""><span class="red"></span>上传图片：</span>
      <div>
        <span @click="upload_img('upload')">查看</span>
        <i><input ref="uploadImg" @change="upload_ticket_img('upload',$event)"  type="file" accept="image/*"></i>
      </div>
    </div>

        <!--  -->
    <div class="remarks">
      <mt-field label="填写备注" v-model="form.remark" placeholder="请填写备注信息" type="textarea" rows="8"></mt-field>
    </div>
    <div class="footer-btn">
      <mt-button class="llh-btn-lg" type="primary" :disabled="submitSwitch"  @click="submit">立刻充值</mt-button>
    </div>
    
    <mt-popup
    v-model="popupVisible"
    popup-transition="popup-fade"
    >
    <img class="popup-img" :src="imgPreview" alt="imgPreview" width="80vw">
  </mt-popup>
  </div>
</template>

<script>
import {balanceRecharge, balance} from '@/data/getData';
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      username: '',
      form: {
        type: '1',
        money: '',
        upload_img: null,
        upload_file: null,
        remark: ''
      },
      imgPreview: '',
      popupVisible: false,
      items: '',
      submitSwitch: false
    };
  },
  components: {
  },
  methods: {
    upload_ticket_img: function (name, e) {
      var files = e.target.files[0];
      var url = this.createObjectURL(files);
      var _img = name + '_img';
      var _file = name + '_file';
      this.form[_file] = e.target.files[0];

      if (url) {
        if (/image/.test(files.type)) {
          this.form[_img] = url;
        } else {

        }
      } else {
        alert('你的浏览器不支持图片预览');
      }
    },
    upload_img (name) {
      var _img = name + '_img';
      if (this.form[_img] === null) {
        Toast({
          message: '请先上传图片',
          className: 'm-toast',
          duration: 1000
        });
      } else {
        this.imgPreview = this.form[_img];
        this.popupVisible = true;
      }
    },
    async submit () {
      if (this.form.type !== '1' && this.form.type !== '2') {
        this.$messagebox('提示', '请选择充值方式。');
        return;
      }
      if (this.form.money.length === 0) {
        this.$messagebox('提示', '请填写充值金额。');
        return;
      }

      if (this.form.type === '2') {
        if (!this.form.upload_file) {
          this.$messagebox('提示', '请上传图片。');
          return;
        }
      }
      let formData = new FormData();
      formData.append('money_type', this.form.type);
      formData.append('money', this.form.money);
      formData.append('pay', this.form.upload_file);
      formData.append('content', this.form.remark);
      this.submitSwitch = true;
      let res = await balanceRecharge(formData);
      this.submitSwitch = false;
      if (res.data === 'success') {
        await this.$messagebox('提示', res.message);
        this.$router.replace('/balance');
      }
    },
    async init () {
      let res = await balance();
      this.items = res.data;
    }
  },
  created () {
    this.init();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'
.balance-recharge
  height: 100%;
  width: 100%;
  background-color: #f8f8f8;
  .type
    height: 88px;
    background-color: #ffffff;
    display: flex;
    flex-direction : flex-start;
    align-items: center;
    color: #000
    padding: 0 30px;
    border-bottom-1px(#dddddd)
    .left
      font-size: 28px;
      margin-right: 20px;
    .right
      font-size: 24px;
      display: flex;
      align-items: center;
      label
        font-weight: normal
        margin-left: 10px
        margin-right: 20px
  .tips
    height: 48px;
    line-height : 48px;
    font-size: 18px;
    color: #787878;
    padding: 0 30px;

  .upload-img
    padding-right: 30px
    line-height : 88px
    font-size: 24px;/*px*/
    padding-left: 30px;
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    background-color: #ffffff
    border-bottom-1px(#dddddd)
    .label  
      font-size: 28px;/*px*/
    &>div
      display: flex;
      align-items: center;
      span 
        color: #247ef2;
      i 
        bg-image(camera)
        display: inline-block
        width: 42px;
        height: 34px;
        background-size: 100%
        background-repeat: no-repeat
        margin-left: 12px
        position relative
        overflow hidden;
        input 
          position: absolute
          top: 0
          left: 0
          opacity : 0
  .mint-popup
    background: transparent
  .popup-img
    width: 80vw
</style>

