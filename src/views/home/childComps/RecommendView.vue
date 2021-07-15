<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recom_item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name:'HomeSwiper',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }

  .recom_item {
    flex: 1;
    font-size: 12px;
  }
  
  .recom_item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>