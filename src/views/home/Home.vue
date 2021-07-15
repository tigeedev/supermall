<template>
  <div id="home">
    <!-- 首页导航 -->
    <nav-bar class="home-nav"> <div slot="center">蘑菇街</div> </nav-bar>
    <!-- 轮播图 -->
    <!-- :banners 表示组件内props中的变量 -->
    <home-swiper :banners="banners"/>
    <!-- 推荐 -->
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import {getHomeMultidata} from 'network/home'

  export default {
    name: 'Home',
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {  // 生命周期函数，首页创建时就调用
      // 请求多个数据
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: #ff8198;
  }
</style>