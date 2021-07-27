<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shopInfo="shopInfo" />
      <detail-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info :paramsInfo="paramsInfo"/>
    </scroll>
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
  import {getDetail, goodsInfo, shopInfo, paramsInfo} from 'network/detail'

  export default {
    name: 'Detail',
    components: { 
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailInfo,
      DetailParamsInfo,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        paramsInfo: {}
      }
    },
    created() {
      // 组件创建完，拿到iid
      this.iid = this.$route.params.iid

      //请求详情页数据
      getDetail(this.iid).then(res => {
        // 1.获取数据
        const data = res.result
        console.log(res)

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

      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
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
    height: calc(100% - 44px);
  }
</style>