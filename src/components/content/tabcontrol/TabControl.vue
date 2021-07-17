<template>
  <div class="tab-control">
    <!-- 业务中只是文字不一样的话，没有必要用插槽slot 可以从父组件手动获取数据-->
    <div v-for="(item,index) in titles" :key="index" 
         class="tab-item"
         :class="{active: index == currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        // 自定义事件，给父组件传递数据
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    font-size: 15px;
  }

  .tab-item {
    flex: 1;
  }  

  .active span {
    color: #ff5777;
    border-bottom: 1px solid #ff5777;
    padding: 5px;
  }
</style>