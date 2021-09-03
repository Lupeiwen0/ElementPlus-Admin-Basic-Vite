import { createVNode, render } from 'vue'
import FormDialog from './form-dialog.vue'

// interface Options {
//   handleOk: (modelRef: any, state) => Promise<any> // 点击提交表单
//   formSchema: FormSchema // 表单描述属性
//   formAttr: ElForm // 表单 Attributes
//   rules: Array // 表单校验
//   fields?: object // 字段默认填充值，一般编辑表单是传入
// }

/**
 * 创建表单模态框
 * @param modalOptions
 * @param formOptions
 */
export const useFormModal = (options) => {
  // 组件实例
  let formModal
  const container = document.createElement('div')
  document.body.appendChild(container) // 加到页面

  // 移除组件
  const remove = () => {
    formModal = null
    render(null, container)
    container.remove()
  }

  formModal = createVNode(FormDialog, { ...options, remove })
  render(formModal, container)

  return formModal
}
