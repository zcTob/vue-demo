<template>
  <div class="m-header">
    <div class="back">
      <slot name="left">
        <router-link :to="href" v-if="href"><i class="mintui mintui-back"></i></router-link>
        <span @click="back()" v-else><i class="mintui mintui-back"></i></span>
      </slot>
    </div>
    <div class="title">{{title}}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mHeader',
  data () {
    return {

    };
  },
  props: ['href', 'title'],
  methods: {
    back () {
      // this.$router.go(-1);
      window.history.back();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.m-header
  display: flex
  width: 100%;
  height: 88px;/*px*/
  background-color: #247ef2
  justify-content: space-between
  align-items: center 
  .back
    flex: 1
    .mintui
      padding-left: 30px
      font-size: 40px;
      font-weight: 700
      color: #ffffff
  .title
    flex: 1
    text-align: center
    font-size: 32px
    font-weight: 500
    color: #ffffff
    letter-spacing: 5px
  .right
    flex: 1
</style>
