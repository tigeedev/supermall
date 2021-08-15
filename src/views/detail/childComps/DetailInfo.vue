<template>
  <div v-if="Object.keys(detailInfo).length !== 0" id="detail-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>

    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>

    <div class="info-image">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" 
           :src="item | imgFilter"
           :key="index"
           @load="imageLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailInfo',
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      imgFilter(value) {
        // 解决打包时详情页图片加载不出来的问题
        return 'http:' + value
      }
    },
    data() {
      return {
        counter: 0
      }
    },
    methods: {
      imageLoad() {
        // 判断，所有图片都加载完成后，进行一次回调就可以了
        // if(++this.counter === this.detailInfo.detailImage[0].list.length){
        //   this.$emit('imageLoad')
        // }
        
        this.$emit('imageLoad')
      }
    }
  }
</script>

<style scoped>
  #detail-info {
    padding: 20px 0;
    border-bottom: 5px solid #eeeeee;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    position: relative;
    width: 80px;
    height: 1px;
    background-color: #626262;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #626262;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 15px 15px;
    font-size: 15px;
    font-weight: 700;
  }

  .info-image img {
    width: 100%;
  }
</style>