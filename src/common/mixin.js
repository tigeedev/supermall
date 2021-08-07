/**
 * mixin混入 方便代码在多个组件中复用
 * 
 * 注意：生命周期中的函数可在混入和组件中分别写，最后会进行合并
 *       而methods中的函数必须整个抽取，否则会覆盖
 */
import { debounce } from 'common/utils.js'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    // 对监听的事件进行保存
    this.itemImgListener = () => {
      refresh()
    };
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}


// Home和 Detail混入 - 点击返回顶部
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}