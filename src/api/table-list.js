import Http from '@/utils/request'

const apiConfig = {
  tableList: '/table/list'
}

/**
 * @param {Object} _params
 */
export function getTableList(_params = {}) {
  return Http.post(apiConfig.tableList, {
    data: _params, 
    loadingEl: false // 开启全屏loading
  })
}
