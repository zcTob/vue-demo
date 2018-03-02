var loadmoreMixin = {
  created () {
    console.log('123');
  },
  methods: {
    async loadBottom () {
      this.$refs.loadmore.translate = '-100';
      // if (this.items.current_page >= this.items.max_page) {
      //   this.loadNoMore = true;
      //   this.allLoaded = true;
      //   this.$refs.loadmore.onBottomLoaded();
      //   return;
      // }
      this.items.current_page += 1;
      console.log('1');
      await this.loadNextPage();
      console.log('3');
      this.$nextTick(() => {
        this.$refs.loadmore.onBottomLoaded();
      });
    },
    handleBottomChange (status) {
      this.bottomStatus = status;
    }
  }
};

var backHistory = {
  methods: {
    back (path) {
      var that = this;
      window.addEventListener('popstate', function (e) {
        try {
          if (that.$route.matched[0].path === '/order') {
            that.$router.replace('/personal/center');
          }
          if (that.$route.matched[0].path === '/check') {
            that.$router.replace('/personal/center');
          }
          if (that.$route.matched[0].path === '/check/goods' || that.$route.matched[0].path === '/check/ticket') {
            that.$router.replace('/check');
          }
        } catch (error) {

        }
      }, false);
    }
  }
};

export {
  loadmoreMixin,
  backHistory
};
