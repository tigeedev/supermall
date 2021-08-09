<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="navBar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    
    <!-- 列表 -->
    <cart-list />

    <!-- 统计 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // 将 store 中的 getter 映射到计算属性
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  
  .navBar {
    background-color: #ff3d7e;
    color: #fff;
  }
</style>