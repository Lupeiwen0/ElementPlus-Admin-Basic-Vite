import { TABS_ROUTES } from '../../mutation-types'
import { createStorage } from '@/utils/Storage'
const Storage = createStorage({ storage: sessionStorage })

export const TabsViewMutationType = {
  InitTabs: 'INIT_TABS',
  AddTabs: 'ADD_TABS',
  CloseLeftTabs: 'CLOSE_LEFT_TABS',
  CloseRightTabs: 'CLOSE_RIGHT_TABS',
  CloseOtherTabs: 'CLOSE_OTHER_TABS',
  CloseCurrentTabs: 'CLOSE_CURRENT_TABS',
  CloseAllTabs: 'CLOSE_ALL_TABS'
}

// 不需要出现在标签页中的路由
import { allowList } from '@/router/router-guards'
const whiteList = [...allowList]

export const mutations = {
  [TabsViewMutationType.InitTabs]: (state, routes) => {
    state.tabsList = routes
  },
  [TabsViewMutationType.AddTabs] (state, route) {
    // 添加标签页
    if (whiteList.includes(route.name)) return false
    const isExists = state.tabsList.some(item => item.fullPath == route.fullPath)
    if (!isExists) {
      state.tabsList.push(route)
    }
    return true
  },
  [TabsViewMutationType.CloseLeftTabs] (state, route) {
    // 关闭左侧
    const index = state.tabsList.findIndex(item => item.fullPath == route.fullPath)
    state.tabsList.splice(0, index)
  },
  [TabsViewMutationType.CloseRightTabs] (state, route) {
    // 关闭右侧
    const index = state.tabsList.findIndex(item => item.fullPath == route.fullPath)
    state.tabsList.splice(index + 1)
  },
  [TabsViewMutationType.CloseOtherTabs] (state, route) {
    // 关闭其他
    state.tabsList = state.tabsList.filter(item => item.fullPath == route.fullPath)
  },
  [TabsViewMutationType.CloseCurrentTabs] (state, route) {
    // 关闭当前页
    const index = state.tabsList.findIndex(item => item.fullPath == route.fullPath)
    state.tabsList.splice(index, 1)
  },
  [TabsViewMutationType.CloseAllTabs] (state) {
    // 关闭全部
    state.tabsList = []
    Storage.remove(TABS_ROUTES)
  }
}