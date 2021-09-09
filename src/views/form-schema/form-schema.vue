<template>
  <BasicCard title="Form Schema">
    <template #extra>
      <el-button type="text">more</el-button>
    </template>

    <SchemaForm
      :ref="setSchemaFormRef"
      :fields="fields"
      :rules="SchemaFormRules"
      :form-schema="dynamicForm"
      :label-width="120"
    ></SchemaForm>
    <el-row type="flex" :gutter="10" justify="end">
      <el-col :span="2">
        <el-button type="primary" @click="restHandler">重置</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="success" @click="confirmHandler">确认</el-button>
      </el-col>
    </el-row>
  </BasicCard>
</template>


<script>
export default {
  name: 'form-schema-view'
}
</script>


<script setup>
import { ref, watch } from 'vue'
import { SchemaForm, BasicCard } from '@/components'
import { getFormSchema } from './schema-form'

const SchemaFormRef = ref(null)
const setSchemaFormRef = el => SchemaFormRef.value = el

const fields = ref({})

const dynamicForm = getFormSchema()

let SchemaFormRules = ref({
  name: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
  gender: [{ required: true, message: '请选择性别', trigger: ['change'] }],
  age: [
    { required: false, message: '请输入年龄', trigger: ['change'] },
    { pattern: /^\d{1,}$/, message: '只能输入正整数', trigger: ['change'] }
  ]
})

watch(() => fields.value.gender, (newV) => {
  if (newV === 1) {
    SchemaFormRules.value.age[0].required = false
  } else {
    SchemaFormRules.value.age[0].required = true
  }
})


const confirmHandler = () => {
  SchemaFormRef.value.validate((valid, form) => {
    console.log(valid, form);
  })
}
const restHandler = () => {
  SchemaFormRef.value.clearValidate()
}
</script>
