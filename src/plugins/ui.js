export default {
  install: function (Vue) {
    Vue.mixin({
      created: function () {
        console.log('组件开始加载')
      },
      methods: {
        test: function () {
          console.log('mixin test')
        }
      }
    })
    Vue.prototype.$loading.show = function (message) {
      Vue.prototype.$loading({
        lock: true,
        text: message || '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    Vue.prototype.$loading.close = function () {
      Vue.prototype.$loading().close()
    }

    Vue.prototype.$message.success = function (msg) {
      Vue.prototype.$message({
        message: msg,
        type: 'success'
      })
    }
    Vue.prototype.$message.warning = function (msg) {
      Vue.prototype.$message({
        message: msg,
        type: 'warning'
      })
    }
    Vue.prototype.$message.error = function (msg) {
      Vue.prototype.$message({
        message: msg,
        type: 'error'
      })
    }
    Vue.prototype.$message.alert = function (msg, cb) {
      if (typeof msg === 'object') {
        let title = msg.title || '提示信息'
        Vue.prototype.$alert(msg.content, title, {
          confirmButtonText: '确定',
          callback: action => {
            cb && cb(action)
          }
        })
      } else {
        Vue.prototype.$alert(msg, '提示信息', {
          confirmButtonText: '确定',
          callback: action => {
            cb && cb(action)
          }
        })
      }
    }
    Vue.prototype.$message.confirm = function (config, confirm, cancel) {
      Vue.prototype.$confirm(config.message || '确定要进行此操作吗', config.title || '确认信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        confirm && confirm()
      }).catch(() => {
        cancel && cancel()
      })
    }
    Vue.prototype.$notification = function (type, msg, direction) {
      if (!msg) {
        return
      }
      switch (type) {
        case 'info':
          this.$notify.info({
            title: '提示',
            message: msg,
            customClass: 'messageInfo',
            position: direction || 'top-right',
            duration: 4000
          })
          break
        case 'warning':
          this.$notify({
            type: 'warning',
            title: '警告',
            message: msg,
            customClass: 'messageWarn',
            position: direction || 'top-right',
            duration: 4000
          })
          break
        case 'error':
          this.$notify.error({
            title: '错误',
            message: msg,
            customClass: 'messageError',
            position: direction || 'top-right',
            duration: 4000
          })
          break
        case 'success':
          this.$notify({
            type: 'success',
            title: '成功',
            customClass: 'messageSuccess',
            message: msg,
            position: direction || 'top-right',
            duration: 5000
          })
          break
        default:break
      }
    }
  }
}
