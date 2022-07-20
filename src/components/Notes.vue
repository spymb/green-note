<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>

    <div class="note-detail-wrapper">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>

      <div class="note-detail" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.newCreatedAt }}</span>
          <span> 更新日期: {{ curNote.newUpdatedAt }}</span>
          <span> {{ statusText }}</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>

        <div class="note-title">
          <input type="text" v-model="curNote.title"
                 @input="updateNote" @keydown="statusText='正在输入...'"
                 placeholder="请输入标题"/>
        </div>

        <div class="editor">
          <textarea v-model="curNote.content"
                    @input="updateNote" @keydown="statusText='正在输入...'"
                    placeholder="请输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from './NoteSidebar';
import Auth from '../apis/auth';
import Notes from '../apis/notes';
import Bus from '../helpers/bus';
import _ from 'lodash';

export default {
  components: {
    NoteSidebar
  },

  data() {
    return {
      notes: [],
      curNote: {},
      statusText: '笔记未改动',
    };
  },

  methods: {
    updateNote: _.debounce(function () {
      Notes.update({noteId: this.curNote.id},
        {title: this.curNote.title, content: this.curNote.content})
        .then(() => {
          this.statusText = '已保存';
        })
        .catch(() => {
          this.statusText = '保存出错';
        });

    }, 300),
  },

  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'});
        }
      });
    Bus.$once('update:notes', notes => {
      this.curNote = notes.find(note => note.id == this.$route.query.noteId) || {};
    });
  },

  beforeRouteUpdate(to, from, next) {
    this.curNote = this.notes.find(note => note.id == to.query.noteId) || {};
    next();
  }
};
</script>

<style lang="less">
@import url(../assets/css/notes.less);
</style>
