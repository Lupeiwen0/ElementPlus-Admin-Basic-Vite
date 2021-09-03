<template>
  <el-radio-group style="width: 100%;" v-bind="{ ...attr }" :model-value="props.modelValue" @change="changeHandler">
    <template v-for="item in localOptions">
      <el-radio-button v-if="item?.type === 'button'" :label="item.value">{{ item.label }}</el-radio-button>
      <el-radio v-else :label="item.value" :border="attr?.border">{{ item.label }}</el-radio>
    </template>
  </el-radio-group>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
  
<script setup>
import { computed } from "vue";
import { ElRadio, ElRadioGroup, ElRadioButton } from 'element-plus'

const props = defineProps({
  modelValue: [String, Number],
  attr: {
    type: Object,
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