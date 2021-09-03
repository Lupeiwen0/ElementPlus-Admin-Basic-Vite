<template>
  <div class="mode__view" v-show="serveList.length">
    <span>服务选择：</span>
    <a-select placeholder="请选择校区" :style="{ width: '150px' }" :value="serve" @change="handleChange">
      <template v-for="(item, index) in serveList">
        <a-select-option :value="item.value" :key="index">
          {{ item.name }}
        </a-select-option>
      </template>
    </a-select>
  </div>
</template>

<script>
import storage from 'store'
import { mapGetters } from 'vuex'
import { routes } from '@/router/index'
import { TABS_ROUTES } from '@/store/mutation-types'
import { TabsViewMutationType } from '@/store/modules/tabsView'

export default {
  data() {
    return {}
  },
  mounted() {},
  computed: {
    ...mapGetters(['serveList', 'serve', 'roles'])
  },
  methods: {
    async handleChange(value) {
      await this.$store.dispatch('user/setServe', value)
      // 获取服务权限
      await this.$store.dispatch('user/setRoles')
      // 重新生成权限菜单 - 暂时未集成权限
      await this.$store.dispatch('permission/setRouters', { routes: routes, roles: this.roles })
      // 清除标签导航
      storage.remove(TABS_ROUTES)
      this.$store.commit(`tabsView/${TabsViewMutationType.CloseAllTabs}`)
      // 重定向到首页
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
.mode__view {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
</style>
