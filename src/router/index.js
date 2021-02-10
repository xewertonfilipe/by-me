import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index.js";
import Menu from "@/components/Menu/Menu";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/cadastro",
      name: "cadastro",
      component: Register,
    },
    {
      path: "/app",
      name: "app",
      component: Menu,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

export default router;
