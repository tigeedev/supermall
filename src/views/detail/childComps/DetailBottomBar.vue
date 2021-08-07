<template>
  <div class="bottomBar">
    <div class="bar-left bar-item">
      <div>
        <i class="service icon"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="shop icon"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="select icon"></i>
        <span class="text">收藏</span>
      </div>
    </div>

    <div class="bar-right bar-item">
      <div class="cart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBottomBar'
  }
</script>

<style scoped>
  .bottomBar {
    height: 49px;
    background-color: #fff;
    position: relative;

    display: flex;
    align-items: center;
  }

  .bar-item {
    flex: 1;
  }

  .bar-left {
    display: flex;
    justify-content: space-around;
  }
  
  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 0px 0 2px 2px;
    background: url('~assets/img/detail/detail_bottom.png') 0 2px/100%;
  }

  .bar-left .service {
    background-position: 0 -52px;
  }

  .bar-left .shop {
    background-position: 0 -97px;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-right {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    text-align: center;
  }

  .bar-right .cart {
    flex: 1;
    height: 49px;
    line-height: 49px;
    background-color: #f8e71c;
    color: #434343;
  }

  .bar-right .buy {
    flex: 1;
    height: 49px;
    line-height: 49px;
    background-color: #fd364e;
    color: #e6e6e6;
  }
</style>