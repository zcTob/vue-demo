<template>
  <div class="back_password">
    <div class="page">
      <div class="tel border-1px ">
        <mt-field label="手机号：" placeholder="请输入手机号" v-model="form.username" :disableClear="true"></mt-field>
        <div class="get_yzm">
          <mt-button class="get_yzm_btn" @click="get_yzm" type="primary" :disabled="form.get_yzm.disabled">{{form.get_yzm.content}}</mt-button>
        </div>
      </div>
      <div class="yzm  border-1px">
        <mt-field label="验证码：" placeholder="请输入验证码" v-model="form.yzm"></mt-field>
      </div>
      <div class="paw  border-1px">
        <mt-field label="新密码：" :type="form.paw_type" placeholder="请输入密码" v-model="form.password"></mt-field>
        <div class="paw-switch">
          <mt-switch v-model="form.paw_switch"></mt-switch>
        </div>
      </div>
      <div class="submit footer-btn">
        <mt-button class="llh-btn-lg" :disabled="form.submit_btn_disabled" type="primary" @click="passwordReset()">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import mHeader from '@/components/header/m-header';
import {backPasswordYzm, backPassword} from '@/data/getData';
export default {
  data () {
    return {
      form: {
        username: '',
        yzm: '',
        password: '',
        paw_switch: false,
        paw_type: 'password',
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
    },
    'form.username': {
      handler: function (val, oldVal) {
        this.isNull();
      },
      deep: true
    },
    'form.yzm': {
      handler: function (val, oldVal) {
        this.isNull();
      },
      deep: true
    },
    'form.password': {
      handler: function (val, oldVal) {
        this.isNull();
      },
      deep: true
    }
  },
  methods: {
    async passwordReset () {
      var that = this;
      if (!/^1\d{10}$/.test(this.form.username)) {
        this.$messagebox('提示', '手机号输入有误。');
        return;
      } else if (this.form.usernameCheck === false) {
        that.$messagebox('提示', '请先获取验证码');
        return;
      }

      if (this.form.password.length < 6) {
        this.$messagebox('提示', '密码不能少于6位。');
        return;
      }

      if (this.form.yzm.length === 0) {
        this.$messagebox('提示', '请输入验证码');
        return;
      }
      await backPassword({
        'phone': that.form.username,
        'password': that.form.password,
        'phone_code': that.form.yzm
      })
      .then((res) => {
        if (res.data === 'success') {
          that.$messagebox('提示', res.message).then((res) => {
            that.$router.push('/personal/center');
          });
        }
      });
    },
    isNull () {
      if (this.form.username !== '' && this.form.yzm !== '' && this.form.password !== '') {
        this.form.submit_btn_disabled = false;
      } else {
        this.form.submit_btn_disabled = true;
      }
    },
    async get_yzm () {
      this.form.get_yzm.disabled = true;
      this.form.get_yzm.content = 60;
      var that = this;
      if (!/^1\d{10}$/.test(this.form.username)) {
        this.$messagebox('提示', '手机号输入有误。');
        return;
      }
      await backPasswordYzm({
        'phone': that.form.username
      })
      .then((res) => {
        that.form.usernameCheck = true;
        that.$messagebox('提示', '验证码已发送。').then((res) => {
          countDown();
        });
      })
      .catch((err) => {
        if (err) {
          that.form.usernameCheck = false;
          that.form.get_yzm.content = '获取验证码';
          that.form.get_yzm.disabled = false;
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../style/base.styl"
@import "../../style/form.styl"
</style>
