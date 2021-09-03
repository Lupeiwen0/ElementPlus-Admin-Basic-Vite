<template>
  <div class="route__transition__view">
    <router-view v-slot="{ Component, route }">
      <transition name="slide-fade" mode="out-in" appear>
        <keep-alive :include="keepAliveComponents">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useStore } from '@/store'
const $store = useStore()

const keepAliveComponents = computed(() => $store.getters['app/keepAliveComponents'])

</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
