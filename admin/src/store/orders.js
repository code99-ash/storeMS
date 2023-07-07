import { apiBase } from '@/utils';
import axios from 'axios'

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
    },
    SET_ORDERS(state, payload) {
        console.log(payload)
        state.data = payload
    },
    NEW_ORDER(state, payload) {
        state.data.push(payload)
    }
}


export const orders = {
    namespaced: true, state, actions, mutations
}