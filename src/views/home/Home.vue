<template>
  <div id="home">
    <!-- 首页导航 -->
    <nav-bar class="home-nav"> <div slot="center">蘑菇街</div> </nav-bar>

    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true" 
            @pullingUp="loadMore">
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
    </scroll>

    <!-- 监听组件的点击 必须添加 .native -->
    <back-top @click.native='backClick' v-show="isShowBackTop" />
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodList from 'components/content/goods/GoodList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils.js'

  export default {
    name: 'Home',
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
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
        currentType: 'pop',
        isShowBackTop: false
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
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 50)

      // 监听item中图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        refresh()
        // this.$refs.scroll.refresh()
      })
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
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // console.log(position.y);
        // 当滚动距离大于1000时, isShowBackTop=true 即显示该组件
        this.isShowBackTop = -position.y > 1000
      },
      loadMore() {
        // console.log('刷新啦啦啦啦');
        this.getHomeGoods(this.currentType)
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

          // 想要继续上拉加载更多，需要在数据加载完后主动调用 finishPullUp()
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    /* 给home一个确定的高度 100vh -> 即视口高度 */
    height: 100vh;
    position: relative;
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

  .content {
    overflow: hidden;

    /* 利用定位给 中间滚动的区域 一个高度 */
    position: absolute;
    top: 44px;  /* 组件nav-bar 高度为44px */ 
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>