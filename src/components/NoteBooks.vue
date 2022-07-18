<template>
  <div class="detail" id="notebooks">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>

    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="book in notebooks" to="/note/1" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{ book.title }}
              <span>{{ book.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEditTitle(book)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(book)">删除</span>
              <span class="date">{{ book.newCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>

  </div>
</template>

<script>
import Auth from '../apis/auth'
import Notebooks from '../apis/notebooks'
import {beautifyDate} from '../helpers/date';

export default {
  data () {
    return {
      notebooks: []
    }
  },

  methods: {
    onCreate() {
      let title = window.prompt('创建笔记本')
      if(title.trim() === '') {
        alert('笔记本名不能为空')
        return
      }
      Notebooks.add({ title })
        .then(res => {
          res.data.newCreatedAt = beautifyDate(res.data.createdAt)
          this.notebooks.unshift(res.data)
          alert(res.msg)
        })
    },

    onEditTitle(notebook) {
      let title = window.prompt('修改标题', notebook.title)
      Notebooks.update(notebook.id, { title })
        .then(res => {
          notebook.title = title
          alert(res.msg)
        })
    },

    onDelete(notebook) {
      let isConfirm = window.confirm('你确定要删除吗?')
      if(isConfirm) {
        Notebooks.delete(notebook.id)
          .then(res => {
            this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
            alert(res.msg)
          })
      }
    }
  },

  created() {
    Auth.getInfo().then(res => {
        if(!res.isLogin) {
          this.$router.push({ path: '/login' })
        }
      })
    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data
      })
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notebooks.less);
</style>
