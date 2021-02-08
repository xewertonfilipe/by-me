import Vue from "vue";
import Router from "vue-router";
import FormLogin from "@/components/Form/FormLogin/FormLogin";
import FormAccount from "@/components/Form/FormAccount/FormAccount";
import SearchPlace from "@/components/SearchPlace/Search";

Vue.use(Router);

const routes = [
  {
    name: "home",
    path: "/",
    component: FormLogin,
  },
  {
    name: "cadastro",
    path: "/cadastro",
    component: FormAccount,
  },
  {
    name: "busca",
    path: "/busca-local",
    component: SearchPlace,
  },
];

const router = new Router({ routes });

export default router;
