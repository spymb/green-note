<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'username',
      'slug'
    ])
  },

  methods: {
    ...mapActions([
      'checkLogin'
    ])
  },

  created() {
    this.checkLogin()
  },
};
</script>

<style scoped>
span {
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 24px;
  margin-top: 15px;
}
</style>
