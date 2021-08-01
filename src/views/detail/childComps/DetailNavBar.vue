<template>
  <nav-bar>
    <div slot="left" class="left" @click="back">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles" 
           :key="index" 
           class="itemTitle" 
           :class="{active: index === currentIndex}" 
           @click="itemClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index

        // 发送事件
        this.$emit('itemClick', index)
      },
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .itemTitle {
    flex: 1;
  }

  .active {
    color: #ff8198;
  }

  .left img {
    margin-top: 11px;
  }
</style>