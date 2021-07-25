<template>
  <div class="detail">
    <detail-nav-bar />
    <detail-swiper :topImages="topImages"/>
    <detail-base-info :goods="goodsInfo" />
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import {getDetail, goodsInfo} from 'network/detail'
  
  export default {
    name: 'Detail',
    components: { 
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {}
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
      })
    }
  }
</script>

<style scoped>

</style>