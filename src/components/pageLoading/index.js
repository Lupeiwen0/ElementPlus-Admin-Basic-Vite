import { ElLoading } from 'element-plus'

// 在考虑是否需要单例模式，看具体使用情况在修改
// 返回loadingService服务状态的实例  Loading.service()方式调用
export const Loading = (() => {
  const Service = function () {
    let div
    let loadingMask
    this.service = function (options = {}) {
      const node = document.getElementsByClassName('ldx-axios-loading')
      if (node.length > 0) return this
      const { title, background } = options
      div = document.createElement('div')
      div.setAttribute('class', 'ldx-axios-loading')
      div.style.position = 'fixed'
      div.style.width = '100vw'
      div.style.height = '100vh'
      div.style.left = 0
      div.style.right = 0
      div.style.top = 0
      div.style.bottom = 0
      div.style.display = 'flex'
      div.style.alignItems = 'center'
      div.style.justifyContent = 'center'
      div.style.zIndex = '999999'
      if (background) div.style.background = background
      document.body.appendChild(div)

      loadingMask = ElLoading.service({ target: div, text: title || '', background: "rgba(230,247,255,0.4)" })

      return this
    }
    this.close = function () {
      const node = document.getElementsByClassName('ldx-axios-loading')
      if (node.length > 0) {
        loadingMask.close()
        div.remove()
      }
    }
  }
  return new Service()
})()
