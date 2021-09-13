<template>
  <el-dropdown placement="bottom-end" trigger="click" @command="handleCommand($event)">
    <span class="account-avatar">
      <el-avatar size="small" :src="currentUser.avatar" class="avatar__view" />
      <span class="user__name">{{ currentUser.name || '来自星星的你~' }}</span>
      <i class="el-icon-arrow-down"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="1" icon="el-icon-user">修改信息</el-dropdown-item>
        <el-dropdown-item command="2" icon="el-icon-user">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
export default {
  name: 'AvatarDropdown',
}
</script>

<script setup>
import { ElMessageBox } from 'element-plus'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { TabsViewMutationType } from '@/store/modules/tabs/mutations'

defineProps({
  currentUser: {
    type: Object,
    default: () => {
      return {}
    }
  }
});

const $store = useStore()
const $router = useRouter()

const handleCommand = (type) => {
  switch (type) {
    case '1':

      break;
    case '2':
      handleLogout()
      break;
  }
}

// 退出登录
const handleLogout = () => {
  ElMessageBox.confirm('您确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(res => {
    // $store.dispatch('user/Logout').then(() => {
    //   $router.push({ name: 'login' })
    //   $store.commit(`tabs/${TabsViewMutationType.CloseAllTabs}`)
    // })
  })
}
</script>

<style lang="scss" scoped>
.avatar__view {
  margin-right: 10px;
}
.user__name {
  display: inline-block;
  max-width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 4px;
  overflow: hidden;
}
.account-avatar {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;
}
.account-avatar:focus-visible {
  outline: none;
}
.account-avatar:hover {
  background-color: rgba(0, 0, 0, 0.025);
}
</style>
