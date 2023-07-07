import { apiBase } from '@/utils';
import axios from 'axios'

const state = {
    data: []
}

const actions = {
    async fetchProducts({commit}) {
        const response = await axios.get(`${apiBase.central}/products`);
        commit('SET_PRODUCTS', response.data)
    },
    addProduct({commit}, payload) {
        commit('ADD_PRODUCT', payload)
    },
    removeProduct({commit}, id) {
        commit('REMOVE_PRODUCT', id)
    },
    updateProduct({commit}, payload) {
        commit('UPDATE_PRODUCT', payload)
    },
}

const mutations = {
    ADD_PRODUCT(state, payload) {
        state.data.push(payload)
    },
    REMOVE_PRODUCT(state, id) {
        state.data = state.data.filter(d => d._id !== id)
    },
    UPDATE_PRODUCT(state, payload) {
        state.data = state.data.map(each => each._id == payload._id? {...each, ...payload} : each)
    },
    SET_PRODUCTS(state, payload) {
        console.log(payload)
        state.data = payload
    }
}


export const products = {
    namespaced: true, state, actions, mutations
}