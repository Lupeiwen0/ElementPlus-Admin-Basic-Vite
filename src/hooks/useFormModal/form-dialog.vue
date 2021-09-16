<template>
  <ElDialog custom-class="hooks__form__modal" v-model:model-value="visible" @closed="closedHandler">
    <SchemaForm
      v-bind="formAttr"
      :ref="setDynamicForm"
      :fields="props.fields"
      :rules="props.rules"
      :form-schema="props.formSchema"
    />
    <template #footer>
      <div class="form__dialog__footer">
        <el-button size="small" type="success" :loading="confirmLoading" @click="confirmHandler">确认</el-button>
        <el-button style="margin-right: 16px;" size="small" type="primary" @click="cancelHandler">取消</el-button>
      </div>
    </template>
  </ElDialog>
</template>
  
<script setup>
import { ref, watch } from 'vue'
import { SchemaForm } from '@/components'
import { ElDialog, ElButton, ElLoading } from 'element-plus'

const props = defineProps({
  remove: {
    // 移除模态框
    type: Function
  },
  formAttr: {
    // 表单配置属性
    type: Object,
  },
  formSchema: {
    // 表单项
    type: Object,
  },
  fields: {
    required: true,
    // 默认值，一般编辑时传入
    type: Object
  },
  rules: {
    // 校验规则
    type: Object
  },
  handleOk: {
    // 点击确定
    type: Function
  },
  closed: {
    // 窗口关闭
    type: Function
  }
},
)

let FormLoadingInstance = null;


// 表单 ref
const dynamicForm = ref(null)
const setDynamicForm = el => dynamicForm.value = el

const confirmLoading = ref(false)
const visible = ref(true)

const confirmHandler = () => {
  confirmLoading.value = true
  dynamicForm.value?.validate()
    .then(async (res) => {
      await (props.handleOk && props.handleOk(dynamicForm.value?.fields))
      confirmLoading.value = false
      visible.value = false
    })
    .catch((err) => {
      console.log('error', err)
      confirmLoading.value = false
    })
}
const cancelHandler = () => visible.value = false

const closedHandler = () => {
  props.remove()
  props.closed && props.closed()
}

watch(() => confirmLoading.value, (newVal) => {
  if (newVal) {
    if (FormLoadingInstance) return;
    FormLoadingInstance = ElLoading.service({
      target: ".hooks__form__modal .el-dialog__body",
      background: "rgba(255,255,255,0.4)",
    });
  } else {
    // 以服务的方式调用的 Loading 需要异步关闭
    FormLoadingInstance.close();
    FormLoadingInstance = null;
  }
})

</script>

<style lang="scss">
.form__dialog__footer {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
</style>
