export const mutations = {
  SET_APP_KEY: (state, appKey) => {
    state.appKey = appKey
  },
  PUSH_CANCEL: (state, cancel) => {
    state.axiosCancelArr.push(cancel.cancelToken)
  },
  CLERR_CANCEL: state => {
    state.axiosCancelArr.forEach(e => {
      typeof e === 'function' && e()
    })
    state.axiosCancelArr = []
  },
  SET_KEEPALIVECOMPONENTS: (state, list) => {
    state.keepAliveComponents = list
  }
}