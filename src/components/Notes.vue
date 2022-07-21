<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>

    <div class="note-detail-wrapper">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>

      <div class="note-detail" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建时间: {{ curNote.newCreatedAt }}</span>
          <span> 更新时间: {{ curNote.newUpdatedAt }}</span>
          <span> {{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowContent = !isShowContent"></span>
        </div>

        <div class="note-title">
          <input type="text" v-model="curNote.title"
                 @input="onUpdateNote" @keydown="statusText='正在输入...'"
                 placeholder="请输入标题"/>
        </div>

        <div class="editor">
          <textarea v-model="curNote.content" v-show="isShowContent"
                    @input="onUpdateNote" @keydown="statusText='正在输入...'"
                    placeholder="请输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="!isShowContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from './NoteSidebar';
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import {mapGetters, mapMutations, mapActions} from 'vuex';

let md = new MarkdownIt();

export default {
  components: {
    NoteSidebar
  },

  data() {
    return {
      statusText: '笔记未改动',
      isShowContent: true
    };
  },

  computed: {
    ...mapGetters([
      'notes',
      'curNote'
    ]),

    previewContent() {
      return md.render(this.curNote.content || '');
    }
  },

  methods: {
    ...mapMutations([
      'setCurNote'
    ]),

    ...mapActions([
      'deleteNote',
      'updateNote',
      'checkLogin'
    ]),

    onDeleteNote() {
      this.deleteNote({noteId: this.curNote.id})
        .then(() => {
          this.$router.replace({path: `/note?/notebookId=${this.curNote.notebookId}`});
        });
    },

    onUpdateNote: _.debounce(function () {
      this.updateNote({noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content})
        .then(() => {
          this.statusText = '已保存';
        }).catch(() => {
        this.statusText = '保存出错';
      });
    }, 300),
  },

  created() {
    this.checkLogin('/login');
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurNote({curNoteId: to.query.noteId});
    next();
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
