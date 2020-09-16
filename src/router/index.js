import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Shake from '../views/Shake.vue'
import My from '../views/My.vue'
import MyCollection from '../views/MyCollection.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Terms from '../views/Terms.vue'
import Post from '../views/Post.vue'
import OauthHandling from '../views/OauthHandling.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/shake',
    name: 'shake',
    component: Shake,
  },
  {
    path: '/my',
    name: 'my',
    component: My,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isLoggedIn) {
        next({ name: 'login', query: { next: to.fullPath } })
        return
      }
      next()
    },
  },
  {
    path: '/my-collection',
    name: 'my-collection',
    component: MyCollection,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        if (to.query.next) {
          next(to.query.next)
        } else {
          next({ name: 'my' })
        }
      } else {
        next()
      }
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        if (to.query.next) {
          next(to.query.next)
        } else {
          next({ name: 'my' })
        }
      } else {
        next()
      }
    },
  },
  {
    path: '/oauth/:provider',
    name: 'oauth',
    component: OauthHandling,
  },
  {
    path: '/terms',
    name: 'terms',
    component: Terms,
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: Post,
  },
  {
    path: '*',
    redirect: '/home',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'is-active',
})

export default router
