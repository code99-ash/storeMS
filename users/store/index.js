import { centralBase } from '@/utils';
export const state = () => ({
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
    ],
    orders: []
})

export const actions = {
    // Products and Cart
      async fetchProducts({commit}) {
        const response = await this.$axios.get(`${centralBase}/products`);
        commit('SET_PRODUCTS', response.data)
      },
      async fetchOrders({commit}, id) {
        const response = await this.$axios.get(`${centralBase}/orders/history/${id}`);
        commit('SET_ORDERS', response.data)
      },
      updateOrderStatus({commit}, payload) {
        commit('UPDATE_ORDERS', payload)
      },
      addProduct({commit}, payload) {
        commit('ADD_PRODUCT', payload)
      },
      removeProduct({commit}, payload) {
        commit('REMOVE_PRODUCT', payload)
      },
  
      updateCart({commit}, payload) {
        commit('UPDATE_CART', payload)
      },
      removeFromCart({commit}, id) {
        commit('REMOVE_FROM_CART', id)
        this.dispatch('cummulateCart')
      },
      async getCartItems({commit}) {
        let items = localStorage.getItem('cart');
        items = items? JSON.parse(items) : []
        
        commit('GET_CART_ITEMS', items)
        this.dispatch('cummulateCart')
      },
  
      cummulateCart({commit}) {
        commit('CUMMULATE_CART')
      },
  
      // Feedbacks
      removeFeedback({commit}, id) {
        commit('REM_FEEDBACK', id)
      },
      addFeedback({commit}, payload) {
        commit('ADD_FEEDBACK', payload)
      },


}

export const mutations = {
    // products & Cart
      SET_PRODUCTS(state, payload) {
        // console.log(payload)
        state.products = payload
      },
      SET_ORDERS(state, payload) {
        console.log(payload)
        state.orders = payload
      },
      UPDATE_ORDERS(state, {ids, status}) {
        state.orders = state.orders.map(each => ids.includes(each._id)? {...each, status} : each)
      },
  
      ADD_PRODUCT(state, payload) {
        state.products.push(payload)
      },
  
      REMOVE_PRODUCT(state, id) {
        state.products = state.products.filter(each => each._id !== id)
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
  
        localStorage.setItem('cart', JSON.stringify(state.cartItems))
      },
  
      REMOVE_FROM_CART(state, id) {
        state.cartItems = state.cartItems.filter(each => each._id !== id);
        
        const amount = state.cartItems.reduce((accumulator, product) => {
          return accumulator + (product.price * product.quantity);
        }, 0);
        
        state.cartAmount = amount == 0? '0.00':amount
        localStorage.setItem('cart', JSON.stringify(state.cartItems))
  
      },
  
      GET_CART_ITEMS: (state, data) => {
        state.cartItems = data;
      },
      CUMMULATE_CART(state) {
        state.cartAmount = state.cartItems.reduce((accumulator, product) => {
          return accumulator + (product.price * product.quantity);
        }, 0);
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
}