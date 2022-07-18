<template>
  <div class="detail" id="notebooks">
    <header>
      <a href="#" class="btn"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>

    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="book in notebooks" to="/note/1" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{ book.title }}
              <span>{{ book.noteCounts }}</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">{{ book.createdAt }}</span>
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

export default {
  data () {
    return {
      notebooks: []
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
        console.log(res.data);
        this.notebooks = res.data
      })
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notebooks.less);
</style>
