import axios from 'axios'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { ElMessage } from 'element-plus'
import { Loading } from '@/components/PageLoading'

// 将axios 二次封装
// 每个实例的拦截器和其他人无关 ，如果使用全局的实例 那么给每次请求单独配置拦截器就做不到
let flag = false
const loadingDelay = 600 // loading延时
const pending = []

class HttpRequest {
  constructor() {
    // 可以增加实例属性 后台接口的路径  开发模式和生产模式不一样 在config里新建index.js进行配置
    this.baseURL = import.meta.env.VITE_APP_API_URL // 默认地址
    this.timeout = import.meta.env.VITE_APP_TIME_OUT // 请求超时时间
    this.loadingInstance = null
  }
  // 创建单独的拦截器
  setInterceptors (instance, options) {
    let timer = null
    instance.interceptors.request.use(config => {
      // 一般增加一些token属性等
      const token = sessionStorage.getItem(ACCESS_TOKEN)
      // 如果 token 存在
      // 让每个请求携带自定义 token 请根据实际情况自行修改
      if (token) {
        config.headers[ACCESS_TOKEN] = token
      }
      // 每次请求时间
      config.headers['requestTime'] = Date.parse(new Date())
        .toString()
        .substr(0, 10)

      const { loadingEl, loadingTitle } = config
      if (loadingEl) {
        // 增加loading,并进行 ${loadingDelay} ms延时
        timer = setTimeout(() => {
          this.loadingInstance = Loading.service({ text: loadingTitle })
        }, loadingDelay)
      }
      // 注册取消请求 cancelToken
      config.cancelToken = new axios.CancelToken(async cancel => {
        pending.push(cancel)
        await store.dispatch('app/pushCancel', { cancelToken: cancel })
      })
      return config
    })
    instance.interceptors.response.use(
      res => {
        // 取消loading的加载
        clearTimeout(timer)
        // 关闭loading
        this.loadingInstance && this.loadingInstance.close()

        // 服务返回的结果都会放到data中
        const { data } = res
        // oss上传没有返回data内容
        if (!data) return Promise.resolve(res.data)
        if (res.status === 200) {
          const code = data.code
          switch (code) {
            case 0:
              return Promise.resolve(res.data)
            case 401: // token无效
              // 退出登录 重定向到登录页
              if (!flag) {
                ElMessage.error(data.message)
                flag = true
                setTimeout(() => {
                  flag = false
                }, 3000)
              }
              // 退出登录 重定向到登录页
              store.dispatch('user/Logout').then(() => {
                setTimeout(() => {
                  window.location.reload()
                }, 1500)
              })
              return Promise.reject(res.data)
            default:
              // 失败
              ElMessage.error(data.message)
              return Promise.reject(res.data)
          }
        } else {
          const msg = res.message
          ElMessage.error(msg || '网络不稳定，请刷新重试')
          return Promise.reject(res.data)
        }
      },
      error => {
        const msg = error.message
        // 关闭loading
        if (!error.__CANCEL__) ElMessage.error(msg || '网络不稳定，请刷新重试')
        // 取消延时loading的加载
        clearTimeout(timer)
        // 关闭loading
        this.loadingInstance && this.loadingInstance.close()
        //中断请求
        while (pending.length > 0) {
          pending.pop()('请求中断')
        }
        return Promise.reject(error)
      }
    )
  }
  mergeOptions (options) {
    // 合并选项
    return { baseURL: this.baseURL, timeout: this.timeout, ...options }
  }
  request = options => {
    const instance = axios.create() // 创建axios实例
    this.setInterceptors(instance, options) // 创建单独的拦截器
    const opts = this.mergeOptions(options) // 合并选项
    return instance(opts) // 单独拦截器的配置项
  }
  get = (url, config) => {
    return this.request({
      method: 'get',
      url,
      ...config // 参数可以直接展开
    })
  }
  post = (url, config) => {
    return this.request({
      method: 'post',
      url,
      ...config // 参数可以直接展开
    })
  }
  put = (url, config) => {
    return this.request({
      method: 'put',
      url,
      ...config // 参数可以直接展开
    })
  }
  delete = (url, config) => {
    // get请求 以字符串的形式传入 路径参数  ?a=1
    return this.request({
      method: 'delete',
      url,
      ...config // 参数可以直接展开
    })
  }
}
const http = new HttpRequest()

export default {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          cancelRequest: []
        }
      },
      destroyed () {
        // 组件销毁，取消请求
        this.$data.cancelRequest.forEach(v => v.cancel('取消请求'))
      }
    })
    Vue.prototype.$axios = http.request
    Vue.prototype.$get = http.get
    Vue.prototype.$post = http.post
  },
  request: http.request,
  post: http.post,
  get: http.get,
  put: http.put,
  delete: http.delete
}
