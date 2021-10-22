<template>
  <el-row type="flex" align="middle" justify="space-between" style="width: 100%;height: 100%;">
    <el-col :span="18">
      <el-row type="flex" align="middle">
        <i class="trigger" :class="[props.collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="changeCollapsed"></i>
        <el-col :span="20">
          <BreadCrumb></BreadCrumb>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="4">
      <div class="right-avatar">
        <AvatarDropdown></AvatarDropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'GlobalHeader'
}
</script>

<script setup>
import { computed } from 'vue';
import AvatarDropdown from './AvatarDropdown.vue';
import BreadCrumb from './BreadCrumb.vue'

const $emit = defineEmits(['update:collapsed'])
const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true
  },
  theme: {
    type: String,
    required: false
  }
});

const changeCollapsed = () => {
  $emit('update:collapsed', !props.collapsed)
}
</script>

<style lang="scss" scoped>
.trigger {
  display: inline-block;
  font-size: 20px;
  padding-right: 12px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.right-avatar {
  display: flex;
  justify-content: end;
}
</style>
