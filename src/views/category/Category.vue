<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center">分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll class="tab-content">
        <div>
        <tab-content :categoriesProduct="categoriesProduct"></tab-content>
        <tab-control :titles="['综合', '新品', '销量']"
                     @tabClick="tabClick"></tab-control>
        <tab-content-detail :categoryDetail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import Scroll from 'components/common/scroll/Scroll';
import TabControl from 'components/content/tabcontrol/TabControl'

import TabMenu from './childComps/TabMenu';
import TabContent from './childComps/TabContent';
import TabContentDetail from './childComps/TabContentDetail';

import { getCategory, getSubcategory, getCategoryDetail } from 'network/category';
import { POP, SELL, NEW } from "common/const";
import { itemListenerMixin } from "common/mixin";

export default {
  name: 'Category',
  data() { 
    return {
      scroll:null,
      
      msg: "hhhh",
      intervalId: null,

      categories: [],
      categoriesProduct: [],
      categoryData: {
      },
      currentIndex: -1
    }
  },
  // mixins:[tabControlMixin],
  mixins:[itemListenerMixin],
  mounted(){
    
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      // console.log(this.currentType)
      // console.log(this.categoryData[this.currentIndex].categoryDetail[this.currentType])
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  created(){
    this._getCategory();
    //this.dialog();
    
  },
  components:{
    NavBar,
    Scroll,
    TabMenu,
    TabContent,
    TabControl,
    TabContentDetail,
  },
  methods:{
    
    _getCategory(){
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategory(0)
      })
    },
    _getSubcategory(index){
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then(res => {
        this.categoriesProduct = res.data.list;
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    dialog(){
      this.intervalId = setInterval(() =>{
        let start = this.msg.substring(0, 1);
        var end = this.msg.substring(1);
        this.msg = end + start;
      }, 400)
    },
    selectItem(index){
      this._getSubcategory(index);
    },
  }
 }
</script>

<style scoped>
.category{
  height: 100vh;
}
 .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;

    
  }
.message-pass{
  white-space: nowrap;
  width: 375px;
}
.content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

    display: flex;
}
.tab-content{
  height: 100%;
  flex: 1;
}
</style>