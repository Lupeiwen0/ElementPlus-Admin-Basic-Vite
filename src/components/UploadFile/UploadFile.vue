<template>
  <el-upload
    action="#"
    :disabled="disabled"
    :accept="accept"
    :limit="limit"
    :drag="drag"
    :multiple="multiple"
    :before-upload="beforUpload"
    :list-type="listType"
    :file-list="fileList"
    :on-remove="onRemove"
    :on-exceed="onExceed"
  >
    <template #default>
      <slot name="default" v-if="$slots.default"></slot>
      <template v-else>
        <i class="el-icon-plus" v-if="listType === 'picture-card'"></i>
        <el-button type="primary" size="small" v-else>上传文件</el-button>
      </template>
    </template>

    <template #tip>
      <slot name="tip"></slot>
    </template>
  </el-upload>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ref, onMounted } from 'vue'
import { ElUpload, ElButton, ElMessage } from 'element-plus'

// 初始化 props
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 3
  },
  listType: {
    type: String,
    default: 'text'
  },
  accept: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  drag: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Array,
    default: () => []
  }
});
// 初始化 emit
const emit = defineEmits(['update:modelValue']);

// 模拟请求方法
const uploadApi = () => {
  return new Promise(resolve => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve({
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      })
    }, 800);
  })
}

let fileList = ref([])

onMounted(() => init())

const init = () => {
  if (Array.isArray(props.modelValue) && props.modelValue.length) {
    fileList.value = props.modelValue.map(item => {
      return {
        uid: `fileUid-${Math.floor(Math.random() * 10000)}-${new Date().valueOf()}`,
        name: item.name,
        status: 'success',
        url: item.url
      }
    })
  }
}
const emitChange = () => {
  const _fileList = fileList.value.map(item => {
    return { name: item.name, url: item.url }
  })
  emit('update:modelValue', _fileList)
}
const beforUpload = (file) => {
  uploadApi().then(res => {
    const fileInfo = {
      uid: `fileUid-${Math.floor(Math.random() * 10000)}-${new Date().valueOf()}`,
      name: file.name,
      status: 'success',
      url: res.url
    }
    fileList.value.push(fileInfo)
    emitChange()
  })
  return false
}
const onRemove = (file) => {
  if (file.status === 'success') {
    fileList.value = fileList.value.filter(item => item.uid !== file.uid)
    emitChange()
  }
}
const onExceed = () => {
  ElMessage({
    showClose: true,
    message: '超出最大上传数量',
    type: 'warning'
  })
}

</script>