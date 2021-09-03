<template>
  <div class="schema__form__textarea_container">
    <el-input
      style="width: 100%;"
      :autosize="{ minRows: 4 }"
      placeholder="请输入"
      v-bind="{ ...attr }"
      type="textarea"
      :model-value="props.modelValue"
      @input="inputHandler"
    ></el-input>
    <div class="schema__form__textarea__num-tips" v-if="maxLength">{{ props.modelValue?.length || 0 }}/{{ maxLength }}</div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
  
<script setup>
import { computed } from "vue"
import { ElInput } from 'element-plus'

const props = defineProps({
  modelValue: String,
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

const maxLength = computed(() => props.attr.maxLength || 0)

</script>

<style lang="scss">
.schema__form__textarea_container {
  position: relative;

  .schema__form__textarea__num-tips {
    position: absolute;
    bottom: -4px;
    right: 12px;
    color: #999;
    font-size: 10px;
    pointer-events: none;
  }
}
</style>