<template>
  <div>trash-details</div>
</template>

<script>
import Auth from '../apis/auth'

export default {
  created() {
    Auth.getInfo()
      .then(res => {
        if(!res.isLogin) {
          this.$router.push({ path: '/login' })
        }
      })
  }
};
</script>
