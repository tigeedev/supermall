## 一. 项目运行

```
# 安装依赖
npm install

# 运行
npm run serve

# 编译生产
npm run build

# 项目地址
shop.tigeedev.com
```



## 二. 项目框架搭建

### 2.1 划分目录结构

- assets - img/css资源
- common - 公共的js文件
  - const.js 公共的常量
  - utils.js 工具方法

- components - 一些公共组件
  - common  完全公共的组件（其他项目也可以使用）
  - content  和当前项目相关的公共组件
- network - 网络封装
- router - 路由
- store - 状态管理
- views - 主要视图 home/category
- pages - 路由分层



### 2.2 CSS初始化和全局样式

- [normalize.css](https://github.com/necolas/normalize.css)
- base.css



### 2.3 起别名

根目录新建 `vue.config.js` 文件，在里面配置



### 2.4 tabbar的封装

> tabbar实现完成，说明项目的整体架构已经搭好。之后就可以分模块开发
>

- 封装Tabbar
- 封装TabbarItem
- 响应点击切换的设计
- 封装完成后，使用时对Tabbar重新包装



### 2.5 axios的封装

- 创建axios实例
- 拦截响应，返回.data数据
- 根据传入的options发送请求，并且调用对应resolve和reject



## 三. 首先实现思路

### 3.1 navbar导航栏

- 封装navbar包含三个插槽：left、center、right
- 设置navbar相关的样式
- 使用navbar实现首页的导航栏



### 3.2 请求首页数据

- 封装请求首页更多数据
- 将banner数据放在banners变量中
- 将recommend数据放在recommends变量中



### 3.3 HomeSwiper轮播图 - 根据Swiper封装

- 使用Swiper和SwiperItem
- 传入banners进行展示



### 3.4 RecommendView推荐

- 传入recommends数据，进行展示



### 3.5 FeatureView

- 独立组件封装，展示一张图片即可
  - div>a>img



### 3.6 TabControl

> 只是文字不一样的话，没有必要用插槽slot

独立组件的封装

- props -> titles
- div>根据titles v-for遍历 div -> span{{title}}
- css相关 - flex布局
- 选中哪一个tab, 哪一个tab的文字颜色变色, 下面border-bottom
  - currentIndex



### 3.7 首页商品数据的请求

#### a. 设计数据结构, 用于保存数据

```
goods: {
    pop: page/list
    new: page/list
    sell: page/list
}
```

#### b. 发送数据请求

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



### 3.8 对商品数据进行展示

#### a. 封装GoodsList组件

- 封装GoodsList，展示商品列表

- props: goods -> goods[this.currentType].list
- v-for goods -> GoodsListItem[30]
- GoodListItem(组件) -> gooditem(数据)

#### b. 封装GoodsListItem组件

- 封装GoodsListItem，列表中每一个商品
- props: goodsItem 
- goodsItem 取出数据, 并且使用正确的div/span/img基本标签进行展示



### 3.9 对滚动重构-封装Scroll

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



### 3.10 上拉加载更多

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



### 3.11 返回顶部BackTop

#### a. 封装BackTop组件

- div>img

#### b. 如何监听组件的点击

- 可以直接监听 `back-top` 组件的点击？
  - 不可以, 监听组件的点击必须添加修饰 `.native`
  - <back-top @click.native='backClick' />
- 点击时，调用scrollTo返回顶部
  - scroll对象, scroll.scrollTo(x, y, time)
  - this.$refs.scroll.scrollTo(0, 0, 500)

#### c. BackTop组件的显示和隐藏

- `v-show` ="isShowBackTop"（false / true）
- 监听滚动, 拿到滚动的位置:
  - 子组件发送自定义事件 `this.$emit('scroll', position)`
  - 父组件（Home）对事件进行处理：
    - this.isShowBackTop = -position.y > 1000
    - -position.y > 1000  --> isShowBackTop: true



### 3.12 解决首页中可滚动区域的问题

- 问题描述：在首页以及详情页对商品使用better-scroll进行展示时，时而出现无法向下滚动的情况

- 原因：Better-Scroll根据scrollerHeight属性决定有多少区域可以滚动。而scrollerHeight又根据Better-Scroll的content中的子组件的高度。在页面打开时，网络请求的数据还未渲染到页面上，图片未加载完成，导致计算出来的高度有误，所以滚动出现了问题。

- 解决：监听 `@load` 组件中每一张图片的加载，有图片加载完成时调用scroll内置的refresh()，对滚动区域刷新，重新计算高度。

- 难点：将GoodsListItem.vue中的事件传入到Home.vue中

  ```
  # 非父子组件的通信 - 事件总线 bus
  - 用原型引入$bus：Vue.prototype.$bus = new Vue()
  - GoodsListItem发送事件：this.$bus.$emit('事件名称', 参数)
  - Home监听事件（created）：this.$bus.$on('事件名称', callback)
  
  # 注意：要在mounted生命周期函数中使用 this.$refs.scroll而不是created中
  ```

- 优化：图片加载完成，refresh会被频繁的调用。可以封装一个防抖函数，有效减少刷新次数。

  ```js
  debounce(func, delay) {
      let timer = null
      return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
              func.apply(this, args)
          }, delay)
      }
  }
  
  //调用
  debounce(this.$refs.scroll.refresh(),100)
  ```



### 3.13 tabControl的吸顶效果

#### a. 获取到tabControl的offsetTop

- 必须知道滚动到多少时, 开始有吸顶效果, 这个时候就需要获取tabControl的offsetTop
- 但是, 如果直接在mounted中获取tabControl的offsetTop, 那么值是不正确的（图片没加载完成）
- 如何获取正确的值?
  - 监听HomeSwiper中img的加载完成. 
    - 监听图片加载：<img @load="imageLoad">
    - 发送事件：this.$emit('swiperImageLoad')
  - 加载完成后发出事件, 在Home.vue中监听事件, 获取正确的值.
    - this.$refs.tabControl2.$el.offsetTop
  - 补充：为了不让HomeSwiper多次发出事件，可以使用isLoad的变量进行状态的记录.

#### b. 监听滚动, 解决tabControl的停留问题

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



### 3.14 让Home保持原来的状态

#### a. 让Home不要随意销毁

- keep-alive

#### b. Home保持位置状态

- `deactivated`：记录离开时的位置，保存位置信息saveY.
  - this.saveY = this.$refs.scroll.scroll.y
- `activated`：通过scrollTo函数，设置进来时的位置
  - 进来先进行一次刷新：this.$refs.scroll.refresh()
  - 再设置位置：this.$refs.scroll.scrollTo(0, this.saveY, 0)



## 四. 详情页实现思路

### 4.1 跳转到详情页并且携带iid

> 思路：点击某一个商品时，跳转到详情页面，同时传递商品iid参数。之后根据商品iid请求对应的数据进行展示

#### a. 点击某一个商品跳转

- 监听GoodsListItem组件的点击
- 点击之后获取商品的iid，跳转到详情页，并且传入iid
- 点击跳转：this.$router.push('/detail/'+ this.gooditem.iid)

#### b. 封装详情页组件 Detail

- 详情页属于比较大的一个模块，可放入views文件夹下. `views/detail/Detail.vue`
- 在组件创建完时，拿到iid：this.$route.params.iid

#### c. 配置detail对应的路由映射

```js
const routes = [{
  // ...
  {
    path: '/detail/:iid',  // 此处用动态路由传递参数iid
    component: Detail
  }
]
```



### 4.2 详情页的导航栏实现

- 返回按钮：left
- 标题列表的展示：center



### 4.3 请求详情的数据

- 接口：`/detail?iid=`



### 4.4 轮播图的实现

- Swiper/SwiperItem



### 4.5 商品基本信息的展示

- 数据来自四面八方
- 对数据进行汇总：保存到一个对象中
- 把这个对象传入到子组件中



### 4.6 店铺信息的展示

### 4.7 商品图片的展示

### 4.8 参数信息的展示

### 4.9 评论信息的展示

- 时间格式化
- 服务器返回的时间戳 -> date -> 格式化
- yyyy-MM-dd hh:mm:ss



### 4.10 推荐数据的展示

- 请求推荐数据：`/recommend`
- GoodList组件展示数据



### 4.11 mixin的使用

- 创建混入对象：const mixin = {}
- 组件中使用：mixins: [mixin]



### 4.12 标题和内容的联动效果

#### a. 点击标题，滚动到对应的主题

- 在detail中监听标题的点击，获取index
- 点击滚动到对应标题的位置：
  - scrollTo(0, 标题的offsetTop , 100)
  - 获取所有标题的offsetTop，保存于数组themeTopYs中
    - themeTopYs.push(this.$refs.params.$el.offsetTop)
  - 问题：在哪里才能获取到正确的offsetTop
    - 1.created肯定不行，压根不能获取元素
    - 2.mounted也不行，数据还没有获取到
    - 3.获取到数据的回调中也不行，DOM还没有渲染完
    - 4.$nextTick也不行，因为图片的高度没有被计算在内
    - 5.在图片加载完成后，获取的高度才是正确的



#### b. 内容滚动，显示对应的标题

- `Scroll` 组件中发送 “监听滚动位置” 的事件

- `Detail` 中接收事件。完成滚动内容显示对应标题的逻辑

  ```js
  if((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
  	this.currentIndex = i;
  	this.$refs.nav.currentIndex = this.currentIndex
  }
  
  positionY = 滚动过程中的Y值
  themeTopYs = 保存了所有标题的offsetTop
  themeTopYs: [0,1000,2000,3000,Number.MAX_VALUE]
  
  条件成立：this.currentIndex = i
  条件一：this.currentIndex !== i
  * 防止赋值的过程过于频繁
  条件二：(positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
  * 判断区间：在 0 和 某个数字 之间 (i < this.themeTopYs.length-1)
  
  注意细节：
  在数组themeTopYs中，除了标题的offsetTop值外，还添加了一个最大值Number.MAX_VALUE。目的是减少if条件中的逻辑判断.
  ```



### 4.13 底部工具栏的封装

- 底部工具栏：`DetailBottomBar` 
- 客服 | 店铺 | 收藏 | 加入购物车 | 购买

### 4.14 详情页的回到顶部

- home.vue和detail.vue回到顶部  使用 `mixin` 



### 4.15 点击加入购物车

#### a. 监听加入购物车按钮的点击，并获取商品信息

- 监听
- 获取商品信息：iid/price/image/title/desc

#### b. 将商品添加到Vuex中

- 安装和配置Vuex
- 定义mutations，将商品添加到state.cartList中
- 重构代码：
  - 将mutations中的代码抽取到actions中（定义两个mutations）
  - 将mutations/actions单独抽取到文件中



## 五. 购物车的展示

### 5.1 购物车导航栏的展示

- 购物车(n)



### 5.2 购物车商品的展示

- CartList组件 -> Scroll（滚动问题）
- CartListItem组件 -> CheckButton



### 5.3 商品的选中和不选中切换

- 修改模型对象mutations，改变button的选中状态



### 5.4 底部工具栏的汇总

- 全选按钮：引入CheckButton组件
- 计算总价格：totalPrice
- 去计算(checkLength)



### 5.5 购物车的全选按钮

- 显示的状态
  - isSelectAll
  - 判断 如果有一个商品不选中，全选就是不选中
- 点击全选按钮
  - 如果原来都是选中，点击变成全部不选中
  - 如果原来都是不选中（某些不选中），点击全部选中
  - 思路：直接判断上方的 isSelectAll 即可



### 5.6 添加购物车弹窗

#### a. Vuex的补充

- Actions可以返回一个Promise
- mapActions的映射关系
- mapMutations的映射关系

#### b. 封装Toast



## 项目扩展

### 1. fastClick减少点击延迟

- fastClick-解决移动端300ms延迟

```
# 安装fastclick插件
npm install fastclick --save

# 在main.js中引入并绑定到body
import FastClick from 'fastclick'
FastClick.attach(document.body);
```

### 2. vue-lazyload图片懒加载

- 图片懒加载 ：图片需要出现在屏幕上时，再加载这张图片
- 参考文章：[1.vue-lazyload官方文档](https://github.com/hilongjw/vue-lazyload) 、[2.在vue中使用图片懒加载详细指南](https://segmentfault.com/a/1190000011672452) 

```
# 安装
npm i vue-lazyload --save

# 在main.js中引入
Vue.use(VueLazyload)

// 或者添加VueLazyload 选项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./assets/loading.gif'),
  attempt: 1
})

# 在需要懒加载的地方, 把img标签里面的 :src 属性 改成 v-lazy
:src='/static/img/' => v-lazy='/static/img/'
```

### 3. px2vw插件使用

- [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md)：将px单位转换为视口单位vw

```
# 安装插件
npm install postcss-px-to-viewport --save-dev

# 在postcss.config.js中配置
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667, //视窗的高度, 对应的是设计稿的高度
      unitPrecision: 5, //指定'px'转换为视窗单位值的小数位数
      viewportUnit: 'vw', //指定需要转换成的视窗单位, 建议使用vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类
      minPixelValue: 1, //小于或等于'1px'不转换为视窗单位
      mediaQuery: false, //允许在媒体查询中转换'px'
      exclude: [/TabBar/] //[]内为JS正则表达式, 排除不需要转化的组件
    }
  }
}
```

### 4. Toast的使用

toast是常见的提示弹窗组件，用插件方式封装

```
# 新建toast文件
	Toast.vue
	index.js

# main.js中安装toast插件
	import toast from 'components/common/toast'
	Vue.use(toast)

# Detail中使用
	this.$toast.show(res, 2000)
```



## 遇到的问题

#### 1. 项目打包后静态资源无法加载，导致首页白屏

- 原因一：`vue.config.js` 没有配置

  ```js
  //vue.config.js
  module.exports = {
      publicPath: './', //打包后的位置(如果不设置这个静态资源会报404)
      outputDir: 'dist', //打包后的目录名称
      assetsDir: 'static' //静态资源目录名称
  }
  ```

- 原因二：路由模式mode设置成了history，默认是hash

  ```js
  //router.js
  new VueRouter({
    routes,
    // mode: 'history'  //配合nginx本地才能正常使用history模式
  })
  ```

- 参考文章：[config官方文档](https://cli.vuejs.org/zh/config/) 、[vue-cli3.x正确打包项目,解决静态资源与路由加载无效的问题](https://www.cnblogs.com/roseAT/p/11145913.html) 

#### 2. 打包后页面图片显示不出

在本地打开项目图片可正常显示，但是打包后就出现了图片空白的问题。打开F12发现图片已经请求成功，但是对应的网址不全导致图片不能显示。请求图片时手动拼接上 `http:`即可

```js
//DetailInfo.vue
<img :src="item | imgFilter">

filters: {
    imgFilter(value) {
        return 'http:' + value
    }
}
```

<img src="https://tigeedev.oss-cn-hangzhou.aliyuncs.com/img/20210815193842.png" alt="image-20210815193839789" style="zoom: 80%;" />



## 项目部署

- 在网站根目录右键-- `Git Bash Here` 或在 VScode 中打开项目

- 初始化仓库（创建成功标志：根目录出现".git"文件）

  ```css
  git init
  ```

- 链接远程仓库

  ```css
  # 查看当前git的远程仓库版本
  git remote -v
  
  # 移除掉远程仓库的配置
  git remote rm origin
  
  # 添加ssh协议的远程仓库
  git remote add origin git@github.com:tigeedev/supermall.git（仓库地址）
  ```

- 从远程仓库pull文件

  ```css
  git pull origin master
  ```

- 将本地文件push到远程仓库

  ```css
  # 查看工作目录的状态
  git status
  
  # 将文件添加到暂存区
  git add .
  
  # 把暂存区的文件提交到本地仓库
  git commit -m "自定义提交信息"
  
  # 将本地仓库的文件push到远程仓库(若 push 不成功，可加 -f 进行强推操作)
  git push -u origin master
  ```







