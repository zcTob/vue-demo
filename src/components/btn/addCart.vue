<template>
  <div>
  <div class="addcart">
    <button class="btn-active" @click.stop.self="addCart(id, $event)">
      <slot></slot>
    </button>
  </div>
  </div>
</template>

<script>
import {project} from '../../config/common';
export default {
  data () {
    return {
    };
  },
  computed: {
    goods_item: function () {
    }
  },
  props: {
    'id': null
  },
  methods: {
    addCart (id, event) {
      this.$emit('addCart', event.target);
      project.addCart(id, 1);
    }
  }
};
</script>

<style lang="stylus" scoped>
 
</style>
