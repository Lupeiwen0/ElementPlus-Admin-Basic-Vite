<template>
  <a href="javascript:;" class="logo" @click="backHome">
    <img :src="logoImg" class="logo__img" />
    <span class="logo__text" :style="logoStyle">{{ title }}</span>
  </a>
</template>

<script>
import Logo from '@/assets/logo.svg'
export default {
  props: {
    title: {
      type: String,
      default: 'Ant Design Basic'
    },
    theme: {
      type: String,
      default: 'dark'
    }
  },
  data() {
    return {
      logoImg: Logo
    }
  },
  computed: {
    logoStyle() {
      let style = ''
      switch (this.theme) {
        case 'dark':
          style = 'color: #fff;'
          break
        case 'light':
          style = 'color: rgba(0, 0, 0, 0.65);'
          break
      }
      return style
    }
  },
  methods: {
    backHome() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  position: relative;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 64px;

  .logo__img {
    height: 32px;
    width: 32px;
    margin: 16px 0;
  }

  .logo__text {
    color: #fff;
    font-size: 20px;
    margin: 0 0 0 12px;
  }
}
</style>
