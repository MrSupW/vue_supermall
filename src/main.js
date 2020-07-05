import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store";
import toast from "components/common/toast"
import fastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
Vue.config.productionTip = false

// 使用时间总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

//解决移动端300ms的延迟问题
fastClick.attach(document.body)

//使用懒加载
Vue.use(VueLazyload,{
  loading : require('../src/assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
