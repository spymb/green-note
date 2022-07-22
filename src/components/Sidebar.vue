<template>
  <div id="sidebar">
    <Avatar/>

    <div class="icons">
      <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i></router-link>

      <router-link to="/note" title="笔记"><i class="iconfont icon-note"></i></router-link>

      <router-link to="/trash" title="回收站"><i class="iconfont icon-trash"></i></router-link>
    </div>

    <div class="logout" @click="onLogout">
      <i class="iconfont icon-logout"></i>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue';

export default {
  components: {Avatar},

  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    }
  },

  created() {
    this.$store.dispatch('checkLogin')
  }
};
</script>

<style lang="less" scoped>

#sidebar {
  position: relative;
  width: 66px;
  text-align: center;
  background-color: #2c333c;

  .icons {
    margin-top: 15px;

    a {
      padding: 10px 0;
      display: block;
    }

    .router-link-active {
      background-color: #5e6266;
    }

  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  .iconfont {
    font-size: 20px;
    color: #fff;
  }
}

</style>
