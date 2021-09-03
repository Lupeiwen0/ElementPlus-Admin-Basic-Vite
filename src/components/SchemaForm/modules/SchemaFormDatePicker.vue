<template>
  <el-date-picker style="width: 100%;" v-bind="{ ...attr }" v-model:modelValue="localDateValue" @change="changeHandler"></el-date-picker>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
  
<script setup>
import { ref, onMounted, watch } from "vue";
import { ElDatePicker } from 'element-plus'
import $loadsh from 'lodash'

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

const localDateValue = ref(null)

const changeHandler = e => {
  emit('update:modelValue', e)
}

watch(() => props.modelValue, (newVal, oldVal) => {
  if (!$loadsh.isEqual(newVal, oldVal)) {
    localDateValue.value = newVal
  }
})

onMounted(() => {
  localDateValue.value = props.modelValue
})

</script>