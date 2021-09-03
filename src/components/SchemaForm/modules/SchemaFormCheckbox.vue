<template>
  <el-checkbox-group style="width: 100%;" v-bind="{ ...attr }" :model-value="props.modelValue" @change="changeHandler">
    <template v-for="item in localOptions">
      <el-checkbox-button v-if="item.type === 'button'" :label="item.value" :disabled="item.disabled">{{ item.label }}</el-checkbox-button>
      <el-checkbox v-else :label="item.value" :disabled="item.disabled">{{ item.label }}</el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
  
<script setup>
import { computed } from "vue";
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ([])
  },
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