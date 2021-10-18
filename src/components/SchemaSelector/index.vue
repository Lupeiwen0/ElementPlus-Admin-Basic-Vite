<template>
  <div class="schema__selector__cantainer">
    <SchemaForm
      :fields="fields"
      :form-schema="selectorOption"
      :label-width="labelWidth"
      :size="formSize"
      :label-position="labelPosition"
    >
      <template #action>
        <el-button type="primary" :size="formSize" @click="confrimHadler">搜 索</el-button>
        <el-button :size="formSize" @click="resetHadler">重 置</el-button>
      </template>
    </SchemaForm>
  </div>
</template>

<script>
export default {
  name: 'SchemaSelector',
  inheritAttrs: false,
}
</script>

<script setup>
import { ElButton } from 'element-plus'
import { computed, reactive } from 'vue'
import SchemaForm from '../SchemaForm/SchemaForm.vue'

const $emit = defineEmits(['confrim', 'update:fields'])

const props = defineProps({
  formSchema: {
    required: true,
    type: Array
  },
  fields: {
    type: Object,
  },
  formSize: {
    type: String,
    default: 'small'
  },
  labelPosition: {
    type: String,
    default: 'left'
  },
  labelWidth: {
    type: [String, Number],
    default: 100
  }
})

const selectorOption = computed(() => {
  return [
    ...props.formSchema,
    {
      field: 'confrim',
      type: 'slot',
      slotName: 'action',
      props: { label: '', labelWidth: 0 },
      layout: { xs: 12, sm: 6, md: 4 }
    },
  ]
})

const confrimHadler = () => {
  $emit('confrim', { type: 'confrim', data: props.fields })
}

const resetHadler = () => {
  $emit('update:fields', {})
  $emit('confrim', { type: 'reset', data: props.fields })
}

</script>

<style lang="scss">
.schema__selector__cantainer {
}
</style>