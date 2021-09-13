import _UploadAudio from './UploadAudio'
// 编辑器为了方便继续输入/换行等原因 主动生成的空标签
const EMPTY_P = '<p data-we-empty-p=""><br></p>'

/**
 * 获取随机字符
 * @param prefix 前缀
 */
export function getRandom(prefix) {
  return (
    prefix +
    Math.random()
      .toString()
      .slice(2)
  )
}

export default function(editor, E) {
  const config = editor.config
  const UploadAudio = new _UploadAudio(editor)
  const { $ } = E

  // panel 中需要用到的id
  const inputIFrameId = getRandom('input-iframe')
  const btnOkId = getRandom('btn-ok')
  const inputUploadId = getRandom('input-upload')
  const btnStartId = getRandom('btn-local-ok')
  /**
   * 插入链接
   * @param iframe html标签
   */
  function insertaudio(audio) {
    editor.cmd.do('insertHTML', EMPTY_P + audio + '<br/>')
    editor.cmd.do('insertHTML', EMPTY_P)

    // audio添加后的回调
    // editor.config.onlineaudioCallback(audio)
  }
  /**
   * 校验在线音频链接
   * @param audio 在线音频链接
   */
  function checkOnlineaudio(audio) {
    const check = audio.startWidth('http')
    if (check === true) return true
    // 用户未能通过开发者的校验，开发者希望我们提示这一字符串
    editor.config.customAlert('请输入合法的http文件地址', 'error')
    return false
  }

  // tabs配置
  // const fileMultipleAttr = config.uploadaudioMaxLength === 1 ? '' : 'multiple="multiple"'
  const tabsConf = [
    {
      // tab 的标题
      title: editor.i18next.t('menus.panelMenus.audio.上传音频'),
      tpl: `<div class="w-e-up-audio-container" style="text-align: center;">
              <div id="${btnStartId}" class="w-e-up-btn"
               style="display:inline-block;color:#999;cursor:pointer;font-size:60px;line-height:1;">
                <i class="w-e-icon-upload2"></i>
              </div>
              <div style="display:none;">
                  <input id="${inputUploadId}" type="file" accept="audio/mp3,audio/m4a,audio/aac,audio/wav"/>
              </div>
            </div>`,
      events: [
        // 触发选择音频
        {
          selector: '#' + btnStartId,
          type: 'click',
          fn: () => {
            const $file = $('#' + inputUploadId)
            const fileElem = $file.elems[0]
            if (fileElem) {
              fileElem.click()
            } else {
              // 返回 true 可关闭 panel
              return true
            }
          }
        },
        // 选择音频完毕
        {
          selector: '#' + inputUploadId,
          type: 'change',
          fn: () => {
            const $file = $('#' + inputUploadId)
            const fileElem = $file.elems[0]
            if (!fileElem) {
              // 返回 true 可关闭 panel
              return true
            }

            // 获取选中的 file 对象列表
            const fileList = fileElem.files
            if (fileList.length) {
              console.log(UploadAudio, 'UploadAudio')
              UploadAudio.uploadAudio(fileList)
            }

            // 返回 true 可关闭 panel
            return true
          }
        }
      ]
    },
    {
      // tab 的标题
      title: editor.i18next.t('menus.panelMenus.audio.插入音频'),
      // 模板
      tpl: `<div>
                  <input 
                      id="${inputIFrameId}" 
                      type="text" 
                      class="block" 
                      placeholder="${editor.i18next.t('如')}：http://codeclass.admin.com/audio/123.mp3"/>
                  </td>
                  <div class="w-e-button-container">
                      <button type="button" id="${btnOkId}" class="right">
                          ${editor.i18next.t('插入')}
                      </button>
                  </div>
              </div>`,
      // 事件绑定
      events: [
        // 插入音频
        {
          selector: '#' + btnOkId,
          type: 'click',
          fn: () => {
            // 执行插入音频
            const $audio = $('#' + inputIFrameId)
            const audio = $audio.val().trim()

            // 音频为空，则不插入
            if (!audio) return
            // 对当前用户插入的内容进行判断，插入为空，或者返回false，都停止插入
            if (!checkOnlineaudio(audio)) return
            insertaudio(`<audio src="${audio}" controls="controls" style="max-width:100%"></audio>`)
            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
            return true
          }
        }
      ]
    } // tab end
  ]

  const conf = {
    width: 300,
    height: 0,
    // panel 中可包含多个 tab
    tabs: [] // tabs end
  }
  // 显示“上传音频”
  if (window.FileReader && config.customUploadAudio) {
    conf.tabs.push(tabsConf[0])
  }
  // 显示“插入音频”
  conf.tabs.push(tabsConf[1])

  return conf
}
