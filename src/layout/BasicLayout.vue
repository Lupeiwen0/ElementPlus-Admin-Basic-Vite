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
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { TabsView, GlobalHeader, GlobalFooter, GlobalLogo, NavMenu } from './components'
import { debounce } from 'lodash'

const collapsed = ref(false)
const asideWidth = computed(() => collapsed.value ? '65px' : '240px')

/**
 * 浏览器宽度小雨1000 时自动折叠左侧菜单
 */
const autoChangeCollapsed = debounce(function () {
  const windowClintWidth = document.documentElement.clientWidth;
  if (windowClintWidth < 1000) collapsed.value = true
}, 600, { leading: true })

onMounted(() => {
  autoChangeCollapsed()
  window.addEventListener('resize', autoChangeCollapsed)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', autoChangeCollapsed)
})

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
