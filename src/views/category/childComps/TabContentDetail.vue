<template>
  <grid-view  :lineSpace="15" :v-margin="20" v-if="categoryDetail">
    <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :product="item"></goods-list-item>
  </grid-view>
</template>

<script>
  import GridView from 'components/common/grid/GridView'
  import GoodListItem from 'components/content/goods/GoodListItem'

  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      GoodListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    },
    created(){
      console.log(this.categoryDetail)
    }
  }
</script>

<style scoped>

</style>
