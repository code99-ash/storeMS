import { apiBase } from '@/utils';
import axios from 'axios'

const state = () => ({
    accessToken: '',
    loggedIn: '',
    user: '',
    openAuth: false,
    authType: 'login'
})

const actions = {
    async setAccessToken({commit, dispatch}, token) {
        console.log(token)
        localStorage.setItem('auth-token', token)
        await dispatch('userRequest', token)
        commit('SET_ACCESS_TOKEN', token)
    },
    async userRequest({commit}, token) {
        try {
            const resp = await axios.get(`${apiBase.auth}/user`, { headers: {
                'Authorization': `Bearer ${token}`,
            } })
            console.log(resp.data)
            localStorage.setItem('user', JSON.stringify(resp.data.user))
            localStorage.setItem('auth-token', token)
            axios.defaults.headers.common['Authorization'] = token;

            await commit('USER_REQUEST', {user: resp.data.user, token})
        } catch(err) {
            console.log(err)
            localStorage.removeItem('auth-token')
        }
    },
    logout({commit}) {
        commit('LOGOUT_USER')
    },
    setOpenAuth({commit}, val) {
        commit('SET_OPENAUTH', val)
    },
    setAuthType({commit}, type) {
        commit('SET_AUTHTYPE', type)
    }
}

const mutations = {
    SET_OPENAUTH(state, val) {
        state.openAuth = val ?? false;
        if(!!val) {
            state.authType = 'login'
        }
    },
    SET_AUTHTYPE(state, type) {
        state.authType = type
    },
    SET_ACCESS_TOKEN: (state, token) => state.accessToken = token,
    USER_REQUEST: (state, {user, token}) => {
        state.user = user;
        state.accessToken = token;
        state.loggedIn = true
    },
    LOGOUT_USER: (state) => {
        state.loggedIn = false;
        state.accessToken = ''
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user')
    }
}

export const auth = {
    namespaced: true, state, actions, mutations
}