import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import Home from '../views/Home.vue'

import Search from '../views/Search.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from '../views/MyAccount.vue'
import Checkout from '../views/Checkout.vue'
import Success from '../views/Success.vue'
// import contract from '@/views/contract.vue'
import about from '@/views/About.vue'
import StartBot from '../views/StartBot.vue'
import Documentation from '../views/Documentation.vue'
import ConKey from '../views/ConKey.vue'
import ArbitrageSearch from '../views/arbitragesearch.vue'




const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/contract',
  //   name: 'contract',
  //   component: contract
  // },
  
  {
    path: '/about',
    name: 'About',
    component: about
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/botstart',
    name: 'botstart',
    component: StartBot
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
        requireLogin: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/documentation',
    name: 'Documention',
    component: Documentation
  },
  {
    path: '/conKey',
    name: 'ConKey',
    component: ConKey
  },
  {
    path: '/arbitragesearch',
    name: 'arbitragesearch',
    component: ArbitrageSearch
  }
  
  
  // {
  //   path: '/:SmartContract_slug/:contract_slug',
  //   name: 'contract',
  //   component: contract
  // },
  // {
  //   path: '/:SmartContract_slug',
  //   name: 'SmartContract',
  //   component: SmartContract
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    next()
  }
})

export default router
