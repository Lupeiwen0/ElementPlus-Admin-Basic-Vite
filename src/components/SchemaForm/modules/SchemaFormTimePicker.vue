
<template>
  <el-time-picker style="width: 100%" v-bind="{ ...attr }" v-model:modelValue="localTimeValue" @change="changeHandler"></el-time-picker>
</template>
  
<script>
export default {
  inheritAttrs: false
}
</script>
  
<script setup>
import { ref, onMounted, watch } from "vue";
import { ElTimePicker } from 'element-plus'
import $loadsh from 'lodash'

const props = defineProps({
  modelValue: [Object, Array, String],
  formItem: Object,
  attr: {
    type: Object,
    default: () => {
      return { placeholder: '请输入' }
    }
  }
})
const emit = defineEmits(['update:modelValue'])

const localTimeValue = ref(null)

const changeHandler = e => {
  emit('update:modelValue', e)
}

watch(() => props.modelValue, (newVal, oldVal) => {
  if (!$loadsh.isEqual(newVal, oldVal)) {
    localTimeValue.value = newVal
  }
})

onMounted(() => {
  localTimeValue.value = props.modelValue
})

</script>