import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;
// 定义事件总线，给$bus赋值 - 非父子组件通信
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')