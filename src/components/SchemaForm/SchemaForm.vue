<template>
  <el-form v-bind="$attrs" :ref="setSchemaFormRef" :model="fields" :rules="rules">
    <el-row type="flex" :gutter="10" class="schema__form__body">
      <template v-for="formItem in localFormSchema">
        <el-col v-bind="{ ...formItem.layout }">
          <el-form-item v-bind="{ ...formItem.props }" :prop="formItem.field">
            <component
              :is="getComponent(formItem.type)"
              :formItem="formItem"
              :attr="formItem.attr"
              v-model:modelValue="fields[formItem.field]"
            ></component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import { ref, isReactive, isRef } from "vue";
import { ElRow, ElCol, ElForm, ElFormItem } from 'element-plus'
import modules from './modules'

export default {
  name: 'SchemaForm',
  inheritAttrs: false,
  components: {
    ElRow,
    ElCol,
    ElForm,
    ElFormItem,
    ...modules
  },
  props: {
    formSchema: {
      required: true,
      type: Array
    },
    fields: {
      type: Object,
    },
    rules: {
      type: Object
    }
  },
  setup(props, { emit }) {
    // form ref
    const SchemaFormRef = ref(null)
    const setSchemaFormRef = el => SchemaFormRef.value = el
    // 合并初始化数据
    // const localFields = ref({})
    // if (props.fields) localFields.value = Object.assign({}, props.fields)

    // 过滤本地显示数据
    const localFormSchema = props.formSchema.filter(item => !item.hidden)
    // 预设组件索引
    const preset = [
      'input',
      'textarea',
      'select',
      'radio',
      'checkbox',
      'input-number',
      'switch',
      'cascader',
      'date-picker',
      'time-picker',
      'time-select'
    ]
    // 获取组件
    const getComponent = (type) => {
      // 预设组件
      if (preset.includes(type)) {
        return 'schema-form-' + type
      } else if (isReactive(type) || isRef(type)) {
        // 自定义组件
        return createVNode(type)
      } else {
        // 不识别组件
        return type
      }
    }
    // 校验表单
    const validate = (callback) => {
      return new Promise((resolve, reject) => {
        SchemaFormRef.value.validate((valid, arg) => {
          if (valid) {
            callback && callback(valid, props.fields, arg)
            resolve(valid, props.fields, arg)
          } else {
            reject(valid, props.fields, arg)
          }
        })
      })
    }
    // 清除表单校验
    const clearValidate = () => {
      SchemaFormRef.value.clearValidate()
    }

    return { SchemaFormRef, localFormSchema, setSchemaFormRef, getComponent, validate, clearValidate }
  }
}
</script>
  