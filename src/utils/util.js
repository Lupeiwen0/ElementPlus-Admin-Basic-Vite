export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = s => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * 获取 url 参数
 */
export function getWindowUrlParams(_href = window.location.href) {
  const params = {}
  const index = _href.indexOf('?') + 1
  if (index < 1) return params
  const queryInfo = _href.substring(index, _href.length) || []
  const queryInfoList = queryInfo.split('&')
  queryInfoList.forEach(item => {
    const itemParams = item.split('=')
    params[itemParams[0]] = itemParams[1]
  })
  return params
}

/**
 * Blob转base64
 */
export function blobToBase64(blob, callback) {
  const fileReader = new FileReader()
  fileReader.onload = function(e) {
    callback && typeof callback === 'function' && callback(e.target.result)
  }
  fileReader.readAsDataURL(blob)
}

/**
 * 将以base64的图片url数据转换为Blob
 * @param base64    用url方式表示的base64图片数据
 * @return blob     返回blob对象
 */
export function Base64UrlToBlob(base64) {
  const type = base64.split(',')[0].match(/:(.*?);/)[1] // 提取base64头的type如 'image/png'
  const bytes = window.atob(base64.split(',')[1]) // 去掉url的头，并转换为byte (atob:编码 btoa:解码)
  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length) // 通用的、固定长度(bytes.length)的原始二进制数据缓冲区对象
  const ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: type })
}

/**
 * 图片文件转 base64
 */
export function getImgToBase64(blob, callback) {
  const url = new Blob([blob], { type: 'image/jpeg' })
  // 将图片转换为Base64
  let canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = function() {
    canvas.height = img.height
    canvas.width = img.width
    ctx.drawImage(img, 0, 0)
    const dataURL = canvas.toDataURL('image/png')
    callback(dataURL)
    canvas = null
  }
  img.src = url
}

/**
 * 表格导出Excel
 * @param {vm} _id 打印容器 id
 * @param {String} fileName  文件名字
 */
export function exportExcel(_id, fileName) {
  // 获取表格
  const Regxp = new RegExp('<table', 'g')
  const exportFileContent = document.getElementById(_id).outerHTML.replace(Regxp, '<table border="1" ')
  // 设置格式为Excel，表格内容通过btoa转化为base64，此方法只在文件较小时使用(小于1M)
  // exportFileContent=window.btoa(unescape(encodeURIComponent(exportFileContent)));
  // let link = "data:"+MIMEType+";base64," + exportFileContent;
  // 使用Blob
  let blob = new Blob([exportFileContent], { type: 'application/vnd.ms-excel;charset=utf-8' }) // 解决中文乱码问题
  blob = new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type })
  // 设置链接
  const link = window.URL.createObjectURL(blob)
  const a = document.createElement('a') // 创建a标签
  a.id = 'excelExportId12312322'
  a.download = (fileName || new Date().getTime()) + '.xls' // 设置被下载的超链接目标（文件名）
  a.href = link // 设置a标签的链接
  document.body.appendChild(a) // a标签添加到页面
  a.click() // 设置a标签触发单击事件
  const aDom = document.getElementById('excelExportId12312322')
  aDom.remove()
}
