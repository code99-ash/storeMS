import { apiBase } from '@/utils';
import axios from 'axios'

const state = {
    pendingOrder: 0,
    data: [
        {
            _id: "64a476fe75cfcb4f3936cce0",
            user: {
                name: "Ikhlas Oyelami",
            },
            reference: "NDJ34320449N24J492",
            deliveryAddress: "123 ABC Street, Off Abak road, Uyo",
            phone: "+234-812-902-9753",
            amount: 850,
            status: 'pending',
            orders: [
                {
                    _id: "kdkdkd",
                    payment: "64a476fe75cfcb4f3936cce0",
                    quantity: 1,
                    total: 850,
                    product: {
                        id: '1',
                        title: "Christmas pudding Custard English cuisine Mince pie",
                        image: "_1688499966385pizza.png",
                        quantity: 1,
                        total: 850
                    }
                }
            ]
        }
    ]
}

const actions = {
    async fetchProducts({commit}) {
        const response = await axios.get(`${apiBase.central}/products`);
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