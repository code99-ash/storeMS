import { createStore } from 'vuex'
import { products } from './products'
import { orders } from './orders'
import { auth } from './auth'

export default createStore({
  state: {
    feedbacks: [
      {
        id: 1,
        heading: 'Welcome back!!',
        body: 'Welcome back to your dashboard, it\'s being a while',
        variant: 'success',
        duration: 3000
      }
    ]
  },
  getters: {
  },
  actions: {
    removeFeedback({commit}, id) {
      commit('REM_FEEDBACK', id)
    },
    addFeedback({commit}, payload) {
      commit('ADD_FEEDBACK', payload)
    }
  },
  mutations: {
    REM_FEEDBACK(state, id) {
      state.feedbacks = state.feedbacks.filter(fb => fb.id !== id)
    },
    ADD_FEEDBACK(state, { heading, body, variant, duration }) {
      state.feedbacks = [{
        id: new Date().getTime().toString(), heading, body, variant, duration: duration ?? 3000}
        , ...state.feedbacks
      ]
    }
  },
  modules: { 
    products, orders, auth
  }
})
