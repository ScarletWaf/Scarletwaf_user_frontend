import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VCharts from 'v-charts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'

Vue.config.productionTip = false
// Vue.prototype.$axios = axios
Vue.prototype.qs = qs

Vue.use(VueAxios, axios)
Vue.use(VCharts)
Vue.use(ElementUI)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
