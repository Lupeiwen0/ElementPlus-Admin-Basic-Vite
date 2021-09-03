import { createStorage } from '@/utils/Storage'
import { APP_KEY } from '@/store/mutation-types'
const Storage = createStorage({ storage: localStorage })

export const state = {
  appKey: Storage.get(APP_KEY, 'APP_KEY'),
  axiosCancelArr: [],
  keepAliveComponents: []
}
