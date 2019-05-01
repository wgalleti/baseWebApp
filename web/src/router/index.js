import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
// import { authGuard } from './guard'

Vue.use(Router)

const router = new Router({
  routes
})

// router.beforeEach(authGuard)

export default router
