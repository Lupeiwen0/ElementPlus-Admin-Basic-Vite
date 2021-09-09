<template>
  <div class="tabs__view">
    <div class="tabs__header">
      <div class="tabs__header__left">
        <el-tabs type="card" closable v-model="activeKey" @tab-click="changePage" @tab-remove="editTabItem">
          <template v-for="(pageItem, index) in localTabsList">
            <el-tab-pane :name="pageItem.fullPath">
              <template #label>
                <el-dropdown
                  placement="bottom-start"
                  trigger="contextmenu"
                  @command="handleCommand($event, target, pageItem)"
                >
                  <div style="display: inline-block;">{{ pageItem.meta?.title }}</div>
                  <template #dropdown>
                    <el-dropdown-item command="1" icon="el-icon-refresh-right">刷新</el-dropdown-item>
                    <el-dropdown-item command="2" icon="el-icon-minus">关闭</el-dropdown-item>
                    <el-dropdown-item command="3" icon="el-icon-d-arrow-left">关闭左侧</el-dropdown-item>
                    <el-dropdown-item command="4" icon="el-icon-d-arrow-right">关闭右侧</el-dropdown-item>
                    <el-dropdown-item command="5" icon="el-icon-finished">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="6" icon="el-icon-circle-close">关闭全部</el-dropdown-item>
                  </template>
                </el-dropdown>
              </template>
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
      <div class="tabs__header__right">
        <i class="el-icon-refresh-right tabs__header__more" @click="handleCommand('1')"></i>
        <el-dropdown trigger="click" placement="bottom-end" @command="handleCommand($event)">
          <i class="el-icon-more-outline tabs__header__more"></i>
          <template #dropdown>
            <el-dropdown-item command="2" icon="el-icon-minus">关闭</el-dropdown-item>
            <el-dropdown-item command="5" icon="el-icon-finished">关闭其他</el-dropdown-item>
            <el-dropdown-item command="6" icon="el-icon-circle-close">关闭全部</el-dropdown-item>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="tabs__view__content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, unref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useStore } from '@/store'
import { TABS_ROUTES } from '@/store/mutation-types'
import { allowList, defaultRoutePath } from '@/router/router-guards'
import { TabsViewMutationType } from '@/store/modules/tabs/mutations'
import { createStorage } from '@/utils/Storage'

const Storage = createStorage({ storage: sessionStorage })
const $route = useRoute()
const $router = useRouter()
const $store = useStore()


const activeKey = ref(null)
const localTabsList = computed(() => $store.getters['tabs/tabsList'])

// 获取简易的路由对象
const getSimpleRoute = (route) => {
  const { fullPath, hash, meta, name, params, path, query } = route
  return { fullPath, hash, meta, name, params, path, query }
}

/** 
 * 获取缓存中的tabs信息
 * =================================================================================
 */
let routes = []
try {
  const routesStr = Storage.get(TABS_ROUTES)
  routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute($route)]
} catch (e) {
  routes = [getSimpleRoute($route)]
}
// 初始化标签页
$store.commit(`tabs/${TabsViewMutationType.AddTabs}`, routes)
/** 
 * =================================================================================
 */

watch(
  () => $route.fullPath,
  to => {
    // 不存在的路由
    const notFondRoutes = []
    localTabsList.value.forEach((item) => {
      if (!$router.hasRoute(item.name)) {
        notFondRoutes.push(item.name)
      }
    })
    // 过滤不存在的路由
    if (notFondRoutes.length) {
      $store.commit(
        `tabs/${TabsViewMutationType.InitTabs}`,
        localTabsList.value.filter(item => !notFondRoutes.includes(item.name))
      )
    }
    // 不在白名单 新增tabs信息
    if (allowList.includes($route.name)) return
    activeKey.value = to
    $store.commit(`tabs/${TabsViewMutationType.AddTabs}`, getSimpleRoute($route))
  },
  { immediate: true }
)
// 在页面关闭或刷新之前，保存数据
window.addEventListener('beforeunload', () => {
  Storage.set(TABS_ROUTES, JSON.stringify(localTabsList.value))
})
// 移除缓存组件名称
const delKeepAliveCompName = () => {
  if ($route.meta.keepAlive) {
    const name = $router.currentRoute.value.matched.find((item) => item.name == $route.name)
      ?.components?.default.name
    if (name) {
      $store.dispatch('app/setkeepAliveComponents', $store.state.app.keepAliveComponents.filter((item) => item != name))
    }
  }
}
// 切换tabItem
const changePage = (e) => {
  if (e.paneName !== $route.fullPath) $router.push(e.paneName)
}
// 删除tabItem
const editTabItem = (value) => {
  closeHandler('2', localTabsList.value.find(item => item.path === value))
}
// 菜单点击事件
const handleCommand = (type, target, pageItem) => {
  closeHandler(type, pageItem || $route)
}
// 关闭事件调度
const closeHandler = (type, route) => {
  switch (type) {
    case '1': // 刷新
      delKeepAliveCompName()
      $router.push({
        path: '/redirect' + unref(route).fullPath
      })
      break;
    case '2': // 关闭当前页
      if (localTabsList.value.length === 1) {
        return ElMessage.warning('这已经是最后一页，不能再关闭了！')
      }
      delKeepAliveCompName()
      $store.commit(`tabs/${TabsViewMutationType.CloseCurrentTabs}`, route)
      // 如果关闭的是当前页
      if ($route.fullPath === activeKey.value) {
        const currentRoute = localTabsList.value[Math.max(0, localTabsList.value.length - 1)]
        activeKey.value = currentRoute.fullPath
        $router.replace(currentRoute)
      }
      break;
    case '3': // 关闭左侧
      $store.commit(`tabs/${TabsViewMutationType.CloseLeftTabs}`, route)
      activeKey.value = route.fullPath
      $router.replace(route.fullPath)
      break;
    case '4': // 关闭右侧
      $store.commit(`tabs/${TabsViewMutationType.CloseRightTabs}`, route)
      activeKey.value = route.fullPath
      $router.replace(route.fullPath)
      break;
    case '5': // 关闭其他
      $store.commit(`tabs/${TabsViewMutationType.CloseOtherTabs}`, route)
      activeKey.value = route.fullPath
      $router.replace(route.fullPath)
      break;
    case '6': // 关闭全部
      $store.commit(`tabs/${TabsViewMutationType.CloseAllTabs}`, route)
      activeKey.value = route.fullPath
      $router.replace(defaultRoutePath)
      break;
  }
}

</script>

<style lang="scss" scoped>
.tabs__view {
  width: 100%;
  height: 100%;
  border-top: 1px solid #eee;
  overflow: hidden;

  .tabs__header {
    display: flex;
    min-height: 56px;

    .tabs__header__left {
      flex: 1;
      :deep(.el-tabs__header) {
        min-height: 41px;
      }
    }
    .tabs__header__right {
      display: flex;
      align-items: center;
      height: 41px;
      padding-right: 10px;
      border-bottom: 1px solid var(--el-border-color-light);

      cursor: pointer;

      .tabs__header__more {
        display: inline-block;
        margin-left: 14px;
        color: var(--el-color-primary);
        padding: 8px 0;
      }
    }
  }
}
.tabs__view__content {
  width: 100%;
  height: calc(100vh - 176px);
  padding: 0 14px;
  overflow: scroll;
}
</style>
