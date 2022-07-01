import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store";
const routes = [
  {
    path: "/",
    name: "login",
    component: HomeView,
  },
  {
    path: "/map",
    name: "map",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MapView.vue"),
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
    next({ name: "map" });
  } else {
    next();
  }
});

export default router;
