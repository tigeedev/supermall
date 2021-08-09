<template>
  <div class="cart-item">
    <div class="item-selector">
      <!-- button的选中状态一定要在模型里面改 - mutations -->
      <check-button :isChecked="itemInfo.checked" @click.native="checkClick"/>
    </div>

    <div class="item-img">
      <img :src="itemInfo.image" alt="">
    </div>
   
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">¥{{itemInfo.price}}</div>
        <div class="item-count">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartListItem',
    components: {
      CheckButton
    },
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkClick() {
        this.itemInfo.checked = !this.itemInfo.checked
      }
    }
  }
</script>

<style scoped>
  .cart-item {
    display: flex;
    padding: 5px;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-title, .item-desc {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-info {
    flex: 1;
    overflow: hidden;
    font-size: 17px;
    padding: 5px 10px;
    color: #2c2c2c;
    position: relative;
  }

  .item-info .item-desc {
    margin-top: 15px;
    font-size: 14px;
    color: #666;
  }

  .item-info .info-bottom {
    margin-top: 25px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
  }

  .item-price {
    color: #d4451d;
  }
</style>