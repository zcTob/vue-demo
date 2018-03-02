<template>
  <div class="register">
    <m-header :title="title"></m-header>
    <div class="page">
      <div class="tel border-1px ">
        <mt-field label="手机号：" placeholder="请输入手机号" :disableClear="true" v-model="form.username"></mt-field>
        <div class="get_yzm">
          <mt-button class="get_yzm_btn" @click="get_yzm" type="primary" :disabled="form.get_yzm.disabled">{{form.get_yzm.content}}</mt-button>
        </div>
      </div>
      <div class="yzm  border-1px">
        <mt-field label="验证码：" placeholder="请输入验证码" v-model="form.yzm" required></mt-field>
      </div>
      <div class="paw  border-1px">
        <mt-field label="密码：" :type="form.paw_type" placeholder="请输入密码" v-model="form.password"></mt-field>
        <div class="paw-switch">
          <mt-switch v-model="form.paw_switch"></mt-switch>
        </div>
      </div>
      <div class="paw  border-1px">
        <mt-field label="重复密码：" :type="form.paw_type" placeholder="请再次输入密码" v-model="form.password_check"></mt-field>
      </div>
      <div class="name  border-1px">
        <mt-field label="真实姓名："  placeholder="请输入您的真实姓名" v-model="form.name"></mt-field>
      </div>
      <div class="firm_name  border-1px">
        <mt-field label="公司名称："  placeholder="请输入您的公司名称" v-model="form.firm_name"></mt-field>
      </div>
      <div class="agree">
        <div class="checkbox">
          <input id="agree_deal" type="checkbox" class="" :checked="form.agree_deal_checked"  @change="agree_deal()">
          <label for="agree_deal"></label>
        </div>
        <span>我已阅读并同意<router-link to="/rule">《炉料汇管理细则》</router-link></span>
      </div>
      <div class="submit footer-btn">
        <mt-button class="llh-btn-lg" type="primary" :disabled="form.submit_btn_disabled"  @click="submit">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import mHeader from '@/components/header/m-header';
import {registerYzm, register} from '@/data/getData';
export default {
  data () {
    return {
      title: '注册',
      href: '#',
      form: {
        username: '',
        yzm: '',
        password: '',
        password_check: '',
        paw_switch: false,
        paw_type: 'password',
        name: '',
        firm_name: '',
        agree_deal_checked: false,
        submit_btn_disabled: true,
        get_yzm: {
          disabled: false,
          content: '获取验证码'
        },
        usernameCheck: false
      }
    };
  },
  components: {
    mHeader
  },
  mounted () {

  },
  watch: {
    'form.paw_switch': {
      handler: function (val, oldVal) {
        if (val === true) {
          this.form.paw_type = 'text';
        } else if (val === false) {
          this.form.paw_type = 'password';
        }
      },
      deep: true
    }
  },
  methods: {
    agree_deal () {
      this.form.agree_deal_checked = !this.form.agree_deal_checked;
      if (this.form.agree_deal_checked === true) {
        this.form.submit_btn_disabled = false;
      } else {
        this.form.submit_btn_disabled = true;
      }
    },
    async get_yzm () {
      var that = this;
      that.form.get_yzm.disabled = true;
      that.form.get_yzm.content = 60;
      if (!/^1\d{10}$/.test(this.form.username)) {
        this.$messagebox('提示', '手机号输入有误。');
        return;
      }
      await registerYzm({
        'phone': this.form.username
      })
      .then((res) => {
        that.form.usernameCheck = true;
        that.$messagebox('提示', '验证码已发送。').then(action => {
          countDown();
        });
      }).catch((err) => {
        if (err) {
          that.form.get_yzm.content = '获取验证码';
          that.form.get_yzm.disabled = false;
          that.form.usernameCheck = false;
        }
      });
      function countDown () {
        if (that.form.get_yzm.content >= 0) {
          setTimeout(() => {
            that.form.get_yzm.content--;
            countDown();
          }, 1000);
        } else {
          that.form.get_yzm.content = '获取验证码';
          that.form.get_yzm.disabled = false;
        }
      }
    },

    async submit () {
      var that = this;
      if (!/^1\d{10}$/.test(that.form.username)) {
        that.$messagebox('提示', '手机号码格式有误。');
        return;
      } else if (this.form.usernameCheck === false) {
        that.$messagebox('提示', '请先获取验证码');
        return;
      }

      if (that.form.name === '') {
        that.$messagebox('提示', '请输入你的真实姓名。');
        return;
      }

      if (that.form.yzm === '') {
        that.$messagebox('提示', '请输入验证码。');
        return;
      }

      if (that.form.password === '') {
        that.$messagebox('提示', '请输入密码。');
        return;
      } else if (that.form.password.length < 6) {
        that.$messagebox('提示', '密码不能少于6位。');
        return;
      }

      if (that.form.password_check === '') {
        that.$messagebox('提示', '请再次输入密码。');
        return;
      } else {
        if (that.form.password_check !== that.form.password) {
          that.$messagebox('提示', '两次输入密码不一致。');
          return;
        }
      }

      if (that.form.firm_name === '') {
        that.$messagebox('提示', '请输入公司名称。');
        return;
      }

      let data = {
        phone: that.form.username,
        name: that.form.name,
        password: that.form.password,
        password_confirmation: that.form.password_check,
        company: that.form.firm_name,
        code: that.form.yzm,
        register_agree: that.form.agree_deal_checked
      };
      try {
        await register(data).then((res) => {
          that.$messagebox('提示', res.message).then(action => {
            that.$router.replace('/personal/center');
          });
        });
      } catch (err) {
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../style/base.styl"
@import "../../style/form.styl"
</style>
