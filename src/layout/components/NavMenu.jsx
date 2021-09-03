import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('permission')

export default {
  name: 'NavMenu',
  components: {
    // Icon
  },
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
  data() {
    return {
      selectedKeys: [], // 默认选中的菜单
      openKeys: [] // 打开的菜单
    }
  },
  computed: {
    ...mapState(['menus']),
    defaultOpenKeys() {
      return [this.$router.options.routes[0]?.children[0]?.name]
    }
  },
  watch: {
    $route: {
      handler(value) {
        // sonMenu 一级菜单的重定向子页面
        this.selectedKeys =
          value.meta?.target === 'sonMenu' ? [value.path.substring(0, value.path.lastIndexOf('/'))] : [value.path]
        if (this.collapsed) return
        this.openKeys = value.matched.slice(0, -1).map(v => v.path)
      },
      immediate: true
    },
    collapsed(newVal) {
      // 菜单监听收缩转台，改变菜单选中选项打开状态
      if (newVal) {
        this.openKeys = []
      } else {
        this.openKeys = this.$route.matched.slice(0, -1).map(v => v.path)
      }
    }
  },
  mounted() {},
  methods: {
    jumpRoute(path, target) {
      // 判断是否是外部链接跳转
      if (target && target === '_blank' && path) {
        window.open(path)
      } else {
        if (this.$route.path === path) return
        this.$router.push({ path })
      }
    },
    selectItem(val) {
      this.$children[0].sOpenKeys = val.keyPath.reverse().slice(0, -1)
    },
    openSubMenu(val) {
      this.openKeys = val
    }
  },
  render() {
    const renderChildren = list => {
      const vnode = []
      // 渲染子菜单
      list.forEach(child => {
        if (!child.hidden) {
          if (child.meta && (child.meta.target === 'menuItem' || !child.children || !child.children.length)) {
            // 菜单不包含子集 - meta有配置，则这是一个菜单项
            vnode.push(
              <a-menu-item
                key={child.path}
                onClick={() => {
                  this.jumpRoute(child.path, child.meta.target)
                }}
              >
                <span>
                  {child.meta.icon &&
                    (typeof child.meta.icon === 'string' ? (
                      <a-icon type={child.meta.icon} />
                    ) : (
                      <a-icon component={child.meta.icon} />
                    ))}
                  <span>{child.meta.title}</span>
                </span>
              </a-menu-item>
            )
          } else if (child.meta && child.children && child.children.length) {
            // 判断菜单是否是隐藏菜单 - 如果不是隐藏菜单 进行菜单渲染
            //  判断当前菜单是否含有meta配置
            //  是否含有子集?
            //  有：说明这是一个父级，渲染父级菜单之后，递归子集 renderChildren(child.children)
            vnode.push(
              <a-sub-menu key={child.path}>
                <span slot="title">
                  {child.meta.icon &&
                    (typeof child.meta.icon === 'string' ? (
                      <a-icon type={child.meta.icon} />
                    ) : (
                      <a-icon component={child.meta.icon} />
                    ))}
                  <span>{child.meta.title}</span>
                </span>
                {renderChildren(child.children)}
              </a-sub-menu>
            )
          }
          //
          // else if (child.children && child.children.length) {
          //   // 菜单含有子集
          //   vnode.push(renderChildren(child.children))
          // }
        }
      })
      return vnode
    }
    return (
      <a-menu
        default-selected-keys={this.selectedKeys}
        selectedKeys={this.selectedKeys}
        default-open-keys={this.defaultOpenKeys}
        open-keys={this.openKeys}
        mode="inline"
        theme={this.theme}
        inline-collapsed={true}
        onClick={val => {
          this.selectItem(val)
        }}
        onOpenChange={val => {
          this.openSubMenu(val)
        }}
      >
        {renderChildren(this.menus)}
      </a-menu>
    )
  }
}
