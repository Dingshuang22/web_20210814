// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"

// this.time = this.moment(this.time).format('YYYY-MM-DD HH:mm:ss')
import Moment from 'moment'

//style
import '@/styles/index.scss'

// apis
import api from '@/config/plugin'

import ui from '@/plugins/ui'

// icon
import '@/icons'

// table
import FreeTable from '@/components/table/FreeTable'

// element-ui
import './plugins/element.js'

// main.js el-menu折叠文字不消失
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
Vue.use(ui)

// global filters
import drag from '@/directive/el-drag-dialog'

// LineMarker
import LineMarker from '@/components/Charts/LineMarker'

// dialog
import MyDialog from '@/components/Dialog'
import BaseDialog from '@/components/BaseDialog'

// filters
import * as filters from '@/filters'

import QueryList from './components/QueryList'

Vue.config.productionTip = false

console.log('main.js')
console.log(process.env.NODE_ENV)
console.log(process.env.BASE_URL)
Vue.use(api)
Vue.use(FreeTable)
Vue.use(drag)
Vue.prototype.moment = Moment

Vue.component('BaseDialog', BaseDialog)
Vue.component('QueryList', QueryList)
Vue.component('MyDialog', MyDialog)
Vue.component('LineMarker', LineMarker)

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
