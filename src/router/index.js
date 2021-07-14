import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Category = () =>
  import ('views/category/Category')
const Home = () =>
  import ('views/home/Home')
const Profile = () =>
  import ('views/profile/Profile')
const Cart = () =>
  import ('views/cart/Cart')

// 安装插件
Vue.use(VueRouter)

// 定义路由
const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/cart',
    component: Cart
  }
]

// 创建router实例
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 导出router实例
export default router