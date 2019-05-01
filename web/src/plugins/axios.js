import axios from 'axios'
import store from '../store'

const _axios = axios.create({
  baseURL: 'http://localhost:8000/'
})

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      store.commit('auth/LOGOUT')
      store.commit('auth/ADD_ERROR', error.response.data.detail)
    }
    // Do something with response error
    return Promise.reject(error)
  }
)

export default _axios
