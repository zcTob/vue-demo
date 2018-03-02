<template>
  <div class="firm_approve">
    <form class="fa-form" ref="form">
      <div class="warning border-1px">
        <span class="red">*</span>
        <span>企业认证开通后，该用户下所有活动将视为企业行为，由该企业承担相应的权利和责任。</span>
      </div>
      <div class="ticket-order border-1px">
        <mt-field label='开票税号：'  placeholder="请输入开票税号" v-model="form.taxId"></mt-field>
      </div>
      <div class="firm-name border-1px">
        <mt-field label="公司名称："  placeholder="请输入公司名称" v-model="form.firmName"></mt-field>
      </div>
      <div class="firm-type border-1px">
        <span class="red">*</span>
        <span class="label" for="">公司类型：</span>
        <div class="firm-type-radio">
          <span class="m-radio">
            <input type="radio" name="firm-type" id="firm-type1" value='中间商' v-model="form.firmType">
            <span class="m-radio-check"></span>
          </span>
          <label for="firm-type1">中间商</label>
          <span class="m-radio">
            <input type="radio" name="firm-type" id="firm-type2" value='终端用户'  v-model="form.firmType">
            <span class="m-radio-check"></span>
          </span>
          <label for="firm-type2">终端用户</label>
        </div>
      </div>
      <div class="tip border-1px">
        <span class="red">*</span>
        <span>附件资料(以下为必填选项)</span>
      </div>
      <div class="radio border-1px">
        <span class="red">*</span>
        <span class="label" for="">是否三证合一：</span>
        <div class="firm-type-radio">
          <span class="m-radio">
            <input type="radio" v-model="form.certificate" value=1 id="certificate-true" name="certificate">
            <span class="m-radio-check"></span>
          </span>  
          <label for="certificate-true">是</label>
          <span class="m-radio">
            <input type="radio" v-model="form.certificate" value=0 id="certificate-false" name="certificate">
            <span class="m-radio-check"></span>
          </span>
          <label for="certificate-false">否</label>
        </div>
      </div>
      <template v-if="Number(form.certificate) === 1">
        <div class="certificate-img border-1px">
          <span for="" class="label"><span class="red">*</span>三证合一：</span>
          <div>
            <span @click="ticket_img_show('certificate')">查看</span>
            <i><input ref="Img" name="certificate-img" @change="upload_ticket_img('certificate',$event)" type="file" accept="image/*" ></i>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="certificate-img border-1px" >
          <span for="" class="label"><span class="red">*</span>营业执照：</span>
          <div>
            <span @click="ticket_img_show('license')">查看</span>
            <i><input ref="Img" name="license" @change="upload_ticket_img('license',$event)" type="file" accept="image/*" ></i>
          </div>
        </div>
        <div class="certificate-img border-1px">
          <span for="" class="label"><span class="red">*</span>税务登记证：</span>
          <div>
            <span  @click="ticket_img_show('tax')">查看</span>
            <i><input ref="Img" @change="upload_ticket_img('tax',$event)"  type="file" accept="image/*" ></i>
          </div>
        </div>
      </template>
      <footer class="footer-btn submit">
        <mt-button class="llh-btn-lg" type="primary" @click.stop.prevent="submit()">{{form.submit}}</mt-button>
      </footer>
    </form>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
    >
      <img class="popup-img" :src="imgPreview" alt="imgPreview" width="80vw">
    </mt-popup>
  </div>
</template>

<script>
import mHeader from '@/components/header/m-header';
import {firmApproveData, firmApprove} from '@/data/getData';
export default {
  name: 'firmApprove',
  data () {
    return {
      datas: null,
      ticket: {
        img_loading: 0
      },
      popupVisible: false,
      certificate_preview_img: null,
      imgPreview: '',
      toggle: true,
      form: {
        certificate_img: null,
        license_img: null,
        tax_img: null,
        taxId: '',
        firmName: '',
        firmType: null,
        submit: '',
        certificate: 0,
        certificate_file: null,
        license_file: null,
        tax_file: null
      }
    };
  },
  components: {
    'm-header': mHeader
  },
  watch: {

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
          this.$messagebox('提示', '只能上传图片。');
        }
      } else {
        alert('你的浏览器不支持图片预览');
      }
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
    async init () {
      let data = await firmApproveData();
      this.form.taxId = data.data.tax_id;
      this.form.firmName = data.data.company;
      this.form.firmType = data.data.type;
      this.form.certificate = data.data.is_three_in_one;
      // 认证状态
      if (Number(data.data.is_certification) === 1) {
        this.form.submit = '变更认证';
      } else if (Number(data.data.is_certification) === 0) {
        this.form.submit = '提交';
      }
      // 三证合一
      if (Number(data.data.is_three_in_one) === 1) {
        this.form.certificate_img = data.data.license_image;
      } else if (Number(data.data.is_three_in_one) === 0) {
        this.form.license_img = data.data.license_image;
        this.form.tax_img = data.data.tax_register_image;
      }
    },
    async submit () {
      if (this.form.taxId.length === 0) {
        this.$messagebox('提示', '请填写开票税号。');
        return;
      }

      if (this.form.firmName.length === 0) {
        this.$messagebox('提示', '请填写公司名称。');
        return;
      }

      let formData = new FormData();
      formData.append('company', this.form.firmName);
      formData.append('type', this.form.firmType);
      formData.append('tax_id', this.form.taxId);
      if (Number(this.form.certificate) === 1) {
        if (!this.form.certificate_file) {
          this.$messagebox('提示', '请上传三证合一。');
          return;
        }
        // 企业三证合一  2
        formData.append('id_type', 2);
        formData.append('license', this.form.certificate_file);
      } else if (Number(this.form.certificate) === 0) {
        if (!this.form.license_file) {
          this.$messagebox('提示', '请上传营业执照。');
          return;
        }
        if (!this.form.tax_file) {
          this.$messagebox('提示', '请上传税务登记证。');
          return;
        }
        // '普通营业执照' 1
        formData.append('id_type', 1);
        formData.append('license', this.form.license_file);
        formData.append('tax_register', this.form.tax_file);
      } else {
        this.$messagebox('提示', '请选择是否三证合一。');
      }

      let res = await firmApprove(formData);
      if (res.data === 'success') {
        this.$messagebox('提示', '修改成功。').then(res => {
          this.$router.replace('/personal/center');
        });
      }
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
.firm_approve
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  .warning
    line-height 88px;
    font-size: 18px;
    color: #282828;
    padding-left: 30px;
  .tip
    line-height : 50px
    font-size: 18px
    color: #898989
    padding-left: 30px;
  .fa-form>div
    border-bottom-1px(#dddddd);
    .red
      font-size: 18px
  .ticket-img,.radio,.certificate-img,.firm-type
    padding-right: 30px
    line-height : 88px
    font-size: 24px;/*px*/
    padding-left: 30px;
  .ticket-img,.certificate-img
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
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
  .radio,.firm-type
    display: flex
    flex-direction: row
    .firm-type-radio
      display: flex;
      align-items: center;
    label
      margin-left: 9px
      margin-right: 20px
    .label 
      margin-right: 30px
      font-size: 28px;/*px*/
  .ticket-order>a,.firm-name>a
    position: relative;
    &:before
      content: '*';
      color: #e74c3c;
      position: absolute;
      font-size: 18px;
      left: 20px;
      top: 34px;
    

  .mint-popup
    background: transparent
  .popup-img
    width: 80vw
</style>

