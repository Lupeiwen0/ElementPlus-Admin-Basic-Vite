export const actions = {
  setAppKey({commit}, appKey) {
    commit('SET_APP_KEY', appKey)
  },
  pushCancel({ commit }, cancel) {
    commit('PUSH_CANCEL', cancel)
  },
  clearCancel({ commit }) {
    commit('CLERR_CANCEL')
  },
  setkeepAliveComponents({ commit }, list) {
    commit('SET_KEEPALIVECOMPONENTS', list)
  }
}