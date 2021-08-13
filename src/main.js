import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
import FastClick from 'fastclick'

Vue.config.productionTip = false;

// 定义事件总线，给$bus赋值 - 非父子组件通信
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')