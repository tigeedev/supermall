<template>
  <swiper class="detailSwiper">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <!-- <img :src="item" alt=""> -->
      <img :src="item | imgFilter" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  
  export default {
    name: 'DetailSwiper',
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    filters: {
      imgFilter(value) {
        // 解决打包时详情页图片加载不出来的问题
        return 'http:' + value
      }
    }
  }
</script>

<style scoped>
  .detailSwiper {
    height: 300px;
    overflow: hidden;
  }
</style>