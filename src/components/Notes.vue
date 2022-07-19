<template>
  <div id="note" class="detail">
    <note-sidebar></note-sidebar>

    <div class="note-detail">
      我是笔记
    </div>
  </div>
</template>

<script>
import NoteSidebar from './NoteSidebar';
import Auth from '../apis/auth';

export default {
  components: {
    NoteSidebar
  },

  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'});
        }
      });
  }
};
</script>

<style lang="less">
@import url(../assets/css/notes.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}

</style>
