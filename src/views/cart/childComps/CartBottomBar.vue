<template>
  <div class="bottomBar">
    <div class="checkContent">
      <check-button :isChecked="isSelectAll" 
                    class="check-button" 
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      // 商品价格合计
      // filter 过滤出被选中的商品，reduce 价格汇总，toFixed 保留两位小数
      totalPrice() {
        return '¥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      // 商品总数
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if(this.$store.state.cartList.length === 0) {
          // 商品数为0时, 默认不选中
          return false
        } else {
          // 1.使用filter
          return !(this.$store.state.cartList.filter(item => !item.checked).length)

          // 2.使用find
          // return !this.$store.state.cartList.find(item => !item.checked)

          // 3.普通遍历
          // for(let item of this.$store.state.cartList) {
          //   if(!item.checked) {
          //     return false
          //   } 
          // }
          // return true
        }
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {
          //全部不选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else {
          // 部分或全部选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calClick() {
        if(!this.isSelectAll) {
          this.$toast.show('请选择购买的商品！')
        }
      }
    }
  }
</script>

<style scoped>
  .bottomBar {
    display: flex;
    align-items: center;
    height: 44px;
    font-size: 14px;
    background-color: #e4e4e4;
  }

  .checkContent {
    display: flex;
    align-items: center;
    width: 70px;
  }

  .check-button {
    margin: 0 5px 0 10px;
  }

  .price {
    flex: 1;
    margin-left: 5px;
  }

  .calculate {
    width: 90px;
    height: 100%;
    color: #fff;
    line-height: 44px;
    text-align: center;
    background-color: #fd364e;
  }
</style>