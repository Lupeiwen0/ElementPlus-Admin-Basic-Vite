import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import router, { setupRouter } from '@/router'
import { setupElement } from '@/plugins'
// 全量引入样式，hooks需要
// import 'element-plus/dist/index.css'
import 'nprogress/css/nprogress.css' // 进度条样式


const app = createApp(App)

//注册mock
import './mock'
// 注册Element组件
setupElement(app)
// 挂载vuex状态管理
setupStore(app)
// 注册路由
setupRouter(app)
// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
