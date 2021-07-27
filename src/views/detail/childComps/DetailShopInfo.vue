<template>
  <div class="shopInfo">

    <div class="shop-base">
      <div class="shop-logo"><img :src="shopInfo.shopLogo"></div>
      <div class="shop-name">{{shopInfo.name}}</div>
    </div>

    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="shop-sell">
          <div>{{shopInfo.sell}}</div>
          <div>总销量</div>
        </div>
        <div class="shop-goods">
          <div>{{shopInfo.goods}}</div>
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shopInfo.score" :key="index">
            <td>{{item.name}}</td>
            <td :class="{'score-better': item.isBetter}" class="score" >{{item.score}}</td>
            <td :class="{'better-more': item.isBetter}" class="better" >
              <!-- 套个span标签可以让背景颜色紧挨着字体 -->
              <span>{{item.isBetter? '高':'低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailShopInfo',
    props: {
      shopInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .shopInfo {
    padding: 15px 10px 30px;
    border-bottom: 5px solid #eeeeee;
  }

  .shop-base {
    display: flex;
    align-items: center;
  }

  .shop-logo {
    width: 45px;
    height: 45px;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-right: 8px;
  }

  .shop-logo img {
    position: absolute;
    width: 95%;
    height: 95%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto; /*使其垂直居中*/
    border-radius: 50%;
  }

  .shop-name {
    font-size: 15px;
  }

  .shop-middle {
    display: flex;
    align-items: center;
    font-size: 13px;
    margin: 20px 0;
  }

  .shop-middle-item {
    flex: 1;
  }

  .shop-middle .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
    line-height: 20px;
  }

  .shop-middle .shop-middle-right table {
    width: 120px;
    margin-left: 25px;
  }

  .shop-middle-right table td {
    padding: 5px 0;
  }

  .shop-middle-right .score {
    color: #6fc720;
  }
  
  .shop-middle-right .score-better {
    color: #fd5469;
  }

  .shop-middle-right .better span {
    color: #fff;
    background-color: #6fc720;  
  }

  .shop-middle-right .better-more span {
    background-color: #fd5469;
  }

  .shop-bottom {
    text-align: center;
  }

  .shop-bottom .enter-shop {
    display: inline-block;
    width: 150px;
    height: 30px;
    line-height: 30px;
    background-color: #e4e4e4;
    border-radius: 8px;
  }
</style>