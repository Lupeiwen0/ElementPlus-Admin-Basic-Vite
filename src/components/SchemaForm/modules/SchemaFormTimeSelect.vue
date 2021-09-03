<template>
  <el-time-select style="width: 100%" v-bind="{ ...attr }" :model-value="props.modelValue" @change="changeHandler"></el-time-select>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
  
<script setup>
import { ElTimeSelect } from 'element-plus'

const props = defineProps({
  modelValue: [Object, Array, String],
  formItem: Object,
  attr: {
    type: Object,
    default: () => {
      return { placeholder: '请选择' }
    }
  }
})
const emit = defineEmits(['update:modelValue'])

const changeHandler = e => {
  emit('update:modelValue', e)
}

</script>