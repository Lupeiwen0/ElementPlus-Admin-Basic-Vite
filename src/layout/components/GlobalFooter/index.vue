<template>
  <!-- footer组件高度变化 要修改 src/components/tabs/tabs-view.vue 文件 .tabs-view-content 样式的高度 -->
  <div class="global__footer">
    Element-Plus Admin Basic ©2021 Created by Lu xi
  </div>
</template>

<script>
export default {
  name: 'GloablFooter'
}
</script>

<style lang="scss" scoped>
.global__footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  line-height: 50px;
  font-size: 12px;
}
</style>
