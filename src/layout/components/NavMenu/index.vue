<script lang="jsx">
import { h, resolveComponent } from 'vue'
import { routes } from '@/router/index'

export default {
  name: 'NavMenu',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'dark'
    }
  },
  data () {
    return {
      selectedKeys: '',
      openKeys: []
    }
  },
  computed: {
    menus () {
      return routes[0]?.children || []
    }
  },
  watch: {
    $route: {
      handler (value) {
        // sonMenu 一级菜单的重定向子页面
        this.selectedKeys =
          value.meta?.target === 'sonMenu' ? value.matched[1].path : value.path
        if (this.collapsed) return
        this.openKeys = value.matched.slice(0, -1).map(v => v.path)
      },
      immediate: true
    },
    collapsed (newVal) {
      // 菜单监听收缩转台，改变菜单选中选项打开状态
      if (newVal) {
        this.openKeys = []
      } else {
        this.openKeys = this.$route.matched.slice(0, -1).map(v => v.path)
      }
    }
  },
  methods: {
    jumpRoute (path, target) {
      // 判断是否是外部链接跳转
      if (target === '_blank' && path) {
        window.open(path)
      } else {
        if (this.$route.path === path) return
        this.$router.push({ path })
      }
    },
  },
  render () {
    const renderIcon = (icon) => {
      if (typeof icon === 'string') {
        return (<i class={icon}></i>)
      } else {
        // svg 暂不支持 - 后续补上
        return (<i class={icon}></i>)
      }
    }

    const renderChildren = list => {
      const vnode = []
      list.forEach(child => {
        // 没有meta配置 或 hidden 为 true 的不渲染菜单
        if (!child.meta || child.meta.hidden) return
        if (child.meta.target === 'menuItem' || !child.children || !child.children.length) {
          // 菜单不包含子集 - meta有配置，则这是一个菜单项
          vnode.push(
            h(
              resolveComponent('ElMenuItem'),
              {
                index: child.path,
                onclick: () => this.jumpRoute(child.path, child.meta.target)
              },
              {
                default: () => child.meta.icon && renderIcon(child.meta.icon),
                title: () => [<span> {child.meta.title}</span>]
              }
            )
          )
        } else if (child.children && child.children.length) {
          // 判断菜单是否是隐藏菜单 - 如果不是隐藏菜单 进行菜单渲染
          //  判断当前菜单是否含有meta配置
          //  是否含有子集?
          //  有：说明这是一个父级，渲染父级菜单之后，递归子集 renderChildren(child.children)
          vnode.push(
            h(
              resolveComponent('ElSubMenu'),
              { index: child.path },
              {
                default: () => renderChildren(child.children),
                title: () => [child.meta.icon && renderIcon(child.meta.icon), <span> {child.meta.title}</span>]
              })
          )
        }

      })
      return vnode
    }
    return (
      <div class="nav__menu__container">
        <el-menu
          background-color="#001628"
          text-color="#ffffff"
          active-text-color="#409eff"
          unique-opened={true}
          collapse={this.collapsed}
          collapse-transition={false}
          default-active={this.selectedKeys}
          default-openeds={this.openKeys}
        >
          {renderChildren(this.menus)}
        </el-menu>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.nav__menu__container {
  width: 100%;
  height: calc(100vh - 64px);
  background-color: #001628;
  overflow: scroll;

  :deep(.el-menu) {
    border-right: none;
  }
}
</style>