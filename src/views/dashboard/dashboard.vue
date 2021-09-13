<template>
  <div class="dashboard__container">
    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a>
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
    </p>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>

    <p>
      <el-icon color="#409EFF" :size="28">
        <CoffeeCup />
      </el-icon>
    </p>

    <el-row type="flex" justify="center">
      <UploadFile v-model:modelValue="fileList" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
        </template>
      </UploadFile>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'dashboard-view'
}
</script>

<script setup>
import { ref } from 'vue'
import { CoffeeCup } from '@element-plus/icons'
import { UploadFile } from '@/components'

const fileList = ref([])

</script>

<style>
.dashboard__container {
  text-align: center;
}
a {
  color: #42b983;
}
</style>