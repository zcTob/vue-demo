<template>
  <div class="news" v-if="newsInfo" v-cloak>
    <section class="article">
      <div class="title border-1px">
        <h1>{{newsInfo.title}}</h1>
        <div class="time">{{newsInfo.updated_at}}<i></i></div>
      </div>
      <div class="content" v-html="newsInfo.content">
      </div>
    </section>
  </div>
</template>

<script>
import {getNewsInfo} from '@/data/getData';
export default {
  data () {
    return {
      newsInfo: null
    };
  },
  methods: {
    init: async function () {
      try {
        let id = this.$router.currentRoute.params.id;
        var data = await getNewsInfo(id);
        this.newsInfo = data.data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  components: {
  },
  created () {
    this.init();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl'
.news
  background-color: #f8f8f8;
  height: 100%;
  overflow-x: hidden;
  .article
    min-height: 140px;
    .title
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-bottom-1px(#dddddd)
      h1
        font-size: 36px;
        color: #282828;
        margin-top: 12px;
        margin-bottom: 36px;
      .time
        width: 100%;
        color: #989898;
        font-size: 20px;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        i 
          display: inline-block;
          width: 24px;
          height: 24px;
          bg-image('16');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin: 0 10px;
    .content
      font-size: 24px !important;
      color: #989898;
      padding: 24px;
      line-height: 1.5;
      >>>span,>>>p
        text-align: justify;
        text-justify: inter-word;
        font-size: 24px!important;/*px*/
        text-indent: 48px;
        line-height : 1.5;
</style>
