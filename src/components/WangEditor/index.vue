<template>
  <div :class="['spinning__view', { spinning__show: loading }]">
    <div :id="EditorId"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
// 引入自定义菜单按钮
import { registerAlertMenu, registerAudioMenu } from './modules'

export default {
  name: 'WangeEditor',
  props: {
    // 自定义编辑器唯一 id
    editorKey: {
      type: String,
      default: ''
    },
    // 内容
    modelValue: {
      type: String,
      default: ''
    },
    // 内容提示
    placeholder: {
      type: String,
      default: ''
    },
    // 自动获取焦点
    focus: {
      type: Boolean,
      default: false
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 编辑器高度
    height: {
      type: Number,
      default: 400
    },
    // 编辑器层级
    zIndex: {
      type: Number,
      default: 1
    },
    // 菜单 - 顺序为显示顺序
    menus: {
      type: Array,
      default: () => [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        'justify',
        'todo',
        'quote',
        'emoticon',
        'image',
        'video',
        'audio',
        'table',
        'code',
        'splitLine',
        'alertMenu',
        'undo',
        'redo'
      ]
    },
    // 配置颜色（文字颜色、背景色）[ '#000000', '#eeece0']
    colors: {
      type: Array,
      default: () => []
    },
    /**
     * 默认图片上传配置（不推荐）
     */
    uploadImgConfig: {
      type: [Object, null],
      default: null
    },
    /**
     * 自定义图片上传（推荐）
     * 配合 uploading 方法显示loading遮罩层
     */
    customUploadImg: {
      type: [Function, undefined],
      default: undefined
    },
    /**
     * 自定义视频上传（推荐）
     * 配置同图片上传
     */
    customUploadVideo: {
      type: [Function, undefined],
      default: undefined
    },
    /**
     * 自定义音频上传（推荐）
     * 配置同图片上传
     */
    customUploadAudio: {
      type: [Function, undefined],
      default: undefined
    }
  },
  data () {
    return {
      Editor: null,
      isFirstInit: true,
      loading: false
    }
  },
  computed: {
    EditorId () {
      // editorKey没有定义，则生成随机的编辑器ID
      if (!this.editorKey || typeof this.editorKey !== 'string') {
        return `WANGEGE-EDITOR-ID-${Math.floor(Math.random() * 100000)}`
      }
      return this.editorKey.startsWith('#') ? this.editorKey.substring(1, this.editorKey.length) : this.editorKey
    }
  },
  watch: {
    disabled (newVal) {
      if (!this.Editor) return false
      if (newVal) {
        this.Editor.disable()
      } else {
        this.Editor.enable()
      }
    },
    modelValue (newVal) {
      if (this.isFirstInit && newVal) {
        this.initHtml()
        this.isFirstInit = false
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      const $el = document.getElementById(this.EditorId)
      if (!$el) return

      const _Editor = new E($el)
      /**
       * 这里采用（实例）方式注册 - 自定义菜单按钮
       * 避免全局注册方式造成的menus无法控制扩展按钮顺序的问题
       */
      registerAudioMenu(E, _Editor, this)
      registerAlertMenu(E, _Editor, this)

      // 配置 编辑器高度
      _Editor.config.height = this.height
      // 配置 显示层级
      _Editor.config.zIndex = this.zIndex
      // 配置 是否自动获取焦点
      _Editor.config.focus = this.focus
      // 配置 placeholder
      _Editor.config.placeholder = this.placeholder
      // 配置菜单
      _Editor.config.menus = this.menus
      // 关闭 base64 保存图片
      _Editor.config.uploadImgShowBase64 = false
      // 忽略粘贴内容中的图片
      _Editor.config.pasteIgnoreImg = true
      // 配置颜色（文字颜色、背景色）
      if (Array.isArray(this.colors) && this.colors.length) _Editor.config.colors = this.colors
      // 配置 onchange 回调函数，将数据同步到 vue 中
      _Editor.config.onchange = newHtml => {
        this.$emit('update:modelValue', newHtml)
      }
      // 配置 onfocus 回调函数
      _Editor.config.onfocus = newHtml => {
        this.$emit('focus', newHtml)
      }
      // 配置 onblur 回调函数
      _Editor.config.onblur = newHtml => {
        this.$emit('blur', newHtml)
      }
      // 配置图片上传
      this.initUploadConfig(_Editor)
      // 注册自定义上传图片
      this.initCustomUploadImg(_Editor)
      // 注册自定义上传视频
      this.initCustomUploadVideo(_Editor)
      // 注册自定义上传音频
      this.initCustomUploadAudio(_Editor)
      // 初始化编辑器
      _Editor.create()
      // 挂载实例
      this.Editor = _Editor
      // 初始化文本内容
      this.modelValue && this.initHtml()
      // 是否禁用
      if (this.disabled) _Editor.disable()
    },
    // 初始化编辑器内容
    initHtml () {
      this.Editor.txt.html(this.modelValue)
    },
    // 配置上传参数
    initUploadConfig (_Editor) {
      if (!_Editor || !this.uploadImgConfig) return false
      for (const key in this.uploadImgConfig) {
        _Editor.config[key] = this.uploadImgConfig[key]
      }
    },
    // 初始化自定义上传
    initCustomUploadImg (_Editor) {
      if (typeof this.customUploadImg !== 'function') return
      _Editor.config.customUploadImg = this.customUploadImg
    },
    // 初始化自定义上传视频
    initCustomUploadVideo (_Editor) {
      if (typeof this.customUploadVideo !== 'function') return
      _Editor.config.customUploadVideo = this.customUploadVideo
    },
    // 初始化自定义上传音频
    initCustomUploadAudio (_Editor) {
      if (typeof this.customUploadAudio !== 'function') return
      _Editor.config.customUploadAudio = this.customUploadAudio
    },
    // 清空编辑器内容
    clear () {
      if (!this.Editor) return false
      this.Editor.txt.clear()
    },
    // 上传中通信
    uploading (status = true) {
      this.loading = status
      this.$emit('uploading', status)
    }
  },
  beforeUnmount () {
    // 调用销毁 API 对当前编辑器实例进行销毁
    if (!this.Editor) return false
    this.Editor.destroy()
    this.Editor = null
  }
}
</script>

<style lang="scss" scoped>
.spinning__view {
  position: relative;
}

.spinning__show::before {
  content: "loading...";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(145, 213, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  color: #1890ff;
}
</style>
