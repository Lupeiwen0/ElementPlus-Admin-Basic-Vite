<template>
  <el-container style="height: 100vh; overflow: hidden;">
    <el-aside :width="asideWidth">
      <GlobalLogo :collapsed="collapsed"></GlobalLogo>
      <NavMenu :collapsed="collapsed"></NavMenu>
    </el-aside>
    <el-container>
      <el-header>
        <GlobalHeader v-model:collapsed="collapsed" />
      </el-header>
      <el-main>
        <div class="app__container__main">
          <TabsView></TabsView>
        </div>
      </el-main>
      <el-footer style="background-color: rgb(0, 22, 40);">
        <GlobalFooter />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { TabsView, GlobalHeader, GlobalFooter, GlobalLogo, NavMenu } from './components'

const collapsed = ref(false)

const asideWidth = computed(() => collapsed.value ? '65px' : '240px')
</script>

<style lang="scss" scoped>
:deep(.el-aside) {
  transition: all 0.3s;
}
.el-main {
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
