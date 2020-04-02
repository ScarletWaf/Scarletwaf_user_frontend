import Vue from 'vue'
import VueRouter from 'vue-router'
import WafDetails from '../views/WafDetails'
import RuleConfig from '../views/RuleConfig'
import ScarletPot from '../views/ScarletPot'
import Message from '../views/Message'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'WafDetails',
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
    path: '/Message',
    name: 'Message',
    component: Message
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
