<template>
  <div id="note" class="detail">
    <note-sidebar></note-sidebar>

    <div class="note-detail-wrapper">
      <div class="note-detail">
        <div class="note-bar">
          <span> 创建日期: 周一</span>
          <span> 更新日期: 周二</span>
          <span>什么玩意</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>

        <div class="note-title">
          <input type="text" placeholder="输入标题">
        </div>

        <div class="editor">
          <textarea placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body"></div>
        </div>
      </div>
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
</style>
