<template>
  <div class="account-edit">
    <section class="list">
      <div class="headicon border-1px">
        <mt-field label="头像"  :disableClear="true" readonly>
          <div class="upload_img">
            <img :src="info.icon" alt="头像" @error.once="headIconError">
            <input type="file" @change="change($event)" accept="image/*">
          </div>
        </mt-field>
      </div>
      <div class="name border-1px">
        <mt-field label="姓名：" v-model="info.name"></mt-field>
      </div>
      <div class="sex border-1px">
        <span class="label" for="">性别：</span>
        <div class="sex-radio">
          <span class="m-radio">
            <input type="radio" name="sex" id="male" value='男' v-model="info.sex">
            <span class="m-radio-check"></span>
          </span>
          <label for="male">男</label>
          <span class="m-radio">
            <input type="radio" name="sex" id="female" value='女' v-model="info.sex">
            <span class="m-radio-check"></span>
          </span>
          <label for="female">女</label>
        </div>
      </div>
      <div class="firm-name border-1px">
        <mt-field label="公司名称：" :disableClear="true" :readonly="true" v-model="info.firm_name"></mt-field>
      </div>
      <footer class="footer-btn">
        <mt-button class="llh-btn-lg" type="primary" @click="submit">保存</mt-button>
      </footer>
    </section>
  </div>
</template>

<script>
import { headIcon, personalCenterInfo, personalCenterEdit } from '@/data/getData';

export default {
  data () {
    return {
      header: {
        title: '修改个人资料',
        href: ''
      },
      info: {
        icon: '',
        name: '',
        sex: '',
        firm_name: ''
      }
    };
  },
  components: {
  },
  methods: {
    change: function (e) {
      var files = e.target.files[0];
      // var reader = new FileReader();
      var url = this.createObjectURL(files);
      if (url) {
        if (/image/.test(files.type)) {
          this.info.icon = url;
        } else {

        }
      } else {
        alert('你的浏览器不支持图片预览');
      }
      let formData = new FormData();
      formData.append('avatar', files);
      headIcon(formData).then((res) => {
        this.$messagebox('提示', '修改头像成功');
      });
    },
    init () {
      let that = this;
      personalCenterInfo().then((res) => {
        that.info.icon = res.data.avatar;
        that.info.name = res.data.name;
        that.info.sex = res.data.sex;
        that.info.firm_name = res.data.company;
      });
    },
    submit () {
      if (this.info.name.length === 0) {
        this.$messagebox('提示', '请输入姓名');
        return;
      }
      personalCenterEdit({
        'name': this.info.name,
        'sex': this.info.sex
      }).then((res) => {
        if (res.data === 'success') {
          this.$messagebox('提示', res.message).then(() => {
            this.$router.replace('/personal/info');
          });
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
.account-edit
  .list
    overflow-x: hidden;
    &>div
      border-bottom-1px(#dddddd)
    .headicon
      .mint-cell
        height: 120px
      .upload_img
        position: relative
        display: inline-block
        width: 100px;
        height: 100px;
        img 
          width: 100px;
          height: 100px;
          border-radius: 50%;
        input 
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height:100%;
          font-size: 100%;
          opacity : 0
    .sex
      height: 88px;
      line-height : 88px;
      padding: 0 30px;
      display: flex;
      flex-direction : row;
      .label
        margin-right: 20px;
        font-size: 28px;
      .sex-radio
        display: flex;
        align-items: center;
        label
          margin-left: 10px;
          margin-right: 30px;
</style>


