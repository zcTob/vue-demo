<template>
  <div class="ticket-info">
    <div class="tip">
      <span class="red">*</span>开票信息只能填写1次
    </div>
    <div class="border-1px">
      <mt-field label="开户行：" placeholder="" v-model="form.name"></mt-field>
    </div>
    <div class="border-1px">
      <mt-field label="开户行账户：" placeholder="" v-model="form.account"></mt-field>
    </div>
    <div class="border-1px">
      <mt-field label="开票地址：" placeholder="" v-model="form.address"></mt-field>
    </div>
    <div class="border-1px">
      <mt-field label="开票电话：" placeholder="" v-model="form.tel"></mt-field>
    </div>
    <div class="ticket-img">
      <span for="">开票图：</span>
      <div>
        <span  @click="ticket_img_show('ticket')">查看</span>
        <i><input @change="upload_ticket_img('ticket',$event)"  type="file" accept="image/*" ></i>
      </div>
    </div>
    <footer class="footer-btn">
      <mt-button class="llh-btn-lg" type="primary" @click="submit()">保存</mt-button>
    </footer>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
    >
      <img class="popup-img" :src="imgPreview" alt="imgPreview" width="80vw">
    </mt-popup>
  </div>
</template>

<script>
import {ticketInfoData, ticketInfo} from '@/data/getData';
export default {
  data () {
    return {
      form: {
        ticket_img: '',
        ticket_file: null,
        name: '',
        account: '',
        address: '',
        tel: ''
      },
      popupVisible: false,
      imgPreview: ''
    };
  },
  components: {
  },
  methods: {
    submit () {
      let that = this;
      if (this.form.name.length === 0) {
        this.$messagebox('提示', '请填写开户行。');
        return;
      }

      if (this.form.account.length === 0) {
        this.$messagebox('提示', '请填写开户行账号。');
        return;
      }

      if (this.form.address.length === 0) {
        this.$messagebox('提示', '请填写开票地址。');
        return;
      }

      if (this.form.tel.length === 0) {
        this.$messagebox('提示', '请填写开票电话。');
        return;
      }

      if (!this.form.ticket_file) {
        this.$messagebox('提示', '请上传开票图。');
        return;
      }

      let formData = new FormData();
      formData.append('bank_name', this.form.name);
      formData.append('bank_account_number', this.form.account);
      formData.append('ticket_address', this.form.address);
      formData.append('phone', this.form.tel);
      formData.append('image', this.form.ticket_file);

      ticketInfo(formData)
      .then((res) => {
        that.$messagebox('提示', '修改成功。').then(action => {
          that.$router.replace('/personal/center');
        });
      });
    },
    init () {
      let that = this;
      ticketInfoData().then((res) => {
        that.form.name = res.data.bank_name;
        that.form.account = res.data.bank_number;
        that.form.address = res.data.ticket_address;
        that.form.tel = res.data.phone;
        that.form.ticket_img = res.data.image;
      }).catch((err) => {
        if (err) {
        }
      });
    },
    ticket_img_show (name) {
      var _img = name + '_img';
      if (this.form[_img] === null) {
        this.$toast({
          message: '请先上传图片',
          className: 'm-toast',
          duration: 1000
        });
      } else {
        this.imgPreview = this.form[_img];
        this.popupVisible = true;
      }
    },
    upload_ticket_img: function (name, e) {
      var files = e.target.files[0];
      var url = this.createObjectURL(files);
      var _img = name + '_img';
      var _file = name + '_file';
      if (url) {
        if (/image/.test(files.type)) {
          this.form[_img] = url;
        } else {
          this.$messagebox('提示', '只能上传图片。');
          return;
        }
      } else {
        alert('你的浏览器不支持图片预览');
      }
      this.form[_file] = e.target.files[0];
    }
  },
  created () {
    this.init();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/form.styl'
@import '../../style/base.styl'
.ticket-info
  background-color: #f8f8f8
  width: 100%;
  height: 100%;
  .tip
    line-height :50px
    font-size: 18px;
    color: #787878;
    padding: 0 30px;

  .border-1px
    border-bottom-1px(#dddddd)
  .ticket-img
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    padding-right: 30px
    line-height : 88px
    font-size: 28px;/*px*/
    padding-left: 30px;
    background-color: #fff;
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

