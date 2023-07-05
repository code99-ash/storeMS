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
    ]
  },
  actions: {
    async fetchProducts({commit}) {
      const response = await axios.get(`${apiBase.central}/products`);
      commit('SET_PRODUCTS', response.data)
    },
    updateCart({commit}, payload) {
      commit('UPDATE_CART', payload)
    },
    removeFromCart({commit}, id) {
      commit('REMOVE_FROM_CART', id)
    }
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      console.log(payload)
      state.products = payload
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

      const amount = state.cartItems.reduce((accumulator, product) => {
        return accumulator + (product.price * product.quantity);
      }, 0);
      state.cartAmount = amount
      console.log(state.cartAmount)
    },

    REMOVE_FROM_CART(state, id) {
      state.cartItems = state.cartItems.filter(each => each._id !== id);
    }
  },
  modules: { }
})
