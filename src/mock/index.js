import { isIE } from '@/utils/util.js';
import Mock from 'mockjs';

// 判断环境不是 production 时，加载 mock 服务
if (import.meta.env.MODE !== 'production' || true) {

  if (isIE()) {
    console.error('ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.')
  }

  console.log('mock mounting ...')

  // 异步加载，同步加载暂未 解决
  const services = import.meta.glob('./services/*.js')
  for (const key in services) {
    services[key]().then(res => res.default(Mock))
  }

  Mock.setup({
    timeout: 800 // setter delay time
  })

  console.log('mock mounted ...')
}
