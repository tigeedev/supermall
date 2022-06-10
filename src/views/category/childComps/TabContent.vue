<template>
  <div class="tab-content">
      <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="categoriesProduct">
          <div class="content-item" 
               v-for="(item, index) in categoriesProduct" :key="index">
            <img :src="item.image" alt=""/>
            <div>{{item.title}}</div>
          </div>
      </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/grid/GridView';

export default {
  name: 'TabContent',
  props:{
      categoriesProduct:{
          type: Array,
          default(){
              return []
          }
      }
  },
  data() { 
    return {

    }
  },
  components:{
      GridView,
  }
 }
</script>

<style scoped>
.content-item{
    text-align: center;
    font-size: 12px;
}
.content-item img{
    width:80%;
}
.content-item span{
    margin-top: 15px;
}
</style>