<template>
  <div class="good-list-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{gooditem.title}}</p>
      <span class="price">{{gooditem.orgPrice}}</span>
      <span class="collect">{{gooditem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodListItem',
    props: {
      gooditem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.gooditem.image || this.gooditem.show.img
      }
    },
    methods: {
      imgLoad() {
        // 发送全局事件 表示item中图片已加载完毕
        this.$bus.$emit('itemImageLoad') 
      },
      itemClick() {
        // console.log("跳转详情页");
        this.$router.push('/detail/'+ this.gooditem.iid)
      }
    }
  }
</script>

<style scoped>
  .good-list-item {
    width: 48%;
    margin-bottom: 10px;
  }

  .good-list-item img {
    width: 100%;
    border-radius: 4%;
  }

  .goods-info {
    font-size: 12px;
    text-align: center;
  }

  .goods-info p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 5px;
  }

  .goods-info .price {
    color: #ff8198;
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -14px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") center/14px;
  }
</style>