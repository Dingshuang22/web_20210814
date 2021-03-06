// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
const brh = require('./utils/brh').default

// this.time = this.moment(this.time).format('YYYY-MM-DD HH:mm:ss')
import Moment from 'moment'

//style
import '@/styles/index.scss'

// apis
import api from '@/config/plugin'

import ui from '@/plugins/ui'

// icon
import '@/icons'
import './permission' // permission control



// element-ui
import './plugins/element.js'

// main.js el-menu折叠文字不消失
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
Vue.use(ui)

// global filters
import drag from '@/directive/el-drag-dialog'



// filters
import * as filters from '@/filters'

import QueryList from './components/QueryList'

// 复制粘贴
import clipboard from "@/directive/clipboard";
Vue.use(clipboard)

// 自定义按钮权限指令
import permission from "@/directive/permission";
Vue.use(permission)

Vue.config.productionTip = false

// 批量引入组件
import components from './components'
Vue.use(components)

console.log('main.js')
console.log(process.env.NODE_ENV)
console.log(process.env.BASE_URL)
Vue.use(api)
Vue.use(drag)
Vue.prototype.moment = Moment

// 添加实例属性
Object.assign(Vue.prototype, {
  brh, // 公共方法
  formValidate: require('./utils/formValidate').default, // 表单验证
})

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default vm
