// 不需要用户权限的路由表
const constantRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    route:'/dashboard',
    component: resolve => require(['@/views/Dashboard/Dashboard'], resolve),
    meta: {title: '首页', icon: 'dashboard'}
  }

]
const routes = [

    {
      path: '/bill',
      name: 'Bill',
      route: '/bill',
      component: resolve => require(['@/views/Bill/Bill'], resolve),
      meta: {title: '账单', icon: 'example'},
      children: [
        {
          path: 'flowtaday',
          name: 'FlowDay',
          route: '/bill/flowtaday',
          component: resolve => require(['@/views/FlowToday/FlowToday'], resolve),
          meta: {title: '今日流水', icon: '1shouye'}
        },
        {
          path: 'refundrecord',
          name: 'RefundRecord',
          route: '/bill/refundrecord',
          component: resolve => require(['@/views/RefundRecord/RefundRecord'], resolve),
          meta: {title: '退款记录', icon: '2changyong'}
        },
      ]
    },



]
routes.unshift(constantRoutes[0])
export { routes }
