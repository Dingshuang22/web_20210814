import axios from 'axios'
import config from './config'
import qs from 'qs'
import router from '@/router'
import logger from './logger'
// import store from '@/store'


export default function $axios (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      transformResponse: [function (data) {
      }]
    })
    logger.requestId++
    let startRequestTime = new Date().getTime()
    let requestId = logger.requestId
    // request 拦截器
    instance.interceptors.request.use(
      config => {
        if (config.method === 'post') {
          // eslint-disable-next-line no-proto
          if (config.data.__proto__ === FormData.prototype ||
            config.url.endsWith('path') ||
            config.url.endsWith('mark') ||
            config.url.endsWith('patchs')
          ) {

          } else {
            config.data = qs.stringify(config.data)
          }
        }

        if (localStorage.accessToken) {
          config.headers['Authorization'] = localStorage.accessToken
          config.headers['Accept'] = 'application/json'
        }
        return config
      },

      error => {
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
          // return service.request(originalRequest);// 再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        // 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token。
        // 检测token
        // var token = response.headers.token
        // if (token) {
        //   store.dispatch('refreshToken', token)
        // }
        let data
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
        if (data.code !== 200) {
          logger.show(requestId, [
            {name: 'error', value: options.method.toUpperCase() + ' => ' + options.url},
            {name: 'params', value: Object.assign({}, options.data)},
            {name: 'message', value: data.errCode + ' => ' + data.message},
            {name: 'result', value: Object.assign({}, data.data)}
          ], startRequestTime)
        } else {
          logger.show(requestId, [
            {name: 'success', value: options.method.toUpperCase() + ' => ' + options.url},
            {name: 'params', value: Object.assign({}, options.data)},
            {name: 'result', value: Object.assign({}, data.data)}
          ], startRequestTime)
        }
        // 根据返回的code值来做不同的处理
        // switch (data.rc) {
        //     case 1:
        //         console.log(data.desc)
        //         break;
        //     case 0:
        //         store.commit('changeState')
        //     // console.log('登录成功')
        //     default:
        // }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.desc)
        // err.data = data
        // err.response = response
        // throw err

        return data
      },
      err => {
        let allowStatus = [400, 401, 500]
        if (allowStatus.indexOf(err.response.status) > -1) {
          return Promise.resolve(JSON.parse(err.response.request.response))
        }
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP版本不受支持'
              break
            default:
          }
        }
        logger.show(requestId, [
          {name: 'error', value: options.method.toUpperCase() + ' => ' + options.url},
          {name: 'params', value: Object.assign({}, options.data)},
          {name: 'message', value: err.message},
          {name: 'result', value: err}
        ], startRequestTime)
        // 返回接口返回的错误信息
        return Promise.reject(err)
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
      return false
    })
  })
}
