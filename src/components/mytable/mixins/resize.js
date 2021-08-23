// 函数节流 防止连续重复调用
// 定义节流函数，需传入：1.调用的函数 2.上下文（即调用传入函数的对象）
var util = {}
util.throttle = function (method, context) {
  // 清除时间戳
  clearTimeout(method.tId)
  // 定义时间戳：200ms内该函数只能被对象调用一次
  method.tId = setTimeout(function () {
    method.call(context)
  }, 200)
}
var elementResizeDetectorMaker = require('element-resize-detector')
// 表格高度自适应
export const tableHeight = {
  // vue中组件是在mounted后才挂载到dom上的，所以在组件中我们也要在mounted后才能调用该方法监听元素的大小。
  mounted () {
    let erd
    // 需引入第三方js库element-resize-detector 跨浏览器的调整元素的侦听器
    // 创建一个全局函数elementResizeDetectorMaker，它是元素调整大小检测器制造商函数的实例。
    // 基于对象的方法，将在v2中删除。
    erd = elementResizeDetectorMaker()
    // 采用超快速滚动方式，v2中的默认值。
    // var erdUltraFast = elementResizeDetectorMaker({
    //     strategy: "scroll"
    // });

    // listenTo(element, listener)。element为侦听resize事件的元素，listener是resize事件的监听器函数，element会作为参数传给listener。
    erd.listenTo(document.getElementsByClassName('box-card')[0], element => {
      // 节流函数，this.setHeight在200ms内只会调用一次。(下面还会展开说）
      util.throttle(setHeight.bind(this))
    })
    // 设置高度
    function setHeight () {
      // 表格高度为元素offsetHeight-48，其中这个offset高度为 content + padding + border 的高度。
      // 一般我们获取到表格的父元素的高度，然后把该高度给表格。
      let searchBox = window.document.getElementsByClassName('box-card')

      let height = window.innerHeight

      if (searchBox[0] && searchBox[0].clientHeight) {
        height = height - searchBox[0].clientHeight - 250
      }
      this.tableHeight = height
    }
  }
}
