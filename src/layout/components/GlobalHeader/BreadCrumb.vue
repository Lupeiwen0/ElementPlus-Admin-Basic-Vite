<template>
  <el-breadcrumb>
    <template v-for="(routeItem, rotueIndex) in $route.matched" :key="routeItem.name">
      <el-breadcrumb-item >
        <span>{{ routeItem.meta.title }}</span>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb'
}
</script>