<template>
  <div class="address-add">
    <div class="ad-form">
      <div class="border-1px">
        <mt-field label="姓名：" type="text" placeholder="" v-model="form.username"></mt-field>
      </div>
      <div class="border-1px">
        <mt-field label="手机号：" status="success" type="tel" placeholder="" v-model="form.tel"></mt-field>
      </div>
      <div class="border-1px">
        <mt-field label="详细地址：" placeholder="" type="textarea" rows="5" v-model="form.remark"></mt-field>
      </div>
      <div class="border-1px set-default-adr">
        <span>默认</span>
        <div class="switch">
          <mt-switch v-model="form.set_default"></mt-switch>
        </div>
      </div>
      <footer class="footer-btn">
        <mt-button class="llh-btn-lg" type="primary" @click="submit()">保存</mt-button>
      </footer>
    </div>
    <div class="adr-packer" @click="hidePacker()" v-show="adrPickerSwitch">
      <mt-picker :slots="slots" @change="onValuesChange" :itemHeight="72" :visibleItemCount="5" :showToolbar="true" >请选择地址</mt-picker>
    </div>
  </div>
</template>

<script>
import {addressAdd, addressUpdate, addressList} from '@/data/getData';
export default {
  data () {
    return {
      slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot4'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      header: {
        title: '添加收货地址'
      },
      adrPickerSwitch: false,
      address: null,
      form: {
        address: '',
        username: null,
        tel: null,
        remark: null,
        set_default: true,
        default: 0
      }
    };
  },
  components: {

  },
  methods: {
    adrSelect () {
      this.adrPickerSwitch = true;
    },
    onValuesChange (picker, values) {
      this.form.address = '';
      for (let i = 0; i < values.length; i++) {
        this.form.address += values[i];
      }
    },
    hidePacker () {
      this.adrPickerSwitch = false;
    },
    async submit () {
      if (this.form.set_default === true) {
        this.form.default = 1;
      } else if (this.form.set_default === false) {
        this.form.default = 0;
      }
      let res;
      if (this.$route.params.id) {
        res = await addressUpdate({
          'id': this.$route.params.id,
          'phone': this.form.tel,
          'name': this.form.username,
          'address': this.form.remark,
          'default': this.form.default
        });
      } else {
        res = await addressAdd({
          'phone': this.form.tel,
          'name': this.form.username,
          'address': this.form.remark,
          'default': this.form.default
        });
      }

      if (res.data === 'success') {
        this.$messagebox('提示', res.message).then(action => {
          setTimeout(() => {
            this.$router.replace('/address/index');
          }, 500);
        });
      }
    }
  },
  async created () {
    if (this.$route.params.id) {
      this.header.title = '修改收货地址';
      let res = await addressList(this.$route.params.id);
      if (res.data) {
        this.form.username = res.data.name;
        this.form.tel = res.data.phone;
        this.form.remark = res.data.address;
        if (res.data.set_default === 1) {
          this.form.default = true;
        } else if (res.data.set_default === 0) {
          this.form.default = false;
        }
      } else {
        this.$messagebox('提示', res.message);
      }
    } else {
      this.header.title = '添加收货地址';
    }
  }

};
</script>

<style lang="stylus" scoped>
@import '../../style/form.styl'
@import '../../style/base.styl'
.address-add
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  position relative;
  .ad-form
    &>div
      border-bottom-1px(#dddddd)
    .set-default-adr
      border-top-1px(#dddddd)
      line-height 88px
      padding: 0 30px
      display: flex
      margin-top: 20px
      justify-content : space-between
      background-color: #ffffff
      align-items: center
      span
        font-size: 28px;/*px*/
        color: #282828;
    .adrSelect
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
      height: 88px;
      align-items: center;
      background-color: #ffffff;
      font-size: 28px;
      color: #000;
      .left
        font-size: 28px;
        span 
          margin-right: 20px;
        input 
          outline: none;
          border: none;
          appearance: none;
          width: 60%;
      .right
        position relative;
  .adr-packer
    background-color: #000;
    text-align: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity : .5;
    z-index: 100;
    >>>.picker
      background-color : #ffffff;
      position : absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 101;
      .picker-slot-wrapper
        height: 360px!important;
      .picker-toolbar
        height: 80px!important;
        line-height: 80px!important;
        font-size: 28px;
      .picker-items
        font-size: 48px;

      .picker-center-highlight {
        margin-top: -36px!important;
        height: 72px!important;
      }

      .picker-slot {
        font-size: 36px;
      }

      .picker-item {
        padding: 0 20px;
      }
</style>

