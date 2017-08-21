import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isSignedIn: false
}

const mutations = {
  updateAuth() {
    state.isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
    console.log('updating sign in state to ', state.isSignedIn)
  }
}

const actions = {
  handleAuthClick({ commit, state }) {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      commit('updateAuth')
    })
  },
  handleSignoutClick({ commit, state }) {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      commit('updateAuth')
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
