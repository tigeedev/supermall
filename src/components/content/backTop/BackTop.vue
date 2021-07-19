<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'BackTop'
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    bottom: 80px;
    right: 20px;
  }

  .back-top img {
    width: 45px;
    height: 45px;
  }
</style>