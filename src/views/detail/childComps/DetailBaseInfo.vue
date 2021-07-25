<template>
<!-- 先判断goods是否是空对象。确认有数据时再接着渲染 -->
  <div v-if="Object.keys(goods).length !== 0" class="detail-base-info">
    <div class="info-title">{{goods.title}}</div>

    <div class="info-price">
      <span class="newPrice">{{goods.price}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>

    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>

    <div class="info-service">
      <span class="service-item" v-for="index in goods.services.length-1" 
            :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .detail-base-info {
    padding: 0 10px;
    margin: 10px 0 10px;
    border-bottom: 5px solid #eeeeee;
  }

  .info-title {
    font-size: 14px;
    color: #222;
  }

  .info-price {
    margin: 15px 0;
  }

  .info-price .newPrice {
    font-size: 18px;
    color: #fe5e80;
  }

  .info-price .oldPrice {
    font-size: 12px;
    text-decoration: line-through;
    color: #a6a6a6;
    margin: 0 5px;
  }

  .info-price .discount {
    color: #fff;
    font-size: 12px;
    padding: 2px 3px;
    border-radius: 12px;
    background-color: #fe5e80;

    /* 让元素上浮一点，使用相对定位即可 */
    position: relative;
    top: -5px;
  }

  .info-other {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #a6a6a6;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-service {
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-service img {
    width: 14px;
    height: 14px;

    /* 相对定位调整图片的位置 */
    position: relative;
    top: 3px;
  }
</style>