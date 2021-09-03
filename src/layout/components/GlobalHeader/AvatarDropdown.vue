<template>
  <a-dropdown placement="bottomRight">
    <span class="account-avatar">
      <a-avatar size="small" :src="currentUser.avatar" class="avatar__view" />
      <span class="user__name">{{ currentUser.name }}</span>
      <a-icon type="down" />
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down">
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import { Modal } from 'ant-design-vue'
import { TabsViewMutationType } from '@/store/modules/tabsView'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  mounted() { },
  methods: {
    handleLogout() {
      Modal.confirm({
        title: '您确定退出么？',
        onOk: () => {
          return this.$store.dispatch('user/Logout').then(() => {
            this.$router.push({ name: 'login' })
            this.$store.commit(`tabsView/${TabsViewMutationType.CloseAllTabs}`)
          })
        },
        onCancel() { }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
.avatar__view {
  margin-right: 10px;
}
.user__name {
  margin-right: 4px;
}
.account-avatar {
  display: inline-block;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;
}
.account-avatar:hover {
  background-color: rgba(0, 0, 0, 0.025);
}
</style>
