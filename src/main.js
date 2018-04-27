// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import './assets/css/reset.css'
import axios from 'axios'
import echarts from 'echarts'
import './assets/js/rem.js'


Vue.prototype.$echarts = echarts

Vue.use(ElementUI);

Vue.use(axios)
Vue.prototype.$axios = axios
axios.defaults.baseURL="http://10.90.6.251:8081"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
    render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
