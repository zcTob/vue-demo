<template>
  <div class="tel-edit">
    <section class="list">
      <div class="old_tel border-1px">
        <mt-field label="手机号：" placeholder="请输入旧手机号" v-model="info.oldTel">
          <mt-button class="get_yzm" :disabled="old_count_down_status" @click="get_yzm('old')" type="primary">{{old_count_down_text}}</mt-button>
        </mt-field>
      </div>
      <div class="yzm border-1px">
        <mt-field label="验证码：" v-model="info.oldYzm" placeholder="请输入验证码"></mt-field>
      </div>
      <div class="new_tel border-1px">
        <mt-field label="新号码：" placeholder="请输入新手机号" v-model="info.newTel">
          <mt-button class="get_yzm" :disabled="new_count_down_status" @click="get_yzm('new')" type="primary">{{new_count_down_text}}</mt-button>
        </mt-field>
      </div>
      <div class="yzm border-1px">
        <mt-field label="验证码：" v-model="info.newYzm" placeholder="请输入验证码"></mt-field>
      </div>
      <footer class="footer-btn">
        <mt-button class="llh-btn-lg" type="primary" :disabled="subSwitch" @click="submit">保存</mt-button>
      </footer>
    </section>
  </div>
</template>

<script>
import {oldPhoneYzm, newPhoneYzm, changePhone} from '@/data/getData';
export default {
  data () {
    return {
      info: {
        oldTel: '',
        oldYzm: '',
        newTel: '',
        newYzm: ''
      },
      old_count_down_text: '获取验证码',
      old_count_down_status: false,
      new_count_down_text: '获取验证码',
      new_count_down_status: false,
      subSwitch: true
    };
  },
  components: {
  },
  watch: {
    info: {
      handler: function (val, oldVal) {
        this.is_null();
      },
      deep: true
    }
  },
  methods: {
    is_null () {
      if (this.info.oldTel.length > 0 &&
        this.info.oldYzm.length > 0 &&
        this.info.newTel.length > 0 &&
        this.info.newYzm.length > 0
      ) {
        this.subSwitch = false;
      } else {
        this.subSwitch = true;
      }
    },
    get_yzm (name) {
      if (name === 'old') {
        oldPhoneYzm({
          'phone': this.info.oldTel
        }).then(async(res) => {
          this[`${name}_count_down_text`] = 60;
          this[`${name}_count_down_status`] = true;
          await this.$messagebox('提示', res.message);
          this.countDown(name);
        });
      } else if (name === 'new') {
        newPhoneYzm({
          'phone': this.info.newTel
        }).then(async (res) => {
          this[`${name}_count_down_text`] = 60;
          this[`${name}_count_down_status`] = true;
          await this.$messagebox('提示', res.message);
          this.countDown(name);
        });
      }
    },
    countDown (name) {
      let id = `${name}_count_down_text`;
      let status = `${name}_count_down_status`;
      if (this[id] >= 0) {
        setTimeout(() => {
          this[id]--;
          this.countDown(name);
        }, 1000);
      } else {
        this[id] = '获取验证码';
        this[status] = false;
      }
    },
    submit () {
      if (this.info.oldYzm.length === 0) {
        this.$messagebox('提示', '请输入验证码');
        return;
      }
      if (this.info.newTel.length === 0) {
        this.$messagebox('提示', '请输入新手机号');
        return;
      }
      if (this.info.newYzm.length === 0) {
        this.$messagebox('提示', '请输入验证码');
        return;
      }

      changePhone({
        'phone': this.info.newTel,
        'old_phone_confirmation': this.info.oldYzm,
        'phone-confirmation': this.info.newYzm
      }).then(async(res) => {
        if (res.data === 'success') {
          await this.$messagebox('提示', res.message);
          this.$router.replace('/personal/info');
        }
      });
    }
  },
  created () {
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../style/base.styl'
.tel-edit
  .list
    overflow-x: hidden;
    &>div
      border-bottom-1px(#dddddd)
    .old_tel,.new_tel
      .get_yzm
        width: 180px;
        height: 60px;
        font-size: 28px;
        color: #ffffff;
        border-radius: 8px;
        margin-left: 20px;
</style>


