<template>
  <div class="account-edit">
    <section class="list">
      <div class="name border-1px">
        <mt-field label="原密码" type="password" v-model="info.password"></mt-field>
      </div>
      <div class="sex border-1px">
        <mt-field label="新密码" type="password" v-model.trim="info.password_new"></mt-field>
      </div>
      <div class="firm-name border-1px">
        <mt-field label="重复新密码" type="password" v-model.trim="info.password_new_check"></mt-field>
      </div>
      <footer class="footer-btn">
        <mt-button class="llh-btn-lg" type="primary" @click="submit()">保存</mt-button>
      </footer>
    </section>
  </div>
</template>

<script>
import { passwordEdit } from '@/data/getData';
export default {
  data () {
    return {
      info: {
        password: '',
        password_new: '',
        password_new_check: ''
      }
    };
  },
  components: {
  },
  methods: {
    async submit () {
      if (this.info.password.length === 0) {
        this.$messagebox('提示', '请输入原密码。');
        return;
      }
      if (this.info.password_new.length < 6) {
        this.$messagebox('提示', '密码不能少于6位。');
        return;
      }
      if (this.info.password_new !== this.info.password_new_check) {
        this.$messagebox('提示', '两次密码不一致，请重新输入。');
        return;
      }

      let res = await passwordEdit({
        'new_password': this.info.password_new,
        'new_password_confirmation': this.info.password_new_check,
        'now_password': this.info.password
      });
      if (res.data === 'success') {
        this.$messagebox('提示', res.message).then(action => {
          this.$router.replace('/personal/info');
        });
      }
    }
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
</style>


