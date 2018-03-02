<template>
  <div class="login">
    <div class="logo">
      <img src="" alt="">
    </div>
    <div class="login-form">
      <div class="user">
        <input type="text" v-model="form.username" placeholder="请输入手机号" required>
        <i class="user-icon"></i>
      </div>
      <div class="password">
        <input v-model="form.password"  type="text" placeholder="请输入密码" v-if="password_switch" required>
        <input v-model="form.password"  type="password" placeholder="请输入密码" v-else required>
        <i class="password-icon"></i>
        <div class="password-switch">
          <mt-switch v-model="password_switch"></mt-switch>
        </div>
      </div>
      <div class="yzm">
        <input type="text" v-model="form.yzm" placeholder="请输入验证码" required>
        <div>
          <img :src="yzm_img" alt="" @click="changeYzm()" ref="YZM">
          <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)" :size="56" v-show="yzm_img==null"></mt-spinner>
        </div>
      </div>
      <div class="l-info">
        <router-link to="/register" class="left">现在注册</router-link>
        <router-link to="back_password" class="right">找回密码</router-link>
      </div>
      <div class="l-btn">
        <mt-button class="llh-btn-sm" type="primary" @click="submit()">登录</mt-button>
      </div>
      <div class="l-footer">
        <a href="">暂不注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { loginYzm, loginIn } from '@/data/getData';

export default {
  name: 'login',
  data () {
    return {
      password_switch: false,
      password_type: 'password',
      yzm_img: null,
      form: {
        username: '',
        password: '',
        yzm: ''
      }
    };
  },
  watch: {
    password_switch: function (val, oldVal) {
      if (val === true) {
        this.password_type = 'text';
      } else if (val === false) {
        this.password_type = 'password';
      }
    }
  },
  components: {

  },
  methods: {
    async changeYzm () {
      var that = this;
      that.yzm_img = null;
      await loginYzm().then((res) => {
        // 图片加载成功
        that.$refs.YZM.onload = function (e) {
          that.yzm_img = res.data.url;
        };
        // 图片加载失败
        that.$refs.YZM.onerror = function (e) {
          that.yzm_img = null;
        };
        that.yzm_img = res.data.url;
      });
    },
    submit: async function () {
      var that = this;
      if (this.form.username.length === 0) {
        this.$messagebox('提示', '手机号不能为空。');
        return;
      } else if (!/^1\d{10}$/.test(this.form.username)) {
        this.$messagebox('提示', '您输入的手机号码有误。');
        return;
      }

      if (this.form.password.length === 0) {
        this.$messagebox('提示', '密码不能为空。');
        return;
      } else if (this.form.password.length < 6) {
        this.$messagebox('提示', '密码不能少于6位。');
        return;
      }

      if (this.form.yzm.length === 0) {
        this.$messagebox('提示', '验证码不能为空');
        return;
      }
      var data = {
        username: this.form.username,
        password: this.form.password,
        captcha: this.form.yzm
      };
      try {
        await loginIn(data).then(async (res) => {
          if (res.data === 'success') {
            setTimeout(() => {
              that.$router.replace('/personal/center');
            }, 1000);
          }
        });
      } catch (err) {
        if (err) {
          this.changeYzm();
        }
      }
    }
  },
  created () {
    this.changeYzm();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import "../../style/base.styl"
  .login
    width: 100%
    height: 100%
    min-height: 100%
    background-color: #f8f8f8
    box-sizing: border-box
    padding-top: 206px
    .logo
      width: 330px  
      height: 115px
      margin: auto
      margin-bottom: 99px
      bg-image('logo')
      background-size: 100%
      background-repeat: no-repeat
    .login-form
      width: 520px
      margin: auto
      .user,.password
        position: relative
        input 
          border: none
          outline: none
          appearance: none
          width: 520px
          height: 88px
          font-size: 28px
          border: 1px solid #dddddd; /*no*/
          padding-left: 115px 
          padding-right: 10px
          box-sizing: border-box
        i
          position: absolute
          &:after
            position: absolute;
            content: '';
            width: 1px; /* no */
            height: 48px;
            background-color: #f1f1ef;
            top: -6px;
            left: 60px;
      .user
        margin-bottom: 30px
        .user-icon
          bg-image('username')
          background-repeat: no-repeat
          background-size: 100%
          display: inline-block
          width: 38px;
          height: 40px;
          top: 22px
          left: 25px
      .password
        margin-bottom: 30px
        .password-switch
          position: absolute
          top: 26px
          right: 25px
        .password-icon
          bg-image('password')
          background-repeat: no-repeat
          background-size: 100%
          display: inline-block
          width: 33px;
          height: 35px;
          top: 26px;
          left: 25px;
      .yzm
        width: 100%;
        display: flex;
        flex-direction: row;
        text-align: center;
        input 
          border: none
          outline: none
          appearance: none
          border: 1px solid #dddddd; /*no*/
          width: 326px;
          height: 88px;
          font-size: 28px
          padding: 0 25px;
          margin-right: 16px;
        div
          width: 178px;
          height: 88px;
          border: 1px solid #dddddd;/*no*/
          img 
            width: 178px;
            height: 88px;
      .l-info
        display: flex
        justify-content: space-between
        line-height 88px
        .left
          color: #247ef2
        .right
          color: #787878
      .l-btn
        margin-top: 30px
        text-align center
        font-size: 48px

      .l-footer
        position relative
        text-align center
        margin-top: 100px
        a
          color: #787878
</style>
