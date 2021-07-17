<template>
  <div id="home">
    <!-- 首页导航 -->
    <nav-bar class="home-nav"> <div slot="center">蘑菇街</div> </nav-bar>
    <!-- 轮播图 -->
    <!-- :banners 表示组件内props中的变量 -->
    <home-swiper :banners="banners"/>
    <!-- 推荐 -->
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control" 
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick" />
    <good-list :goods="showGoods" />

    <ul>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
      <li>666</li>
    </ul>
    
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodList from 'components/content/goods/GoodList'

  import {getHomeMultidata, getHomeGoods} from 'network/home'

  export default {
    name: 'Home',
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {  // 生命周期函数，组件创建时调用
      // 1. 请求多个数据
      this.getHomeMultidata()

      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch(index) {
          case 0: 
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      // 方法传一个参数
      getHomeGoods(type) {
        // 页码默认为0，请求第1页的数据
        const page = this.goods[type].page + 1
        // 请求数据传两个参数
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: #ff8198;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>