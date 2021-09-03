<template>
  <el-cascader
    style="width: 100%"
    :options="localOptions"
    v-bind="{ ...attr }"
    :model-value="props.modelValue"
    @change="changeHandler"
  ></el-cascader>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { computed } from "vue";
import { ElCascader } from 'element-plus'

const props = defineProps({
  modelValue: Array,
  formItem: Object,
  attr: {
    type: Object
  }
})
const emit = defineEmits(['update:modelValue'])

const changeHandler = e => {
  emit('update:modelValue', e)
}

const localOptions = computed(() => props.formItem?.options || [])

</script>