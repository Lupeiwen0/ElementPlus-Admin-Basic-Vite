<template>
  <a-row type="flex" align="middle" justify="space-between">
    <a-col>
      <a-row type="flex" align="middle">
        <a-col>
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => $emit('update:collapsed', !collapsed)"
          />
        </a-col>
        <a-col>
          <GlobalBreadCrumb></GlobalBreadCrumb>
        </a-col>
      </a-row>
    </a-col>
    <a-col class="right-avatar">
      <a-row type="flex" align="middle">
        <a-col>
          <modeSelect></modeSelect>
        </a-col>
        <a-col>
          <avatar-dropdown :current-user="userInfo" />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters } from 'vuex'
import AvatarDropdown from './AvatarDropdown'
import modeSelect from './modeSelect'
import { GlobalBreadCrumb } from '@/components'

export default {
  name: 'GlobalHeader',
  components: {
    AvatarDropdown,
    modeSelect,
    GlobalBreadCrumb
  },
  props: {
    collapsed: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      currentUser: null
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.trigger {
  display: inline-block;
  font-size: 18px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.right-avatar {
  margin-right: 30px;
}
</style>
