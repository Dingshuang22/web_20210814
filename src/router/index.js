import Vue from 'vue'
import Router from 'vue-router'
import {routes} from './child'
Vue.use(Router)

// 屏蔽跳转到本身时的报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  if (location && typeof location == "string" && location.indexOf("http") != -1) return window.location.open(location, "_self")

  return originalPush.call(this, location).catch(err => err)
}

const originalResolve = Router.prototype.resolve
Router.prototype.pushToTab = function pushToTab(location) {
  if(!location) return;
  if (location && typeof location == "string" && location.indexOf("http") != -1) return window.open(location, "_blank")

  const { href } = originalResolve.call(this, location)
  window.open(href, "_blank")
}

const createRouter = routes => new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: (resolve) => require(['@/views/Layout/Layout'], resolve),
      meta: {title: '主页'},
      redirect: {name: 'Dashboard'},
      children: routes
    },
    {
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['@/views/Login/Login'], resolve),
      meta: {title: '登陆'}
    },
    {
      path: '/lockscreen',
      name: 'LockScreen',
      route:'/lockscreen',
      component: resolve => require(['@/views/LockScreen/LockScreen'], resolve),
      meta: {title: '锁屏', icon: 'dashboard'}
    }

  ]
})

// 初始化路由的时候，只挂载不需要用户权限的路由表
const router = createRouter(routes)

// router.matcher = createRouter(children).matcher
/**
 * 加载动态菜单和路由
 */
// routes 动态处理为二级传输过来 此处为方法模拟
// const loadasyncRoutes = function (cb) {
//   let children = routesList
//   constantRoutes.forEach(function (item) {
//     children.push(item)
//   })
//   console.log('***')
//   console.log(children)
//   router.matcher = createRouter(children).matcher
// }

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if (to.name === 'login') {
//     next()
//   } else {
//     if (!window.sessionStorage.load) {
//       // 加载动态菜单和路由
//       // loadasyncRoutes(() => {
//       // router.push({name: to.name, path: to.path})
//       // })
//     // }
//     window.sessionStorage.load = 'on'
//     next()
//   }

// })

export default router
