<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shopInfo="shopInfo" />
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import {getDetail, goodsInfo, shopInfo} from 'network/detail'

  export default {
    name: 'Detail',
    components: { 
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {}
      }
    },
    created() {
      // 组件创建完，拿到iid
      this.iid = this.$route.params.iid

      //请求详情页数据
      getDetail(this.iid).then(res => {
        console.log(res)
        const data = res.result
        this.topImages = data.itemInfo.topImages

        // 商品数据抽离
        this.goodsInfo = new goodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

        // 商家详情数据
        this.shopInfo = new shopInfo(data.shopInfo)
      })
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