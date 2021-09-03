<template>
  <!-- footer组件高度变化 要修改 src/components/tabs/tabs-view.vue 文件 .tabs-view-content 样式的高度 -->
  <div class="global__footer">
    Ant Design ©2018 Created by Ant UED
  </div>
</template>

<script>
export default {
  name: 'GloablFooter',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.global__footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
