import { createStore } from 'vuex'
import axios from 'axios'
import { apiBase } from '@/utils';

export default createStore({
  state: {
    cartAmount: '0.00',
    cartItems: [],
    products: [
      {
        id: 1,
        title: 'Christmas pudding Custard English cuisine Mince pie',
        image: 'cake.png',
        price: 850
      },
      {
        id: 2,
        title: 'Hut Sushi Pizza',
        image: 'pizza.png',
        price: 2500
      },
    ],
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
  actions: {
    // Products and Cart
    async fetchProducts({commit}) {
      const response = await axios.get(`${apiBase.central}/products`);
      commit('SET_PRODUCTS', response.data)
    },
    addProduct({commit}, payload) {
      commit('ADD_PRODUCT', payload)
    },

    updateCart({commit}, payload) {
      commit('UPDATE_CART', payload)
    },
    removeFromCart({commit}, id) {
      commit('REMOVE_FROM_CART', id)
    },

    // Feedbacks
    removeFeedback({commit}, id) {
      commit('REM_FEEDBACK', id)
    },
    addFeedback({commit}, payload) {
      commit('ADD_FEEDBACK', payload)
    }
  },
  mutations: {
    // products & Cart
    SET_PRODUCTS(state, payload) {
      console.log(payload)
      state.products = payload
    },

    ADD_PRODUCT(state, payload) {
      state.products.push(payload)
    },

    UPDATE_CART(state, payload) {
      const existing = state.cartItems.find(c => c._id == payload._id);
      if(existing) {
        if(existing.quantity !== payload.quantity) {
          existing.quantity = payload.quantity;
          state.cartItems = state.cartItems.map(c => c._id == payload._id? existing : c);
        }
      }else {
        state.cartItems.push(payload)
      }

      state.cartAmount = state.cartItems.reduce((accumulator, product) => {
        return accumulator + (product.price * product.quantity);
      }, 0);
    },

    REMOVE_FROM_CART(state, id) {
      state.cartItems = state.cartItems.filter(each => each._id !== id);
      
      const amount = state.cartItems.reduce((accumulator, product) => {
        return accumulator + (product.price * product.quantity);
      }, 0);
      
      state.cartAmount = amount == 0? '0.00':amount
    },

    // Feedbacks
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
  modules: { }
})
