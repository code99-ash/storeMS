import { apiBase } from '@/utils';
// import axios from 'axios'
import axios from '@/axios-interceptor'

const state = {
    pendingOrder: 0,
    data: []
}

const actions = {
    async fetchOrders({commit}) {
        const response = await axios.get(`${apiBase.central}/orders`);
        commit('SET_ORDERS', response.data)
    },
    updateOrderStatus({commit}, payload) {
        commit('UPDATE_ORDERS', payload)
    },
    newOrder({commit}, payload) {
        commit('NEW_ORDER', payload)
    }
}

const mutations = {
    UPDATE_ORDERS(state, {ids, status}) {
        state.data = state.data.map(each => ids.includes(each._id)? {...each, status} : each)
        state.pendingOrder = state.data.reduce((sum, obj) => {
            if(obj.status === 'pending') return sum + 1;
            return sum;
        }, 0)
    },
    SET_ORDERS(state, payload) {
        // console.log(payload)
        state.data = payload
        state.pendingOrder = state.data.reduce((sum, obj) => {
            if(obj.status === 'pending') return sum + 1;
            return sum;
        }, 0)
    },
    NEW_ORDER(state, payload) {
        state.data.push(payload)
    }
}


export const orders = {
    namespaced: true, state, actions, mutations
}