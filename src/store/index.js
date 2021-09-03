
import { createStore, useStore as baseUseStore, createLogger } from 'vuex'
import modules from '@/store/modules'

export const key = Symbol()

// 在开发环境中开启logger
const debug = process.env.NODE_ENV !== 'production'

const plugins = debug
  ? [
      createLogger({
        filter(mutation, stateBefore, stateAfter) {
          // 若 mutation 需要被记录，就让它返回 true 即可
          // 顺便，`mutation` 是个 { type, payload } 对象
          const notNeedDebugs = ['lockscreen/setLockTime', 'lockscreen/setLock']
          return !notNeedDebugs.includes(mutation.type)
        }
      })
    ]
  : []

const store = createStore({
  plugins,
  modules
})

// 定义你自己的“useStore”组合函数
export function useStore() {
  return baseUseStore(key)
}

export function setupStore(app) {
  app.use(store, key)
  console.log(store, 'vuex')
}

export default store