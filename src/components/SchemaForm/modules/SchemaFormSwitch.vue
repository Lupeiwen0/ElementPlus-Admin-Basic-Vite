<template>
  <el-switch style="width: 100%" v-bind="{ ...attr }" :model-value="props.modelValue" @change="changeHandler"></el-switch>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
  
<script setup>
import { ElSwitch } from 'element-plus'

const props = defineProps({
  modelValue: [Boolean, String, Number],
  formItem: Object,
  attr: {
    type: Object
  }
})
const emit = defineEmits(['update:modelValue'])

const changeHandler = e => {
  emit('update:modelValue', e)
}
</script>