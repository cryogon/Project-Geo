import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      loginRequired: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(store.getters.storeToken);
  const tokenPresent = store.getters.storeToken;
  if (to.meta?.loginRequired && !tokenPresent) {
    next({ name: "home" });
  } else if (!to.meta?.loginRequired && tokenPresent) {
    next({ name: "about" });
  } else {
    next();
  }
});

export default router;
