
import {
  getCity
} from '@/apis/address';

const state = {
  // 城市
  city: 'cq'
}

const mutations = {
  SET_CITY: (state, value) => {
    state.city = value
  }
}

const actions = {
  setCity({
            commit
          }, value) {
    commit('SET_CITY', value)
  },
  get_city({
             commit
           }, item) {
    return new Promise((resolve, reject) => {
      return getCity({}).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
