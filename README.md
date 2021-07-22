# 一. 项目设置

```
# 安装依赖
npm install

# 运行
npm run serve

# 编译生产
npm run build
```



# 二. 项目框架搭建

## 1.1 划分目录结构

- assets - img/css资源
- common - 公共的js文件
  - const.js 公共的常量
  - utils.js 公共的方法

- components - 一些公共组件
  - common  完全公共的组件（其他项目也可以使用）
  - content  和当前项目相关的公共组件
- network - 网络封装
- router - 路由
- store - 状态管理
- views - 主要视图 home/category
- pages - 路由分层



## 1.2 CSS初始化和全局样式

- [normalize.css](https://github.com/necolas/normalize.css)
- base.css



## 1.3 起别名

根目录新建 `vue.config.js` 文件，在里面配置



## 1.4 tabbar的封装

> tabbar实现完成，说明项目的整体架构已经搭好。
>
> 之后就可以分模块开发

- 封装Tabbar
- 封装TabbarItem
- 响应点击切换的设计
- 封装完成后，使用时对Tabbar重新包装



## 1.5 axios的封装

- 创建axios实例
- 拦截响应，返回.data数据
- 根据传入的options发送请求，并且调用对应resolve和reject



# 三. 首先开发

## 2.1 navbar导航栏

- 封装navbar包含三个插槽：left、center、right
- 设置navbar相关的样式
- 使用navbar实现首页的导航栏



## 2.2 请求首页数据

- 封装请求首页更多数据
- 将banner数据放在banners变量中
- 将recommend数据放在recommends变量中



## 2.3 HomeSwiper轮播图 - 根据Swiper封装

- 使用Swiper和SwiperItem
- 传入banners进行展示



## 2.4 RecommendView推荐

- 传入recommends数据，进行展示



## 2.5 FeatureView

- 独立组件封装，展示一张图片即可
  - div>a>img



## 2.6 TabControl

> 只是文字不一样的话，没有必要用插槽slot

独立组件的封装

- props -> titles
- div>根据titles v-for遍历 div -> span{{title}}
- css相关 - flex布局
- 选中哪一个tab, 哪一个tab的文字颜色变色, 下面border-bottom
  - currentIndex



## 2.7 首页商品数据的请求

### 2.7.1 设计数据结构, 用于保存数据

```
goods: {
    pop: page/list
    new: page/list
    sell: page/list
}
```

### 2.7.2 发送数据请求

- 在 `home.js` 中封装getHomeGoods(type, page)

- 在 `Home.vue` 里的 `methods` 中封装getHomeGoods(type)函数

  - page: 动态的获取对应的page

- 在 `Home.vue` 里的 `created` 中调用getHomeGoods('pop')、getHomeGoods('new')、getHomeGoods('sell')

- 获取到数据: res

  - this.goods[type].list.push(...res.data.list)
  - this.goods[type].page += 1

  ```
  goods: {
      pop: page1/list[30]
      new: page1/list[30]
      sell: page1/list[30]
  }
  ```



## 2.8 对商品数据进行展示

### 2.8.1 封装GoodsList组件

- 封装GoodsList，展示商品列表

- props: goods -> goods[this.currentType].list
- v-for goods -> GoodsListItem[30]
- GoodListItem(组件) -> gooditem(数据)

### 2.8.2 封装GoodsListItem组件

- 封装GoodsListItem，列表中每一个商品
- props: goodsItem 
- goodsItem 取出数据, 并且使用正确的div/span/img基本标签进行展示



## 2.9 对滚动重构-封装Scroll

> `Scroll` 组件是基于Better-Scroll的进一步封装
>
> 使用时在mounted（生命周期函数）中初始化better-scroll

- 1.创建BetterScroll对象
  - new BScroll(el, {  probeType、pullUpLoad、click })
  - 注意: wrapper -> content -> 很多内容
- 2.监听滚动scroll
  - probeType: 0/1/2(手指滚动)/3(只要是滚动)
  - bscroll.on('scroll', (position) => { $emit自定义事件 })
- 3.上拉加载pullingUp
  - pullUpLoad: true
  - bscroll.on('pullingUp', () => {})
- 4.点击click: false
  - button可以监听点击
  - div不可以
- 5.封装刷新的方法：this.scroll.refresh()
- 6.封装滚动的方法：this.scroll.scrollTo(x, y, time)
- 7.封装完成刷新的方法：this.scroll.finishedPullUp

Home.vue和Scroll.vue之间进行通信

- Home.vue将probeType设置为3
- Scroll.vue需要通过$emit, 实时将事件发送到Home.vue



## 2.10 上拉加载更多

- 通过Scroll监听上拉加载更多

  ```
  // 实现上拉刷新
  this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
  })
  ```

- 在Home中加载更多的数据

  ```
  <scroll @pullingUp="loadMore" >
  
  loadMore() {
      // 调用之前封装好的 请求商品数据的方法
      this.getHomeGoods(this.currentType)
  }
  ```

- 请求数据完成后，调动 `finishPullUp()`

  ```
  // 多次请求数据, 可以继续上拉加载
  this.$refs.scroll.finishPullUp()
  ```



## 2.11 返回顶部BackTop

### 1. 封装BackTop组件

- div>img

### 2. 如何监听组件的点击

- 可以直接监听 `back-top` 组件的点击？
  - 不可以, 监听组件的点击必须添加修饰 `.native`
  - <back-top @click.native='backClick' />
- 点击时，调用scrollTo返回顶部
  - scroll对象, scroll.scrollTo(x, y, time)
  - this.$refs.scroll.scrollTo(0, 0, 500)

### 3. BackTop组件的显示和隐藏

- `v-show` ="isShowBackTop"（false / true）
- 监听滚动, 拿到滚动的位置:
  - 子组件发送自定义事件 `this.$emit('scroll', position)`
  - 父组件（Home）对事件进行处理：
    - this.isShowBackTop = -position.y > 1000
    - -position.y > 1000  --> isShowBackTop: true



## 2.12 解决首页中可滚动区域的问题

- Better-Scroll在决定有多少区域可以滚动时, 是根据scrollerHeight属性决定
  - scrollerHeight属性是根据放Better-Scroll的content中的子组件的高度
  - 但是我们的首页中, 刚开始在计算scrollerHeight属性时, 是没有将图片计算在内的
  - 所以, 计算出来的是错误的(1300+)
  - 后来图片加载进来之后有了新的高度, 但是scrollerHeight属性并没有进行更新.
  - 所以滚动出现了问题
- 如何解决这个问题了?
  - 监听每一张图片是否加载完成, 只要有一张图片加载完成了, 执行一次refresh()
  - 如何监听图片加载完成了?
    - 原生的js监听图片: img.onload = function() {}
    - Vue中监听: @load='方法'
  - 然后调用scroll的refresh()
- 如何将GoodsListItem.vue中的事件传入到Home.vue中
  - 因为涉及到非父子组件的通信, 所以这里我们选择了**事件总线**
    - bus ->总线
    - 用原型引入$bus：Vue.prototype.$bus = new Vue()
    - GoodsListItem发射事件：this.$bus.$emit('事件名称', 参数)
    - Home监听事件（created）：this.$bus.$on('事件名称', 回调函数(参数))
- 问题一: refresh找不到的问题
  - 第一: 在Scroll.vue中, 调用this.scroll的方法之前, 判断this.scroll对象是否有值
  - 第二: 在mounted生命周期函数中使用 this.$refs.scroll而不是created中
- 问题二: 对于refresh非常频繁的问题, 进行防抖操作（选做）
  - 防抖debounce/节流throttle(课下研究一下)
  - 防抖函数起作用的过程:
    - 如果我们直接执行refresh, 那么refresh函数会被执行30次.
    - 可以将refresh函数传入到debounce函数中, 生成一个新的函数.
    - 之后在调用非常频繁的时候, 就使用新生成的函数.
    - 而新生成的函数, 并不会非常频繁的调用, 如果下一次执行来的非常快, 那么会将上一次取消掉

```js
debounce(func, delay) {
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
},
```



## 2.13 tabControl的吸顶效果

#### 1. 获取到tabControl的offsetTop

- 必须知道滚动到多少时, 开始有吸顶效果, 这个时候就需要获取tabControl的offsetTop
- 但是, 如果直接在mounted中获取tabControl的offsetTop, 那么值是不正确的（图片没加载完成）
- 如何获取正确的值?
  - 监听HomeSwiper中img的加载完成. 
    - 监听图片加载：<img @load="imageLoad">
    - 发送事件：this.$emit('swiperImageLoad')
  - 加载完成后发出事件, 在Home.vue中监听事件, 获取正确的值.
    - this.$refs.tabControl2.$el.offsetTop
  - 补充:
    - 为了不让HomeSwiper多次发出事件,
    - 可以使用isLoad的变量进行状态的记录.

#### 2. 监听滚动, 解决tabControl的停留问题

- 在最上面, 多复制一份TabControl组件对象, 利用它来实现停留效果
- 复制的TabControl组件默认隐藏，当用户滚动到一定位置（tabOffsetTop处）时, 让TabControl显示出来
  - v-show="isTabFixed"（false/true）
  - isTabFixed = -position.y > this.tabOffsetTop
- 问题一：复制的TabControl组件不显示
  - 先取消导航组件 nav-bar 的固定定位fixed
  - 提高TabControl的层级关系z-index：又因为z-index只对定位的元素起作用，所以需要给复制的TabControl设置一个相对定位relative
- 问题二：两个组件在点击时不保持同步
  - TabControl组件中有一个currentIndex属性，用于记录当前点击的位置
  - 在Home中点击TabControl时，将index分别赋值给两个组件即可
    - this.$refs.tabControl1.currentIndex = index
    - this.$refs.tabControl2.currentIndex = index



## 2.14 让Home保持原来的状态

#### 1. 让Home不要随意销毁掉

- keep-alive

#### 2. 让Home中的内容保持原来的位置

- 离开时, 保存一个位置信息saveY.
  - this.saveY = this.$refs.scroll.scroll.y
- 进来时, 将位置设置为原来保存的位置saveY信息即可.
  - 注意: 最好回来时, 先进行一次refresh()
  - 先刷新：this.$refs.scroll.refresh()
  - 在设置位置：this.$refs.scroll.scrollTo(0, this.saveY, 0)
- 说明：生命周期钩子函数的使用
  - `activated`：keep-alive组件激活时使用，一进入页面就触发
  - `deactivated`：keep-alive组件停用时调用