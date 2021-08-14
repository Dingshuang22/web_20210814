const logger = {
  requestId: 0,
  /**
   * 打印日志
   * @param requestId
   * @param data
   * @param startTime
   */
  show (requestId, data, startTime) {
    if (process.env.NODE_ENV !== 'development') {
      return
    }
    startTime = startTime || 0
    if (startTime) {
      console.log('%c<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<cloud request #' + requestId + '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', 'color:#669999')
    } else {
      console.log('%c<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<cloud #' + requestId + ' request <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', 'color:#669999')
    }

    data.forEach(function (item) {
      if (item.name === 'params' && JSON.stringify(item.value) === '{}') {
        return
      }
      if (item.name === 'success') {
        console.log('%c' + item.name + ': ' + item.value, 'color:#33cc33')
      } else if (item.name === 'error' || item.name === 'fail') {
        console.log('%c' + item.name + ': ' + item.value, 'color:#cc0099')
      } else if (item.name === 'message') {
        console.log('%c' + item.name + ': ' + item.value, 'color:#3366ff')
      } else {
        console.log(item.name + ':', item.value)
      }
    })

    if (startTime) {
      let runtime = new Date().getTime() - startTime
      console.log('%ctime:', 'color:#e68a00', (runtime / 1000).toFixed(2) + 's')
    }
    console.log('%c>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', 'color:#669999')
  }
}
export default logger
