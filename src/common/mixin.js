/**
 * mixin 混入
 * 
 * 方便代码在多个组件中复用
 */
import { debounce } from 'common/utils.js'

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