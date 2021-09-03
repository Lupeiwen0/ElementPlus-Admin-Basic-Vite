<template>
  <el-select style="width: 100%;" v-bind="{ ...attr }" :model-value="props.modelValue" @change="changeHandler">
    <template v-for="item in localOptions">
      <el-option :label="item.label" :value="item.value" :disabled="item.disabled">{{ item.customLabel || item.label }}</el-option>
    </template>
  </el-select>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
  
<script setup>
import { computed } from "vue";
import { ElSelect, ElOption } from 'element-plus'

const props = defineProps({
  modelValue: [String, Number],
  attr: {
    type: Object,
    default: () => {
      return { placeholder: '请选择' }
    }
  },
  formItem: {
    type: Object
  }
})
const emit = defineEmits(['update:modelValue'])
const changeHandler = e => {
  emit('update:modelValue', e)
}

const localOptions = computed(() => props.formItem?.options || [])

</script>