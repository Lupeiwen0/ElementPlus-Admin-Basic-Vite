<template>
  <el-container style="height: 100vh; overflow: hidden;">
    <el-aside width="200px" style="background-color: #001628;">Aside</el-aside>
    <el-container>
      <el-header>
        <h1>Hellow Vue 3</h1>
      </el-header>
      <el-main>
        <div class="app__container__main">
          <TabsView></TabsView>
        </div>
      </el-main>
      <el-footer style="background-color: #333;">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import { TabsView } from './components'

</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
