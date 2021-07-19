<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // ref绑定在组件中, 通过this.$refs.refname获取到的是一个组件对象.
      // ref绑定在普通的元素中, 通过this.$refs.refname获取到的是一个元素对象.
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM: true,  // 解决 better-scroll 无法滚动的问题
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 监听滚动的位置
      this.scroll.on('scroll', position => {
        // console.log(position);
        this.$emit('scroll', position)
      })

      // 上拉刷新
      this.scroll.on('pullingUp', () => {
        // console.log('上拉刷新')
        this.$emit('pullingUp')
      })
    },
    methods: {
      // 点击返回顶部
      scrollTo(x, y, time=500) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>