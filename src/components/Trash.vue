<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li>
          <router-link :to="`/trash`">
            <span class="date">星期五</span>
            <span class="title">好快乐</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="note-detail-wrapper">
      <div class="note-detail">
        <div class="note-bar" v-if="true">
          <span> 创建日期: 星期五</span>
          <span> | </span>
          <span> 更新日期: 星期六</span>
          <span> | </span>
          <span> 所属笔记本: 笔记本一</span>

          <a class="btn action">恢复</a>
          <a class="btn action">彻底删除</a>
        </div>

        <div class="note-title">
          <span>搞起来</span>
        </div>

        <div class="editor">
          <div class="preview markdown-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="less">
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/notes.less);

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;

    }
  }
}
</style>
