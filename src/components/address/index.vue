<template>
  <div class="address">
    <div class="content">
      <div class="add" @click="add()">
        <div class="left"><i></i>添加地址</div>
        <div class="right">
          <div class="mint-cell-allow-right"></div>
        </div>
      </div>
      <template v-if="lists" v-cloak>
        <div class="item" v-for="list in lists" :key="list.id">
          <div class="item-content">
            <div class="name">
              <span>收货人：{{list.name}}</span>
              <span>{{list.phone}}</span>
            </div>
            <div class="adr">
              收货地址：{{list.address}}
            </div>
          </div>
          <div class="item-footer border-1px">
            <div class="left" @click="setAdrDefault(list.id)">
              <span class="m-radio">
                <input type="radio" name="default" :checked="list.default == 1?true: false">
                <span class="m-radio-check"></span>
              </span>
              <label for="">默认地址</label>
            </div>
            <div class="right">
              <a class="edit" @click="edit(list.id)"><i></i>编辑</a>
              <a class="del" @click="del(list.id)"><i></i>删除</a>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {addressLists, addressDelete, addressDefault} from '@/data/getData';
export default {
  data () {
    return {
      set_default: true,
      lists: {}
    };
  },
  components: {

  },
  methods: {
    init () {
      let that = this;
      addressLists()
      .then((res) => {
        that.lists = res.data;
      });
    },
    // 改
    edit (e) {
      this.$router.push({
        path: `/address/add/${e}`
      });
    },
    // 删
    async del (e) {
      let that = this;
      await this.$messagebox.confirm('确定删除该地址吗?');
      let res = await addressDelete({
        id: e
      });
      if (res.data === 'success') {
        that.$messagebox('提示', res.message);
        this.init();
      }
    },
    // 增
    add () {
      this.$router.push('/address/add');
    },
    // 默认地址
    async setAdrDefault (id) {
      let res = await addressDefault(id);
      if (res.data === 'success') {
        this.$messagebox('提示', res.message);
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
.address
  width: 100%;
  height: 100%;
  background-color: #f8f8f8
  .content
    .add
      padding: 0 30px;
      line-height 88px;
      height: 88px;
      background-color:#ffffff;
      display: flex
      justify-content: space-between
      align-items: center
      margin-bottom: 20px;
      .left
        display: flex;
        align-items: center;
        i 
          bg-image(add);
          background-size: 100%;
          background-repeat: no-repeat;
          display: inline-block
          width: 31px;
          height: 31px;
          margin-right: 12px;
      .right
        position relative;
    .item
      margin-bottom: 20px;
      background-color: #ffffff;
      .item-content
        padding: 20px 30px;
        line-height: 2;
        .name
          display: flex;
          justify-content: space-between
      .item-footer
        border-top-1px(#dddddd)
        padding: 0 30px;
        color: #787878;
        height: 70px;
        line-height : 70px;
        display: flex;
        justify-content: space-between;
        align-items: center
        .left
          font-size: 20px
          display: flex;
          align-items: center
          label
            margin-left: 5px;
        .right
          font-size: 20px;
          display: flex;
          align-items: center
          .edit
            color: #787878
            display: flex;
            align-items: center
            i
              display: inline-block;
              bg-image('edit');
              background-size: 100%;
              background-repeat: no-repeat;
              width: 25px;
              height: 25px;
              margin-right: 6px;
          .del
            margin-left: 40px;
            color: #787878
            display: flex;
            align-items: center
            i 
              display: inline-block;
              bg-image('del');
              background-size: 100%;
              background-repeat: no-repeat;
              width: 25px;
              height: 30px;
              margin-right: 6px
</style>

