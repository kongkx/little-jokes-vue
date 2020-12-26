import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Terms from '../views/Terms.vue'
import Home from '../views/Home.vue'

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
    component: () => import('@/views/Shake.vue'),
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/My.vue'),
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
    component: () => import('@/views/MyCollection.vue'),
  },
  {
    path: '/my-posts',
    name: 'my-posts',
    component: () => import('@/views/MyPosts.vue'),
  },
  {
    path: '/new-post',
    name: 'post-create',
    component: () => import('@/views/PostCreate.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters.isLoggedIn) {
        next({ name: 'login', query: { next: to.fullPath } })
        return
      }
      next()
    },
  },
  {
    path: '/posts/:id/edit',
    name: 'post-edit',
    component: () => import('@/views/PostEdit.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
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
    component: () => import('@/views/Register.vue'),
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
    component: () => import('@/views/OauthHandling.vue'),
  },
  {
    path: '/terms',
    name: 'terms',
    component: Terms,
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: () => import('@/views/Post.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue'),
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
