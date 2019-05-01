import http from '../plugins/axios'
import { httpToken } from './hooks'
import { parseHttpError } from './helpers'

const namespaced = true

const state = {
  token: null,
  profile: {},
  errorMessage: null
}

const mutations = {
  LOGIN (state, payload) {
    state.token = payload.token
    state.profile = payload.profile

    httpToken(http, payload.token)
  },
  LOGOUT (state) {
    state.returnTo = null
    state.errorMessage = null
    state.token = null
    state.profile = {}

    httpToken(http)
  },
  CHECK (state, payload) {
    state.profile = payload.profile
  },
  ADD_ERROR (state, payload = null) {
    state.errorMessage = payload
  }
}

const actions = {
  authLogin: (context, credentials) => http.post('/rest-auth/login/', credentials)
    .then(res => context.commit('LOGIN', res.data))
    .catch(err => parseHttpError(err)),
  authLogout: context => http.post('/rest-auth/logout/')
    .then(res => context.commit('LOGOUT'))
    .catch(() => context.commit('LOGOUT')),
  authCheck: context => {
    httpToken(http, context.rootState.auth.token)
    return http.get('/rest-auth/user/').then(res => context.commit('CHECK', res.data))
  }
}

const getters = {
  isAuthenticated: state => !!state.token
}

export default { namespaced, state, mutations, actions, getters }
