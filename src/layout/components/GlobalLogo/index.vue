<template>
  <a href="javascript:;" class="logo" :style="logoStyle" @click="backHome">
    <img :src="logoImg" class="logo__img" />
    <span v-show="!props.collapsed" class="logo__text" >{{ title }}</span>
  </a>
</template>

<script>
export default {
  name: 'GlobalLogo'
}
</script>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router'
import Logo from '@/assets/logo.png'

const props = defineProps({
  title: {
    type: String,
    default: 'Element Plus Admin'
  },
  collapsed: {
    type: Boolean
  },
  theme: {
    type: String,
    default: 'dark'
  }
});
const $router = useRouter()

const logoImg = Logo
const logoStyle = computed(() => {
  let style = ''
  switch (props.theme) {
    case 'dark':
      style = 'color:#fff;background-color:#001628;'
      break
    case 'light':
      style = 'color:rgba(0, 0, 0, 0.65);background-color:#ff;'
      break
  }
  return style
})

const backHome = () => {
  $router.push({ path: '/' })
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 64px;
  padding-left: 18px;
  overflow: hidden;
  position: relative;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 64px;
  text-decoration: none;

  .logo__img {
    height: 32px;
    width: 32px;
    margin: 16px 0;
  }

  .logo__text {
    flex: 1;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 0 0 12px;
  }
}
</style>
