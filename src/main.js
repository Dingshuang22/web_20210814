// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// apis
import api from '@/config/plugin'

// icon
import '@/icons'

// filters
import * as filters from '@/filters'


Vue.config.productionTip = false

console.log('main.js')
console.log(process.env.NODE_ENV)
console.log(process.env.BASE_URL)
Vue.use(api)

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
