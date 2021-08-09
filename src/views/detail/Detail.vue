<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav"/>
    <scroll class="content" 
            ref="scroll"
            @scroll="contentScroll" 
            :probeType="3">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shopInfo="shopInfo" />
      <detail-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info :paramsInfo="paramsInfo" ref="params"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <good-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @toCart="addToCart"/>
    <back-top @click.native='backClick' v-show="isShowBackTop" />
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailInfo from './childComps/DetailInfo'
  import DetailParamsInfo from './childComps/DetailParamsInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import GoodList from 'components/content/goods/GoodList'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import {getDetail, goodsInfo, shopInfo, paramsInfo, getRecommend} from 'network/detail'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  import {debounce} from 'common/utils'


  export default {
    name: 'Detail',
    mixins: [itemListenerMixin, backTopMixin],
    components: { 
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [0,1000,2000,3000],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      // 1.组件创建完，拿到iid
      this.iid = this.$route.params.iid

      // 2.请求详情页数据
      getDetail(this.iid).then(res => {
        // 1.获取数据
        const data = res.result
        // console.log(res)

        // 2.获取顶部的图片数据 
        this.topImages = data.itemInfo.topImages

        // 3.获取商品信息
        this.goodsInfo = new goodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
 
        // 4.获取店铺信息
        this.shopInfo = new shopInfo(data.shopInfo)

        // 5.获取商品详细信息
        this.detailInfo = data.detailInfo

        // 6.获取参数信息
        this.paramsInfo = new paramsInfo(data.itemParams)
        
        // 7.评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // this.$nextTick(() => {
        //   /**
        //    * 等前面渲染完成，再回调这个函数
        //    * 根据最新的数据，对应的DOM已经被渲染出来
        //    * 但是图片依然是没有加载完成 (目前获取到的offsetTop不包含其中的图片)
        //    * offsetTop值不对的时候，都是因为图片的问题
        //    */
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0) 
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs);
        // })
      })

      // 3.请求推荐页数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      // 4.给getThemeTopY赋值(对赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0) 
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTopYs.push(Number.MAX_VALUE)  //多push个最大的值，便于滚动时导航栏变色

        // console.log(this.themeTopYs);
      }, 500)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        // 图片加载完, 获取组件的offsetTop
        this.getThemeTopY()
      },
      itemClick(index) {
        // 点击跳转到对应位置
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      contentScroll(position) {
        // 判断BackTop是否显示。当滚动距离大于1000时显示该组件
        this.isShowBackTop = -position.y > 1000

        // 1.获取Y值
        const positionY = -position.y

        // 2.positionY和themeTopYs中的值进行比较
        // themeTopYs: [0,1000,2000,3000,Number.MAX_VALUE]

        // positionY在 0-1000 之间，index = 0
        // positionY在 1000-2000，index = 1
        // positionY在 2000-3000，index = 2
        // positionY在 3000-最大值 MAX_VALUE之间，index = 3
        for(let i = 0; i < this.themeTopYs.length-1; i++) {
          // 条件一：防止赋值的过程过于频繁
          if((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      addToCart() {
        // vuex保存购物车状态
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goodsInfo.title
        product.desc = this.goodsInfo.desc
        product.price = this.goodsInfo.realPrice
        product.iid = this.iid  //商品唯一标识

        // 商品添加进购物车
        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product)
      }
    },
    mounted() {
      /**
       * 使用mixin混入
       */
    },
    destroyed() {
      // 取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    /* 详情页不显示导航栏（首页/分类...），所以需要提高层级 */
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh; /*content设置了100%，所以视口高度必须设置*/ 
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    /* better-scroll必须设置高度 */
    height: calc(100% - 44px - 49px);
  }
</style>