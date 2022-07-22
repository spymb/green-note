<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>

    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ curBook.title }} <i class="iconfont icon-down"></i>
      </span>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id" :key="notebook.id">
          {{ notebook.title }}
        </el-dropdown-item>
        <div v-show="notebooks.length === 0">
          <el-dropdown-item command="trash">去添加笔记本吧</el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>

    <ul class="notes">
      <li v-for="note in notes">
        <router-link :to="`/note?notebookId=${curBook.id}&noteId=${note.id}`">
          <span class="date">{{ note.newUpdatedAt }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'notebooks',
      'curBook',
      'curNote',
      'notes',
    ])
  },

  methods: {
    ...mapMutations([
      'setCurBook',
      'setCurNote'
    ]),

    ...mapActions([
      'getNotebooks',
      'getNotes',
      'addNote'
    ]),

    reRoute(curBookId, noteIdObj) {
      this.setCurBook({curBookId: curBookId});
      this.getNotes({notebookId: this.curBook.id}).then(() => {
        this.setCurNote(noteIdObj);
        this.$router.replace({
          path: '/note',
          query: {
            notebookId: this.curBook.id,
            noteId: this.curNote.id,
          }
        });
      });
    },

    handleCommand(notebookId) {
      this.reRoute(notebookId, {});
    },

    onAddNote() {
      if (this.curBook.id) {
        this.addNote({notebookId: this.curBook.id})
          .then(() => {
            this.reRoute(this.curBook.id, {});
          })
      } else {
        this.$message.warning({message: '请先创建笔记本'});
      }
    }
  },

  created() {
    this.getNotebooks()
      .then(() => {
        if (this.curBook.id) {
          this.reRoute(this.$route.query.notebookId, {curNoteId: this.$route.query.noteId})
        }
      });
  },
};
</script>


<style lang="less">
@import url(../assets/css/note-sidebar.less);
</style>
