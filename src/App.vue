<template>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
div,
p,
ul,
li,
ol,
section,
header,
footer {
  box-sizing: border-box;
}

@import "./plugins/element-fix.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

</style>
