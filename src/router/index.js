import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import WafDetails from '../views/WafDetails'
import RuleConfig from '../views/RuleConfig'
import ScarletPot from '../views/ScarletPot'
import Login from '../views/Login'
import Register from '../views/Register'
import Test from '../views/Test'
import WafAdmin from '../views/WafAdmin'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/WafDtails',
    name: 'WafDtails',
    component: WafDetails
  },
  {
    path: '/RuleConfig',
    name: 'RuleConfig',
    component: RuleConfig
  },
  {
    path: '/ScarletPot',
    name: 'ScarletPot',
    component: ScarletPot
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Test',
    name: 'Test',
    component: Test
  },
  {
    path: '/WafAdmin',
    name: 'WafAdmin',
    component: WafAdmin
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 路由守卫
  var token = localStorage.getItem('token')

  if (!token) {
    if (to.name !== 'Login' && to.name !== 'Register') {
      next({
        name: 'Login'
      })
    }
    next()
  } else {
    if (to.name === 'Login' || to.name === 'Register') {
      next({
        name: 'WafDetails'
      })
    }
    next()
  }
})
export default router
