import { createStore } from 'vuex'

export default createStore({
  state: {
    cartItems: [
      {
        id: 1,
        title: 'Christmas pudding Custard English cuisine Mince pie',
        image: 'cake.png',
        price: 850,
        quantity: 1,
      },
      {
        id: 2,
        title: 'Hut Sushi Pizza',
        image: 'pizza.png',
        price: 2500,
        quantity: 1
      },
    ],
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
      {
        id: 3,
        title: 'Christmas pudding Custard English cuisine Mince pie 2',
        image: 'cake.png',
        price: 850
      },
      {
        id: 4,
        title: 'Hut Sushi Pizza 2',
        image: 'pizza.png',
        price: 2500
      },
    ]
  },
  actions: {
    updateCart({commit}, payload) {
      payload.id = new Date().getTime().toString();
      commit('UPDATE_CART', payload)
    },
    removeFromCart({commit}, id) {
      commit('REMOVE_FROM_CART', id)
    }
  },
  mutations: {
    UPDATE_CART(state, payload) {
      const existing = state.cartItems.find(c => c.title == payload.title);
      if(existing && existing.quantity !== payload.quantity) {
        existing.quantity = payload.quantity;
        state.cartItems = state.cartItems.map(c => c.title == payload.title? existing : c);
        return;
      }

      state.cartItems.push(payload)
    },

    REMOVE_FROM_CART(state, id) {
      state.cartItems = state.cartItems.filter(each => each.id !== id);
    }
  },
  modules: { }
})
