<template>
  <div class="loading">
    <span class="loading-icon">
      <mt-spinner type="double-bounce" color="rgb(38, 162, 255)" :size="56"></mt-spinner>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  }
};
</script>

<style lang="stylus" scoped>
.loading
  width: 100%;
  height: 100%;
  position fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
  opacity : .5;
  z-index: 999999999999999999999;
  .loading-icon
    display:inline-block;
    width: 56px;
    height: 56px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
</style>

