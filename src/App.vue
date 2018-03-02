<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
    <loading v-show="loading_show"></loading>
  </div>
</template>

<script>
import {backHistory} from '@/mixins/mixins';
import loading from '@/components/loading/loading';
import {mapState} from 'vuex';
export default {
  name: 'app',
  created () {

  },
  components: {
    loading
  },
  computed: {
    ...mapState([
      'loading_show'
    ])
  },
  mixins: [backHistory],
  mounted () {
    this.back();
  }
};
</script>

<style>
body,html{
  width: 100%;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling : touch;
}
#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling : touch;
}

.fade-enter-active,.fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
