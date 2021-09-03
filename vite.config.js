import { loadEnv } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import VitePluginElementPlus from 'vite-plugin-element-plus'

const CWD = process.cwd()

export default ({ command, mode }) => {
  // 环境变量
  const { VITE_BASE_URL } = loadEnv(mode, CWD)

  // const isBuild = command === 'build';

  return {
    base: VITE_BASE_URL,
    esbuild: {
      // target: 'es2015'
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src')
        }
      ]
    },
    plugins: [
      vue({
        // script: {
        //   refSugar: true // 开启 ref 语法糖
        // }
      }),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),
      VitePluginElementPlus({
        // 如果你需要使用 [component name].scss 源文件，你需要把下面的注释取消掉。
        // 对于所有的 API 你可以参考 https://github.com/element-plus/vite-plugin-element-plus
        // 的文档注释
        // useSource: true
      }),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
    ],
    server: {
      // host: '192.168.2.64',
      // port: 8088,
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:7001',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '/api/v1')
      //   }
      // }
    },
    optimizeDeps: {
      include: [],
      exclude: []
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: mode === 'production'
        }
      }
    }
  }
}
