import axios from 'axios';
import { apiBase } from '@utils';

export default {
    namespaced: true,
    state: () => ({
        accessToken: localStorage.getItem('auth-token') || '',
        loggedIn: '',
        user: ''
    }),

    actions: {
        async userRequest({commit}, token) {
            try {
                const resp = await axios.get(`${window.location.origin}/${apiBase.central}/user`, { headers: {
                    'Authorization': `Bearer ${token}`,
                } })
                localStorage.setItem('user', JSON.stringify(resp.data.user))
                localStorage.setItem('auth-token', token)
                axios.defaults.headers.common['Authorization'] = token;
                await commit('USER_REQUEST', resp.data)
            } catch(err) {
                console.log(err)
                localStorage.removeItem('auth-token')
                // redirect to login page
                window.location = `${window.location.origin}/authorize/login`
            }
        },
        logout({commit}) {
            commit('LOGOUT_USER')
        } 
    },

    mutations: {
        USER_REQUEST: (state, data) => {
            state.user = data;
            state.loggedIn = true
        },
        LOGOUT_USER: (state) => {
            state.loggedIn = false;
            state.accessToken = ''
            localStorage.removeItem('auth-token')
            localStorage.removeItem('user')
        }
    }
}