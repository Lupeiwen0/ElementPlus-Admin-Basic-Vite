// 编辑器为了方便继续输入/换行等原因 主动生成的空标签
export const EMPTY_P = '<p data-we-empty-p=""><br></p>'
/**
 * 遍历类数组
 * @param fakeArr 类数组
 * @param fn 回调函数
 */
export function arrForEach(fakeArr, fn) {
  let i, item, result
  const length = fakeArr.length || 0
  for (i = 0; i < length; i++) {
    item = fakeArr[i]
    result = fn.call(fakeArr, item, i)
    if (result === false) {
      break
    }
  }
}

class UploadAudio {
  constructor(Editor) {
    this.editor = Editor
  }

  uploadAudio(files) {
    if (!files.length) return
    const editor = this.editor
    const config = editor.config

    // ------------------------------ i18next ------------------------------

    const i18nPrefix = 'validate.'
    const t = text => {
      return editor.i18next.t(i18nPrefix + text)
    }

    // 上传音频的最大体积，默认 1024M
    const maxSize = config.uploadAudioMaxSize
    const uploadAideoMaxSize = maxSize / 1024
    // 自定义上传
    const customUploadAudio = config.customUploadAudio

    // ------------------------------ 验证文件信息 ------------------------------
    const resultFiles = []
    const errInfos = []
    arrForEach(files, file => {
      const name = file.name
      const size = file.size / 1024 / 1024

      // chrome 低版本 name === undefined
      if (!name || !size) {
        return
      }
      if (uploadAideoMaxSize < size) {
        // 上传视频过大
        errInfos.push(`【${name}】${t('大于')} ${uploadAideoMaxSize}M`)
        return
      }
      // 验证通过的加入结果列表
      resultFiles.push(file)
    })
    // ------------------------------ 自定义上传 ------------------------------
    if (customUploadAudio && typeof customUploadAudio === 'function') {
      customUploadAudio(resultFiles, this.insertAudio.bind(this))
    } else {
      throw Error('请配置音频上传方法')
    }
  }
  insertAudio(url) {
    const editor = this.editor
    const config = editor.config

    const i18nPrefix = 'validate.'
    const t = (text, prefix = i18nPrefix) => {
      return editor.i18next.t(prefix + text)
    }

    // 这里暂未 兼容火狐浏览器 如果需要 请参考视频 源码
    editor.cmd.do('insertHTML', EMPTY_P)
    editor.cmd.do(
      'insertHTML',
      `${EMPTY_P}<audio src="${url}" controls="controls" style="max-width:100%"></audio><br/>`
    )
    editor.cmd.do('insertHTML', EMPTY_P)

    // 加载音频
    let Audio = document.createElement('Audio')
    Audio.onload = () => {
      Audio = null
    }
    Audio.onerror = () => {
      config.customAlert(
        t('插入音频错误'),
        'error',
        `wangEditor: ${t('插入音频错误')}，${t('音频链接')} "${url}"，${t('下载链接失败')}`
      )
      Audio = null
    }
    Audio.onabort = () => (Audio = null)
    Audio.src = url
  }
}

export default UploadAudio
