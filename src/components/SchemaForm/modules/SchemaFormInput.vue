<template>
  <el-input style="width: 100%;" v-bind="{ ...attr }" :model-value="props.modelValue" @input="inputHandler"></el-input>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
  
<script setup>
import { ElInput } from 'element-plus'

const props = defineProps({
  modelValue: [String, Number],
  formItem: Object,
  attr: {
    type: Object,
    default: () => {
      return { placeholder: '请输入' }
    }
  }
})
const emit = defineEmits(['update:modelValue'])
const inputHandler = e => {
  emit('update:modelValue', e)
}

</script>