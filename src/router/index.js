import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Shake from "../views/Shake.vue";
import My from "../views/My.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/shake",
    name: "Shake",
    component: Shake
  },
  {
    path: "/my",
    name: "My",
    component: My
  },
  {
    path: "*",
    redirect: "/home"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "is-active"
});

export default router;
