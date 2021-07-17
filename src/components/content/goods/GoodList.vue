<template>
  <div class="goodlist">
    <good-list-item  v-for="(item,index) in goods" 
           :key="index"   
           :gooditem="item" />
  </div>
</template>

<script>
  import GoodListItem from './GoodListItem'

  export default {
    name: 'GoodList',
    components: {
      GoodListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goodlist {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    padding: 0 2px;
  }
</style>