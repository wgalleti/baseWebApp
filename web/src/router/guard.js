import store from '../store'

let urlRedirect = null

// Router Guard
const authGuard = async (to, from, next) => {
  if (to.matched.some(record => typeof record.meta.requiresAuth === 'undefined' ? true : record.meta.requiresAuth)) {
    try {
      await store.dispatch('auth/authCheck')
      if (from.name === 'login' && urlRedirect) {
        const url = urlRedirect
        urlRedirect = null
        next(url)
      } else {
        next()
      }
    } catch (e) {
      if (to.fullPath !== '/') {
        urlRedirect = to.fullPath
        next({ path: '/login', query: { next: to.fullPath } })
      } else {
        next('/login')
      }
    }
  } else {
    if (to.name === 'login' && store.getters['auth/isAuthenticated']) {
      next('/')
    } else {
      next()
    }
  }
}

export {
  authGuard
}
