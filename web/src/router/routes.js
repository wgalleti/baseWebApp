import store from '../store'
import camelCase from 'lodash/camelCase'

const registerRouterFiles = (prePath = {}) => {
  const requireModule = require.context('../views/', false, /\.vue$/)
  const routes = []
  const parsePath = name => prePath[name] ? prePath[name] : `/${name}`

  requireModule.keys().forEach(filename => {
    if (filename === './Login.vue' || filename === './NotExists.vue') return
    const moduleName = camelCase(filename.replace(/(\.\/|\.vue)/g, ''))
    routes.push({
      path: `${parsePath(moduleName)}`,
      name: moduleName,
      component: requireModule(filename).default
    })
  })

  return routes
}

const prePath = {
  'home': '/'
}

export default [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../views/Login.vue'),
  //   meta: {
  //     requiresAuth: false
  //   }
  // },
  // {
  //   path: '/logout',
  //   name: 'logout',
  //   beforeEnter: async (to, from, next) => {
  //     await store.dispatch('auth/authLogout')
  //     next('/login')
  //   },
  //   meta: {
  //     requiresAuth: false
  //   }
  // },
  // {
  //   path: '*',
  //   name: 'notfound',
  //   component: () => import('../views/NotFound.vue')
  // },
  ...registerRouterFiles(prePath)
]
