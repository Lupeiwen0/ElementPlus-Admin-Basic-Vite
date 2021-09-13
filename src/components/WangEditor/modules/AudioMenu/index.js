import createPanelConf from './create-audio-panel-conf'

function AudioMenu(E, _Editor, target) {
  // 菜单 key ，各个菜单不能重复
  const menuKey = 'audio'

  // 获取必要的变量，这些在下文中都可能会用到
  const { $, PanelMenu, Panel } = E

  class AudioMenu extends PanelMenu {
    constructor(editor) {
      // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
      const $elem = $(
        `<div class="w-e-menu" data-title="音频">
            <span>A</span>
          </div>`
      )
      super($elem, editor)
    }
    // 菜单点击事件
    clickHandler() {
      // 做任何你想做的事情
      // 可参考【常用 API】文档，来操作编辑器
      // 弹出 panel
      this.createPanel('')
    }
    /**
     * 创建 panel
     * @param link 链接
     */
    createPanel() {
      const conf = createPanelConf(this.editor, E)
      const panel = new Panel(this, conf)
      panel.create()
    }
    // 菜单是否被激活（如果不需要，这个函数可以空着）
    // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
    // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
    tryChangeActive() {}
  }

  // 注册菜单
  _Editor.menus.extend(menuKey, AudioMenu)
}

export default AudioMenu
