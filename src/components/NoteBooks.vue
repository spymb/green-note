<template>
  <div class="detail" id="notebooks">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>

    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="book in notebooks" to="/note/1" class="notebook" :key="book.createdAt">
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
      this.$prompt('请输入新笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({ value }) => {
        return Notebooks.add({ title: value })
      }).then(res => {
        res.data.newCreatedAt = beautifyDate(res.data.createdAt)
        this.notebooks.unshift(res.data)
        this.$message.success(res.msg)
      }).catch(()=>{})
    },

    onEditTitle(notebook) {
      let title = ''
      this.$prompt('请输入新笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({ value }) => {
        title = value
        return Notebooks.update(notebook.id, { title })
      }).then(res => {
        notebook.title = title
        this.$message.success(res.msg)
      }).catch(()=>{})
    },

    onDelete(notebook) {
      this.$confirm('确认要删除笔记本吗？', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Notebooks.delete(notebook.id)
      }).then(res => {
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        this.$message.success(res.msg)
      }).catch(()=>{})
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
